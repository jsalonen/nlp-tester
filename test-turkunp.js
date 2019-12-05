const axios = require('axios')

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
  const text = 'Kokonaiset kirsikkatomaatit on viskattu salaattikupin reunalle pieneksi keoksi.'
  const output = await parsePlaintextTurkunp(text)
  console.log(output)
})()
