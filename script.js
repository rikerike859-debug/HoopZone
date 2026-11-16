// ---------- Find the parts of the page ----------
const titleScreen = document.getElementById("titleScreen");
const gameScreen = document.getElementById("gameScreen");
const pickScreen = document.getElementById("pickScreen");
const achScreen = document.getElementById("achScreen");
const settingsScreen = document.getElementById("settingsScreen");
const coachScreen = document.getElementById("coachScreen");
const seasonScreen = document.getElementById("seasonScreen");
const contestScreen = document.getElementById("contestScreen");
const allScreens = [titleScreen, pickScreen, gameScreen, achScreen, settingsScreen, coachScreen, seasonScreen, contestScreen];

const startButton = document.getElementById("startButton");
const tournamentButton = document.getElementById("tournamentButton");
const seasonButton = document.getElementById("seasonButton");
const twoPlayerButton = document.getElementById("twoPlayerButton");
const achButton = document.getElementById("achButton");
const settingsButton = document.getElementById("settingsButton");
const recordsBox = document.getElementById("recordsBox");
const gameModeBox = document.getElementById("gameModePick");
const rivalLogo = document.getElementById("rivalLogo");
const quitButton = document.getElementById("quitButton");
const pickBack = document.getElementById("pickBack");
const installButton = document.getElementById("installButton");
const teamFilter = document.getElementById("teamFilter");
const draftButton = document.getElementById("draftButton");

const buttonsBox = document.getElementById("buttons");
const driveButton = document.getElementById("drive");
const midButton = document.getElementById("mid");
const threeButton = document.getElementById("three");
const passButton = document.getElementById("pass");
const playAgainButton = document.getElementById("playAgain");
const nextGameButton = document.getElementById("nextGameButton");
const menuButton = document.getElementById("menuButton");
const boxScoreBox = document.getElementById("boxScore");

const playBar = document.getElementById("playBar");
const playDesc = document.getElementById("playDesc");

const defenseBox = document.getElementById("defenseBox");
const defenseTitle = document.getElementById("defenseTitle");
const guardThreeButton = document.getElementById("guardThree");
const protectRimButton = document.getElementById("protectRim");
const doubleTeamButton = document.getElementById("doubleTeam");
const doubleTargetText = document.getElementById("doubleTarget");
const stealButton = document.getElementById("stealAttempt");
const foulButton = document.getElementById("foulButton");
const stealOddsText = document.getElementById("stealOdds");
const foulsLeftText = document.getElementById("foulsLeft");

const p2Box = document.getElementById("p2Box");
const p2Shooters = document.getElementById("p2Shooters");
const p2Shots = document.getElementById("p2Shots");

const messageText = document.getElementById("message");
const commentary = document.getElementById("commentary");
const situationText = document.getElementById("situationText");
const roundInfo = document.getElementById("roundInfo");
const diffTag = document.getElementById("diffTag");
const yourScoreText = document.getElementById("yourScore");
const rivalScoreText = document.getElementById("rivalScore");
const ball = document.getElementById("ball");
const court = document.getElementById("court");
const popup = document.getElementById("popup");
const possTag = document.getElementById("possTag");
const confetti = document.getElementById("confetti");
const logList = document.getElementById("log");
const playersLayer = document.getElementById("playersLayer");
const yourPanel = document.getElementById("yourPanel");
const rivalPanel = document.getElementById("rivalPanel");
const yourPlayersBox = document.getElementById("yourPlayers");
const benchPlayersBox = document.getElementById("benchPlayers");
const rivalPlayersBox = document.getElementById("rivalPlayers");
const rivalBenchBox = document.getElementById("rivalBench");
const chemBox = document.getElementById("chemBox");

const timeoutControls = document.getElementById("timeoutControls");
const timeoutButton = document.getElementById("timeoutButton");
const timeoutPanel = document.getElementById("timeoutPanel");
const timeoutCount = document.getElementById("timeoutCount");
const resumeButton = document.getElementById("resumeButton");

const ftPanel = document.getElementById("ftPanel");
const ftTitle = document.getElementById("ftTitle");
const ftMarker = document.getElementById("ftMarker");
const ftInfo = document.getElementById("ftInfo");
const ftShootButton = document.getElementById("ftShoot");

const pickGrid = document.getElementById("pickGrid");
const pickCount = document.getElementById("pickCount");
const pickChem = document.getElementById("pickChem");
const playButton = document.getElementById("playButton");
const packButton = document.getElementById("packButton");
const packResult = document.getElementById("packResult");
const modeNote = document.getElementById("modeNote");
const titleCoins = document.getElementById("titleCoins");
const pickCoins = document.getElementById("coinBar");
const difficultyBox = document.getElementById("difficultyPick");

const achList = document.getElementById("achList");
const achCount = document.getElementById("achCount");
const achBack = document.getElementById("achBack");
const settingsBack = document.getElementById("settingsBack");
const musicVol = document.getElementById("musicVol");
const sfxVol = document.getElementById("sfxVol");
const resetButton = document.getElementById("resetButton");

const intro = document.getElementById("intro");
const introTitle = document.getElementById("introTitle");
const introSub = document.getElementById("introSub");
const toast = document.getElementById("toast");

// ---------- The teams ----------
// These are filled in by the team picker (near the bottom of this file).
// All the players live in players.js
let yourPick = [];       // your 5 starters (with upgrades applied)
let yourBenchPick = [];  // your 3 bench players
let rivalPick = [];      // Rival's 5 starters
let rivalBenchPick = []; // Rival's 3 bench players
let lastPicked = [];     // all 8 players you picked (the Rival never uses them)

// ---------- Legend abilities ----------
const abilityInfo = {
  heatCheck:    { name: "Heat Check",    text: "Gets hot after just 1 make" },
  rimProtector: { name: "Rim Protector", text: "Rival drives -10% while on court" },
  floorGeneral: { name: "Floor General", text: "Safer passes, better open looks" },
  clutch:       { name: "Clutch",        text: "+10% on all shots at the end of the game and in overtime" }
};

// ---------- Difficulty ----------
// rivalBonus: how much better (or worse) the Rival's starters are than yours
// smart: how strongly the Rival favors its best shot (higher = smarter)
// timeouts: how many timeouts the Rival gets
// win / lose: coins you earn
// ftSpeed: how fast the free-throw marker moves (higher = harder)
const difficulties = {
  easy:   { label: "Easy",   rivalBonus: -4, smart: 1, timeouts: 1, win: 20, lose: 5,  ftSpeed: 0.0022 },
  normal: { label: "Normal", rivalBonus: 1,  smart: 2, timeouts: 2, win: 40, lose: 10, ftSpeed: 0.0030 },
  hard:   { label: "Hard",   rivalBonus: 5,  smart: 4, timeouts: 3, win: 70, lose: 15, ftSpeed: 0.0042 }
};

// ---------- Game modes ----------
// quarters x quarterLen = the game clock (in game seconds)
// "target" has no clock: first team to the target score wins
const gameModes = {
  classic: { label: "Standard",    quarters: 4, quarterLen: 60 },
  quick:   { label: "Quick",       quarters: 2, quarterLen: 60 },
  target:  { label: "First to 21", target: 21 }
};
const overtimeLen = 36; // overtime lasts 36 game seconds

// ---------- Tournament settings ----------
const stageNames = ["Quarterfinal", "Semifinal", "Final"];
const stageBonus = [0, 2, 4]; // each round the Rival gets stronger
const championBonus = { easy: 150, normal: 250, hard: 400 };
const carryRecovery = 25;     // stamina your players recover between tournament/season games
const injuryChance = 0.6;     // chance an exhausted (0 stamina) player is hurt for the next game

// ---------- Player upgrades ----------
const maxLevel = 3; // each level adds +1 to all three ratings
const upgradeBase = { common: 30, rare: 50, epic: 80, legendary: 120 };

// ---------- Play calls ----------
// A play call only affects the player you picked as the shooter.
const plays = {
  standard: { desc: "No change.", cost: 0 },
  iso:      { desc: "Your shooter: +8% on every shot. Costs +6 stamina.", cost: 6 },
  pickRoll: { desc: "Your shooter: drives +12%. Costs +5 stamina.", cost: 5 },
  spotUp:   { desc: "Your shooter: threes +12%, mid-range +4%. Costs +5 stamina.", cost: 5 },
  postUp:   { desc: "Big men (PF/C): all shots +10%. Everyone else: -4%. Costs +4 stamina.", cost: 4 }
};

// ---------- Achievements ----------
// (modes.js adds a few more to this list)
const achievements = [
  { id: "firstWin",  name: "First Win",        text: "Win a game",                                    coins: 20 },
  { id: "clean",     name: "Clean Hands",      text: "Win a game without taking a foul",              coins: 40 },
  { id: "threes5",   name: "Sharpshooter",     text: "Hit 5 threes in one game",                      coins: 40 },
  { id: "blowout",   name: "Blowout",          text: "Win by 15 or more points",                      coins: 50 },
  { id: "comeback",  name: "Comeback Kid",     text: "Win after trailing by 8 or more",               coins: 60 },
  { id: "steals3",   name: "Pickpocket",       text: "Make 3 steals in one game",                     coins: 40 },
  { id: "streak3",   name: "On a Roll",        text: "Win 3 games in a row",                          coins: 60 },
  { id: "hardWin",   name: "Hard Mode",        text: "Win a game on Hard",                            coins: 60 },
  { id: "chem",      name: "Good Chemistry",   text: "Win a game with 2 or more chemistry bonuses",   coins: 40 },
  { id: "playcall",  name: "Playmaker",        text: "Win a game using all 4 play calls",             coins: 40 },
  { id: "legend",    name: "Legend Collector", text: "Unlock a legendary player",                     coins: 50 },
  { id: "maxed",     name: "Level Up",         text: "Fully upgrade a player (level 3)",              coins: 50 },
  { id: "champ",     name: "Champion",         text: "Win a tournament",                              coins: 100 },
  { id: "champHard", name: "Hard Champion",    text: "Win the tournament on Hard",                    coins: 250 }
];

// ---------- Saved progress (coins, unlocks, records, upgrades...) ----------
const saveKey = "hoopZoneSave";
const prices = { epic: 150, legendary: 400 }; // common and rare start unlocked
const packCost = 120;

function emptyRecord() {
  return { wins: 0, losses: 0, best: 0, streak: 0, bestStreak: 0 };
}

function loadSave() {
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(saveKey));
  } catch (e) {
    data = null;
  }

  if (!data || !Array.isArray(data.owned)) {
    data = {
      coins: 100,
      owned: allPlayers
        .filter((p) => p.tier === "common" || p.tier === "rare")
        .map((p) => p.id),
      difficulty: "normal"
    };
  }
  if (!difficulties[data.difficulty]) data.difficulty = "normal";

  // Commons and rares can't be bought, so everybody owns them. This also gives
  // older saves any common/rare players you add to players.js later.
  allPlayers.forEach((p) => {
    if ((p.tier === "common" || p.tier === "rare") && !data.owned.includes(p.id)) {
      data.owned.push(p.id);
    }
  });

  // Records for each difficulty (older saves don't have these yet)
  if (!data.stats) data.stats = {};
  Object.keys(difficulties).forEach((key) => {
    if (!data.stats[key]) data.stats[key] = emptyRecord();
  });
  if (typeof data.titles !== "number") data.titles = 0;

  // Newer things: upgrades, achievements, volumes, coach, game mode...
  if (!data.upgrades) data.upgrades = {};
  if (!data.achievements) data.achievements = {};
  if (typeof data.musicVolume !== "number") data.musicVolume = 25;
  if (typeof data.sfxVolume !== "number") data.sfxVolume = 100;
  if (!gameModes[data.gameMode]) data.gameMode = "classic";
  if (!data.coach) data.coach = {};
  if (typeof data.seasonTitles !== "number") data.seasonTitles = 0;
  if (typeof data.contestBest !== "number") data.contestBest = 0;
  if (typeof data.voiceVolume !== "number") data.voiceVolume = 100;

  return data;
}

function writeSave() {
  try {
    localStorage.setItem(saveKey, JSON.stringify(save));
  } catch (e) {
    // saving is optional: the game still works without it
  }
}

let save = loadSave();
let settings = difficulties[save.difficulty];

// Coach perks (bought in modes.js). They don't count in 2-player games.
function coachLvl(key) {
  return isTwo() ? 0 : (save.coach[key] || 0);
}

// ---------- Background music ----------
const music = document.getElementById("bgMusic");
music.volume = save.musicVolume / 100;
const musicButton = document.getElementById("musicButton");

function updateMusicButton() {
  musicButton.textContent = save.musicOn === false ? "🔇" : "🔊";
}

function startMusic() {
  if (save.musicOn === false) return;
  music.play().catch(() => {}); // browsers block autoplay until you click
}

musicButton.addEventListener("click", () => {
  save.musicOn = save.musicOn === false; // flip on/off
  writeSave();
  if (save.musicOn) {
    music.play().catch(() => {});
  } else {
    music.pause();
  }
  updateMusicButton();
});

// ---------- Screens ----------
function showScreen(screen) {
  allScreens.forEach((s) => s.classList.toggle("hidden", s !== screen));
}

// Shrinks the court on small screens so everything stays lined up
function fitCourt() {
  const zoom = Math.min(1, (window.innerWidth - 20) / 610);
  court.style.zoom = zoom;
}
window.addEventListener("resize", fitCourt);

// ---------- Toast messages (achievements) ----------
const toastQueue = [];
let toastBusy = false;

function showToast(text) {
  toastQueue.push(text);
  nextToast();
}

function nextToast() {
  if (toastBusy || toastQueue.length === 0) return;
  toastBusy = true;
  toast.textContent = toastQueue.shift();
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toastBusy = false;
      nextToast();
    }, 400);
  }, 2600);
}

// ---------- Achievements ----------
function unlockAchievement(id) {
  if (save.achievements[id]) return;
  const a = achievements.find((x) => x.id === id);
  if (!a) return;

  save.achievements[id] = true;
  save.coins += a.coins;
  writeSave();
  updateCoinBars();
  showToast("🏅 " + a.name + " · +" + a.coins + " coins");
  playCheerSound(0.6);
}

function renderAchievements() {
  let done = 0;
  let html = "";

  achievements.forEach((a) => {
    const got = !!save.achievements[a.id];
    if (got) done++;
    html +=
      '<div class="achItem ' + (got ? "got" : "") + '">' +
        '<span class="achIcon">' + (got ? "🏅" : "🔒") + '</span>' +
        '<div class="achText"><b>' + a.name + '</b><span>' + a.text + '</span></div>' +
        '<span class="achCoins">+' + a.coins + '</span>' +
      '</div>';
  });

  achList.innerHTML = html;
  achCount.textContent = done + " of " + achievements.length + " unlocked";
}

// Checks run when a game ends
function checkEndAchievements(won, champion) {
  const rec = save.stats[save.difficulty];

  if (won) {
    unlockAchievement("firstWin");
    if (save.difficulty === "hard") unlockAchievement("hardWin");
    if (gameStats.fouls === 0) unlockAchievement("clean");
    if (score.you - score.rival >= 15) unlockAchievement("blowout");
    if (gameStats.maxDeficit >= 8) unlockAchievement("comeback");
    if (rec.streak >= 3) unlockAchievement("streak3");
    if (gameStats.maxChem >= 2) unlockAchievement("chem");
    if (Object.keys(gameStats.calls).length >= 4) unlockAchievement("playcall");
  }

  if (champion) {
    unlockAchievement("champ");
    if (save.difficulty === "hard") unlockAchievement("champHard");
  }
}

