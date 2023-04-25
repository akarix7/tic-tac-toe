const Gameboard = (() => {
    let gameArr = [["x", "o", "x"], ["o", "x", "o"], ["x", "o", "x"]];
    let gameDiv = document.querySelector(".game");

    const init = () => {
        _createBoard();
        _render();
    }

    function _createBoard(){
        for(let i = 0; i < 9; i++){
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.id = (i).toString();
            gameDiv.appendChild(cell);
        }
    }

    function _render(){
        let index = 0;
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                // console.log(gameDiv.children.item(index).dataset.id);
                gameDiv.children.item(index++).textContent = gameArr[i][j];
            }
        }
    }
    return {
        init,
        gameArr
    }
})();

Gameboard.init();