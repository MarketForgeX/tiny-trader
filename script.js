const items = [
  {emoji:"🍎", name:"Apple", base:10},
  {emoji:"🍌", name:"Banana", base:8},
  {emoji:"🧸", name:"Toy Bear", base:12}
];

let coins = 20;
let price = 10;
let boughtAt = null;
let holding = false;
let stars = 0;
let round = 0;

const $ = (id) => document.getElementById(id);
const priceEl = $("price");
const coinsEl = $("coins");
const itemNameEl = $("itemName");
const trendEl = $("trend");
const holdingEl = $("holding");
const messageText = $("messageText");
const messageIcon = $("messageIcon");
const starsEl = $("stars");
const progressBar = $("progressBar");
const chartLine = $("chartLine");
const area = $("area");
const dot = $("dot");

function updateUI(){
  coinsEl.textContent = coins;
  priceEl.textContent = price;
  holdingEl.textContent = holding ? `Bought at ${boughtAt} coins` : "Nothing bought yet";
  starsEl.textContent = `${stars} / 5 ⭐`;
  progressBar.style.width = `${Math.min(stars,5)*20}%`;
}

function setMessage(icon,text){
  messageIcon.textContent = icon;
  messageText.textContent = text;
}

function setChart(direction){
  const rising = direction === "up";
  const points = rising
    ? "0,145 45,132 90,138 135,105 180,112 225,82 270,88 315,57 360,62"
    : "0,62 45,75 90,61 135,96 180,84 225,111 270,103 315,135 360,126";
  chartLine.setAttribute("points", points);
  area.setAttribute("d", (rising
    ? "M0 145 L45 132 L90 138 L135 105 L180 112 L225 82 L270 88 L315 57 L360 62"
    : "M0 62 L45 75 L90 61 L135 96 L180 84 L225 111 L270 103 L315 135 L360 126")
    + " L360 170 L0 170 Z");
  const last = rising ? {x:360,y:62} : {x:360,y:126};
  dot.setAttribute("cx",last.x);
  dot.setAttribute("cy",last.y);
  trendEl.textContent = rising ? "↗ Price is going up!" : "↘ Price is going down!";
}

function randomMove(){
  const move = Math.random() < .52 ? 2 : -1;
  price = Math.max(4, Math.min(18, price + move));
  setChart(move > 0 ? "up" : "down");
  updateUI();
}

function buy(){
  if(holding){
    setMessage("🧠","You already have one! Watch the price.");
    return;
  }
  if(coins < price){
    setMessage("🪙","Not enough coins. Try WAIT.");
    return;
  }
  boughtAt = price;
  coins -= price;
  holding = true;
  setMessage("🛒","Nice! You bought it. Now watch.");
  randomMove();
}

function sell(){
  if(!holding){
    setMessage("👆","Buy something first.");
    return;
  }
  const profit = price - boughtAt;
  coins += price;
  holding = false;

  if(profit > 0){
    stars = Math.min(5, stars + 1);
    setMessage("🎉", `Great! Profit +${profit} coins!`);
  } else if(profit < 0){
    stars = Math.max(0, stars);
    setMessage("💡", `That's a loss of ${Math.abs(profit)} coins. That's okay—keep learning!`);
  } else {
    setMessage("🙂","You sold at the same price. No profit, no loss.");
  }
  randomMove();
}

function wait(){
  setMessage("⏳","Good traders can be patient. Watch the price.");
  randomMove();
}

function newRound(){
  round += 1;
  const item = items[round % items.length];
  price = item.base;
  boughtAt = null;
  holding = false;
  itemNameEl.textContent = `${item.emoji} ${item.name}`;
  setChart("up");
  setMessage("🌟","New round! Can you spot a good price?");
  updateUI();
}

$("buyBtn").addEventListener("click",buy);
$("sellBtn").addEventListener("click",sell);
$("waitBtn").addEventListener("click",wait);
$("resetBtn").addEventListener("click",newRound);

updateUI();
setChart("up");