HOOP ZONE - what is in this folder
===================================

1) COPY everything into your "Hoop Zone" folder (the one with index.html). Say yes to replace.

   index.html, script.js, players.js, modes.js, broadcast.js     (the game)
   CSS/extras.css                                                 (all the extra styles)
   manifest.json, service-worker.js, icons/                       (NEW: makes it an installable app)

   Keep your own files: CSS/style.css, music/background.mp3, images/

2) Open the game and press Ctrl+F5. A RED BAR at the top names any problem.

NEW IN THIS VERSION
-------------------
- Back buttons: "BACK" on the squad picker, "MENU" button during a game (or press Esc).
- The game can be installed as an app and works offline.

HOW TO INSTALL IT AS AN APP
---------------------------
The browser only allows installing from a real website (https://) - not from a file on your computer.

Easiest way (free, about 2 minutes):
  1. Go to  app.netlify.com/drop  and sign up (free).
  2. Drag your whole "Hoop Zone" folder onto the page.
  3. Netlify gives you a link like  https://something.netlify.app
  4. Open that link on your phone:
       Android (Chrome): tap  Install app  on the title screen, or menu (3 dots) > Install app
       iPhone (Safari):  tap Share > Add to Home Screen
       Computer (Chrome/Edge): click the install icon at the right end of the address bar

Another free way: GitHub Pages (Settings > Pages in your repository).

TESTING ON YOUR COMPUTER
------------------------
With VS Code "Live Server" (http://127.0.0.1:5500) the install icon works in Chrome/Edge too.
To test offline: open the game once, then in Chrome press F12 > Network > tick "Offline" and reload.
