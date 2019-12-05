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

async function generateSentenceKeywords(stream) {
  return new Promise((resolve, reject) => {
    let output = ''

    stream
      .pipe(conllu())
      .on('data', function(sentence) {
        let tags = []
    
        Object.entries(sentence.tokens).forEach(([_id, token]) => {
          if(token.upostag !== 'PUNCT' && token.upostag !== 'NUM' && token.upostag !== 'SYM') {
            tags.push(token.form)
          }
        })
    
        output += tags.join(' ') + '\n'
      })
      .on('error', function (error) {
        reject(error)
      })
      .on('end', function () {
        resolve(output)
      })    
  })
} 

(async function() {
  console.log(
    await generateSentenceKeywords(readableStreamOf(TEST_CONLLU))
  )
})()
