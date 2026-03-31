import { Link } from 'react-router-dom';
import { Zap, Globe, MessageCircle, Share2, Video, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer mt-auto border-top pt-5 pb-3" style={{ borderColor: 'var(--tv-border)', backgroundColor: 'var(--tv-panel)' }}>
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-lg-4 col-md-6">
            <Link className="d-flex align-items-center fw-bold text-uppercase fs-4 mb-3 text-white text-decoration-none" style={{ letterSpacing: '1px' }} to="/">
              <Zap className="me-2 text-warning" />
              ADRINO
            </Link>
            <p className="text-white pe-lg-4">
              Premium footwear designed for athletes and streetwear enthusiasts. Step into the future with our limited edition collections and performance gear.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-m footer-icon-link"><Globe size={20} /></a>
              <a href="#" className="text-white footer-icon-link"><MessageCircle size={20} /></a>
              <a href="#" className="text-white footer-icon-link"><Share2 size={20} /></a>
              <a href="#" className="text-white footer-icon-link"><Video size={20} /></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase">Shop</h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li><Link to="/" className="text-white text-decoration-none footer-link">Running Shoes</Link></li>
              <li><Link to="/" className="text-white text-decoration-none footer-link">Basketball</Link></li>
              <li><Link to="/" className="text-white text-decoration-none footer-link">New Arrivals</Link></li>
              <li><Link to="/" className="text-white text-decoration-none footer-link">Lifestyle</Link></li>
              <li><Link to="/" className="text-white text-decoration-none footer-link">Accessories</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase">Support</h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li><a href="#" className="text-white text-decoration-none footer-link">Order Tracking</a></li>
              <li><a href="#" className="text-white text-decoration-none footer-link">Shipping & Returns</a></li>
              <li><a href="#" className="text-white text-decoration-none footer-link">Size Guide</a></li>
              <li><a href="#" className="text-white text-decoration-none footer-link">FAQ</a></li>
              <li><a href="#" className="text-white text-decoration-none footer-link">Contact Us</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase">Stay In The Loop</h6>
            <p className="text-white">Sign up for our newsletter to get early access to exclusive drops and 10% off your first order.</p>
            <form className="d-flex mt-3" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <span className="input-group-text bg-dark border-secondary text-white"><Mail size={18} /></span>
                <input type="email" className="form-control bg-dark border-secondary text-white" placeholder="Email Address" required />
                <button className="btn btn-warning fw-bold text-dark px-3" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-top border-secondary pt-3 mt-4 text-center d-flex flex-column flex-md-row justify-content-between align-items-center">
          <span className="text-white small mb-2 mb-md-0">© {new Date().getFullYear()} ADRINO Footwear. All rights reserved.</span>
          <div className="d-flex gap-3 small">
            <a href="#" className="text-white text-decoration-none footer-link">Privacy Policy</a>
            <a href="#" className="text-white text-decoration-none footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
