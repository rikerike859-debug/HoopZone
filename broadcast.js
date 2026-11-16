// ---------- broadcast.js ----------
// 1. Commentary: two commentators who react to the game (and can speak out loud)
// 2. The live TV-style scoreboard bar at the top of the game
// This file must be loaded AFTER script.js and modes.js (see index.html).

// ======================================================================
// COMMENTARY
// ======================================================================
const casters = {
  pbp:   { name: "Hale", icon: "🎙️" }, // the play-by-play voice
  color: { name: "Dana", icon: "🎤" }  // the color voice (adds the story)
};

// What the commentators remember about this game
const talk = {
  recent: {},        // the lines said lately (so they don't repeat)
  runTeam: null,     // which team is on a scoring run
  runPoints: 0,      // how many points in a row
  lastLines: null,   // what was said last (so a lead change can join it)
  lastTime: 0
};

// ----- All the lines. {name}, {team}, {other}, {pts}, {run}, {streak}, {time}... get filled in -----
const lines = {
  three: ["{name} from deep... BANG!", "Nothing but net! {name} buries the three.", "{name} lets it fly from downtown... it's good!", "Cold-blooded three from {name}!", "{name} with the triple!"],
  drive: ["{name} attacks the rim and finishes!", "{name} powers through the lane for the bucket.", "Strong move to the basket by {name}.", "{name} drives, spins, and scores!"],
  mid:   ["{name} pulls up for the jumper... money!", "Smooth mid-range shot from {name}.", "{name} with the elbow jumper, good!", "{name} rises up and knocks it down."],
  miss:  ["{name} misses.", "Off the rim, no good.", "{name}'s shot rattles out.", "That one won't fall.", "Rebound is gathered, no basket."],

  colorGeneric: ["Beautiful shot selection there.", "You can see the confidence building.", "The defense had no answer for that.", "Great movement before the shot.", "That's how you respond."],
  colorHotStreak: ["{name} has made {streak} straight now.", "{name} is locked in, {streak} in a row."],
  colorPoints: ["That's {pts} points for {name} tonight.", "{name} is up to {pts} points."],
  colorRun: ["That's a {run} to nothing run for {team}!", "{run} straight points for {team}. The momentum is huge.", "{run} unanswered points, and {team} keeps rolling."],
  colorNeedTimeout: ["{other} could really use a timeout here.", "Time to stop the bleeding for {other}."],
  colorLate: ["Every possession matters now.", "With {time} left, this is huge.", "Tight game, and every shot counts."],
  colorBlowout: ["This game is getting away from {other}.", "Complete control for {team} now."],

  hotPbp: ["{name} is heating up!", "{name} is on fire!", "Look out, {name} is getting hot!"],
  hotColor: ["{name} has {streak} makes in a row now.", "You can't leave {name} open right now."],

  leadTake: ["Lead change! {team} on top.", "And it's {team} in front!", "A new leader: {team}!"],
  leadTie: ["All tied up!", "We're even again.", "A tie game at {tied}."],
  leadLate: ["And with {time} left, that matters a lot.", "Big swing in a tight game."],

  timeoutPbp: ["Timeout called by {team}.", "Timeout, {team}.", "The clock stops, timeout {team}."],
  timeoutStop: ["Smart timeout. They had to stop that run.", "Smart timeout from {team}, they had to stop that run."],
  timeoutRest: ["Good time to regroup.", "Let the legs rest a bit.", "A chance to make some adjustments."],

  quarterPbp: ["That's the end of the {ordinal} quarter.", "The horn sounds, the {ordinal} quarter is in the books."],
  halfPbp: ["That's halftime.", "The horn sounds, we're at the half."],
  quarterLead: ["{a} to {b} for {team}.", "{team} up {a} to {b}."],
  quarterTie: ["All square at {a}.", "Dead even, {a} apiece."],

  ftStartPbp: ["{name} steps to the line.", "Free throws for {name}."],
  ftStartColor: ["Pressure on the line.", "Quiet in the building now."],
  ftBoth: ["Both free throws are good.", "Two for two from the line."],
  ftOne: ["Splits the pair.", "One of two."],
  ftNone: ["Misses both, that's rare.", "No good on either."],

  foulDrawn: ["{name} is fouled!", "Whistle! {name} gets fouled on the drive.", "Foul called, {name} heads to the line."],
  foulDrawnColor: ["Smart play, attacking the rim.", "He drew the contact and it pays off."],
  foulCommitted: ["Foul on {team}.", "Whistle blows, foul on {team}."],
  foulCommittedColor: ["Free throws coming up for {other}.", "Sometimes you have to stop the easy basket."],

  turnover: ["Turnover! {name} throws it away.", "{name} loses the ball!", "Bad pass from {name}, they give it away."],
  turnoverColor: ["{other} running the break now.", "That's a gift for {other}."],

  steal: ["{name} with the steal!", "Stolen! {name} picks his pocket.", "What a steal by {name}!"],
  stealColor: ["Great anticipation.", "Hands like glue on defense.", "And now it's a fast break."],

  overtimePbp: ["We're going to overtime!", "Tied at the buzzer. Overtime!"],
  overtimeColor: ["Free basketball, folks.", "Nobody wants to go home yet."],

  finalPbp: ["Final possession coming up.", "Under {time}... one last chance."],
  finalTrail: ["Down {margin} for {trailer}. They need a stop and a score.", "Down {margin} for {trailer}, and time is running out."],
  finalTie: ["Tie game. Anything can happen.", "All tied up, this is going to be wild."],

  tipoffPbp: ["And we're underway!", "Tip-off, here we go!"],
  tipoffColor: ["{team1} against {team2}, this should be a good one.", "Big matchup tonight, I like what I see."],

  finalBuzzer: ["That's the final buzzer! The final score is {a} to {b}, in favor of {winner}.", "It's all over! The win goes to {winner}, {a} to {b}."],
  finalMvp: ["{mvp} was the difference with {pts} points.", "{mvp} led the way tonight with {pts}."],
  finalComeback: ["And they came back from {deficit} down!", "What a comeback, down {deficit} at one point."],
  finalBlowout: ["A dominant performance.", "They controlled this one from the start."]
};

