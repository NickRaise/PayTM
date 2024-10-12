const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const { userModel, accountModel } = require("../models/user");
const { authMiddleware } = require("../utils/middlewares");

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const transferInfo = req.body;
    const senderId = req.userID;
    console.log(senderId)
    // return res.send("working")

    // get sender balance
    const senderAccount = await accountModel.findOne({ userID: senderId });
    // error if not enough balance
    console.log(senderAccount)
    console.log(senderAccount.balance, "################", transferInfo.amount)
    if (senderAccount.balance < transferInfo.amount) {
        session.abortTransaction();
        return res.status(400).json({ message: "Insufficient balance" });
    }

    // find receive account
    const receiverAccount = accountModel.find({ userID: transferInfo.to });
    if (!receiverAccount) {
        session.abortTransaction();
        return res.status(400).json({ message: "Invalid account" });
    }

    // deduct amount from sender
    await accountModel.updateOne(
        { userID: req.userID },
        {
            $inc: {
                balance: -transferInfo.amount,
            },
        }
    );

    // add amount to the receiver
    await accountModel.updateOne(
        { userID: transferInfo.to },
        {
            $inc: {
                balance: transferInfo.amount,
            },
        }
    );
    //commit changes of the session
    await session.commitTransaction();

    res.status(200).json({ message: "Transfer successful" });
});

module.exports = router;
