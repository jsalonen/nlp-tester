const axios = require('axios')
const fs = require('fs')
const TEST_TEXT = fs.readFileSync('test.txt').toString()

async function parsePlaintextTurkunp(text) {
  const response =
    await axios.post(
      'http://localhost:7689/',
      text, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8'
        }
      }
    )

  return response.data
}

(async function() {
  const output = await parsePlaintextTurkunp(TEST_TEXT)
  console.log(output)
})()
