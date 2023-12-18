import { ObjectId } from 'mongodb'
import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const { title } = req.query

  if (!title) {
    return res.status(400).json({ error: 'Title parameter is required' })
  }

  const client = await clientPromise
  const db = client.db()

  try {
    const articlesCollection = db.collection('articles')
    const articles = await articlesCollection
      .find({ title: { $regex: new RegExp(title, 'i') } })
      .toArray()

    res.status(200).json(articles)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
