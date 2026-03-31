import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ShoppingCart, Heart, Zap } from 'lucide-react';

export default function Navigation() {
  const { cart, wishlist, user, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg sticky-top px-3">
      <div className="container-fluid">
        <Link 
          className="navbar-brand d-flex align-items-center fw-bold text-uppercase fs-4" 
          style={{letterSpacing: '1px'}} 
          to="/"
          onClick={() => window.scrollTo(0, 0)}
        >
          <Zap className="me-2 text-warning" />
          ADRINO
        </Link>
        
        <button className="navbar-toggler btn-outline-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" style={{filter: 'invert(1)'}}></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Shop Collection</Link>
            </li>
            {user?.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Dashboard</Link>
              </li>
            )}
          </ul>
          
          <div className="d-flex align-items-center gap-3">
            <Link to="/wishlist" className="nav-link position-relative theme-link">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="nav-link position-relative theme-link">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{fontSize: '0.6rem'}}>
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  {user.email}
                </button>
                <ul className="dropdown-menu dropdown-menu-end bg-dark border-secondary">
                  <li><button className="dropdown-item text-light" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link className="btn btn-outline-light btn-sm" to="/login">Log In</Link>
                <Link className="btn btn-primary btn-sm" to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
