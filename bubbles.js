'use strict';

// See https://esprima.readthedocs.io/en/latest/lexical-analysis.html

let sq = `
function sq(x) {
  return x * x;  // hey
}
`

let syntax = esprima.tokenize(sq, {range: true, comment: true });
console.log(JSON.stringify(syntax, null, 4));