// ---------- Coins, difficulty / game mode buttons and records ----------
function updateCoinBars() {
  const text = "💰 " + save.coins + " coins";
  titleCoins.textContent = text;
  pickCoins.textContent = text;
  const coachCoins = document.getElementById("coachCoins");
  if (coachCoins) coachCoins.textContent = text;
}

function updateDifficultyButtons() {
  difficultyBox.querySelectorAll(".diffButton").forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.diff === save.difficulty);
  });
}

difficultyBox.addEventListener("click", (event) => {
  const btn = event.target.closest(".diffButton");
  if (!btn) return;
  save.difficulty = btn.dataset.diff;
  settings = difficulties[save.difficulty];
  writeSave();
  updateDifficultyButtons();
});

function updateGameModeButtons() {
  gameModeBox.querySelectorAll(".gmButton").forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.gm === save.gameMode);
  });
}

gameModeBox.addEventListener("click", (event) => {
  const btn = event.target.closest(".gmButton");
  if (!btn) return;
  save.gameMode = btn.dataset.gm;
  writeSave();
  updateGameModeButtons();
});

// The records table on the title screen
function renderRecords() {
  let html =
    '<table class="recordTable">' +
      '<tr><th></th><th>W - L</th><th>Best score</th><th>Win streak</th></tr>';

  Object.keys(difficulties).forEach((key) => {
    const r = save.stats[key];
    html +=
      '<tr>' +
        '<td>' + difficulties[key].label + '</td>' +
        '<td>' + r.wins + ' - ' + r.losses + '</td>' +
        '<td>' + (r.best || "–") + '</td>' +
        '<td>' + r.streak + ' (best ' + r.bestStreak + ')</td>' +
      '</tr>';
  });

  html += '</table><p class="titlesLine">🏆 Tournament titles: ' + save.titles +
    ' · 📅 Season titles: ' + save.seasonTitles +
    ' · 🎯 Contest best: ' + save.contestBest + '</p>';
  recordsBox.innerHTML = html;
}

// ---------- The court (600 x 320) ----------
// You attack the RIGHT hoop. The Rival attacks the LEFT hoop.
const hoopRight = { x: 567, y: 160 };
const hoopLeft = { x: 33, y: 160 };

// Where the 5 attackers stand when attacking the right hoop
const attackSpots = [
  { x: 410, y: 160 }, // PG, top of the key
  { x: 440, y: 55 },  // SG, wing
  { x: 440, y: 265 }, // SF, wing
  { x: 505, y: 90 },  // PF, block
  { x: 505, y: 230 }  // C, block
];

// A defender stands between his man and the hoop
function defendSpot(spot) {
  return {
    x: spot.x + (hoopRight.x - spot.x) * 0.28,
    y: spot.y + (hoopRight.y - spot.y) * 0.28
  };
}

// Flip a spot to the other end of the court
function mirror(spot) {
  return { x: 600 - spot.x, y: spot.y };
}

// ---------- Game settings ----------
const startingFouls = 3;
const foulDrawChance = 0.25; // chance a MISSED drive draws a foul

// Each move: points, base chance, which rating it uses, and stamina cost
const moves = {
  drive: { name: "drove to the rim",       points: 2, chance: 0.60, rating: "inside", cost: 20 },
  mid:   { name: "hit a mid-range jumper", points: 2, chance: 0.50, rating: "mid",    cost: 12 },
  three: { name: "took a three",           points: 3, chance: 0.35, rating: "three",  cost: 15 }
};

const passCost = 8;         // stamina a pass costs the passer
const openLookBonus = 0.15; // bonus for the player who gets the pass
const recovery = 10;        // stamina players get back each round when resting

// Each situation changes the chances (+0.20 means +20%)
const situations = [
  { text: "Wide open lane to the basket!", drive: 0.20, mid: 0, three: -0.05 },
  { text: "A defender is glued to you at the rim.", drive: -0.20, mid: 0, three: 0.05 },
  { text: "Fast break! The defense is behind you.", drive: 0.25, mid: 0.05, three: 0.05 },
  { text: "You're wide open at the three-point line.", drive: -0.05, mid: 0.05, three: 0.20 },
  { text: "The shot clock is almost out!", drive: -0.10, mid: -0.10, three: -0.10 },
  { text: "Their big man is protecting the rim.", drive: -0.25, mid: 0.10, three: 0.05 },
  { text: "The crowd is going wild. You feel confident!", drive: 0.10, mid: 0.10, three: 0.10 },
  { text: "Normal half-court set.", drive: 0, mid: 0, three: 0 }
];

// ---------- Game state ----------
let yourTeam = [];      // the 5 players on the court
let yourBench = [];     // the 3 substitutes
let rivalTeam = [];     // Rival's 5 on the court
let rivalBench = [];    // Rival's 3 substitutes
let dotsYou = [];
let dotsRival = [];
let selected = 0;       // which of your players is the shooter
let rivalShooter = -1;  // which Rival is shooting (-1 = nobody)
let possession = "you"; // who has the ball: "you" or "rival"

let score = { you: 0, rival: 0 };
let round = 1;          // counts your possession + the Rival's possession as one round
let overtime = false;
let currentSituation = null;
let locked = false;     // true while animations are playing

let currentDefense = null;      // "guardThree", "protectRim", "doubleTeam" or "stealFail"
let doubleTargetPlayer = null;  // the Rival player being double-teamed
let fastBreakBonus = 0;         // the Rival gets this after your turnover
let myFastBreak = 0;            // you get this after a successful steal

let timeoutsLeft = 3;
let rivalTimeouts = 2;
let inTimeout = false;  // true during timeouts AND quarter breaks (subs allowed)
let subOut = null;      // your court player chosen to be replaced
let p2SubOut = null;    // Player 2's court player chosen to be replaced (2-player)
let foulsLeft = startingFouls;

// mode: "single", "tournament", "season" or "twoPlayer"
let mode = "single";
let activeGM = "classic";   // which game mode this game uses (see gameModes)
let tourneyStage = 0;       // 0 = Quarterfinal, 1 = Semifinal, 2 = Final
let continueSquad = false;  // tournament/season: keep the same squad (and tired legs)
let rivalName = "RIVAL";    // shown on the scoreboard
let rivalShort = "Rival";   // used in the play-by-play
let modeTag = "";           // extra label for season games
let rivalTeamObj = null;    // the team you are playing against (for the logo and colors)
let usedTeams = [];         // teams you already met in this tournament
let pickFilter = "all";     // which team the picker is showing

let ft = null;          // the free-throw mini-game (null when not playing it)
let gameSession = 0;    // changes every time a game starts or is left, so old timers can be ignored
let currentPlay = "standard";
let chemistry = [];     // active chemistry bonuses for your 5 on the court
let rivalChemistry = []; // (2-player only)
let lastLeader = "tie";

// Game clock
let clock = 0;          // game seconds left (clock modes)
let gameLen = 0;
let quarterLen = 60;
let numQuarters = 4;
let lastQuarter = 1;
let roundSeconds = 0;   // game seconds used up in the current round
let finalWarned = false;
let breakResume = null; // what to do after a quarter break
let gameEnded = false;  // true after the final buzzer

// 2-player
let pickPhase = 1;      // 1 = Player 1 is picking, 2 = Player 2 is picking
let p1Picked = [];
let p2Defense = null;       // Player 2's defense against Player 1's possession
let p2DoubleTarget = null;
let defenseOwner = "p1";    // who is choosing a defense right now
let p2Selected = 0;

// Stats for the current game (used by achievements)
let gameStats = { threes: 0, steals: 0, fouls: 0, maxDeficit: 0, maxChem: 0, calls: {} };

function isTwo() {
  return mode === "twoPlayer";
}

// A timer for the flow of the game. If you leave the game (or start a new one)
// before it fires, it does nothing. That stops an abandoned game from finishing by itself.
function later(fn, ms) {
  const session = gameSession;
  return setTimeout(() => {
    if (session === gameSession) fn();
  }, ms);
}

// ---------- Sound (made with code, no files needed) ----------
let audioCtx = null;

function getAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

// Sound effects volume from the settings (0 to 1)
function sfx() {
  return save.sfxVolume / 100;
}

