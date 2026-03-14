// ============================================================
// Signal Detection Engine (Simulated)
// Generates realistic buyer signals and stores them in DB
// ============================================================

import { createAdminClient } from '@/lib/supabase/admin';

const FIRST_NAMES = ['Sarah', 'Mike', 'Jessica', 'David', 'Lisa', 'Alex', 'Priya', 'Tom', 'Rachel', 'James', 'Emily', 'Chris', 'Amanda', 'Ryan', 'Maria', 'Kevin', 'Laura', 'Brian', 'Nicole', 'Dan'];
const LAST_NAMES = ['Chen', 'Rivera', 'Brooks', 'Park', 'Nguyen', 'Morgan', 'Sharma', 'Wilson', 'Taylor', 'Anderson', 'Martinez', 'Thompson', 'Garcia', 'Lee', 'Robinson'];
const COMPANIES = ['TechCorp', 'ScaleUp AI', 'Outbound.co', 'CloudBase', 'DataFlow', 'RevGrowth', 'NexusAI', 'CloudPipe', 'SalesBridge', 'GrowthLab', 'Velocity.io', 'PipelineHQ', 'DealFlow', 'ProspectAI', 'ReachOut'];
const TITLES = ['VP of Sales', 'Head of Growth', 'CEO', 'Director of Sales', 'Revenue Operations Manager', 'CRO', 'VP Go-to-Market', 'Head of Sales Development', 'Sales Manager', 'Founder'];
const INDUSTRIES = ['SaaS', 'AI/ML', 'Sales Tech', 'Cloud Infrastructure', 'Data Analytics', 'Marketing Tech', 'FinTech', 'HR Tech'];
const LOCATIONS = ['San Francisco, CA', 'Austin, TX', 'New York, NY', 'Seattle, WA', 'Chicago, IL', 'Denver, CO', 'Boston, MA', 'San Jose, CA', 'Miami, FL', 'Portland, OR'];

const TWITTER_SIGNALS = [
  {
    type: 'pain_point',
    templates: [
      'Our SDR team is spending {hours}+ hours a day on manual prospecting. There has to be a better way.',
      'Cold email response rates are at an all-time low. We need to rethink our outbound strategy entirely.',
      'Tired of paying for intent data that doesn\'t convert. Anyone found a signal-based approach that actually works?',
      'Our outbound pipeline is drying up. Volume-based approach just isn\'t working anymore.',
      'We\'re burning through SDR budget with nothing to show for it. Need a smarter approach to finding in-market buyers.',
    ],
    score_range: [78, 95],
    tier: 'hot' as const,
  },
  {
    type: 'buying_language',
    templates: [
      'Looking for recommendations: best AI SDR tools that actually work on X/Twitter? Evaluating for Q2.',
      'Anyone using signal-based selling tools? Comparing options for our sales team.',
      'Budget approved for a new outbound tool. Looking at AI-powered options. Suggestions?',
      'Shortlisting AI sales tools for our team. What are people using in {year}?',
      'Ready to invest in better prospecting tools. What\'s working for B2B SaaS sales teams?',
    ],
    score_range: [82, 98],
    tier: 'hot' as const,
  },
  {
    type: 'competitor_engagement',
    templates: [
      'Liked and replied to @AutoReach tweet about signal-driven outbound',
      'Engaging with @Trigify content about social selling automation',
      'Commented on @ValleyAI demo video: "This looks interesting"',
      'Retweeted competitor post about AI-powered outreach',
    ],
    score_range: [55, 78],
    tier: 'warm' as const,
  },
  {
    type: 'keyword_mention',
    templates: [
      'Thread: "How we rebuilt our outbound motion to focus on intent signals instead of volume..."',
      'Just published: Why signal-based selling is the future of B2B sales development',
      'Hot take: SDR teams will be 10x smaller but 10x more effective with the right AI tools',
      'The shift from cold to warm outbound is happening faster than anyone expected',
    ],
    score_range: [50, 72],
    tier: 'warm' as const,
  },
  {
    type: 'hashtag_match',
    templates: [
      '#lookingfor an AI-powered tool to help my team book more meetings automatically.',
      '#B2BSales Hot take: The best SDR tool is one that finds buyers already showing intent.',
      '#SalesTech Anyone tried using X/Twitter as a prospecting channel? Our LinkedIn is oversaturated.',
    ],
    score_range: [70, 88],
    tier: 'hot' as const,
  },
  {
    type: 'thread_participation',
    templates: [
      'Joined thread discussing "The future of SDRs in the age of AI agents"',
      'Active in thread: "What\'s your #1 challenge with outbound in {year}?"',
      'Contributing to discussion on AI-augmented sales development',
    ],
    score_range: [40, 65],
    tier: 'warm' as const,
  },
];

