const board = document.getElementById('board');
const cells =
document.querySelectorAll('.cell');
const status = 
document.getElementById('status');
let currentPlayer = "x"; // player x always starts
let gameBoard = ["","","","","","","","",""]; // Empty Board
let gameActive = true;

//winning combination
const winningCombination = [
    [0 , 1 , 2], [3 , 4 , 5], [6 , 7 , 8], //Rows
    [0 , 3 , 6], [1 , 4 , 7], [2 , 5 , 8], //Column
    [0 , 4 , 8], [2 , 4 , 6]  // Diagonals
];

//Function to handle cell clicks
function handleClick(event) {
    const index = event.target.dataset.index;

    // check if cell is already occupied or game over
    if(gameBoard[index] !=="" || !gameActive)
        return;

    //update board
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    //check for winner
    if (checkWinner()) {
        status.textContent = `You Win!`;
        gameActive = false;
        return;
    }

    //check for draw
    if (!gameBoard.includes("")){
        status.textcontent = "It's a Draw!";
        gameActive = false;
        return;
    }

    //Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textcontent = `player $ {currentPlayer}'s Turn`;

    //If playing against the computer
    if (currentPlayer === "O"){
        setTimeout(computerMove, 500);
    }
    }

    //function for computer move (simple AI)
    function computerMove(){
        if (!gameActive) return;

        let availablecells = gameBoard
        .map((cell, index) => (cell === "" ? index : null))
        .filter(index => index !== null);

        if(availablecells.length === 0) return;

        let randomIndex = 
        availablecells[Math.floor(Math.random() * availablecells.length)];
        gameBoard[randomIndex] = "O";
        cells[randomIndex].textContent = "O";
        cells[randomIndex].removeEventListener("click", handleClick);

         //check for winner after computer move
         if(checkWinner()) {
            status.textContent = "You Lose! The Computer Wins";
            gameActive = false;
            return;
         }

         //check for draw
         if (!gameBoard.includes("")){
            status.textContent = "it's a Draw!";
            gameActive = false;
            return;
         }

         //Switch back to player
         currentPlayer = "X";
         status.textContent = "Your Turn! (X)";
        }

        //Function to check winner
        function checkWinner(){
            for (let combination of winningCombination) {
                const [ a, b, c] = combination;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
                return true;
                }
            }
            return false;
        }
                  
            //Function to reset game
            function resetGame() {
                gameBoard = ["","","","","","","","",""];
                gameActive = true;
                currentPlayer = "X";
                status.textContent = "Your Turn! (X)";
                cells.forEach(cell => {
                    cell.textContent = "";
                    cell.addEventListener("click", handleClick);
                });
            }
            
            //Add event listener to all cells 
            cells.forEach(cell => cell.addEventListener("click", handleClick));

                //Initialize game status
                status.textContent = "Your Turn! (X)";
            
        


    