import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ShoppingCart, Heart, ArrowLeft, ShieldCheck, Truck, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist } = useStore();
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2 style={{ color: 'var(--tv-text)' }}>Product Not Found</h2>
        <button className="btn btn-outline-primary mt-3" onClick={() => navigate('/shop')}>Return to Shop</button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
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
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container py-5">
      <button className="btn btn-link text-decoration-none mb-4 d-flex align-items-center gap-2" 
        style={{ color: 'var(--tv-blue)' }} onClick={() => navigate(-1)}>
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

          <p className="lead mb-4" style={{ lineHeight: '1.8', color: 'var(--tv-text-muted)' }}>
            {product.description}
          </p>

          <div className="d-flex flex-column gap-3 mb-5">
            <div className="d-flex flex-column flex-sm-row gap-3">
              <button
                className={`btn ${added ? 'btn-success' : 'btn-primary'} btn-lg flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2 py-3`}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={22} /> {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>

              <button
                className="btn btn-buy-now btn-lg flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2 py-3"
                onClick={() => {
                  if (product.stock > 0) {
                    addToCart(product);
                    navigate('/payment');
                  }
                }}
                disabled={product.stock === 0}
              >
                <Zap size={22} fill="currentColor" /> Buy Now
              </button>

              <button
                className="btn btn-outline-secondary btn-lg px-4 d-flex align-items-center justify-content-center"
                style={{ border: '1px solid var(--tv-border)', color: 'var(--tv-text)' }}
                onClick={() => {
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
              >
                <Heart size={24} className={isWishlisted ? 'text-danger' : ''} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <div className="card bg-transparent border-0">
            <div className="card-body p-0">
              <div className="d-flex align-items-center gap-3 mb-3" style={{ color: 'var(--tv-text)' }}>
                <Truck size={24} className="text-warning" />
                <span>Free standard shipping and free 30-day returns</span>
              </div>
              <div className="d-flex align-items-center gap-3" style={{ color: 'var(--tv-text)' }}>
                <ShieldCheck size={24} className="text-warning" />
                <span>Authenticity Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-5 pt-5 border-top" style={{ borderColor: 'var(--tv-border) !important' }}>
        <h3 className="fw-bold mb-4 d-flex align-items-center gap-2">
          <span className="text-warning">&bull;</span> You May Also Like
        </h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 text-start">
          {products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map(relatedProduct => (
              <div key={relatedProduct.id} className="col">
                <ProductCard product={relatedProduct} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
