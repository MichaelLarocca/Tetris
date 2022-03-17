console.clear();

document.addEventListener('DOMContentLoaded', ()=> {
  // console.log(`DOMContentLoaded`);  
  const grid = document.getElementById("grid");
  let squares = Array.from(document.querySelectorAll("#grid div"));
    // console.log(squares);
  const scoreDisplay = document.getElementById("score");
  const display = document.getElementById("display");
  const startButton = document.getElementById("btn-start");
  const iconBtnStart = document.getElementById("icon-btn-start");
  const ctnLinesTotal = document.getElementById("lines-total");
  const ctnLevel = document.getElementById("level");
  const ctnLinesLevel = document.getElementById("lines-level");
  const width = 10;
  // let random;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  let level = 1;
  let gameSpeed = 500;
  let currentGameSpeed;
  let speedIncrease = false;
  let linesTotal = 0;
  let linesLevel = 10;
  let currentLineScore;
  let counterRow = 0;
  let flagGameOver = false;
  let flagGameStart = false;
  // let bonusPoints = level * counterRow;
  
  ctnLinesTotal.innerHTML = linesTotal;
  // ctnLevel.innerHTML = level;
  ctnLinesLevel.innerHTML = linesLevel;
// Sounds
const soundMove = new Audio("sound/Tetris-Move.mp3");
const soundDrop = new Audio("sound/Tetris-Drop.mp3");
const soundClearRow = new Audio("sound/Tetris-Clear-Row.mp3");
const soundLevelUp = new Audio("sound/Tetris-Level-Up.mp3");
const soundGameOver = new Audio("sound/Tetris-Game-Over.mp3");
const soundMainMusic = new Audio("sound/Tetris-Main-Music.mp3");
soundMainMusic.volume = 0.7;

  // Game Speed & Score
  function levelSpeed() {
    if(level === 1) {
      gameSpeed = 500;
      currentLineScore = level * 10;
    }
    if(level === 2) {
      gameSpeed = 450;
      currentLineScore = level * 10;
    }
    if(level === 3) {
      gameSpeed = 400;
      currentLineScore = level * 10;
    }
    if(level === 4) {
      gameSpeed = 350;
      currentLineScore = level * 10;
    }  
    if(level === 5) {
      gameSpeed = 300;
      currentLineScore = level * 10;
    }
    if(level === 6) {
      gameSpeed = 250;
      ccurrentLineScore = level * 10;
    } 
    if(level === 7) {
      gameSpeed = 200;
      currentLineScore = level * 10;
    } 
    if(level === 8) {
      gameSpeed = 150;
      currentLineScore = level * 10;
    } 
    if(level === 9) {
      gameSpeed = 100;
      currentLineScore = level * 10;
    }     
    if(level >= 10) {
      gameSpeed = 100;
      currentLineScore = level * 10;
    }
  }  
  
 // The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]
  
  const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
  ]
    
  const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]
  
  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]     
  
  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1,width*3+1],
    [width, width+1, width+2, width+3]
  ]
  
  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
  let randomColor;
  
  // Randomly select a color for each Tetromino
  function color() {
    const tetrominoeColors = ["green", "blue", "orange", "yellow", "purple", "red", "teal"];
    const chooseRandomColor = Math.floor(Math.random() * tetrominoeColors.length);
    randomColor = tetrominoeColors[chooseRandomColor];
  }
  color();
  
  // Tetrominoes
  let currentPosition = 4;
  let currentRotation = 0;

  // Hold woking code
  // let randomTetromino = Math.floor(Math.random() * theTetrominoes.length)
  // let current = theTetrominoes[randomTetromino][currentRotation];
  
  
  // Github Code
    //randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  
  //Draw Tetrominoes
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino', randomColor);
    })
  }
  // draw();
   function unDraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino', randomColor);
    })
  } 
  
  // Assign functions to key codes
  function control(e) {
    if(flagGameOver != true && flagGameStart == true) {
          if(e.keyCode === 37) {
            moveLeft();
            soundMove.play();
          } else if (e.keyCode === 38) {
            rotate();
            soundMove.play();
          } else if (e.keyCode === 39) {
            moveRight();
            soundMove.play();
          } else if (e.keyCode === 40) {
            // moveDown
            speedIncrease = true;
              // console.log(speedIncrease);
          } else if (e.keyCode === 32) { // SPACE BAR
            // SPACE BAR
            speedIncrease = false;
              // console.log(speedIncrease);
          }
      }
  }
  document.addEventListener("keydown", control);

  // Erase/Clear grid divs
  function clearGridDivs() {
    squares.forEach(index => {
      // squares[index].classList.add("block-cleared");
      
      squares.forEach((item, index)=>{
        // squares[index].classList.add("block-cleared");
        if(!squares[index].classList.contains("taken")) {
        squares[index].classList.remove("green", "blue", "orange", "yellow", "purple", "red", "teal");  
        }        
      })
      // if(!squares[i].classList.contains("taken")) {
      // squares[i].classList.remove("green", "blue", "orange", "yellow", "purple", "red", "teal");  
      // }
    })
  }
  
  // Move down function   
  function moveDown() {
    if(flagGameOver != true) {
        clearGridDivs(); // Added code
        unDraw();
        currentPosition += width;
        draw();
        freeze();
          // console.log(`gameSpeed: ${gameSpeed}`);
        // added code
        changeGameSpeed();
      }
  }
  
  // added code
  function changeGameSpeed() {
     // added code
        if(speedIncrease === true) {
          gameSpeed = 100;
            clearInterval(timerId);
            timerId = setInterval(moveDown, gameSpeed);
        }
        if(speedIncrease === false) {
            levelSpeed();
            clearInterval(timerId);
            timerId = setInterval(moveDown, gameSpeed);
        }       
  }
  
  function changeGameLevel(){
    if(linesLevel === 0) {
      level += 1;
      soundLevelUp.play();
      linesLevel = 10;
      ctnLevel.innerHTML = level;
      ctnLinesLevel.innerHTML = linesLevel;
      
      display.textContent = `Level ${level}`;
      setTimeout(function(){
        display.textContent = ``;
      }, 2500);  
    }
  }
  
  // Frezze tetromino
  function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
      current.forEach(index => squares[currentPosition + index].classList.add("taken"));
      soundDrop.play();
      // Start a new tetromino
      color();
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
            levelSpeed();
            speedIncrease = false;
            clearInterval(timerId);
            timerId = setInterval(moveDown, gameSpeed);
              // console.log(gameSpeed);
      if(flagGameOver != true) {
          draw();
          displayShape();
          addScore();
          gameOver();
        }
    }
  }
  
  // Check for left wall
  function moveLeft() {
      clearGridDivs(); // Added code
    unDraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
    
    if(!isAtLeftEdge) currentPosition -= 1;
    
    if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
      currentPosition += 1;
    }
    draw();
  }

    // Check for right wall
  function moveRight() {
      clearGridDivs(); // Added code
    unDraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1);
    
    if(!isAtRightEdge) currentPosition += 1;
    
    if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
      currentPosition -= 1;
    }
    draw();
  }
  
    ///FIX ROTATION OF TETROMINOS A THE EDGE 
  function isAtRight() {
    return current.some(index=> (currentPosition + index + 1) % width === 0)  
  }
  
  function isAtLeft() {
    return current.some(index=> (currentPosition + index) % width === 0)
  }
  
    function checkRotatedPosition(P) {
    P = P || currentPosition 
      
    if ((P+1) % width < 4) {            
      if (isAtRight()) {           
        currentPosition += 1; 
        checkRotatedPosition(P); 
        }
    }
    else if (P % width > 5) {
      if (isAtLeft()) {
        currentPosition -= 1;
        checkRotatedPosition(P);
      }
    }
  }
  
  // Rotate the Tetromino
  function rotate() {
      // console.log(currentRotation);
      clearGridDivs(); // Added code
    unDraw();
    currentRotation ++;
    if(currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    checkRotatedPosition();
    draw();
  }
  
// Show up-next tetromino in a mini display
  const displaySquares = document.querySelectorAll("#mini-grid div");
    // console.log(displaySquares);
  const displayWidth = 4;
  let displayIndex = 0;
  
  
// The Tetrominoes without rotation
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [0, displayWidth, displayWidth+1, displayWidth*2+1],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [0,1,displayWidth,displayWidth+1],
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]
  ]
  
