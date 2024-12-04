import { useState } from 'react'
import './App.css'
import DynamicRoutes from './Routes/Routes'
import { BrowserRouter as Router } from 'react-router-dom';
import { Modal } from 'antd';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal opens on page load
  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal on "Cancel"
  };

  return (
    <>
      <Router>
        <DynamicRoutes />

      </Router>
      {/* Modal */}
      <Modal
        title="Welcome!"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <p>Welcome to IndieSemiC!</p>
      </Modal>
    </>
  )
}

export default App
