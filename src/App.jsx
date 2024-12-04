import { useState } from 'react'
import './App.css'
import DynamicRoutes from './Routes/Routes'
import { BrowserRouter as Router } from 'react-router-dom';
import { Modal } from 'antd';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal opens on page load

  const handleOk = () => {
    setIsModalOpen(false); // Close the modal on "OK"
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal on "Cancel"
  };
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <DynamicRoutes />
        
      </Router>
       {/* Modal */}
       <Modal
        title="Welcome!"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Welcome to our application! Enjoy your experience.</p>
      </Modal>
    </>
  )
}

export default App
