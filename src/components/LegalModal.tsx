import { IconX } from '@tabler/icons-react'
import type { LegalDoc } from '../data/legal'

type Props = {
  doc: LegalDoc | null
  onClose: () => void
}

export function LegalModal({ doc, onClose }: Props) {
  if (!doc) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90svh] w-full max-w-md flex-col rounded-t-2xl bg-white sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
          <div>
            <p className="text-base font-medium leading-snug">{doc.title}</p>
            <p className="mt-0.5 text-xs text-gray-400">{doc.updated}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-100"
          >
            <IconX size={20} stroke={1.75} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4">
          {doc.sections.map((section, i) => (
            <div key={i} className="mb-4 last:mb-0">
              {section.heading && (
                <p className="mb-1 text-sm font-medium">{section.heading}</p>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mb-2 text-sm leading-relaxed text-gray-600 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 px-5 py-3">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-brand-400 py-2.5 text-sm font-medium text-brand-50"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
