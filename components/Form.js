import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

const Form = ({ formId, statsForm, forNewStats = true }) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    play_type: statsForm.play_type,
    run_attempts: statsForm.run_attempts,
    run_forGain: statsForm.run_forGain,
    rushing_yds: statsForm.rushing_yds,
    pass_attempts: statsForm.pass_attempts,
    pass_completions: statsForm.pass_completions,
    total_passingYds: statsForm.total_passingYds,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/stats/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/stats/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update pet')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/stats', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add pet')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value =
      target.name === 'run_forGain' ? target.checked : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure stats info is filled for play type*/
  const formValidate = () => {
    let err = {}
    if (!form.play_type) err.play_type = 'Play type is required'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewStats ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="play_type">Play Type</label>
        <input
          type="text"
          maxLength="20"
          name="play_type"
          value={form.play_type}
          onChange={handleChange}
          required
        />

        <label htmlFor="run_forGain" class="toggle-switch-label" for="toggleSwitch">
          Did the play gain any yards?
        </label>
        <input type="checkbox" class="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />

        <label htmlFor="run_attempts">Run Attempts</label>
        <input
          type="number"
          maxLength="30"
          name="run_attempts"
          value={form.run_attempts}
          onChange={handleChange}
          required
        />

        <label htmlFor="rushing_yds">Rushing Yards</label>
        <input
          type="number"
          name="rushing_yds"
          value={form.rushing_yds}
          onChange={handleChange}
        />

        <label htmlFor="pass_attempts">Pass Attempts</label>
        <input
          type="number"
          name="pass_attempts"
          checked={form.pass_attempts}
          onChange={handleChange}
        />

        <label htmlFor="pass_completions">Completions</label>
        <textarea
          name="pass_completions"
          value={form.pass_completions}
          onChange={handleChange}
        />

        <label htmlFor="total_passingYds">Total Passing Yards</label>
        <input
          type="number"
          name="total_passingYds"
          value={form.total_passingYds}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Form;
