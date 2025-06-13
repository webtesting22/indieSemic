import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import Dashboard from './Dashboard';
import Login from './Login/Login';

const DashboardView = ({ handleLogout }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Check authentication status on component mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        try {
            const authData = localStorage.getItem('authData');
            if (authData) {
                const parsedAuthData = JSON.parse(authData);
                if (parsedAuthData.isAuthenticated) {
                    setIsAuthenticated(true);
                    setUser(parsedAuthData.user);
                }
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            // Clear invalid auth data
            localStorage.removeItem('authData');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginSuccess = () => {
        checkAuthStatus(); // Re-check auth status after login
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#f5f5f5'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #1890ff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }}></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    // Show login page if not authenticated
    if (!isAuthenticated) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    const handleLogoutInsideDashboard = () => {
        localStorage.removeItem('authData');
        setIsAuthenticated(false);
        setUser(null);
        message.success('Logged out successfully');
    };

    // Show dashboard with logout functionality if authenticated
    return (
        <div style={{ position: 'relative' }}>
            {/* Logout Button - positioned absolutely */}


            {/* Dashboard Component */}
            <Dashboard handleLogout={handleLogoutInsideDashboard} user={user} />


            {/* Add keyframes for loading animation */}
            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default DashboardView;