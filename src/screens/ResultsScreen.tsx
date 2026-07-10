import { useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import { categories, questions, type CategoryKey } from '../data/questions'
import { checkups, zoneToCheckup, defaultCheckupId } from '../data/checkups'
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

export function ResultsScreen({ patient, answers }: Props) {
  const nameParts = patient.fullName.trim().split(/\s+/)
  const firstName = nameParts[1] ?? nameParts[0]
  const zones = computeZones(answers)
  const [showAll, setShowAll] = useState(false)

  const recommendedId = zones.length > 0 ? zoneToCheckup[zones[0].key] : defaultCheckupId
  const recommended = checkups.find((c) => c.id === recommendedId) ?? checkups[0]
  const rest = checkups.filter((c) => c.id !== recommended.id)
  const restMini = rest.filter((c) => c.group === 'mini')
  const restMain = rest.filter((c) => c.group === 'main')
  const restComplex = rest.filter((c) => c.group === 'complex')

  return (
    <div className="px-4 py-6">
      <p className="mb-4 text-lg font-medium">Твой разбор готов, {firstName}</p>

      {zones.length === 0 ? (
        <div className="mb-6 rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Явных кластеров симптомов не выявлено — это скорее хороший знак. Плановый осмотр раз в
            год всё равно стоит сохранить.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-3 text-sm text-gray-500">Больше всего совпадений в следующих зонах:</p>
          <div className="mb-6 flex flex-col gap-2.5">
            {zones.map((zone, i) => {
              const category = categories[zone.key]
              const ZoneIcon = category.icon
              return (
                <div
                  key={zone.key}
                  className={`rounded-xl border p-4 ${
                    i === 0 ? 'border-brand-400 bg-brand-50/40' : 'border-gray-200'
                  }`}
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <ZoneIcon size={18} stroke={1.75} className="text-brand-600" />
                    <span className="flex-1 text-sm font-medium">{category.title}</span>
                    <span className="text-xs text-gray-400">{Math.round(zone.percent * 100)}%</span>
                  </div>
                  <p className="mb-1.5 text-sm leading-snug text-gray-600">{category.desc}</p>
                  <p className="text-xs text-gray-400">Кому показать: {category.specialist}</p>
                </div>
              )
            })}
          </div>
        </>
      )}

      <p className="mb-6 text-xs leading-relaxed text-gray-400">
        Это ориентировочный опросник, а не диагноз. Он помогает понять, с каким специалистом стоит
        поговорить и какие анализы обсудить, но не заменяет очную консультацию врача.
      </p>

      <p className="mb-3 text-sm font-medium text-gray-500">Рекомендуем чекап под твой результат</p>
      <CheckupCard checkup={recommended} highlighted />

      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-full border border-gray-200 py-2.5 text-sm font-medium text-gray-600"
      >
        {showAll ? 'Скрыть остальные чекапы' : 'Посмотреть все чекапы'}
        <IconChevronDown
          size={16}
          stroke={2}
          className={`transition-transform ${showAll ? 'rotate-180' : ''}`}
        />
      </button>

      {showAll && (
        <div className="mt-5">
          <p className="mb-3 text-sm font-medium text-gray-500">Мини-чекапы</p>
          <div className="flex flex-col gap-3">
            {restMini.map((checkup) => (
              <CheckupCard key={checkup.id} checkup={checkup} />
            ))}
          </div>

          {restMain.length > 0 && (
            <>
              <p className="mb-3 mt-6 text-sm font-medium text-gray-500">Основные чекапы</p>
              <div className="flex flex-col gap-3">
                {restMain.map((checkup) => (
                  <CheckupCard key={checkup.id} checkup={checkup} />
                ))}
              </div>
            </>
          )}

          {restComplex.length > 0 && (
            <>
              <p className="mb-1 mt-6 text-sm font-medium text-gray-500">
                Комплексная диагностика организма
              </p>
              <p className="mb-3 text-xs text-gray-400">
                Полное обследование женского здоровья за 2 визита, с сопровождением врача 3 месяца.
              </p>
              <div className="flex flex-col gap-3">
                {restComplex.map((checkup) => (
                  <CheckupCard key={checkup.id} checkup={checkup} />
                ))}
              </div>
            </>
          )}

          <p className="mt-4 text-xs text-gray-400">
            Акционные цены на мини-чекапы действительны до конца июля.
          </p>
        </div>
      )}

      <ContactLinks />
    </div>
  )
}
