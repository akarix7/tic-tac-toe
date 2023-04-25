const Gameboard = (() => {
    let gameArr = [];
    let gameDiv = document.querySelector(".game");

    const init = () => {
        _createBoard();
    }

    function _createBoard(){
        for(let i = 0; i < 9; i++){
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.id = (i).toString();
            if(i % 2 === 0) {
                cell.textContent = "x";
            }else{
                cell.textContent = "o";
            }
            gameDiv.appendChild(cell);
        }
    }
    return {
        init,
    }
})();

Gameboard.init();