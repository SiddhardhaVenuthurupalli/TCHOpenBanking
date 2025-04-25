import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner, Row, Col } from 'react-bootstrap';
import bankUsers from '../data/bankUsers.json';
import otpData from '../data/otps.json';
// import logo from '../assets/logo.png'; // Replace with your actual logo path


function PaymentGatewayModal({ show, onClose, bank, onSuccess }) {
  const [phase, setPhase] = useState('redirecting'); // 'redirecting' | 'login' | 'otp' | 'done'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);  // Store the logged-in user

  useEffect(() => {
    if (show) {
      setPhase('redirecting');
      setLoading(true);
      setError('');
      setUsername('');
      setPassword('');
      setOtp('');
      setTimeout(() => {
        setPhase('login');
        setLoading(false);
      }, 1500); // Slightly shorter redirect time
    }
  }, [show]);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = bankUsers.find(
      (u) => u.username === username && u.password === password && u.bank === bank
    );
    setLoading(false);
    if (user) {
      setPhase('otp');
      setLoading(true); // Show loading for OTP sending simulation
      // Store the current user for OTP verification
      setCurrentUser(user);
      // Simulate OTP sending delay
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    } else {
      setError(`Invalid credentials for ${bank}`);
    }
  };

  const handleOtpVerify = async () => {
    setLoading(true);
    setError('');
    // Simulate OTP verification API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (currentUser) {
      const userOtpData = otpData.find((data) => data.username === currentUser.username);
      if (userOtpData && otp === userOtpData.otp) {
        setPhase('done');
        // Simulate payment processing
        setTimeout(() => {
          setLoading(false);
          onSuccess();
          onClose();
        }, 1500);
      } else {
        setLoading(false);
        setError('Invalid OTP');
      }
    } else {
      setLoading(false);
      setError('User not found for OTP verification.');
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="md" // Adjusted size for a more focused look
      className="payment-modal"
    >
      <Modal.Header closeButton className="modal-header-classic">
        <Modal.Title className="d-flex align-items-center">
          {/* <img src={logo} alt="Bank Logo" className="modal-logo me-3" /> */}
          <span className="modal-title-text">{bank.toUpperCase()} Secure Payment</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-classic">
        {/* Redirecting Phase */}
        {phase === 'redirecting' && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Securely redirecting to {bank}...</p>
          </div>
        )}

        {/* Login Phase */}
        {phase === 'login' && (
          <div className="form-classic">
            <h5 className="mb-4 text-center">Log in to your {bank} account</h5>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

              <Button
                variant="primary"
                onClick={handleLogin}
                className="w-100"
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : 'Secure Login'}
              </Button>
            </Form>
          </div>
        )}

        {/* OTP Phase */}
        {phase === 'otp' && (
          <div className="otp-classic text-center">
            <div className="mb-3">
              {loading ? (
                <Spinner animation="grow" variant="primary" />
              ) : (
                <i className="bi bi-shield-lock-fill text-primary" style={{ fontSize: '2rem' }}></i>
              )}
              <p className="mt-3 text-muted">
                {loading ? 'Sending secure OTP...' : 'A One-Time Password (OTP) has been sent to your registered mobile number.'}
              </p>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicOTP">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

              <Button
                variant="success"
                onClick={handleOtpVerify}
                className="w-100"
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : 'Verify OTP & Pay'}
              </Button>
            </Form>
          </div>
        )}

        {/* Payment Successful Phase */}
        {phase === 'done' && (
          <div className="text-center text-success">
            <i className="bi bi-check-circle-fill" style={{ fontSize: '3rem' }}></i>
            <h4 className="mt-3 fw-bold">Payment Successful!</h4>
            <p className="text-muted">Your transaction has been processed securely.</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default PaymentGatewayModal;
