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

export async function submitLead(lead: Lead): Promise<void> {
  const tasks: Promise<unknown>[] = []

  if (LEADS_ENDPOINT) {
    const body = new URLSearchParams()
    body.append('fullName', lead.fullName)
    body.append('phone', lead.phone)
    body.append('birthDate', lead.birthDate)
    body.append('zones', lead.zones)
    body.append('recommended', lead.recommended)
    body.append('submittedAt', new Date().toISOString())
    tasks.push(
      fetch(LEADS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
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
  if (!supabaseReady) return
  try {
    void supabaseInsert('booking_clicks', {
      checkup_name: click.checkupName,
      checkup_price: click.checkupPrice,
      full_name: click.fullName,
      phone: click.phone,
    })
  } catch {
    // клик по кнопке не должен зависеть от отправки
  }
}
