import { request, response } from "express";
import Email from "../model/emailSchema.js";

export const saveSentEmails = async (req, response) => {
  try {
    const email = new Email(req.body);
    await email.save();

    res.status(200).json({ status: true, message: "Email saved successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
export const getEmails = async (req, response) => {
  try {
    let email;
    if (req.params.type === "trash") {
      email = await Email.find({ trash: true });
    } else if (req.params.type === "allmail") {
      email = await Email.find({});
    } else if (req.params.type === "starred") {
      email = await Email.find({ starred: true, trash: false });
    } else if (req.params.type === "snooze") {
      email = await Email.find({ snooze: true, trash: false });
    } else {
      email = await Email.find({ type: req.params.type });
    }
    return response.status(200).json({ email });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
export const moveEmailsToTrash = async (req, response) => {
  try {
    await Email.updateMany(
      { _id: { $in: req.body } },
      { $set: { trash: true, starred: false, snooze: false, type: "" } }
    );
    return response.status(200).json("Emails Deleted Successfully");
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const toggleSnoozeddEmails = async (req, response) => {
  try {
    await Email.updateOne(
      { _id: req.body.id },
      { $set: { snooze: req.body.value } }
    );
    return response.status(200).json("Email is Snoozed");
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
export const toggleStarredEmails = async (req, response) => {
  try {
    await Email.updateOne(
      { _id: req.body.id },
      { $set: { starred: req.body.value } }
    );
    return response.status(200).json("Email is Starred ");
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const deleteEmailsPermanently = async (req, response) => {
  try {
    await Email.deleteMany({ _id: { $in: req.body } });
    return response.status(200).json("Emails are deleted Successfully");
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