// Display mini-grid shape
  function displayShape() {
    displaySquares.forEach(square => {
      square.classList.remove("tetromino", "block-cleared", "green", "blue", "orange", "yellow", "purple", "red", "teal");
    })
    upNextTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add("tetromino", "block-cleared");
        console.log(nextRandom);
      // Colors
    });
  }
  
  // Start button
  startButton.addEventListener("click", startGame);
  // startButton.addEventListener("click", ()=> {

//     display.classList.remove("blink");
//     display.textContent = "";
    
//     if(timerId) {
//       clearInterval(timerId);
//       timerId = null;
//     } else {
//       draw();
//       timerId = setInterval(moveDown, gameSpeed);
//       nextRandom = Math.floor(Math.random()*theTetrominoes.length);
//       displayShape();
//     }
    
//     display.textContent = `Level ${level}`;
//     setTimeout(function(){
//       display.textContent = ``;
//     }, 2500);  
  // })
  
  function startGame() {
    startButton.removeEventListener("click", startGame);
    flagGameStart = true;
    if(flagGameOver != true) {
       soundMainMusic.currentTime = 0;
       soundMainMusic.play();
       soundMainMusic.loop = true;
       display.classList.remove("blink");
       iconBtnStart.classList.remove("blink");
        display.textContent = "";
        flagGameOver = false;

        if(timerId) {
          clearInterval(timerId);
          timerId = null;
        } else if(flagGameOver != true) {
          draw();
          timerId = setInterval(moveDown, gameSpeed);
          nextRandom = Math.floor(Math.random()*theTetrominoes.length);
          displayShape();
        }

        display.textContent = `Level ${level}`;
        setTimeout(function(){
          display.textContent = ``;
        }, 2500); 
     } else if(flagGameOver == true) {
        restartGame();
     }
  }

  function restartGame() {
    console.log(`Game Restarted.`)
    
    // Clear Game Grid
    squares.forEach((item, index) => {
      if(index < 200) {
        item.classList.remove("taken", "tetromino", "block-cleared", "green", "blue", "orange", "yellow", "purple", "red", "teal");
        }
    })
    // Reset Variables
   nextRandom = 0;
   score = 0;
   level = 1;
   gameSpeed = 500;
   speedIncrease = false;
   linesTotal = 0;
   linesLevel = 10;
   counterRow = 0;
   flagGameOver = false;   
    
    scoreDisplay.innerHTML = score;   
    ctnLinesTotal.innerHTML = linesTotal;
    ctnLevel.innerHTML = level;
    ctnLinesLevel.innerHTML = linesLevel;
      
    //Restart Game
    startGame();
    timerId = setInterval(moveDown, gameSpeed);
  }
  
