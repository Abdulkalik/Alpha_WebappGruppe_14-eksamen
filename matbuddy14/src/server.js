import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/favorites', async (req, res) => {
  const favorites = await prisma.favorite.findMany()
  res.json(favorites)
})
app.post('/favorites', async (req, res) => {
  const { title, url } = req.body
  const favorite = await prisma.favorite.create({
    data: { title, url },
  })
  res.json(favorite)
})
app.delete('/favorites/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  await prisma.favorite.delete({ where: { id } })
  res.json({ message: 'Deleted successfully' })
})

app.listen(4000, () => {
  console.log('✅ API running on http://localhost:4000')
})