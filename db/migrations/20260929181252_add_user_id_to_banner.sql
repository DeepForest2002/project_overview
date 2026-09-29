-- migrate:up
ALTER TABLE banners ADD COLUMN
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE;

-- migrate:down