// ----- Helpers -----
function teamName(who) {
  if (isTwo()) return who === "you" ? "Player 1" : "Player 2";
  return who === "you" ? "Your squad" : rivalShort;
}

function otherWho(who) {
  return who === "you" ? "rival" : "you";
}

function ordinal(n) {
  return ["first", "second", "third", "fourth", "fifth"][n - 1] || (n + "th");
}

function leadInfo() {
  const diff = score.you - score.rival;
  return { leader: diff > 0 ? "you" : diff < 0 ? "rival" : null, margin: Math.abs(diff) };
}

// The time left in words, for the commentators ("20 seconds", "1 minute 35 seconds")
function timeWords() {
  if (!isTimed()) return "";
  const m = Math.floor(clock / 60);
  const sec = Math.floor(clock % 60);
  if (m === 0) return sec + " seconds";
  return m + (m === 1 ? " minute" : " minutes") + (sec > 0 ? " " + sec + " seconds" : "");
}

function lateAndClose() {
  return isLateGame() && Math.abs(score.you - score.rival) <= 6;
}

// Picks a line from a group. It avoids lines that were said recently.
function pick(key, vars) {
  const all = lines[key];
  const recent = talk.recent[key] || (talk.recent[key] = []);
  let options = all.filter((l) => !recent.includes(l));
  if (options.length === 0) {
    talk.recent[key] = [];
    options = all;
  }
  const text = options[Math.floor(Math.random() * options.length)];
  talk.recent[key].push(text);
  if (talk.recent[key].length > Math.max(1, all.length - 1)) talk.recent[key].shift();

  // Fill in the {blanks}
  const filled = text.replace(/\{(\w+)\}/g, (match, name) => (vars && vars[name] !== undefined ? vars[name] : ""));
  return filled.replace(/([a-z,] )Your squad/g, (match, before) => before + "your squad");
}

// A run of points: counts how many points in a row one team scored
function addRun(who, points) {
  if (talk.runTeam === who) {
    talk.runPoints += points;
  } else {
    talk.runTeam = who;
    talk.runPoints = points;
  }
}

function resetCommentary() {
  talk.recent = {};
  talk.runTeam = null;
  talk.runPoints = 0;
  talk.lastLines = null;
  commentary.innerHTML = "";
  stopSpeaking();
}

// ----- Showing the lines on screen -----
function showCommentary(list) {
  commentary.innerHTML = list
    .filter((l) => l && l.text)
    .map((l) => '<span class="cLine ' + l.who + '"><b>' + casters[l.who].icon + " " + casters[l.who].name + ":</b> " + l.text + "</span>")
    .join("");
  commentary.classList.remove("fade");
  void commentary.offsetWidth;
  commentary.classList.add("fade");
}

