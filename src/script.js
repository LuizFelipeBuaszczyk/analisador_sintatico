// Interage com a Página
import { AnalisadorSintatico } from './AnalisadorSintatico.js'


document
    .getElementById("btAnalisar")
    .addEventListener("click", btAnalisar);

document
    .getElementById("btNextStep")
    .addEventListener("click", btNextStep);

document
    .getElementById("btGenerateSentence")
    .addEventListener("click", openModal);

document
    .getElementById("btExitModal")
    .addEventListener("click", exitModal);

const actionCellElements = document.getElementsByClassName("actionCell")

for (const element of actionCellElements) {
    element.addEventListener("click", (event) => { 
        getCellAction(event);
    });
}

let operations = [];
let step = undefined;

function btAnalisar(){
    const sentence = document.getElementById("inputSentence").value;
    const analisadorSintatico = new AnalisadorSintatico();
    
    operations = analisadorSintatico.resolve(sentence);
    step = 0;
    document.getElementById("tbAnalisador").innerHTML = '';
    console.log("SEQUENCIA DE OPERAÇÕES GERADA");
}

function btNextStep() {
    if (step === undefined) return;
    if (step >= operations.length) return;

    const table = document.getElementById("tbAnalisador");
    
    const newRow = table.insertRow();

    const cellStack = newRow.insertCell(0);
    const cellInput = newRow.insertCell(1);
    const cellAction = newRow.insertCell(2);

    cellStack.innerHTML = operations[step]['stack'];
    cellInput.innerHTML = operations[step]['input'];
    cellAction.innerHTML = operations[step]['action'];
    
    step++;
}

function openModal() {
    const modal = document.getElementById('modalGenerateSentence');
    modal.showModal();
}

function exitModal() {
    const modal = document.getElementById('modalGenerateSentence');
    modal.close();
}

function getCellAction(e) {
    console.log(e);
}
