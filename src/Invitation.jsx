import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   CUSTOMIZE HERE
   ------------------------------------------------------------
   PHOTO   -> PHOTO_SRC        (Replace with your cartoon photo)
   MUSIC   -> MUSIC_SRC        (Replace with your own music file)
   DATE    -> MEETING_DATE
   TIME    -> MEETING_TIME
   TELEGRAM BOT TOKEN -> set in /api/send-telegram.js env var TELEGRAM_BOT_TOKEN
   TELEGRAM CHAT ID   -> set in /api/send-telegram.js env var TELEGRAM_CHAT_ID
   ============================================================ */

// Replace with our cartoon photo
const PHOTO_SRC = "/us.png";
// Replace with your own music file
const MUSIC_SRC = "/music.mp3";
const MEETING_DATE = "19.07.2026";
const MEETING_TIME = "19:00";

/* ---------- Design tokens ---------- */
const COLORS = {
  bg: "#FFF8F6",
  card: "#FFFFFF",
  accent: "#FF6B81",
  text: "#222222",
};

/* ---------- Confetti ---------- */
function Confetti({ fire, count = 90, spread = 1 }) {
  const pieces = useMemo(() => {
    const palette = ["#FF6B81", "#FFB199", "#FFD166", "#8ECae6", "#B5E48C", "#FFAFCC"];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 100 * spread,
      y: -(40 + Math.random() * 60),
      rot: Math.random() * 360,
      color: palette[i % palette.length],
      size: 6 + Math.random() * 8,
      delay: Math.random() * 0.15,
      round: Math.random() > 0.5,
    }));
  }, [count, spread, fire]);

  if (!fire) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={`${fire}-${p.id}`}
          initial={{ x: "50%", y: "45%", opacity: 1, rotate: 0 }}
          animate={{
            x: `calc(50% + ${p.x}vw)`,
            y: `calc(45% + ${p.y + 130}vh)`,
            opacity: 0,
            rotate: p.rot,
          }}
          transition={{ duration: 2.4 + Math.random(), delay: p.delay, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.round ? "50%" : 3,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Floating abstract decorations ---------- */
function FloatingDecor() {
  const blobs = useMemo(
    () => [
      { size: 260, top: "-6%", left: "-8%", color: "#FFD9DE", d: 9 },
      { size: 200, top: "60%", left: "82%", color: "#FFE7D6", d: 11 },
      { size: 150, top: "78%", left: "-4%", color: "#E6F0FF", d: 8 },
      { size: 120, top: "8%", left: "88%", color: "#FFF0C2", d: 10 },
    ],
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: b.color,
            opacity: 0.55,
          }}
          animate={{ y: [0, -26, 0], x: [0, 14, 0] }}
          transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ---------- Music button ---------- */
function MusicButton({ playing, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      aria-label="Musiqa"
      className="fixed right-5 top-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-xl shadow-lg backdrop-blur-md"
      style={{ border: "1px solid rgba(255,107,129,0.25)" }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.06 }}
    >
      <motion.span
        animate={playing ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={{ duration: 1.4, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
      >
        {playing ? "🔊" : "🔇"}
      </motion.span>
    </motion.button>
  );
}

/* ============================================================
   SCREEN 1 — Invitation
   ============================================================ */
const NO_TEXTS = [
  "Yo'q 😅",
  "Rostdanmi?",
  "Ishonching komilmi?",
  "Hazillashyapsanmi?",
  "Yana o'ylab ko'r 😄",
  "Boshqa variant yo'q 😂",
];

function ScreenOne({ onYes, attempts, setAttempts }) {
  const areaRef = useRef(null);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noText, setNoText] = useState("Yo'q, vaqtim yo'q");

  const dodge = useCallback(() => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const btnW = 190;
    const btnH = 56;
    const maxX = Math.max(0, rect.width - btnW);
    const maxY = Math.max(0, rect.height - btnH);
    const nx = (Math.random() - 0.5) * maxX;
    const ny = (Math.random() - 0.5) * maxY;
    setNoPos({ x: nx, y: ny });
    setNoText(NO_TEXTS[Math.floor(Math.random() * NO_TEXTS.length)]);
    setAttempts((a) => a + 1);
  }, [setAttempts]);

  return (
    <motion.div
      key="screen1"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 90, damping: 18 }}
      className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
        className="relative mb-8"
      >
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ background: "rgba(255,107,129,0.4)" }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="relative h-44 w-44 overflow-hidden rounded-full sm:h-52 sm:w-52"
          style={{ border: "5px solid #fff", boxShadow: "0 20px 50px rgba(255,107,129,0.35)" }}
        >
          {/* Replace with our cartoon photo */}
          <img src={PHOTO_SRC} alt="Biz" className="h-full w-full object-cover" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mb-3 text-center text-3xl font-bold sm:text-4xl"
        style={{ color: COLORS.text }}
      >
        Hayotim ❤️
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mb-10 max-w-md text-center text-lg leading-relaxed text-neutral-600"
      >
        Seni uchrashuvga taklif qilsam,<br />rozi bo'lasanmi?
      </motion.p>

      <div
        ref={areaRef}
        className="relative flex w-full max-w-md flex-col items-center justify-center gap-4 sm:flex-row"
        style={{ minHeight: 180 }}
      >
        <motion.button
          onClick={onYes}
          className="z-10 w-full rounded-3xl px-8 py-4 text-lg font-semibold text-white shadow-lg sm:w-auto"
          style={{ background: COLORS.accent, boxShadow: "0 14px 34px rgba(255,107,129,0.45)" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        >
          Ha, albatta ❤️🤗
        </motion.button>

        <motion.button
          onMouseEnter={dodge}
          onTouchStart={(e) => {
            e.preventDefault();
            dodge();
          }}
          onClick={dodge}
          animate={{ x: noPos.x, y: noPos.y }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          className="w-full rounded-3xl bg-white px-8 py-4 text-lg font-medium text-neutral-500 shadow-md sm:w-auto"
          style={{ border: "1px solid #eee" }}
        >
          {noText}
        </motion.button>
      </div>

      <AnimatePresence>
        {attempts > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-sm text-neutral-400"
          >
            Urinishlar: {attempts} 😄
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================================================
   SCREEN 2 — Choose activity
   ============================================================ */
// Time slots offered for park & ramen (customize freely)
const TIME_SLOTS = ["17:00", "18:00", "19:00", "20:00"];

// Park location options
const PARK_PLACES = [
  "Central Park",
  "Yapon park",
  "Avstronavtlar parki",
  "Boshqa sen xohlagan",
];

const ACTIVITIES = [
  {
    id: "park",
    emoji: "🌳",
    title: "Parkda sayr qilish",
    caption: "Toza havo yaxshi bo'ladi 😊",
    recommended: false,
    needsPlace: true, // ask which park
    needsTime: true, // ask what time
  },
  {
    id: "ramen",
    emoji: "🍜",
    title: "The Mart — Ramen yeyish",
    caption: "Mazali ramen yeymiz 🍜",
    recommended: false,
    needsTime: true, // ask what time
  },
  {
    id: "kino",
    emoji: "🎬",
    title: "Kino",
    caption: "Bugungi ob-havoda kino juda yaxshi variant 😄",
    recommended: true,
    movie: "Cartoon: Minions va Monster", // Nima ko'ramiz
  },
];

function ActivityCard({ item, onSelect, index }) {
  const rec = item.recommended;
  return (
    <motion.button
      onClick={() => onSelect(item)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.12, type: "spring", stiffness: 90, damping: 16 }}
      whileHover={{ scale: rec ? 1.05 : 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex w-full flex-col items-center rounded-3xl bg-white text-center"
      style={{
        padding: rec ? "36px 24px" : "28px 24px",
        boxShadow: rec
          ? "0 22px 50px rgba(255,107,129,0.32)"
          : "0 12px 30px rgba(0,0,0,0.06)",
        border: rec ? "2px solid rgba(255,107,129,0.55)" : "1px solid #f1f1f1",
      }}
    >
      {rec && (
        <>
          <motion.div
            className="absolute -inset-[2px] rounded-3xl"
            style={{ border: "2px solid rgba(255,107,129,0.5)" }}
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.015, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute -top-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow"
            style={{ background: COLORS.accent }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ⭐ Tavsiya etiladi
          </motion.span>
        </>
      )}
      <motion.span
        className="mb-3 block"
        style={{ fontSize: rec ? 52 : 42 }}
        animate={rec ? { y: [0, -8, 0] } : {}}
        transition={rec ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {item.emoji}
      </motion.span>
      <h3 className="mb-1 text-lg font-bold" style={{ color: COLORS.text }}>
        {item.title}
      </h3>
      <p className="text-sm text-neutral-500">{item.caption}</p>
    </motion.button>
  );
}

/* ---------- Pill selector ---------- */
function PillGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {options.map((opt, i) => {
        const active = value === opt;
        return (
          <motion.button
            key={opt}
            onClick={() => onChange(opt)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors"
            style={{
              background: active ? COLORS.accent : "#fff",
              color: active ? "#fff" : "#555",
              border: active ? "1px solid transparent" : "1px solid #eee",
              boxShadow: active
                ? "0 10px 24px rgba(255,107,129,0.35)"
                : "0 6px 16px rgba(0,0,0,0.05)",
            }}
          >
            {opt}
          </motion.button>
        );
      })}
    </div>
  );
}

/* ---------- Details step: choose park &/or time ---------- */
function ActivityDetails({ item, onConfirm, onBack }) {
  const [place, setPlace] = useState(item.needsPlace ? "" : null);
  const [time, setTime] = useState(item.needsTime ? "" : null);

  const ready =
    (!item.needsPlace || place) && (!item.needsTime || time);

  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 12 }}
        className="mb-4 text-5xl"
      >
        {item.emoji}
      </motion.span>
      <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl" style={{ color: COLORS.text }}>
        {item.title}
      </h2>

      <div
        className="w-full max-w-md rounded-3xl bg-white p-6"
        style={{ boxShadow: "0 14px 34px rgba(0,0,0,0.06)" }}
      >
        {item.needsPlace && (
          <div className="mb-6">
            <p className="mb-3 text-center text-sm font-medium text-neutral-500">
              Qaysi parkga boramiz? 🌳
            </p>
            <PillGroup options={PARK_PLACES} value={place} onChange={setPlace} />
          </div>
        )}

        {item.needsTime && (
          <div>
            <p className="mb-3 text-center text-sm font-medium text-neutral-500">
              Soat nechada? 🕖
            </p>
            <PillGroup options={TIME_SLOTS} value={time} onChange={setTime} />
          </div>
        )}
      </div>

      <div className="mt-8 flex w-full max-w-md items-center gap-3">
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.96 }}
          className="rounded-3xl bg-white px-6 py-3.5 font-medium text-neutral-500 shadow-md"
          style={{ border: "1px solid #eee" }}
        >
          ← Orqaga
        </motion.button>
        <motion.button
          onClick={() => ready && onConfirm({ place, time })}
          disabled={!ready}
          whileHover={ready ? { scale: 1.04 } : {}}
          whileTap={ready ? { scale: 0.96 } : {}}
          className="flex-1 rounded-3xl px-8 py-3.5 text-lg font-semibold text-white shadow-lg"
          style={{
            background: ready ? COLORS.accent : "#f0c4cc",
            boxShadow: ready ? "0 14px 34px rgba(255,107,129,0.45)" : "none",
            cursor: ready ? "pointer" : "not-allowed",
          }}
        >
          Davom etamiz ❤️
        </motion.button>
      </div>
    </motion.div>
  );
}

function ScreenTwo({ onSelect }) {
  return (
    <motion.div
      key="screen2"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, -8, 8, 0] }}
        transition={{ type: "spring", stiffness: 140, damping: 12 }}
        className="mb-4 text-6xl"
      >
        🤗
      </motion.span>
      <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl" style={{ color: COLORS.text }}>
        Yo'q demasligingni bilardim
      </h2>
      <p className="mb-10 text-center text-lg text-neutral-500">Endi qayerga boramiz?</p>

      <div className="grid w-full max-w-md gap-5">
        {ACTIVITIES.map((a, i) => (
          <ActivityCard key={a.id} item={a} onSelect={onSelect} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- Loading ---------- */
function Loading() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6"
    >
      <div className="relative h-16 w-16">
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ border: "4px solid rgba(255,107,129,0.2)", borderTopColor: COLORS.accent }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.p
        className="mt-6 text-center text-lg font-medium text-neutral-600"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        Eng yaxshi uchrashuv tayyorlanmoqda...
      </motion.p>
    </motion.div>
  );
}

/* ============================================================
   SCREEN 3 — Confirmation
   ============================================================ */
const FINAL_MESSAGES = [
  "Men ham sabrsizlik bilan kutyapman 🤗",
  "Bu yaxshi kun bo'ladi 😊",
  "Ko'rishguncha ❤️",
];

function ScreenThree({ activity, onCelebrate }) {
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState("");

  const handleClick = () => {
    if (done) return;
    setMsg(FINAL_MESSAGES[Math.floor(Math.random() * FINAL_MESSAGES.length)]);
    setDone(true);
    onCelebrate();
  };

  return (
    <motion.div
      key="screen3"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 18 }}
      className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 12 }}
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full"
        style={{ background: "#E6F8EC", boxShadow: "0 14px 34px rgba(52,199,89,0.25)" }}
      >
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <motion.path
            d="M14 27 L23 36 L39 18"
            stroke="#34C759"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      <h2 className="mb-5 text-center text-3xl font-bold" style={{ color: COLORS.text }}>
        Kelishdik 🤗
      </h2>

      <div
        className="mb-8 w-full max-w-sm rounded-3xl bg-white p-6 text-center"
        style={{ boxShadow: "0 14px 34px rgba(0,0,0,0.06)" }}
      >
        <p className="text-lg leading-relaxed text-neutral-700">
          Sen bilan <span className="font-semibold" style={{ color: COLORS.accent }}>{activity?.title}</span>
        </p>
        {activity?.movie && (
          <p className="mt-2 text-neutral-600">🍿 Nima ko'ramiz: {activity.movie}</p>
        )}
        {activity?.place && (
          <p className="mt-1 text-neutral-600">📍 {activity.place}</p>
        )}
        <div className="my-4 h-px w-full bg-neutral-100" />
        <p className="text-neutral-600">📅 {MEETING_DATE}</p>
        {activity?.id === "kino" ? (
          <p className="text-neutral-600">
            🕖 Vaqt va lokatsiyani Telegram orqali yuboraman 😊
          </p>
        ) : (
          <>
            <p className="text-neutral-600">
              🕖 {activity?.time || MEETING_TIME} da ko'rishamiz.
            </p>
            <p className="mt-3 text-sm text-neutral-500">Telegram orqali lokatsiyani yuboraman 😊</p>
          </>
        )}
      </div>

      <motion.button
        onClick={handleClick}
        whileHover={{ scale: done ? 1 : 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="rounded-3xl px-10 py-4 text-lg font-semibold text-white shadow-lg"
        style={{
          background: done ? "#34C759" : COLORS.accent,
          boxShadow: done
            ? "0 14px 34px rgba(52,199,89,0.4)"
            : "0 14px 34px rgba(255,107,129,0.45)",
        }}
      >
        {done ? "✅ Seni kutaman" : "💌 Ko'rishguncha ❤️"}
      </motion.button>

      <AnimatePresence>
        {msg && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center text-lg font-medium"
            style={{ color: COLORS.accent }}
          >
            {msg}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function Invitation() {
  const [step, setStep] = useState("one"); // one | two | details | loading | three
  const [attempts, setAttempts] = useState(0);
  const [activity, setActivity] = useState(null);
  const [pending, setPending] = useState(null); // activity awaiting place/time choice
  const [confetti, setConfetti] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  /* --- Music with 1s fade in --- */
  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setMusicPlaying(true);
        clearInterval(fadeRef.current);
        const target = 0.6;
        const steps = 20;
        let i = 0;
        fadeRef.current = setInterval(() => {
          i += 1;
          audio.volume = Math.min(target, (target * i) / steps);
          if (i >= steps) clearInterval(fadeRef.current);
        }, 50);
      })
      .catch(() => {});
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      startMusic();
    }
  }, [musicPlaying, startMusic]);

  useEffect(() => () => clearInterval(fadeRef.current), []);

  /* --- Autoplay music --- 
     Browsers block audio with sound until the user interacts.
     1) Try to autoplay immediately when the site opens.
     2) If blocked, start on the very FIRST interaction anywhere
        (click / tap / key / scroll) — feels almost automatic. */
  useEffect(() => {
    // Attempt immediate autoplay on load.
    startMusic();

    let started = false;
    const kick = () => {
      if (started) return;
      started = true;
      startMusic();
      remove();
    };
    const remove = () => {
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("touchstart", kick);
      window.removeEventListener("keydown", kick);
      window.removeEventListener("scroll", kick);
    };
    window.addEventListener("pointerdown", kick, { once: false });
    window.addEventListener("touchstart", kick, { once: false });
    window.addEventListener("keydown", kick, { once: false });
    window.addEventListener("scroll", kick, { passive: true });
    return remove;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* --- Telegram report (fire once, on YES) --- */
  const sendTelegram = useCallback((selectedActivity) => {
    try {
      fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedActivity,
          attemptsToPressNo: attempts,
          userAgent: navigator.userAgent,
          language: navigator.language,
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
          timestamp: new Date().toLocaleString(),
        }),
      }).catch(() => {});
    } catch (_) {
      /* ignore — always continue */
    }
  }, [attempts]);

  const handleYes = () => {
    startMusic();
    setConfetti((c) => c + 1);
    setStep("two");
  };

  const proceedToLoading = (finalActivity) => {
    setActivity(finalActivity);
    sendTelegram(finalActivity.fullTitle);
    setStep("loading");
    const delay = 2000 + Math.random() * 1000; // 2–3s
    setTimeout(() => setStep("three"), delay);
  };

  const handleSelect = (item) => {
    // Park & ramen need extra choices; go to the details step first.
    if (item.needsPlace || item.needsTime) {
      setPending(item);
      setStep("details");
      return;
    }
    // Kino — straight through.
    proceedToLoading({
      ...item,
      fullTitle: item.movie ? `${item.title} — ${item.movie}` : item.title,
    });
  };

  const handleConfirmDetails = ({ place, time }) => {
    const parts = [pending.title];
    if (place) parts.push(place);
    if (time) parts.push(`soat ${time}`);
    proceedToLoading({
      ...pending,
      place,
      time,
      fullTitle: parts.join(" — "),
    });
  };

  return (
    <div
      className="relative min-h-[100dvh] w-full overflow-hidden font-sans"
      style={{ background: COLORS.bg, color: COLORS.text }}
    >
      <FloatingDecor />
      <MusicButton playing={musicPlaying} onToggle={toggleMusic} />
      <Confetti fire={confetti} />

      {/* Music keeps playing across all screens. Replace with your own music file */}
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {step === "one" && (
            <ScreenOne
              key="one"
              onYes={handleYes}
              attempts={attempts}
              setAttempts={setAttempts}
            />
          )}
          {step === "two" && <ScreenTwo key="two" onSelect={handleSelect} />}
          {step === "details" && (
            <ActivityDetails
              key="details"
              item={pending}
              onConfirm={handleConfirmDetails}
              onBack={() => setStep("two")}
            />
          )}
          {step === "loading" && <Loading key="loading" />}
          {step === "three" && (
            <ScreenThree
              key="three"
              activity={activity}
              onCelebrate={() => setConfetti((c) => c + 1)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
