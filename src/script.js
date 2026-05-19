// Interage com a Página
import { AnalisadorSintatico } from './AnalisadorSintatico.js'


document
    .getElementById("btAnalisar")
    .addEventListener("click", btAnalisar);

document
    .getElementById("btNextStep")
    .addEventListener("click", btNextStep);

document
    .getElementById("btAllSteps")
    .addEventListener("click", btAllSteps);

document
    .getElementById("btResetSteps")
    .addEventListener("click", btResetSteps);

document
    .getElementById("btGenerateSentence")
    .addEventListener("click", (event) => {openModal('modalGenerateSentence')});

document
    .getElementById("btExitGenerateSentenceModal")
    .addEventListener("click", (event) => {exitModal('modalGenerateSentence')});

document
    .getElementById("btViewGramaticInfo")
    .addEventListener("click", (event) => {openModal('modalViewGramatic')});

document
    .getElementById("btExitViewGramaticModal")
    .addEventListener("click", (event) => {exitModal('modalViewGramatic')});


document
    .getElementById("btConfirmSentence")
    .addEventListener("click", btConfirmSentence);

const actionCellElements = document.getElementsByClassName("actionCell")

for (const element of actionCellElements) {
    element.addEventListener("click", (event) => { 
        getCellAction(event);
    });
}

let operations = [];
let step = undefined;
let sentence = undefined;
let genNextStep = undefined;

function btAnalisar(){
    const sentence = document.getElementById("inputSentence").value;
    const analisadorSintatico = new AnalisadorSintatico();
    
    operations = analisadorSintatico.resolve(sentence);
    step = 0;
    document.getElementById("tbAnalisador").innerHTML = '';
    btNextStep();
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

function btAllSteps() {
    if (step === undefined) return;
    if (step >= operations.length) return;


    for (let i=1; i<operations.length; i++){
        const table = document.getElementById("tbAnalisador");
        
        const newRow = table.insertRow();

        const cellStack = newRow.insertCell(0);
        const cellInput = newRow.insertCell(1);
        const cellAction = newRow.insertCell(2);

        cellStack.innerHTML = operations[i]['stack'];
        cellInput.innerHTML = operations[i]['input'];
        cellAction.innerHTML = operations[i]['action'];
    
    }
}

function btResetSteps() {
    const table = document.getElementById("tbAnalisador");
    table.innerHTML = ``;
    step = 0;

    btNextStep();
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const txGenSentence = document.getElementById('txGenSentence');

    sentence = undefined;
    genNextStep = undefined;
    txGenSentence.innerHTML = '';

    modal.showModal();
}

function exitModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.close();
}

function getCellAction(e) {
    if (!e.target.textContent) return;
    
    const nt = e.target.textContent.substr(0,1);
    const action = e.target.textContent.substr(5, e.target.textContent.length);        

    
    if (sentence === undefined) {
        if (nt != 'S') return;
        
        sentence = action;
    }
    else {
        if (nt !== genNextStep) return;
       
        let newSentence = "";
        for (let i=0; i<sentence.length; i++){
            const caracter = sentence[i];
            
            if (caracter!=nt) {
                newSentence += caracter;
            }
            else {
                if (action === 'ε') continue;
                newSentence += action;
            }
        }
        sentence = newSentence;
    }
    
    genNextStep = undefined;
    for (let i=0; i<sentence.length; i++) {
        const caracter = sentence[i];
        
        // É um NT
        if (caracter.charCodeAt(0) >= 65 && caracter.charCodeAt(0) <= 90){
            genNextStep = caracter;            
        }
    }

    if (genNextStep === undefined) {
        console.log("FIM DA SENTENÇA!")
    }

    document.getElementById('txGenSentence').innerHTML = sentence;
}

function btConfirmSentence() {    
    
    if (!sentence) {
        exitModal('modalGenerateSentence');
        return;
    }

    const inputSentence = document.getElementById('inputSentence');
    inputSentence.value = sentence;
    exitModal('modalGenerateSentence');
}