//Score
  function addScore() {
  // let rowBonus = currentLineScore * counterRow; 
    
      for(let i = 0; i < 199; i+= width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

        if(row.every(index => squares[index].classList.contains("taken"))) {
         
            // gameSpeed -= 10;
            counterRow += 1;
              // console.log(`counterRow: ${counterRow}`);
            clearInterval(timerId);
            timerId = setInterval(moveDown, gameSpeed);
              // console.log(`gameSpeed: ${gameSpeed}`);
          score += currentLineScore; // (Working code);
          soundClearRow.play();
            display.textContent = `Score +${currentLineScore}`;
            setTimeout(function(){
              display.textContent = ``;
            }, 2500);  
            // console.log(`score: ${score} currentLineScore${currentLineScore} + rowBonus${rowBonus}`);
          linesTotal += 1;
          linesLevel -= 1;
          // ctnLinesTotal.innerHTML = linesTotal;
          // ctnLinesLevel.innerHTML = linesLevel;
          // scoreDisplay.innerHTML = score;
          changeGameLevel();
          
          row.forEach(index => {
          squares[index].classList.remove("tetromino", "block-cleared", "green", "blue", "orange", "yellow", "purple", "red", "teal");
          squares[index].classList.add("block-cleared"); 
          })  
          setTimeout(function(){
            row.forEach(index => {
              squares[index].classList.remove("taken");
              squares[index].classList.remove("tetromino", "block-cleared", "green", "blue", "orange", "yellow", "purple", "red", "teal", "block-cleared");
            })
            const squaresRemoved = squares.splice(i, width);
            squares = squaresRemoved.concat(squares);
            squares.forEach(cell => grid.appendChild(cell));
          }, 500); 
          
         }
        }

         if(counterRow > 1) {
               // console.log(`Score: ${score}`);
            let bonusPoints = currentLineScore * counterRow;
            score += bonusPoints;
               // console.log(`bonusPoints: ${bonusPoints}`);
               // console.log(`Score + Bonus: New Score ${score}`)
               // console.log(`bonusPoints: ${bonusPoints} currentLineScore: ${currentLineScore} * counterRow: ${counterRow}`);
           display.textContent = `Bonus! +${bonusPoints}`;

           setTimeout(function(){
             display.textContent = `Score +${bonusPoints}`;
           }, 2500);  
           
           setTimeout(function(){
              display.textContent = ``;
           }, 5000);
         }   
          
        ctnLinesTotal.innerHTML = linesTotal;
        ctnLinesLevel.innerHTML = linesLevel;
        scoreDisplay.innerHTML = score;    
    
        counterRow = 0;
  } // End of addScore functions

  // Game Over
  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
      // scoreDisplay.innerHTML = 'End';
      // gameSpeed = 0;
      console.log(`GAME OVER!`);
      flagGameOver = true;
      soundMainMusic.pause();
      soundGameOver.play();
      clearInterval(timerId);
      // timerId = null;
        // display.classList.add("blink");
        // display.childNodes[0].classList.add("blink");
        display.textContent = "Game Over";
        startButton.addEventListener("click", startGame);
        iconBtnStart.classList.add("blink");
    }
  }
  
