let divArray = [];
let container = document.querySelector('#container');
let enterBtn = document.querySelector('.enter');
let dropdownBtn = document.querySelector('.gridnumber');
let clearBtn = document.querySelector('.clear');
let grid_side_length = 4;
let active_color = "red";
let inactive_color = "white";




makeGridBySides(grid_side_length);

function makeGridBySides(strOfSquares) {
    clearGridSquares();
    let numberOfSquares = parseInt(strOfSquares);

    //maybe this should be more explicit in the structure...
    grid_side_length = numberOfSquares;

    for (let i = 0; i<numberOfSquares*numberOfSquares; i++) {
        divArray.push(document.createElement('div'));
        
        
        container.style.gridTemplateColumns = `repeat(${numberOfSquares},1fr)`;
        container.style.gridTemplateRows = `repeat(${numberOfSquares},1fr)`;
        /*
        divArray[i].style.width = `${.9*gridPercentage}%`;
        divArray[i].style.height = `${.9*gridPercentage}%`;
        */
        divArray[i].addEventListener('mouseenter', () => {
            divArray[i].style.backgroundColor = active_color}
        );
        /*
        divArray[i].addEventListener('mouseleave', () => {
            divArray[i].style.backgroundColor = active_color}
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
    divArray.forEach((div)=>{div.style.backgroundColor = inactive_color});
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
        grid_state_str += square.style.backgroundColor === inactive_color ? '0' : '1';        
    })
    return grid_state_str;
}

function decodeStringAsGridState(state_str) {
    if(state_str.length !== grid_side_length*grid_side_length){
        console.log(`string not long enough. Expected ${grid_side_length*grid_side_length} but got ${state_str.length}`)
        return false;
    } else {
        let grid_squares = document.querySelectorAll('#container div');
        grid_squares.forEach(function (square,currIndex) {
            square.style.backgroundColor = state_str.charAt(currIndex) === '0' ? inactive_color : active_color;
        });
        return true;
    }
}

function padGridStateString(state_str) {
    let pad_row = ''
    let padded_string = ''
    for(let i = 0; i<=grid_side_length+1;i++){
        pad_row += '0'

        if(i<grid_side_length){
            padded_string += '0' + state_str.slice(grid_side_length*i,grid_side_length*(i+1)) + '0';
            console.log(`${padded_string}`)
        }
        
    }
    padded_string = pad_row + padded_string + pad_row
    
    return padded_string
}
function evolveGridState(state_str) {

}

clearBtn.addEventListener('click',()=>{resetSquareStyle()});
enterBtn.addEventListener('click',()=>{makeGridBySides(dropdownBtn.value)});
dropdownBtn.addEventListener('keypress',function (e) {
    
        if(e.key==="Enter"){
            makeGridBySides(dropdownBtn.value)
        }
    }
    
);