'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <div className="container">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        🚀 Hello Next.js World!
      </h1>
      
      <div className="card">
        <h2>Welcome to your Next.js Application</h2>
        <p>This is a fully functional Next.js app with routing, state management, and interactive features.</p>
        
        <div style={{ margin: '2rem 0' }}>
          <h3>Interactive Counter</h3>
          <p>Current count: <strong>{count}</strong></p>
          <button 
            onClick={() => setCount(count + 1)}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Increment
          </button>
          <button 
            onClick={() => setCount(count - 1)}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              backgroundColor: '#f40',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Decrement
          </button>
          <button 
            onClick={() => setCount(0)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>

        <div style={{ margin: '2rem 0' }}>
          <h3>Dynamic Greeting</h3>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{
              padding: '0.5rem',
              marginRight: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              minWidth: '200px'
            }}
          />
          {name && (
            <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
              Hello, <strong>{name}</strong>! 👋
            </p>
          )}
        </div>

        <div style={{ margin: '2rem 0' }}>
          <h3>Navigation</h3>
          <p>Test Next.js routing with these links:</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link href="/about" style={{ color: '#0070f3', textDecoration: 'underline' }}>
              About Page
            </Link>
            <Link href="/api/hello" style={{ color: '#0070f3', textDecoration: 'underline' }}>
              API Route
            </Link>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Features Demonstrated</h2>
        <ul>
          <li>✅ React components with hooks (useState)</li>
          <li>✅ Interactive state management</li>
          <li>✅ Next.js routing with Link component</li>
          <li>✅ CSS styling and responsive design</li>
          <li>✅ Client-side interactivity</li>
          <li>✅ TypeScript support</li>
        </ul>
      </div>
    </div>
  )
}