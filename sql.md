create table basic.app_events(
id uuid primary key default gen_random_uuid(),
event_name text not null,
metadata jsonb default '{}' ::jsonb,
created_at timestamp with time zone default current_timestamp
);
