let divArray = []
let container = document.querySelector('#container');

for (let i=0; i<16;i++) {
    divArray.push(document.createElement('div'));
    
    divArray[i].addEventListener('mouseenter', () => {
        divArray[i].style.backgroundColor = "red"}
    );
    divArray[i].addEventListener('mouseleave', () => {
        divArray[i].style.backgroundColor = "white"}
    );
    
    container.appendChild(divArray[i]);
}