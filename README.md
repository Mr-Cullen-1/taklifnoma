# 💌 Interaktiv Taklifnoma

Premium, interaktiv taklifnoma sayti — React + TailwindCSS + Framer Motion.
Telegram integratsiyasi Vercel serverless funksiyasi orqali xavfsiz ishlaydi.

---

## 1. Talablar

- Node.js 18+
- Vite (yoki Next.js) React loyihasi
- Tailwind CSS
- `framer-motion`

```bash
npm install framer-motion
```

Agar Tailwind hali o'rnatilmagan bo'lsa:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js` da `content` ga JSX fayllaringiz yo'lini qo'shing va
asosiy CSS faylingizga quyidagilarni kiriting:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 2. Lokalda ishga tushirish

`Invitation.jsx` ni ilovangizga import qiling:

```jsx
import Invitation from "./Invitation";

export default function App() {
  return <Invitation />;
}
```

Keyin:

```bash
npm run dev
```

Brauzerda `http://localhost:5173` (Vite) manzilini oching.

---

## 3. Vercel'ga deploy qilish

1. Loyihani GitHub'ga yuklang.
2. [vercel.com](https://vercel.com) → **New Project** → repozitoriyani tanlang.
3. `/api/send-telegram.js` fayli avtomatik serverless funksiya sifatida ishlaydi
   (Vite loyihasida `api/` papkasi ildizda turishi kerak).
4. **Deploy** tugmasini bosing.

> Eslatma: Sof Vite loyihasida serverless funksiyalar ishlashi uchun `api/`
> papkasi loyiha ildizida bo'lishi kerak. Next.js ishlatsangiz, faylni
> `pages/api/send-telegram.js` ichiga joylashtiring.

---

## 4. Environment Variables (muhit o'zgaruvchilari)

Vercel → **Project Settings → Environment Variables** bo'limiga qo'shing:

| Nomi                 | Qiymati                          |
| -------------------- | -------------------------------- |
| `TELEGRAM_BOT_TOKEN` | @BotFather bergan bot tokeni     |
| `TELEGRAM_CHAT_ID`   | Sizning Telegram chat ID raqamingiz |

**Bot token olish:** Telegramda [@BotFather](https://t.me/BotFather) → `/newbot`.

**Chat ID olish:** botingizga xabar yozing, so'ng oching:
`https://api.telegram.org/bot<TOKEN>/getUpdates` → `chat.id` ni ko'chiring.

O'zgaruvchilarni qo'shgandan keyin loyihani qayta deploy qiling (**Redeploy**).

---

## 5. Rasmni almashtirish

`Invitation.jsx` ichida:

```js
const PHOTO_SRC = "/us.png"; // Replace with our cartoon photo
```

Rasmni `public/` papkasiga `us.png` nomi bilan joylashtiring
(yoki yo'lni o'zingizniki bilan almashtiring).

---

## 6. Musiqani almashtirish

`Invitation.jsx` ichida:

```js
const MUSIC_SRC = "/music.mp3"; // Replace with your own music file
```

`music.mp3` faylini `public/` papkasiga joylang.
Musiqa faqat birinchi bosishdan (YES) keyin, 1 soniyalik fade-in bilan boshlanadi.

Sana va vaqtni ham shu yerda o'zgartirishingiz mumkin:

```js
const MEETING_DATE = "19.07.2026";
const MEETING_TIME = "19:00";
```

---

## 6.1. Uchrashuv variantlarini sozlash

Screen 2 (`Invitation.jsx`) boshida bir nechta massivlarni o'zgartirib,
tanlovlarni moslashtirishingiz mumkin:

```js
// Park & Ramen uchun taklif qilinadigan soatlar
const TIME_SLOTS = ["17:00", "18:00", "19:00", "20:00"];

// "Parkda sayr qilish" tanlanganda chiqadigan park variantlari
const PARK_PLACES = [
  "Central Park",
  "Yapon park",
  "Avstronavtlar parki",
  "Boshqa sen xohlagan",
];
```

**Kino** kartasidagi film nomini o'zgartirish uchun `ACTIVITIES` massividagi
`kino` obyektining `movie` maydonini tahrirlang:

```js
{
  id: "kino",
  // ...
  movie: "Cartoon: Minions va Monster", // Nima ko'ramiz
},
```

- **Park** tanlansa → park va soat so'raladi.
- **Ramen** tanlansa → faqat soat so'raladi.
- **Kino** tanlansa → film ko'rsatiladi, vaqt va lokatsiya Telegram orqali
  yuboriladi (ekranda alohida so'ralmaydi).

Barcha tanlovlar (joy / soat / film) Telegram xabariga ham qo'shiladi.

---

## 7. Publish

Barcha o'zgarishlarni GitHub'ga push qiling — Vercel avtomatik qayta deploy qiladi.
Tayyor! 🎉

---

## Fayllar tuzilishi

```
/Invitation.jsx          → butun sayt (3 ekran)
/api/send-telegram.js    → xavfsiz Telegram xabar yuboruvchi
/README.md               → ushbu yo'riqnoma
/public/us.png           → rasm (siz qo'shasiz)
/public/music.mp3        → musiqa (siz qo'shasiz)
```

Barcha maxfiy ma'lumotlar faqat serverda saqlanadi — frontend hech qachon
bot tokenini ko'rmaydi.
