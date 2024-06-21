import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Title from './Components/Tittle/Title.jsx'
// import GoogleAnalytics from './Components/googleAnalytics/GoogleAnalytics.jsx'
// import AdSense from './Components/adSense/AdSense.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <Title/>
    <App />
  </React.StrictMode>,
)
