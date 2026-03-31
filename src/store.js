import { create } from 'zustand';
import { initialProducts } from './mockData';

export const useStore = create((set) => ({
  products: initialProducts,
  cart: [],
  wishlist: [],
  user: null, // { email: 'admin@test.com', role: 'admin' }
  orders: [
    { id: 101, userId: 1, customerName: 'Alice Smith', total: 245.00, status: 'Processing', date: '2025-10-15' },
    { id: 102, userId: 2, customerName: 'Bob Jones', total: 120.50, status: 'Shipped', date: '2025-10-14' }
  ],
  usersList: [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'user', joined: '2025-01-15' },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'user', joined: '2025-02-20' },
    { id: 3, name: 'Admin User', email: 'admin@test.com', role: 'admin', joined: '2024-11-10' }
  ],

  // Cart actions
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.product.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { cart: [...state.cart, { product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.product.id !== productId)
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),

  // Wishlist actions
  toggleWishlist: (productId) => set((state) => {
    const exists = state.wishlist.includes(productId);
    if (exists) {
      return { wishlist: state.wishlist.filter(id => id !== productId) };
    }
    return { wishlist: [...state.wishlist, productId] };
  }),

  // Auth actions
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),

  // Admin actions
  addProduct: (product) => set((state) => ({
    products: [...state.products, { ...product, id: Date.now() }]
  })),
  updateProduct: (updatedProduct) => set((state) => ({
    products: state.products.map(p => p.id === updatedProduct.id ? updatedProduct : p),
    cart: state.cart.map(c => c.product.id === updatedProduct.id ? { ...c, product: updatedProduct } : c)
  })),
  removeProduct: (productId) => set((state) => ({
    products: state.products.filter(p => p.id !== productId),
    cart: state.cart.filter(c => c.product.id !== productId),
    wishlist: state.wishlist.filter(w => w !== productId)
  })),
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
  })),
  updateUserRole: (userId, role) => set((state) => ({
    usersList: state.usersList.map(u => u.id === userId ? { ...u, role } : u)
  })),

  // Checkout action
  addOrder: (orderData) => set((state) => ({
    orders: [{ ...orderData, id: Date.now(), status: 'Pending', date: new Date().toISOString().split('T')[0] }, ...state.orders],
    cart: [] // Clear cart on successful order
  }))
}));