// ----- The big function: something happened, so what do the commentators say? -----
// kind = the type of event, d = details about it
function announce(kind, d = {}) {
  let pbp = "";
  let color = "";
  let priority = 0;       // higher = interrupts what is being said
  const p = d.player;
  const name = p ? p.name : "";

  if (kind === "shot") {
    const team = teamName(d.who);
    const other = teamName(otherWho(d.who));

    if (d.made) {
      addRun(d.who, moves[d.moveKey].points);
      const info = leadInfo();
      const vars = { name: name, team: team, other: other, run: talk.runPoints, streak: p.streak, pts: p.points, time: timeWords() };

      pbp = pick(d.moveKey, vars);

      // The color commentator picks the most interesting thing to say
      if (talk.runPoints >= 10) color = pick("colorRun", vars);
      else if (d.who === "rival" && talk.runPoints >= 8 && !isTwo()) color = pick("colorNeedTimeout", { other: teamName("you") });
      else if (p.streak >= 3) color = pick("colorHotStreak", vars);
      else if (p.points >= 18) color = pick("colorPoints", vars);
      else if (lateAndClose()) color = pick("colorLate", vars);
      else if (info.margin >= 15 && info.leader === d.who) color = pick("colorBlowout", vars);
      else if (Math.random() < 0.35) color = pick("colorGeneric", vars);
    } else if (Math.random() < 0.5) {
      pbp = pick("miss", { name: name });
    }
  }

  if (kind === "hot") {
    const vars = { name: name, streak: p.streak };
    pbp = pick("hotPbp", vars);
    color = pick("hotColor", vars);
  }

  if (kind === "lead") {
    const vars = { team: teamName(d.leader), tied: score.you, time: timeWords() };
    color = d.leader === "tie" ? pick("leadTie", vars) : pick("leadTake", vars);
    if (d.leader !== "tie" && lateAndClose() && Math.random() < 0.6) color = pick("leadLate", vars);

    // The lead change joins what was just said about the shot
    if (talk.lastLines && Date.now() - talk.lastTime < 600) {
      pbp = talk.lastLines.pbp;
    } else {
      pbp = color;
      color = "";
    }
    priority = 1;
  }

  if (kind === "timeout") {
    const team = teamName(d.who);
    const vars = { team: team };
    pbp = pick("timeoutPbp", vars);
    // Did they stop a run?
    if (talk.runTeam === otherWho(d.who) && talk.runPoints >= 6) {
      color = pick("timeoutStop", vars);
    } else {
      color = pick("timeoutRest", vars);
    }
    if (talk.runTeam === otherWho(d.who)) talk.runPoints = 0;
    priority = 1;
  }

  if (kind === "quarterEnd") {
    const q = Number(String(d.title).replace(/\D/g, "")) || 1;
    const half = q * 2 === numQuarters;
    const vars = { ordinal: ordinal(q), team: teamName(leadInfo().leader || "you"), a: Math.max(score.you, score.rival), b: Math.min(score.you, score.rival) };
    pbp = half ? pick("halfPbp", vars) : pick("quarterPbp", vars);
    color = leadInfo().leader ? pick("quarterLead", vars) : pick("quarterTie", vars);
    priority = 2;
  }

  if (kind === "ftStart") {
    pbp = pick("ftStartPbp", { name: name });
    if (Math.random() < 0.5) color = pick("ftStartColor");
  }

  if (kind === "ftEnd") {
    pbp = d.made === d.total ? pick("ftBoth") : d.made === 0 ? pick("ftNone") : pick("ftOne");
    if (d.made > 0) addRun(d.who, d.made);
  }

  if (kind === "foul") {
    if (d.type === "drawn") {
      pbp = pick("foulDrawn", { name: name });
      color = pick("foulDrawnColor");
    } else {
      const vars = { team: teamName(d.who), other: teamName(otherWho(d.who)) };
      pbp = pick("foulCommitted", vars);
      color = pick("foulCommittedColor", vars);
    }
  }

  if (kind === "turnover") {
    pbp = pick("turnover", { name: name });
    color = pick("turnoverColor", { other: teamName(otherWho(d.who || "you")) });
  }

  if (kind === "steal") {
    pbp = pick("steal", { name: name });
    color = pick("stealColor");
    priority = 1;
  }

  if (kind === "overtime") {
    pbp = pick("overtimePbp");
    color = pick("overtimeColor");
    priority = 2;
  }

  if (kind === "finalPossession") {
    const info = leadInfo();
    const vars = { time: timeWords(), margin: info.margin, trailer: teamName(info.leader ? otherWho(info.leader) : "you") };
    pbp = pick("finalPbp", vars);
    color = info.leader ? pick("finalTrail", vars) : pick("finalTie", vars);
    priority = 2;
  }

  if (kind === "tipoff") {
    const vars = { team1: teamName("you"), team2: teamName("rival") };
    pbp = pick("tipoffPbp");
    color = pick("tipoffColor", vars);
    priority = 1;
  }

  if (kind === "p2ball") {
    pbp = "Player 2 has the ball.";
  }

  if (kind === "final") {
    const winner = d.won ? "you" : "rival";
    const vars = {
      winner: teamName(winner),
      a: Math.max(score.you, score.rival),
      b: Math.min(score.you, score.rival),
      mvp: d.mvp.name,
      pts: d.mvp.points,
      deficit: gameStats.maxDeficit
    };
    pbp = pick("finalBuzzer", vars);
    color = pick("finalMvp", vars);
    if (d.won && gameStats.maxDeficit >= 8) color = pick("finalComeback", vars);
    else if (Math.abs(score.you - score.rival) >= 15) color = pick("finalBlowout", vars);
    priority = 3;
  }

  // Show it, remember it, and say it out loud
  const out = [];
  if (pbp) out.push({ who: "pbp", text: pbp });
  if (color) out.push({ who: "color", text: color });
  if (out.length === 0) return;

  talk.lastLines = { pbp: pbp, color: color };
  talk.lastTime = Date.now();

  showCommentary(out);
  speakLines(out, priority);
}

