// ---------- modes.js ----------
// Coach upgrades, Season mode and the 3-point contest.
// This file must be loaded AFTER script.js (see index.html).
// It uses lots of things that script.js made (save, showScreen, buildRival, ...).

// ---------- More achievements ----------
achievements.push(
  { id: "seasonChamp", name: "Season Champion", text: "Win a season", coins: 150 },
  { id: "contest20",   name: "Hot Hand",        text: "Score 20+ in the 3-point contest", coins: 60 }
);

// ======================================================================
// COACH UPGRADES
// ======================================================================
// Permanent perks. script.js reads them with coachLvl("timeout") and so on.
const coachPerks = [
  { key: "timeout", icon: "⏱️", name: "Extra Timeout",     text: "+1 timeout in every game",                         costs: [150, 300] },
  { key: "recover", icon: "💪", name: "Conditioning",      text: "Your players recover +2 stamina every round",      costs: [100, 200, 300] },
  { key: "steal",   icon: "🖐️", name: "Defensive Drills",  text: "A failed steal gives the Rival 3% less of an open look", costs: [100, 200, 300] },
  { key: "fouls",   icon: "🚨", name: "Disciplined Team",  text: "+1 team foul in every game",                       costs: [100, 200] }
];

const coachList = document.getElementById("coachList");
const coachButton = document.getElementById("coachButton");
const coachBack = document.getElementById("coachBack");

function renderCoach() {
  updateCoinBars();
  let html = "";

  coachPerks.forEach((perk) => {
    const level = save.coach[perk.key] || 0;
    const max = perk.costs.length;

    let pips = "";
    for (let i = 0; i < max; i++) {
      pips += i < level ? "●" : "○";
    }

    const action = level >= max
      ? '<span class="maxTag">⭐ MAX</span>'
      : '<button class="coachBuy" data-key="' + perk.key + '">⬆ ' + perk.costs[level] + ' 💰</button>';

    html +=
      '<div class="coachItem">' +
        '<span class="coachIcon">' + perk.icon + '</span>' +
        '<div class="coachText"><b>' + perk.name + ' <span class="pips">' + pips + '</span></b><span>' + perk.text + '</span></div>' +
        action +
      '</div>';
  });

  coachList.innerHTML = html;
}

coachList.addEventListener("click", (event) => {
  const btn = event.target.closest(".coachBuy");
  if (!btn) return;

  const perk = coachPerks.find((p) => p.key === btn.dataset.key);
  const level = save.coach[perk.key] || 0;
  if (level >= perk.costs.length) return;

  const cost = perk.costs[level];
  if (save.coins < cost) {
    showToast("You need " + (cost - save.coins) + " more coins for " + perk.name + ".");
    return;
  }

  save.coins -= cost;
  save.coach[perk.key] = level + 1;
  writeSave();
  playMadeSound();
  renderCoach();
});

coachButton.addEventListener("click", () => {
  renderCoach();
  showScreen(coachScreen);
});
coachBack.addEventListener("click", showMenu);

// ======================================================================
// SEASON MODE
// ======================================================================
// 10 games (you play each of 5 teams twice), then playoffs for the top 4.
// Your stamina and injuries carry over between ALL the games.
// (The season lives in memory: it is lost if you close the page.)
// Your 5 opponents are 5 random teams from players.js.
const seasonOffsets = [-3, -1, 1, 3, 5]; // how strong each team is compared to yours
const seasonGames = 10;
let season = null;

const seasonTitle = document.getElementById("seasonTitle");
const seasonInfo = document.getElementById("seasonInfo");
const seasonTable = document.getElementById("seasonTable");
const seasonNote = document.getElementById("seasonNote");
const seasonPlay = document.getElementById("seasonPlay");
const seasonMenu = document.getElementById("seasonMenu");

