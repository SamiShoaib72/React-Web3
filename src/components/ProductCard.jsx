import { useStore } from '../store';
import { ShoppingCart, Heart, Zap, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { cart, addToCart, wishlist, toggleWishlist } = useStore();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const cartItem = cart.find(item => item.product.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    toast.success(`${product.name} added to cart!`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      iconTheme: {
        primary: '#ffd700',
        secondary: '#333',
      },
    });
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (product.stock > 0) {
      if (!cartItem) {
        addToCart(product);
      }
      navigate('/payment');
    }
  };

  return (
    <div className="card h-100 position-relative border-0 shadow-sm overflow-hidden">
      {/* Wishlist Button */}
      <button
        className={`wishlist-btn position-absolute top-0 end-0 m-3 z-10 p-2 rounded-circle shadow-sm transition-all ${isWishlisted ? 'active' : ''}`}
        style={{ 
          backdropFilter: 'blur(12px)', 
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          color: isWishlisted ? 'var(--tv-red)' : 'var(--tv-text)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}
        onClick={(e) => {
          e.preventDefault();
          const isRemoving = wishlist.includes(product.id);
          toggleWishlist(product.id);
          if (isRemoving) {
            toast.error(`Removed from wishlist`, {
              style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
          } else {
            toast.success(`Added to wishlist!`, {
              style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
          }
        }}
        aria-label="Toggle Wishlist"
      >
        <Heart fill={isWishlisted ? "var(--tv-red)" : "none"} strokeWidth={2.5} size={20} />
      </button>

      {/* Product Image Clickable Link */}
      <div className="position-relative overflow-hidden group-hover" style={{ height: '280px' }}>
        <Link to={`/product/${product.id}`} className="text-decoration-none d-block h-100">
          <img
            src={product.image}
            className="card-img-top h-100 w-100 object-fit-cover transition-transform"
            alt={product.name}
            style={{ transition: 'transform 0.5s ease' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Link>
        
        {/* Quick Action Overlay */}
        <div className="action-overlay position-absolute bottom-0 start-0 w-100 p-3 bg-gradient-dark translate-y-full transition-transform" 
          style={{ 
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            transform: 'translateY(100%)'
          }}
        >
          <div className="d-flex gap-2">
            <button
              className={`btn ${isAdded ? 'btn-success' : 'btn-primary'} btn-sm flex-grow-1 fw-bold py-2 rounded-2 d-flex align-items-center justify-content-center gap-2 transition-all`}
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAdded}
            >
              {isAdded ? (
                <>
                  <Check size={16} /> Added
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> Add
                </>
              )}
            </button>
            <button
              className="btn btn-warning btn-sm flex-grow-1 fw-bold py-2 rounded-2 d-flex align-items-center justify-content-center gap-2"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              <Zap size={16} fill="currentColor" /> Buy
            </button>
          </div>
        </div>
      </div>

      <div className="card-body d-flex flex-column p-3">
        <div className="mb-2">
          <span className="badge px-2 py-1 x-small fw-bold rounded-pill" style={{ backgroundColor: 'rgba(41, 98, 255, 0.15)', color: 'var(--tv-blue)' }}>
            {product.category}
          </span>
        </div>

        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <h6 className="card-title fw-bold mb-1 line-clamp-1" style={{ color: 'var(--tv-text)', fontSize: '1.1rem' }}>{product.name}</h6>
        </Link>

        <div className="d-flex align-items-center mb-0">
          <span className="price-tag me-auto fw-bold fs-5">${product.price.toFixed(2)}</span>
          <small className={`${product.stock > 0 ? "text-success" : "text-danger"} fw-medium x-small d-flex align-items-center gap-1`}>
            <span className={`rounded-circle ${product.stock > 0 ? "bg-success" : "bg-danger"}`} style={{ width: 6, height: 6 }}></span>
            {product.stock > 0 ? 'In Stock' : 'Sold Out'}
          </small>
        </div>
      </div>
    </div>
  );
}
