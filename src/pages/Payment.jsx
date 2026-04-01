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
          <div className="card border-0 shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--tv-panel)' }}>
            <div className="card-header border-bottom border-secondary border-opacity-25 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <h5 className="mb-0 fw-bold" style={{ color: 'var(--tv-text)' }}>Shipping & Billing Information</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>Full Name</label>
                    <input type="text" className="form-control py-2" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="John Doe" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>Email Address</label>
                    <input type="email" className="form-control py-2" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>Street Address</label>
                    <input type="text" className="form-control py-2" name="address" value={formData.address} onChange={handleChange} required placeholder="123 Main St" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>City</label>
                    <input type="text" className="form-control py-2" name="city" value={formData.city} onChange={handleChange} required placeholder="New York" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>Zip Code</label>
                    <input type="text" className="form-control py-2" name="zipCode" value={formData.zipCode} onChange={handleChange} required placeholder="10001" />
                  </div>
                </div>

                <div className="mt-5 pt-4 border-top border-secondary border-opacity-25">
                  <h5 className="mb-4 d-flex align-items-center gap-2" style={{ color: 'var(--tv-text)' }}>
                    Payment Details <ShieldCheck size={20} className="text-success" />
                  </h5>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>Card Number</label>
                      <div className="input-group">
                        <span className="input-group-text bg-transparent border-secondary border-opacity-25" style={{ color: 'var(--tv-text)' }}><CreditCard size={18} /></span>
                        <input type="text" className="form-control py-2 border-start-0" placeholder="0000 0000 0000 0000" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>Expiry Date</label>
                      <input type="text" className="form-control py-2" placeholder="MM/YY" name="expiry" value={formData.expiry} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>CVV Code</label>
                      <input type="password" maxlength="3" className="form-control py-2" placeholder="***" name="cvv" value={formData.cvv} onChange={handleChange} required />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-success btn-lg w-100 mt-5 py-3 shadow-sm fw-bold d-flex justify-content-center align-items-center gap-2 rounded-3"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : <CheckCircle size={22} />}
                  {isProcessing ? 'Verifying Transaction...' : `Confirm & Pay $${total.toFixed(2)}`}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-lg sticky-top overflow-hidden" style={{ top: '100px', backgroundColor: 'var(--tv-panel)', zIndex: '900' }}>
            <div className="card-header border-bottom border-secondary border-opacity-25 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <h5 className="mb-0 fw-bold" style={{ color: 'var(--tv-text)' }}>Order Summary</h5>
            </div>
            <div className="card-body p-4">
              <div className="d-flex flex-column gap-3 mb-4">
                {cart.map(item => (
                  <div key={item.product.id} className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <div className="position-relative">
                        <img src={item.product.image} alt={item.product.name} className="rounded-3 shadow-sm" style={{ width: '56px', height: '56px', objectFit: 'cover' }} />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary border border-dark" style={{ fontSize: '0.65rem' }}>
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <p className="mb-0 fw-bold small line-clamp-1" style={{ maxWidth: '140px', color: 'var(--tv-text)' }}>{item.product.name}</p>
                        <p className="mb-0 x-small" style={{ color: 'var(--tv-text-muted)' }}>{item.product.category}</p>
                      </div>
                    </div>
                    <span className="fw-bold small" style={{ color: 'var(--tv-text-muted)' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-top border-secondary border-opacity-25 pt-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small" style={{ color: 'var(--tv-text-muted)' }}>Subtotal</span>
                  <span className="fw-medium small" style={{ color: 'var(--tv-text)' }}>${total.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="small" style={{ color: 'var(--tv-text-muted)' }}>Shipping</span>
                  <span className="text-success small fw-bold">FREE</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary border-opacity-25">
                  <span className="h5 mb-0 fw-bold" style={{ color: 'var(--tv-text)' }}>Total</span>
                  <span className="h4 mb-0 fw-bold text-success">${total.toFixed(2)}</span>
                </div>
                <div className="mt-4 p-3 rounded-3 border border-secondary border-opacity-10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                   <div className="d-flex align-items-center gap-2 x-small" style={{ color: 'var(--tv-text-muted)' }}>
                      <ShieldCheck size={14} className="text-success" />
                      <span>End-to-end encrypted payment</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
