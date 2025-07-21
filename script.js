const words = [
  { word: "nap", clue: "égitest" },
  { word: "kávé", clue: "reggeli ital" },
  { word: "kutya", clue: "háziállat" },
  { word: "villamos", clue: "közlekedés" },
  { word: "alma", clue: "gyümölcs" },
  { word: "víz", clue: "folyékony" },
  { word: "iskola", clue: "tanulás" },
  { word: "tenger", clue: "só" },
  { word: "hegy", clue: "magas" },
  { word: "telefon", clue: "hívás" }
  // bővíthető több száz szóig
];

let players = ["Anna", "Béla", "Csaba", "Dóri"]; // tetszés szerint bővíthető
let roles = {};
let revealedCount = 0;

function setupGame() {
  const chosen = words[Math.floor(Math.random() * words.length)];
  const impostorIndex = Math.floor(Math.random() * players.length);

  players.forEach((player, i) => {
    if (i === impostorIndex) {
      roles[player] = { role: "impostor", info: `Segítség: ${chosen.clue}` };
    } else {
      roles[player] = { role: "civil", info: `A szó: ${chosen.word}` };
    }
  });

  const list = document.getElementById("playerList");
  list.innerHTML = "";

  players.forEach(player => {
    const btn = document.createElement("button");
    btn.textContent = player;
    btn.onclick = function () {
      if (!btn.classList.contains("revealed")) {
        btn.classList.add("revealed");
        const div = document.createElement("div");
        div.className = "reveal";
        div.textContent = roles[player].info;
        btn.after(div);
        revealedCount++;
        if (revealedCount === players.length) {
          document.getElementById("revealImpostorBtn").style.display = "block";
        }
      }
    };
    list.appendChild(btn);
  });

  document.getElementById("revealImpostorBtn").onclick = () => {
    const result = document.getElementById("result");
    const impostor = players.find(p => roles[p].role === "impostor");
    result.textContent = `Az imposztor: ${impostor}`;
    document.getElementById("revealImpostorBtn").disabled = true;
  };
}

setupGame();
