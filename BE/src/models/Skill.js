const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, 
    category: { type: String, enum: ['Technical', 'Soft Skills', 'Domain'] },
    experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'] } 
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
