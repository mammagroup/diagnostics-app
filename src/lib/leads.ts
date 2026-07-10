import { LEADS_ENDPOINT } from '../config'

export type Lead = {
  fullName: string
  phone: string
  birthDate: string
  zones: string
  recommended: string
}

export async function submitLead(lead: Lead): Promise<void> {
  if (!LEADS_ENDPOINT) return
  try {
    const body = new URLSearchParams()
    body.append('fullName', lead.fullName)
    body.append('phone', lead.phone)
    body.append('birthDate', lead.birthDate)
    body.append('zones', lead.zones)
    body.append('recommended', lead.recommended)
    body.append('submittedAt', new Date().toISOString())
    await fetch(LEADS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
  } catch {
    // молча игнорируем — сбой отправки не должен ломать показ результата
  }
}
