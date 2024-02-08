import { sendSuccessResponse, sendErrorResponse } from "./userController.js";
import Ticket from "../ticketmodel.js";

async function createTicket(req, res) {
  try {
    const { ticket_number, title, status } = req.body;
    const newTicket = new Ticket({ ticket_number, title, status });
    //console.log(newTicket)
    await newTicket.save();

    sendSuccessResponse(res, "Ticket created successfully");
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
}

async function getTicketNumber(req , res){
    const {ticket_number } = req.body;
    try {
        sendSuccessResponse(res, {ticket_number}, "ticket number is getting")
    } catch (error) {
        sendErrorResponse(res, 500, "not geting ticket number")
    }
}

async function getTicketByStatus(req, res) {
  const { status } = req.query; 

  if (!["open", "closed", "pending"].includes(status)) {
      sendErrorResponse(
          res,
          400,
          'Invalid status. Status must be "open", "closed", or "pending"'
      );
      return;
  }

  try {
      const tickets = await Ticket.find({ status });
      sendSuccessResponse(res, {status} ,tickets);
  } catch (error) {
      sendErrorResponse(res, 500, error.message);
  }
}


  
export {createTicket , getTicketByStatus , getTicketNumber}