function beep(frequency, duration, type = "sine", volume = 0.1) {
  const ctx = getAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = volume * sfx();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

// A burst of noise through a filter (used for the swish and the crowd)
function noiseBurst(seconds, filterType, frequency, volume, fadeIn = 0) {
  const ctx = getAudio();
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = frequency;
  const gain = ctx.createGain();
  const peak = Math.max(0.0001, volume * sfx());
  const now = ctx.currentTime;

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(peak, now + Math.max(0.01, fadeIn));
  gain.gain.exponentialRampToValueAtTime(0.0001, now + seconds);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

function playMadeSound() {
  beep(600, 0.1);
  setTimeout(() => beep(900, 0.2), 100);
}

function playMissSound() {
  beep(200, 0.3);
}

function playWinSound() {
  beep(523, 0.15);
  setTimeout(() => beep(659, 0.15), 150);
  setTimeout(() => beep(784, 0.15), 300);
  setTimeout(() => beep(1047, 0.4), 450);
}

// A "swish": a quick burst of bright noise, like the ball through the net
function playSwishSound() {
  noiseBurst(0.35, "highpass", 3000, 0.25, 0.02);
}

// The crowd cheers (longer = bigger moment)
function playCheerSound(size = 1) {
  noiseBurst(1.0 * size, "bandpass", 900, 0.18, 0.25 * size);
}

function playStealSound() {
  beep(400, 0.08, "square", 0.06);
  setTimeout(() => beep(800, 0.08, "square", 0.06), 80);
  setTimeout(() => beep(1200, 0.15, "square", 0.06), 160);
}

function playFoulSound() {
  beep(150, 0.5, "sawtooth", 0.12); // a low buzzer
}

function playTimeoutSound() {
  beep(500, 0.12, "triangle");
  setTimeout(() => beep(500, 0.12, "triangle"), 180);
}

function playSubSound() {
  beep(700, 0.08, "triangle");
  setTimeout(() => beep(500, 0.1, "triangle"), 90);
}

function playHotSound() {
  beep(600, 0.08, "sawtooth", 0.05);
  setTimeout(() => beep(800, 0.08, "sawtooth", 0.05), 80);
  setTimeout(() => beep(1000, 0.12, "sawtooth", 0.05), 160);
}

function playWhistleSound() {
  beep(1800, 0.3, "square", 0.05);
}

// ---------- Commentator ----------
const commentLines = {
  three: ["BANG! From downtown!", "Nothing but net from deep!", "Cold-blooded three!"],
  drive: ["powers through for the bucket!", "finishes strong at the rim!", "attacks the paint and scores!"],
  mid:   ["smooth jumper, money!", "pulls up in rhythm and hits it!", "elbow jumper is good!"],
  miss:  ["Off the rim!", "No good. Rebound's gathered.", "Can't get that one to fall."],
  hot:   ["is on fire! 🔥", "can't miss right now! 🔥", "is heating up! 🔥"],
  steal: ["What a steal!", "Picked his pocket clean!", "Hands like glue on defense!"],
  foul:  ["Whistle blows! Foul!", "That's a foul on the play.", "Contact! They're going to the line."]
};

function randomOf(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// A quick one-line message from the play-by-play commentator (broadcast.js does the rest)
function say(text) {
  showCommentary([{ who: "pbp", text: text }]);
}

// Is the lead changing hands? (called every time the score changes)
function checkLead() {
  const leader = score.you > score.rival ? "you" : score.rival > score.you ? "rival" : "tie";

  if (leader !== lastLeader && (score.you > 0 || score.rival > 0)) {
    announce("lead", { leader: leader, lastLeader: lastLeader });
    if (leader === "you" && lastLeader === "rival" && !isTwo()) playCheerSound(0.8);
  }
  lastLeader = leader;
}

// ---------- The game clock ----------
function isTimed() {
  return !!gameModes[activeGM].quarters;
}

function fmtClock(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ":" + (s < 10 ? "0" : "") + s;
}

// Which quarter are we in? (1, 2, 3...)
function quarterNumber() {
  return Math.min(numQuarters, Math.floor((gameLen - clock) / quarterLen) + 1);
}

function updateClockDisplay() {
  if (isTimed()) {
    roundInfo.textContent = (overtime ? "⏱️ OT" : "Q" + quarterNumber()) + " · " + fmtClock(clock);
  } else {
    roundInfo.textContent = "First to " + gameModes.target.target;
  }
  renderLiveBar();
}

// The last moments of the game (used by Clutch and the Rival's timeout logic)
function isLateGame() {
  if (isTimed()) return overtime || clock <= 40;
  return Math.max(score.you, score.rival) >= gameModes.target.target - 4;
}

// How many game seconds each action takes
function secondsFor(moveKey) {
  const base = { drive: 8, mid: 10, three: 11, pass: 12 }[moveKey];
  return base + Math.floor(Math.random() * 4);
}

function isGameOver() {
  if (activeGM === "target") {
    return Math.max(score.you, score.rival) >= gameModes.target.target && score.you !== score.rival;
  }
  return clock <= 0 && score.you !== score.rival;
}

// ---------- Where everyone stands ----------
// The hoop being attacked right now
function getHoop() {
  return possession === "you" ? hoopRight : hoopLeft;
}

// The spot for player i of one team, based on who has the ball
function getSpot(who, i) {
  const base = attackSpots[i];
  const attacking = who === possession;
  let spot = attacking ? base : defendSpot(base);

  if (possession === "rival") {
    spot = mirror(spot);
  }
  return spot;
}

// Slide every dot to its spot (this is the "switch ends" move)
function positionAll() {
  dotsYou.forEach((dot, i) => {
    const spot = getSpot("you", i);
    dot.style.left = spot.x + "px";
    dot.style.top = spot.y + "px";
  });
  dotsRival.forEach((dot, i) => {
    const spot = getSpot("rival", i);
    dot.style.left = spot.x + "px";
    dot.style.top = spot.y + "px";
  });
}

// ---------- The ball ----------
// (moving the ball always stops the dribble; placeBallAtHandler starts it again)
function placeBall(x, y, animate, ms = 700) {
  ball.classList.remove("dribble");
  if (animate) {
    ball.style.transition = "left " + ms + "ms ease-out, top " + ms + "ms ease-out";
  } else {
    ball.style.transition = "none";
  }
  ball.style.left = x + "px";
  ball.style.top = y + "px";
}

// Put the ball next to the point guard of the team that has it
function placeBallAtHandler(animate) {
  const spot = getSpot(possession, 0);
  const offset = possession === "you" ? -20 : 20;
  placeBall(spot.x + offset, spot.y, animate, 800);
  ball.classList.add("dribble");
}

// Fly the ball from the shooter to the hoop, then drop it or bounce it off
function shootBall(spot, made) {
  const hoop = getHoop();

  placeBall(spot.x, spot.y, false);
  void ball.offsetWidth; // lets the browser settle before animating
  placeBall(hoop.x, hoop.y, true, 700);

  setTimeout(() => {
    if (made) {
      placeBall(hoop.x, hoop.y + 16, true, 250); // drops through the net
    } else {
      const direction = hoop.x > 300 ? -1 : 1;
      const side = Math.random() < 0.5 ? -40 : 40;
      placeBall(hoop.x + direction * 45, hoop.y + side, true, 400); // bounces off
    }
  }, 750);
}

// ---------- Switching possession ----------
function setPossession(who, animate = true) {
  possession = who;
  positionAll();
  placeBallAtHandler(animate);

  yourPanel.classList.toggle("active", who === "you");
  rivalPanel.classList.toggle("active", who === "rival");
  possTag.textContent = who === "you" ? "🏀 Your ball ▶" : "◀ " + rivalShort + "'s ball 🏀";
  if (isTwo()) possTag.textContent = who === "you" ? "🏀 Player 1 ▶" : "◀ Player 2 🏀";

  highlightSelected();
  renderLiveBar();
}

// ---------- Making the teams ----------
// Copies each player and adds points, assists, shots, streak and stamina
function makeTeam(template) {
  return template.map((p) => ({
    ...p,
    points: 0,
    assists: 0,
    made: 0,   // field goals made
    shots: 0,  // field goals attempted
    streak: 0,
    stamina: 100,
    injured: false,
    used: false // did this player play this round?
  }));
}

// Tournament/season: keep the same players, clear their game stats, give some rest
function carryOver(team) {
  team.forEach((p) => {
    p.points = 0;
    p.assists = 0;
    p.made = 0;
    p.shots = 0;
    p.streak = 0;
    p.used = false;
    p.stamina = Math.min(100, p.stamina + carryRecovery);
  });
}

// Injuries: players who finished at 0 stamina may miss the next game.
// (Must run BEFORE carryOver gives them rest.) Returns a note for the intro.
function rollInjuries() {
  const everyone = yourTeam.concat(yourBench);
  everyone.forEach((p) => (p.injured = false)); // last game's injuries have healed

  const names = [];
  shuffle(everyone.filter((p) => p.stamina === 0))
    .slice(0, 3)
    .forEach((p) => {
      if (Math.random() < injuryChance) {
        p.injured = true;
        names.push(p.name);
      }
    });

  return names.length > 0
    ? "🤕 Out injured this game: " + names.join(", ") + "."
    : "";
}

// Injured starters sit on the bench; healthy bench players take their place
function benchInjured() {
  yourTeam.forEach((p, i) => {
    if (!p.injured) return;

    let best = -1;
    yourBench.forEach((b, j) => {
      if (!b.injured && (best === -1 || b.stamina > yourBench[best].stamina)) best = j;
    });
    if (best === -1) return;

    const sub = yourBench[best];
    yourBench[best] = p;
    yourTeam[i] = sub;
  });
}

// Colors a dot with his team's colors (the blue/red ring shows which side he is on)
function styleDot(dot, p) {
  const t = teamOf(p);
  if (t) {
    dot.style.background = t.primary;
    dot.style.color = readableText(t.primary);
  }
}

function buildDots() {
  playersLayer.innerHTML = "";
  dotsYou = [];
  dotsRival = [];

  yourTeam.forEach((p, i) => {
    const dot = document.createElement("div");
    const spot = getSpot("you", i);
    dot.className = "dot you popIn";
    dot.textContent = p.num;
    styleDot(dot, p);
    dot.style.left = spot.x + "px";
    dot.style.top = spot.y + "px";
    playersLayer.appendChild(dot);
    dotsYou.push(dot);
  });

  rivalTeam.forEach((p, i) => {
    const dot = document.createElement("div");
    const spot = getSpot("rival", i);
    dot.className = "dot rival popIn";
    dot.textContent = p.num;
    styleDot(dot, p);
    dot.style.left = spot.x + "px";
    dot.style.top = spot.y + "px";
    playersLayer.appendChild(dot);
    dotsRival.push(dot);
  });
}

// Green when fresh, orange when tired, red when exhausted
function staminaColor(stamina) {
  if (stamina > 60) return "#4dff7d";
  if (stamina > 30) return "#ffb84d";
  return "#ff4d4d";
}

// Is this player on a hot streak? (Heat Check players get hot after 1 make)
function isHot(p) {
  const hotAt = p.ability === "heatCheck" ? 1 : 2;
  return p.streak >= hotAt;
}

// Hot players glow on the court
function refreshHotDots() {
  yourTeam.forEach((p, i) => {
    if (dotsYou[i]) dotsYou[i].classList.toggle("hotDot", isHot(p));
  });
  rivalTeam.forEach((p, i) => {
    if (dotsRival[i]) dotsRival[i].classList.toggle("hotDot", isHot(p));
  });
}

// A big flash the moment a player catches fire
function heatUp(who, player) {
  const team = who === "you" ? yourTeam : rivalTeam;
  const dots = who === "you" ? dotsYou : dotsRival;
  const dot = dots[team.indexOf(player)];
  if (!dot) return;

  dot.classList.remove("heatFlash");
  void dot.offsetWidth;
  dot.classList.add("heatFlash");
  setTimeout(() => dot.classList.remove("heatFlash"), 1200);
  playHotSound();
  if (who === "you") playCheerSound(0.7);
  announce("hot", { who: who, player: player });
}

// Builds the cards that show each player's ratings, points and stamina
function teamHtml(team, cssClass, isBench = false) {
  let html = "";

  team.forEach((p, i) => {
    let extra = isBench ? " bench" : "";

    if (!isBench && cssClass === "you") {
      const mark = inTimeout ? subOut : selected;
      if (i === mark) extra += " selected";
    }
    if (!isBench && cssClass === "rival") {
      const mark = (inTimeout && isTwo()) ? p2SubOut : rivalShooter;
      if (i === mark) extra += " selected";
    }
    if (isHot(p)) extra += " hot";
    if (p.injured) extra += " injured";

    const ability = p.ability
      ? '<div class="ability">★ ' + abilityInfo[p.ability].name + '</div>'
      : "";
    const injury = p.injured ? '<div class="injTag">🤕 OUT (injured)</div>' : "";
    const level = p.level ? '<span class="lvl">+' + p.level + '</span>' : "";

    html +=
      '<div class="player ' + cssClass + extra + '" data-index="' + i + '">' +
        '<div class="topRow">' +
          '<span class="avatar">' + avatarHtml(p, 40) + '</span>' +
          '<span class="pname">' + p.name + level + '</span>' +
          '<span class="tlogo">' + (teamOf(p) ? teamLogoHtml(teamOf(p), 16) : "") + '</span>' +
          '<span class="pos">' + p.pos + '</span>' +
        '</div>' +
        '<div class="ratings">' +
          '<div><span>INS</span><b>' + p.inside + '</b></div>' +
          '<div><span>MID</span><b>' + p.mid + '</b></div>' +
          '<div><span>3PT</span><b>' + p.three + '</b></div>' +
        '</div>' +
        ability +
        injury +
        '<div class="pstats">' + p.points + ' pts · ' + p.assists + ' ast ' + (isHot(p) ? "🔥" : "") + '</div>' +
        '<div class="stamina"><div style="width:' + p.stamina + '%; background:' + staminaColor(p.stamina) + '"></div></div>' +
        '<div class="staminaLabel">Stamina ' + p.stamina + '</div>' +
      '</div>';
  });
  return html;
}

function renderRosters() {
  yourPlayersBox.innerHTML = teamHtml(yourTeam, "you");
  benchPlayersBox.innerHTML = teamHtml(yourBench, "you", true);
  rivalPlayersBox.innerHTML = teamHtml(rivalTeam, "rival");
  rivalBenchBox.innerHTML = teamHtml(rivalBench, "rival", true);
  refreshHotDots();
}

// Your selected player grows and glows (only while you have the ball)
function highlightSelected() {
  dotsYou.forEach((dot, i) => {
    dot.classList.toggle("shooting", possession === "you" && i === selected);
  });
}

// Click one of your court player cards:
// normally it picks your shooter, during a timeout/break it picks who to sub out
yourPlayersBox.addEventListener("click", (event) => {
  const card = event.target.closest(".player");
  if (!card) return;

  if (inTimeout) {
    subOut = Number(card.dataset.index);
    messageText.textContent = "Now tap a bench player to bring in.";
    renderRosters();
    return;
  }

  if (locked) return;

  selected = Number(card.dataset.index);
  renderRosters();
  highlightSelected();
  updateOdds();
});

// Click a bench player during a timeout/break to swap him in
benchPlayersBox.addEventListener("click", (event) => {
  if (!inTimeout) return;
  const card = event.target.closest(".player");
  if (!card) return;

  if (subOut === null) {
    messageText.textContent = "First tap the court player you want to replace.";
    return;
  }

  const b = Number(card.dataset.index);
  if (yourBench[b].injured) {
    messageText.textContent = "🤕 " + yourBench[b].name + " is injured and can't play this game.";
    return;
  }

  const out = yourTeam[subOut];
  yourTeam[subOut] = yourBench[b];
  yourBench[b] = out;
  subOut = null;

  buildDots();
  setPossession("you", false);
  updateChemistry();
  renderRosters();
  updateOdds();
  playSubSound();
  messageText.textContent = "Substitution made. Sub again or resume.";
});

// 2-player: Player 2 can substitute during quarter breaks too
rivalPlayersBox.addEventListener("click", (event) => {
  if (!inTimeout || !isTwo()) return;
  const card = event.target.closest(".player");
  if (!card) return;

  p2SubOut = Number(card.dataset.index);
  messageText.textContent = "Player 2: now tap a bench player to bring in.";
  renderRosters();
});

rivalBenchBox.addEventListener("click", (event) => {
  if (!inTimeout || !isTwo()) return;
  const card = event.target.closest(".player");
  if (!card) return;

  if (p2SubOut === null) {
    messageText.textContent = "Player 2: first tap the court player you want to replace.";
    return;
  }

  const b = Number(card.dataset.index);
  const out = rivalTeam[p2SubOut];
  rivalTeam[p2SubOut] = rivalBench[b];
  rivalBench[b] = out;
  p2SubOut = null;

  buildDots();
  setPossession("you", false);
  updateChemistry();
  renderRosters();
  playSubSound();
  messageText.textContent = "Player 2 made a substitution.";
});

// ---------- Team chemistry ----------
// Bonuses for the five players on the court
function calcChemistry(five) {
  const list = [];
  const rank = { common: 0, rare: 1, epic: 2, legendary: 3 };
  const top = (p) => rank[p.tier] >= 2; // Epic or better
  const find = (pos) => five.find((p) => p.pos === pos);
  const has = (pos) => five.some((p) => p.pos === pos);

  const pg = find("PG");
  const sg = find("SG");
  const c = find("C");

  if (pg && sg && top(pg) && top(sg)) {
    list.push({ name: "Splash Backcourt", text: "Epic+ PG and SG: threes +4%", three: 0.04 });
  }
  if (has("PF") && has("C")) {
    list.push({ name: "Twin Towers", text: "PF and C together: drives +4%", drive: 0.04 });
  }
  if (five.filter((p) => p.three >= 80).length >= 3) {
    list.push({ name: "Spacing", text: "3+ shooters (3PT 80+): threes +3%, mid +2%", three: 0.03, mid: 0.02 });
  }
  if (pg && c && top(pg) && top(c)) {
    list.push({ name: "Franchise Duo", text: "Epic+ PG with an Epic+ C: all shots +3%", all: 0.03 });
  }
  if (["PG", "SG", "SF", "PF", "C"].every(has)) {
    list.push({ name: "Balanced Five", text: "One of every position: all shots +2%, passes +5% safer", all: 0.02, pass: 0.05 });
  }

  // Teammates from the same team play better together
  const counts = {};
  five.forEach((p) => {
    if (p.team) counts[p.team] = (counts[p.team] || 0) + 1;
  });
  const most = Math.max(0, ...Object.values(counts));
  if (most >= 5) {
    list.push({ name: "Full Team", text: "All 5 from one team: all shots +4%, passes +5% safer", all: 0.04, pass: 0.05 });
  } else if (most >= 3) {
    list.push({ name: "Team Bond", text: "3+ teammates from one team: all shots +2%", all: 0.02 });
  }
  return list;
}

function chemBonusList(list, moveKey) {
  let total = 0;
  list.forEach((c) => {
    total += (c.all || 0) + (c[moveKey] || 0);
  });
  return total;
}

function chemPassBonus() {
  let total = 0;
  chemistry.forEach((c) => {
    total += c.pass || 0;
  });
  return total;
}

// Recalculate and show the chemistry chips next to your team
function updateChemistry() {
  chemistry = calcChemistry(yourTeam);
  rivalChemistry = isTwo() ? calcChemistry(rivalTeam) : [];
  gameStats.maxChem = Math.max(gameStats.maxChem, chemistry.length);

  if (chemistry.length === 0) {
    chemBox.innerHTML = '<span class="chemNone">No chemistry bonuses</span>';
    return;
  }
  chemBox.innerHTML = chemistry
    .map((c) => '<span class="chemChip" title="' + c.text + '">🤝 ' + c.name + '</span>')
    .join("");
}

// ---------- Play calls ----------
// Only the player you picked as the shooter is affected
function playBonus(moveKey, player) {
  if (player !== yourTeam[selected]) return 0;

  if (currentPlay === "iso") return 0.08;
  if (currentPlay === "pickRoll") return moveKey === "drive" ? 0.12 : 0;
  if (currentPlay === "spotUp") return moveKey === "three" ? 0.12 : moveKey === "mid" ? 0.04 : 0;
  if (currentPlay === "postUp") return (player.pos === "PF" || player.pos === "C") ? 0.10 : -0.04;
  return 0;
}

function setPlay(key) {
  currentPlay = key;
  playBar.querySelectorAll(".playBtn").forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.play === key);
  });
  playDesc.textContent = plays[key].desc;
  if (currentSituation) updateOdds();
}

playBar.addEventListener("click", (event) => {
  const btn = event.target.closest(".playBtn");
  if (!btn || locked || inTimeout) return;
  setPlay(btn.dataset.play);
});

// ---------- Chances ----------
// Player 2's defense against YOUR shots (2-player only)
function p2DefenseMod(moveKey, player) {
  if (!isTwo() || !p2Defense) return 0;
  let mod = 0;

  if (p2Defense === "guardThree") {
    if (moveKey === "three") mod -= 0.20;
    if (moveKey === "drive") mod += 0.05;
  }
  if (p2Defense === "protectRim") {
    if (moveKey === "drive") mod -= 0.20;
    if (moveKey === "three") mod += 0.05;
  }
  if (p2Defense === "doubleTeam") {
    mod += player === p2DoubleTarget ? -0.25 : 0.05;
  }
  return mod;
}

// Real chance = base + situation + player rating + hot streak + extra - tiredness
function getChance(moveKey, player, extra = 0) {
  const move = moves[moveKey];
  let chance = move.chance + currentSituation[moveKey];
  const isYours = yourTeam.includes(player);

  // A rating of 70 is average. Better players add chance, worse ones lose it.
  chance += (player[move.rating] - 70) / 150;

  if (isHot(player)) {
    chance += 0.10; // hot streak bonus
  }

  // Clutch: bonus at the end of the game and in overtime
  if (player.ability === "clutch" && isLateGame()) {
    chance += 0.10;
  }

  if (isYours) {
    // A Rival Rim Protector on the court makes your drives harder
    if (moveKey === "drive" && rivalTeam.some((p) => p.ability === "rimProtector")) {
      chance -= 0.10;
    }
    chance += myFastBreak;                       // bonus after a successful steal
    chance += chemBonusList(chemistry, moveKey); // team chemistry
    chance += playBonus(moveKey, player);        // your play call
    chance += p2DefenseMod(moveKey, player);     // Player 2's defense (2-player)
  } else if (isTwo() && rivalTeam.includes(player)) {
    chance += chemBonusList(rivalChemistry, moveKey);
  }

  // Tired players shoot worse (0 stamina = -33%)
  chance -= (100 - player.stamina) / 300;

  chance += extra;

  // Keep it between 5% and 95%
  return Math.min(0.95, Math.max(0.05, chance));
}

