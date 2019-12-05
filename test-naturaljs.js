const natural = require('natural')
const tokenizer = new natural.OrthographyTokenizer({ language: 'fi' })
const fs = require('fs')
const TEST_TEXT = fs.readFileSync('test.txt').toString()

const result = tokenizer.tokenize(TEST_TEXT)
console.log(result)
