import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

console.log('Starting to render app...')

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

console.log('Root element found, creating root...')

const root = ReactDOM.createRoot(rootElement)

console.log('Rendering app...')

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('App rendered')

