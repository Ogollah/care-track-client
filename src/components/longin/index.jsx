import React, { useState } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';

function LoginPage() {
  const signIn = useSignIn();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8095/auth/signin', formData);

      if (response.status === 200) {
        const token = response.data.token;

        // Store the token in local storage
        localStorage.setItem('authToken', token);

        signIn({
          token: token,
          expiresIn: 36000,
          tokenType: "Bearer",
          authState: response.data.authUserState,
        });

        window.location.href = '/patients';
      } else {
        setError('Sign-in failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while trying to sign in. Please try again later.');
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center">Login</h1>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
