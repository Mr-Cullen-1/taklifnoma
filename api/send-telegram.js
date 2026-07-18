/* ============================================================
   /api/send-telegram.js   (Vercel Serverless Function)
   ------------------------------------------------------------
   Secrets are read from environment variables ONLY.
   Never expose these in the frontend.

     TELEGRAM_BOT_TOKEN   ->  your bot token from @BotFather
     TELEGRAM_CHAT_ID     ->  your personal / chat id

   If sending fails, we swallow the error and still return 200
   so the frontend can always continue to the success screen.
   ============================================================ */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  try {
    const {
      selectedActivity = "-",
      attemptsToPressNo = 0,
      userAgent = "-",
      language = "-",
      screenWidth = 0,
      screenHeight = 0,
      timestamp = new Date().toLocaleString(),
    } = req.body || {};

    const text =
      `❤️ Yangi uchrashuv!\n\n` +
      `👧 U rozi bo'ldi 🤗\n\n` +
      `📍 Tanlangan joy:\n${selectedActivity}\n\n` +
      `📅 19.07.2026\n` +
      `🕖 19:00\n\n` +
      `😂 "Yo'q" tugmasini bosishga urinishlar:\n${attemptsToPressNo}\n\n` +
      `📱 Qurilma:\n${userAgent}\n\n` +
      `🌐 Til:\n${language}\n\n` +
      `📐 Ekran:\n${screenWidth} × ${screenHeight}\n\n` +
      `⏰ Vaqt:\n${timestamp}`;

    // If secrets are missing, don't crash — just skip sending.
    if (BOT_TOKEN && CHAT_ID) {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    // Ignore the error, frontend continues regardless.
    return res.status(200).json({ ok: true });
  }
}
