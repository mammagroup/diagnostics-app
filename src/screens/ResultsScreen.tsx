import { categories, questions, type CategoryKey } from '../data/questions'
import type { PatientInfo } from '../types'
import { CheckupOfferCard } from '../components/CheckupOfferCard'
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

      <p className="mb-3 text-sm font-medium text-gray-500">Рекомендуем пройти полный чекап</p>
      <CheckupOfferCard />

      <ContactLinks />
    </div>
  )
}