// Called by script.js when you press PLAY on the picker in season mode
function startSeason() {
  const teams = [{ id: 0, name: "You", w: 0, l: 0, rating: avgOverall(yourPick) }];

  shuffle(allTeams).slice(0, 5).forEach((team, i) => {
    const squad = buildRival(yourPick, lastPicked, seasonOffsets[i], team);
    teams.push({
      id: i + 1,
      name: team.name,
      short: team.short,
      team: team,
      w: 0,
      l: 0,
      starters: squad.starters,
      bench: squad.bench,
      rating: avgOverall(squad.starters)
    });
  });

  // You play each opponent twice, in a random order
  const order = [];
  for (let id = 1; id <= 5; id++) order.push(id, id);

  season = {
    teams: teams,
    schedule: shuffle(order),
    day: 0,          // regular season games played
    gamesPlayed: 0,  // all games played (including playoffs)
    phase: "regular", // "regular", "semi", "final" or "done"
    seeds: [],
    otherSemi: [],
    semiOpp: 0,
    finalOpp: 0,
    currentOpp: 0,
    summary: ""
  };

  showSeasonScreen();
}

function standings() {
  return season.teams.slice().sort((a, b) => b.w - a.w || b.rating - a.rating || a.id - b.id);
}

// Pretend two computer teams played: the stronger one usually wins
function simGame(a, b) {
  const diff = season.teams[a].rating - season.teams[b].rating;
  return Math.random() < 1 / (1 + Math.exp(-diff / 5)) ? a : b;
}

// The 4 teams that didn't play you today play each other
function simDay(oppId) {
  const others = shuffle([1, 2, 3, 4, 5].filter((id) => id !== oppId));
  for (let i = 0; i < others.length; i += 2) {
    const winner = simGame(others[i], others[i + 1]);
    const loser = winner === others[i] ? others[i + 1] : others[i];
    season.teams[winner].w++;
    season.teams[loser].l++;
  }
}

// Who do you play next?
function nextOpponent() {
  if (season.phase === "regular") return season.schedule[season.day];
  if (season.phase === "semi") return season.semiOpp;
  return season.finalOpp;
}

function showSeasonScreen() {
  showScreen(seasonScreen);

  const table = standings();
  let html = '<table class="seasonTable"><tr><th>#</th><th>Team</th><th>W - L</th><th>Rating</th></tr>';

  table.forEach((t, i) => {
    const classes = (t.id === 0 ? "meRow " : "") + (season.phase === "regular" && i === 3 ? "cutLine" : "");
    html +=
      '<tr class="' + classes + '">' +
        '<td>' + (i + 1) + '</td>' +
        '<td class="teamCell">' + (t.id === 0 ? "⭐ You" : teamLogoHtml(t.team, 22) + ' ' + t.name) + '</td>' +
        '<td>' + t.w + ' - ' + t.l + '</td>' +
        '<td>' + t.rating + '</td>' +
      '</tr>';
  });
  html += '</table>';
  seasonTable.innerHTML = html;

  if (season.phase === "done") {
    seasonTitle.textContent = "📅 SEASON OVER";
    seasonInfo.textContent = season.summary;
    seasonPlay.classList.add("hidden");
  } else {
    seasonPlay.classList.remove("hidden");
    const opp = season.teams[nextOpponent()];

    if (season.phase === "regular") {
      seasonTitle.textContent = "📅 SEASON · Game " + (season.day + 1) + " of " + seasonGames;
      seasonInfo.textContent = "Next: vs " + opp.name + " (rating " + opp.rating + "). The top 4 teams make the playoffs.";
    } else if (season.phase === "semi") {
      seasonTitle.textContent = "🏆 PLAYOFFS · Semifinal";
      seasonInfo.textContent = "Next: vs " + opp.name + " (rating " + opp.rating + "). Win and you're in the Final!";
    } else {
      seasonTitle.textContent = "🏆 PLAYOFFS · FINAL";
      seasonInfo.textContent = "Next: vs " + opp.name + " (rating " + opp.rating + "). One game for the title!";
    }
    seasonPlay.textContent = season.phase === "regular" ? "PLAY GAME " + (season.day + 1) : "PLAY";
  }

  // How tired is your squad?
  if (season.gamesPlayed > 0 && yourTeam.length > 0) {
    const squad = yourTeam.concat(yourBench);
    let total = 0;
    squad.forEach((p) => {
      total += p.stamina;
    });
    const spent = squad.filter((p) => p.stamina === 0).map((p) => p.name);
    seasonNote.textContent = "Squad stamina: " + Math.round(total / squad.length) + " on average (before the rest between games)." +
      (spent.length > 0 ? " ⚠️ " + spent.join(", ") + " finished at 0 and could miss the next game." : "") +
      " Season progress isn't saved if you close the page.";
  } else {
    seasonNote.textContent = "Season progress isn't saved if you close the page.";
  }
}

