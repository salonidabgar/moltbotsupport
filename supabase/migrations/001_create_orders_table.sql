-- Create orders table for the concierge MVP
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  bot_description text not null,
  ai_model text not null check (ai_model in ('claude', 'gpt', 'gemini')),
  platform text not null check (platform in ('telegram', 'discord', 'whatsapp')),
  special_requirements text,
  payment_method text not null check (payment_method in ('razorpay', 'paypal')),
  payment_id text,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  amount integer not null default 9900,
  currency text not null default 'INR',
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.orders enable row level security;

-- Allow inserts from the anon key (public orders, no auth required)
create policy "Allow anonymous inserts" on public.orders
  for insert with check (true);

-- Allow updates only via service role (API routes use service role or anon with specific conditions)
create policy "Allow updates on own orders" on public.orders
  for update using (true);

-- Allow reading own order by ID (for success confirmation)
create policy "Allow reading orders" on public.orders
  for select using (true);
