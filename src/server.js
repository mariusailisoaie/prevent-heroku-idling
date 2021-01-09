import express, { Router } from 'express'
import serverless from 'serverless-http'
import axios from 'axios'

const app = express()
const router = Router()

process.env.SILENCE_EMPTY_LAMBDA_WARNING = true

router.get('/', async (req, res) => {
  res.send('hello')

  setInterval(async () => {
    const { data } = await axios.get('https://crown-clothing-copenhagen.herokuapp.com/api/ping')
    console.log(data)

  }, 1000)
})

app.use('/.netlify/functions/server', router)

export default app
export const handler = serverless(app)
