// Import required modules
const express = require('express')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const app = express()
const PORT = 6000

app.use(express.json())

app.post('/calculate', async (req, res) => {
  const { file } = req.body

  if (!file) {
    return res.json({
      file: null,
      error: 'Invalid JSON input.',
    })
  }

  const filePath = path.join('/data/', file)

  if (!fs.existsSync(filePath)) {
    return res.json({
      file: file,
      error: 'File not found.',
    })
  }

  try {
    const response = await axios.post('http://container2:8000/sum', req.body)
    return res.json(response.data)
  } catch (error) {
    return res.status(500).json(error.response.data)
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
