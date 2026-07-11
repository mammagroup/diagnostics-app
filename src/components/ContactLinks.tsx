import { useState } from 'react'
import { IconBrandWhatsapp, IconBrandInstagram, IconMapPin } from '@tabler/icons-react'
import { consentDoc, offerDoc, type LegalDoc } from '../data/legal'
import { LegalModal } from './LegalModal'

const contacts = [
  {
    href: 'https://wa.me/77005777041',
    icon: IconBrandWhatsapp,
    color: '#25D366',
    label: 'WhatsApp',
    value: '8 (700) 577 70 41',
  },
  {
    href: 'https://www.instagram.com/mammagroup_clinic',
    icon: IconBrandInstagram,
    color: '#E1306C',
    label: 'Instagram',
    value: '@mammagroup_clinic',
  },
  {
    href: 'https://2gis.kz/almaty/firm/70000001034074752',
    icon: IconMapPin,
    color: '#a32d2d',
    label: '2GIS',
    value: 'Как нас найти',
  },
]

export function ContactLinks() {
  const [openDoc, setOpenDoc] = useState<LegalDoc | null>(null)

  return (
    <div className="mt-8 border-t border-gray-100 pt-5">
      <p className="mb-3 text-sm font-medium">Мы на связи</p>
      <div className="flex flex-col gap-2">
        {contacts.map(({ href, icon: Icon, color, label, value }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white/70 px-3.5 py-2.5"
          >
            <Icon size={20} stroke={1.75} color={color} className="flex-shrink-0" />
            <span className="text-sm font-medium">{label}</span>
            <span className="ml-auto text-sm text-gray-500">{value}</span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-400">
        г. Алматы, ул. Пушкина 2/76, БЦ «Саяхат», 1 этаж
      </p>

      <div className="mt-4 flex flex-col gap-1.5">
        <button
          onClick={() => setOpenDoc(consentDoc)}
          className="text-left text-xs text-gray-400 underline underline-offset-2"
        >
          Согласие на обработку персональных данных
        </button>
        <button
          onClick={() => setOpenDoc(offerDoc)}
          className="text-left text-xs text-gray-400 underline underline-offset-2"
        >
          Публичная оферта
        </button>
      </div>

      <LegalModal doc={openDoc} onClose={() => setOpenDoc(null)} />
    </div>
  )
}
