let divArray = [];

let container = document.querySelector('#container');
let enterBtn = document.querySelector('.enter');
let dropdownBtn = document.querySelector('.gridnumber');
let clearBtn = document.querySelector('.clear');
let evolveBtn = document.querySelector('.evolve');

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
        }
        
    }
    padded_string = pad_row + padded_string + pad_row
    
    return padded_string
}

function unPadGridStateString(padded_str) {
    let raw_str = '';
    let padded_row_length = grid_side_length+2
    for(let i = 0; i < grid_side_length+1; i++){
        raw_str += i > 0 ? padded_str.slice(i*(padded_row_length)+1,i*padded_row_length+grid_side_length+1) : '';
    }

    return raw_str;
}

function evolveGridState(state_str) {
    let padded_state = padGridStateString(state_str);
    let padded_side_length = grid_side_length + 2;
    let evolved_state = '';

    for(let i = 0; i<padded_state.length;i++){
        if((i>=0 && i<padded_side_length) || (i>=padded_side_length*(padded_side_length-1) && i<padded_state.length) 
                || (i%padded_side_length == 0) || (i%padded_side_length == padded_side_length-1)){
            evolved_state += '0';
        } else {
            neighborhood_of_ith_cell = [padded_state.charAt(i-padded_side_length-1),padded_state.charAt(i-padded_side_length),padded_state.charAt(i-padded_side_length+1),
                                        padded_state.charAt(i-1),padded_state.charAt(i),padded_state.charAt(i+1),
                                        padded_state.charAt(i+padded_side_length-1),padded_state.charAt(i+padded_side_length),padded_state.charAt(i+padded_side_length+1)];
            
            let pop_value = evaluateNeighborhood(neighborhood_of_ith_cell);
            let current_cell = padded_state.charAt(i);

            if(current_cell==='0'){
                evolved_state += pop_value == 3 ? '1' : current_cell;
            } else {
                evolved_state += pop_value < 2 ? '0' : pop_value > 3 ? '0' : current_cell;
            }
                                    
        }
    }

    return unPadGridStateString(evolved_state);
}

function evaluateNeighborhood(neighborhood){
    let answer = 0
    neighborhood.forEach(function (value,currIndex) {
        if(currIndex == 4){
            answer += 0;
        } else {
            answer += parseInt(value);
        }
    })
    return answer;
}
clearBtn.addEventListener('click',()=>{resetSquareStyle()});
enterBtn.addEventListener('click',()=>{makeGridBySides(dropdownBtn.value)});
dropdownBtn.addEventListener('keypress',function (e) {
    
        if(e.key==="Enter"){
            makeGridBySides(dropdownBtn.value)
        }
    }
    
);
evolveBtn.addEventListener('click',()=>{
    decodeStringAsGridState(evolveGridState(encodeGridStateAsString()))
});