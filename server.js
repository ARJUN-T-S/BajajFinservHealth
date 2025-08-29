const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

function processData(data) {
  let even = [], odd = [], alphabets = [], specials = [], sum = 0, alphaChars = []

  data.forEach(item => {
    const str = String(item)
    if (!isNaN(str) && str.trim() !== '') {
      const num = Number(str)
      sum += num
      num % 2 === 0 ? even.push(str) : odd.push(str)
    } else if (/[a-zA-Z]/.test(str)) {
      alphabets.push(str.toUpperCase())
      alphaChars.push(str)
    } else {
      specials.push(str)
    }
  })

  let concat = ''
  if (alphaChars.length) {
    const reversed = alphaChars.join('').split('').reverse().join('')
    concat = [...reversed].map((ch, i) => i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()).join('')
  }

  return {
    is_success: true,
    user_id: "ts_arjun_02082004",
    email: "tgsarjun083@gmail.com",
    roll_number: "22BCE0507",
    odd_numbers: odd,
    even_numbers: even,
    alphabets,
    special_characters: specials,
    sum: String(sum),
    concat_string: concat
  }
}

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input. 'data' must be an array." })
    }
    res.status(200).json(processData(data))
  } catch (err) {
    res.status(500).json({ is_success: false, error: "Internal server error" })
  }
})

app.get('/bfhl', (req, res) => res.status(200).json({ operation_code: 1 }))

app.all('*', (req, res) => res.status(404).json({ error: 'Route not found' }))


module.exports = app

