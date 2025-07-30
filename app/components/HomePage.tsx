import { featured, feop } from '../data/products'
import Navbar from './Navbar'

import ProductCard from './ProductCard'


export default function HomePage() {
  return (
    <div className="pb-24 max-w-7xl mx-auto">
      <Navbar />

      

        {/* Featured */}
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-3">Featured Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {featured.map((item, idx) => (
              <ProductCard key={idx} {...item} />
            ))}
          </div>
        </div>

        {/* Feop */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Feop Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {feop.map((item, idx) => (
              <ProductCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>

    
  
  )
}

