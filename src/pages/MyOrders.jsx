import { useStore } from '../store';
import { Package, Clock, CheckCircle, Truck, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function MyOrders() {
  const { orders, user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Filter orders by user email (in a real app, this would use a userId)
  const myOrders = orders.filter(o => o.email === user.email || o.customerName === user.email.split('@')[0]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="text-warning" size={18} />;
      case 'Processing': return <ShoppingBag className="text-primary" size={18} />;
      case 'Shipped': return <Truck className="text-info" size={18} />;
      case 'Delivered': return <CheckCircle className="text-success" size={18} />;
      default: return <Package size={18} />;
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="fw-bold m-0" style={{ color: 'var(--tv-text)' }}>
          <span className="text-warning">&bull;</span> My Purchase History
        </h2>
        <Link to="/shop" className="btn btn-outline-primary btn-sm rounded-pill px-4">
          Continue Shopping
        </Link>
      </div>

      {myOrders.length === 0 ? (
        <div className="text-center py-5 rounded-4" style={{ backgroundColor: 'var(--tv-panel)', border: '1px solid var(--tv-border)' }}>
          <Package size={64} className="text-muted mb-3 opacity-25" />
          <h3 style={{ color: 'var(--tv-text)' }}>No orders yet</h3>
          <p className="text-muted mb-4">You haven't placed any orders yet. Start your journey with ADRINO today!</p>
          <Link to="/shop" className="btn btn-primary px-5 py-2">Browser Collection</Link>
        </div>
      ) : (
        <div className="row g-4">
          {myOrders.map(order => (
            <div key={order.id} className="col-12">
              <div className="card border-0 shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--tv-panel)', border: '1px solid var(--tv-border)' }}>
                <div className="card-header border-bottom border-secondary border-opacity-10 p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                    <div>
                      <span className="text-muted small text-uppercase fw-bold">Order ID</span>
                      <h6 className="mb-0 fw-bold" style={{ color: 'var(--tv-text)' }}>#{String(order.id).slice(-8).toUpperCase()}</h6>
                    </div>
                    <div>
                      <span className="text-muted small text-uppercase fw-bold">Date Placed</span>
                      <h6 className="mb-0" style={{ color: 'var(--tv-text)' }}>{order.date}</h6>
                    </div>
                    <div>
                      <span className="text-muted small text-uppercase fw-bold">Total Amount</span>
                      <h6 className="mb-0 fw-bold text-success">${order.total?.toFixed(2)}</h6>
                    </div>
                    <div className="d-flex align-items-center gap-2 bg-dark bg-opacity-25 px-3 py-2 rounded-pill border border-secondary border-opacity-25">
                      {getStatusIcon(order.status)}
                      <span className="small fw-bold" style={{ color: 'white' }}>{order.status}</span>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                   <div className="d-flex align-items-center gap-3">
                      <div className="p-3 rounded-3 bg-primary bg-opacity-10">
                        <Package className="text-primary" size={32} />
                      </div>
                      <div>
                        <h6 className="mb-1" style={{ color: 'var(--tv-text)' }}>Order confirmed and {order.status.toLowerCase()}</h6>
                        <p className="text-muted small mb-0">We will notify you with another update soon.</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
