import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle login form submit
  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  // Handle create account form submit
  const handleCreate = (e) => {
    e.preventDefault();
    // Add create account logic here (e.g. check passwords match)
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Proceed with account creation logic
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4" style={{ minWidth: 320, maxWidth: 400 }}>
        {!showCreate ? (
          <>
            <h2 className="mb-4 text-center">Sign In</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="emailInput"
                  className="form-control"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="passwordInput"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Sign In
              </button>
            </form>
            <div className="text-center mt-3">
              <button
                className="btn btn-link"
                onClick={() => setShowCreate(true)}
              >
                Create Account
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-center">Create Account</h2>
            <form onSubmit={handleCreate}>
              <div className="mb-3">
                <label htmlFor="newEmailInput" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="newEmailInput"
                  className="form-control"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPasswordInput" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="newPasswordInput"
                  className="form-control"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPasswordInput" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPasswordInput"
                  className="form-control"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Create Account
              </button>
            </form>
            <div className="text-center mt-3">
              <button
                className="btn btn-link"
                onClick={() => setShowCreate(false)}
              >
                Back to Sign In
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;

