import { useStore } from '../store';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Shop() {
  const { products } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-5">
      <div className="row mb-5 align-items-center">
        <div className="col-12 col-md-4 mb-3 mb-md-0">
          <h2 className="fw-bold m-0"><span className="text-warning">&bull;</span> Complete Collection</h2>
        </div>
        <div className="col-12 col-md-8 d-flex flex-column flex-md-row gap-2 justify-content-md-end">
          <select 
            className="form-select w-auto" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="input-group">
            <span className="input-group-text bg-transparent border-end-0"><Search size={18} /></span>
            <input 
              type="text" 
              className="form-control border-start-0 ps-0" 
              placeholder="Search kicks..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-12 py-5 text-center text-muted">
            <h4>No products found matching your criteria.</h4>
          </div>
        )}
      </div>
    </div>
  );
}
