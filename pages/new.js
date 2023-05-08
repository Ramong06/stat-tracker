import Form from '../components/Form'

const NewStats = () => {
  const statsForm = {
    play_type: '',
    run_forGain: false,
    rushing_yds: 0,
    pass_attempts: 0,
    pass_completions: 0,
    total_passingYds: 0,
  }

  return <Form formId="add-stats-form" statsForm={statsForm} />
}

export default NewStats;