// START Joystick
const ctrUp = document.getElementById("ctr-up");
const ctrDown = document.getElementById("ctr-down");
const ctrLeft = document.getElementById("ctr-left");
const ctrRight = document.getElementById("ctr-right");
const btnStart = document.getElementById("btn-start");

ctrUp.addEventListener("click", ()=>{
  if(flagGameOver == false && flagGameStart == true) {
      rotate();
      ctrUp.style.color = "black";
      ctrUp.style.backgroundColor = "white";

        setTimeout(function(){
        ctrUp.style.color = "white"; 
        ctrUp.style.backgroundColor = "black";
      }, 500);
    } else {return}
  console.log(`flagGameOver: ${flagGameOver}`)
})
ctrDown.addEventListener("click", ()=>{
  if(flagGameOver == false && flagGameStart == true) {
    speedIncrease = true;
    changeGameSpeed();
    ctrDown.style.color = "black";
    ctrDown.style.backgroundColor = "white";

      setTimeout(function(){
      ctrDown.style.color = "white"; 
      ctrDown.style.backgroundColor = "black";
    }, 500);
  } else {return}
  console.log(`flagGameOver: ${flagGameOver}`)
})
ctrLeft.addEventListener("click", ()=>{
  if(flagGameOver == false && flagGameStart == true) {
    moveLeft();
    ctrLeft.style.color = "black";
    ctrLeft.style.backgroundColor = "white";

      setTimeout(function(){
      ctrLeft.style.color = "white"; 
      ctrLeft.style.backgroundColor = "black";
    }, 500);  
  } else {return}
  console.log(`flagGameOver: ${flagGameOver}`)
})
ctrRight.addEventListener("click", ()=>{
  if(flagGameOver == false && flagGameStart == true) {
    moveRight();
    ctrRight.style.color = "black";
    ctrRight.style.backgroundColor = "white";

      setTimeout(function(){
      ctrRight.style.color = "white"; 
      ctrRight.style.backgroundColor = "black";
    }, 500);    
  } else {return}
  console.log(`flagGameOver: ${flagGameOver}`)
})
btnStart.addEventListener("click", ()=>{
  if(flagGameOver == false && flagGameStart == true) {
    btnStart.style.color = "black";
    btnStart.style.backgroundColor = "white";

      setTimeout(function(){
      btnStart.style.color = "white"; 
      btnStart.style.backgroundColor = "black";
    }, 500);    
  } else {return}
  console.log(`flagGameOver: ${flagGameOver}`)
})// END Joystick  

})// DOMContentLoaded