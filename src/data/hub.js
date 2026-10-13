// Hub & Search მონაცემები (Figma 3063:136102, 3091:150983)
import loan from '../assets/hub/loan.png'
import installments from '../assets/hub/installments.png'
import paymentPlan from '../assets/hub/payment-plan.png'
import deposit from '../assets/hub/deposit.png'
import depositCertificate from '../assets/hub/deposit-certificate.png'
import card from '../assets/hub/card.png'
import creditCard from '../assets/hub/credit-card.png'
import piggyBank from '../assets/hub/piggy-bank.png'
import solo from '../assets/hub/solo.png'
import offers from '../assets/hub/offers.png'
import investments from '../assets/hub/investments.png'
import insurance from '../assets/hub/insurance.png'
import giftCard from '../assets/hub/gift-card.png'
import car from '../assets/hub/car.png'
import travelCard from '../assets/hub/travel-card.png'
import automaticPayment from '../assets/hub/automatic-payment.png'
import exchangeRates from '../assets/hub/exchange-rates.png'
import financialManager from '../assets/hub/financial-manager.png'
import transferOtherIcon from '../assets/icons/transfer-other-16.svg'
import utilityIcon from '../assets/icons/utility-16.svg'
import exchangeRatesIcon from '../assets/icons/exchange-rates-16.svg'
import loanIcon from '../assets/icons/loan-16.svg'

/*
 * size — ილუსტრაციის ზომა ფილაში (Figma), offset — ცენტრიდან წანაცვლება [x, y],
 * blend — mix-blend-mode, route — დაჭერისას გასახსნელი ეკრანი, keywords — დამატებითი საძიებო სიტყვები (ინგლისური/სინონიმები)
 */
export const hubProducts = [
  { id: 'loan', title: 'სესხი', image: loan, size: 72, keywords: ['loan', 'credit', 'სესხები'] },
  { id: 'installments', title: 'ნაწილ-ნაწილ', image: installments, size: 56, keywords: ['installments', 'nawil-nawil', 'განვადება'] },
  { id: 'payment-plan', title: 'გადახდის განვადება', image: paymentPlan, size: 80, isNew: true, keywords: ['payment plan', 'installment'] },
  { id: 'deposit', title: 'ანაბარი', image: deposit, size: 80, keywords: ['deposit', 'savings', 'დეპოზიტი'] },
  { id: 'deposit-certificate', title: 'სადეპოზიტო სერტიფიკატი', image: depositCertificate, size: 88, keywords: ['deposit certificate', 'certificate'] },
  { id: 'card', title: 'ბარათი', image: card, size: 88, keywords: ['card', 'debit card', 'სადებეტო ბარათი'] },
  { id: 'credit-card', title: 'საკრედიტო ბარათი', image: creditCard, size: 72, keywords: ['credit card', 'american express', 'amex'] },
  { id: 'piggy-bank', title: 'ყულაბა', image: piggyBank, size: 80, keywords: ['piggy bank', 'savings', 'დაგროვება'] },
  { id: 'solo', title: 'Solo', image: solo, size: 88, keywords: ['სოლო', 'premium', 'პრემიუმი'] },
  { id: 'offers', title: 'შეთავაზებები & განცხადებები', image: offers, size: 64, blend: 'multiply', keywords: ['offers', 'applications', 'შეთავაზება', 'განცხადება'] },
  { id: 'investments', title: 'ინვესტიციები', image: investments, size: 80, keywords: ['investments', 'invest', 'ინვესტიცია'] },
  { id: 'insurance', title: 'დაზღვევა', image: insurance, size: 80, offset: [0.17, -0.17], keywords: ['insurance'] },
  { id: 'gift-card', title: 'სასაჩუქრე ბარათი', image: giftCard, size: 80, route: '/gift-cards', keywords: ['gift card', 'gift', 'საჩუქარი', 'სასაჩუქრე'] },
  { id: 'car', title: 'მანქანა', image: car, size: 80, keywords: ['car', 'auto', 'ავტომობილი', 'ავტო'] },
  { id: 'travel-card', title: 'სამგზავრო ბარათი', image: travelCard, size: 64, blend: 'multiply', keywords: ['travel card', 'travel', 'მოგზაურობა'] },
  { id: 'automatic-payment', title: 'ავტომატური გადახდა', image: automaticPayment, size: 80, offset: [-0.17, 0.17], keywords: ['automatic payment', 'autopay'] },
]

// სწრაფი ბმულები პროდუქტების ზემოთ (Figma 3142:11150)
export const hubQuickLinks = [
  { id: 'exchange-rates', title: 'ვალუტის კურსი', image: exchangeRates, route: '/currency-rates', keywords: ['exchange rate', 'currency', 'კურსი', 'ვალუტა'] },
  { id: 'financial-manager', title: 'ფინანსური მენეჯერი', image: financialManager, keywords: ['financial manager', 'finance', 'budget', 'ბიუჯეტი', 'ხარჯები'] },
]

// „ხშირად მოძებნილი" (Figma 3091:150983)
export const frequentSearches = [
  { id: 'transfer-other', title: 'სხვასთან გადარიცხვა', icon: transferOtherIcon, keywords: ['transfer', 'გადარიცხვა'] },
  { id: 'payment', title: 'გადახდა', icon: utilityIcon, keywords: ['payment', 'pay', 'გადასახადი'] },
  { id: 'exchange-rates', title: 'ვალუტის კურსი', icon: exchangeRatesIcon, route: '/currency-rates', keywords: ['exchange rate', 'currency', 'კურსი'] },
  { id: 'loans', title: 'სესხები', icon: loanIcon, keywords: ['loans', 'loan'] },
]
