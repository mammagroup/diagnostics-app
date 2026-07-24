import { useEffect, useRef, useState } from 'react'
import {
  IconAlertTriangle,
  IconArrowRight,
  IconBrandWhatsapp,
  IconChevronDown,
  IconShieldCheck,
} from '@tabler/icons-react'
import { categories, questions, type CategoryKey } from '../data/questions'
import { checkups, recommendThree } from '../data/checkups'
import { submitLead, logBookingClick } from '../lib/leads'
import type { PatientInfo } from '../types'
import { CheckupCard } from '../components/CheckupCard'
import { ContactLinks } from '../components/ContactLinks'

type Props = {
  patient: PatientInfo
  answers: number[]
}

type ZoneResult = {
  key: CategoryKey
  percent: number
}

function computeZones(answers: number[]): ZoneResult[] {
  const scores = {} as Record<CategoryKey, { sum: number; max: number }>
  questions.forEach((question, i) => {
    const entry = scores[question.cat] ?? { sum: 0, max: 0 }
    entry.sum += answers[i] ?? 0
    entry.max += 3
    scores[question.cat] = entry
  })
  return (Object.keys(scores) as CategoryKey[])
    .map((key) => ({ key, percent: scores[key].sum / scores[key].max }))
    .filter((zone) => zone.percent >= 0.4)
    .sort((a, b) => b.percent - a.percent)
}

function riskStyle(percent: number) {
  if (percent >= 0.65) {
    return {
      label: 'Высокое совпадение',
      card: 'border-red-300 bg-red-50/50',
      badge: 'bg-red-100 text-red-800',
      bar: 'bg-red-500',
      urgent: true,
    }
  }
  if (percent >= 0.5) {
    return {
      label: 'Заметное совпадение',
      card: 'border-amber-300 bg-amber-50/40',
      badge: 'bg-amber-100 text-amber-800',
      bar: 'bg-amber-500',
      urgent: false,
    }
  }
  return {
    label: 'Умеренное совпадение',
    card: 'border-gray-200 bg-white/60',
    badge: 'bg-gray-100 text-gray-600',
    bar: 'bg-gray-400',
    urgent: false,
  }
}

const CONSULT_TEXT =
  'Здравствуйте! Я прошла тест на сайте, хочу записаться на бесплатную консультацию по результатам.'
const CONSULT_URL = `https://wa.me/77005777041?text=${encodeURIComponent(CONSULT_TEXT)}`

