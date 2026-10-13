// ფეიკ ტრანზაქციები. იყენებს მთავარი გვერდი (ბოლო ტრანზაქციები) და მოგვიანებით ამონაწერი.
import nikora from '../assets/images/merchant-nikora.png'
import spar from '../assets/images/merchant-spar.png'
import paymentIcon from '../assets/icons/payment-16.svg'

const merchants = {
  nikora: { title: 'ნიკორა, თბილისი, მაჭავარიანის ქუჩა', subtitle: 'სუპერმარკეტები', image: nikora, fit: 'cover' },
  spar: { title: 'სპარი, თბილისი, ვარკ 3, 4 მკრ, ', subtitle: 'სუპერმარკეტები', image: spar, fit: 'contain' },
  transfer: { title: 'გიორგი გიორგაძე', subtitle: 'ჩარიცხვა', icon: paymentIcon },
}

export const recentTransactions = [
  {
    date: 'აგვისტო 23, 2023',
    items: [
      { id: 't1', ...merchants.nikora, amount: '-1.45 ₾', caption: '+34 PLUS ქულა' },
      { id: 't2', ...merchants.transfer, amount: '-125.00 ₾', tone: 'success' },
      { id: 't3', ...merchants.spar, amount: '-1.45 ₾', caption: '+34 PLUS ქულა' },
    ],
  },
  {
    date: 'აგვისტო 23, 2023',
    items: [
      { id: 't4', ...merchants.transfer, amount: '-125.00 ₾', tone: 'success' },
      { id: 't5', ...merchants.nikora, amount: '-1.45 ₾', caption: '+34 PLUS ქულა' },
    ],
  },
]
