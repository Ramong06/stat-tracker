import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../components/Form';

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditStats = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data: stats,
    error,
    isLoading,
  } = useSWR(id ? `/api/stats/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (isLoading) return <p>Loading...</p>
  if (!stats) return null

  const statsForm = {
    play_type: stats.play_type,
    run_attempts: stats.run_attempts,
    run_forGain: stats.run_forGain,
    rushing_yds: stats.rushing_yds,
    pass_attempts: stats.pass_attempts,
    pass_completions: stats.pass_completions,
    total_passingYds: stats.total_passingYds
  }

  return <Form formId="edit-stats-form" statsForm={statsForm} forNewStats={false} />
}

export default EditStats;
