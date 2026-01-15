/***************************************
 * Dental GPSC Bot v7.1 (CORE STABLE)
 * Group + Private | Webhook | Render
 ***************************************/

const fs = require("fs");
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

/* ============ ENV ============ */
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.BOT_TOKEN;
const APP_URL = process.env.APP_URL;
const ADMIN_ID = Number(process.env.ADMIN_ID);
const GROUP_ID = Number(process.env.GROUP_ID);
const TIMEZONE = process.env.TZ || "Asia/Kolkata";

/* ============ SERVER ============ */
const app = express();
app.use(express.json());

/* ============ BOT ============ */
const bot = new TelegramBot(TOKEN, { webHook: true });
bot.setWebHook(`${APP_URL}/bot${TOKEN}`);

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get("/", (_, res) =>
  res.send("Dental GPSC Bot v7.1 CORE Running ✅")
);

app.listen(PORT);

/* ============ HELPERS ============ */
const nowIST = () =>
  new Date(new Date().toLocaleString("en-US", { timeZone: TIMEZONE }));

const today = () => nowIST().toISOString().slice(0, 10);

/* ============ DATABASE ============ */
const DB_FILE = "./data.json";

let DB = fs.existsSync(DB_FILE)
  ? JSON.parse(fs.readFileSync(DB_FILE))
  : {
      mcqs: [],
      used: {},
      readingSession: {},
      readingLog: {},
    };

const save = () =>
  fs.writeFileSync(DB_FILE, JSON.stringify(DB, null, 2));

/* ============ START ============ */
bot.onText(/^\/start$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🌺 Dr. Arzoo Fatema 🌺\nGPSC Dental Bot is LIVE ✅"
  );
});

/* ============ READING START ============ */
bot.onText(/^\/read$/, (msg) => {
  if (DB.readingSession[msg.from.id]) {
    return bot.sendMessage(
      msg.chat.id,
      "📖 Reading already running.\nUse /stop"
    );
  }

  DB.readingSession[msg.from.id] = {
    start: Date.now(),
    date: today(),
  };
  save();

  bot.sendMessage(
    msg.chat.id,
    "📖 Reading started\nTarget: 8 hours 💪"
  );
});

/* ============ READING STOP ============ */
bot.onText(/^\/stop$/, (msg) => {
  const s = DB.readingSession[msg.from.id];
  if (!s) {
    return bot.sendMessage(
      msg.chat.id,
      "⚠️ No active reading session"
    );
  }

  const mins = Math.floor((Date.now() - s.start) / 60000);
  DB.readingLog[s.date] = (DB.readingLog[s.date] || 0) + mins;
  delete DB.readingSession[msg.from.id];
  save();

  bot.sendMessage(
    msg.chat.id,
    `📖 Reading stopped\nToday: ${DB.readingLog[s.date]} min`
  );
});

/* ============ DAILY TEST (/dt) ============ */
bot.onText(/^\/dt$/, (msg) => {
  const pool = DB.mcqs;
  if (pool.length < 5) {
    return bot.sendMessage(
      msg.chat.id,
      "❌ Not enough MCQs.\nMinimum 5 required."
    );
  }

  const pick = pool.sort(() => Math.random() - 0.5).slice(0, 5);

  pick.forEach((q, i) => {
    bot.sendMessage(
      msg.chat.id,
      `Q${i + 1}. ${q.q}\nA) ${q.A}\nB) ${q.B}\nC) ${q.C}\nD) ${q.D}`
    );
  });
});

/* ============ ADD MCQ (ADMIN ONLY) ============ */
bot.onText(/^\/addmcq$/, (msg) => {
  if (msg.from.id !== ADMIN_ID) return;

  bot.sendMessage(
    msg.chat.id,
    "✍️ Reply to THIS message with MCQs\n\nFormat:\nQ1...\nA)...\nB)...\nC)...\nD)...\nAns: B\nExp: ..."
  );
});

bot.on("message", (msg) => {
  if (
    msg.from.id !== ADMIN_ID ||
    !msg.reply_to_message ||
    !msg.text
  )
    return;

  if (!msg.reply_to_message.text.includes("Reply to THIS message"))
    return;

  const blocks = msg.text.split(/\n(?=Q\d+)/i);
  let added = 0;

  blocks.forEach((b) => {
    const q = b.match(/Q\d+\.?\s*(.*)/i)?.[1];
    const A = b.match(/A\)\s*(.*)/i)?.[1];
    const B = b.match(/B\)\s*(.*)/i)?.[1];
    const C = b.match(/C\)\s*(.*)/i)?.[1];
    const D = b.match(/D\)\s*(.*)/i)?.[1];
    const ans = b.match(/Ans:\s*([ABCD])/i)?.[1];
    const exp = b.match(/Exp:\s*(.*)/i)?.[1] || "";

    if (q && A && B && C && D && ans) {
      DB.mcqs.push({ q, A, B, C, D, ans, exp });
      added++;
    }
  });

  save();
  bot.sendMessage(msg.chat.id, `✅ MCQs Added: ${added}`);
});
