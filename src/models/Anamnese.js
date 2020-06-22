const mongoose = require('mongoose')
const Schema = mongoose.Schema
const anamneseSchema = Schema(
	{
		studentID: {
			type: String,
			requires: true
		},
		studentName: {
			type: String,
			required: true
		},
		dtNasc: {
			type: Date
		},
		ocupation: {
			type: String
		},
		target: {
			type: String
		},
		physicalActivities: {
			type: String
		},
		health: {
			type: String
		},
		pains: {
			type: String
		},
		surgeries: {
			type: String
		},
		medicines: {
			type: String
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Anamnese', anamneseSchema)
