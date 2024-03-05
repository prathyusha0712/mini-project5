const CHOICES = [
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissors",
      beats: "paper",
    },
    {
      name: "rock",
      beats: "scissors",
    },
  ];
  const mainScreen = document.querySelector(".container");
  const choiceButtons = document.querySelectorAll(".choice_btn");
  const gameDiv = document.querySelector(".game");
  const resultsDiv = document.querySelector(".results");
  const resultDiv = document.querySelectorAll(".results_result");
  const resultWinner = document.querySelector(".results_winner");
  const resultText = document.querySelector(".results_text");
  const subText = document.querySelector(".sub_text");
  const playAgainBtn = document.querySelector(".play_again");
  const computerScore = document.querySelector(".comp_score");
  const playerScore = document.querySelector(".player_score");
  const rulesBtn = document.querySelector(".rules_btn");
  const nextBtn = document.querySelector(".next_btn");
  const winnerScreen = document.querySelector(".trophy_screen");
  const winnerPlayAgainBtn = document.querySelector(".winPlayAgnBtn");
  const rulesDisplay = document.querySelector(".rules");
  const closeBtn = document.querySelector(".close");
  
  function updateScore() {
    const scores = localStorage.getItem("scores");
    const updatedScores = scores ? JSON.parse(scores): { player: 0, computer: 0 };
    computerScore.innerText = updatedScores.computer;
    playerScore.innerText = updatedScores.player;
  }
  updateScore();
  
  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choiceName = button.dataset.choice;
      const choice = CHOICES.find((choice) => choice.name === choiceName);
      choose(choice);
    });
  });
  
  function choose(choice) {
    const pcChoice = pcChoose();
    displayResults([choice, pcChoice]);
    displayWinner([choice, pcChoice]);
  }
  
  function pcChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
  }
  
  function displayResults(results) {
    resultDiv.forEach((resultDiv, idx) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="choice  ${results[idx].name}">
            <img src="./images/${results[idx].name}.png" alt="${results[idx].name}" />
          </div>
        `;
      }, idx * 200);
    });
  
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  }
  
  function displayWinner(results) {
    setTimeout(() => {
      const userWins = isWinner(results);
      const pcWins = isWinner([results[1], results[0]]);
  
      if (userWins) {
        resultText.innerText = "YOU WIN";
        subText.innerHTML = "AGAINST PC";
        resultDiv[0].classList.toggle("winner");
        nextBtn.style.display = "inline";
        keepScore("player");
      } else if (pcWins) {
        resultText.innerText = "YOU LOST";
        subText.innerHTML = "AGAINST PC";
        resultDiv[1].classList.toggle("winner");
        nextBtn.style.display = "none";
        keepScore("computer");
      } else {
        resultText.innerText = "TIE UP";
        subText.innerHTML = "";
        nextBtn.style.display = "none";
      }
      resultWinner.classList.toggle("hidden");
      resultsDiv.classList.toggle("show_winner");
    }, 200);
  }
  
  function isWinner(results) {
    return results[0].beats === results[1].name;
  }
  
  function keepScore(result) {
    const scores = localStorage.getItem("scores");
    const score = scores ? JSON.parse(scores) : { player: 0, computer: 0 };
  
    if (result === "player") {
      score.player += 1;
    } else if (result === "computer") {
      score.computer += 1;
    }
    localStorage.setItem("scores", JSON.stringify(score));
    updateScore();
  }
  
  function playAgain() {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
    mainScreen.style.display = "block";
    winnerScreen.style.display = "none";
    nextBtn.style.display = "none";
  
    resultDiv.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show_winner");
  };
  
  function showRulesHandler() {
    console.log('inside')
    closeBtn.style.display = "flex";
    rulesDisplay.style.display = "flex";
  };
  
  function removeRulesHandler() {
    closeBtn.style.display = "none";
    rulesDisplay.style.display = "none";
  };
  function trophyPageHandler() {
    mainScreen.style.display = "none";
    winnerScreen.style.display = "flex";
    nextBtn.style.display = "none";
  
  }
  playAgainBtn.addEventListener("click", playAgain);
  winnerPlayAgainBtn.addEventListener("click", playAgain);
  rulesBtn.addEventListener("click", showRulesHandler);
  closeBtn.addEventListener("click", removeRulesHandler);
  nextBtn.addEventListener("click", trophyPageHandler);