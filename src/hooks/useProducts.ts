import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  sizes: string[]
  colors: string[]
  images: string[]
  stock: number
  is_active: boolean
  featured: boolean
}

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (category && category !== 'Todos') {
        query = query.eq('category', category)
      }

      const { data, error } = await query
      if (!error && data) setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [category])

  return { products, loading }
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single()
      if (!error && data) setProduct(data)
      setLoading(false)
    }
    fetch()
  }, [id])

  return { product, loading }
}