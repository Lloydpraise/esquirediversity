# Supabase (leads)

Website leads are saved to the table `esquire.leads` in the **kitchenandall** Supabase project,
inside its own `esquire` schema so it never mixes with Kitchen & All data.

## One-time setup (Lloyd)
1. In the kitchenandall project, open **SQL Editor**, paste `migrations/20261123200000_esquire_schema.sql`, and run it.
2. Go to **Project Settings > Data API** (called "API" in older dashboards) and add `esquire` to **Exposed schemas**. Save.
   Without this the website gets a "schema must be one of..." error.
3. Copy the **Project URL** and the **publishable / anon key** into Netlify env vars
   `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`).
   Never use the `service_role` / secret key on the website.

## How the site writes
The quote form sends a plain `fetch` POST to `/rest/v1/leads` with the header
`Content-Profile: esquire` (that header picks the schema). No supabase-js download needed.
The browser can only insert: row level security blocks reading, editing and deleting.

## Old leads
The old site wrote to `esquireleads` in the VVStudios project. That table is in the `archive`
schema there (5 rows, Mar–Sep 2026) and has been left untouched.
