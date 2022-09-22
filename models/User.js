const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);