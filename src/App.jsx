import { useState } from 'react'
import './App.css'
import DynamicRoutes from './Routes/Routes'
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <DynamicRoutes />
      </Router>
    </>
  )
}

export default App
