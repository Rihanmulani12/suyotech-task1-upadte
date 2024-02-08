import { Router } from "express";
import {createTicket , getTicketByStatus , getTicketNumber} from "../controllers/ticket.js"

const router = Router();

router.route("/createTicket").post(createTicket);
router.route("/getTicketStatus").get(getTicketByStatus);
router.route("/getNumber").get(getTicketNumber);

export default router;