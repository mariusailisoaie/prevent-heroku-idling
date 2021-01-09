import express, { Router } from 'express'
import serverless from 'serverless-http'
import { schedule } from 'node-cron'
import axios from 'axios'

const app = express()
const router = Router()

process.env.SILENCE_EMPTY_LAMBDA_WARNING = true

schedule('*/25 * * * *', async () => {
  const { data } = await axios.get('https://crown-clothing-copenhagen.herokuapp.com/api/ping')
  console.log(data)
})

router.get('/', async (req, res) => {
  res.send('hello')
})

app.use('/.netlify/functions/server', router)

export default app
export const handler = serverless(app)
