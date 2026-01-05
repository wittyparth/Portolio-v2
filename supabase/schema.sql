-- =====================================================
-- PORTFOLIO SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. GUESTBOOK ENTRIES
-- Stores all guestbook signatures
-- =====================================================
CREATE TABLE IF NOT EXISTS guestbook_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    initials VARCHAR(4),
    role VARCHAR(100) DEFAULT 'Visitor',
    message TEXT NOT NULL,
    gradient VARCHAR(100) DEFAULT 'from-purple-500 to-indigo-600',
    is_anonymous BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    show_on_homepage BOOLEAN DEFAULT false,
    avatar_url TEXT,
    tags TEXT[] DEFAULT '{}',
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    ip_hash VARCHAR(64), -- Hashed IP for spam prevention
    user_agent TEXT
);

-- Index for faster queries
CREATE INDEX idx_guestbook_created_at ON guestbook_entries(created_at DESC);
CREATE INDEX idx_guestbook_featured ON guestbook_entries(featured) WHERE featured = true;
CREATE INDEX idx_guestbook_homepage ON guestbook_entries(show_on_homepage) WHERE show_on_homepage = true;

-- =====================================================
-- 2. GUESTBOOK LIKES
-- Track likes per entry (prevent double-likes)
-- =====================================================
CREATE TABLE IF NOT EXISTS guestbook_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entry_id UUID NOT NULL REFERENCES guestbook_entries(id) ON DELETE CASCADE,
    visitor_fingerprint VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(entry_id, visitor_fingerprint)
);

CREATE INDEX idx_guestbook_likes_entry ON guestbook_likes(entry_id);

-- Function to update likes count on guestbook_entries
CREATE OR REPLACE FUNCTION update_guestbook_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE guestbook_entries 
        SET likes_count = likes_count + 1, updated_at = NOW()
        WHERE id = NEW.entry_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE guestbook_entries 
        SET likes_count = likes_count - 1, updated_at = NOW()
        WHERE id = OLD.entry_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_guestbook_likes
AFTER INSERT OR DELETE ON guestbook_likes
FOR EACH ROW EXECUTE FUNCTION update_guestbook_likes_count();

-- =====================================================
-- 3. TYPING LEADERBOARD
-- Stores typing test scores
-- =====================================================
CREATE TABLE IF NOT EXISTS typing_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(100) NOT NULL,
    country_code VARCHAR(3) DEFAULT 'UNK',
    wpm INTEGER NOT NULL CHECK (wpm >= 0 AND wpm <= 300),
    accuracy DECIMAL(5,2) NOT NULL CHECK (accuracy >= 0 AND accuracy <= 100),
    mode VARCHAR(20) NOT NULL DEFAULT '15s', -- '15s', '30s', 'Words', 'Code'
    correct_chars INTEGER DEFAULT 0,
    errors INTEGER DEFAULT 0,
    time_taken INTEGER DEFAULT 0, -- seconds
    is_verified BOOLEAN DEFAULT false,
    is_user BOOLEAN DEFAULT false, -- Is this the site owner
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    visitor_fingerprint VARCHAR(64)
);

-- Indexes for leaderboard queries
CREATE INDEX idx_typing_scores_wpm ON typing_scores(wpm DESC);
CREATE INDEX idx_typing_scores_mode ON typing_scores(mode);
CREATE INDEX idx_typing_scores_created ON typing_scores(created_at DESC);

-- View for leaderboard with rankings
CREATE OR REPLACE VIEW typing_leaderboard AS
SELECT 
    id,
    user_name,
    country_code,
    wpm,
    accuracy,
    mode,
    is_user,
    avatar_url,
    created_at,
    ROW_NUMBER() OVER (PARTITION BY mode ORDER BY wpm DESC, accuracy DESC) as rank
FROM typing_scores
WHERE created_at > NOW() - INTERVAL '30 days'; -- Only show last 30 days

