import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../lib/supabase'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [msg, setMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isSignup) {
      const { error } = await supabase.auth.signUp({ email, password })
      setMsg(error ? error.message : 'Revisa tu correo para confirmar')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      setMsg(error ? error.message : 'Sesión iniciada')
    }
  }

  return (
    <>
      <Helmet><title>Cuenta | ELEGIDA Habana</title></Helmet>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">{isSignup ? 'Crear cuenta' : 'Iniciar sesión'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <input type="email" placeholder="Correo" required value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" />
          <input type="password" placeholder="Contraseña" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-pink-700">
            {isSignup ? 'Registrarme' : 'Entrar'}
          </button>
          <button type="button" onClick={() => setIsSignup(!isSignup)} className="w-full text-sm text-primary">
            {isSignup ? '¿Ya tienes cuenta? Entra' : '¿No tienes cuenta? Regístrate'}
          </button>
          {msg && <p className="text-center text-sm text-gray-600">{msg}</p>}
        </form>
      </div>
    </>
  )
}