import dbConnect from '../../../lib/dbConnect';
import Stats from '../../../models/Stats';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const gameStat = await Stats.findById(id) /* variable was "pet" before change.*/
        if (!gameStat) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: gameStat })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const gameStat = await Stats.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!gameStat) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: gameStat })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedStat = await Stats.deleteOne({ _id: id }) /* variable was "deletedPet" before change.*/
        if (!deletedStat) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
