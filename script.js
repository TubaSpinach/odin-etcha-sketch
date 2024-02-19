let divArray = [];
let container = document.querySelector('#container');
let enterBtn = document.querySelector('.enter');
let dropdownBtn = document.querySelector('.gridnumber');
let clearBtn = document.querySelector('.clear');




makeGridBySides(4);

function makeGridBySides(strOfSquares) {
    clearGridSquares();
    let numberOfSquares = parseInt(strOfSquares);

    for (let i = 0; i<numberOfSquares*numberOfSquares; i++) {
        divArray.push(document.createElement('div'));
        
        
        container.style.gridTemplateColumns = `repeat(${numberOfSquares},1fr)`;
        container.style.gridTemplateRows = `repeat(${numberOfSquares},1fr)`;
        /*
        divArray[i].style.width = `${.9*gridPercentage}%`;
        divArray[i].style.height = `${.9*gridPercentage}%`;
        */
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

function encodeGridStateAsString() {
    let grid_squares = document.querySelectorAll('#container div');
    let grid_state_str = '';
    grid_squares.forEach(function (square) {
        grid_state_str += square.style.backgroundColor === "white" ? '0' : '1';        
    })
    return grid_state_str;
}



clearBtn.addEventListener('click',()=>{resetSquareStyle()});
enterBtn.addEventListener('click',()=>{makeGridBySides(dropdownBtn.value)});
dropdownBtn.addEventListener('keypress',function (e) {
    
        if(e.key==="Enter"){
            makeGridBySides(dropdownBtn.value)
        }
    }
    
);