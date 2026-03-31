import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ShoppingCart, Heart, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist } = useStore();
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product Not Found</h2>
        <button className="btn btn-outline-light mt-3" onClick={() => navigate('/shop')}>Return to Shop</button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container py-5">
      <button className="btn btn-link text-decoration-none text-muted mb-4 d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className="row g-5">
        <div className="col-lg-6">
          <div className="position-relative p-2 rounded-4" style={{ backgroundColor: 'var(--tv-panel)', border: '1px solid var(--tv-border)' }}>
            <span className="position-absolute top-0 start-0 m-4 badge bg-primary z-1" style={{ fontSize: '1rem' }}>{product.category}</span>
            <img 
              src={product.image} 
              alt={product.name} 
              className="img-fluid rounded-3 w-100 product-detail-img" 
            />
          </div>
        </div>

        <div className="col-lg-6 d-flex flex-column justify-content-center">
          <h1 className="fw-bolder mb-2 display-5">{product.name}</h1>
          <div className="d-flex align-items-center gap-3 mb-4">
            <h2 className="price-tag m-0">${product.price.toFixed(2)}</h2>
            <span className={`badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <p className="lead text-muted mb-4" style={{ lineHeight: '1.8' }}>
            {product.description}
          </p>

          <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
            <button 
              className={`btn ${added ? 'btn-success' : 'btn-primary'} btn-lg flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={20} /> {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button 
              className="btn btn-outline-light btn-lg px-4 d-flex align-items-center justify-content-center"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={24} className={isWishlisted ? 'text-danger flex-fill' : ''} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="card bg-transparent border-0">
            <div className="card-body p-0">
              <div className="d-flex align-items-center gap-3 mb-3 text-muted">
                <Truck size={24} className="text-warning" />
                <span>Free standard shipping and free 30-day returns</span>
              </div>
              <div className="d-flex align-items-center gap-3 text-muted">
                <ShieldCheck size={24} className="text-warning" />
                <span>Authenticity Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
