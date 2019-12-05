var conllu = require('conllu-stream');

let output = ''

require('fs').createReadStream('test.conllu')
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
