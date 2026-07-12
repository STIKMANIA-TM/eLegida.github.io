import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useCartStore } from '../store/cartStore'
import { supabase } from '../lib/supabase'

export function Checkout() {
  const { items, total, clearCart } = useCartStore()
  const navigate = useNavigate()
  const [method, setMethod] = useState('transfermovil')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          total: total(),
          status: 'pending',
          payment_method: method,
          shipping_address: { name, phone, address },
        })
        .select()
        .single()
      if (error) throw error

      const itemsToInsert = items.map(i => ({
        order_id: order.id,
        product_id: i.productId,
        quantity: i.quantity,
        size: i.size,
        color: i.color,
        price: i.price,
      }))
      await supabase.from('order_items').insert(itemsToInsert)

      clearCart()
      navigate(`/order-success?id=${order.id}`)
    } catch (err) {
      console.error(err)
      alert('Error al procesar el pedido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Checkout | ELEGIDA Habana</title></Helmet>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Finalizar compra</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block font-semibold mb-1">Nombre completo</label>
            <input required value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Teléfono</label>
            <input required value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Dirección de entrega</label>
            <textarea required value={address} onChange={e => setAddress(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Método de pago</label>
            <select value={method} onChange={e => setMethod(e.target.value)} className="w-full p-2 border rounded">
              <option value="transfermovil">Transfermóvil</option>
              <option value="enz">EnZona</option>
              <option value="cash">Efectivo contra entrega</option>
            </select>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Resumen</p>
            {items.map((i, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>{i.name} x{i.quantity}</span>
                <span>${(i.price * i.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 font-bold">Total: ${total().toFixed(2)}</div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Confirmar pedido'}
          </button>
        </form>
      </div>
    </>
  )
}