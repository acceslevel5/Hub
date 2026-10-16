/*
 * Hub-ის ონბორდინგის კონფიგურაცია (docs/onboarding-spec.md).
 * ტექსტები აქ შეცვალე. ლინკის პარამეტრები:
 *   ?onboarding=on   — მთავარ გვერდზე ანიმაცია ეშვება (default: off)
 *   ?copy=a|b|c      — Tip-ის ქოფის ვარიანტი (default: a)
 * მაგ.: https://.../?onboarding=on&copy=b#/
 */
export const ONBOARDING_COPY = {
  a: {
    title: 'ჰაბი და ძიება ახალ ადგილას',
    text: 'ყველა პროდუქტის ნახვას და სასურველი სერვისის მოძიებას მარცხენა ზედა კუთხიდან ან ეკრანის მარჯვნივ გადასრიალებით შეძლებ.',
    cta: 'გასაგებია',
  },
  b: {
    title: 'ძიება და ჰაბი ერთ ადგილას',
    text: 'ნებისმიერი სერვისი თუ პროდუქტი ახლა ერთი შეხებით იძებნება.',
    cta: 'გასაგებია',
    // opensHub: true — CTA დახურვის შემდეგ Hub-ს გახსნიდა სვაიპის მინიშნების ნაცვლად (გამორთულია)
  },
  c: {
    title: 'ჰაბი ზემოთ ავიდა',
    text: 'ჰაბი და ძიება გავაერთიანეთ, რომ საჭირო რამე უფრო სწრაფად იპოვო.',
    cta: 'გასაგებია',
  },
}

export const ONBOARDING_EYEBROW = 'სიახლე'

// პარამეტრები იკითხება ერთხელ, აპის ჩატვირთვისას: როგორც ?...#/, ისე #/?... ფორმით
function readParams() {
  const params = new URLSearchParams(window.location.search)
  const hashQuery = window.location.hash.split('?')[1]
  if (hashQuery) new URLSearchParams(hashQuery).forEach((v, k) => params.has(k) || params.set(k, v))
  const copy = (params.get('copy') || 'a').toLowerCase()
  return {
    enabled: (params.get('onboarding') || '').toLowerCase() === 'on',
    copyKey: ONBOARDING_COPY[copy] ? copy : 'a',
  }
}

export const onboardingParams = readParams()
