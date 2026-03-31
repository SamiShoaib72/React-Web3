import { useState } from 'react';
import { useStore } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Dummy auth: If email contains 'admin', make them admin
      const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
      login({ email, role });
      navigate(role === 'admin' ? '/admin' : '/');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <div className="card-body">
          <div className="text-center mb-4">
            <LogIn className="chart-blue mb-2" size={40} style={{color: 'var(--tv-blue)'}} />
            <h3 className="card-title fw-bold">Sign In</h3>
            <p className="text-muted small">Access your ADRINO account</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted small">Email Address</label>
              <input 
                type="email" 
                className="form-control form-control-lg" 
                placeholder="shoelover@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="mb-4">
              <label className="form-label text-muted small">Password</label>
              <input 
                type="password" 
                className="form-control form-control-lg" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <div className="text-end mt-1">
                <a href="#" className="small text-muted">Forgot password?</a>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3 fw-bold">
              Log In
            </button>
            
            <div className="text-center text-muted small">
              Don't have an account? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Sign Up</Link>
            </div>
            <div className="text-center mt-3 small text-muted">
              Hint: Use "admin@test.com" for Admin access
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
