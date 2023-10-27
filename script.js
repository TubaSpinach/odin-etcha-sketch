let divArray = []
let container = document.querySelector('#container');

for (let i=0; i<16;i++) {
    divArray.push(document.createElement('div'));
    container.appendChild(divArray[i]);
}