// Play the next game of the season
seasonPlay.addEventListener("click", () => {
  if (!season || season.phase === "done") return;

  const oppId = nextOpponent();
  const opp = season.teams[oppId];

  season.currentOpp = oppId;
  rivalPick = opp.starters;
  rivalBenchPick = opp.bench;
  rivalTeamObj = opp.team;
  rivalName = opp.name.toUpperCase();
  rivalShort = opp.short;
  activeGM = "classic";
  continueSquad = season.gamesPlayed > 0;

  if (season.phase === "regular") modeTag = "📅 GAME " + (season.day + 1) + "/" + seasonGames;
  else if (season.phase === "semi") modeTag = "🏆 SEMIFINAL";
  else modeTag = "🏆 FINAL";

  showGame();
});

seasonMenu.addEventListener("click", showMenu);

// Called by script.js (endGame) after every season game.
// Records the result, plays the other teams' games and returns some text to show.
function seasonGameDone(won) {
  season.gamesPlayed++;
  const me = season.teams[0];
  const opp = season.teams[season.currentOpp];

  // ----- Regular season -----
  if (season.phase === "regular") {
    if (won) {
      me.w++;
      opp.l++;
    } else {
      me.l++;
      opp.w++;
    }
    simDay(opp.id);
    season.day++;

    if (season.day < seasonGames) {
      return " 📅 Season record: " + me.w + " - " + me.l + ".";
    }

    // The regular season is over: who made the playoffs?
    const table = standings();
    const rank = table.findIndex((t) => t.id === 0);
    const rankCoins = [60, 40, 30, 20][rank] || 10;
    save.coins += rankCoins;
    season.seeds = table.slice(0, 4).map((t) => t.id);

    if (rank < 4) {
      const semis = [[season.seeds[0], season.seeds[3]], [season.seeds[1], season.seeds[2]]];
      const mine = semis.find((pair) => pair.includes(0));
      season.otherSemi = semis.find((pair) => pair !== mine);
      season.semiOpp = mine[0] === 0 ? mine[1] : mine[0];
      season.phase = "semi";
      return " 📅 Regular season over: you finished #" + (rank + 1) + " (" + me.w + " - " + me.l + ") and made the playoffs! +" + rankCoins + " coins.";
    }

    season.phase = "done";
    season.summary = "You finished #" + (rank + 1) + " (" + me.w + " - " + me.l + ") and missed the playoffs. Try a stronger squad!";
    return " 📅 Regular season over: you finished #" + (rank + 1) + " and missed the playoffs. +" + rankCoins + " coins.";
  }

  // ----- Semifinal -----
  if (season.phase === "semi") {
    const otherWinner = simGame(season.otherSemi[0], season.otherSemi[1]);

    if (won) {
      season.finalOpp = otherWinner;
      season.phase = "final";
      return " ✅ You're in the Final vs " + season.teams[otherWinner].name + "!";
    }

    const champion = simGame(season.semiOpp, otherWinner);
    season.phase = "done";
    season.summary = "You lost the semifinal. " + season.teams[champion].name + " won the title.";
    return " ❌ Eliminated in the semifinal. " + season.teams[champion].name + " won the title.";
  }

  // ----- Final -----
  if (won) {
    const bonus = Math.round(championBonus[save.difficulty] * 1.5);
    save.coins += bonus;
    save.seasonTitles++;
    season.phase = "done";
    season.summary = "🏆 YOU ARE THE SEASON CHAMPION! Bonus +" + bonus + " coins.";
    unlockAchievement("seasonChamp");
    return " 👑 SEASON CHAMPION! Bonus +" + bonus + " coins!";
  }

  season.phase = "done";
  season.summary = "You lost the Final to " + opp.name + ". So close!";
  return " ❌ You lost the Final to " + opp.name + ".";
}

