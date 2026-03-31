import { useStore } from '../store';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, products } = useStore();
  
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="container py-4">
      <h2 className="mb-4 d-flex align-items-center gap-2 border-bottom pb-2" style={{borderColor: 'var(--tv-border)'}}>
        <Heart className="chart-red" fill="currentColor" /> Wishlist
      </h2>
      
      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted mb-4">Your Wishlist is empty. Add some shoes to track them.</p>
          <Link to="/" className="btn btn-outline-light">Browse Shop</Link>
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
