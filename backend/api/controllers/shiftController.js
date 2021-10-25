/*
 * Shift Controller
 * @description
 * The Shift controller is used for handling all the functions related to the shift.
 */

var crypto = require('crypto');
const ShiftSchema = require('../models/ShiftModel');
const PayoutSchema = require('../models/PayoutModel');
const PriceSchema = require('../models/PriceModel');

const {
    errorResponse,
    successResponse,
} = require('../util/rest');
const Messages = require('../util/messages');
const httpCodes = require('../util/httpCodes');
const { priceChangeValidation, payoutValidation, shiftStartValidation } = require('../validations/validation');

// api for start shift
exports.startShift = async function(req, res) {
    console.log('here I am ')
    try{
        // api validations
        const { error } = shiftStartValidation(req.body)
        if(error){
            console.log(error, '----error')
            return errorResponse(res, httpCodes.badReq,error.details[0].message);
        }
        const shiftData = new ShiftSchema({
            name: req.body.name,
            startTimeStamp : Date.now(),
            price: req.body.price,
            starting_litres_dispenser1: req.body.litres_dispenser1,
            starting_litres_dispenser2: req.body.litres_dispenser2,
            ending_litres_dispenser1: 0,
            ending_litres_dispenser2:0,
            status: 1 // 1 means shift is active 2 means shift is ended
        })
        const savedData = await shiftData.save();
        
        successResponse(res,Messages.say('Shift has been started'), savedData);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

// Api for the payout
exports.payout = async function(req, res) {
    try{
        // api validations
        const { error } = payoutValidation(req.body)
        if(error){
            return errorResponse(res, httpCodes.badReq,error.details[0].message);
        }
        const payoutData = new PayoutSchema({
            amount: req.body.amount,
            description : re.body.description,
       })
        const savedData = await payoutData.save();
        
        successResponse(res,Messages.say('Payout is saved'), savedData);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

// Api for the price change
exports.priceChange = async function(req, res) {
    try{
        // api validations
        const { error } = priceChangeValidation(req.body)
        if(error){
            return errorResponse(res, httpCodes.badReq,error.details[0].message);
        }
        const priceData = new PriceSchema({
            price: req.body.new_price,
       })
        const savedData = await priceData.save();
        
        successResponse(res,Messages.say('Price is changed'), savedData);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

// Api for fetching the price
exports.fetchPrice = async function(req, res) {
    try{
        const priceData = await PriceSchema.find();
        console.log('price change data', priceData); 
        successResponse(res,Messages.say('Fetched the current price'), priceData);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.endShift = async function(req, res) {
    console.log('here I am ')
    try{
        // // api validations
        // const { error } = shiftStartValidation(req.body)
        // if(error){
        //     console.log(error, '----error')
        //     return errorResponse(res, httpCodes.badReq,error.details[0].message);
        // }
        const shiftData = await ShiftSchema.findOne({_id:req.body.shiftId}) 
        if(!shiftData){
            return errorResponse(res, httpCodes.badReq,Messages.emailNotExist);
        }
        shiftData.endTimeStamp = Date.now(),
        shiftData.ending_litres_dispenser1 = req.body.litres_dispenser1,
        shiftData.ending_litres_dispenser2 = req.body.litres_dispenser2
        
        // const endShift = new ShiftSchema({
        //     name: req.body.name,
        //     endTimeStamp : Date.now(),
        //     ending_litres_dispenser1: req.body.litres_dispenser1,
        //     ending_litres_dispenser2: req.body.litres_dispenser2,
        //     status: 2 // 1 means shift is active 2 means shift is ended
        // })
        let savedData = await shiftData.save();
        
        successResponse(res,Messages.say('Shift has been ended'), savedData);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

// Api for fetching the shift listing
exports.shiftListing = async function(req, res) {
    try{
        const shiftLsting = await ShiftSchema.find();
        console.log('shift listing', shiftLsting); 
        successResponse(res,Messages.say('Shift Listing'), shiftLsting);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

// Api for fetching the total lires 
exports.totallitresSale = async function(req, res) {
    try{
        const shiftLsting = await ShiftSchema.find();
        console.log('shift listing', shiftLsting); 
        successResponse(res,Messages.say('Shift Listing'), shiftLsting);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}