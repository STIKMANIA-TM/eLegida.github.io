import { Link } from 'react-router-dom'
import type { Product } from '../hooks/useProducts'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-lg font-bold text-primary mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
}