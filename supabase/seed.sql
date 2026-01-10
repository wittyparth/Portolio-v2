-- =====================================================
-- SEED DATA FOR PORTFOLIO SUPABASE DATABASE
-- Run this AFTER schema.sql to populate initial data
-- =====================================================

-- =====================================================
-- 1. SEED GUESTBOOK ENTRIES
-- =====================================================
INSERT INTO guestbook_entries (id, name, initials, role, message, gradient, is_anonymous, featured, show_on_homepage, likes_count, created_at, avatar_url, tags) VALUES
  (
    'a1b2c3d4-e5f6-4890-abcd-ef1234567801',
    'Alice M.',
    'AM',
    'Frontend Dev • London',
    'Incredible attention to detail!',
    'from-purple-500 to-indigo-600',
    false,
    false,
    true,
    12,
    NOW() - INTERVAL '2 minutes',
    NULL,
    '{}'
  ),
  (
    'a1b2c3d4-e5f6-4890-abcd-ef1234567802',
    'David K.',
    'DK',
    'Backend Dev • NYC',
    'Love the dark mode implementation.',
    'from-blue-500 to-cyan-600',
    false,
    false,
    true,
    8,
    NOW() - INTERVAL '1 hour',
    NULL,
    '{}'
  ),
  (
    'a1b2c3d4-e5f6-4890-abcd-ef1234567803',
    'Sarah L.',
    'SL',
    'Full Stack • Berlin',
    'Great portfolio structure.',
    'from-green-500 to-emerald-600',
    false,
    false,
    true,
    5,
    NOW() - INTERVAL '4 hours',
    NULL,
    '{}'
  ),
  (
    'a1b2c3d4-e5f6-4890-abcd-ef1234567804',
    'Alex Rivera',
    'AR',
    'Frontend Dev • London',
    'Incredible work on the backend architecture article. Keep shipping! 🚀',
    'from-purple-500 to-indigo-600',
    false,
    false,
    false,
    12,
    NOW() - INTERVAL '2 hours',
    NULL,
    '{}'
  ),
  (
    'a1b2c3d4-e5f6-4890-abcd-ef1234567805',
    'Sarah Chen',
    'SC',
    'Product Designer',
    'Love the dark mode implementation here! The contrast ratios are perfect.',
    'from-emerald-400 to-cyan-600',
    false,
    false,
    false,
    48,
    NOW() - INTERVAL '5 hours',
    NULL,
    '{}'
  ),
  (
    'a1b2c3d4-e5f6-4890-abcd-ef1234567806',
    'Elena Lin',
    'EL',
    'UX Researcher',
    'I''ve been following your open source contributions. Would love a breakdown of the API design.',
    'from-orange-500 to-pink-600',
    false,
    false,
    false,
    89,
    NOW() - INTERVAL '2 days',
    NULL,
    '{"#opensource", "#state-management"}'
  ),
  (
    'a1b2c3d4-e5f6-4890-abcd-ef1234567807',
    'Anonymous User',
    '',
    'Visitor #4291',
    '"Simplicity is the ultimate sophistication." - You nailed it.',
    'from-gray-500 to-gray-600',
    true,
    false,
    false,
    15,
    NOW() - INTERVAL '3 days',
    NULL,
    '{}'
  ),
  (
    'a1b2c3d4-e5f6-4890-abcd-ef1234567808',
    'David Kim',
    'DK',
    'CTO @ TechFlow',
    'Partha, I''m seriously impressed by the database optimization techniques you detailed. We''re facing similar challenges at scale. Sent you a DM!',
    'from-blue-500 to-cyan-500',
    false,
    true,
    false,
    156,
    NOW() - INTERVAL '1 week',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDiQMc4ZS5tQgIHdInkjnLp20rtrsx-Z2Yt6ir-r98PGeCYdwq-vX-fKKSm88XCz0s538Aofh7WwWs62eBgygmXaLfm-_W1a_e6b9zT01_-NEKJu6qmQCNTdqtLDYhVXJCkv0zWEKe-xpQo6RV4V4f5j0cDYLIv5HVAvfjWaYRlW4OTP_xUTGgE-CiRJundn2POG6xK4I-8VGsI_jIgVZzyrdpdRNVpE0nkQpZyK5QZlTVy4pKmikUH_6JG08owCnhyK_XcMv9X724N',
    '{}'
  )
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 2. SEED TYPING LEADERBOARD
-- =====================================================
INSERT INTO typing_scores (id, user_name, country_code, wpm, accuracy, mode, is_verified, is_user, created_at) VALUES
  (
    'b1c2d3e4-a5b6-4890-abcd-ef1234567801',
    'Cyber_Ninja',
    'USA',
    184,
    100.00,
    '15s',
    true,
    false,
    NOW() - INTERVAL '3 days'
  ),
  (
    'b1c2d3e4-a5b6-4890-abcd-ef1234567802',
    'KeyStroke_Legend',
    'GER',
    172,
    99.80,
    '15s',
    true,
    false,
    NOW() - INTERVAL '5 days'
  ),
  (
    'b1c2d3e4-a5b6-4890-abcd-ef1234567803',
    'Alex_Dev',
    'UK',
    165,
    98.00,
    '15s',
    true,
    false,
    NOW() - INTERVAL '1 week'
  ),
  (
    'b1c2d3e4-a5b6-4890-abcd-ef1234567804',
    'Partha Saradhi',
    'IND',
    142,
    99.00,
    '15s',
    true,
    true,
    NOW() - INTERVAL '2 days'
  ),
  (
    'b1c2d3e4-a5b6-4890-abcd-ef1234567805',
    'NullPointer',
    'IND',
    130,
    96.00,
    '15s',
    true,
    false,
    NOW() - INTERVAL '4 days'
  ),
  (
    'b1c2d3e4-a5b6-4890-abcd-ef1234567806',
    'FastFingers_99',
    'CAN',
    128,
    95.00,
    '15s',
    true,
    false,
    NOW() - INTERVAL '6 days'
  ),
  -- 30s mode entries
  (
    'b1c2d3e4-a5b6-4890-abcd-ef1234567807',
    'SpeedTyper',
    'AUS',
    156,
    97.50,
    '30s',
    true,
    false,
    NOW() - INTERVAL '2 days'
  ),
  (
    'b1c2d3e4-a5b6-4890-abcd-ef1234567808',
    'CodeRacer',
    'JPN',
    148,
    98.20,
    '30s',
    true,
    false,
    NOW() - INTERVAL '3 days'
  ),
  (
    'b1c2d3e4-a5b6-4890-abcd-ef1234567809',
    'Partha Saradhi',
    'IND',
    135,
    97.80,
    '30s',
    true,
    true,
    NOW() - INTERVAL '1 day'
  )
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 3. SEED ARTICLE STATS (Blog)
-- =====================================================
INSERT INTO article_stats (id, article_id, article_slug, views_count, likes_count, created_at) VALUES
  (
    'c1d2e3f4-a5b6-4890-abcd-ef1234567801',
    1,
    'scaling-redis-for-millions',
    1200,
    89,
    NOW() - INTERVAL '2 months'
  ),
  (
    'c1d2e3f4-a5b6-4890-abcd-ef1234567802',
    2,
    'idempotency-in-distributed-systems',
    890,
    342,
    NOW() - INTERVAL '3 months'
  ),
  (
    'c1d2e3f4-a5b6-4890-abcd-ef1234567803',
    3,
    'migrating-legacy-monoliths',
    654,
    142,
    NOW() - INTERVAL '75 days'
  ),
  (
    'c1d2e3f4-a5b6-4890-abcd-ef1234567804',
    4,
    'microservices-vs-monoliths',
    432,
    48,
    NOW() - INTERVAL '75 days'
  ),
  (
    'c1d2e3f4-a5b6-4890-abcd-ef1234567805',
    5,
    'art-of-database-sharding',
    890,
    76,
    NOW() - INTERVAL '84 days'
  )