// Called by script.js when you press the button after a season game
function seasonBack() {
  showSeasonScreen();
}

// ======================================================================
// 3-POINT CONTEST
// ======================================================================
// 15 shots. Every 5th shot is a 2-point "money ball". Tap in the green zone!
// If it's a tie after 15 shots, there are up to 5 extra shots (1 point each).
const contestButton = document.getElementById("contestButton");
const contestBack = document.getElementById("contestBack");
const contestPickBox = document.getElementById("contestPickBox");
const contestPick = document.getElementById("contestPick");
const contestPlay = document.getElementById("contestPlay");
const contestScore = document.getElementById("contestScore");
const contestBalls = document.getElementById("contestBalls");
const contestMarker = document.getElementById("contestMarker");
const contestInfo = document.getElementById("contestInfo");
const contestShootButton = document.getElementById("contestShoot");
const contestEnd = document.getElementById("contestEnd");
const contestAgain = document.getElementById("contestAgain");

let contest = null;

function openContest() {
  stopContest();
  showScreen(contestScreen);
  contestPickBox.classList.remove("hidden");
  contestPlay.classList.add("hidden");

  // All the players you own, best three-point shooters first
  const owned = allPlayers
    .filter((p) => save.owned.includes(p.id))
    .map(withUpgrade)
    .sort((a, b) => b.three - a.three);

  contestPick.innerHTML = owned
    .map((p) =>
      '<button class="contestPickBtn" data-id="' + p.id + '">' +
        '#' + p.num + ' ' + p.name +
        '<small>' + p.pos + ' · 3PT ' + p.three + '</small>' +
      '</button>')
    .join("");
}

function stopContest() {
  if (contest && contest.raf) cancelAnimationFrame(contest.raf);
  contest = null;
}

contestPick.addEventListener("click", (event) => {
  const btn = event.target.closest(".contestPickBtn");
  if (!btn) return;
  startContest(btn.dataset.id);
});

function startContest(id) {
  const me = withUpgrade(allPlayers.find((p) => p.id === id));

  // The Rival's shooter: someone with a similar three-point rating
  const target = me.three + settings.rivalBonus * 1.5;
  const pool = allPlayers.filter((p) => p.id !== id);
  let rival = pool[0];
  pool.forEach((p) => {
    if (Math.abs(p.three - target) < Math.abs(rival.three - target)) rival = p;
  });

  contest = {
    me: me,
    rival: rival,
    shot: 0,        // shots finished
    my: 0,
    rv: 0,
    myBalls: [],
    rvBalls: [],
    running: false,
    raf: null,
    pos: 50
  };

  contestPickBox.classList.add("hidden");
  contestPlay.classList.remove("hidden");
  contestEnd.classList.add("hidden");
  contestShootButton.classList.remove("hidden");
  startMusic();

  nextContestShot();
}

function contestValue(n) {
  return (n <= 15 && n % 5 === 0) ? 2 : 1;
}

function renderContest() {
  const c = contest;

  contestScore.innerHTML =
    '<div class="cScore you"><span>' + c.me.name + '</span><b>' + c.my + '</b></div>' +
    '<div class="cMid">Shot ' + Math.min(c.shot + 1, 20) + '</div>' +
    '<div class="cScore rival"><span>' + c.rival.name + '</span><b>' + c.rv + '</b></div>';

  let rows = "";
  [["you", c.myBalls], ["rival", c.rvBalls]].forEach((row) => {
    rows += '<div class="ballRow ' + row[0] + '">';
    const slots = Math.max(15, row[1].length);
    for (let i = 0; i < slots; i++) {
      const money = i < 15 && (i + 1) % 5 === 0;
      const result = row[1][i];
      const state = result === undefined ? "" : (result ? "made" : "miss");
      rows += '<span class="cBall ' + state + (money ? " money" : "") + '">' + (money ? "★" : "") + '</span>';
    }
    rows += '</div>';
  });
  contestBalls.innerHTML = rows;
}

