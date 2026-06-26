import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState('Loading...')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/health')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to reach backend')
        }
        return response.json()
      })
      .then((data) => {
        setStatus(data.status)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [])

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-6 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness application for logging activities, building teams, and tracking progress.
              </p>
              <div className="d-flex gap-3 flex-wrap mb-4">
                <span className="badge bg-primary">React 19</span>
                <span className="badge bg-success">Vite</span>
                <span className="badge bg-info text-dark">Express + TypeScript</span>
                <span className="badge bg-warning text-dark">MongoDB + Mongoose</span>
              </div>
              <div className="border rounded p-3 bg-light">
                <strong>Backend status:</strong> {error ? <span className="text-danger">{error}</span> : <span className="text-success">{status}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
