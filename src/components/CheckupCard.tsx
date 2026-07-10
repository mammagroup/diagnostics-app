import { IconCheck, IconGift } from '@tabler/icons-react'
import { whatsappBookingLink, type Checkup } from '../data/checkups'

type Props = {
  checkup: Checkup
  highlighted?: boolean
}

export function CheckupCard({ checkup, highlighted = false }: Props) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        highlighted ? 'border-2 border-brand-400 bg-white/70' : 'border border-gray-200 bg-white/70'
      }`}
    >
      {highlighted && (
        <p className="mb-1 text-xs font-medium text-brand-600">Подходит по результатам теста</p>
      )}
      <p className="text-base font-medium">{checkup.name}</p>
      {checkup.subtitle && <p className="mt-0.5 text-xs text-gray-400">{checkup.subtitle}</p>}

      <ul className="mb-3 mt-3 flex flex-col gap-1.5">
        {checkup.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
            <IconCheck size={15} stroke={2} color="#a32d2d" className="mt-0.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mb-3 flex flex-col gap-1.5 rounded-xl bg-brand-50 p-3">
        {checkup.gifts.map((gift) => (
          <div key={gift} className="flex items-center gap-2 text-xs text-brand-900">
            <IconGift size={14} stroke={1.75} color="#a32d2d" className="flex-shrink-0" />
            {gift}
          </div>
        ))}
        <div className="flex items-center gap-2 text-xs text-brand-900">
          <IconGift size={14} stroke={1.75} color="#a32d2d" className="flex-shrink-0" />
          Сертификат на 5 000 ₸ — можно подарить близким
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          {checkup.oldPrice && (
            <p className="text-xs text-gray-400 line-through">
              {checkup.oldPrice.toLocaleString('ru-RU')} ₸
            </p>
          )}
          <p className="text-lg font-medium">{checkup.price.toLocaleString('ru-RU')} ₸</p>
        </div>
        <a
          href={whatsappBookingLink(checkup.name)}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-brand-400 px-5 py-2 text-sm font-medium text-brand-50"
        >
          Записаться
        </a>
      </div>
    </div>
  )
}
