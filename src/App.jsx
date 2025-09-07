import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>
          🚀 Nuestro Pulso Test
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Vite + React + Firebase Starter Project
        </p>
      </header>

      <main>
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h2 style={{ color: '#333', marginTop: 0 }}>
            ✅ Project Status
          </h2>
          <ul style={{ color: '#555' }}>
            <li>✅ Vite bundler configured and working</li>
            <li>✅ React 18 setup and rendering</li>
            <li>✅ Firebase SDK integrated and initialized</li>
            <li>✅ Firebase Authentication ready</li>
            <li>✅ Development server running</li>
          </ul>
        </div>

        <div style={{ 
          backgroundColor: '#e8f4f8', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #b8e0f0'
        }}>
          <h3 style={{ color: '#1a5b7a', marginTop: 0 }}>
            🔥 Firebase Connection Status
          </h3>
          <p style={{ color: '#2c7aa0' }}>
            Firebase Auth initialized successfully!
            {user ? (
              <span> User is signed in: {user.email}</span>
            ) : (
              <span> No user currently signed in.</span>
            )}
          </p>
          <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: 0 }}>
            Project ID: nuestro-pulso-chat
          </p>
        </div>

        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '6px'
        }}>
          <p style={{ margin: 0, color: '#856404' }}>
            <strong>Ready for development!</strong> You can now build your application 
            using this solid foundation of Vite, React, and Firebase.
          </p>
        </div>
      </main>
    </div>
  )
}

export default App