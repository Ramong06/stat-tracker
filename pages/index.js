import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Stats from '../models/Stats'

const Home = ({ pets }) => (
  <>
    {/* Create a card for each pet */}
    {pets.map((statistic) => (
      <div key={statistic._id}>
        <div className="card">
          <h5 className="pet-name">{statistic.play_type}</h5>
          <div className="main-content">
            <p className="pet-name">{statistic.run_attempts}</p>
            <p className="owner">{statistic.rushing_yds}</p>

            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${statistic._id}/edit`} legacyBehavior>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${statistic._id}`} legacyBehavior>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Stats.find({})
  const stats = result.map((doc) => {
    const stat = doc.toObject()
    stat._id = stat._id.toString()
    return stat;
  })

  return { props: { pets: stats } }
}

export default Home;
