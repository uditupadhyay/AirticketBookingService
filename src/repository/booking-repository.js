const {Booking}=require('../models/index');
const {StatusCodes}=require('http-status-codes');
const {AppError,ValidationError}=require('../utils/errs/index');
const booking = require('../models/booking');

class BookingRepository{
    async create(data){
        try {
            const booking=await Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name=='SequelizeValidationError'){
                throw new ValidationError(error);
            }
            throw new AppError('RepositoryError',
            'Cannit create Booking',
            'there is some issue creating the booking,plz try again later',
            StatusCodes.INTERNAL_SERVER_ERROR);
            
        }
    }

    async update(bookingId,data){
        try{
         const booking=await Booking.findByPk(bookingId);
         if(data.status){
            booking.status=data.status;
         }
         await booking.save();
         return booking; 
        } catch(error){
            throw new AppError('RepositoryError',
            'Cannit update Booking',
            'there is some issue updating the booking,plz try again later',
            StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
module.exports=BookingRepository;