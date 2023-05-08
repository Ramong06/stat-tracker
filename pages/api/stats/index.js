import dbConnect from '../../../lib/dbConnect';
import Stats from '../../../models/Stats';

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const stats = await Stats.find({}) /* find all the data in our database & variable was "pets" before change. */
        res.status(200).json({ success: true, data: stats })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const statistic = await Stats.create(   /* variable Was "pet" before */
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: statistic })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
