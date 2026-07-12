import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useCartStore } from '../store/cartStore'
import { Trash2 } from 'lucide-react'

export function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore()

  return (
    <>
      <Helmet><title>Carrito | ELEGIDA Habana</title></Helmet>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
            <Link to="/catalog" className="text-primary font-semibold">Seguir comprando</Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4 bg-white p-4 rounded-lg shadow">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Talla: {item.size} | Color: {item.color}</p>
                    <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={e => updateQuantity(item.productId, item.size, item.color, Number(e.target.value))}
                        className="w-16 p-1 border rounded"
                      />
                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total:</span>
                <span className="text-primary">${total().toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="block text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-pink-700"
              >
                Proceder al pago
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}