// How likely your pass is to be safe (tired passers turn it over more)
function getPassChance(player) {
  let chance = 0.80 - (100 - player.stamina) / 400;
  if (player.ability === "floorGeneral") chance += 0.10;
  chance += chemPassBonus();
  return Math.min(0.95, Math.max(0.50, chance));
}

// How likely your steal attempt works (better defenders = better chance)
function getStealChance() {
  let total = 0;
  yourTeam.forEach((p) => {
    total += overall(p);
  });
  const avg = total / yourTeam.length;
  return Math.min(0.50, Math.max(0.15, 0.30 + (avg - 70) / 200));
}

// Extra chance (or penalty) the Rival gets from your defense
function rivalModifier(moveKey, player) {
  let mod = fastBreakBonus;

  // Rim Protector on your court makes their drives harder
  if (moveKey === "drive" && yourTeam.some((p) => p.ability === "rimProtector")) {
    mod -= 0.10;
  }

  if (currentDefense === "guardThree") {
    if (moveKey === "three") mod -= 0.20;
    if (moveKey === "drive") mod += 0.05;
  }

  if (currentDefense === "protectRim") {
    if (moveKey === "drive") mod -= 0.20;
    if (moveKey === "three") mod += 0.05;
  }

  if (currentDefense === "doubleTeam") {
    if (player === doubleTargetPlayer) {
      mod -= 0.25;
    } else {
      mod += 0.05;
    }
  }

  // Failed steal: the defense was out of position
  // (Coach "Defensive Drills" makes this penalty smaller)
  if (currentDefense === "stealFail") {
    mod += 0.15 - 0.03 * coachLvl("steal");
  }

  return mod;
}

// ---------- Situations and buttons ----------
function newSituation() {
  const index = Math.floor(Math.random() * situations.length);
  currentSituation = situations[index];
  situationText.textContent = currentSituation.text;
  updateOdds();
}

function updateOdds() {
  const shooter = yourTeam[selected];
  document.getElementById("driveOdds").textContent = Math.round(getChance("drive", shooter) * 100);
  document.getElementById("midOdds").textContent = Math.round(getChance("mid", shooter) * 100);
  document.getElementById("threeOdds").textContent = Math.round(getChance("three", shooter) * 100);
  document.getElementById("passOdds").textContent = Math.round(getPassChance(shooter) * 100);
}

function updateTimeoutButton() {
  timeoutCount.textContent = timeoutsLeft + " remaining";
  timeoutButton.disabled = locked || inTimeout || timeoutsLeft === 0;
  renderLiveBar();
}

function setButtons(enabled) {
  driveButton.disabled = !enabled;
  midButton.disabled = !enabled;
  threeButton.disabled = !enabled;
  passButton.disabled = !enabled;
  updateTimeoutButton();
}

// ---------- Timeouts and quarter breaks ----------
const timeoutTitle = timeoutPanel.querySelector("h3");
const timeoutTexts = timeoutPanel.querySelectorAll("p");

function setTimeoutPanelText(title, line1, line2) {
  timeoutTitle.textContent = title;
  timeoutTexts[0].textContent = line1;
  timeoutTexts[1].textContent = line2;
}

timeoutButton.addEventListener("click", () => {
  if (locked || inTimeout || timeoutsLeft <= 0) return;

  inTimeout = true;
  timeoutsLeft--;
  subOut = null;
  playTimeoutSound();
  announce("timeout", { who: "you" });

  // Court players recover 20 stamina, bench players recover 10
  yourTeam.forEach((p) => (p.stamina = Math.min(100, p.stamina + 20)));
  yourBench.forEach((p) => (p.stamina = Math.min(100, p.stamina + 10)));

  setTimeoutPanelText(
    "⏱️ TIMEOUT",
    "Choose a player on the court, then tap a bench player to substitute.",
    "Your five active players recovered 20 stamina. Bench players recovered 10."
  );

  setButtons(false);
  buttonsBox.classList.add("hidden");
  timeoutPanel.classList.remove("hidden");
  messageText.textContent = "Timeout! Pick a court player, then a bench player.";
  renderRosters();
  updateOdds();
});

// A free break at the end of a quarter: everyone rests a little and can substitute
function showBreak(title, resumeFn) {
  breakResume = resumeFn;
  inTimeout = true;
  subOut = null;
  p2SubOut = null;

  yourTeam.concat(yourBench, rivalTeam, rivalBench).forEach((p) => {
    p.stamina = Math.min(100, p.stamina + 10);
  });

  setTimeoutPanelText(
    "🏁 " + title,
    isTwo()
      ? "Both players: tap a court player, then a bench player to substitute."
      : "Choose a player on the court, then tap a bench player to substitute.",
    "Everyone recovered 10 stamina during the break."
  );

  buttonsBox.classList.add("hidden");
  defenseBox.classList.add("hidden");
  timeoutPanel.classList.remove("hidden");
  messageText.textContent = title + ": make your substitutions, then resume.";
  announce("quarterEnd", { title: title });
  playWhistleSound();
  renderRosters();
}

resumeButton.addEventListener("click", () => {
  inTimeout = false;
  subOut = null;
  p2SubOut = null;
  timeoutPanel.classList.add("hidden");

  // After a quarter break, carry on with the next round
  if (breakResume) {
    const next = breakResume;
    breakResume = null;
    renderRosters();
    next();
    return;
  }

  buttonsBox.classList.remove("hidden");
  setButtons(true);
  messageText.textContent = "Your turn. Pick a shooter and a shot.";
  renderRosters();
  updateOdds();
});

// ---------- Finding special players ----------
// A team's "star": the hottest player, or the best scorer
function findStar(team) {
  let best = team[0];
  let bestValue = -1;

  team.forEach((p) => {
    const value = p.streak * 100 + p.points * 10 + (p.inside + p.mid + p.three) / 30;
    if (value > bestValue) {
      bestValue = value;
      best = p;
    }
  });
  return best;
}

// The best open teammate to receive a pass
function findOpenMan(passerIndex, bonus) {
  let best = null;

  yourTeam.forEach((p, i) => {
    if (i === passerIndex) return;

    Object.keys(moves).forEach((moveKey) => {
      const value = getChance(moveKey, p, bonus) * moves[moveKey].points;
      if (!best || value > best.value) {
        best = { index: i, moveKey: moveKey, value: value };
      }
    });
  });
  return best;
}

// ---------- The Rival's brain ----------
// It looks at every player + shot combination and picks a good one
function rivalChoose() {
  const difference = score.rival - score.you;
  const options = [];
  let total = 0;

  rivalTeam.forEach((player, i) => {
    Object.keys(moves).forEach((moveKey) => {
      // Expected points = chance x points (including your defense!)
      const chance = getChance(moveKey, player, rivalModifier(moveKey, player));
      let value = chance * moves[moveKey].points;

      // Behind by 4 or more? Want threes. Ahead by 4 or more? Play safe.
      if (moveKey === "three" && difference <= -4) value *= 1.5;
      if (moveKey === "three" && difference >= 4) value *= 0.7;

      // Raising to a power makes the best options more likely to be picked.
      // Easy = 1 (almost random), Normal = 2, Hard = 4 (very sharp).
      value = Math.pow(value, settings.smart);

      options.push({ playerIndex: i, moveKey: moveKey, weight: value });
      total += value;
    });
  });

  let pick = Math.random() * total;
  for (const option of options) {
    pick -= option.weight;
    if (pick <= 0) return option;
  }
  return options[0];
}

// ---------- The Rival's bench and timeouts ----------
// Called between rounds. Returns a list of things that happened.
function rivalManage() {
  const notes = [];
  const changed = [];

  let total = 0;
  rivalTeam.forEach((p) => {
    total += p.stamina;
  });
  const avg = total / rivalTeam.length;
  const trailingLate = isLateGame() && score.you - score.rival >= 6;

  // Timeout when tired, or when losing late and not fully fresh
  if (rivalTimeouts > 0 && (avg < 45 || (trailingLate && avg < 70))) {
    rivalTimeouts--;
    rivalTeam.forEach((p) => (p.stamina = Math.min(100, p.stamina + 20)));
    rivalBench.forEach((p) => (p.stamina = Math.min(100, p.stamina + 10)));
    notes.push("⏱️ " + rivalShort + " called a timeout (" + rivalTimeouts + " left).");
    playTimeoutSound();
    announce("timeout", { who: "rival" });
  }

  // Swap out any exhausted starter for a much fresher bench player
  rivalTeam.forEach((p, i) => {
    if (p.stamina >= 30) return;

    let bestIndex = -1;
    rivalBench.forEach((b, j) => {
      const fresh = b.stamina > p.stamina + 20;
      if (fresh && (bestIndex === -1 || b.stamina > rivalBench[bestIndex].stamina)) {
        bestIndex = j;
      }
    });
    if (bestIndex === -1) return;

    const sub = rivalBench[bestIndex];
    rivalBench[bestIndex] = p;
    rivalTeam[i] = sub;
    changed.push(i);
    notes.push("🔄 " + rivalShort + " sub: #" + sub.num + " " + sub.name + " in for #" + p.num + " " + p.name + ".");
  });

  // Update the jersey numbers on the court dots (and pop the new players in)
  dotsRival.forEach((dot, i) => {
    dot.textContent = rivalTeam[i].num;
    styleDot(dot, rivalTeam[i]);
  });
  changed.forEach((i) => {
    const dot = dotsRival[i];
    dot.classList.remove("popIn");
    void dot.offsetWidth;
    dot.classList.add("popIn");
  });
  if (changed.length > 0) playSubSound();

  notes.forEach((n) => addToLog("Round " + round + ": " + n));
  return notes;
}

// ---------- Taking a shot ----------
function takeShot(moveKey, player, who, extra = 0) {
  const wasHot = isHot(player);
  const made = Math.random() < getChance(moveKey, player, extra);

  player.shots++;

  if (made) {
    player.made++;
    player.streak++;
    player.points += moves[moveKey].points;
    score[who] += moves[moveKey].points;

    if (who === "you" && moveKey === "three") {
      gameStats.threes++;
      if (gameStats.threes >= 5 && !isTwo()) unlockAchievement("threes5");
    }

    // Just caught fire? Flash!
    if (!wasHot && isHot(player)) heatUp(who, player);
  } else {
    player.streak = 0;
  }

  // Shooting is tiring (play calls cost extra stamina for your shooter)
  let cost = moves[moveKey].cost;
  if (who === "you" && player === yourTeam[selected]) cost += plays[currentPlay].cost;
  player.stamina = Math.max(0, player.stamina - cost);
  player.used = true;

  return made;
}

// ---------- Visual effects ----------
function showPopup(text, made) {
  popup.classList.remove("pop-made", "pop-miss");
  void popup.offsetWidth;
  popup.textContent = text;
  popup.classList.add(made ? "pop-made" : "pop-miss");
}

function shakeCourt() {
  court.classList.remove("shake");
  void court.offsetWidth;
  court.classList.add("shake");
}

// Slide the shooter toward the hoop (jumping!), then back to their spot
function moveDot(dot, spot, moveKey) {
  const hoop = getHoop();
  const toCenter = hoop.x > 300 ? -1 : 1;

  let target = spot;
  if (moveKey === "drive") target = { x: hoop.x + toCenter * 45, y: hoop.y };
  if (moveKey === "mid") target = { x: (spot.x + hoop.x) / 2, y: (spot.y + hoop.y) / 2 };

  dot.style.left = target.x + "px";
  dot.style.top = target.y + "px";

  // Jump when the shot goes up
  dot.classList.remove("jump");
  void dot.offsetWidth;
  dot.classList.add("jump");
  setTimeout(() => dot.classList.remove("jump"), 700);

  setTimeout(() => {
    dot.style.left = spot.x + "px";
    dot.style.top = spot.y + "px";
  }, 1100);
}

function launchConfetti() {
  const colors = ["#ffb84d", "#ff4d4d", "#4dd2ff", "#7dff4d", "#ff4dd2", "#ffe94d"];

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = 2 + Math.random() * 3 + "s";
    piece.style.animationDelay = Math.random() * 1.5 + "s";
    confetti.appendChild(piece);
  }

  setTimeout(() => {
    confetti.innerHTML = "";
  }, 7000);
}

function showScores() {
  yourScoreText.textContent = score.you;
  rivalScoreText.textContent = score.rival;
  gameStats.maxDeficit = Math.max(gameStats.maxDeficit, score.rival - score.you);
  renderRosters();
  checkLead();
  renderLiveBar();
}

function addToLog(text) {
  const item = document.createElement("li");
  item.textContent = text;
  logList.prepend(item); // newest at the top
}

// Show the result of one shot (yours or the Rival's)
function showShot(who, index, moveKey, made, note = "") {
  const team = who === "you" ? yourTeam : rivalTeam;
  const player = team[index];
  const move = moves[moveKey];
  const label = who === "you" ? "#" + player.num + " " + player.name : rivalShort + " #" + player.num + " " + player.name;
  const text = made
    ? label + " " + move.name + " and scored " + move.points + "! ✅" + note
    : label + " " + move.name + " and missed. ❌";

  messageText.textContent = text;
  addToLog("Round " + round + ": " + text);
  shootBall(getSpot(who, index), made);
  announce("shot", { who: who, player: player, moveKey: moveKey, made: made });

  if (made) {
    showPopup("+" + move.points + "!", true);
    playMadeSound();
    // Threes get a swish (and a cheer for yours) when the ball reaches the hoop
    if (moveKey === "three") {
      setTimeout(playSwishSound, 700);
      if (who === "you") setTimeout(() => playCheerSound(0.8), 800);
    }
  } else {
    showPopup("MISS", false);
    shakeCourt();
    playMissSound();
  }

  showScores();
}

// ---------- Free throws ----------
// How good a player is at the line (before timing)
function ftBase(player) {
  return 0.55 + (player.mid - 50) / 250;
}

// A human shoots: a marker slides back and forth, tap when it's in the green zone
// who = "you" (Player 1) or "rival" (Player 2 in 2-player games)
function startFreeThrows(player, count, done, who = "you") {
  ft = {
    player: player,
    who: who,
    left: count,
    total: count,
    made: 0,
    done: done,
    running: false,
    raf: null,
    pos: 50
  };

  buttonsBox.classList.add("hidden");
  defenseBox.classList.add("hidden");
  ftTitle.textContent = "🎯 FREE THROWS · #" + player.num + " " + player.name + " (" + count + " shots)";
  ftInfo.textContent = "Tap SHOOT when the marker is in the green zone!";

  if (isTwo()) {
    messageText.textContent = (who === "you" ? "Player 1" : "Player 2") + " is at the line. Time it right!";
  } else {
    messageText.textContent = "You're at the line. Time it right!";
  }
  announce("ftStart", { who: who, player: player });
  ftPanel.classList.remove("hidden");
  ftShootButton.disabled = false;
  startMarker();
}