// ======================================================================
// SPOKEN COMMENTARY (the voices come from your browser, so no files are needed)
// ======================================================================
const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
let voiceList = [];
let speakTimer = null;
let talkingNow = 0;        // how many sentences are being spoken
let talkingPriority = 0;

function loadVoices() {
  if (canSpeak) voiceList = speechSynthesis.getVoices();
}

if (canSpeak) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

// Tries to give Hale a deeper voice and Dana a different one
function pickVoice(who) {
  const english = voiceList.filter((v) => /^en/i.test(v.lang));
  if (english.length === 0) return null;

  const maleHints = /(daniel|alex|fred|david|mark|james|arthur|oliver|guy|google uk english male|rishi|aaron)/i;
  const femaleHints = /(samantha|karen|victoria|susan|zira|hazel|moira|tessa|aria|jenny|google us english|google uk english female|serena)/i;
  const hints = who === "pbp" ? maleHints : femaleHints;

  return english.find((v) => hints.test(v.name)) || english[who === "pbp" ? 0 : Math.min(1, english.length - 1)];
}

function voiceIsOn() {
  return canSpeak && save.voiceOn !== false && save.voiceVolume > 0;
}

function stopSpeaking() {
  clearTimeout(speakTimer);
  if (canSpeak) speechSynthesis.cancel();
  talkingNow = 0;
  talkingPriority = 0;
  music.volume = save.musicVolume / 100;
}

// Speaks the lines. Newer, more important things interrupt older ones.
function speakLines(list, priority = 0) {
  if (!voiceIsOn()) return;

  // Don't interrupt something more important that is still being said
  if (talkingNow > 0 && priority < talkingPriority) return;

  clearTimeout(speakTimer);
  // A tiny delay lets two events in the same moment (a shot + a lead change) become one
  speakTimer = setTimeout(() => {
    speechSynthesis.cancel();
    talkingNow = 0;
    talkingPriority = priority;

    list.forEach((l) => {
      const text = l.text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "");
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.volume = Math.min(1, save.voiceVolume / 100);
      u.voice = pickVoice(l.who);
      u.rate = l.who === "pbp" ? 1.12 : 1.0;
      u.pitch = l.who === "pbp" ? 0.9 : 1.15;

      u.onstart = () => {
        talkingNow++;
        music.volume = (save.musicVolume / 100) * 0.35; // the music gets quieter while they talk
      };
      const done = () => {
        talkingNow = Math.max(0, talkingNow - 1);
        if (talkingNow === 0) {
          talkingPriority = 0;
          music.volume = save.musicVolume / 100;
        }
      };
      u.onend = done;
      u.onerror = done;

      speechSynthesis.speak(u);
    });
  }, 80);
}

// ----- Voice settings -----
const voiceOnBox = document.getElementById("voiceOn");
const voiceVol = document.getElementById("voiceVol");
const voiceButton = document.getElementById("voiceButton");

function syncVoiceSettings() {
  voiceOnBox.checked = save.voiceOn !== false;
  voiceVol.value = save.voiceVolume;
  voiceButton.textContent = save.voiceOn === false ? "🔇" : "🎙️";
  voiceButton.title = canSpeak ? "Spoken commentary on/off" : "Your browser can't speak the commentary";
}

function setVoice(on) {
  save.voiceOn = on;
  writeSave();
  if (!on) stopSpeaking();
  syncVoiceSettings();
}

