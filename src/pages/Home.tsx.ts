import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useProducts } from '../hooks/useProducts'
import { ProductCard } from '../components/ProductCard'

export function Home() {
  const { products } = useProducts()
  const featured = products.filter(p => p.featured).slice(0, 8)

  return (
    <>
      <Helmet>
        <title>ELEGIDA Habana - Moda Exclusiva en La Habana</title>
        <meta name="description" content="Tienda de moda exclusiva en Vedado y Centro Habana. Ropa, zapatos y accesorios." />
      </Helmet>

      <section className="bg-gradient-to-r from-primary to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">ELEGIDA Habana</h1>
          <p className="text-xl mb-8">Moda exclusiva para ti</p>
          <Link
            to="/catalog"
            className="inline-block bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100"
          >
            Ver Catálogo
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Productos Destacados</h2>
        {featured.length === 0 ? (
          <p className="text-center text-gray-500">Cargando productos...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  )
}