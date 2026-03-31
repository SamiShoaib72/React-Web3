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

      <div className="row">
        <div className="col-lg-8">
          <div className="list-group mb-4">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="list-group-item d-flex flex-column flex-md-row gap-3 py-3 px-3 align-items-center">
                <img src={product.image} alt={product.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '4px' }} />

                <div className="flex-grow-1 text-center text-md-start">
                  <h6 className="mb-0 fw-bold">{product.name}</h6>
                  <small className="text-muted">{product.category}</small>
                  <div className="price-tag fs-6 mt-1">${product.price.toFixed(2)}</div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-outline-dark btn-sm px-2" onClick={() => updateQuantity(product.id, quantity - 1)}>
                    <Minus size={15} />
                  </button>
                  <span className="fw-bold px-2">{quantity}</span>
                  <button className="btn btn-outline-dark btn-sm px-2" onClick={() => updateQuantity(product.id, quantity + 1)}>
                    <Plus size={15} />
                  </button>
                </div>

                <div className="text-end fw-bold px-3">
                  ${(product.price * quantity).toFixed(2)}
                </div>

                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(product.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card sticky-top" style={{ top: '100px', zIndex: 900 }}>
            <div className="card-body">
              <h5 className="card-title border-bottom pb-3 mb-3">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">${total.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                <span className="text-muted">Estimated Tax</span>
                <span className="fw-bold">${(total * 0.08).toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-4 fs-5">
                <span className="fw-bold">Total</span>
                <span className="chart-green fw-bold">${(total * 1.08).toFixed(2)}</span>
              </div>

              <button className="btn btn-success w-100 py-2" onClick={() => navigate('/payment')}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