function nextContestShot() {
  const n = contest.shot + 1;
  renderContest();

  contestInfo.textContent = n <= 15
    ? (contestValue(n) === 2 ? "💰 MONEY BALL! Worth 2 points. Tap SHOOT in the green!" : "Shot " + n + " of 15. Tap SHOOT in the green!")
    : "⚖️ Tie! Extra shot " + (n - 15) + " (1 point each).";

  contestShootButton.disabled = false;
  startContestMarker();
}

function startContestMarker() {
  const start = performance.now();
  contest.running = true;

  function frame(now) {
    if (!contest || !contest.running) return;
    contest.pos = 50 + 50 * Math.sin((now - start) * settings.ftSpeed * 1.4);
    contestMarker.style.left = contest.pos + "%";
    contest.raf = requestAnimationFrame(frame);
  }
  contest.raf = requestAnimationFrame(frame);
}

function contestShoot() {
  if (!contest || !contest.running) return;

  const c = contest;
  c.running = false;
  cancelAnimationFrame(c.raf);
  contestShootButton.disabled = true;

  const n = c.shot + 1;
  const value = contestValue(n);

  // How close to the middle did you stop?
  const distance = Math.abs(c.pos - 50);
  let quality;
  let bonus;
  if (distance <= 8) {
    quality = "Perfect timing!";
    bonus = 0.32;
  } else if (distance <= 20) {
    quality = "Good timing.";
    bonus = 0.12;
  } else {
    quality = "Bad timing.";
    bonus = -0.18;
  }

  const chance = Math.min(0.95, Math.max(0.08, 0.30 + (c.me.three - 60) / 100 + bonus));
  const made = Math.random() < chance;

  // The Rival shoots too (the computer's timing is about average)
  const rivalChance = Math.min(0.85, Math.max(0.15, 0.30 + (c.rival.three - 60) / 100 + 0.12 + settings.rivalBonus * 0.01));
  const rivalMade = Math.random() < rivalChance;

  if (made) c.my += value;
  if (rivalMade) c.rv += value;
  c.myBalls.push(made);
  c.rvBalls.push(rivalMade);
  c.shot = n;

  if (made) {
    playMadeSound();
    setTimeout(playSwishSound, 150);
    if (value === 2) playCheerSound(0.7);
  } else {
    playMissSound();
  }

  contestInfo.textContent = quality + (made ? " ✅ +" + value : " ❌ Missed.") +
    " · " + c.rival.name + (rivalMade ? " ✅ +" + value : " ❌");
  renderContest();

  const finished = (n >= 15 && c.my !== c.rv) || n >= 20;
  setTimeout(() => {
    if (!contest) return;
    if (finished) endContest();
    else nextContestShot();
  }, 1100);
}

function endContest() {
  const c = contest;
  const won = c.my > c.rv;
  const tie = c.my === c.rv;

  let reward = won ? settings.win : settings.lose;
  if (tie) reward = Math.round(settings.win / 2);

  save.coins += reward;
  if (c.my > save.contestBest) save.contestBest = c.my;
  writeSave();
  updateCoinBars();
  if (c.my >= 20) unlockAchievement("contest20");

  if (won) {
    playWinSound();
    playCheerSound(1.5);
  }

  contestInfo.textContent = (won ? "🏆 You win " : tie ? "🤝 It's a tie " : "😤 " + c.rival.name + " wins ") +
    c.my + " to " + c.rv + "! 💰 +" + reward + " coins. (Best: " + save.contestBest + ")";
  contestShootButton.classList.add("hidden");
  contestEnd.classList.remove("hidden");
  renderContest();
}

contestShootButton.addEventListener("click", contestShoot);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && contest && contest.running && !event.repeat) {
    event.preventDefault();
    contestShoot();
  }
});

contestAgain.addEventListener("click", () => {
  if (contest) startContest(contest.me.id);
});

contestButton.addEventListener("click", openContest);

contestBack.addEventListener("click", () => {
  stopContest();
  showMenu();
});

