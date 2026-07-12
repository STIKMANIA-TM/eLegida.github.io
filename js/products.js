async function fetchProducts(page = 1, limit = 12, filters = {}) {
  const cacheKey = `products_${page}_${JSON.stringify(filters)}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    rateLimiter.checkLimit('FETCH_PRODUCTS', 15, 60000);
    let query = db.from('products').select('*', { count: 'exact' }).eq('is_active', true);

    // Filtros dinámicos
    if (filters.category) query = query.eq('category', filters.category);
    if (filters.search) query = query.ilike('name', `%${filters.search}%`);
    if (filters.maxPrice) query = query.lte('price', filters.maxPrice);
    if (filters.size) query = query.contains('sizes', [filters.size]); // Array query

    // Ordenamiento
    query = query.order('created_at', { ascending: false });

    // Paginación
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;
    if (error) throw error;

    cacheData(cacheKey, { data, count }, 15); // Caché de 15 min
    return { data, count };
  } catch (err) {
    console.error(err);
    return { data: [], count: 0 };
  }
}

async function fetchProductById(id) {
  const cached = getCachedData(`product_${id}`);
  if (cached) return cached;

  const { data, error } = await db.from('products').select('*').eq('id', id).single();
  if (error) return null;
  
  cacheData(`product_${id}`, data, 60);
  return data;
}