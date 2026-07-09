import { useState } from 'react'
import { IconChevronLeft } from '@tabler/icons-react'
import { categories, questions } from '../data/questions'
import type { PatientInfo } from '../types'

type Props = {
  patient: PatientInfo
  onFinish: (answers: number[]) => void
}

export function TestScreen({ onFinish }: Props) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const question = questions[index]
  const category = categories[question.cat]
  const CategoryIcon = category.icon
  const progress = Math.round((index / questions.length) * 100)

  const handleAnswer = (weight: number) => {
    const next = [...answers]
    next[index] = weight
    setAnswers(next)
    if (index + 1 < questions.length) {
      setIndex(index + 1)
    } else {
      onFinish(next)
    }
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-5">
        <div className="mb-1.5 flex justify-between text-xs text-gray-400">
          <span>
            Вопрос {index + 1} из {questions.length}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-brand-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-400">
        <CategoryIcon size={14} stroke={1.75} />
        <span>{category.title}</span>
      </div>
      <p className="mb-5 text-base font-medium leading-snug">{question.text}</p>

      <div className="flex flex-col gap-2">
        {question.options.map((option) => (
          <button
            key={option.weight}
            onClick={() => handleAnswer(option.weight)}
            className="rounded-xl border border-gray-200 px-3.5 py-3 text-left text-sm leading-snug transition-colors active:border-brand-400 active:bg-brand-50"
          >
            {option.label}
          </button>
        ))}
      </div>

      {index > 0 && (
        <button
          onClick={() => setIndex(index - 1)}
          className="mt-5 flex items-center gap-0.5 text-sm text-gray-500"
        >
          <IconChevronLeft size={16} stroke={1.75} />
          Назад
        </button>
      )}
    </div>
  )
}
