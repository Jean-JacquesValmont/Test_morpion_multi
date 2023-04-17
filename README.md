<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Morpion RubikCube</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="board">
        <div class= "cell" ></div>
        <div class= "cell" ></div>
        <div class= "cell" ></div>
        <div class= "cell" ></div>
        <div class= "cell" ></div>
        <div class= "cell" ></div>
        <div class= "cell" ></div>
        <div class= "cell" ></div>
        <div class= "cell" ></div>
    </div>
    <p id="message"></p>

    <script src="/socket.io/socket.io.js"></script>

    <script>
    //Pour permet l'échange avec le serveur
    let socket = io()
    
    //Variables
    let currentPlayer = "X";
    let gameOver = false;
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    
    const init = () => {
	board = ["","","","","","","","",""];
    }

    const changePlayer = () => {

    if (currentPlayer === "X") {
    currentPlayer = "O";
    
    } else {
    currentPlayer = "X";
        
    }}

    const removeListeners = () => {
        cells.forEach((cell) => {
            cell.removeEventListener("click", onCellClick);
        });
    };

    // //Quand une cellule est cliqué envoie l'information au serveur
    const onCellClick = (event) => {
        const cell = event.target;
        if (cell.innerText == ""){
        const index = Array.from(cells).indexOf(cell);
        socket.emit("play_a_case", currentPlayer, index);
        }
    };

    cells.forEach((cell) => {
        if (gameOver == false) {
            cell.addEventListener("click", onCellClick);
        }
    });

    //Récupére l'information envoyer par le serveur
    socket.on("play_a_case", function(currentPlayer, index){
        // console.log("Joueur reçu: " + currentPlayer)
        // console.log("Index reçu: " + index)

        const cell = cells[index];
        cell.innerText = currentPlayer;
        board[index] = currentPlayer;

        console.log(board)

        checkWin()
        changePlayer()
        
    });

    // Vérifie si un joueur a gagné
    const checkWin = () => {
	const winningPositions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	winningPositions.forEach((position) => {
		const [a, b, c] = position;
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			gameOver = true;
			message.innerText = `Le joueur ${currentPlayer} a gagné !`;
            removeListeners();

          return;
        }
    })
    }

    init()

    </script>
    
</body>
</html>
