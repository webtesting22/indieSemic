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
        footer={null}
        open={isModalOpen}
        // footer={null}
        onCancel={handleCancel}
      >

        <p>Our Website is under development. Stay tuned for the full website launch!</p>
        <br/>
        <img src="/Images/Loading.jpg" style={{width:"100%"}}/>
      </Modal>
    </>
  )
}

export default App
