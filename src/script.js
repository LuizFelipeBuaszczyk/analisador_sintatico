// Interage com a Página
import { AnalisadorSintatico } from './AnalisadorSintatico.js'


document
    .getElementById("btAnalisar")
    .addEventListener("click", btAnalisar)




function btAnalisar(){
    const sentence = document.getElementById("inputSentence").value;
    
    const analisadorSintatico = new AnalisadorSintatico();

    const result = analisadorSintatico.resolve(sentence);

    console.log(result);
}

