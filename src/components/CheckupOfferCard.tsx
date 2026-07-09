import { IconCheck, IconGift } from '@tabler/icons-react'
import { checkupOffer } from '../data/checkupOffer'

export function CheckupOfferCard() {
  return (
    <div className="rounded-2xl border-2 border-brand-400 p-4">
      <p className="mb-1 text-xs font-medium text-brand-600">Специально для тебя</p>
      <p className="mb-3 text-base font-medium">{checkupOffer.title}</p>

      <ul className="mb-4 flex flex-col gap-1.5">
        {checkupOffer.includes.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
            <IconCheck size={15} stroke={2} color="#a32d2d" className="flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mb-4 flex flex-col gap-1.5 rounded-xl bg-brand-50 p-3">
        {checkupOffer.bonuses.map((bonus) => (
          <div key={bonus} className="flex items-center gap-2 text-xs text-brand-900">
            <IconGift size={14} stroke={1.75} color="#a32d2d" className="flex-shrink-0" />
            {bonus}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xl font-medium">{checkupOffer.price.toLocaleString('ru-RU')} ₸</p>
        <button className="rounded-full bg-brand-400 px-5 py-2 text-sm font-medium text-brand-50">
          Записаться на чекап
        </button>
      </div>
    </div>
  )
}
