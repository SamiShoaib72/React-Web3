import { useStore } from '../store';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, products } = useStore();
  
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="container py-4">
      <h2 className="mb-4 d-flex align-items-center gap-2 border-bottom pb-2" style={{ borderColor: 'var(--tv-border)', color: 'var(--tv-text)' }}>
        <Heart style={{ color: 'var(--tv-red)' }} fill="currentColor" /> My Wishlist
      </h2>
      
      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted mb-4 opacity-75">Your Wishlist is currently empty. Start adding your favorite kicks!</p>
          <Link to="/shop" className="btn btn-outline-primary rounded-pill px-4">Browse Collection</Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {wishlistedProducts.map(product => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
