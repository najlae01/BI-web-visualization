import { ObjectId } from 'mongodb'
import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const { date_publication } = req.query

  if (!date_publication) {
    return res.status(400).json({ error: 'Date parameter is required' })
  }

  const client = await clientPromise
  const db = client.db()

  try {
    const articlesCollection = db.collection('articles')

    const year = parseInt(date_publication, 10)

    const articles = await articlesCollection
      .find({ date_publication: year })
      .limit(10)
      .toArray()

    res.status(200).json(articles)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
