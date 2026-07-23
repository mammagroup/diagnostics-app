import { useRef, useState } from 'react'
import { IconClockHeart, IconClipboardHeart } from '@tabler/icons-react'
import { ContactLinks } from '../components/ContactLinks'
import { LegalModal } from '../components/LegalModal'
import { consentDoc } from '../data/legal'
import type { PatientInfo } from '../types'

type Props = {
  onStartTest: (patient: PatientInfo) => void
}

export function HomeScreen({ onStartTest }: Props) {
  const [error, setError] = useState('')
  const [showConsent, setShowConsent] = useState(false)

  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const consentRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    // читаем значения прямо из полей — так автозаполнение браузера не теряется
    const name = (nameRef.current?.value ?? '').trim()
    const tel = (phoneRef.current?.value ?? '').trim()
    const city = (cityRef.current?.value ?? '').trim()
    const bd = dateRef.current?.value ?? ''
    const agreed = consentRef.current?.checked ?? false

    const missing: string[] = []
    if (!name) missing.push('ФИО')
    if (!tel) missing.push('номер телефона')
    if (!city) missing.push('город')
    if (!bd) missing.push('дату рождения')
    if (!agreed) missing.push('согласие на обработку данных')

    if (missing.length > 0) {
      setError(`Заполните: ${missing.join(', ')}.`)
      return
    }

    setError('')
    onStartTest({ fullName: name, phone: tel, city, birthDate: bd })
  }

  return (
    <div className="px-4 py-6">
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="Mamma Group Clinic"
        className="mx-auto mb-4 w-32"
      />
      <p className="mb-2 text-xl font-medium">Диагностика женского здоровья</p>
      <p className="mb-4 text-sm leading-relaxed text-gray-500">
        Mamma Group Clinic — клиника женского здоровья в Алматы. Наша миссия — чтобы каждая женщина
        понимала своё тело и вовремя замечала его сигналы. Наша цель — находить сбои на раннем
        этапе, когда всё легко поправимо, а не лечить запущенное.
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
            ref={nameRef}
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Иванова Айгуль Ерлановна"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Номер телефона</label>
          <input
            ref={phoneRef}
            type="tel"
            name="tel"
            autoComplete="tel"
            placeholder="+7 700 000 00 00"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Город</label>
          <input
            ref={cityRef}
            type="text"
            name="city"
            autoComplete="address-level2"
            placeholder="Алматы"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Дата рождения</label>
          <input
            ref={dateRef}
            type="date"
            name="bday"
            autoComplete="bday"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400"
          />
        </div>
      </div>

      <label className="mb-5 flex items-start gap-2 text-xs text-gray-500">
        <input
          ref={consentRef}
          type="checkbox"
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-brand-400"
        />
        <span>
          Даю{' '}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setShowConsent(true)
            }}
            className="text-brand-600 underline underline-offset-2"
          >
            согласие на обработку персональных данных
          </button>
        </span>
      </label>

      {error && <p className="mb-3 text-sm text-brand-600">{error}</p>}

      <button
        onClick={handleSubmit}
        className="w-full rounded-full bg-brand-400 py-3 text-sm font-medium text-brand-50"
      >
        Пройти тест
      </button>

      <ContactLinks />

      <LegalModal doc={showConsent ? consentDoc : null} onClose={() => setShowConsent(false)} />
    </div>
  )
}
