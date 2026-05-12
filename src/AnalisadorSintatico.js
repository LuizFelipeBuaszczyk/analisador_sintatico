

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
        
        let counter = 0;
        const operations = [];
        while(sentence.length > 0) {
            counter++;
            const operationLine = {};
            operations.push(operationLine);

            operationLine['stack'] = [...this.stack];
            operationLine['input'] = sentence;

            const terminal = this.stack.pop();
            const letter = sentence[0];

            if (terminal == '$' && letter == '$') {
                operationLine['action'] = `ACEITO EM ${counter}`
                return operations;
            }
            if (letter == '$') {
                operationLine['action'] = `REJEITA EM ${counter}`;
                return operations;
            }
            
            // Verificar se é um terminal
            if (terminal.charCodeAt(0) >= 97 && terminal.charCodeAt(0)<=122){
                if (letter == terminal) {
                    sentence = sentence.slice(1, sentence.length);
                    operationLine['action'] = `LER ${letter}`
                    continue;
                }
                operationLine['action'] = `REJEITA EM ${counter}`;
                return operations;
            }
            
            // Não terminal
            const action = this.parseTable[terminal][letter];
            if (!action) {
                operationLine['action'] = `REJEITA EM ${counter}`;
                return operations;
            }
            
            operationLine['action'] = `${terminal} -> ${action}`;

            if (action == 'epsilon'){
                continue;
            } 

            for (let i=action.length-1; i>=0; i--){
                this.stack.push(action[i]);
            }
        }
    }
}
