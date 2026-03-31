import { useStore } from '../store';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { cart, addToCart, wishlist, toggleWishlist } = useStore();

  const isWishlisted = wishlist.includes(product.id);
  const cartItem = cart.find(item => item.product.id === product.id);

  return (
    <div className="card h-100 position-relative">
      <button
        className={`wishlist-btn position-absolute top-0 end-0 m-2 z-1 ${isWishlisted ? 'active' : ''}`}
        onClick={() => toggleWishlist(product.id)}
        aria-label="Toggle Wishlist"
      >
        <Heart fill={isWishlisted ? "currentColor" : "none"} strokeWidth={1.5} size={24} />
      </button>

      <Link to={`/product/${product.id}`} className="text-decoration-none d-block">
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>

      <div className="card-body d-flex flex-column">
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <h5 className="card-title fw-bold text-white mb-0">{product.name}</h5>
        </Link>
        <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
          <span className="price-tag">${product.price.toFixed(2)}</span>
          <span className="badge bg-secondary">{product.category}</span>
        </div>

        <p className="card-text text-muted small flex-grow-1">{product.description}</p>

        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary">
          <small className={product.stock > 0 ? "text-success" : "text-danger"}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </small>

          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            <ShoppingCart size={16} />
            {cartItem ? `Add More (${cartItem.quantity})` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
