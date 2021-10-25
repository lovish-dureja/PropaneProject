var mongoose = require("mongoose");

var PriceSchema = new mongoose.Schema({
	price: {type: Number, required: true},
	date: {type: Date, default:Date.now},
}, {timestamps: true});

module.exports = mongoose.model("Price", PriceSchema);