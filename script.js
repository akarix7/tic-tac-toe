const Player = (name, piece, turn) => {
    const getName = () => name;
    const setName = (name) => {
        this.name = name;
    }
    const getPiece = () => piece;
    const getTurn = () => turn;
    const setTurn = () => {
        turn = !turn;
    }

    return {getName, getPiece, getTurn, setTurn};
}

const Gameboard = (() => {
    //let gameArr = [["x", "o", "x"], ["o", "x", "o"], ["x", "o", "x"]];
    let gameArr = new Array(3);
    let gameDiv = document.querySelector(".game");
    let containerDiv = document.querySelector(".container");

    const init = () => {
        _createBoard();
        _render();
    }

    const displayForm = () => {
        // gameDiv.style.transform = "scale(0)";
        gameDiv.style.visibility = "hidden";
        //gameDiv.style.display = "none";
    }

    //handle data:
    //1. if submit and empty just default player one, player two
    //2. if with data then make new player but must be sent to Game Controller and set there.
    //Question is how to send data? array? does return work?
    const handleForm = () => {
        const form = document.getElementById("names");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const player1 = form.elements["one"].value;
            const player2 = form.elements["two"].value;
            // console.log(form.elements["one"].value);
            // console.log(form.elements["two"].value);
            return {player1, player2}
        })
        console.log("hello");
    }

    const getGameArr = () => gameArr;
//change from div to button? then use inactive option to make all cells/buttons inactive
    const _createBoard = () => {
        for(let i = 0; i < 9; i++){
            let cell = document.createElement("button");
            cell.className = "cell";
            cell.dataset.id = (i).toString();
            gameDiv.appendChild(cell);
        }
    }

    const _render = () => {
        let index = 0;
        for(let i = 0; i < 3; i++){
            gameArr[i] = new Array(3);
            for(let j = 0; j < 3; j++){
                // console.log(gameDiv.children.item(index).dataset.id);
                gameDiv.children.item(index++).addEventListener("click", oneClick, {once: true});

                function oneClick(e) {
                    gameArr[i][j] = GameController.getActivePlayer().getPiece();
                    e.target.textContent = gameArr[i][j];
                    //let active = gameDiv.closest("div").querySelector(".cell");
                    e.target.classList.add("marked");
                    //e.target.removeEventListener("click", oneClick);
                    GameController.playRound();

                    if(GameController.isGameOver()){
                        if(GameController.getTurnsLeft() !== 0) {
                            _displayWinner(GameController.getWinner());
                        }else{
                            _displayTie();
                        }
                        const cells = document.querySelectorAll(".cell");

                        cells.forEach(cell => {
                            cell.disabled = true;
                        })
                        _displayResetButton();

                    }
                }
            }
        }
    }
    const _displayWinner = (winner) => {
        let divTitle = document.getElementById("title");
        divTitle.textContent = winner.getName() + " wins!";
    }

    const _displayTie = () => {
        let divTitle = document.getElementById("title");
        divTitle.textContent = "It's a tie!";
    }

    const _displayResetButton = () => {
        if(!document.querySelector(".resetGame")) {
            let button = document.createElement("button");
            button.className = "resetGame";
            button.textContent = "Reset Game";
            button.addEventListener("click", () => {
                resetGame();
            })
            document.querySelector("body").appendChild(button);
        }else{
            document.querySelector(".resetGame").style.display = "";
        }
    }

    const resetGame = () => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                gameArr[i].pop();
            }
        }
        let divTitle = document.getElementById("title");
        divTitle.textContent = "Tic-Tac-Toe";

        const cells = document.querySelectorAll(".cell");

        cells.forEach(cell => {
            cell.disabled = false;
            cell.textContent = "";
            cell.classList.remove("marked");
        })
        GameController.resetGame();
        _render();
        document.querySelector(".resetGame").style.display = "none";
    }

    return {
        init,
        getGameArr,
        displayForm,
        handleForm
    }
})();

const GameController = (() => {
    Gameboard.init();
    //console.log(Gameboard.handleForm.player1);
    let board = Gameboard.getGameArr();
    let turnsLeft = 9;

    const playerOne = Player("Player One", "x", true);
    const playerTwo = Player("Player Two", "o", false);

    let activePlayer = playerOne;
    let isWinner = null;
    const _switchTurns = () => {
        activePlayer = playerOne.getTurn() ? playerTwo : playerOne;
        playerOne.setTurn();
        playerTwo.setTurn();
    }
    const getActivePlayer = () => activePlayer;

    const _checkWinner = () => {
        //rows
        for(let i = 0; i < 3; i++) {
            if (board[i][0] !== undefined && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                setWinner(getActivePlayer());
                console.log("row winner!");
            }
        }
        //columns
        for(let i = 0; i < 3; i++) {
            if (board[0][i] !== undefined && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                setWinner(getActivePlayer());
                console.log("column winner!!");
            }
        }
        //diagonal
        if (board[0][0] !== undefined && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
            setWinner(getActivePlayer());
            console.log("LTR diagonal");
        }
        if (board[0][2] !== undefined && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
            setWinner(getActivePlayer());
            console.log("RTL diagonal");
        }
    }

    const setWinner = (player) => {
        isWinner = player;
    }

    const getWinner = () => isWinner;

    const isGameOver = () => {
        return getWinner() !== null || getTurnsLeft() === 0;
    }

    const _counter = () => --turnsLeft;

    const getTurnsLeft = () => turnsLeft;

    const resetGame = () => {
        setWinner(null);
        turnsLeft = 9;
        activePlayer = playerOne;

        !playerOne.getTurn() ? playerOne.setTurn() : playerTwo.setTurn();
    }

    //logic to play game
    const playRound = () => {
        _counter();
        _checkWinner();
        _switchTurns();
    }

    return {
        getActivePlayer,
        playRound,
        getWinner,
        getTurnsLeft,
        isGameOver,
        resetGame
    }
})();
