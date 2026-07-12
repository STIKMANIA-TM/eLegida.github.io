import { Link } from 'react-router-dom'
import { ShoppingBag, User, Menu } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export function Header() {
  const itemsCount = useCartStore(s => s.items.reduce((sum, i) => sum + i.quantity, 0))

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          ELEGIDA
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <Link to="/catalog" className="hover:text-primary">Catálogo</Link>
          <Link to="/catalog/Ropa" className="hover:text-primary">Ropa</Link>
          <Link to="/catalog/Zapatos" className="hover:text-primary">Zapatos</Link>
          <Link to="/catalog/Accesorios" className="hover:text-primary">Accesorios</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" aria-label="Cuenta">
            <User className="w-6 h-6 hover:text-primary" />
          </Link>
          <Link to="/cart" className="relative" aria-label="Carrito">
            <ShoppingBag className="w-6 h-6 hover:text-primary" />
            {itemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}