import { useState } from 'react'
import { IconCheck, IconGift, IconChevronDown } from '@tabler/icons-react'
import { whatsappBookingLink, type Checkup } from '../data/checkups'

type Props = {
  checkup: Checkup
  highlighted?: boolean
  badge?: string
  hint?: string
}

export function CheckupCard({ checkup, highlighted = false, badge, hint }: Props) {
  const [showFull, setShowFull] = useState(false)
  const isComplex = checkup.group === 'complex'
  const rows = isComplex ? checkup.summary ?? [] : checkup.includes

  return (
    <div
      className={`rounded-2xl p-4 ${
        highlighted ? 'border-2 border-brand-400 bg-white/70' : 'border border-gray-200 bg-white/70'
      }`}
    >
      {badge && (
        <span className="mb-2 inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600">
          {badge}
        </span>
      )}
      <p className="text-base font-medium">{checkup.name}</p>
      {hint && <p className="mt-0.5 mb-0.5 text-xs text-gray-500">{hint}</p>}
      {checkup.subtitle && <p className="mt-0.5 text-xs text-gray-400">{checkup.subtitle}</p>}

      <ul className="mb-3 mt-3 flex flex-col gap-1.5">
        {rows.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
            <IconCheck size={15} stroke={2} color="#a32d2d" className="mt-0.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      {isComplex && checkup.fullList && (
        <>
          <button
            onClick={() => setShowFull(!showFull)}
            className="mb-3 flex items-center gap-1 text-xs font-medium text-brand-600"
          >
            {showFull
              ? 'Свернуть список'
              : `Полный список — ${checkup.fullList.length} исследований`}
            <IconChevronDown
              size={14}
              stroke={2}
              className={`transition-transform ${showFull ? 'rotate-180' : ''}`}
            />
          </button>
          {showFull && (
            <ol className="mb-3 flex list-decimal flex-col gap-1 pl-5 text-xs text-gray-500">
              {checkup.fullList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          )}
        </>
      )}

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
