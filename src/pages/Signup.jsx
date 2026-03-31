import { useState } from 'react';
import { useStore } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Dummy auth
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
            <UserPlus className="chart-green mb-2" size={40} style={{color: 'var(--tv-green)'}} />
            <h3 className="card-title fw-bold">Sign Up</h3>
            <p className="text-muted small">Join ADRINO</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted small">Email Address</label>
              <input 
                type="email" 
                className="form-control form-control-lg" 
                placeholder="newshoelover@example.com"
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
              <div className="form-text small text-muted">Must be at least 8 characters long, contain numbers, etc.</div>
            </div>
            
            <div className="mb-4 form-check">
              <input className="form-check-input" type="checkbox" id="terms" required />
              <label className="form-check-label text-muted small" htmlFor="terms">
                I agree to the Terms of Service and Risk Disclosures
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3 fw-bold">
              Register Account
            </button>
            <div className="text-center text-muted small">
              Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
