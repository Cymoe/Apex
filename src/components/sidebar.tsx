import { SidebarContent } from './sidebar-content';
import { createClient } from '@/lib/supabase/server';

export async function Sidebar() {
  let user = null;
  
  try {
    const supabase = await createClient();
    
    if (!supabase || !supabase.auth) {
      console.error('Supabase client not properly initialized');
    } else {
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        user = data?.user;
      }
    }
  } catch (error) {
    console.error('Sidebar component error:', error);
  }

  return <SidebarContent user={user} />;
}