voiceOnBox.addEventListener("change", () => setVoice(voiceOnBox.checked));
voiceButton.addEventListener("click", () => setVoice(save.voiceOn === false));

voiceVol.addEventListener("input", () => {
  save.voiceVolume = Number(voiceVol.value);
  writeSave();
});

// Say something when you let go of the slider, so you can hear the volume
voiceVol.addEventListener("change", () => {
  showCommentary([{ who: "pbp", text: "And this is how loud I sound!" }]);
  speakLines([{ who: "pbp", text: "And this is how loud I sound!" }], 3);
});

settingsButton.addEventListener("click", syncVoiceSettings);
resetButton.addEventListener("click", syncVoiceSettings);

// ======================================================================
// LIVE SCOREBOARD BAR
// ======================================================================
const liveBar = document.getElementById("liveBar");
const lastBarScores = { you: 0, rival: 0 };

// If 3 or more of your players are from the same team, the bar shows that team's logo
function majorityTeam(team) {
  const counts = {};
  team.forEach((p) => {
    if (p.team) counts[p.team] = (counts[p.team] || 0) + 1;
  });
  const best = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  return best && counts[best] >= 3 ? teamLookup[best] : null;
}

function dots(left, max) {
  return "●".repeat(Math.max(0, left)) + "○".repeat(Math.max(0, max - left));
}

function renderLiveBar() {
  if (!liveBar || yourTeam.length === 0) return;

  const two = isTwo();

  // Left side: you (or Player 1)
  const youTeamLogo = !two ? majorityTeam(yourTeam) : null;
  const youBadge = youTeamLogo
    ? teamLogoHtml(youTeamLogo, 44)
    : '<span class="lbBadge you">' + (two ? "P1" : "🏀") + '</span>';
  const youLabel = two ? "PLAYER 1" : "YOUR SQUAD";

  // Right side: the Rival (or Player 2)
  const rivalBadge = (!two && rivalTeamObj)
    ? teamLogoHtml(rivalTeamObj, 44)
    : '<span class="lbBadge rival">' + (two ? "P2" : "🏀") + '</span>';
  const rivalLabel = two ? "PLAYER 2" : (rivalTeamObj ? rivalTeamObj.short.toUpperCase() : rivalName);

  // The clock
  let clockText;
  if (gameEnded) clockText = "FINAL";
  else if (isTimed()) clockText = (overtime ? "OT" : "Q" + quarterNumber()) + " · " + fmtClock(clock);
  else clockText = "FIRST TO " + gameModes.target.target;

  const youBall = possession === "you" && !gameEnded ? " 🏀" : "";
  const rivalBall = possession === "rival" && !gameEnded ? "🏀 " : "";
  const youHot = yourTeam.some(isHot) ? " 🔥" : "";
  const rivalHot = rivalTeam.some(isHot) ? "🔥 " : "";

  const youMaxTimeouts = 3 + coachLvl("timeout");
  const youInfo = two ? "" : "TO " + dots(timeoutsLeft, youMaxTimeouts) + " · FOULS " + foulsLeft;
  const rivalInfo = two ? "" : "TO " + dots(rivalTimeouts, settings.timeouts);

  liveBar.innerHTML =
    '<div class="lbTeam you">' +
      '<div class="lbBadgeBox">' + youBadge + '</div>' +
      '<div class="lbNames"><span class="lbName">' + youLabel + youBall + youHot + '</span><span class="lbSub">' + youInfo + '</span></div>' +
      '<b class="lbScore you">' + score.you + '</b>' +
    '</div>' +
    '<div class="lbCenter">' +
      '<div class="lbClock">' + clockText + '</div>' +
      '<div class="lbTag">' + diffTag.textContent + '</div>' +
    '</div>' +
    '<div class="lbTeam rival">' +
      '<b class="lbScore rival">' + score.rival + '</b>' +
      '<div class="lbNames right"><span class="lbName">' + rivalHot + rivalLabel + rivalBall + '</span><span class="lbSub">' + rivalInfo + '</span></div>' +
      '<div class="lbBadgeBox">' + rivalBadge + '</div>' +
    '</div>';

  // The score "bumps" when it changes
  ["you", "rival"].forEach((who) => {
    if (score[who] !== lastBarScores[who]) {
      const el = liveBar.querySelector(".lbScore." + who);
      if (el && score[who] > lastBarScores[who]) {
        el.classList.add("bump");
        setTimeout(() => el.classList.remove("bump"), 500);
      }
      lastBarScores[who] = score[who];
    }
  });
}

syncVoiceSettings();
