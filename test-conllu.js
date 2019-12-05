const conllu = require('conllu-stream')
const fs = require('fs')
const TEST_CONLLU = fs.readFileSync('test.conllu').toString()
const { Readable } = require('stream')

function readableStreamOf(text) {  
  const input = new Readable()
  input.push(TEST_CONLLU)
  input.push(null)

  return input
}

let output = ''

readableStreamOf(TEST_CONLLU)
  .pipe(conllu())
  .on('data', function(sentence) {
    let tags = []

    Object.entries(sentence.tokens).forEach(([id, token]) => {
      if(token.upostag !== 'PUNCT' && token.upostag !== 'NUM' && token.upostag !== 'SYM') {
        tags.push(token.form)
      }
    })

    output += tags.join(' ') + '\n'
  })
  .on('end', function () {
    console.log(output)
  })
