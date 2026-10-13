// ვალუტის კურსების ფეიკ მონაცემები (Figma 3196:207443 კალკულატორი, 3196:207461 კურსები)
import flagUsd from '../assets/fx/flag-usd.svg'
import flagEur from '../assets/fx/flag-eur.svg'
import flagGbp from '../assets/fx/flag-gbp.svg'
import flagUah from '../assets/fx/flag-uah.svg'
import flagTry from '../assets/fx/flag-try.svg'
import flagCad from '../assets/fx/flag-cad.svg'
import flagGel16 from '../assets/fx/flag-gel-16.svg'

// კალკულატორი: მობილბანკის კურსი (ძველი გადახაზული → ახალი)
export const calculator = {
  rateLabel: 'მობილბანკის კურსი',
  oldRate: '2.45',
  rate: 2.55,
  currencies: {
    GEL: { code: 'GEL', flag: flagGel16 },
    USD: { code: 'USD', flag: flagUsd },
  },
}

// \u200B: სლეშის შემდეგ ხაზის გადატანის საშუალება (Figma-ში USD/EUR/ | GEL)
export const ratesPromo = 'საუკეთესო კურსი შენთვის USD/EUR/\u200BGEL კონვერტაციაზე'

/*
 * style: 'new' — USD/EUR ბარათები (Figma-ში ახალი სტილი), 'old' — დანარჩენები (ძველი სტილი, Regular შრიფტით)
 * trend: 'up' (ახალი სტილის წითელი ისარი) | 'up-negative' | 'down-positive'
 * rows[0] გამოკვეთილია (ნარინჯისფერი ფონი)
 */
export const currencyRates = [
  {
    code: 'USD', amount: '1 USD', name: 'ამერიკული დოლარი', flag: flagUsd, favorite: true, style: 'new',
    keywords: ['dollar', 'დოლარი', 'აშშ'],
    rows: [['უკეთესი კურსი შენთვის', '2.6400', '2.7000'], ['სტანდარტული კურსი', '2.6200', '2.7200']],
    official: '2.6769', trend: 'up',
  },
  {
    code: 'EUR', amount: '1 EUR', name: 'ევრო', flag: flagEur, favorite: true, style: 'new',
    keywords: ['euro', 'ევრო'],
    rows: [['უკეთესი კურსი შენთვის', '2.8650', '2.9390'], ['სტანდარტული კურსი', '2.8360', '2.9680']],
    official: '2.9168', trend: 'up',
  },
  {
    code: 'GBP', amount: '1 GBP', name: 'ბრიტანული გირვანქა სტერლინგი', flag: flagGbp, badge: 'Exclusive', style: 'old',
    keywords: ['pound', 'sterling', 'გირვანქა'],
    rows: [['მობილბანკში', '3.3570', '3.4470'], ['სტანდარტული', '3.3210', '3.4790']],
    official: '3.4104', trend: 'up-negative',
  },
  {
    code: 'UAH', amount: '10 UAH', name: 'უკრაინული გრინვა', flag: flagUah, style: 'old',
    keywords: ['hryvnia', 'გრივნა'],
    rows: [['მობილბანკში', '0.3450', '1.0660'], ['სტანდარტული', '0.2780', '1.2860']],
    official: '0.7126', trend: 'down-positive',
  },
  {
    code: 'TRY', amount: '1 TRY', name: 'თურქული ლირა', flag: flagTry, style: 'old',
    keywords: ['lira', 'ლირა'],
    rows: [['მობილბანკში', '0.0849', '0.0912'], ['ფილიალში', '0.0762', '0.0947']],
    official: '0.0884', trend: 'down-positive',
  },
  {
    code: 'CAD', amount: '1 CAD', name: 'კანადური დოლარი', flag: flagCad, style: 'old',
    keywords: ['canadian dollar', 'კანადა'],
    rows: [['მობილბანკში', '1.9240', '2.0480'], ['ფილიალში', '1.8690', '2.0610']],
    official: '1.9822', trend: 'up-negative',
  },
]
