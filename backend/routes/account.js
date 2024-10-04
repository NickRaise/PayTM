const express = require("express")
const router = express.Router()
const { userModel, accountModel } = require("../models/user")
const { authMiddleware } = require("../utils/middlewares")

router.post("/transfer", authMiddleware, async (req, res) => {

    const session = await mongoose.startSession()

    const transferInfo = req.body;
    const senderId = req.userID;

    // get sender balance 
    const senderAccount = accountModel.find({ userID: senderId })
    // error if not enough balance
    if (senderAccount.balance < transferInfo.amount) {
        session.abortTransaction();
        return res.status(400).json({ message: "Insufficient balance" })
    }

    // find receive account
    const receiverAccount = accountModel.find({ userID: transferInfo.to })
    if (!receiverAccount) {
        session.abortTransaction()
        return res.status(400).json({ message: "Invalid account" })
    }

    // deduct amount from sender
    accountModel.updateOne(
        { userID: req.userID },
        {
            $inc: {
                balance: -amount,
            }
        }
    )

    // add amount to the receiver
    accountModel.updateOne(
        { userID: transferInfo.to },
        {
            $inc: {
                balance: amount
            }
        }
    )
    //commit changes of the session
    await session.commitTransaction()


    res.status(200).json({ message: "Transfer successful" })
})

module.exports = router