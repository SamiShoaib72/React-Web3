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
    <nav className="navbar navbar-expand-lg sticky-top px-2 px-md-3">
      <div className="container-fluid">
        <Link 
          className="navbar-brand d-flex align-items-center fw-bold text-uppercase fs-4 m-0" 
          style={{letterSpacing: '1px'}} 
          to="/"
          onClick={() => window.scrollTo(0, 0)}
        >
          <Zap className="me-2 text-warning" />
          ADRINO
        </Link>
        
        <div className="d-flex align-items-center gap-2 gap-md-3 order-lg-last">
          {/* Icons always visible outside collapse on mobile */}
          <Link to="/wishlist" className="nav-link position-relative theme-link p-2">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.55rem', padding: '0.25em 0.5em'}}>
                {wishlist.length}
              </span>
            )}
          </Link>
          
          <Link to="/cart" className="nav-link position-relative theme-link p-2">
            <ShoppingCart size={20} />
            {cartItemsCount > 0 && (
              <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-primary" style={{fontSize: '0.55rem', padding: '0.25em 0.5em'}}>
                {cartItemsCount}
              </span>
            )}
          </Link>

          <button className="navbar-toggler border-0 p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" style={{filter: 'invert(1)', width: '1.5rem', height: '1.5rem'}}></span>
          </button>
        </div>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3 mt-lg-0 pt-2 pt-lg-0">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/shop">Shop Collection</Link>
            </li>
            {user?.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link px-3" to="/admin">Admin Dashboard</Link>
              </li>
            )}
          </ul>
          
          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 px-3 px-lg-0 pb-3 pb-lg-0">
            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-light btn-sm dropdown-toggle w-100 w-lg-auto" type="button" data-bs-toggle="dropdown">
                  {user.email}
                </button>
                <ul className="dropdown-menu dropdown-menu-end bg-dark border-secondary">
                  <li><button className="dropdown-item text-light" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2 w-100 w-lg-auto">
                <Link className="btn btn-outline-light btn-sm flex-grow-1" to="/login">Log In</Link>
                <Link className="btn btn-primary btn-sm flex-grow-1" to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
