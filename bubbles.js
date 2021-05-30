'use strict';

// See https://esprima.readthedocs.io/en/latest/lexical-analysis.html

let f = `
function quad(a, b, c) {
  const discr = b * b - 4 * a * c;
  return (- b + sqrt(discr)) / (2 * a)
}
`

let syntax = esprima.tokenize(f, {range: true, comment: true });

let prevValue = ''
let currDiv = document.createElement('div');
for (let tok of syntax) {
  const tokType = tok.type.toLowerCase();
  console.log(tok.type, tok.value, tok.range);
  let span = document.createElement('span');
  span.textContent = tok.value
  span.classList.add('padding');
  if (prevValue === 'function') {
    span.classList.add('functionName');
  }
  else {
    span.classList.add(tokType);
  }
  if (tok.value === 'function' ||
      tok.value === '{' || tok.value === '}' || tok.value === ';' ||
      tokType === 'linecomment') {
    // hide them for now
  }
  else {
    currDiv.append(span);
    currDiv.insertAdjacentText('beforeend', ' ');
  }
  if (tok.value === '{' || tok.value === ';') {
    document.body.append(currDiv)
    currDiv = document.createElement('div');
  }
  prevValue = tok.value;
}
document.body.append(currDiv)