function startMarker() {
  const start = performance.now();
  ft.running = true;

  function frame(now) {
    if (!ft || !ft.running) return;
    ft.pos = 50 + 50 * Math.sin((now - start) * settings.ftSpeed);
    ftMarker.style.left = ft.pos + "%";
    ft.raf = requestAnimationFrame(frame);
  }
  ft.raf = requestAnimationFrame(frame);
}

function takeFreeThrow() {
  if (!ft || !ft.running) return;

  ft.running = false;
  cancelAnimationFrame(ft.raf);
  ftShootButton.disabled = true;

  // How close to the middle did you stop? (the green zone is in the middle)
  const distance = Math.abs(ft.pos - 50);
  let quality;
  let bonus;
  if (distance <= 8) {
    quality = "Perfect timing!";
    bonus = 0.30;
  } else if (distance <= 20) {
    quality = "Good timing.";
    bonus = 0.10;
  } else {
    quality = "Bad timing.";
    bonus = -0.20;
  }

  const player = ft.player;
  const team = ft.who === "you" ? yourTeam : rivalTeam;
  const chance = Math.min(0.95, Math.max(0.10, ftBase(player) + bonus - (100 - player.stamina) / 400));
  const made = Math.random() < chance;

  if (made) {
    player.points++;
    score[ft.who]++;
    ft.made++;
    showPopup("+1", true);
    playMadeSound();
  } else {
    showPopup("MISS", false);
    playMissSound();
  }

  const index = Math.max(0, team.indexOf(player));
  shootBall(getSpot(ft.who, index), made);
  showScores();

  ft.left--;
  ftInfo.textContent = quality + (made ? " ✅ It's good!" : " ❌ No good.") + " (" + Math.round(chance * 100) + "% chance)";

  if (ft.left > 0) {
    later(() => {
      if (!ft) return;
      ftInfo.textContent = "Next shot! Tap SHOOT in the green.";
      ftShootButton.disabled = false;
      startMarker();
    }, 1100);
  } else {
    later(finishFreeThrows, 1300);
  }
}

function finishFreeThrows() {
  const text = "#" + ft.player.num + " " + ft.player.name + " makes " + ft.made + " of " + ft.total + " free throws. " +
    (ft.made === ft.total ? "✅" : ft.made === 0 ? "❌" : "➖");
  messageText.textContent = text;
  addToLog("Round " + round + ": " + text);
  announce("ftEnd", { who: ft.who, player: ft.player, made: ft.made, total: ft.total });

  ftPanel.classList.add("hidden");
  const done = ft.done;
  ft = null;
  done();
}

ftShootButton.addEventListener("click", takeFreeThrow);

// SPACE also shoots
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && ft && ft.running && !event.repeat) {
    event.preventDefault();
    takeFreeThrow();
  }
});

// The Rival's free throws are rolled by the computer
function rivalFreeThrows(player, count) {
  const index = Math.max(0, rivalTeam.indexOf(player));
  const chance = Math.min(0.85, Math.max(0.30, 0.45 + (player.mid - 50) / 250));
  let made = 0;
  for (let i = 0; i < count; i++) {
    if (Math.random() < chance) made++;
  }

  player.points += made;
  score.rival += made;

  const text = rivalShort + " #" + player.num + " " + player.name + " makes " + made + " of " + count + " free throws. " +
    (made === count ? "✅" : made === 0 ? "❌" : "➖");
  messageText.textContent = text;
  addToLog("Round " + round + ": " + text);
  shootBall(getSpot("rival", index), made > 0);

  if (made > 0) {
    showPopup("+" + made + " FT", true);
    playMadeSound();
  } else {
    showPopup("MISS", false);
    playMissSound();
  }

  showScores();
}

// ---------- Playing a round ----------
// PART 1: your offense (a shot or a pass)
function playRound(moveKey) {
  if (locked) return;
  locked = true;
  setButtons(false);

  let wait = 1600;
  let fouled = null; // set if your missed drive draws a foul

  roundSeconds += secondsFor(moveKey);

  if (moveKey === "pass") {
    wait = 2300; // a pass takes longer: the ball travels first
    doPass();
  } else {
    const shooter = yourTeam[selected];
    if (currentPlay !== "standard") gameStats.calls[currentPlay] = true;

    const made = takeShot(moveKey, shooter, "you");
    moveDot(dotsYou[selected], getSpot("you", selected), moveKey);
    showShot("you", selected, moveKey, made);

    // A missed drive can draw a foul: you go to the free-throw line!
    if (!made && moveKey === "drive" && Math.random() < foulDrawChance) {
      fouled = shooter;
      messageText.textContent += " 🚨 Fouled on the drive!";
      addToLog("Round " + round + ": 🚨 #" + shooter.num + " " + shooter.name + " was fouled on the drive!");
      announce("foul", { type: "drawn", who: "you", player: shooter });
      playFoulSound();
      roundSeconds += 3;
    }
  }

  // Then free throws (if fouled), then it's time to pick your defense
  if (fouled) {
    later(() => startFreeThrows(fouled, 2, afterOffense, "you"), wait);
  } else {
    later(afterOffense, wait);
  }
}

// In "First to 21" the game can end right after your shot
function afterOffense() {
  if (activeGM === "target" && isGameOver()) {
    renderRosters();
    endGame();
    return;
  }
  startDefense();
}

function doPass() {
  const passer = yourTeam[selected];
  passer.stamina = Math.max(0, passer.stamina - passCost);
  passer.used = true;

  const safe = Math.random() < getPassChance(passer);
  const from = getSpot("you", selected);

  // Turnover! The ball goes to a defender and the Rival gets a fast break.
  if (!safe) {
    fastBreakBonus = 0.10;
    const defender = getSpot("rival", selected);
    placeBall(from.x, from.y, false);
    void ball.offsetWidth;
    placeBall(defender.x, defender.y, true, 500);

    const text = "Turnover! #" + passer.num + " " + passer.name + " threw it away. " + rivalShort + " is on the break! ❌";
    messageText.textContent = text;
    addToLog("Round " + round + ": " + text);
    announce("turnover", { who: "you", player: passer });
    showPopup("TURNOVER", false);
    shakeCourt();
    playMissSound();
    showScores();
    return;
  }

  // Good pass! The ball travels to the best open teammate, who shoots with a bonus.
  // A Floor General makes the open look even better.
  const bonus = passer.ability === "floorGeneral" ? openLookBonus + 0.05 : openLookBonus;
  const open = findOpenMan(selected, bonus);
  const receiver = yourTeam[open.index];
  const to = getSpot("you", open.index);

  messageText.textContent = passer.name + " finds " + receiver.name + " open...";
  placeBall(from.x, from.y, false);
  void ball.offsetWidth;
  placeBall(to.x, to.y, true, 500);

  later(() => {
    const made = takeShot(open.moveKey, receiver, "you", bonus);

    if (made) {
      passer.assists++;
    }

    const dot = dotsYou[open.index];
    dot.classList.add("shooting");
    moveDot(dot, to, open.moveKey);
    setTimeout(() => dot.classList.remove("shooting"), 1200);

    const note = made ? " 🅰️ Assist: " + passer.name : "";
    showShot("you", open.index, open.moveKey, made, note);
  }, 600);
}

// PART 2: you pick a defense
function startDefense() {
  buttonsBox.classList.add("hidden");
  myFastBreak = 0; // the steal bonus only lasts for one possession
  p2Defense = null; // Player 2's defense only lasts for one of your possessions
  p2DoubleTarget = null;
  defenseOwner = "p1";

  doubleTargetPlayer = findStar(rivalTeam);
  doubleTargetText.textContent = "Shut down #" + doubleTargetPlayer.num + " " + doubleTargetPlayer.name;

  stealOddsText.textContent = Math.round(getStealChance() * 100);
  foulsLeftText.textContent = foulsLeft;
  foulButton.disabled = foulsLeft <= 0;

  // Steals and fouls aren't used in 2-player games
  stealButton.classList.toggle("hidden", isTwo());
  foulButton.classList.toggle("hidden", isTwo());

  defenseTitle.textContent = isTwo() ? "🛡️ PLAYER 1: pick your defense" : "🛡️ Now pick your defense";
  defenseBox.classList.remove("hidden");
  messageText.textContent = isTwo()
    ? "Player 1: pick your defense for Player 2's possession."
    : "Pick your defense for " + rivalShort + "'s possession.";
}

// 2-player: Player 2 picks a defense against Player 1's next possession
function startP2Defense() {
  buttonsBox.classList.add("hidden");
  defenseOwner = "p2";

  p2DoubleTarget = findStar(yourTeam);
  doubleTargetText.textContent = "Shut down #" + p2DoubleTarget.num + " " + p2DoubleTarget.name;

  stealButton.classList.add("hidden");
  foulButton.classList.add("hidden");

  defenseTitle.textContent = "🛡️ PLAYER 2: pick your defense";
  defenseBox.classList.remove("hidden");
  messageText.textContent = "Player 2: pick your defense for Player 1's possession.";
}

function chooseDefense(defenseKey) {
  defenseBox.classList.add("hidden");

  // Player 2's choice (2-player): then Player 1's next round begins
  if (defenseOwner === "p2") {
    p2Defense = defenseKey;
    defenseOwner = "p1";
    beginNextRound();
    return;
  }

  // Steal attempt: works = no Rival shot and you get a fast break
  if (defenseKey === "stealAttempt") {
    roundSeconds += 6;
    if (Math.random() < getStealChance()) {
      stealSuccess();
      return;
    }
    currentDefense = "stealFail";
    messageText.textContent = "The steal attempt fails! " + rivalShort + " gets an open look. Switching ends...";
    addToLog("Round " + round + ": The steal attempt failed. ❌");
    playMissSound();
    setPossession("rival");
    later(rivalTurn, 1500);
    return;
  }

  // Foul: the Rival shoots free throws instead of a normal shot
  if (defenseKey === "foul") {
    foulsLeft--;
    gameStats.fouls++;
    renderLiveBar();
    currentDefense = null;
    roundSeconds += 4;
    messageText.textContent = "🚨 You take a foul! Free throws coming up. Switching ends...";
    announce("foul", { type: "committed", who: "you" });
    playFoulSound();
    setPossession("rival");
    later(foulTurn, 1500);
    return;
  }

  currentDefense = defenseKey;

  const names = {
    guardThree: "You're guarding the three!",
    protectRim: "You're protecting the rim!",
    doubleTeam: "You're double-teaming #" + doubleTargetPlayer.num + " " + doubleTargetPlayer.name + "!"
  };
  messageText.textContent = names[defenseKey] + " Switching ends...";

  // Everyone runs to the other end of the court
  setPossession("rival");

  later(rivalTurn, 1500);
}

// A successful steal: the Rival doesn't get to shoot
function stealSuccess() {
  const thief = yourTeam[Math.floor(Math.random() * yourTeam.length)];
  myFastBreak = 0.15;

  gameStats.steals++;
  if (gameStats.steals >= 3) unlockAchievement("steals3");

  const text = "🖐️ STEAL! #" + thief.num + " " + thief.name + " picks " + rivalShort + "'s pocket. Fast break next!";
  messageText.textContent = text;
  addToLog("Round " + round + ": " + text);
  announce("steal", { who: "you", player: thief });
  showPopup("STEAL!", true);
  playStealSound();
  playCheerSound(0.7);

  later(finishRound, 1700);
}

// Your foul: a random Rival player shoots 2 free throws, and hot streaks are broken
function foulTurn() {
  const index = Math.floor(Math.random() * rivalTeam.length);
  const shooter = rivalTeam[index];
  rivalShooter = index;

  rivalTeam.forEach((p) => (p.streak = 0));
  rivalFreeThrows(shooter, 2);

  later(finishRound, 1700);
}

// PART 3: the Rival's possession
// (the computer picks the shot, or in 2-player games Player 2 does)
function rivalTurn() {
  if (isTwo()) {
    showP2Offense();
    return;
  }
  rivalShoot(rivalChoose());
}

// ----- Player 2 picks a shooter and a shot (2-player) -----
function renderP2Shooters() {
  p2Shooters.innerHTML = rivalTeam
    .map((p, i) =>
      '<button class="p2Shooter' + (i === p2Selected ? " selected" : "") + '" data-i="' + i + '">' +
        '#' + p.num + ' ' + p.name + '<small>' + p.stamina + ' stamina</small>' +
      '</button>')
    .join("");
  rivalShooter = p2Selected; // highlights his card on the right
  renderRosters();
}

function updateP2Odds() {
  const player = rivalTeam[p2Selected];
  document.getElementById("p2DriveOdds").textContent = Math.round(getChance("drive", player, rivalModifier("drive", player)) * 100);
  document.getElementById("p2MidOdds").textContent = Math.round(getChance("mid", player, rivalModifier("mid", player)) * 100);
  document.getElementById("p2ThreeOdds").textContent = Math.round(getChance("three", player, rivalModifier("three", player)) * 100);
}

function showP2Offense() {
  p2Selected = 0;
  renderP2Shooters();
  updateP2Odds();
  messageText.textContent = "🎮 Player 2: pick your shooter and a shot.";
  announce("p2ball");
  p2Box.classList.remove("hidden");
}

p2Shooters.addEventListener("click", (event) => {
  const btn = event.target.closest(".p2Shooter");
  if (!btn) return;
  p2Selected = Number(btn.dataset.i);
  renderP2Shooters();
  updateP2Odds();
});

p2Shots.addEventListener("click", (event) => {
  const btn = event.target.closest("button[data-shot]");
  if (!btn) return;
  p2Box.classList.add("hidden");
  rivalShoot({ playerIndex: p2Selected, moveKey: btn.dataset.shot });
});

// The Rival's (or Player 2's) shot
function rivalShoot(choice) {
  const rivalPlayer = rivalTeam[choice.playerIndex];
  rivalShooter = choice.playerIndex;
  roundSeconds += 8 + Math.floor(Math.random() * 5);

  const rivalMade = takeShot(
    choice.moveKey,
    rivalPlayer,
    "rival",
    rivalModifier(choice.moveKey, rivalPlayer)
  );

  const dot = dotsRival[choice.playerIndex];
  dot.classList.add("shooting");
  moveDot(dot, getSpot("rival", choice.playerIndex), choice.moveKey);
  setTimeout(() => dot.classList.remove("shooting"), 1200);

  showShot("rival", choice.playerIndex, choice.moveKey, rivalMade);

  // A missed drive can also draw a foul
  if (!rivalMade && choice.moveKey === "drive" && Math.random() < foulDrawChance) {
    roundSeconds += 3;

    if (isTwo()) {
      // Player 2 shoots the free throws himself
      later(() => {
        announce("foul", { type: "drawn", who: "rival", player: rivalPlayer });
        playFoulSound();
        startFreeThrows(rivalPlayer, 2, finishRound, "rival");
      }, 1500);
    } else {
      later(() => {
        announce("foul", { type: "drawn", who: "rival", player: rivalPlayer });
        playFoulSound();
        rivalFreeThrows(rivalPlayer, 2);
      }, 1500);
      later(finishRound, 3400);
    }
    return;
  }

  later(finishRound, 1700);
}

// Players who sat out this round get some stamina back
// (bench players always count as resting; Coach "Conditioning" helps YOUR players)
function recoverStamina() {
  const extra = coachLvl("recover") * 2;

  yourTeam.concat(yourBench, rivalTeam, rivalBench).forEach((p) => {
    if (!p.used) {
      const mine = yourTeam.includes(p) || yourBench.includes(p);
      p.stamina = Math.min(100, p.stamina + recovery + (mine ? extra : 0));
    }
    p.used = false;
  });
}

