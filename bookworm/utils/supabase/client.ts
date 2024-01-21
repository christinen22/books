import { createBrowserClient } from "@supabase/ssr";

import { StorageClient } from '@supabase/storage-js'

const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL!
const SERVICE_KEY = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!

export const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
})

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
