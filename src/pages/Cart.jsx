import { useStore } from '../store';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3 className="mb-4">Your Cart is Empty</h3>
        <p className="text-muted mb-4">You have no items in your cart.</p>
        <Link to="/" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 d-flex align-items-center gap-2">
        <span className="text-warning">&bull;</span> Your Cart
      </h2>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-3">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="card border-0 shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--tv-panel)' }}>
                <div className="card-body p-3">
                  <div className="row align-items-center g-3">
                    <div className="col-auto">
                      <Link to={`/product/${product.id}`}>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="rounded-3 object-fit-cover shadow-sm"
                          style={{ width: 100, height: 100 }} 
                        />
                      </Link>
                    </div>

                    <div className="col">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <Link to={`/product/${product.id}`} className="text-decoration-none">
                          <h6 className="mb-0 fw-bold fs-5" style={{ color: 'var(--tv-text)' }}>{product.name}</h6>
                        </Link>
                        <button className="btn btn-link text-danger p-0 border-0 shadow-none" onClick={() => removeFromCart(product.id)}>
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <small className="text-muted d-block mb-2">{product.category}</small>
                      
                      <div className="d-flex align-items-center justify-content-between mt-auto">
                        <div className="d-flex align-items-center gap-2 bg-dark bg-opacity-25 rounded-pill p-1 border border-secondary border-opacity-25">
                          <button className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center p-1 hover-bg-light" style={{ width: 28, height: 28 }} onClick={() => updateQuantity(product.id, quantity - 1)}>
                            <Minus size={14} />
                          </button>
                          <span className="fw-bold px-2 small">{quantity}</span>
                          <button className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center p-1 hover-bg-light" style={{ width: 28, height: 28 }} onClick={() => updateQuantity(product.id, quantity + 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <div className="text-end">
                          <div className="price-tag fs-5">${(product.price * quantity).toFixed(2)}</div>
                          {quantity > 1 && <small className="text-muted d-block x-small">${product.price.toFixed(2)} each</small>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-lg border-0 sticky-top" style={{ top: '100px', backgroundColor: 'var(--tv-panel)' }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4" style={{ color: 'var(--tv-text)' }}>Order Summary</h5>

              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: 'var(--tv-text-muted)' }}>Subtotal</span>
                <span className="fw-medium" style={{ color: 'var(--tv-text)' }}>${total.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom border-secondary border-opacity-25">
                <span style={{ color: 'var(--tv-text-muted)' }}>Estimated Tax (8%)</span>
                <span className="fw-medium" style={{ color: 'var(--tv-text)' }}>${(total * 0.08).toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-4 mt-2">
                <span className="fs-5 fw-bold" style={{ color: 'var(--tv-text)' }}>Total</span>
                <span className="fs-4 fw-bold text-success">${(total * 1.08).toFixed(2)}</span>
              </div>

              <button className="btn btn-success w-100 py-3 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 mb-3" onClick={() => navigate('/payment')}>
                 Proceed to Checkout
              </button>
              
              <Link to="/shop" className="btn btn-outline-secondary w-100 py-2 border-secondary border-opacity-50 small" style={{ color: 'var(--tv-text)' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
