import Link from 'next/link'

export default function About() {
  return (
    <div className="container">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        📖 About This App
      </h1>
      
      <div className="card">
        <h2>About Next.js Hello World</h2>
        <p>
          This is a demonstration Next.js application that showcases the core features 
          of Next.js including:
        </p>
        
        <ul style={{ margin: '1rem 0', paddingLeft: '2rem' }}>
          <li>App Router (Next.js 13+ routing system)</li>
          <li>Server and Client Components</li>
          <li>Dynamic routing between pages</li>
          <li>API routes for backend functionality</li>
          <li>TypeScript integration</li>
          <li>CSS styling with both global and component styles</li>
        </ul>

        <p>
          This app runs in the Baby Cursor Next.js IDE and demonstrates that 
          full Next.js applications can be previewed with all their routing, 
          state management, and interactive features working properly.
        </p>
      </div>

      <div className="card">
        <h2>Technical Details</h2>
        <ul style={{ paddingLeft: '2rem' }}>
          <li><strong>Framework:</strong> Next.js 14.2.3</li>
          <li><strong>Language:</strong> TypeScript</li>
          <li><strong>Routing:</strong> App Router</li>
          <li><strong>Styling:</strong> CSS with CSS Variables</li>
          <li><strong>State:</strong> React hooks (useState)</li>
        </ul>
      </div>

      <div className="card">
        <Link 
          href="/" 
          style={{ 
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}