import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useProduct } from '../hooks/useProducts'
import { useCartStore } from '../store/cartStore'
import { ShoppingCart } from 'lucide-react'

export function ProductDetail() {
  const { id } = useParams()
  const { product, loading } = useProduct(id!)
  const addItem = useCartStore(s => s.addItem)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [qty, setQty] = useState(1)

  if (loading) return <p className="text-center py-12">Cargando...</p>
  if (!product) return <p className="text-center py-12">Producto no encontrado</p>

  function handleAdd() {
    if (!size || !color) {
      alert('Selecciona talla y color')
      return
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      size,
      color,
      image: product.images?.[0] || '',
    })
    alert('¡Añadido al carrito!')
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | ELEGIDA Habana</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{product.category}</p>
            <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
            <p className="text-3xl text-primary font-bold mt-4">${product.price.toFixed(2)}</p>
            <p className="mt-4 text-gray-700">{product.description}</p>

            <div className="mt-6">
              <p className="font-semibold mb-2">Talla:</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes?.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 border rounded ${size === s ? 'bg-primary text-white border-primary' : 'border-gray-300'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold mb-2">Color:</p>
              <div className="flex gap-2 flex-wrap">
                {product.colors?.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 border rounded ${color === c ? 'bg-primary text-white border-primary' : 'border-gray-300'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <input
                type="number"
                min={1}
                max={product.stock}
                value={qty}
                onChange={e => setQty(Number(e.target.value))}
                className="w-20 p-2 border rounded"
              />
              <button
                onClick={handleAdd}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-pink-700"
              >
                <ShoppingCart className="w-5 h-5" />
                Añadir al carrito
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}