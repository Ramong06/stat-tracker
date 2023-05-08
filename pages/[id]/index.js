import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Stats from '../../models/Stats'

/* Allows you to view stats card info and delete stats card*/
const StatsPage = ({ statistic }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const statID = router.query.id

    try {
      await fetch(`/api/stats/${statID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete this statistic.')
    }
  }

  return (
    <div key={statistic._id}>
      <div className="card">
        <h5 className="pet-name" id="playType">{statistic.play_type}</h5>
        <div className="main-content">
          <p className="pet-name" id="forGain">{statistic.run_forGain}</p>
          <p className="owner">Rushing Yards: {statistic.rushing_yds}</p>
          <p className="owner" id="passAttempts">Pass Attempts: {statistic.pass_attempts}</p>
          <p className="owner" id="passAttempts">Pass Completions: {statistic.pass_completions}</p>
          <p className="owner" id="passAttempts">Total Passing Yards: {statistic.total_passingYds}</p>
          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${statistic._id}/edit`} legacyBehavior>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const statistic = await Stats.findById(params.id).lean()
  statistic._id = statistic._id.toString()

  return { props: { statistic } }
}

export default StatsPage;
