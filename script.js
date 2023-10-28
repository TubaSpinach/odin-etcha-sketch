let divArray = [];
let container = document.querySelector('#container');
let enterBtn = document.querySelector('.enter');
let dropdownBtn = document.querySelector('.gridnumber');




makeGridBySides(4);

function makeGridBySides(strOfSquares) {
    clearGridSquares();
    let numberOfSquares = parseInt(strOfSquares);

    for (let i = 0; i<numberOfSquares*numberOfSquares; i++) {
        divArray.push(document.createElement('div'));
        
        let gridPercentage = 100 / numberOfSquares
        divArray[i].style.width = `${.9*gridPercentage}%`;
        divArray[i].style.height = `${.9*gridPercentage}%`;

        divArray[i].addEventListener('mouseenter', () => {
            divArray[i].style.backgroundColor = "red"}
        );
        /*
        divArray[i].addEventListener('mouseleave', () => {
            divArray[i].style.backgroundColor = "white"}
        );
        */
        
        container.appendChild(divArray[i]);
    }
    resetSquareStyle();
}

function clearGridSquares() {
    resetGrid();
    resetSquareStyle();
}

function resetSquareStyle() {
    let divArray = container.querySelectorAll('div');
    divArray.forEach((div)=>{div.style.backgroundColor = "white"});
}
function resetGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


enterBtn.addEventListener('click',()=>{makeGridBySides(dropdownBtn.value)});