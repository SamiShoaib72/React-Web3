import { useState } from 'react';
import { useStore } from '../store';
import { Settings, PlusCircle, Trash2, Edit, Package, Users, FileText, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const { products, addProduct, removeProduct, updateProduct, user, orders, updateOrderStatus, usersList, updateUserRole } = useStore();
  const [activeTab, setActiveTab] = useState('inventory'); // inventory, users, orders
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const startEditProduct = (product) => {
    setEditingProductId(product.id);
    setEditingProduct({ ...product });
  };

  const saveEditProduct = () => {
    updateProduct({
      ...editingProduct,
      price: parseFloat(editingProduct.price) || 0,
      stock: parseInt(editingProduct.stock) || 0
    });
    setEditingProductId(null);
    setEditingProduct(null);
  };

  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditingProduct({ ...editingProduct, image: reader.result });
        } else {
          setNewProduct({ ...newProduct, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    stock: ''
  });

  if (user?.role !== 'admin') {
    return (
      <div className="container py-5 text-center">
        <h2>Access Denied</h2>
        <p className="text-muted">You do not have administrative privileges to view this section.</p>
      </div>
    );
  }

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addProduct({
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    });
    setNewProduct({ name: '', price: '', category: '', image: '', description: '', stock: '' });
    setShowAddForm(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3" style={{ borderColor: 'var(--tv-border)' }}>
        <h2 className="m-0 d-flex align-items-center gap-2 fw-bold text-dark">
          <Settings className="text-warning" /> Admin Control Panel
        </h2>
        {activeTab === 'inventory' && (
          <button
            className="btn btn-warning fw-bold d-flex align-items-center gap-2 rounded-pill px-4"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <PlusCircle size={18} /> Add Shoe
          </button>
        )}
      </div>

      <ul className="nav nav-pills mb-4 gap-2">
        <li className="nav-item">
          <button className={`nav-link font-weight-bold d-flex align-items-center gap-2 ${activeTab === 'inventory' ? 'active bg-primary' : 'bg-dark text-light border border-secondary'}`} onClick={() => setActiveTab('inventory')}>
            <Package size={18} /> Inventory
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link font-weight-bold d-flex align-items-center gap-2 ${activeTab === 'orders' ? 'active bg-primary' : 'bg-dark text-light border border-secondary'}`} onClick={() => setActiveTab('orders')}>
            <FileText size={18} /> Orders
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link font-weight-bold d-flex align-items-center gap-2 ${activeTab === 'users' ? 'active bg-primary' : 'bg-dark text-light border border-secondary'}`} onClick={() => setActiveTab('users')}>
            <Users size={18} /> Users
          </button>
        </li>
      </ul>

      {activeTab === 'inventory' && (
        <>
          {showAddForm && (
            <div className="card mb-4 border-0" style={{ backgroundColor: 'var(--tv-panel)', border: '1px solid var(--tv-border) !important', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
              <div className="card-header text-white border-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'var(--tv-border) !important' }}>
                <h5 className="mb-0 fw-bold">Add New Shoe Listing</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleAddSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Name</label>
                      <input type="text" className="form-control" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-muted small">Price ($)</label>
                      <input type="number" step="0.01" className="form-control" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label text-muted small">Stock</label>
                      <input type="number" className="form-control" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Image File (Upload)</label>
                      <div className="d-flex align-items-center gap-2">
                        <input type="file" accept="image/*" className="form-control" onChange={(e) => handleImageUpload(e, false)} required={!newProduct.image} />
                        {newProduct.image && <img src={newProduct.image} alt="Preview" style={{ height: '38px', objectFit: 'cover', borderRadius: '4px' }} />}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Category</label>
                      <input type="text" className="form-control" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} required />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-muted small">Description</label>
                      <textarea className="form-control" rows="2" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} required></textarea>
                    </div>
                    <div className="col-12 d-flex justify-content-end gap-2 text-end">
                      <button type="button" className="btn btn-outline-light" onClick={() => setShowAddForm(false)}>Cancel</button>
                      <button type="submit" className="btn btn-success">Publish Shoe</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="card bg-dark border-secondary">
            <div className="card-header border-bottom-0 pb-0 bg-dark text-light">
              <h5 className="mb-3 fw-bold">Active Inventory</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 text-light">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Shoe Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Stock Level</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      {editingProductId === product.id ? (
                        <>
                          <td data-label="ID" className="text-muted small">#{product.id.toString().slice(-4)}</td>
                          <td data-label="Shoe Name">
                            <div className="d-flex flex-column gap-2 mb-1">
                              <input type="text" className="form-control form-control-sm bg-dark text-light border-secondary" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} placeholder="Name" />
                              <div className="d-flex align-items-center gap-2">
                                <input type="file" accept="image/*" className="form-control form-control-sm bg-dark text-light border-secondary" onChange={(e) => handleImageUpload(e, true)} />
                                {editingProduct.image && <img src={editingProduct.image} alt="Preview" style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: '4px' }} />}
                              </div>
                            </div>
                          </td>
                          <td data-label="Price"><input type="number" step="0.01" className="form-control form-control-sm bg-dark text-light border-secondary" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} style={{ width: "80px" }} /></td>
                          <td data-label="Category"><input type="text" className="form-control form-control-sm bg-dark text-light border-secondary" value={editingProduct.category} onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })} style={{ width: "100px" }} /></td>
                          <td data-label="Stock"><input type="number" className="form-control form-control-sm bg-dark text-light border-secondary" value={editingProduct.stock} onChange={e => setEditingProduct({ ...editingProduct, stock: e.target.value })} style={{ width: "80px" }} /></td>
                          <td data-label="Actions" className="text-end">
                            <button className="btn btn-sm btn-success me-2" onClick={saveEditProduct}>Save</button>
                            <button className="btn btn-sm btn-outline-light" onClick={() => setEditingProductId(null)}>Cancel</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td data-label="ID" className="text-muted small">#{product.id.toString().slice(-4)}</td>
                          <td data-label="Shoe Name">
                            <div className="d-flex align-items-center gap-3">
                              <img src={product.image} alt={product.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '4px' }} />
                              <span className="fw-bold">{product.name}</span>
                            </div>
                          </td>
                          <td data-label="Price" className="fw-bold text-success">${product.price.toFixed(2)}</td>
                          <td data-label="Category"><span className="badge bg-secondary">{product.category}</span></td>
                          <td data-label="Stock">
                            <span className={`badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td data-label="Actions" className="text-end">
                            <button className="btn btn-sm btn-primary me-2" onClick={() => startEditProduct(product)}>
                              <Edit size={14} />
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => removeProduct(product.id)}>
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">No shoes listed yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'orders' && (
        <div className="card" style={{ backgroundColor: 'var(--tv-panel)', border: '1px solid var(--tv-border)' }}>
          <div className="card-header border-bottom-0 pb-0" style={{ color: 'var(--tv-text)' }}>
            <h5 className="mb-3 fw-bold">Recent Orders</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map(order => (
                  <tr key={order.id}>
                    <td data-label="Order ID" className="text-muted small">#{String(order.id).slice(-6)}</td>
                    <td data-label="Date" className="small">{order.date}</td>
                    <td data-label="Customer" className="fw-bold">{order.customerName || order.email || 'Guest User'}</td>
                    <td data-label="Total" className="fw-bold text-success">${order.total?.toFixed(2)}</td>
                    <td data-label="Status">
                      <select
                        className={`form-select form-select-sm fw-bold ${order.status === 'Processing' ? 'text-primary' : order.status === 'Shipped' ? 'text-info' : order.status === 'Pending' ? 'text-warning' : 'text-success'}`}
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        style={{ backgroundColor: 'var(--tv-bg, #1e222d)', border: '1px solid var(--tv-border, #434651)', width: '130px' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td data-label="Actions" className="text-end">
                      <button className="btn btn-sm btn-outline-dark">View Details</button>
                    </td>
                  </tr>
                ))}
                {(!orders || orders.length === 0) && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card" style={{ backgroundColor: 'var(--tv-panel)', border: '1px solid var(--tv-border)' }}>
          <div className="card-header border-bottom-0 pb-0" style={{ color: 'var(--tv-text)' }}>
            <h5 className="mb-3 fw-bold">Registered Users</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList?.map(u => (
                  <tr key={u.id}>
                    <td data-label="User ID" className="text-muted small">#{u.id}</td>
                    <td data-label="Name" className="fw-bold">{u.name}</td>
                    <td data-label="Email">{u.email}</td>
                    <td data-label="Role">
                      <select
                        className={`form-select form-select-sm fw-bold ${u.role === 'admin' ? 'text-danger' : 'text-secondary'}`}
                        value={u.role}
                        onChange={(e) => updateUserRole(u.id, e.target.value)}
                        style={{ backgroundColor: 'var(--tv-bg, #1e222d)', border: '1px solid var(--tv-border, #434651)', width: '100px' }}
                      >
                        <option value="user">USER</option>
                        <option value="admin">ADMIN</option>
                      </select>
                    </td>
                    <td data-label="Joined" className="small">{u.joined}</td>
                    <td data-label="Actions" className="text-end">
                      <button className="btn btn-sm btn-outline-dark">Manage</button>
                    </td>
                  </tr>
                ))}
                {(!usersList || usersList.length === 0) && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