// The end of a round: use up game time, check if the game is over, quarter breaks...
function finishRound() {
  rivalShooter = -1;
  currentDefense = null;
  fastBreakBonus = 0;

  // Game time passes
  if (isTimed()) clock = Math.max(0, clock - roundSeconds);
  roundSeconds = 0;

  if (isGameOver()) {
    renderRosters();
    endGame();
    return;
  }

  round++;

  // Time ran out and it's tied? Overtime!
  if (isTimed() && clock <= 0) {
    overtime = true;
    clock = overtimeLen;
    announce("overtime");
  }
  updateClockDisplay();

  if (isTimed() && !overtime && clock <= 25 && !finalWarned) {
    finalWarned = true;
    announce("finalPossession");
  }

  const proceed = isTwo() ? startP2Defense : beginNextRound;

  // End of a quarter: a free break to make substitutions
  if (isTimed() && !overtime) {
    const q = quarterNumber();
    if (q > lastQuarter) {
      const ended = lastQuarter;
      lastQuarter = q;
      showBreak("END OF Q" + ended, proceed);
      return;
    }
  }

  proceed();
}

// Sets up your next possession
function beginNextRound() {
  recoverStamina();
  const rivalNotes = isTwo() ? [] : rivalManage();
  newSituation();
  setPlay("standard"); // pick your play call again each round
  renderRosters();
  updateClockDisplay();

  // Everyone runs back to your attacking end
  setPossession("you");

  buttonsBox.classList.remove("hidden");
  messageText.textContent = (isTwo() ? "Player 1: " : "") + "Your turn. Pick a shooter and a shot." +
    (rivalNotes.length ? " " + rivalNotes.join(" ") : "");
  locked = false;
  setButtons(true);
}

// ---------- End of the game ----------
// One team's box score table
function boxTable(title, starters, bench, mvp, cssClass) {
  let html =
    '<table class="boxTable ' + cssClass + '">' +
      '<caption>' + title + '</caption>' +
      '<tr><th>Player</th><th>PTS</th><th>AST</th><th>FG</th><th>STA</th></tr>';

  function row(p, isBench) {
    return '<tr class="' + (isBench ? "benchRow" : "") + (p === mvp ? " mvpRow" : "") + '">' +
      '<td>#' + p.num + ' ' + p.name + (p === mvp ? ' ⭐' : '') + (p.injured ? ' 🤕' : '') + (isBench ? ' <em>(bench)</em>' : '') + '</td>' +
      '<td>' + p.points + '</td>' +
      '<td>' + p.assists + '</td>' +
      '<td>' + p.made + '/' + p.shots + '</td>' +
      '<td>' + p.stamina + '</td>' +
    '</tr>';
  }

  starters.forEach((p) => (html += row(p, false)));
  bench.forEach((p) => (html += row(p, true)));
  html += '</table>';
  return html;
}

function endGame() {
  gameEnded = true;
  const won = score.you > score.rival;
  const two = isTwo();
  let result;

  if (two) {
    result = "🏆 " + (won ? "PLAYER 1" : "PLAYER 2") + " wins " + Math.max(score.you, score.rival) + " to " + Math.min(score.you, score.rival) + "!";
    launchConfetti();
    playWinSound();
    playCheerSound(1.8);
  } else if (won) {
    result = "🏆 You win " + score.you + " to " + score.rival + "!";
    launchConfetti();
    playWinSound();
    playCheerSound(1.8);
  } else {
    result = "😤 " + rivalShort + " wins " + score.rival + " to " + score.you + ".";
  }

  let reward = 0;
  let extraText = "";

  nextGameButton.classList.add("hidden");
  playAgainButton.classList.add("hidden");

  if (two) {
    // 2-player games are just for fun: no coins, records or achievements
    playAgainButton.classList.remove("hidden");
  } else {
    // Coins (more for beating harder Rivals)
    reward = won ? settings.win : settings.lose;
    let champion = false;

    // Records
    const rec = save.stats[save.difficulty];
    if (won) {
      rec.wins++;
      rec.streak++;
      rec.bestStreak = Math.max(rec.bestStreak, rec.streak);
    } else {
      rec.losses++;
      rec.streak = 0;
    }
    rec.best = Math.max(rec.best, score.you);

    if (mode === "tournament") {
      if (won && tourneyStage < stageNames.length - 1) {
        extraText = " ✅ You advance to the " + stageNames[tourneyStage + 1] + "!";

        // Warn about exhausted players (they might be injured for the next game)
        const spent = yourTeam.concat(yourBench).filter((p) => p.stamina === 0).map((p) => p.name);
        if (spent.length > 0) {
          extraText += " ⚠️ " + spent.join(", ") + " finished exhausted and could miss the next game.";
        }

        nextGameButton.textContent = "NEXT: " + stageNames[tourneyStage + 1].toUpperCase();
        nextGameButton.classList.remove("hidden");
      } else if (won) {
        const bonus = championBonus[save.difficulty];
        reward += bonus;
        save.titles++;
        champion = true;
        extraText = " 👑 TOURNAMENT CHAMPION! Bonus +" + bonus + " coins!";
      } else {
        extraText = " ❌ Eliminated in the " + stageNames[tourneyStage] + ".";
      }
    } else if (mode === "season") {
      // modes.js records the result, simulates the other games and tells us what to show
      extraText = seasonGameDone(won);
      nextGameButton.textContent = season.phase === "done" ? "📅 SEASON SUMMARY" : "📅 BACK TO SEASON";
      nextGameButton.classList.remove("hidden");
    } else {
      playAgainButton.classList.remove("hidden");
    }

    save.coins += reward;
    writeSave();
    updateCoinBars();
    renderRecords();
    checkEndAchievements(won, champion);
  }

  // Find the player with the most points on either team (bench included)
  const everyone = yourTeam.concat(yourBench, rivalTeam, rivalBench);
  let mvp = everyone[0];
  everyone.forEach((p) => {
    if (p.points > mvp.points) mvp = p;
  });

  announce("final", { won: won, mvp: mvp });
  renderLiveBar();

  messageText.textContent = "Game over! " + result + " ⭐ MVP: " + mvp.name + " (" + mvp.points + " pts)" +
    (two ? "" : " 💰 +" + reward + " coins.") + extraText;
  situationText.textContent = "Final buzzer!";
  buttonsBox.classList.add("hidden");
  menuButton.classList.remove("hidden");

  // Box score for both teams
  const youTitle = two ? "PLAYER 1" : "YOUR TEAM";
  const rivalTitle = two ? "PLAYER 2" : rivalName;
  boxScoreBox.innerHTML =
    '<h3>📋 BOX SCORE</h3>' +
    '<div class="boxTables">' +
      boxTable(youTitle + " · " + score.you, yourTeam, yourBench, mvp, "you") +
      boxTable(rivalTitle + " · " + score.rival, rivalTeam, rivalBench, mvp, "rival") +
    '</div>';
  boxScoreBox.classList.remove("hidden");
}

// ---------- Starting and restarting ----------
// A short tip-off banner before every game
function showIntro(title, sub, note) {
  locked = true;
  setButtons(false);

  introTitle.textContent = title;
  introSub.innerHTML = sub + (note ? "<br>" + note : "");
  intro.classList.remove("hidden");
  playWhistleSound();

  later(() => {
    intro.classList.add("hidden");
    locked = false;
    setButtons(true);
    announce("tipoff");
  }, note ? 3000 : 2200);
}

function avgOverall(team) {
  let total = 0;
  team.forEach((p) => {
    total += overall(p);
  });
  return Math.round(total / team.length);
}

// The team names on the scoreboard and above the rosters
function setTeamNames() {
  document.querySelector("#youBox h2").textContent = isTwo() ? "PLAYER 1" : "YOU";
  document.querySelector("#rivalBox h2").textContent = isTwo() ? "PLAYER 2" : rivalName;
  document.querySelector(".youTitle").textContent = isTwo() ? "PLAYER 1" : "YOUR TEAM";
  document.querySelector(".rivalTitle").textContent = isTwo() ? "PLAYER 2" : (rivalName === "RIVAL" ? "RIVAL TEAM" : rivalName);
  rivalLogo.innerHTML = (!isTwo() && rivalTeamObj) ? teamLogoHtml(rivalTeamObj, 46) : "";
}

function startGame() {
  gameSession++;
  let injuryNote = "";

  if (continueSquad) {
    // Same squad as last game: exhausted players may be hurt, the rest get some rest
    injuryNote = rollInjuries();
    carryOver(yourTeam);
    carryOver(yourBench);
    benchInjured();
  } else {
    yourTeam = makeTeam(yourPick);
    yourBench = makeTeam(yourBenchPick);
  }
  rivalTeam = makeTeam(rivalPick);
  rivalBench = makeTeam(rivalBenchPick);

  score = { you: 0, rival: 0 };
  round = 1;
  overtime = false;
  selected = 0;
  rivalShooter = -1;
  possession = "you";
  currentDefense = null;
  doubleTargetPlayer = null;
  fastBreakBonus = 0;
  myFastBreak = 0;
  locked = false;
  timeoutsLeft = isTwo() ? 0 : 3 + coachLvl("timeout");
  rivalTimeouts = settings.timeouts;
  foulsLeft = startingFouls + coachLvl("fouls");
  inTimeout = false;
  subOut = null;
  p2SubOut = null;
  ft = null;
  lastLeader = "tie";
  p2Defense = null;
  p2DoubleTarget = null;
  defenseOwner = "p1";
  breakResume = null;
  finalWarned = false;
  roundSeconds = 0;
  gameStats = { threes: 0, steals: 0, fouls: 0, maxDeficit: 0, maxChem: 0, calls: {} };

  // The game clock
  const gm = gameModes[activeGM];
  if (gm.quarters) {
    numQuarters = gm.quarters;
    quarterLen = gm.quarterLen;
    gameLen = numQuarters * quarterLen;
    clock = gameLen;
  } else {
    gameLen = 0;
    clock = 0;
  }
  lastQuarter = 1;

  setTeamNames();
  logList.innerHTML = "";
  confetti.innerHTML = "";
  popup.textContent = "";
  gameEnded = false;
  resetCommentary();
  updateClockDisplay();

  let tag;
  if (isTwo()) tag = "👥 2 PLAYERS · " + gm.label.toUpperCase();
  else if (mode === "tournament") tag = "🏆 " + stageNames[tourneyStage].toUpperCase() + " · " + settings.label.toUpperCase();
  else if (mode === "season") tag = modeTag + " · " + settings.label.toUpperCase();
  else tag = gm.label.toUpperCase() + " · " + settings.label.toUpperCase();
  diffTag.textContent = tag;

  messageText.textContent = "Pick a shooter and a shot.";
  playAgainButton.classList.add("hidden");
  nextGameButton.classList.add("hidden");
  menuButton.classList.add("hidden");
  boxScoreBox.classList.add("hidden");
  defenseBox.classList.add("hidden");
  timeoutPanel.classList.add("hidden");
  ftPanel.classList.add("hidden");
  p2Box.classList.add("hidden");
  buttonsBox.classList.remove("hidden");

  // 2-player games have no play calls or timeouts (quarter breaks are for substitutions)
  playBar.classList.toggle("hidden", isTwo());
  timeoutControls.classList.toggle("hidden", isTwo());

  buildDots();
  setPossession("you", false);
  updateChemistry();
  newSituation();
  setPlay("standard");
  showScores();
  setButtons(true);

  // Tip-off banner
  let title = "🏀 TIP-OFF!";
  if (mode === "tournament") title = "🏆 " + stageNames[tourneyStage].toUpperCase();
  if (mode === "season") title = modeTag;
  const yourName = isTwo() ? "Player 1" : "You";
  const theirName = isTwo() ? "Player 2" : rivalShort;
  const logo = (!isTwo() && rivalTeamObj) ? '<div class="introLogo">' + teamLogoHtml(rivalTeamObj, 96) + '</div>' : "";
  const sub = logo + yourName + " (" + avgOverall(yourTeam) + ") vs " + theirName + " (" + avgOverall(rivalTeam) + ") · " +
    gm.label + (isTwo() ? "" : " · " + settings.label);
  showIntro(title, sub, injuryNote);
}

function showGame() {
  showScreen(gameScreen);
  fitCourt();
  startGame();
}

// Back to the title screen
function showMenu() {
  showScreen(titleScreen);
  confetti.innerHTML = "";
  renderRecords();
  updateCoinBars();
}

// Leave a game that is in progress (the 🏠 MENU button)
function leaveGame() {
  gameSession++; // every timer of the old game is now ignored
  if (ft && ft.raf) cancelAnimationFrame(ft.raf);
  ft = null;
  inTimeout = false;
  subOut = null;
  p2SubOut = null;
  breakResume = null;
  locked = false;
  [ftPanel, intro, p2Box, defenseBox, timeoutPanel].forEach((el) => el.classList.add("hidden"));
  if (typeof stopSpeaking === "function") stopSpeaking();

  // In a season you go back to the standings (you can play that game again)
  if (mode === "season" && typeof season !== "undefined" && season && season.phase !== "done") {
    showSeasonScreen();
  } else {
    showMenu();
  }
}

quitButton.addEventListener("click", () => {
  if (gameEnded || confirm("Leave this game? Your progress in this game will be lost.")) {
    leaveGame();
  }
});

// ---------- Team picker ----------
const posOrder = { PG: 1, SG: 2, SF: 3, PF: 4, C: 5 };
const tierNames = { common: "Common", rare: "Rare", epic: "Epic", legendary: "Legendary" };
const squadSize = 8; // 5 starters + 3 bench
let pickedIds = [];

// A player's overall rating is the average of his three ratings
function overall(p) {
  return Math.round((p.inside + p.mid + p.three) / 3);
}

// Sorts players so they land in sensible spots on the court (PG first, C last)
function byPosition(a, b) {
  return posOrder[a.pos] - posOrder[b.pos];
}

// Fair shuffle (returns a new array)
function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ----- Upgrades -----
function upgradeLevel(id) {
  return save.upgrades[id] || 0;
}

function upgradeCost(p) {
  return upgradeBase[p.tier] * (upgradeLevel(p.id) + 1);
}

// Returns the player with his upgrades added to every rating (max 99)
function withUpgrade(p) {
  const level = upgradeLevel(p.id);
  if (!level) return p;
  return {
    ...p,
    inside: Math.min(99, p.inside + level),
    mid: Math.min(99, p.mid + level),
    three: Math.min(99, p.three + level),
    level: level
  };
}

function upgradePlayer(id) {
  const p = allPlayers.find((x) => x.id === id);
  if (!p) return;

  const level = upgradeLevel(id);
  if (level >= maxLevel) {
    packResult.textContent = p.name + " is already fully upgraded!";
    return;
  }

  const cost = upgradeCost(p);
  if (save.coins < cost) {
    packResult.textContent = "You need " + (cost - save.coins) + " more coins to upgrade " + p.name + ".";
    return;
  }

  save.coins -= cost;
  save.upgrades[id] = level + 1;
  writeSave();
  updateCoinBars();
  packResult.textContent = "⬆ " + p.name + " is now level " + (level + 1) + "! (+" + (level + 1) + " to every rating)";
  if (level + 1 >= maxLevel) unlockAchievement("maxed");
  renderPicker();
}

