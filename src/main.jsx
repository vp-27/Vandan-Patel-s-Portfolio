import React from 'react'
import ReactDOM from 'react-dom/client'
import AppleStyleWebsite from './components/AppleStyleWebsite'
import './index.css'

function App() {
  return (
    <AppleStyleWebsite />
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)