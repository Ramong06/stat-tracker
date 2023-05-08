import mongoose from 'mongoose'

/* StatSchema will correspond to a collection in your MongoDB database. */
const StatSchema = new mongoose.Schema({
  play_type: {
    /* Type of play run */
    type: String,
    required: [true, 'Please specify run or pass play.'],
  },

  run_attempts: {
    /* Number of running play attempts */
    type: Number,
    required: [true, 'Please provide a number.'],
  },

  run_forGain: {
    /* Did the run gain positive yardage. */
    type: Boolean,
    required: [true, "Please provide whether the play gained positive yardage."],
  },

  rushing_yds: {
    /* Total amount of rushing yards. */
    type: Number,
    required: true,
  },

  pass_attempts: {
    /* Number of Pass attempts */
    type: Number,
  },

  pass_completions: {
    /* Number of Pass completions */
    type: Number,
  },

  total_passingYds: {
    /* Total amount of passing yards. */
    type: Number,
  },
  
});

export default mongoose.models.Stats || mongoose.model('Stats', StatSchema);
