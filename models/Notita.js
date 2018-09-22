const Schema = require('mongoose').Schema

const notitaSchema = new Schema({
  title: String,
  body: String,
  photo: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

module.exports = require('mongoose').model('Notita', notitaSchema)