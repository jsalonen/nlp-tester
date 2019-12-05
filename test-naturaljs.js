const natural = require('natural')
const tokenizer = new natural.OrthographyTokenizer({ language: 'fi' })

const text = 'Kokonaiset kirsikkatomaatit on viskattu salaattikupin reunalle pieneksi keoksi.'
const result = tokenizer.tokenize(text)
console.log(result)
