# BOG 2.0 — UX კვლევის პროტოტიპი

მობილური ბანკის აპის კლიკებადი პროტოტიპი Figma-ს დიზაინების მიხედვით („Bog-2.0"). React + Vite, სტატიკური, ბექენდის გარეშე. ყველა მონაცემი ფეიკია (`src/data/`).

## ლოკალურად გაშვება

```bash
npm install
npm run dev
```

`npm run dev` სერვერს `--host`-ით უშვებს. ტერმინალში გამოჩნდება `Network: http://192.168.x.x:5173/` მისამართი. ეს ლინკი იმავე Wi‑Fi ქსელში ჩართულ ტელეფონზე გახსენი.

## Deploy GitHub Pages-ზე

1. GitHub-ზე შექმენი რეპოზიტორია და ატვირთე კოდი `main` ბრენჩზე:
   ```bash
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. რეპოში გადადი: **Settings → Pages → Build and deployment → Source** და აირჩიე **GitHub Actions**.
3. ყოველი `push` `main`-ზე ავტომატურად გაუშვებს `.github/workflows/deploy.yml`-ს: ის ააწყობს აპს და გამოაქვეყნებს მას.
4. მისამართი იქნება `https://<user>.github.io/<repo>/` (ასევე ჩანს Actions-ის ლოგში და Settings → Pages-ში).

Vite-ის `base` არის `'./'` და ნავიგაცია hash-ზეა (`#/transactions`), ამიტომ რეპოს სახელის კონფიგურაციაში ჩაწერა საჭირო არ არის.

## ტელეფონზე აპივით გახსნა

- **iPhone (Safari):** Share → **Add to Home Screen**.
- **Android (Chrome):** ⋮ მენიუ → **Add to Home screen / Install app**.

ასე პროტოტიპი სრულ ეკრანზე, ბრაუზერის ზოლების გარეშე გაიხსნება.

## რისერჩერისთვის: Hub-ის ონბორდინგი (ლინკის პარამეტრით)

ონბორდინგი („Hub გადავიდა ზედა მარცხენა კუთხეში") სცენარის პასუხს ამხელს, ამიტომ ორ პირობას ცალ-ცალკე ლინკით ტესტავთ:

- **ონბორდინგის გარეშე** (default): `https://<user>.github.io/<repo>/#/`
- **ონბორდინგით**: `https://<user>.github.io/<repo>/?onboarding=on#/`

Tip-ის ტექსტის ვარიანტი `copy` პარამეტრით აირჩიეთ (default `a`):

- `?onboarding=on&copy=a#/`: „ჰაბი ახლა აქ არის"
- `?onboarding=on&copy=b#/`: „ძიება და ჰაბი ერთ ადგილას"
- `?onboarding=on&copy=c#/`: „ჰაბი ზემოთ ავიდა"

ტექსტები `src/config/onboarding.js`-ში იცვლება. დამალული reset ონბორდინგს თავიდან უშვებს, თუ ის ლინკით ჩართულია.

## რისერჩერისთვის: დამალული reset

ეკრანის **ზედა მარცხენა კუთხეზე ~2 წამით თითის დაჭერა** პროტოტიპს მთავარ გვერდზე აბრუნებს და ყველა მდგომარეობას ასუფთავებს (სქროლი, სერჩის ტექსტი, ნავიგაციის ისტორია). ეკრანზე ამის არანაირი კვალი არ ჩანს.

## სტრუქტურა

```
src/
  styles/tokens.css     დიზაინ ტოკენები (ფერები, spacing, radius, ტიპოგრაფია)
  styles/global.css     ფონტები, reset, მობილური ბრაუზერის წესები
  router/               hash stack-ნავიგატორი (iOS push/pop ანიმაცია) + დამალული reset
  components/           საერთო კომპონენტები (NavBar, Toolbar, Section, ListItem, Button)
  screens/              ეკრანები (HomeScreen, TransactionsScreen, ...)
  data/                 ფეიკ მონაცემები
  assets/               Figma-დან ლოკალურად ჩამოტვირთული აიქონები, სურათები, ილუსტრაციები
```

### ახალი ეკრანის დამატება

1. შექმენი `src/screens/MyScreen.jsx` (გამოიყენე `Screen` კომპონენტი ზედა/ქვედა ზოლებისთვის).
2. დაამატე route `src/App.jsx`-ში: `'/my-screen': MyScreen`.
3. გადასვლა: `const { navigate, back } = useNav()`, შემდეგ `navigate('/my-screen')`.