export function ResultsScreen({ patient, answers }: Props) {
  const nameParts = patient.fullName.trim().split(/\s+/)
  const firstName = nameParts[1] ?? nameParts[0]
  const zones = computeZones(answers)
  const [showCheckups, setShowCheckups] = useState(false)

  const recommendations = recommendThree(zones.length > 0 ? zones[0].key : null)
  const recommendedIds = new Set(recommendations.map((r) => r.checkup.id))
  const rest = checkups.filter((c) => !recommendedIds.has(c.id))

  const sentRef = useRef(false)
  useEffect(() => {
    if (sentRef.current) return
    sentRef.current = true
    const zonesText =
      zones.length > 0
        ? zones
            .map((z) => `${categories[z.key].title} ${Math.round(z.percent * 100)}%`)
            .join('; ')
        : 'без выраженных зон'
    submitLead({
      fullName: patient.fullName,
      phone: patient.phone,
      city: patient.city,
      birthDate: patient.birthDate,
      zones: zonesText,
      recommended: 'бесплатная консультация',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const topZone = zones[0]
  const urgentCount = zones.filter((z) => z.percent >= 0.5).length

  const consultBlock = (
    <div className="rounded-2xl border-2 border-[#25D366] bg-[#25D366]/8 p-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-[#25D366] px-2.5 py-0.5 text-xs font-medium text-white">
          Бесплатно · 15 минут
        </span>
      </div>
      <p className="mb-1.5 text-base font-medium">Не уверена, что это значит именно для тебя?</p>
      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        Прежде чем что-то выбирать — обсуди свой результат с врачом. За 15 минут в WhatsApp врач
        Mamma Group поможет понять, что из этого действительно важно в твоём случае и с чего начать.
        Это бесплатно и ни к чему не обязывает.
      </p>
      <a
        href={CONSULT_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() =>
          logBookingClick({
            checkupName: 'Бесплатная консультация по тесту',
            checkupPrice: 0,
            fullName: patient.fullName,
            phone: patient.phone,
          })
        }
        className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-medium text-white"
      >
        <IconBrandWhatsapp size={20} stroke={2} />
        Получить бесплатную консультацию
      </a>
    </div>
  )

  return (
    <div className="px-4 py-6">
      <p className="mb-1 text-lg font-medium">{firstName}, вот что показал твой тест</p>

      {zones.length === 0 ? (
        <>
          <p className="mb-5 text-sm leading-relaxed text-gray-500">
            Выраженных сбоев тест не выявил — это хороший знак. Но многие процессы в женском
            организме идут без симптомов, поэтому раз в год стоит проходить осмотр, чтобы не
            пропустить начало.
          </p>
          {consultBlock}
        </>
      ) : (
        <>
          <p className="mb-5 text-sm leading-relaxed text-gray-600">
            Мы нашли <span className="font-medium text-brand-600">{zones.length} зоны</span>, где
            твои симптомы складываются в закономерность
            {urgentCount > 0 && (
              <>
                , и <span className="font-medium text-brand-600">{urgentCount}</span> из них стоит
                проверить в ближайшее время
              </>
            )}
            . Ниже — что это значит простыми словами.
          </p>

          <div className="mb-6 flex flex-col gap-3">
            {zones.map((zone) => {
              const category = categories[zone.key]
              const ZoneIcon = category.icon
              const style = riskStyle(zone.percent)
              const pct = Math.round(zone.percent * 100)
              return (
                <div key={zone.key} className={`rounded-2xl border p-4 ${style.card}`}>
                  <div className="mb-2 flex items-start gap-2">
                    <ZoneIcon size={20} stroke={1.75} className="mt-0.5 flex-shrink-0 text-brand-600" />
                    <span className="flex-1 text-base font-medium leading-snug">
                      {category.title}
                    </span>
                    <span
                      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}
                    >
                      {pct}%
                    </span>
                  </div>

                  <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-black/5">
                    <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${pct}%` }} />
                  </div>

                  <p className="mb-3 text-sm leading-relaxed text-gray-700">{category.simple}</p>

                  <div className="mb-3 flex gap-2 rounded-xl bg-black/4 p-3">
                    <IconAlertTriangle
                      size={16}
                      stroke={1.75}
                      className="mt-0.5 flex-shrink-0 text-amber-600"
                    />
                    <div>
                      <p className="mb-0.5 text-xs font-medium text-gray-500">
                        Если оставить как есть
                      </p>
                      <p className="text-sm leading-relaxed text-gray-700">{category.risk}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 rounded-xl bg-brand-50/70 p-3">
                    <IconArrowRight
                      size={16}
                      stroke={2}
                      className="mt-0.5 flex-shrink-0 text-brand-600"
                    />
                    <div>
                      <p className="mb-0.5 text-xs font-medium text-brand-600">Что делать</p>
                      <p className="text-sm leading-relaxed text-brand-900">{category.action}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {topZone && (
            <div className="mb-6 rounded-xl bg-gray-50 p-4">
              <p className="text-sm leading-relaxed text-gray-600">
                Обрати внимание: зоны в твоём результате связаны между собой. Часто достаточно найти
                и убрать одну общую причину — и остальные подтягиваются следом. Поэтому важно
                смотреть картину целиком, а не лечить симптомы по отдельности.
              </p>
            </div>
          )}

          {consultBlock}
        </>
      )}

      <div className="mt-5">
        <button
          onClick={() => setShowCheckups(!showCheckups)}
          className="flex w-full items-center justify-center gap-1.5 rounded-full border border-gray-200 py-2.5 text-sm text-gray-600"
        >
          {showCheckups ? 'Скрыть программы обследования' : 'Уже готова обследоваться? Смотреть программы'}
          <IconChevronDown
            size={16}
            stroke={2}
            className={`transition-transform ${showCheckups ? 'rotate-180' : ''}`}
          />
        </button>

        {showCheckups && (
          <div className="mt-4">
            <p className="mb-3 text-xs leading-relaxed text-gray-400">
              Если хочешь сразу перейти к обследованию — вот программы под твой результат. Не
              уверена, что выбрать? Тогда лучше начни с бесплатной консультации выше — врач подберёт
              нужное и не назначит лишнего.
            </p>
            <div className="flex flex-col gap-3">
              {recommendations.map((rec) => (
                <CheckupCard
                  key={rec.checkup.id}
                  checkup={rec.checkup}
                  badge={rec.badge}
                  hint={rec.hint}
                  highlighted={rec.level === 'extended'}
                  patient={patient}
                />
              ))}
              {rest.map((checkup) => (
                <CheckupCard key={checkup.id} checkup={checkup} patient={patient} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-2.5 rounded-xl border border-gray-100 bg-white/60 p-4">
        <IconShieldCheck size={20} stroke={1.75} className="mt-0.5 flex-shrink-0 text-brand-600" />
        <p className="text-xs leading-relaxed text-gray-500">
          Приём ведут маммолог, гинеколог, эндокринолог и anti-age терапевт — в одном месте, в
          Алматы. Это ориентировочный опросник, а не диагноз: точную картину покажет врач на очной
          консультации.
        </p>
      </div>

      <ContactLinks />
    </div>
  )
}
