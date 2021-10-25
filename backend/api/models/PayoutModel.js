var mongoose = require("mongoose");

var PayoutSchema = new mongoose.Schema({
	amount: {type: Number, required: true},
	description: {type: String, required: true},
	date: {type: Date, default:Date.now},
}, {timestamps: true});

module.exports = mongoose.model("Payout", PayoutSchema);