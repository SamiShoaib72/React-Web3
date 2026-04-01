import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ShoppingCart, Heart, Zap, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navigation() {
  const { cart, wishlist, user, logout } = useStore();
  const { theme, toggleTheme } = useTheme();
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
          style={{ letterSpacing: '1px' }}
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
              <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.55rem', padding: '0.25em 0.5em' }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="nav-link position-relative theme-link p-2">
            <ShoppingCart size={20} />
            {cartItemsCount > 0 && (
              <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: '0.55rem', padding: '0.25em 0.5em' }}>
                {cartItemsCount}
              </span>
            )}
          </Link>

          <button 
            className="nav-link border-0 bg-transparent theme-link p-2" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} className="text-warning" /> : <Moon size={20} className="text-primary" />}
          </button>

          {!user ? (
            <div className="d-none d-lg-flex align-items-center gap-4 ms-3 me-2">
              <Link className="btn btn-link text-white text-decoration-none fw-bold small p-0 hover-opacity" to="/login">Log In</Link>
              <Link className="btn btn-warning btn-sm fw-bold px-3 rounded-pill shadow-sm" to="/signup">Sign Up</Link>
            </div>
          ) : (
            <div className="dropdown ms-3 d-none d-lg-block">
              <button className="btn btn-outline-light btn-sm dropdown-toggle rounded-pill px-3" type="button" data-bs-toggle="dropdown">
                {user.email.split('@')[0]}
              </button>
                <ul className="dropdown-menu dropdown-menu-end border-secondary shadow-lg mt-2">
                  <li><Link className="dropdown-item fw-bold text-warning" to="/orders">My Orders</Link></li>
                  <li><hr className="dropdown-divider border-secondary opacity-25" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
          )}

          <button className="navbar-toggler border-0 p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" style={{ width: '1.5rem', height: '1.5rem' }}></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3 mt-lg-0 pt-2 pt-lg-0">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/shop">Shop Collection</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/about">Our Vision</Link>
            </li>
            {user?.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link px-3" to="/admin">Admin Dashboard</Link>
              </li>
            )}
          </ul>

          <div className="d-lg-none px-3 pb-3">
            {user ? (
              <div className="dropdown w-100">
                <button className="btn btn-outline-light btn-sm dropdown-toggle w-100 mt-2" type="button" data-bs-toggle="dropdown">
                  {user.email}
                </button>
                <ul className="dropdown-menu dropdown-menu-end w-100">
                  <li><Link className="dropdown-item fw-bold text-warning" to="/orders">My Orders</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2 w-100 mt-2">
                <Link className="btn btn-primary btn-sm flex-grow-1" to="/login">Log In</Link>
                <Link className="btn btn-primary btn-sm flex-grow-1" to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
