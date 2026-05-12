// Interage com a Página
import { AnalisadorSintatico } from './AnalisadorSintatico.js'


document
    .getElementById("btAnalisar")
    .addEventListener("click", btAnalisar)

let operations = [];


function btAnalisar(){
    const sentence = document.getElementById("inputSentence").value;
    const analisadorSintatico = new AnalisadorSintatico();
    
    operations = analisadorSintatico.resolve(sentence);
    
    console.log(operations);
}

