

export class AnalisadorSintatico {
    
    constructor(){
    this.parseTable = {
        'S': {
            'a': 'aBb',
            'b': 'bAc',
            'c': 'cCb'
        },
        'A': {
            'a': 'aCb',
            'b': 'epsilon',
            'c': 'epsilon'
        },
        'B': {
            'a': 'aCa',
            'b': 'bAb'
        },
        'C': {
            'a': 'aB',
            'c': 'cAc'
        }
    };

    this.stack = ['$', 'S'];
    }
    
    // Analise Sintática completa
    resolve(sentence) {
        sentence = sentence + '$';
        while(sentence.length > 0){
            const terminal = this.stack.pop();
            const letter = sentence[0];
           
            if (terminal == '$' && letter == '$') {
                return true;
            }
            if (letter == '$') return false;
            
            // Verificar se é um terminal
            if (terminal.charCodeAt(0) >= 97 && terminal.charCodeAt(0)<=122){
                if (letter == terminal) {
                    sentence = sentence.slice(1, sentence.length);
                    continue;
                }
                return false;
            }
            
            // Não terminal
            const action = this.parseTable[terminal][letter];
            if (!action) {
                return false;
            }
            
            if (action == 'epsilon') continue;

            for (let i=action.length-1; i>=0; i--){
                this.stack.push(action[i]);
            }
        }
    }
}
