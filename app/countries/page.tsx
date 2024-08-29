import { createClient } from '@/utils/supabase/server';

export default async function Countries() {
  const supabase = createClient();
  const { data: countries } = await supabase.from("countries").select();

  return <pre>{JSON.stringify(countries, null, 2)}</pre>
}