function showPicker() {
  showScreen(pickScreen);
  packResult.textContent = "";

  if (mode === "tournament") {
    modeNote.textContent = "🏆 Tournament: win " + stageNames.length + " games in a row. Your stamina carries over, and exhausted players can get injured!";
  } else if (mode === "season") {
    modeNote.textContent = "📅 Season: 10 games, then playoffs for the top 4. Stamina carries over and exhausted players can get injured. (Season progress isn't saved if you close the page.)";
  } else if (isTwo()) {
    modeNote.textContent = pickPhase === 1
      ? "👥 PLAYER 1: pick your squad. Player 2 picks next."
      : "👥 PLAYER 2: pass the device! Pick your squad. (Player 1's players are taken.)";
  } else {
    modeNote.textContent = "";
  }

  updateCoinBars();
  renderTeamFilter();
  renderPicker();
}

// ----- Team filter and drafting a whole team -----
function renderTeamFilter() {
  let html = '<button class="teamChip' + (pickFilter === "all" ? " selected" : "") + '" data-team="all">ALL</button>';

  allTeams.forEach((t) => {
    html +=
      '<button class="teamChip' + (pickFilter === t.id ? " selected" : "") + '" data-team="' + t.id + '" title="' + t.name + '">' +
        teamLogoHtml(t, 26) + '<span>' + t.short + '</span>' +
      '</button>';
  });

  teamFilter.innerHTML = html;

  const team = teamLookup[pickFilter];
  draftButton.classList.toggle("hidden", !team);
  if (team) draftButton.textContent = "⚡ DRAFT THE " + team.name.toUpperCase();
}

teamFilter.addEventListener("click", (event) => {
  const btn = event.target.closest(".teamChip");
  if (!btn) return;
  pickFilter = btn.dataset.team;
  renderTeamFilter();
  renderPicker();
});

// Picks a team's best players for you: the best at each position start, then the best of the rest
function draftTeam(teamId) {
  const team = teamLookup[teamId];
  if (!team) return;

  const taken = isTwo() && pickPhase === 2 ? p1Picked.map((p) => p.id) : [];
  const usable = (p) => save.owned.includes(p.id) && !taken.includes(p.id);
  const best = (a, b) => overall(withUpgrade(b)) - overall(withUpgrade(a));

  const roster = allPlayers.filter((p) => p.team === teamId && usable(p));
  const chosen = [];

  ["PG", "SG", "SF", "PF", "C"].forEach((pos) => {
    const top = roster.filter((p) => p.pos === pos).sort(best)[0];
    if (top) chosen.push(top);
  });
  roster.filter((p) => !chosen.includes(p)).sort(best).forEach((p) => {
    if (chosen.length < squadSize) chosen.push(p);
  });

  // Not enough of his players unlocked? Fill the squad with your best other players
  allPlayers.filter((p) => usable(p) && !chosen.includes(p)).sort(best).forEach((p) => {
    if (chosen.length < squadSize) chosen.push(p);
  });

  pickedIds = chosen.map((p) => p.id);
  const fromTeam = chosen.filter((p) => p.team === teamId).length;
  packResult.textContent = "⚡ Drafted " + fromTeam + " players from the " + team.name +
    (fromTeam < squadSize ? " (the rest are your best other players)." : "!");
  renderPicker();
}

draftButton.addEventListener("click", () => draftTeam(pickFilter));

function renderPicker() {
  let html = "";

  allPlayers.forEach((base) => {
    if (pickFilter !== "all" && base.team !== pickFilter) return;

    const p = withUpgrade(base);
    const team = teamOf(p);
    const owned = save.owned.includes(p.id);
    const taken = isTwo() && pickPhase === 2 && p1Picked.some((x) => x.id === p.id);
    const pickedAt = pickedIds.indexOf(p.id);
    const chosen = pickedAt !== -1 ? " chosen" : "";
    const lockedClass = owned ? "" : " locked";
    const takenClass = taken ? " taken" : "";

    const abilityHtml = p.ability
      ? '<div class="abilityName">' + abilityInfo[p.ability].name + '</div>' +
        '<div class="abilityText">' + abilityInfo[p.ability].text + '</div>'
      : "";

    const roleText = pickedAt === -1 ? "" : (pickedAt < 5 ? "★ START" : "🪑 BENCH");
    const levelBadge = p.level ? '<span class="lvl">+' + p.level + '</span>' : "";
    const teamRow = team
      ? '<div class="teamRow">' + teamLogoHtml(team, 16) + '<span>' + team.name + '</span></div>'
      : "";

    let bottomHtml;
    if (taken) {
      bottomHtml = '<div class="lockTag">Player 1\'s pick</div>';
    } else if (!owned) {
      bottomHtml = '<div class="lockTag">🔒 ' + prices[p.tier] + ' coins</div>';
    } else if (upgradeLevel(p.id) >= maxLevel) {
      bottomHtml = '<div class="maxTag">⭐ MAX LEVEL</div>';
    } else {
      bottomHtml = '<button class="upgradeBtn" data-id="' + p.id + '">⬆ LV ' + (upgradeLevel(p.id) + 1) + ' · ' + upgradeCost(base) + '💰</button>';
    }

    html +=
      '<div class="pickCard ' + p.tier + chosen + lockedClass + takenClass + '" data-id="' + p.id + '">' +
        '<span class="check">' + roleText + '</span>' +
        '<div class="tierTag">' + tierNames[p.tier] + '</div>' +
        '<div class="pavatar">' + avatarHtml(p, 64) + '</div>' +
        '<div class="topRow">' +
          '<span class="num">' + p.num + '</span>' +
          '<span class="pname">' + p.name + levelBadge + '</span>' +
          '<span class="pos">' + p.pos + '</span>' +
        '</div>' +
        teamRow +
        '<div class="ratings">' +
          '<div><span>INS</span><b>' + p.inside + '</b></div>' +
          '<div><span>MID</span><b>' + p.mid + '</b></div>' +
          '<div><span>3PT</span><b>' + p.three + '</b></div>' +
        '</div>' +
        '<div class="ovr">Overall ' + overall(p) + '</div>' +
        abilityHtml +
        bottomHtml +
      '</div>';
  });

  pickGrid.innerHTML = html;
  updatePickInfo();
}

function updatePickInfo() {
  let text = pickedIds.length + " of " + squadSize + " picked";

  if (pickedIds.length > 0) {
    let total = 0;
    pickedIds.forEach((id) => {
      total += overall(withUpgrade(allPlayers.find((p) => p.id === id)));
    });
    text += " · Team rating " + Math.round(total / pickedIds.length);
  }

  pickCount.textContent = text;
  playButton.disabled = pickedIds.length !== squadSize;
  playButton.textContent = (isTwo() && pickPhase === 1) ? "NEXT: PLAYER 2 →" : "PLAY";

  // Chemistry preview for your 5 starters (the first 5 picked)
  if (pickedIds.length < 5) {
    pickChem.textContent = "🤝 Pick 5 starters to see your team chemistry.";
  } else {
    const starters = pickedIds.slice(0, 5).map((id) => withUpgrade(allPlayers.find((p) => p.id === id)));
    const list = calcChemistry(starters);
    pickChem.textContent = list.length === 0
      ? "🤝 Chemistry: none. Try mixing positions (Epic+ PG with an Epic+ C, a PF with a C, and so on)."
      : "🤝 Chemistry: " + list.map((c) => c.name + " (" + c.text.split(": ")[1] + ")").join(" · ");
  }
}

// Buy a locked player with coins
function buyPlayer(player) {
  const price = prices[player.tier];

  if (save.coins < price) {
    packResult.textContent = "You need " + (price - save.coins) + " more coins for " + player.name + ". Win games to earn coins!";
    return;
  }

  if (!confirm("Buy " + player.name + " for " + price + " coins?")) return;

  save.coins -= price;
  save.owned.push(player.id);
  writeSave();
  updateCoinBars();
  packResult.textContent = "✅ You unlocked " + player.name + "!";
  if (player.tier === "legendary") unlockAchievement("legend");
  renderPicker();
}

// Open a pack: a random locked player (legendaries are rarer than epics)
packButton.addEventListener("click", () => {
  if (save.coins < packCost) {
    packResult.textContent = "A pack costs " + packCost + " coins. You have " + save.coins + ".";
    return;
  }

  const lockedPlayers = allPlayers.filter((p) => !save.owned.includes(p.id));
  if (lockedPlayers.length === 0) {
    packResult.textContent = "You already own every player! 🎉";
    return;
  }

  const epics = lockedPlayers.filter((p) => p.tier === "epic");
  const legends = lockedPlayers.filter((p) => p.tier === "legendary");

  let pool;
  if (legends.length > 0 && (Math.random() < 0.3 || epics.length === 0)) {
    pool = legends;
  } else if (epics.length > 0) {
    pool = epics;
  } else {
    pool = lockedPlayers;
  }

  const prize = pool[Math.floor(Math.random() * pool.length)];
  save.coins -= packCost;
  save.owned.push(prize.id);
  writeSave();
  updateCoinBars();
  packResult.textContent = "📦 Pack opened! You got " + prize.name + " (" + tierNames[prize.tier] + ")!";
  if (prize.tier === "legendary") unlockAchievement("legend");
  renderPicker();
});

// Click a card to pick or un-pick a player (or buy it if it's locked).
// The upgrade button on a card upgrades the player instead.
pickGrid.addEventListener("click", (event) => {
  const upgradeBtn = event.target.closest(".upgradeBtn");
  if (upgradeBtn) {
    upgradePlayer(upgradeBtn.dataset.id);
    return;
  }

  const card = event.target.closest(".pickCard");
  if (!card) return;
  if (card.classList.contains("taken")) return; // Player 1 already has him

  const id = card.dataset.id;
  const player = allPlayers.find((p) => p.id === id);

  if (!save.owned.includes(id)) {
    buyPlayer(player);
    return;
  }

  packResult.textContent = "";

  if (pickedIds.includes(id)) {
    pickedIds = pickedIds.filter((pickedId) => pickedId !== id);
  } else if (pickedIds.length < squadSize) {
    pickedIds.push(id);
  } else {
    renderPicker();
    pickCount.textContent = "You already picked " + squadSize + ". Tap a picked player to swap him out.";
    return;
  }

  renderPicker();
});

// Picks a random team you haven't met yet (so you play different teams)
function pickRivalTeam() {
  const free = allTeams.filter((t) => !usedTeams.includes(t.id));
  const team = randomOf(free.length > 0 ? free : allTeams);
  usedTeams.push(team.id);
  return team;
}

function clampRating(value) {
  return Math.max(35, Math.min(99, value));
}

// Builds a Rival from a team's roster (never using players you picked).
// His ratings are nudged up or down (at most 10) so the game fits your level,
// the difficulty and the tournament/season extra.
function buildRival(starters, allMine, stageExtra = 0, team = null) {
  if (!team) team = pickRivalTeam();

  let total = 0;
  starters.forEach((p) => {
    total += overall(p);
  });
  const target = total / starters.length + settings.rivalBonus + stageExtra;

  const notMine = (p) => !allMine.some((m) => m.id === p.id);
  let pool = allPlayers.filter((p) => p.team === team.id && notMine(p));

  // You took too many of his players? Borrow some others to fill the squad
  if (pool.length < 8) {
    const others = shuffle(allPlayers.filter((p) => p.team !== team.id && notMine(p)));
    pool = pool.concat(others.slice(0, 8 - pool.length));
  }

  // Best player at each position starts, then the best of the rest
  const best = (a, b) => overall(b) - overall(a);
  const chosen = [];
  ["PG", "SG", "SF", "PF", "C"].forEach((pos) => {
    const top = pool.filter((p) => p.pos === pos).sort(best)[0];
    if (top) chosen.push(top);
  });
  pool.filter((p) => !chosen.includes(p)).sort(best).forEach((p) => {
    if (chosen.length < 8) chosen.push(p);
  });

  // Nudge everyone's ratings toward the target
  const shift = Math.max(-10, Math.min(10, Math.round(target - avgOverall(chosen.slice(0, 5)))));
  const squad = chosen.map((p) => ({
    ...p,
    inside: clampRating(p.inside + shift),
    mid: clampRating(p.mid + shift),
    three: clampRating(p.three + shift)
  }));

  return {
    starters: squad.slice(0, 5).sort(byPosition),
    bench: squad.slice(5, 8),
    team: team
  };
}

// Remembers who you are playing (squads, name, logo)
function applyRival(rival) {
  rivalPick = rival.starters;
  rivalBenchPick = rival.bench;
  rivalTeamObj = rival.team;
  rivalName = rival.team.name.toUpperCase();
  rivalShort = rival.team.short;
}

// Back from the picker: to the menu (or, for Player 2, back to Player 1's squad)
function goBackFromPicker() {
  if (isTwo() && pickPhase === 2) {
    pickPhase = 1;
    pickedIds = p1Picked.map((p) => p.id);
    p1Picked = [];
    showPicker();
    return;
  }
  showMenu();
}

pickBack.addEventListener("click", goBackFromPicker);

// The Escape key is also "back" on every screen
const backButtonIds = [
  [achScreen, "achBack"],
  [settingsScreen, "settingsBack"],
  [coachScreen, "coachBack"],
  [contestScreen, "contestBack"],
  [seasonScreen, "seasonMenu"]
];

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (!pickScreen.classList.contains("hidden")) {
    goBackFromPicker();
  } else if (!gameScreen.classList.contains("hidden")) {
    quitButton.click();
  } else {
    backButtonIds.forEach((pair) => {
      if (!pair[0].classList.contains("hidden")) document.getElementById(pair[1]).click();
    });
  }
});

// The PLAY button: the first 5 you picked start, the last 3 are the bench
// (your upgrades are added here)
playButton.addEventListener("click", () => {
  const picked = pickedIds.map((id) => withUpgrade(allPlayers.find((p) => p.id === id)));

  // ----- 2 players: Player 1 picks, then Player 2 picks -----
  if (isTwo()) {
    if (pickPhase === 1) {
      p1Picked = picked;
      pickedIds = [];
      pickPhase = 2;
      showPicker();
      return;
    }

    lastPicked = p1Picked;
    yourPick = p1Picked.slice(0, 5).sort(byPosition);
    yourBenchPick = p1Picked.slice(5);
    rivalPick = picked.slice(0, 5).sort(byPosition);
    rivalBenchPick = picked.slice(5);

    activeGM = save.gameMode;
    continueSquad = false;
    rivalTeamObj = null;
    rivalName = "PLAYER 2";
    rivalShort = "P2";
    showGame();
    return;
  }

  lastPicked = picked;
  yourPick = picked.slice(0, 5).sort(byPosition);
  yourBenchPick = picked.slice(5);
  continueSquad = false;

  // ----- Season: modes.js builds the season and shows the standings -----
  if (mode === "season") {
    startSeason();
    return;
  }

  // ----- Tournament / single game -----
  tourneyStage = 0;
  activeGM = mode === "single" ? save.gameMode : "classic";
  usedTeams = [];
  applyRival(buildRival(yourPick, picked, mode === "tournament" ? stageBonus[0] : 0));

  showGame();
});

// The big button after a game: next tournament game, or back to the season
nextGameButton.addEventListener("click", () => {
  if (mode === "season") {
    seasonBack();
    return;
  }

  // Tournament: next game against a tougher Rival (same squad, tired legs)
  tourneyStage++;
  applyRival(buildRival(yourTeam, lastPicked, stageBonus[tourneyStage]));
  continueSquad = true;
  startGame();
});

