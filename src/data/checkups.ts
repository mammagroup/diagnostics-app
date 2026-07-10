import type { CategoryKey } from './questions'

export type Checkup = {
  id: string
  name: string
  subtitle?: string
  group: 'mini' | 'main'
  includes: string[]
  gifts: string[]
  price: number
  oldPrice?: number
}

export const checkups: Checkup[] = [
  {
    id: 'mammo-mini',
    name: 'Мини чекап маммология',
    group: 'mini',
    includes: ['Консультация маммолога', 'УЗИ молочной железы', 'Онкоосмотр'],
    gifts: ['УЗИ щитовидной железы в подарок'],
    price: 24000,
    oldPrice: 34000,
  },
  {
    id: 'gyneco-mini',
    name: 'Мини чекап гинекология',
    group: 'mini',
    includes: ['Консультация гинеколога', 'УЗИ ОМТ', 'Онкоосмотр'],
    gifts: ['УЗИ щитовидной железы в подарок'],
    price: 24000,
    oldPrice: 34000,
  },
  {
    id: 'gyneco-onco-uzi',
    name: 'Чекап гинекология + онкоцитология',
    subtitle: 'с УЗИ щитовидной железы в подарок',
    group: 'mini',
    includes: ['Консультация гинеколога', 'УЗИ ОМТ', 'Онкоосмотр', 'Онкоцитология'],
    gifts: ['УЗИ щитовидной железы в подарок'],
    price: 29000,
    oldPrice: 34000,
  },
  {
    id: 'gyneco-onco-kolpo',
    name: 'Чекап гинекология + онкоцитология',
    subtitle: 'с кольпоскопией в подарок',
    group: 'mini',
    includes: ['Консультация гинеколога', 'УЗИ ОМТ', 'Онкоосмотр', 'Онкоцитология'],
    gifts: ['Кольпоскопия в подарок'],
    price: 29000,
    oldPrice: 34000,
  },
  {
    id: 'woman-mini',
    name: 'Мини женский чекап',
    subtitle: 'маммология + гинекология',
    group: 'mini',
    includes: [
      'Консультация маммолога',
      'Консультация гинеколога',
      'УЗИ молочной железы',
      'УЗИ ОМТ',
    ],
    gifts: ['УЗИ щитовидной железы в подарок', 'Кольпоскопия в подарок'],
    price: 42000,
    oldPrice: 59000,
  },
  {
    id: 'thyroid',
    name: 'Чекап щитовидная железа',
    group: 'mini',
    includes: [
      'Консультация эндокринолога',
      'УЗИ щитовидной железы',
      'Анализы: ТТГ, Т4 св., Т3 св., Анти-ТПО, Анти-ТГ, ОАК',
    ],
    gifts: [],
    price: 42500,
    oldPrice: 49500,
  },
  {
    id: 'woman-full',
    name: 'Чекап «Женский минимум»',
    group: 'main',
    includes: [
      'УЗИ ОМТ',
      'Консультация гинеколога',
      'Онкоцитология',
      'УЗИ щитовидной железы',
      'УЗИ молочной железы',
      'Консультация маммолога',
      'Повторный осмотр маммолога',
      'Повторный осмотр гинеколога',
    ],
    gifts: [],
    price: 61000,
  },
  {
    id: 'antiage-woman',
    name: 'Чекап «Anti-age женский минимум»',
    group: 'main',
    includes: [
      'УЗИ ОМТ',
      'УЗИ щитовидной железы',
      'УЗИ молочной железы',
      'Консультация anti-age маммолога',
      'Консультация anti-age гинеколога',
      'Консультация anti-age эндокринолога',
    ],
    gifts: [],
    price: 51000,
  },
  {
    id: 'antiage-base',
    name: 'Чекап «Антиэйдж база»',
    group: 'main',
    includes: [
      'УЗИ ОМТ',
      'УЗИ щитовидной железы',
      'УЗИ брюшной полости',
      'УЗИ молочной железы',
      'Консультация anti-age маммолога',
      'Консультация anti-age гинеколога',
      'Консультация anti-age эндокринолога',
    ],
    gifts: [],
    price: 61000,
  },
]

export const zoneToCheckup: Record<CategoryKey, string> = {
  cycle: 'gyneco-onco-uzi',
  gyneco: 'gyneco-onco-kolpo',
  thyroid: 'thyroid',
  adrenal: 'antiage-woman',
  androgen: 'antiage-woman',
  estrogen: 'antiage-woman',
  skin: 'antiage-woman',
  iron: 'thyroid',
  psych: 'woman-full',
  gi: 'antiage-base',
}

export const defaultCheckupId = 'woman-full'

export function whatsappBookingLink(checkupName: string): string {
  const text = `Здравствуйте! Прошла тест на сайте, хочу записаться на «${checkupName}»`
  return `https://wa.me/77005777041?text=${encodeURIComponent(text)}`
}
