// Credenciales de Supabase (La anon key es pública por diseño, la seguridad está en RLS)
const SUPABASE_URL = 'https://pfgjpqxenzeikeuchpit.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZ2pwcXhlbnplaWtldWNocGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4NjY2NzAsImV4cCI6MjA5OTQ0MjY3MH0.P2TsdVENPq1pENZxqpUgJBKb781YbRE-Xxs_ak9qcFI';

// Inicializar cliente Supabase
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true }
});

// Configuración OneSignal (Notificaciones Push)
const ONESIGNAL_APP_ID = 'TU_ONESIGNAL_APP_ID'; // Reemplazar con tu ID real