// ======================================================================
// KEYBOARD SHORTCUTS (desktop)
// ======================================================================
// Offense:  1 Drive   2 Mid-range   3 Three   4 Pass
// Defense:  1 Guard the three   2 Protect the rim   3 Double team   4 Steal   5 Take a foul
// Anytime:  T = timeout     Enter = resume after a timeout / quarter break
// (SPACE shoots free throws and the 3-point contest, ESC goes back: those are in other files.)
const keyShots = ["drive", "mid", "three", "pass"];
const keyDefense = ["guardThree", "protectRim", "doubleTeam", "stealAttempt", "foulButton"];

function clickIfReady(id) {
  const el = document.getElementById(id);
  if (!el || el.disabled || el.offsetParent === null) return false;
  el.click();
  return true;
}

// Little [1] [2] hints on the buttons (CSS only shows them when a keyboard is likely)
keyShots.forEach((id, i) => {
  const el = document.getElementById(id);
  if (el) el.dataset.key = i + 1;
});
keyDefense.forEach((id, i) => {
  const el = document.getElementById(id);
  if (el) el.dataset.key = i + 1;
});
const timeoutBtnEl = document.getElementById("timeoutButton");
if (timeoutBtnEl) timeoutBtnEl.dataset.key = "T";

document.addEventListener("keydown", (event) => {
  if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
  if (gameScreen.classList.contains("hidden")) return;
  if (typeof ft !== "undefined" && ft && ft.running) return; // free throw in progress

  const n = Number(event.key);
  if (n >= 1 && n <= 5) {
    // Only one of these groups is on screen at a time
    if (clickIfReady(keyShots[n - 1]) || clickIfReady(keyDefense[n - 1])) event.preventDefault();
  } else if (event.key === "t" || event.key === "T") {
    if (clickIfReady("timeoutButton")) event.preventDefault();
  } else if (event.key === "Enter") {
    if (clickIfReady("resumeButton")) event.preventDefault();
  }
});

// ======================================================================
// PHONE HELPERS
// ======================================================================
// 1) Every screen opens scrolled to the top
{
  const originalShowScreen = showScreen;
  showScreen = function (screen) {
    originalShowScreen(screen);
    window.scrollTo(0, 0);
  };
}

// 2) Shooter strip: on a phone the roster cards are far below the shot buttons,
//    so this row of chips right above the buttons lets you pick your shooter
//    without scrolling. Each chip just "taps" the real roster card.
const shooterStrip = document.createElement("div");
shooterStrip.id = "shooterStrip";
buttonsBox.insertBefore(shooterStrip, buttonsBox.firstChild);

let stripQueued = false;
function renderShooterStrip() {
  stripQueued = false;
  const cards = Array.from(yourPlayersBox.querySelectorAll(".player"));
  shooterStrip.innerHTML = '<span class="stripLabel">SHOOTER</span>' + cards.map((card, i) => {
    const name = (card.querySelector(".pname") || {}).textContent || "";
    const pos = (card.querySelector(".pos") || {}).textContent || "";
    const stam = ((card.querySelector(".staminaLabel") || {}).textContent || "").replace(/\D/g, "");
    const parts = name.trim().split(/\s+/);
    const short = parts.length > 1 ? parts[0][0] + ". " + parts.slice(1).join(" ") : name;
    const cls = (card.classList.contains("selected") ? " selected" : "") +
                (card.classList.contains("injured") ? " injured" : "") +
                (card.classList.contains("hot") ? " hot" : "");
    return '<button class="shooterChip' + cls + '" data-i="' + i + '">' +
             short + ' <small>' + pos + ' · ⚡' + stam + '</small></button>';
  }).join("");
}

function queueStrip() {
  if (stripQueued) return;
  stripQueued = true;
  requestAnimationFrame(renderShooterStrip);
}

new MutationObserver(queueStrip).observe(yourPlayersBox, { childList: true, subtree: true, attributes: true, characterData: true });

shooterStrip.addEventListener("click", (event) => {
  const chip = event.target.closest(".shooterChip");
  if (!chip) return;
  const card = yourPlayersBox.querySelectorAll(".player")[Number(chip.dataset.i)];
  if (card) card.click();
});
renderShooterStrip();
