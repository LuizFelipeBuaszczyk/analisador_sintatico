# Analisador Sintático

Este repositório contém a implementação de um **analisador sintático**, desenvolvido como parte do TDE (*Trabalho Discente Efetivo*) da disciplina de Compiladores.

## Gramática GLC (LL1)

O analisador foi desenvolvido seguindo a seguinte gramática.

```text
S ::= aBb | bAc |cCb
A ::= aCb |  ε
B ::= aCa | bAb
C ::= aB | cAc
```
