import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useProducts } from '../hooks/useProducts'
import { ProductCard } from '../components/ProductCard'

const categories = ['Todos', 'Ropa', 'Zapatos', 'Accesorios', 'Complementos']

export function Catalog() {
  const { category } = useParams()
  const activeCategory = category || 'Todos'
  const { products, loading } = useProducts(activeCategory)

  return (
    <>
      <Helmet>
        <title>{activeCategory === 'Todos' ? 'Catálogo' : activeCategory} | ELEGIDA Habana</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Catálogo</h1>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <Link
              key={cat}
              to={cat === 'Todos' ? '/catalog' : `/catalog/${cat}`}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {loading ? (
          <p className="text-center py-12">Cargando...</p>
        ) : products.length === 0 ? (
          <p className="text-center py-12 text-gray-500">Sin productos en esta categoría</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </>
  )
}