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
      <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-secondary border-opacity-25 pb-4">
        <h2 className="m-0 d-flex align-items-center gap-3 fw-bold" style={{ color: 'var(--tv-text)' }}>
          <div className="p-2 rounded-3 bg-warning bg-opacity-10">
            <Settings className="text-warning" size={28} />
          </div>
          Admin Control Center
        </h2>
        {activeTab === 'inventory' && (
          <button
            className="btn btn-warning fw-bold d-flex align-items-center gap-2 rounded-3 px-4 py-2 shadow-sm transition-transform"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <PlusCircle size={20} /> Add New Shoe
          </button>
        )}
      </div>

      <div className="d-flex flex-column flex-md-row gap-3 mb-5">
        <button className={`btn d-flex align-items-center gap-2 px-4 py-2 fw-bold transition-transform ${activeTab === 'inventory' ? 'btn-primary shadow-sm' : 'btn-outline-primary border-opacity-25'}`} onClick={() => setActiveTab('inventory')} style={{ color: activeTab === 'inventory' ? 'white' : 'var(--tv-text)' }}>
          <Package size={18} /> Inventory
        </button>
        <button className={`btn d-flex align-items-center gap-2 px-4 py-2 fw-bold transition-transform ${activeTab === 'orders' ? 'btn-primary shadow-sm' : 'btn-outline-primary border-opacity-25'}`} onClick={() => setActiveTab('orders')} style={{ color: activeTab === 'orders' ? 'white' : 'var(--tv-text)' }}>
          <FileText size={18} /> Orders
        </button>
        <button className={`btn d-flex align-items-center gap-2 px-4 py-2 fw-bold transition-transform ${activeTab === 'users' ? 'btn-primary shadow-sm' : 'btn-outline-primary border-opacity-25'}`} onClick={() => setActiveTab('users')} style={{ color: activeTab === 'users' ? 'white' : 'var(--tv-text)' }}>
          <Users size={18} /> User Management
        </button>
      </div>

      {activeTab === 'inventory' && (
        <div className="row g-4">
          {showAddForm && (
            <div className="col-12">
              <div className="card border-0 shadow-lg overflow-hidden animate-fade-in" style={{ backgroundColor: 'var(--tv-panel)' }}>
                <div className="card-header border-bottom border-secondary border-opacity-25 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <h5 className="mb-0 fw-bold" style={{ color: 'var(--tv-text)' }}>List New Product</h5>
                </div>
                <div className="card-body p-4">
                  <form onSubmit={handleAddSubmit}>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>Product Name</label>
                        <input type="text" className="form-control py-2" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required placeholder="e.g. Air Max Fusion" />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>Price ($)</label>
                        <input type="number" step="0.01" className="form-control py-2" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required placeholder="0.00" />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>Stock Quantity</label>
                        <input type="number" className="form-control py-2" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} required placeholder="0" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>Product Image (Upload)</label>
                        <div className="d-flex align-items-center gap-3">
                          <input type="file" accept="image/*" className="form-control py-2" onChange={(e) => handleImageUpload(e, false)} required={!newProduct.image} />
                          {newProduct.image && <img src={newProduct.image} alt="Preview" className="rounded-3 shadow-sm border border-secondary" style={{ height: '42px', width: '42px', objectFit: 'cover' }} />}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>Category</label>
                        <input type="text" className="form-control py-2" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} required placeholder="e.g. Lifestyle" />
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-medium" style={{ color: 'var(--tv-text-muted)' }}>Description</label>
                        <textarea className="form-control py-2" rows="3" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} required placeholder="Tell customers more about this shoe..."></textarea>
                      </div>
                      <div className="col-12 d-flex justify-content-end gap-2 mt-2">
                        <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setShowAddForm(false)}>Cancel</button>
                        <button type="submit" className="btn btn-success px-4 fw-bold">Publish Listing</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="col-12">
            <div className="card border-0 shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--tv-panel)' }}>
              <div className="card-header border-bottom border-secondary border-opacity-25 bg-none p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                <h5 className="mb-0 fw-bold" style={{ color: 'var(--tv-text)' }}>Active Product Inventory</h5>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0" style={{ color: 'var(--tv-text)' }}>
                  <thead style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <tr>
                      <th className="px-4 py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>PRODUCT</th>
                      <th className="py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>PRICE</th>
                      <th className="py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>CATEGORY</th>
                      <th className="py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>STOCK STATUS</th>
                      <th className="px-4 py-3 border-0 small fw-bold text-end" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-bottom border-secondary border-opacity-10">
                        {editingProductId === product.id ? (
                          <>
                            <td className="px-4 py-3">
                              <div className="d-flex flex-column gap-2">
                                <input type="text" className="form-control form-control-sm" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                                <div className="d-flex align-items-center gap-2">
                                  <input type="file" accept="image/*" className="form-control form-control-sm" onChange={(e) => handleImageUpload(e, true)} />
                                  {editingProduct.image && <img src={editingProduct.image} alt="Preview" className="rounded-2" style={{ width: 28, height: 28, objectFit: 'cover' }} />}
                                </div>
                              </div>
                            </td>
                            <td className="py-3"><input type="number" step="0.01" className="form-control form-control-sm" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} style={{ width: "90px" }} /></td>
                            <td className="py-3"><input type="text" className="form-control form-control-sm" value={editingProduct.category} onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })} style={{ width: "110px" }} /></td>
                            <td className="py-3"><input type="number" className="form-control form-control-sm" value={editingProduct.stock} onChange={e => setEditingProduct({ ...editingProduct, stock: e.target.value })} style={{ width: "80px" }} /></td>
                            <td className="px-4 py-3 text-end">
                              <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-sm btn-success px-3 fw-bold" onClick={saveEditProduct}>Save</button>
                                <button className="btn btn-sm btn-outline-secondary px-3" onClick={() => setEditingProductId(null)}>Cancel</button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-4 py-3">
                              <div className="d-flex align-items-center gap-3">
                                <img src={product.image} alt={product.name} className="rounded-3 shadow-sm border border-secondary border-opacity-25" style={{ width: 44, height: 44, objectFit: 'cover' }} />
                                <div>
                                  <div className="fw-bold" style={{ color: 'var(--tv-text-muted)', fontSize: '0.95rem' }}>{product.name}</div>
                                  <div className="x-small mt-1" style={{ color: 'var(--tv-text-muted)' }}>ID: <span className="opacity-75">#{String(product.id).slice(-4)}</span></div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 fw-bold text-success small">${product.price.toFixed(2)}</td>
                            <td className="py-3">
                              <span className="badge px-2 py-1 x-small fw-bold rounded-pill" style={{ backgroundColor: 'rgba(41, 98, 255, 0.15)', color: 'var(--tv-blue)' }}>
                                {product.category}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="d-flex align-items-center gap-2">
                                <span className={`rounded-circle ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}`} style={{ width: 8, height: 8 }}></span>
                                <span className={`small fw-medium ${product.stock > 10 ? 'text-success' : product.stock > 0 ? 'text-warning' : 'text-danger'}`}>
                                  {product.stock} Units
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-end">
                              <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-sm btn-outline-primary shadow-none p-2 rounded-3" onClick={() => startEditProduct(product)}>
                                  <Edit size={16} />
                                </button>
                                <button className="btn btn-sm btn-outline-danger shadow-none p-2 rounded-3" onClick={() => removeProduct(product.id)}>
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="card border-0 shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--tv-panel)' }}>
          <div className="card-header border-bottom border-secondary border-opacity-25 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
            <h5 className="mb-0 fw-bold" style={{ color: 'var(--tv-text)' }}>Recent Customer Orders</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ color: 'var(--tv-text)' }}>
              <thead style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                <tr>
                  <th className="px-4 py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>ORDER ID</th>
                  <th className="py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>DATE</th>
                  <th className="py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>CUSTOMER</th>
                  <th className="py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>TOTAL</th>
                  <th className="py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>STATUS</th>
                  <th className="px-4 py-3 border-0 small fw-bold text-end" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map(order => (
                  <tr key={order.id} className="border-bottom border-secondary border-opacity-10">
                    <td className="px-4 py-3 small fw-bold" style={{ color: 'var(--tv-text-muted)' }}>#{String(order.id).slice(-8).toUpperCase()}</td>
                    <td className="py-3 small" style={{ color: 'var(--tv-text-muted)' }}>{order.date}</td>
                    <td className="py-3 fw-bold" style={{ color: 'var(--tv-text-muted)', fontSize: '0.95rem' }}>{order.customerName || order.email || 'Guest User'}</td>
                    <td className="py-3 fw-bold text-success small">${order.total?.toFixed(2)}</td>
                    <td className="py-3">
                      <select
                        className={`form-select form-select-sm fw-bold border-secondary border-opacity-25 shadow-sm rounded-3 ${order.status === 'Processing' ? 'text-primary' : order.status === 'Shipped' ? 'text-info' : order.status === 'Pending' ? 'text-warning' : 'text-success'}`}
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        style={{ backgroundColor: 'var(--tv-bg)', width: '135px' }}
                      >
                        <option value="Pending">🕒 Pending</option>
                        <option value="Processing">🔄 Processing</option>
                        <option value="Shipped">📦 Shipped</option>
                        <option value="Delivered">✅ Delivered</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-end">
                      <button className="btn btn-sm btn-primary px-3 rounded-pill small border-opacity-25 transition-transform" style={{ color: 'var(--tv-text)' }}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card border-0 shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--tv-panel)' }}>
          <div className="card-header border-bottom border-secondary border-opacity-25 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
            <h5 className="mb-0 fw-bold" style={{ color: 'var(--tv-text)' }}>Registered Customer Base</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ color: 'var(--tv-text)' }}>
              <thead style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                <tr>
                  <th className="px-4 py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>USER ID</th>
                  <th className="py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>FULL NAME</th>
                  <th className="py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>EMAIL ADDRESS</th>
                  <th className="py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>ACCESS ROLE</th>
                  <th className="py-3 border-0 small fw-bold" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>JOINED DATE</th>
                  <th className="px-4 py-3 border-0 small fw-bold text-end" style={{ color: 'var(--tv-text-muted)', letterSpacing: '0.5px' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {usersList?.map(u => (
                  <tr key={u.id} className="border-bottom border-secondary border-opacity-10">
                    <td className="px-4 py-3 small fw-bold" style={{ color: 'var(--tv-text-muted)' }}>#{u.id}</td>
                    <td className="py-3 fw-bold" style={{ color: 'var(--tv-text-muted)', fontSize: '0.95rem' }}>{u.name}</td>
                    <td className="py-3 small" style={{ color: 'var(--tv-text-muted)' }}>{u.email}</td>
                    <td className="py-3">
                      <select
                        className={`form-select form-select-sm fw-bold border-secondary border-opacity-25 shadow-sm rounded-3 ${u.role === 'admin' ? 'text-danger' : 'text-primary'}`}
                        value={u.role}
                        onChange={(e) => updateUserRole(u.id, e.target.value)}
                        style={{ backgroundColor: 'var(--tv-bg)', width: '110px' }}
                      >
                        <option value="user">CUSTOMER</option>
                        <option value="admin">ADMIN</option>
                      </select>
                    </td>
                    <td className="py-3 small" style={{ color: 'var(--tv-text-muted)' }}>{u.joined}</td>
                    <td className="px-4 py-3 text-end">
                      <button className="btn btn-sm btn-primary px-3 rounded-pill small border-opacity-25 transition-transform" style={{ color: 'var(--tv-text)' }}>Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
