import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Payment() {
  const { cart, addOrder } = useStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0 && !success) {
    return (
      <div className="container py-5 text-center">
        <h2>Your cart is empty</h2>
        <p className="text-muted">Add some products to your cart before proceeding to checkout.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate backend payment process
    setTimeout(() => {
      addOrder({
        customerName: formData.fullName,
        email: formData.email,
        total: total,
        items: cart.length
      });
      setIsProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <CheckCircle size={80} className="text-success mb-4 mx-auto d-block" />
        <h1 className="display-4 fw-bold mb-3">Payment Successful!</h1>
        <p className="lead text-muted mb-4">Your order has been placed and is being processed.</p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold d-flex align-items-center gap-2">
        <CreditCard className="text-primary" /> Secure Checkout
      </h2>

      <div className="row g-5">
        <div className="col-lg-8">
          <div className="card mb-4 border-0" style={{ backgroundColor: 'var(--tv-panel)', border: '1px solid var(--tv-border) !important', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
            <div className="card-header text-white border-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'var(--tv-border) !important' }}>
              <h5 className="mb-0 fw-bold">Shipping & Billing Information</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label text-muted small">Full Name</label>
                    <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small">Email Address</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-muted small">Street Address</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small">City</label>
                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small">Zip Code</label>
                    <input type="text" className="form-control" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                  </div>
                </div>

                <div className="border-top pt-4 mt-4" style={{ borderColor: 'var(--tv-border) !important' }}>
                  <h5 className="mb-3 d-flex align-items-center gap-2">Payment Details <ShieldCheck size={18} className="text-success" /></h5>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label text-muted small">Card Number</label>
                      <input type="text" className="form-control" placeholder="0000 0000 0000 0000" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Expiry Date</label>
                      <input type="text" className="form-control" placeholder="MM/YY" name="expiry" value={formData.expiry} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">CVV</label>
                      <input type="text" className="form-control" placeholder="123" name="cvv" value={formData.cvv} onChange={handleChange} required />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-success btn-lg w-100 mt-5 shadow-sm fw-bold d-flex justify-content-center align-items-center gap-2"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : <CreditCard size={20} />}
                  {isProcessing ? 'Processing Payment...' : `Pay $${total.toFixed(2)}`}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card sticky-top border-0" style={{ top: '100px', backgroundColor: 'var(--tv-panel)', border: '1px solid var(--tv-border) !important', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', zIndex: '900' }}>
            <div className="card-header text-white border-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'var(--tv-border) !important' }}>
              <h5 className="mb-0 fw-bold">Order Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-4">
                {cart.map(item => (
                  <li key={item.product.id} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom" style={{ borderColor: 'var(--tv-border) !important' }}>
                    <div className="d-flex align-items-center gap-3">
                      <img src={item.product.image} alt={item.product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div>
                        <p className="mb-0 fw-bold small">{item.product.name}</p>
                        <p className="mb-0 text-muted small">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="fw-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom" style={{ borderColor: 'var(--tv-border) !important' }}>
                <span className="text-muted">Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="h5 mb-0 fw-bold">Total</span>
                <span className="h4 mb-0 fw-bold text-success">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
