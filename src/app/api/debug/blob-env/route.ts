import { NextResponse } from 'next/server';

// GET - Debug endpoint to check Vercel Blob environment setup
export async function GET() {
  console.log('🔧 [Debug] Blob environment check requested');
  
  try {
    // Check all relevant environment variables
    const envVars = {
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
    };
    
    // Create safe output (hide actual token values)
    const safeEnvInfo = {
      hasBlobToken: !!envVars.BLOB_READ_WRITE_TOKEN,
      blobTokenLength: envVars.BLOB_READ_WRITE_TOKEN?.length || 0,
      blobTokenPrefix: envVars.BLOB_READ_WRITE_TOKEN?.substring(0, 10) + '...' || 'missing',
      nodeEnv: envVars.NODE_ENV,
      isVercel: !!envVars.VERCEL,
      vercelEnv: envVars.VERCEL_ENV,
      vercelUrl: envVars.VERCEL_URL,
    };
    
    console.log('🔍 [Debug] Environment variables:', safeEnvInfo);
    
    // Check if we're in production environment
    const isProduction = envVars.NODE_ENV === 'production' || envVars.VERCEL === '1';
    
    // Determine the issue
    let diagnosis = 'healthy';
    const recommendations = [];
    
    if (!envVars.BLOB_READ_WRITE_TOKEN) {
      diagnosis = 'missing_blob_token';
      recommendations.push('Add Vercel Blob storage to your project');
      recommendations.push('Go to Vercel Dashboard > Storage > Create Database > Blob');
      recommendations.push('The BLOB_READ_WRITE_TOKEN should be automatically added');
    } else if (!isProduction) {
      diagnosis = 'development_mode';
      recommendations.push('This is development mode - blob storage may not be needed');
      recommendations.push('Deploy to Vercel to test production blob storage');
    }
    
    // Test blob import (without making actual calls)
    let blobImportTest = 'unknown';
    try {
      const { put } = await import('@vercel/blob');
      blobImportTest = typeof put === 'function' ? 'success' : 'failed';
    } catch {
      blobImportTest = 'failed';
      recommendations.push('Install @vercel/blob package: npm install @vercel/blob');
    }
    
    const result = {
      timestamp: new Date().toISOString(),
      diagnosis,
      environment: safeEnvInfo,
      blobImportTest,
      isProductionMode: isProduction,
      recommendations,
    };
    
    console.log('📋 [Debug] Diagnosis complete:', result);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ [Debug] Error during environment check:', error);
    
    return NextResponse.json({
      error: 'Failed to check environment',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}