// ---------- Settings ----------
function syncSettings() {
  musicVol.value = save.musicVolume;
  sfxVol.value = save.sfxVolume;
}

musicVol.addEventListener("input", () => {
  save.musicVolume = Number(musicVol.value);
  music.volume = save.musicVolume / 100;
  writeSave();
});

sfxVol.addEventListener("input", () => {
  save.sfxVolume = Number(sfxVol.value);
  writeSave();
});

// Play a test sound when you let go of the slider
sfxVol.addEventListener("change", () => {
  playMadeSound();
});

resetButton.addEventListener("click", () => {
  if (!confirm("Reset ALL progress? This deletes your coins, unlocks, upgrades, coach perks, records and achievements.")) return;

  try {
    localStorage.removeItem(saveKey);
  } catch (e) {
    // nothing to remove
  }

  save = loadSave();
  settings = difficulties[save.difficulty];
  pickedIds = [];
  music.volume = save.musicVolume / 100;
  syncSettings();
  updateCoinBars();
  updateDifficultyButtons();
  updateGameModeButtons();
  updateMusicButton();
  renderRecords();
  showToast("Progress reset. Fresh start! 🏀");
});

// ---------- Button clicks ----------
startButton.addEventListener("click", () => {
  mode = "single";
  pickedIds = [];
  startMusic();
  showPicker();
});
tournamentButton.addEventListener("click", () => {
  mode = "tournament";
  pickedIds = [];
  startMusic();
  showPicker();
});
seasonButton.addEventListener("click", () => {
  mode = "season";
  pickedIds = [];
  startMusic();
  showPicker();
});
twoPlayerButton.addEventListener("click", () => {
  mode = "twoPlayer";
  pickPhase = 1;
  pickedIds = [];
  startMusic();
  showPicker();
});
achButton.addEventListener("click", () => {
  renderAchievements();
  showScreen(achScreen);
});
settingsButton.addEventListener("click", () => {
  syncSettings();
  showScreen(settingsScreen);
});
achBack.addEventListener("click", showMenu);
settingsBack.addEventListener("click", showMenu);
menuButton.addEventListener("click", showMenu);
driveButton.addEventListener("click", () => playRound("drive"));
midButton.addEventListener("click", () => playRound("mid"));
threeButton.addEventListener("click", () => playRound("three"));
passButton.addEventListener("click", () => playRound("pass"));
guardThreeButton.addEventListener("click", () => chooseDefense("guardThree"));
protectRimButton.addEventListener("click", () => chooseDefense("protectRim"));
doubleTeamButton.addEventListener("click", () => chooseDefense("doubleTeam"));
stealButton.addEventListener("click", () => chooseDefense("stealAttempt"));
foulButton.addEventListener("click", () => chooseDefense("foul"));
playAgainButton.addEventListener("click", startGame);

// ---------- Set up the title screen ----------
updateCoinBars();
updateDifficultyButtons();
updateGameModeButtons();
updateMusicButton();
syncSettings();
renderRecords();
fitCourt();

// ---------- Installing the game as an app (works when the game is on a website) ----------
let installPrompt = null;
const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
const isIos = /iphone|ipad|ipod/i.test(userAgent);
const isInstalled = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
  (typeof navigator !== "undefined" && navigator.standalone === true);

// Chrome, Edge and Android tell us when the game can be installed
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.classList.remove("hidden");
});

window.addEventListener("appinstalled", () => {
  installPrompt = null;
  installButton.classList.add("hidden");
  showToast("Hoop Zone is installed! 🏀");
});

// iPhones can't do it with a button, so we show the steps instead
if (isIos && !isInstalled) installButton.classList.remove("hidden");

installButton.addEventListener("click", async () => {
  if (installPrompt) {
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    installButton.classList.add("hidden");
  } else {
    alert("To install on an iPhone or iPad: tap the Share button in Safari, then choose 'Add to Home Screen'.");
  }
});


// ======================================================================
// TEAM LOGOS AND PLAYER PORTRAITS (drawn with code, so no image files are needed)
// ======================================================================
// If a team has  logo: "path.png"  or a player has  img: "path.png"  in players.js,
// that picture is used instead.

// ---------- Finding teams ----------
const teamLookup = {};
allTeams.forEach((t) => {
  teamLookup[t.id] = t;
});

// The team a player plays for (or null)
function teamOf(p) {
  return p && p.team ? teamLookup[p.team] || null : null;
}

// Black or white text, whichever is easier to read on this color
function readableText(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140 ? "#111111" : "#ffffff";
}

// ---------- Team logos ----------
// Each emblem is drawn inside a 100 x 100 badge.
// p = main color, s = second color
function emblemSvg(kind, p, s) {
  if (kind === "sun") {
    let rays = "";
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      const x1 = (50 + 20 * Math.cos(a)).toFixed(1);
      const y1 = (50 + 20 * Math.sin(a)).toFixed(1);
      const x2 = (50 + 32 * Math.cos(a)).toFixed(1);
      const y2 = (50 + 32 * Math.sin(a)).toFixed(1);
      rays += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + p + '" stroke-width="6" stroke-linecap="round"/>';
    }
    return rays + '<circle cx="50" cy="50" r="15" fill="' + s + '"/><circle cx="50" cy="50" r="8" fill="' + p + '"/>';
  }

  if (kind === "flame") {
    return '<path d="M50 18 C58 34 70 40 70 56 C70 68 61 78 50 78 C39 78 30 68 30 56 C30 48 36 42 40 36 C42 44 46 46 48 44 C52 38 48 28 50 18 Z" fill="' + s + '"/>' +
           '<path d="M50 46 C56 54 60 58 60 64 C60 70 55 74 50 74 C45 74 40 70 40 64 C40 58 46 54 50 46 Z" fill="' + p + '"/>';
  }

  if (kind === "claw") {
    let slashes = "";
    for (let i = 0; i < 3; i++) {
      const x = 27 + i * 15;
      slashes += '<polygon points="' + x + ',26 ' + (x + 9) + ',26 ' + (x + 17) + ',74 ' + (x + 8) + ',74" fill="' + s + '"/>';
    }
    return slashes;
  }

  if (kind === "fangs") {
    return '<rect x="24" y="24" width="52" height="9" rx="4" fill="' + p + '"/>' +
           '<polygon points="27,30 47,30 37,74" fill="' + s + '"/>' +
           '<polygon points="53,30 73,30 63,74" fill="' + s + '"/>';
  }

  if (kind === "mountain") {
    return '<polygon points="22,72 38,42 48,56 62,28 80,72" fill="' + s + '"/>' +
           '<polygon points="62,28 55,41 62,38 69,42" fill="' + p + '"/>' +
           '<rect x="22" y="72" width="58" height="5" rx="2" fill="' + p + '"/>';
  }

  if (kind === "crown") {
    return '<polygon points="24,64 24,36 38,50 50,30 62,50 76,36 76,64" fill="' + s + '"/>' +
           '<rect x="24" y="66" width="52" height="8" rx="2" fill="' + p + '"/>' +
           '<circle cx="24" cy="34" r="4" fill="' + p + '"/><circle cx="50" cy="28" r="4" fill="' + p + '"/><circle cx="76" cy="34" r="4" fill="' + p + '"/>';
  }

  if (kind === "fin") {
    return '<path d="M32 72 C44 66 48 40 54 22 C58 46 68 62 76 72 Z" fill="' + s + '"/>' +
           '<path d="M28 78 Q35 70 42 78 T56 78 T70 78" stroke="' + p + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
  }

  if (kind === "bolt") {
    return '<polygon points="57,16 31,55 46,55 40,84 69,42 53,42" fill="' + s + '" stroke="' + p + '" stroke-width="3" stroke-linejoin="round"/>';
  }

  if (kind === "fox") {
    return '<path d="M25 24 L42 42 L58 42 L75 24 L72 56 L50 80 L28 56 Z" fill="' + s + '"/>' +
           '<path d="M31 33 L40 42 L33 47 Z" fill="' + p + '"/><path d="M69 33 L60 42 L67 47 Z" fill="' + p + '"/>' +
           '<path d="M36 56 L45 59 L38 63 Z" fill="' + p + '"/><path d="M64 56 L55 59 L62 63 Z" fill="' + p + '"/>' +
           '<circle cx="50" cy="72" r="3.5" fill="' + p + '"/>';
  }

  if (kind === "comet") {
    return '<line x1="52" y1="48" x2="26" y2="74" stroke="' + p + '" stroke-width="7" stroke-linecap="round"/>' +
           '<line x1="60" y1="54" x2="42" y2="78" stroke="' + p + '" stroke-width="5" stroke-linecap="round"/>' +
           '<line x1="46" y1="38" x2="24" y2="58" stroke="' + p + '" stroke-width="5" stroke-linecap="round"/>' +
           '<circle cx="62" cy="38" r="14" fill="' + s + '"/>';
  }

  // Unknown emblem: a simple star
  return '<polygon points="50,20 58,40 80,42 63,56 68,78 50,66 32,78 37,56 20,42 42,40" fill="' + s + '"/>';
}

function teamLogoSvg(team, size) {
  return '<svg class="tlogoSvg" viewBox="0 0 100 100" width="' + size + '" height="' + size + '" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="50" cy="50" r="47" fill="' + team.dark + '" stroke="' + team.primary + '" stroke-width="5"/>' +
    '<circle cx="50" cy="50" r="39" fill="none" stroke="' + team.secondary + '" stroke-width="1.5" opacity="0.5"/>' +
    emblemSvg(team.emblem, team.primary, team.secondary) +
    '</svg>';
}

// The logo to show for a team (your own image if you gave one)
function teamLogoHtml(team, size) {
  if (!team) return "";
  if (team.logo) {
    return '<img class="tlogoImg" src="' + team.logo + '" width="' + size + '" height="' + size + '" alt="' + team.name + '">';
  }
  return teamLogoSvg(team, size);
}

// ---------- Player portraits ----------
const skinTones = ["#f6d5b8", "#e9b98f", "#cf955f", "#a9693a", "#7b4a2a", "#55331f"];
const skinShades = ["#e0b898", "#cf9d74", "#b57c47", "#8c5329", "#613820", "#41261a"];
const hairColors = ["#171717", "#2a1a0e", "#4b2c14", "#7b4b22", "#b98f4a"];

// The same text always gives the same number, so a player always looks the same
function hashText(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function avatarSvg(p, size) {
  const team = teamOf(p);
  const prim = team ? team.primary : "#2f6bff";
  const sec = team ? team.secondary : "#ffffff";
  const dark = team ? team.dark : "#12102b";

  const h = hashText(p.id);
  const skin = skinTones[h % 6];
  const shade = skinShades[h % 6];
  const hair = hairColors[(h >>> 3) % 5];
  const style = (h >>> 6) % 7;     // 0 short, 1 flat top, 2 afro, 3 bun, 4 dreads, 5 bald, 6 headband
  const beard = (h >>> 10) % 4 === 0;
  const glasses = (h >>> 12) % 9 === 0;

  const shortHair = '<path d="M24 44 Q22 22 40 22 Q58 22 56 44 Q52 33 40 33 Q28 33 24 44Z" fill="' + hair + '"/>';
  let behind = "";
  let front = "";

  if (style === 0) front = shortHair;
  if (style === 1) front = '<path d="M23 44 L24 20 L56 20 L57 44 Q52 32 40 32 Q28 32 23 44Z" fill="' + hair + '"/>';
  if (style === 2) {
    behind = '<circle cx="40" cy="33" r="25" fill="' + hair + '"/>';
    front = '<path d="M23 42 Q22 24 40 24 Q58 24 57 42 Q52 31 40 31 Q28 31 23 42Z" fill="' + hair + '"/>';
  }
  if (style === 3) front = shortHair + '<circle cx="40" cy="15" r="7" fill="' + hair + '"/>';
  if (style === 4) {
    behind = '<rect x="19" y="34" width="6" height="26" rx="3" fill="' + hair + '"/><rect x="26" y="38" width="5" height="22" rx="2.5" fill="' + hair + '"/>' +
             '<rect x="49" y="38" width="5" height="22" rx="2.5" fill="' + hair + '"/><rect x="55" y="34" width="6" height="26" rx="3" fill="' + hair + '"/>';
    front = shortHair;
  }
  if (style === 5) front = '<ellipse cx="34" cy="29" rx="5" ry="3" fill="#ffffff" opacity="0.25"/>';
  if (style === 6) front = shortHair + '<rect x="24" y="29" width="32" height="5" fill="' + sec + '"/>';

  const face =
    '<circle cx="33" cy="45" r="1.8" fill="#1b1b1b"/><circle cx="47" cy="45" r="1.8" fill="#1b1b1b"/>' +
    '<path d="M29 40 L37 39 M43 39 L51 40" stroke="' + (style === 5 ? "#2a1a0e" : hair) + '" stroke-width="1.6" stroke-linecap="round"/>';
  const beardSvg = beard
    ? '<path d="M24 50 Q26 64 40 64 Q54 64 56 50 Q52 58 40 58 Q28 58 24 50Z" fill="' + hair + '" opacity="0.9"/>'
    : "";
  const mouth = '<path d="M35 54 Q40 58 45 54" stroke="#7a2e2e" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
  const glassesSvg = glasses
    ? '<rect x="27" y="41" width="11" height="8" rx="2" fill="none" stroke="#111" stroke-width="1.4"/>' +
      '<rect x="42" y="41" width="11" height="8" rx="2" fill="none" stroke="#111" stroke-width="1.4"/>' +
      '<line x1="38" y1="44" x2="42" y2="44" stroke="#111" stroke-width="1.4"/>'
    : "";
  const sparkle = p.tier === "legendary"
    ? '<path d="M68 10 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#ffe27a"/>'
    : "";

  return '<svg class="avatarSvg" viewBox="0 0 80 96" width="' + size + '" height="' + Math.round(size * 1.2) + '" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="80" height="96" fill="' + dark + '"/>' +
    '<rect y="60" width="80" height="36" fill="' + prim + '" opacity="0.25"/>' +
    behind +
    '<rect x="34" y="56" width="12" height="14" fill="' + shade + '"/>' +
    '<path d="M4 96 L8 78 Q16 68 32 65 L48 65 Q64 68 72 78 L76 96 Z" fill="' + prim + '"/>' +
    '<path d="M32 65 L40 76 L48 65" stroke="' + sec + '" stroke-width="3" fill="none"/>' +
    '<text x="40" y="91" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="900" fill="' + sec + '" stroke="' + dark + '" stroke-width="1" paint-order="stroke">' + p.num + '</text>' +
    '<circle cx="24" cy="46" r="3.2" fill="' + skin + '"/><circle cx="56" cy="46" r="3.2" fill="' + skin + '"/>' +
    '<ellipse cx="40" cy="44" rx="16" ry="19" fill="' + skin + '"/>' +
    beardSvg + front + face + mouth + glassesSvg + sparkle +
    '</svg>';
}

// The picture to show for a player (your own image if you gave one).
// The result is remembered so the game stays fast.
const avatarCache = {};

function avatarHtml(p, size) {
  const key = p.id + "|" + p.num + "|" + size;
  if (!avatarCache[key]) {
    avatarCache[key] = p.img
      ? '<img class="avatarImg" src="' + p.img + '" width="' + size + '" height="' + Math.round(size * 1.2) + '" alt="' + p.name + '">'
      : avatarSvg(p, size);
  }
  return avatarCache[key];
}