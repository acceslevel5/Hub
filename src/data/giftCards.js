// სასაჩუქრე ბარათების გვერდის ფეიკ მონაცემები (Figma 3109:11388)
import catShopping from '../assets/gift/cat-shopping.png'
import catGlasses from '../assets/gift/cat-glasses.png'
import catMalls from '../assets/gift/cat-malls.png'
import catBeauty from '../assets/gift/cat-beauty.png'
import catTech from '../assets/gift/cat-tech.png'
import catOther from '../assets/gift/cat-other.png'
import promoGalleria from '../assets/gift/promo-galleria.gif'
import promoTbilisiMall from '../assets/gift/promo-tbilisi-mall.jpg'
import lutecia from '../assets/gift/store-lutecia.jpg'
import icr from '../assets/gift/store-icr.jpg'
import cityMall from '../assets/gift/store-city-mall.jpg'
import psp from '../assets/gift/store-psp.png'
import samRaan from '../assets/gift/store-sam-raan.jpg'
import zara from '../assets/gift/store-zara.png'
import domino from '../assets/gift/store-domino.png'
import iciParis from '../assets/gift/store-ici-paris.jpg'

export const giftCategories = [
  { id: 'shopping', title: 'შოპინგი', image: catShopping },
  { id: 'glasses', title: 'სათვალეები', image: catGlasses },
  { id: 'malls', title: 'მოლები', image: catMalls },
  { id: 'beauty', title: 'სილამაზე და ჯანმრთელობა', image: catBeauty },
  { id: 'tech', title: 'ტექნიკა', image: catTech },
  { id: 'other', title: 'სხვა', image: catOther },
]

// compact — Figma-ში მეორე ბარათს ქვედა ზოლი px16 py8 აქვს, პირველს pt8 pb4 px8
export const giftPromotions = [
  { id: 'galleria', title: 'Galleria Tbilisi', subtitle: 'სავაჭრო ცენტრი', image: promoGalleria, compact: true },
  { id: 'tbilisi-mall', title: 'Tbilisi Mall', subtitle: 'სავაჭრო ცენტრი', image: promoTbilisiMall },
]

/* მაღაზიები რიგებად (Figma-ში პირველ რიგს gap 12 აქვს, დანარჩენებს 10).
   crop — ლოგოს Figma-ს ჭრა 80×60 ჩარჩოში */
export const giftStoreRows = [
  {
    gap: 12,
    stores: [
      {
        id: 'lutecia', title: 'ლუტეცია, ტერენცი ბუტიკი', subtitle: 'Lutecia, Tizian terezi', logo: lutecia,
        crop: { width: '177.5%', height: '236.67%', left: '-38.75%', top: '-68.33%' },
      },
      { id: 'icr', title: 'აი სი არ ტრეიდი', subtitle: 'აუთლეტი, ბამბინო, ბატა, ეკო, კორსო იტ', logo: icr },
    ],
  },
  {
    gap: 10,
    stores: [
      { id: 'city-mall', title: 'სითი მოლი', subtitle: 'სითი მოლი', logo: cityMall },
      { id: 'psp', title: 'პსპ', subtitle: 'პსპ', logo: psp },
    ],
  },
  {
    gap: 10,
    stores: [
      { id: 'sam-raan', title: 'სამ რაან სპა', subtitle: 'სამ რაან სპა', logo: samRaan },
      { id: 'zara', title: 'ზარა', subtitle: 'CENOMI, ZARA, რითეილ გრუპ ჯორჯი', logo: zara },
    ],
  },
  {
    gap: 10,
    stores: [
      { id: 'domino', title: 'დომინო', subtitle: 'domino.com.ge, დომი', logo: domino },
      { id: 'ici-paris', title: 'ისი პარი', subtitle: 'ICI Paris', logo: iciParis },
    ],
  },
]
