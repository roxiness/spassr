const {appendFileSync} = require('fs')
const footer = '\n\n---\n\n<a href="https://www.freepik.com/vectors/business">Business vector created by teravector - www.freepik.com</a>'

appendFileSync('./README.md', footer)