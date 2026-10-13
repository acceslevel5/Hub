/*
 * ძიება ქართულ და ლათინურ ასოებზე, case-insensitive, ნაწილობრივი დამთხვევით.
 * ორივე მხარე (ტექსტი და მოთხოვნა) „ჩონჩხად" (skeleton) გარდაიქმნება, სადაც ერთნაირად
 * ჟღერადი ასოები ერთდება: მაგ. „sesxi", „seskhi", „სესხ" — ყველა ემთხვევა „სესხი"-ს.
 */
const KA_TO_SKELETON = {
  ა: 'a', ბ: 'b', გ: 'g', დ: 'd', ე: 'e', ვ: 'v', ზ: 'z', თ: 't', ი: 'i', კ: 'k', ლ: 'l',
  მ: 'm', ნ: 'n', ო: 'o', პ: 'p', ჟ: 'j', რ: 'r', ს: 's', ტ: 't', უ: 'u', ფ: 'p', ქ: 'k',
  ღ: 'g', ყ: 'k', შ: 's', ჩ: 'c', ც: 'c', ძ: 'z', წ: 'c', ჭ: 'c', ხ: 'x', ჯ: 'j', ჰ: 'h',
}

// ლათინური ტრანსლიტერაციის ვარიანტები → იგივე ჩონჩხი
const LATIN_DIGRAPHS = [
  ['tch', 'c'], ['sh', 's'], ['ch', 'c'], ['ts', 'c'], ['tz', 'c'], ['dz', 'z'],
  ['zh', 'j'], ['kh', 'x'], ['gh', 'g'], ['ph', 'p'],
]
const LATIN_SINGLE = { q: 'k', y: 'k', w: 'c', f: 'p' }

export function skeleton(text) {
  let s = text.toLowerCase().replace(/['’`]/g, '')
  s = Array.from(s, (ch) => KA_TO_SKELETON[ch] ?? ch).join('')
  for (const [from, to] of LATIN_DIGRAPHS) s = s.split(from).join(to)
  s = Array.from(s, (ch) => LATIN_SINGLE[ch] ?? ch).join('')
  return s.replace(/\s+/g, ' ').trim()
}

/* item: { title, keywords?: string[] } */
export function matches(item, query) {
  const q = query.trim().toLowerCase()
  if (!q) return false
  const fields = [item.title, ...(item.keywords || [])]
  if (fields.some((f) => f.toLowerCase().includes(q))) return true
  const sq = skeleton(q)
  return sq.length > 0 && fields.some((f) => skeleton(f).includes(sq))
}

export function search(items, query) {
  return items.filter((item) => matches(item, query))
}
