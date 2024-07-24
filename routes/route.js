import express from "express";
import {
  deleteEmailsPermanently,
  getEmails,
  moveEmailsToTrash,
  saveSentEmails,
  toggleSnoozeddEmails,
  toggleStarredEmails,
} from "../controller/email-controller.js";

const routes = express.Router();
routes.post("/save", saveSentEmails);
routes.get("/emails/:type", getEmails);
routes.post("/save-draft", saveSentEmails);
routes.post("/trash", moveEmailsToTrash);
routes.post("/starred", toggleStarredEmails);
routes.delete("/delete", deleteEmailsPermanently);
routes.post("/snooze", toggleSnoozeddEmails);
export default routes;
