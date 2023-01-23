import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    "https://asnelkzrvvkytfcgogyn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbmVsa3pydnZreXRmY2dvZ3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ0NzA0NjgsImV4cCI6MTk5MDA0NjQ2OH0.rtkfpvg04P1NCL-keCuVHtOGJGzXfJYF7sMxGQM5Ty8"
)