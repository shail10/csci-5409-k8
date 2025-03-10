const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

app.post('/sum', (req, res) => {
  const { file, product } = req.body

  try {
    const filePath = path.join('/data/', file)

    const data = fs.readFileSync(filePath, 'utf8')
    const rows = data.trim().split('\n')

    if (rows.length < 2) {
      return res.status(400).json({
        file: file,
        error: 'Input file not in CSV format.',
      })
    }

    const headers = rows[0].split(',')

    if (
      headers.length !== 2 ||
      headers[0] !== 'product' ||
      headers[1] !== 'amount'
    ) {
      return res.status(400).json({
        file: file,
        error: 'Input file not in CSV format.',
      })
    }

    const productIndex = headers.indexOf('product')
    const amountIndex = headers.indexOf('amount')

    let sum = 0
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split(',')

      if (columns.length !== 2) {
        return res.status(400).json({
          file: file,
          error: 'Input file not in CSV format.',
        })
      }

      const amount = parseFloat(columns[amountIndex])
      if (isNaN(amount)) {
        return res.status(400).json({
          file: file,
          error: 'Input file not in CSV format.',
        })
      }

      if (columns[productIndex] === product) {
        sum += amount
      }
    }

    return res.json({
      file: file,
      sum: sum,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      file: file,
      error: 'An error occurred while processing the file.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