ON CONFLICT (article_id) DO NOTHING;

-- =====================================================
-- 4. SEED VISITOR STATS
-- =====================================================
UPDATE visitor_stats SET count = 15420 WHERE stat_type = 'total';
UPDATE visitor_stats SET count = 127 WHERE stat_type = 'today';
UPDATE visitor_stats SET count = 892 WHERE stat_type = 'this_week';
UPDATE visitor_stats SET count = 3420 WHERE stat_type = 'this_month';
UPDATE visitor_stats SET count = 3 WHERE stat_type = 'online_now';

-- =====================================================
-- 5. SEED LIVE STATUS
-- =====================================================
UPDATE live_status 
SET value = '{"status": "online", "message": "Building something cool..."}'::jsonb
WHERE status_type = 'online_status';

UPDATE live_status 
SET value = '{"title": "Blinding Lights", "artist": "The Weeknd", "featuring": "", "isPlaying": true, "progress": {"current": "2:34", "duration": "3:22", "percent": 75}}'::jsonb
WHERE status_type = 'now_playing';

UPDATE live_status 
SET value = '{"activity": "coding", "project": "Portfolio v4", "startedAt": "2024-01-06T10:00:00Z"}'::jsonb
WHERE status_type = 'current_activity';

UPDATE live_status 
SET value = '{"temp": "28°C", "condition": "Sunny", "city": "Hyderabad", "country": "India"}'::jsonb
WHERE status_type = 'weather';

-- =====================================================
-- 6. SEED SAMPLE CONTACT SUBMISSIONS (Optional)
-- =====================================================
INSERT INTO contact_submissions (id, name, email, message, inquiry_type, read_status, created_at) VALUES
  (
    'd1e2f3a4-b5c6-4890-abcd-ef1234567801',
    'John Developer',
    'john@example.com',
    'Hey Partha! Loved your portfolio. Would love to collaborate on an open source project.',
    'collaboration',
    true,
    NOW() - INTERVAL '5 days'
  ),
  (
    'd1e2f3a4-b5c6-4890-abcd-ef1234567802',
    'Sarah from TechCorp',
    'sarah@techcorp.io',
    'We are looking for a backend engineer with experience in distributed systems. Your portfolio is impressive!',
    'job',
    false,
    NOW() - INTERVAL '2 days'
  )
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- VERIFICATION - Run these separately to check data
-- =====================================================
-- SELECT COUNT(*) as guestbook_count FROM guestbook_entries;
-- SELECT COUNT(*) as typing_scores_count FROM typing_scores;
-- SELECT COUNT(*) as article_stats_count FROM article_stats;
-- SELECT * FROM visitor_stats;
-- SELECT * FROM live_status;
