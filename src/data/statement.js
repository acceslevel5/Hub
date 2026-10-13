// ამონაწერის ფეიკ მონაცემები (Figma 3091:150443)
import withdrawIcon from '../assets/icons/withdraw-24.svg'
import exchangeIcon from '../assets/icons/exchange-24.svg'
import groceryIcon from '../assets/icons/grocery-24.svg'
import foodIcon from '../assets/icons/food-24.svg'
import transferOwnIcon from '../assets/icons/transfer-own-24.svg'
import piggyBankIcon from '../assets/icons/piggy-bank-24.svg'
import otherIcon from '../assets/icons/other-24.svg'
import loanIcon from '../assets/icons/loan-24.svg'
import feeIcon from '../assets/icons/fee-24.svg'
import nikora from '../assets/images/avatar-nikora.jpg'
import mandaria from '../assets/images/avatar-mandaria.jpg'
import zarnadze from '../assets/images/avatar-zarnadze.png'
import teliani from '../assets/images/avatar-teliani.png'
import mobile from '../assets/images/avatar-mobile.png'
import pertia from '../assets/images/avatar-pertia.jpg'

export const statementPeriod = 'მაი, 2020  -  დეკ, 2020'

export const statementSummary = {
  expense: { label: 'გასავალი', amount: '13,527.55 ₾' },
  income: { label: 'შემოსავალი', amount: '13,101.00 ₾' },
}

/*
 * leading ტიპები:
 *  { icon }                                — 24px აიქონი მრგვალ outline-ში
 *  { image, crop?, framed?, badge? }       — ფოტო/ლოგო ავატარი; crop = Figma-ს ჭრა, badge = 'up' | 'down'
 *  { initials, badge? }                    — ინიციალებიანი ავატარი
 * tone: 'success' — მწვანე თანხა
 */
const PERSON_CROP = { width: '100%', height: '150%', left: 0, top: '-11.95%' }

export const statementGroups = [
  {
    date: '23 სექ, 2025',
    items: [
      { id: 'st1', icon: withdrawIcon, title: 'თანხის შემოტანა', subtitle: 'საკუთარ ანგარიშებზე გადარიცხვები', amount: '1272.00 ₾', tone: 'success' },
      { id: 'st2', icon: exchangeIcon, title: 'ავტომატური კონვერტაცია, კურ', subtitle: 'კონვერტაცია', amount: '5.99 $', tone: 'success' },
      {
        id: 'st3', image: nikora, framed: true, crop: { width: '122.22%', height: '122.22%', left: '-10.05%', top: '-3.35%' },
        title: 'ნიკორა', subtitle: 'სუპერმარკეტები', amount: '-125.00 ₾', caption: '+235 Plus ქულა',
      },
      { id: 'st4', icon: groceryIcon, title: 'გვირილა რითეილი', subtitle: 'სუპერმარკეტები', amount: '-47.92 ₾', caption: '+119 Plus ქულა' },
    ],
  },
  {
    date: '22 სექ, 2025',
    items: [
      { id: 'st5', initials: 'ქდ', badge: 'up', title: 'ქართველიშვილი დაჩი', subtitle: 'გადარიცხვები', amount: '-80.00 ₾' },
      { id: 'st6', icon: foodIcon, title: 'დეგუსტო', subtitle: 'სწრაფი კვება', amount: '-47.92 ₾', caption: '+119 Plus ქულა' },
      { id: 'st7', image: mandaria, framed: true, crop: PERSON_CROP, badge: 'down', title: 'მანდარია ნანა', subtitle: 'ჩარიცხვა', amount: '82.00 ₾', tone: 'success' },
      { id: 'st8', icon: transferOwnIcon, title: 'დავით აბულაძე', subtitle: 'საკუთარ ანგარიშებზე გადარიცხვები', amount: '500.00 ₾', tone: 'success' },
      { id: 'st9', image: zarnadze, framed: true, badge: 'up', title: 'თამარ ზარნაძე', subtitle: 'გადარიცხვები', amount: '-126.00 ₾' },
    ],
  },
  {
    date: '21 სექ, 2025',
    items: [
      { id: 'st10', icon: piggyBankIcon, title: 'ელექტრონულ ყულაბაზე დაგ', subtitle: 'საკუთარ ანგარიშებზე გადარიცხვები', amount: '1.00 ₾', tone: 'success' },
      { id: 'st11', icon: piggyBankIcon, title: 'ელექტრონულ ყულაბაზე დაგ', subtitle: 'საკუთარ ანგარიშებზე გადარიცხვები', amount: '-1.00 ₾' },
      { id: 'st12', image: teliani, title: 'გადახდა, 22/09/2025, შპს “თ', subtitle: 'დენი', amount: '-47.92 ₾', caption: '+119 Plus ქულა' },
      { id: 'st13', icon: transferOwnIcon, title: 'ელექტრონულ ყულაბაზე დაგ', subtitle: 'საკუთარ ანგარიშებზე გადარიცხვები', amount: '200.00 ₾', tone: 'success' },
      { id: 'st14', icon: transferOwnIcon, title: 'ელექტრონულ ყულაბაზე დაგ', subtitle: 'საკუთარ ანგარიშებზე გადარიცხვები', amount: '200.00 ₾' },
      { id: 'st15', icon: otherIcon, title: 'GOOGLE SERVICES> \\', subtitle: 'სატიდლები - სხვა', amount: '-55.21 ₾', caption: '+119 Plus ქულა' },
    ],
  },
  {
    date: '20 სექ, 2025',
    items: [
      { id: 'st16', icon: loanIcon, title: 'სესხის დაფარვა, სესხი N 102', subtitle: 'სესხის გადასახადები', amount: '-863.74 ₾' },
      { id: 'st17', image: mobile, title: 'გადახდა, 20/09/2025, შპს “თ', subtitle: 'მობილური', amount: '-20.00 ₾', caption: '+23.6 Plus ქულა' },
      { id: 'st18', icon: feeIcon, title: 'ბარათის დაცვის მომსახურება', subtitle: 'ბანკის საკომისიოები', amount: '-3.00 ₾' },
      { id: 'st19', image: pertia, framed: true, crop: PERSON_CROP, badge: 'down', title: 'გვანცა პერტია', subtitle: 'ჩარიცხვა', amount: '100.00 ₾', tone: 'success' },
      { id: 'st20', icon: exchangeIcon, title: 'ვალუტის გაცვლითი ოპერაცია', subtitle: 'კონვერტაცია', amount: '-113.00 €' },
      { id: 'st21', icon: exchangeIcon, title: 'ვალუტის გაცვლითი ოპერაცია', subtitle: 'კონვერტაცია', amount: '354.03 ₾', tone: 'success' },
    ],
  },
]