-- =====================================================
-- 4. VISITOR ANALYTICS
-- Track site visitors
-- =====================================================
CREATE TABLE IF NOT EXISTS visitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fingerprint VARCHAR(64) UNIQUE NOT NULL,
    ip_country VARCHAR(3),
    ip_city VARCHAR(100),
    user_agent TEXT,
    first_visit TIMESTAMPTZ DEFAULT NOW(),
    last_visit TIMESTAMPTZ DEFAULT NOW(),
    total_visits INTEGER DEFAULT 1
);

CREATE INDEX idx_visitors_fingerprint ON visitors(fingerprint);
CREATE INDEX idx_visitors_last_visit ON visitors(last_visit DESC);

-- Page views tracking
CREATE TABLE IF NOT EXISTS page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visitor_id UUID REFERENCES visitors(id) ON DELETE SET NULL,
    page_path VARCHAR(255) NOT NULL,
    referrer TEXT,
    duration_ms INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_page_views_created ON page_views(created_at DESC);
CREATE INDEX idx_page_views_path ON page_views(page_path);

-- Aggregated visitor stats (updated by trigger/cron)
CREATE TABLE IF NOT EXISTS visitor_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stat_type VARCHAR(50) NOT NULL, -- 'total', 'today', 'this_week', 'this_month'
    count INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default stats
INSERT INTO visitor_stats (stat_type, count) VALUES 
    ('total', 0),
    ('today', 0),
    ('this_week', 0),
    ('this_month', 0),
    ('online_now', 0)
ON CONFLICT DO NOTHING;

-- Function to update visitor stats
CREATE OR REPLACE FUNCTION update_visitor_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update total count
    UPDATE visitor_stats SET count = count + 1, updated_at = NOW() 
    WHERE stat_type = 'total';
    
    -- Update today count
    UPDATE visitor_stats 
    SET count = (SELECT COUNT(*) FROM visitors WHERE DATE(first_visit) = CURRENT_DATE),
        updated_at = NOW()
    WHERE stat_type = 'today';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_visitor_stats
AFTER INSERT ON visitors
FOR EACH ROW EXECUTE FUNCTION update_visitor_stats();

-- =====================================================
-- 5. BLOG/ARTICLE STATS
-- Track views and reactions per article
-- =====================================================
CREATE TABLE IF NOT EXISTS article_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id INTEGER NOT NULL UNIQUE, -- Reference to your blog.json article ID
    article_slug VARCHAR(255),
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_article_stats_article ON article_stats(article_id);

-- Article views tracking (for unique views)
CREATE TABLE IF NOT EXISTS article_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id INTEGER NOT NULL,
    visitor_fingerprint VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(article_id, visitor_fingerprint)
);

CREATE INDEX idx_article_views_article ON article_views(article_id);

-- Article reactions/likes
CREATE TABLE IF NOT EXISTS article_reactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id INTEGER NOT NULL,
    visitor_fingerprint VARCHAR(64) NOT NULL,
    reaction_type VARCHAR(20) DEFAULT 'like', -- 'like', 'love', 'insightful', etc.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(article_id, visitor_fingerprint, reaction_type)
);

CREATE INDEX idx_article_reactions_article ON article_reactions(article_id);

-- Function to update article stats
CREATE OR REPLACE FUNCTION update_article_view_count()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO article_stats (article_id, views_count)
    VALUES (NEW.article_id, 1)
    ON CONFLICT (article_id) 
    DO UPDATE SET views_count = article_stats.views_count + 1, updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_article_views
AFTER INSERT ON article_views
FOR EACH ROW EXECUTE FUNCTION update_article_view_count();

CREATE OR REPLACE FUNCTION update_article_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO article_stats (article_id, likes_count)
        VALUES (NEW.article_id, 1)
        ON CONFLICT (article_id) 
        DO UPDATE SET likes_count = article_stats.likes_count + 1, updated_at = NOW();
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE article_stats 
        SET likes_count = likes_count - 1, updated_at = NOW()
        WHERE article_id = OLD.article_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_article_likes
AFTER INSERT OR DELETE ON article_reactions
FOR EACH ROW EXECUTE FUNCTION update_article_like_count();

