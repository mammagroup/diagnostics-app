import { LEADS_ENDPOINT, SUPABASE_URL, SUPABASE_ANON_KEY } from '../config'

export type Lead = {
  fullName: string
  phone: string
  birthDate: string
  zones: string
  recommended: string
}

const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

function supabaseInsert(table: string, row: Record<string, unknown>): Promise<unknown> {
  return fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    keepalive: true,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  })
}

function sheetsPost(fields: Record<string, string>): Promise<unknown> {
  const body = new URLSearchParams()
  Object.entries(fields).forEach(([key, value]) => body.append(key, value))
  body.append('submittedAt', new Date().toISOString())
  return fetch(LEADS_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    keepalive: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
}

export async function submitLead(lead: Lead): Promise<void> {
  const tasks: Promise<unknown>[] = []

  if (LEADS_ENDPOINT) {
    tasks.push(
      sheetsPost({
        type: 'lead',
        fullName: lead.fullName,
        phone: lead.phone,
        birthDate: lead.birthDate,
        zones: lead.zones,
        recommended: lead.recommended,
      }),
    )
  }

  if (supabaseReady) {
    tasks.push(
      supabaseInsert('leads', {
        full_name: lead.fullName,
        phone: lead.phone,
        birth_date: lead.birthDate,
        zones: lead.zones,
        recommended: lead.recommended,
      }),
    )
  }

  try {
    await Promise.allSettled(tasks)
  } catch {
    // молча игнорируем — сбой отправки не должен ломать показ результата
  }
}

export type BookingClick = {
  checkupName: string
  checkupPrice: number
  fullName: string
  phone: string
}

export function logBookingClick(click: BookingClick): void {
  try {
    if (LEADS_ENDPOINT) {
      void sheetsPost({
        type: 'booking',
        checkupName: click.checkupName,
        checkupPrice: String(click.checkupPrice),
        fullName: click.fullName,
        phone: click.phone,
      })
    }
    if (supabaseReady) {
      void supabaseInsert('booking_clicks', {
        checkup_name: click.checkupName,
        checkup_price: click.checkupPrice,
        full_name: click.fullName,
        phone: click.phone,
      })
    }
  } catch {
    // клик по кнопке не должен зависеть от отправки
  }
}