const LINKEDIN_SIGNALS = [
  {
    type: 'profile_view',
    templates: [
      'Viewed your profile {count} times in the last 48 hours. {title} at {company}.',
      'Repeated profile views from {title} at {company} ({size} employees)',
    ],
    score_range: [70, 88],
    tier: 'hot' as const,
  },
  {
    type: 'job_change',
    templates: [
      'Recently promoted to {title} at {company}. Previously at {prev_company}.',
      'New role: {title} at {company}. Likely building new processes and evaluating tools.',
    ],
    score_range: [80, 92],
    tier: 'hot' as const,
  },
  {
    type: 'linkedin_engagement',
    templates: [
      'Commented on post about AI SDR tools: "We need to rethink how SDR teams operate."',
      'Shared article about signal-based selling with comment: "This is the shift we\'re making."',
      'Liked 5 posts about sales automation and AI outreach this week.',
    ],
    score_range: [60, 82],
    tier: 'warm' as const,
  },
  {
    type: 'company_growth',
    templates: [
      '{company} is hiring {count} sales roles. Indicates scaling outbound team.',
      '{company} posted {count} SDR/AE positions. Growing sales organization.',
    ],
    score_range: [65, 80],
    tier: 'warm' as const,
  },
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillTemplate(template: string): string {
  return template
    .replace('{hours}', String(randomInt(3, 6)))
    .replace('{year}', '2026')
    .replace('{count}', String(randomInt(2, 8)))
    .replace('{title}', randomItem(TITLES))
    .replace('{company}', randomItem(COMPANIES))
    .replace('{prev_company}', randomItem(['Salesforce', 'HubSpot', 'Gong', 'Drift', 'Outreach', 'Clari']))
    .replace('{size}', randomItem(['50-200', '200-500', '100-200']));
}

export async function generateSignals(workspaceId: string, count: number = 3) {
  const supabase = createAdminClient();
  const results: { prospects: number; signals: number } = { prospects: 0, signals: 0 };

  for (let i = 0; i < count; i++) {
    const isLinkedIn = Math.random() > 0.6;
    const platform = isLinkedIn ? 'linkedin' : 'twitter';
    const signalDefs = isLinkedIn ? LINKEDIN_SIGNALS : TWITTER_SIGNALS;
    const signalDef = randomItem(signalDefs);

    const firstName = randomItem(FIRST_NAMES);
    const lastName = randomItem(LAST_NAMES);
    const name = `${firstName} ${lastName}`;
    const company = randomItem(COMPANIES);
    const title = randomItem(TITLES);
    const handle = `@${firstName.toLowerCase()}_${randomItem(['sales', 'growth', 'b2b', 'tech', 'saas'])}`;

    // Check if prospect exists by handle
    const { data: existing } = await supabase
      .from('prospects')
      .select('id')
      .eq('workspace_id', workspaceId)
      .eq(platform === 'twitter' ? 'twitter_handle' : 'name', platform === 'twitter' ? handle : name)
      .limit(1);

    let prospectId: string;

    if (existing && existing.length > 0) {
      prospectId = existing[0].id;
    } else {
      const score = randomInt(60, 96);
      const { data: newProspect, error: pErr } = await supabase
        .from('prospects')
        .insert({
          workspace_id: workspaceId,
          twitter_handle: platform === 'twitter' ? handle : null,
          linkedin_url: platform === 'linkedin' ? `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}` : null,
          name,
          title,
          company,
          industry: randomItem(INDUSTRIES),
          location: randomItem(LOCATIONS),
          bio: `${title} at ${company}`,
          enrichment_data: { company_size: randomItem(['10-50', '50-200', '200-500']), funding: randomItem(['Seed', 'Series A', 'Series B', 'Series C']) },
          icp_match_score: score,
          signal_score: 0,
          stage: 'detected',
          first_signal_at: new Date().toISOString(),
          last_signal_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (pErr || !newProspect) continue;
      prospectId = newProspect.id;
      results.prospects++;
    }

    // Create signal
    const score = randomInt(signalDef.score_range[0], signalDef.score_range[1]);
    const content = fillTemplate(randomItem(signalDef.templates));

    const { error: sErr } = await supabase
      .from('signals')
      .insert({
        prospect_id: prospectId,
        workspace_id: workspaceId,
        platform,
        signal_type: signalDef.type,
        raw_data: {},
        score,
        tier: signalDef.tier,
        content_preview: content,
        source_url: platform === 'twitter' ? `https://x.com/${handle.slice(1)}/status/${randomInt(1000000, 9999999)}` : null,
        triggered_action: score >= 80 ? 'outreach_started' : null,
        is_dismissed: false,
        detected_at: new Date().toISOString(),
      });

    if (!sErr) {
      results.signals++;

      // Update prospect signal score
      await supabase
        .from('prospects')
        .update({
          signal_score: score,
          last_signal_at: new Date().toISOString(),
          stage: score >= 80 ? 'warming' : 'detected',
        })
        .eq('id', prospectId);
    }
  }

  // Update daily metrics
  const today = new Date().toISOString().split('T')[0];
  const { data: existingMetric } = await supabase
    .from('daily_metrics')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('date', today)
    .single();

  if (existingMetric) {
    await supabase
      .from('daily_metrics')
      .update({ signals_detected: existingMetric.signals_detected + results.signals })
      .eq('id', existingMetric.id);
  } else {
    await supabase
      .from('daily_metrics')
      .insert({ workspace_id: workspaceId, date: today, signals_detected: results.signals });
  }

  return results;
}

// Seed initial data for a new workspace
export async function seedWorkspaceData(workspaceId: string) {
  // Create default ICP
  const supabase = createAdminClient();

  await supabase.from('icp_configs').insert({
    workspace_id: workspaceId,
    name: 'B2B SaaS Sales Leaders',
    criteria: {
      industries: ['SaaS', 'Software', 'Technology'],
      company_sizes: ['10-50', '50-200', '200-500'],
      roles: ['VP Sales', 'Head of Sales', 'Director of Sales', 'Head of Growth', 'CEO'],
      seniority_levels: ['Director', 'VP', 'C-Level'],
      keywords: ['outbound', 'SDR', 'pipeline', 'prospecting', 'sales automation', 'AI SDR'],
      locations: ['United States', 'Canada', 'United Kingdom'],
      tech_stack: ['Salesforce', 'HubSpot', 'Apollo', 'Outreach', 'Salesloft'],
    },
    negative_filters: [
      { type: 'company', value: 'AutoReach' },
      { type: 'company', value: 'Trigify' },
    ],
    is_active: true,
  });

  // Generate initial signals
  await generateSignals(workspaceId, 15);

  // Seed some daily metrics history
  const days = 7;
  const metrics = [];
  for (let i = days; i >= 1; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    metrics.push({
      workspace_id: workspaceId,
      date: date.toISOString().split('T')[0],
      signals_detected: randomInt(8, 35),
      outreach_sent: randomInt(2, 12),
      responses_received: randomInt(1, 6),
      meetings_booked: randomInt(0, 3),
      meetings_completed: randomInt(0, 2),
    });
  }
  await supabase.from('daily_metrics').insert(metrics);
}

function randomIntFromEngine(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
