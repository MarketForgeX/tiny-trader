let goingDown=true,score=0,busy=false;
const arrow=document.getElementById("arrow"),hint=document.getElementById("hint"),result=document.getElementById("result"),scoreEl=document.getElementById("score");
const chartLine=document.getElementById("chartLine"),area=document.getElementById("area"),dot=document.getElementById("dot");

function setChart(direction){
  const rising=direction==="up";
  const points=rising
    ?"0,145 45,132 90,138 135,105 180,112 225,82 270,88 315,57 360,62"
    :"0,62 45,75 90,61 135,96 180,84 225,111 270,103 315,135 360,126";
  chartLine.setAttribute("points",points);
  area.setAttribute("d",(rising
    ?"M0 145 L45 132 L90 138 L135 105 L180 112 L225 82 L270 88 L315 57 L360 62"
    :"M0 62 L45 75 L90 61 L135 96 L180 84 L225 111 L270 103 L315 135 L360 126")
    +" L360 170 L0 170 Z");
  const last=rising?{x:360,y:62}:{x:360,y:126};
  dot.setAttribute("cx",last.x);dot.setAttribute("cy",last.y);
}

function show(){
  goingDown=Math.random()<.5;
  arrow.textContent=goingDown?"⬇️":"⬆️";
  hint.textContent=goingDown?"Price is going down":"Price is going up";
  setChart(goingDown?"down":"up");
  result.textContent="Tap the right button!";
}

function answer(type){
  if(busy)return;
  const correct=(goingDown&&type==="buy")||(!goingDown&&type==="sell");
  busy=true;
  if(correct){
    score++;scoreEl.textContent=score;result.textContent="🎉 Correct!";
    arrow.style.transform="scale(1.15)";
    setTimeout(()=>{arrow.style.transform="scale(1)";show();busy=false},700);
  }else{
    result.textContent="🔄 Try again!";
    setTimeout(()=>busy=false,450);
  }
}
document.getElementById("buy").onclick=()=>answer("buy");
document.getElementById("sell").onclick=()=>answer("sell");
show();