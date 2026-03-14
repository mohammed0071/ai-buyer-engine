// ============================================================
// GoHighLevel (GHL) Integration Service
// ============================================================

const GHL_API_BASE = 'https://services.leadconnectorhq.com';

interface GHLConfig {
  apiKey: string;
  locationId: string;
  calendarId?: string;
  pipelineId?: string;
}

function getConfig(): GHLConfig | null {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || !locationId || apiKey === 'placeholder') return null;
  return {
    apiKey,
    locationId,
    calendarId: process.env.GHL_CALENDAR_ID,
    pipelineId: process.env.GHL_PIPELINE_ID,
  };
}

export function isGHLConfigured(): boolean {
  return getConfig() !== null;
}

async function ghlFetch(path: string, options: RequestInit = {}) {
  const config = getConfig();
  if (!config) throw new Error('GHL not configured');

  const url = `${GHL_API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL API error ${res.status}: ${text}`);
  }

  return res.json();
}

// ---- Contacts ----

export async function createOrUpdateContact(contact: {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  source?: string;
  tags?: string[];
  customField?: Record<string, string>;
}) {
  const config = getConfig();
  if (!config) return { demo: true, message: 'GHL not configured' };

  return ghlFetch('/contacts/', {
    method: 'POST',
    body: JSON.stringify({
      ...contact,
      locationId: config.locationId,
      source: contact.source || 'AI Buyer Engine',
      tags: [...(contact.tags || []), 'ai-buyer-engine'],
    }),
  });
}

export async function getContact(contactId: string) {
  return ghlFetch(`/contacts/${contactId}`);
}

export async function searchContacts(query: string) {
  const config = getConfig();
  if (!config) return { contacts: [], demo: true };

  return ghlFetch(`/contacts/search/duplicate?locationId=${config.locationId}&email=${encodeURIComponent(query)}`);
}

// ---- Conversations / Messages ----

export async function sendMessage(params: {
  contactId: string;
  type: 'SMS' | 'Email' | 'WhatsApp' | 'IG' | 'FB' | 'GMB' | 'Custom';
  message: string;
  subject?: string;
}) {
  const config = getConfig();
  if (!config) return { demo: true, message: 'GHL not configured' };

  return ghlFetch('/conversations/messages', {
    method: 'POST',
    body: JSON.stringify({
      type: params.type,
      contactId: params.contactId,
      message: params.message,
      subject: params.subject,
    }),
  });
}

export async function getConversations(contactId: string) {
  return ghlFetch(`/conversations/search?contactId=${contactId}`);
}

// ---- Calendar / Appointments ----

export async function createAppointment(params: {
  contactId: string;
  title: string;
  startTime: string;
  endTime: string;
  calendarId?: string;
}) {
  const config = getConfig();
  if (!config) return { demo: true, message: 'GHL not configured' };

  return ghlFetch('/calendars/events/appointments', {
    method: 'POST',
    body: JSON.stringify({
      calendarId: params.calendarId || config.calendarId,
      locationId: config.locationId,
      contactId: params.contactId,
      title: params.title,
      appointmentStatus: 'confirmed',
      startTime: params.startTime,
      endTime: params.endTime,
    }),
  });
}

export async function getAvailableSlots(calendarId: string, startDate: string, endDate: string) {
  const config = getConfig();
  if (!config) return { demo: true, slots: [] };

  return ghlFetch(`/calendars/${calendarId}/free-slots?startDate=${startDate}&endDate=${endDate}&timezone=America/New_York`);
}

// ---- Pipelines / Opportunities ----

export async function createOpportunity(params: {
  contactId: string;
  name: string;
  status: string;
  monetaryValue?: number;
  pipelineStageId?: string;
}) {
  const config = getConfig();
  if (!config) return { demo: true, message: 'GHL not configured' };

  return ghlFetch('/opportunities/', {
    method: 'POST',
    body: JSON.stringify({
      ...params,
      pipelineId: config.pipelineId,
      locationId: config.locationId,
    }),
  });
}

// ---- Webhooks ----

export interface GHLWebhookPayload {
  type: string;
  locationId: string;
  contactId?: string;
  message?: string;
  conversationId?: string;
  appointmentId?: string;
  [key: string]: unknown;
}

export function parseWebhook(body: unknown): GHLWebhookPayload {
  return body as GHLWebhookPayload;
}

// ---- Sync: Prospect → GHL Contact ----

export async function syncProspectToGHL(prospect: {
  name: string;
  email?: string | null;
  company?: string | null;
  title?: string | null;
  twitter_handle?: string | null;
  signal_score: number;
  stage: string;
}) {
  const config = getConfig();
  if (!config) {
    return { demo: true, message: 'GHL not configured. Set GHL_API_KEY and GHL_LOCATION_ID.' };
  }

  const nameParts = prospect.name.split(' ');
  const contact = await createOrUpdateContact({
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(' '),
    email: prospect.email || undefined,
    companyName: prospect.company || undefined,
    tags: [`stage:${prospect.stage}`, `score:${prospect.signal_score}`],
    customField: {
      'title': prospect.title || '',
      'twitter_handle': prospect.twitter_handle || '',
    },
  });

  return contact;
}
