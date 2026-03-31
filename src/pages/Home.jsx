import { useStore } from '../store';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Truck, RefreshCcw, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { products } = useStore();

  const handleScroll = () => {
    document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="position-relative text-white d-flex align-items-center"
        style={{
          minHeight: '85vh',
          background: 'url(https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=1920) center/cover no-repeat',
          marginTop: '-1px' // Covers potential layout gap
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(19, 23, 34, 0.75)' }}></div>
        <div className="container position-relative z-1 py-5">
          <div className="row">
            <div className="col-lg-8 col-xl-7">
              <span className="badge bg-warning text-dark mb-4 px-3 py-2 text-uppercase fw-bold rounded-pill" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>Limited Edition</span>
              <h1 className="display-3 fw-bolder mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)', lineHeight: '1.1' }}>
                Step Into <br /><span className="text-warning">The Future.</span>
              </h1>
              <p className="lead fs-4 mb-5 text-light" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)', opacity: 0.9, maxWidth: '600px' }}>
                Discover our latest collection of premium sneakers engineered for performance and designed for the streets.
              </p>
              <button
                onClick={handleScroll}
                className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-bold text-dark d-inline-flex align-items-center gap-2 hero-btn"
                style={{ transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(255, 193, 7, 0.4)' }}
              >
                Explore Collection <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="py-5" style={{ backgroundColor: 'var(--tv-panel)', borderBottom: '1px solid var(--tv-border)' }}>
        <div className="container my-3">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 rounded h-100 value-card" style={{ backgroundColor: 'var(--tv-bg)', border: '1px solid var(--tv-border)' }}>
                <div className="text-warning mb-3"><Truck size={40} /></div>
                <h5 className="fw-bold text-white mb-2">Free Shipping</h5>
                <p className="text-white mb-0 small">On all orders over $100. Delivered to your doorstep fast and secure.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded h-100 value-card" style={{ backgroundColor: 'var(--tv-bg)', border: '1px solid var(--tv-border)' }}>
                <div className="text-warning mb-3"><RefreshCcw size={40} /></div>
                <h5 className="fw-bold text-white mb-2">30-Day Returns</h5>
                <p className="text-white mb-0 small">Not the perfect fit? Return them within 30 days, no questions asked.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded h-100 value-card" style={{ backgroundColor: 'var(--tv-bg)', border: '1px solid var(--tv-border)' }}>
                <div className="text-warning mb-3"><ShieldCheck size={40} /></div>
                <h5 className="fw-bold text-white mb-2">Authentic Gear</h5>
                <p className="text-white mb-0 small">100% authentic sneakers sourced directly from verified manufacturers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div id="shop-section" className="container py-4 mt-3 mb-4 rounded-4" style={{ background: 'linear-gradient(135deg, #1c212eff 0%, #010e30ff 100%)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', padding: '5rem' }}>
        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-1" style={{ borderColor: 'var(--tv-border)' }}>
          <h2 className="display-6 fw-bold m-0 text-white"><span className="text-warning">&bull;</span> Featured Kicks</h2>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5">
          {products.slice(0, 6).map(product => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-5 pt-4">
          <Link to="/shop" className="btn btn-outline-warning rounded-pill px-5 fw-bold text-uppercase border-2" style={{ letterSpacing: '1px' }}>
            View Full Collection
          </Link>
        </div>
      </div>
    </>
  );
}
