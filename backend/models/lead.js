const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: [true, 'A lead enter a name']
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, 'A lead must enter a last name']
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  email: {
    type: String,
    trim: true
  },
  ftvoter: {
    type: Boolean,
    required: [true, 'Lead must select an option']
  },
  idnumber: {
    type: Number,
    unique: true,
    required: [true, 'A lead must have an ID']
  },
  dob: {
    type: Date,
    required: [true, 'A date of birth is required']
  },
  gender: {
    type: Number,
    required: [true, 'A lead must have a gender']
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'A lead must have an ID number']
  },
  town: {
    type: String,
    trim: true,
    required: [true, 'A lead enter a town']
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'A lead must enter a city']
  },
  province: {
    type: String,
    trim: true,
    required: [true, 'A province must be selected']
  },
  stations: [String],
  referrer: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    // hide from output
    select: false
  }
});

leadSchema.pre('find', function(next) {
  this.find();
  next();
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
