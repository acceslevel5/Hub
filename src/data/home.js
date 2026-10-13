// მთავარი გვერდის ფეიკ მონაცემები (Figma 3063:80339)
import story1 from '../assets/images/story-1.png'
import story2 from '../assets/images/story-2.jpg'
import story3 from '../assets/images/story-3.jpg'
import story4 from '../assets/images/story-4.png'
import cardImage from '../assets/images/card-mc-tbilisi-sky.png'
import utilityIcon from '../assets/icons/utility.svg'
import transferOwnIcon from '../assets/icons/transfer-own.svg'
import transferOtherIcon from '../assets/icons/transfer-other.svg'
import automaticPaymentIcon from '../assets/icons/automatic-payment.svg'
import loyaltyPlus from '../assets/images/loyalty-plus.png'
import loyaltyMr from '../assets/images/loyalty-mr.png'
import knowYourLimit from '../assets/illustrations/know-your-limit.svg'
import autoLiability from '../assets/illustrations/auto-liability-insurance.svg'

// fit: 'fill' — Figma-ში მე-4 სთორის სურათი გაწელილია (object-cover-ის გარეშე)
export const stories = [
  { id: 's1', image: story1 },
  { id: 's2', image: story2 },
  { id: 's3', image: story3 },
  { id: 's4', image: story4, fit: 'fill' },
]

export const availableBalance = {
  label: 'ხელმისაწვდომი თანხა თანხა',
  value: '1030.64 ₾',
}

export const account = {
  name: 'უნივერალური ანგარიში',
  cardImage,
  amount: '1030.64',
  currency: '₾',
  currencies: [
    { amount: '970.29', symbol: '₾' },
    { amount: '16.34', symbol: '$' },
    { amount: '0.00', symbol: '€', disabled: true },
    { amount: '0.00', symbol: '£', disabled: true },
  ],
}

export const quickActions = [
  { id: 'pay', label: 'გადახდა', icon: utilityIcon },
  { id: 'own', label: 'საკუთარ ანგარიშზე', icon: transferOwnIcon },
  { id: 'other', label: 'სხვასთან გადარიცხვა', icon: transferOtherIcon },
]

export const upcomingPayments = [
  { id: 'u1', title: 'ავტომატური გადარიცხვა', subtitle: '4 დღეში', amount: '250.00 ₾', icon: automaticPaymentIcon },
]

export const loyalty = [
  { id: 'plus', title: 'PLUS ქულები', value: '52,000 PLUS', caption: '367.65 ₾', image: loyaltyPlus },
  { id: 'mr', title: 'MR ქულები', value: '1,600 MR', caption: '24.58 ₾', image: loyaltyMr },
]

export const productOffers = [
  {
    id: 'limit',
    illustration: knowYourLimit,
    text: 'ნახე შენი საკრედიტო შესაძლებლობები და მოითხოვე თანხა',
    cta: 'მოთხოვნა',
  },
  {
    id: 'auto-liability',
    illustration: autoLiability,
    text: 'აანაზღაურე მანქანის მართვისას სხვისთვის მიყენებული ზიანი მარტივად',
    cta: 'გაიგე მეტი',
  },
]
