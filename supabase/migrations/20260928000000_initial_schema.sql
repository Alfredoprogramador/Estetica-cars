create extension if not exists pgcrypto;

create type public.user_role as enum ('customer', 'professional', 'admin');
create type public.appointment_status as enum ('pending', 'confirmed', 'in_progress', 'completed', 'canceled');
create type public.payment_status as enum ('pending', 'paid', 'refunded', 'failed');
create type public.payment_provider as enum ('stripe', 'mercado_pago', 'pix');
create type public.message_type as enum ('text', 'image');
create type public.notification_type as enum ('appointment', 'payment', 'system');
create type public.audit_action as enum ('data_access', 'data_export', 'data_delete', 'consent_update');
create type public.performed_by_type as enum ('system', 'user', 'admin');

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid not null unique references auth.users (id) on delete cascade,
  role public.user_role not null default 'customer',
  name text not null,
  public_name text not null,
  email text not null unique,
  phone text,
  cpf_cnpj text,
  address jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  plate text,
  brand text not null,
  model text not null,
  color text,
  year integer,
  notes text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  base_price numeric(10,2) not null check (base_price >= 0),
  duration_minutes integer not null check (duration_minutes > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.professional_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users (id) on delete cascade,
  bio text,
  service_radius_km numeric(6,2) not null default 5,
  average_rating numeric(3,2) not null default 0,
  total_reviews integer not null default 0,
  is_verified boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.professional_availability (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references public.professional_profiles (id) on delete cascade,
  weekday integer not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_active boolean not null default true,
  constraint valid_availability_window check (start_time < end_time)
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.users (id) on delete restrict,
  professional_id uuid not null references public.professional_profiles (id) on delete restrict,
  car_id uuid not null references public.cars (id) on delete restrict,
  service_id uuid not null references public.services (id) on delete restrict,
  scheduled_at timestamptz not null,
  status public.appointment_status not null default 'pending',
  location jsonb not null default '{}'::jsonb,
  travel_fee numeric(10,2) not null default 0,
  total_price numeric(10,2) not null default 0,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null unique references public.appointments (id) on delete cascade,
  customer_id uuid not null references public.users (id) on delete restrict,
  amount numeric(10,2) not null check (amount >= 0),
  currency text not null default 'BRL',
  status public.payment_status not null default 'pending',
  provider public.payment_provider not null,
  provider_payment_id text,
  receipt_url text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null unique references public.appointments (id) on delete cascade,
  customer_id uuid not null references public.users (id) on delete restrict,
  professional_id uuid not null references public.professional_profiles (id) on delete restrict,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.appointments (id) on delete cascade,
  sender_id uuid not null references public.users (id) on delete cascade,
  receiver_id uuid not null references public.users (id) on delete cascade,
  content text not null,
  type public.message_type not null default 'text',
  attachment_url text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  body text not null,
  type public.notification_type not null default 'system',
  is_read boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users (id) on delete set null,
  action public.audit_action not null,
  performed_by public.performed_by_type not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  version text not null,
  accepted_at timestamptz not null default timezone('utc', now()),
  revoked_at timestamptz
);

create or replace function public.current_user_profile_id()
returns uuid
language sql
stable
as $$
  select id from public.users where auth_id = auth.uid();
$$;

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger users_set_updated_at
before update on public.users
for each row execute function public.handle_updated_at();

create trigger appointments_set_updated_at
before update on public.appointments
for each row execute function public.handle_updated_at();

create index if not exists idx_cars_user_id on public.cars(user_id);
create index if not exists idx_appointments_customer_id on public.appointments(customer_id);
create index if not exists idx_appointments_professional_id on public.appointments(professional_id);
create index if not exists idx_messages_appointment_id on public.messages(appointment_id);
create index if not exists idx_notifications_user_id on public.notifications(user_id);
create index if not exists idx_audit_logs_user_id on public.audit_logs(user_id);
create index if not exists idx_consents_user_id on public.consents(user_id);

alter table public.users enable row level security;
alter table public.cars enable row level security;
alter table public.services enable row level security;
alter table public.professional_profiles enable row level security;
alter table public.professional_availability enable row level security;
alter table public.appointments enable row level security;
alter table public.payments enable row level security;
alter table public.reviews enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;
alter table public.consents enable row level security;

create policy "Users can view own profile"
on public.users for select
using (id = public.current_user_profile_id());

create policy "Users can manage own cars"
on public.cars for all
using (user_id = public.current_user_profile_id())
with check (user_id = public.current_user_profile_id());

create policy "Services are public"
on public.services for select
using (true);

create policy "Professionals are viewable"
on public.professional_profiles for select
using (true);

create policy "Professionals manage own profile"
on public.professional_profiles for all
using (user_id = public.current_user_profile_id())
with check (user_id = public.current_user_profile_id());

create policy "Availability is public"
on public.professional_availability for select
using (true);

create policy "Professionals manage own availability"
on public.professional_availability for all
using (
  professional_id in (
    select id from public.professional_profiles where user_id = public.current_user_profile_id()
  )
)
with check (
  professional_id in (
    select id from public.professional_profiles where user_id = public.current_user_profile_id()
  )
);

create policy "Appointments for participants"
on public.appointments for select
using (
  customer_id = public.current_user_profile_id()
  or professional_id in (
    select id from public.professional_profiles where user_id = public.current_user_profile_id()
  )
);

create policy "Customers create appointments"
on public.appointments for insert
with check (
  customer_id = public.current_user_profile_id()
  and car_id in (
    select id from public.cars where user_id = public.current_user_profile_id()
  )
  and professional_id in (
    select id from public.professional_profiles
  )
);

create policy "Participants update appointments"
on public.appointments for update
using (
  customer_id = public.current_user_profile_id()
  or professional_id in (
    select id from public.professional_profiles where user_id = public.current_user_profile_id()
  )
)
with check (
  (
    (
      customer_id = public.current_user_profile_id()
      and car_id in (
        select id from public.cars where user_id = public.current_user_profile_id()
      )
    )
    or professional_id in (
      select id from public.professional_profiles where user_id = public.current_user_profile_id()
    )
  )
  and id in (
    select existing.id
    from public.appointments as existing
    where existing.id = appointments.id
      and existing.customer_id = appointments.customer_id
      and existing.professional_id = appointments.professional_id
      and existing.car_id = appointments.car_id
      and existing.service_id = appointments.service_id
  )
);

create policy "Payments for customer only"
on public.payments for select
using (customer_id = public.current_user_profile_id());

create policy "Reviews for related users"
on public.reviews for select
using (
  customer_id = public.current_user_profile_id()
  or professional_id in (
    select id from public.professional_profiles where user_id = public.current_user_profile_id()
  )
);

create policy "Customers create reviews"
on public.reviews for insert
with check (
  customer_id = public.current_user_profile_id()
  and appointment_id in (
    select id
    from public.appointments
    where customer_id = public.current_user_profile_id()
      and professional_id = reviews.professional_id
  )
);

create policy "Messages for participants"
on public.messages for select
using (
  sender_id = public.current_user_profile_id()
  or receiver_id = public.current_user_profile_id()
);

create policy "Participants create messages"
on public.messages for insert
with check (
  sender_id = public.current_user_profile_id()
  and appointment_id in (
    select id
    from public.appointments
    where customer_id = public.current_user_profile_id()
       or professional_id in (
         select id from public.professional_profiles where user_id = public.current_user_profile_id()
       )
  )
);

create policy "Participants update sent messages"
on public.messages for update
using (sender_id = public.current_user_profile_id())
with check (
  sender_id = public.current_user_profile_id()
  and appointment_id in (
    select id
    from public.appointments
    where customer_id = public.current_user_profile_id()
       or professional_id in (
         select id from public.professional_profiles where user_id = public.current_user_profile_id()
       )
  )
);

create policy "Notifications for owner"
on public.notifications for select
using (user_id = public.current_user_profile_id());

create policy "Users insert own notifications"
on public.notifications for insert
with check (user_id = public.current_user_profile_id());

create policy "Consent for owner"
on public.consents for select
using (user_id = public.current_user_profile_id());

create policy "Consent insert for owner"
on public.consents for insert
with check (user_id = public.current_user_profile_id());

create policy "Audit logs for owner"
on public.audit_logs for select
using (user_id = public.current_user_profile_id());