-- =====================================================
-- 6. CONTACT FORM SUBMISSIONS
-- Store contact form messages
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    inquiry_type VARCHAR(50) DEFAULT 'general', -- 'general', 'project', 'job', 'collaboration'
    read_status BOOLEAN DEFAULT false,
    replied BOOLEAN DEFAULT false,
    ip_hash VARCHAR(64),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_unread ON contact_submissions(read_status) WHERE read_status = false;

-- =====================================================
-- 7. LIVE STATUS
-- Real-time status updates (music, activity, etc.)
-- =====================================================
CREATE TABLE IF NOT EXISTS live_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status_type VARCHAR(50) NOT NULL UNIQUE, -- 'now_playing', 'current_activity', 'online_status', 'weather'
    value JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default statuses
INSERT INTO live_status (status_type, value) VALUES 
    ('online_status', '{"status": "online", "message": "Building something cool..."}'),
    ('now_playing', '{"title": "Not playing", "artist": "", "isPlaying": false}'),
    ('current_activity', '{"activity": "coding", "project": "Portfolio"}'),
    ('weather', '{"temp": "28°C", "condition": "Sunny", "city": "Hyderabad"}')
ON CONFLICT (status_type) DO NOTHING;

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE guestbook_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE typing_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_status ENABLE ROW LEVEL SECURITY;

-- Public read access for most tables
CREATE POLICY "Public read access" ON guestbook_entries FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON guestbook_entries FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access" ON guestbook_likes FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON guestbook_likes FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access" ON typing_scores FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON typing_scores FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read/insert visitors" ON visitors FOR ALL USING (true);
CREATE POLICY "Public insert page_views" ON page_views FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read visitor_stats" ON visitor_stats FOR SELECT USING (true);

CREATE POLICY "Public read article_stats" ON article_stats FOR SELECT USING (true);
CREATE POLICY "Public insert article_views" ON article_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read/insert reactions" ON article_reactions FOR ALL USING (true);

CREATE POLICY "Public insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read live_status" ON live_status FOR SELECT USING (true);

-- =====================================================
-- REALTIME SUBSCRIPTIONS
-- Enable realtime for tables that need it
-- =====================================================

-- Enable realtime on specific tables (run in Supabase Dashboard > Database > Replication)
-- ALTER PUBLICATION supabase_realtime ADD TABLE guestbook_entries;
-- ALTER PUBLICATION supabase_realtime ADD TABLE typing_scores;
-- ALTER PUBLICATION supabase_realtime ADD TABLE visitor_stats;
-- ALTER PUBLICATION supabase_realtime ADD TABLE live_status;

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Get visitor count formatted
CREATE OR REPLACE FUNCTION get_formatted_visitor_count()
RETURNS TEXT AS $$
DECLARE
    total INTEGER;
BEGIN
    SELECT count INTO total FROM visitor_stats WHERE stat_type = 'total';
    IF total >= 1000000 THEN
        RETURN ROUND(total / 1000000.0, 1) || 'M';
    ELSIF total >= 1000 THEN
        RETURN ROUND(total / 1000.0, 1) || 'k';
    ELSE
        RETURN total::TEXT;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Get time ago string
CREATE OR REPLACE FUNCTION time_ago(ts TIMESTAMPTZ)
RETURNS TEXT AS $$
DECLARE
    diff INTERVAL;
BEGIN
    diff := NOW() - ts;
    IF diff < INTERVAL '1 minute' THEN
        RETURN 'Just now';
    ELSIF diff < INTERVAL '1 hour' THEN
        RETURN EXTRACT(MINUTE FROM diff)::INTEGER || 'm ago';
    ELSIF diff < INTERVAL '1 day' THEN
        RETURN EXTRACT(HOUR FROM diff)::INTEGER || 'h ago';
    ELSIF diff < INTERVAL '7 days' THEN
        RETURN EXTRACT(DAY FROM diff)::INTEGER || 'd ago';
    ELSIF diff < INTERVAL '30 days' THEN
        RETURN EXTRACT(WEEK FROM diff)::INTEGER || 'w ago';
    ELSE
        RETURN TO_CHAR(ts, 'Mon DD, YYYY');
    END IF;
END;
$$ LANGUAGE plpgsql;
