
const attempts=document.getElementById("attempts");
const playername=document.getElementById("playername");
const hintBox=document.getElementById("hintbox");
const hintBtn=document.getElementById("hintbtn");
const revealBtn=document.getElementById("revealbtn");
const verifyplayer=document.getElementById("verifyplayer");
const suggestBox=document.getElementById("suggestions");
const playagainBtn=document.getElementById("play-again");
const winBox=document.getElementById("win-box");
const guessInput=document.getElementById("player-input");
const timer=document.getElementById("timer");
const guessContainer=document.getElementById("guess-container");
const easyBtn=document.getElementById("easy");
const mediumBtn=document.getElementById("medium");
const hardBtn=document.getElementById("hard");
const diffpage=document.getElementById("difficulty-screen");
const gamepage=document.getElementById("game-page");
const backBtn=document.getElementById("back-btn");
let answer=players[Math.floor(Math.random() * players.length)];

function startgame(attemptss,hint,times){ 
  timer.textContent=`${times}s`;
  attempts.textContent=`Attempts: ${attemptss}`;
  let hints=hint;
  let guessedPlayers=[];
  let attempt=attemptss;
  let time=times;
  let timerinterval;

  function playgame(){
    answer=players[Math.floor(Math.random() * players.length)];
    resetHintPool();
  }

  function settime(){
    timerinterval=setInterval(function(){
      time--;
      timer.textContent=`${time}s`;

      if(time===0){
        clearInterval(timerinterval);
        playername.textContent=`${answer.name}`;
        document.getElementById("guess-text").textContent=`Game Over 😭`;
        document.getElementById("try-text").textContent=`Try Again!`;

        setTimeout(() => {
          winBox.style.display="block";
          timer.style.background="rgba(255,255,255,0.15)";
        },500);
      }

      if(time<30 && time>=20){
        timer.style.background="lightcoral";
      }
      else if(time<20 && time>=10){
        timer.style.background="orange";
      }
      else if(time<10){
        timer.style.background="red";
      }
    },1000);
  }

  settime();

  function guessplayer(vaalue){
    if(guessedPlayers.includes(vaalue)){
      alert("You already guessed this player!");
      return;
    }

    if(attempt<=0){
      return;
    }

    guessedPlayers.push(vaalue);
    attempt--;
    attempts.textContent=`Attempts: ${attempt}`;

    const infoBox=document.createElement("div");
    infoBox.classList.add("guess-row");

    const playerValues=players.filter(player=>{
      return player.name.includes(vaalue);
    });

    playerValues.forEach(values=>{

      infoBox.innerHTML=`<div class="guess-box name-box">${values.name}</div>  
        <div class="guess-box nation-box">${values.nationality}</div> 
        <div class="guess-box league-box">${values.league}</div>
        <div class="guess-box club-box">${values.club}</div> 
        <div class="guess-box position-box">${values.position}</div>
        <div class="guess-box age-box">${values.age}</div> 
        <div class="guess-box number-box">${values.number}</div>`;

      const nationBox=infoBox.querySelector(".nation-box");
      const nameBox=infoBox.querySelector(".name-box");
      const leagueBox=infoBox.querySelector(".league-box");
      const clubBox=infoBox.querySelector(".club-box");
      const positionBox=infoBox.querySelector(".position-box");
      const ageBox=infoBox.querySelector(".age-box");
      const numberBox=infoBox.querySelector(".number-box");

      if(answer.nationality===values.nationality){
        nationBox.classList.add("correct");
      }

      if(answer.league===values.league){
        leagueBox.classList.add("correct");
      }

      if(answer.age===values.age){
        ageBox.classList.add("correct");
      }
      else if(answer.age>values.age){
        ageBox.innerHTML=`${values.age} ↑`;
      }
      else if(answer.age<values.age){
        ageBox.innerHTML=`${values.age} ↓`;
      }

      if(answer.club===values.club){
        clubBox.classList.add("correct");
      }

      if(answer.number===values.number){
        numberBox.classList.add("correct");
      }
      else if(answer.number>values.number){
        numberBox.innerHTML=`${values.number} ↑`;
      }
      else if(answer.number<values.number){
        numberBox.innerHTML=`${values.number} ↓`;
      }

      if(answer.position===values.position){
        positionBox.classList.add("correct");
      }

      if(answer.name===values.name){
        nameBox.classList.add("correct");
        playername.textContent=`${answer.name}`;
        document.getElementById("guess-text").textContent=`Perfect Guess!`;
        document.getElementById("try-text").textContent=`You discovered the player 🎉`;

        clearInterval(timerinterval);

        setTimeout(() => {
          timer.style.background="rgba(255,255,255,0.15)";
          winBox.style.display="block";
        },1000);
      }

    });

    guessContainer.append(infoBox);

    if(attempt===0 && answer.name!==vaalue){
      playername.textContent=`${answer.name}`;
      document.getElementById("guess-text").textContent=`Game Over 😭`;
      document.getElementById("try-text").textContent=`Try Again!`;

      clearInterval(timerinterval);

      setTimeout(() => {
        winBox.style.display="block";
        timer.style.background="rgba(255,255,255,0.15)";
      },1500);
    }
  }

  guessInput.oninput=function(){
    const value=guessInput.value.toLowerCase();

    if(value===""){
      suggestBox.innerHTML="";
      return;
    }

    const filtered=players.filter(player=>{
      return player.name.toLowerCase().includes(value);
    });

    suggestBox.innerHTML="";

    filtered.forEach(filter=>{
      if(filter!=null){
        const filteredplayers=document.createElement("div");
        filteredplayers.classList.add("filter-box");
        filteredplayers.textContent=`${filter.name}`;
        suggestBox.append(filteredplayers);

        filteredplayers.onclick=function(){
          const playernames=filteredplayers.textContent;
          suggestBox.innerHTML="";
          guessplayer(playernames);
          guessInput.value="";
        };
      }
    });
  };

  playagainBtn.onclick=function(){
    playgame();
    guessedPlayers=[];
    guessContainer.innerHTML="";
    clearInterval(timerinterval);
    time=times;
    timer.textContent=`${time}s`;
    settime();
    winBox.style.display="none";
    guessInput.value="";
    attempt=attemptss;
    attempts.textContent=`Attempts: ${attempt}`;
    hintBtn.disabled=false;
    hints=hint;
  };

  const excludedKeys=["id","name"];
  let hintPool=[];

  function resetHintPool(){
    hintPool=Object.keys(answer).filter((key)=>{
      return !excludedKeys.includes(key);
    });
    hintBox.textContent="";
  }

  resetHintPool();

  hintBtn.onclick=function(){
    if(hints<=0 || hintPool.length===0){
      alert("No more hints available!");
      return;
    }

    hints--;

    if(hints===0){
      hintBtn.disabled=true;
    }

    const randomIndex=Math.floor(Math.random() * hintPool.length);
    const [randomKey]=hintPool.splice(randomIndex,1);
    const label=randomKey.charAt(0).toUpperCase()+randomKey.slice(1);
    const hintValue=answer[randomKey];

    const hintdiv=document.createElement("div");
    hintdiv.classList.add("guess-box");

    hintdiv.innerHTML=`<div class="label-div">${label}</div>
      <div>${hintValue}</div>`;

    hintBox.append(hintdiv);
  };

backBtn.onclick = function () {
    clearInterval(timerinterval);
    gamepage.style.display = "none";
    diffpage.style.display = "flex";
    winBox.style.display = "none";
    guessInput.value = "";
    suggestBox.innerHTML = "";
    guessContainer.innerHTML = "";
    hintBox.innerHTML = "";
    timer.style.background = "rgba(255,255,255,0.15)";
};

  revealBtn.onclick=function(){
    const infoBox=document.createElement("div");
    infoBox.classList.add("guess-row");

    infoBox.innerHTML=`<div class="guess-box correct">${answer.name}</div>
      <div class="guess-box correct">${answer.nationality}</div>
      <div class="guess-box correct">${answer.league}</div>
      <div class="guess-box correct">${answer.club}</div>
      <div class="guess-box correct">${answer.position}</div>
      <div class="guess-box correct">${answer.age}</div>
      <div class="guess-box correct">${answer.number}</div>`;

    guessContainer.append(infoBox);

    playername.textContent=`${answer.name}`;
    document.getElementById("guess-text").textContent=`Game Over 😭`;
    document.getElementById("try-text").textContent=`Try Again!`;

    clearInterval(timerinterval);

    setTimeout(() => {
      winBox.style.display="block";
      timer.style.background="rgba(255,255,255,0.15)";
    },2000);
  };

}

easyBtn.onclick=function(){
  startgame(15,3,90);
  diffpage.style.display="none";
  gamepage.style.display="block";
};

mediumBtn.onclick=function(){
  startgame(10,2,60);
  diffpage.style.display="none";
  gamepage.style.display="block";
};

hardBtn.onclick=function(){
  startgame(7,1,45);
  diffpage.style.display="none";
  gamepage.style.display="block";
};


