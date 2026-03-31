import { Link } from 'react-router-dom';
import { Zap, Globe, MessageCircle, Share2, Video, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer mt-auto border-top pt-4 pt-md-5 pb-3" style={{ borderColor: 'var(--tv-border)', backgroundColor: 'var(--tv-panel)' }}>
      <div className="container">
        <div className="row g-3 g-md-4 mb-4 mb-md-5 text-center text-md-start">
          <div className="col-lg-4 col-md-6">
            <Link className="d-flex align-items-center justify-content-center justify-content-md-start fw-bold text-uppercase fs-4 mb-3 text-white text-decoration-none" style={{ letterSpacing: '1px' }} to="/">
              <Zap className="me-2 text-warning" />
              ADRINO
            </Link>
            <p className="text-white pe-lg-4 small">
              Premium footwear designed for athletes and streetwear enthusiasts. Step into the future with our limited edition collections and performance gear.
            </p>
            <div className="d-flex gap-3 mt-3 mt-md-4 justify-content-center justify-content-md-start">
              <a href="#" className="text-m footer-icon-link text-white"><Globe size={18} /></a>
              <a href="#" className="text-white footer-icon-link"><MessageCircle size={18} /></a>
              <a href="#" className="text-white footer-icon-link"><Share2 size={18} /></a>
              <a href="#" className="text-white footer-icon-link"><Video size={18} /></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase small">Shop</h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-1 gap-md-2 small">
              <li><Link to="/" className="text-white text-decoration-none footer-link">Running Shoes</Link></li>
              <li><Link to="/" className="text-white text-decoration-none footer-link">Basketball</Link></li>
              <li><Link to="/" className="text-white text-decoration-none footer-link">New Arrivals</Link></li>
              <li><Link to="/" className="text-white text-decoration-none footer-link">Lifestyle</Link></li>
              <li><Link to="/" className="text-white text-decoration-none footer-link">Accessories</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase small">Support</h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-1 gap-md-2 small">
              <li><a href="#" className="text-white text-decoration-none footer-link">Order Tracking</a></li>
              <li><a href="#" className="text-white text-decoration-none footer-link">Shipping & Returns</a></li>
              <li><a href="#" className="text-white text-decoration-none footer-link">Size Guide</a></li>
              <li><a href="#" className="text-white text-decoration-none footer-link">FAQ</a></li>
              <li><a href="#" className="text-white text-decoration-none footer-link">Contact Us</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h6 className="text-white fw-bold mb-3 text-uppercase small">Stay In The Loop</h6>
            <p className="text-white small">Sign up for our newsletter to get early access and 10% off.</p>
            <form className="d-flex mt-3 justify-content-center justify-content-md-start" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-dark border-secondary text-white"><Mail size={16} /></span>
                <input type="email" className="form-control bg-dark border-secondary text-white" placeholder="Email Address" required />
                <button className="btn btn-warning fw-bold text-dark px-3" type="submit">Join</button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-top border-secondary pt-3 mt-3 text-center d-flex flex-column flex-md-row justify-content-between align-items-center">
          <span className="text-white opacity-75 x-small mb-2 mb-md-0">© {new Date().getFullYear()} ADRINO Footwear. All rights reserved.</span>
          <div className="d-flex gap-3 x-small">
            <a href="#" className="text-white text-decoration-none footer-link opacity-75">Privacy Policy</a>
            <a href="#" className="text-white text-decoration-none footer-link opacity-75">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
