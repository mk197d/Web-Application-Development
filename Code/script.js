document.addEventListener("DOMContentLoaded", function () {
    const gameboard = document.getElementById("gameboard");
    const scoreElement = document.getElementById("score");
    const startBtn = document.getElementById("startBtn");
    const gridSizeSelect = document.getElementById("gridSize");
  
    let gridSize = parseInt(gridSizeSelect.value);
    let fielderCount = 11;
    let score = 0;
  
    function createGameboard() {
      gameboard.innerHTML = "";
      gameboard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const block = document.createElement("div");
          block.classList.add("block");
          block.addEventListener("click", function () {
            revealBlock(i, j);
          });
          gameboard.appendChild(block);
        }
      }
    }
  
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
  
    function distributeFielders() {
      const blocks = Array.from(document.getElementsByClassName("block"));
      const fielderIndices = [];
  
      while (fielderIndices.length < fielderCount) {
        const randomIndex = getRandomInt(gridSize * gridSize);
        if (!fielderIndices.includes(randomIndex)) {
          fielderIndices.push(randomIndex);
        }
      }
  
      fielderIndices.forEach(function (index) {
        blocks[index].classList.add("fielder");
      });
    }
  
    function distributePowerUp() {
      for( var j=0; j < 5; j++){
        const blocks = Array.from(document.getElementsByClassName("block"));
        const randomIndex = getRandomInt(gridSize * gridSize);
        const powerUpBlock = blocks[randomIndex];
        powerUpBlock.id = "powerUp";
      }
    }
   


    function powerReveal() {
      for (var m = 0; m < 3; m++) {
        const blocks = Array.from(document.getElementsByClassName("block"));
        const randomIndex = getRandomInt(gridSize * gridSize);
        const powerUpBlock = blocks[randomIndex];
        powerUpBlock.id = "Reveal";
      }
    }




    function revealBlock(row, col) {
      const block = gameboard.children[row * gridSize + col];
      
      if(block.id === "purC"){
        return;
      }
      if (block.classList.contains("clicked" || "fur" || "pur" || "rev")) {
        return;
      }
  
      if (block.classList.contains("fielder")) {
        block.classList.remove("fielder");
        block.classList.add("fur");
        revealAllBlocks();
        setTimeout(endGame,1000);
      } else if (block.id === "powerUp") {
        block.classList.add("pur");
        score += getRandomInt(3) + 1; // Random score between 1 and 3
        scoreElement.textContent = score;
        block.id = "purC"     // Remove power-up from block
      } else if (block.id === "Reveal") {
        block.classList.add("rev");

        revealAllBlocks();
        setTimeout(undoReveal,1000);

        block.id = "purC"
      } else {
        block.classList.add("clicked");
        score++;
        scoreElement.textContent = score;
      }
    }
    function revealAllBlocks() {
      for (var i = 0; i < gridSize*gridSize; i++) {
        const blck = gameboard.children[i];
        
        if(blck.id === "purC" || blck.id === "furC"){
          continue;
        }
        if (blck.classList.contains("clicked" || "fur" || "pur" || "rev")) {
          continue;
        }
  
        if (blck.classList.contains("fielder")) {
          blck.classList.remove("fielder");
          blck.classList.add("furR");
        } else if (blck.id === "powerUp") {
          blck.classList.add("purR");
        } else if (blck.id === "Reveal") {
          blck.classList.add("revR")
        }
          else {
          blck.classList.add("revealed");
        }
      }
    }
    
    function undoReveal() {
      for (var i = 0; i < gridSize*gridSize; i++) {
        const blck = gameboard.children[i];
        
        if(blck.id === "purC" || blck.id === "furC"){
          continue;
        }
        if (blck.classList.contains("clicked" || "fur" || "pur")) {
          continue;
        }
  
        if (blck.classList.contains("furR")) {
          blck.classList.remove("furR");
          blck.classList.add("fielder");
        } else if (blck.id === "powerUp") {
          blck.classList.remove("purR");
        } else if (blck.id === "Reveal") {
          blck.classList.remove("revR");
        } 
          else {
          blck.classList.remove("revealed");
        }
      }
    }
    function endGame() {

      alert("Game Over! Final Score: " + score);
      resetGame();
    }
  
    function resetGame() {
      score = 0;
      scoreElement.textContent = score;
      createGameboard();
      distributeFielders();
      distributePowerUp();
      powerReveal();
    }
  
    startBtn.addEventListener("click", function () {
      gridSize = parseInt(gridSizeSelect.value);
      resetGame();
    });
  
    createGameboard();
    distributeFielders();
    distributePowerUp();
    powerReveal();
  });
  