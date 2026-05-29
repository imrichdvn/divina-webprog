const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: [String], required: true },
    preview: { type: String, default: '' },
    imageKey: { type: String, default: '1' },
    status: { type: String, enum: ['active', 'disabled'], default: 'active' },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
