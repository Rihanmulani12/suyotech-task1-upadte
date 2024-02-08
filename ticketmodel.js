import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    ticket_number: String,
    title: String,
    status: {
      type: String,
      enum: ['pending', 'open', 'closed'],
      default: 'pending',
    },
});
  
const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;