import { useState } from 'react'
import { IconHeartHandshake, IconClockHeart, IconClipboardHeart } from '@tabler/icons-react'
import type { PatientInfo } from '../types'

type Props = {
  onStartTest: (patient: PatientInfo) => void
}

export function HomeScreen({ onStartTest }: Props) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [consent, setConsent] = useState(false)

  const isValid = fullName.trim().length > 0 && phone.trim().length > 0 && birthDate.length > 0 && consent

  const handleSubmit = () => {
    if (!isValid) return
    onStartTest({ fullName, phone, birthDate })
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50">
        <IconHeartHandshake size={26} stroke={1.75} color="#a32d2d" />
      </div>
      <p className="mb-2 text-xl font-medium">Диагностика женского здоровья</p>
      <p className="mb-4 text-sm leading-relaxed text-gray-500">
        Мы — клиника женского здоровья. Наша миссия — чтобы каждая женщина понимала своё тело и
        вовремя замечала его сигналы. Наша цель — находить сбои на раннем этапе, когда всё легко
        поправимо, а не лечить запущенное.
      </p>

      <div className="mb-4 rounded-xl bg-brand-50/60 p-3.5">
        <p className="text-sm leading-relaxed text-brand-900">
          Этот тест — <span className="font-medium">бесплатный</span>. Он не ставит диагноз, но
          помогает понять, в какой зоне здоровья идёт сбой и куда стоит углубиться: к какому врачу
          сходить и какие анализы обсудить.
        </p>
      </div>

      <div className="mb-6 flex gap-2">
        <div className="flex flex-1 items-center gap-1.5 rounded-xl border border-gray-100 px-2.5 py-2">
          <IconClipboardHeart size={16} stroke={1.75} color="#a32d2d" className="flex-shrink-0" />
          <span className="text-xs text-gray-600">10 зон здоровья</span>
        </div>
        <div className="flex flex-1 items-center gap-1.5 rounded-xl border border-gray-100 px-2.5 py-2">
          <IconClockHeart size={16} stroke={1.75} color="#a32d2d" className="flex-shrink-0" />
          <span className="text-xs text-gray-600">Около 7 минут</span>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">ФИО</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Иванова Айгуль Ерлановна"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Номер телефона</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 700 000 00 00"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Дата рождения</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
        </div>
      </div>

      <label className="mb-5 flex items-start gap-2 text-xs text-gray-500">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-brand-400"
        />
        Даю согласие на обработку персональных данных
      </label>

      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full rounded-full bg-brand-400 py-3 text-sm font-medium text-brand-50 disabled:bg-gray-200 disabled:text-gray-400"
      >
        Пройти тест
      </button>
    </div>
  )
}
