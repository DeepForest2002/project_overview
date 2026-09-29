-- migrate:up

CREATE TYPE users_role AS ENUM ('user', 'admin');
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'resolved');

CREATE TABLE IF NOT EXISTS users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    google_id     TEXT UNIQUE,
    role          users_role NOT NULL DEFAULT 'user',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT auth_method_present CHECK (password_hash IS NOT NULL OR google_id IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS support_tasks (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title      TEXT NOT NULL,
    status     task_status NOT NULL DEFAULT 'pending',
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_support_tasks_user_id ON support_tasks(id);
CREATE INDEX IF NOT EXISTS idx_user_email ON users(email);
CREATE TABLE IF NOT EXISTS banners (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url            TEXT NOT NULL,
    cloudinary_unique_id TEXT NOT NULL,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create a function and trigger to update the rows

-- migrate:down

