import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GoogleAnalytics from './Components/googleAnalytics/GoogleAnalytics.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleAnalytics/>
    <App />
  </React.StrictMode>,
)
