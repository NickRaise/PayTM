const express = require("express");
const router = express.Router();
const { userModel, accountModel } = require("../models/user");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { authMiddleware } = require("../utils/middlewares");

const JWT_SECRET = process.env.JWT_SECRET;

const signupSchema = zod.object({
    username: zod.string(),
    first_name: zod.string(),
    last_name: zod.string(),
    email: zod.string(),
    password: zod.string(),
});

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
});

const updateSchema = zod.object({
    password: zod.string().optional(),
    first_name: zod.string().optional(),
    last_name: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    const userData = req.body;
    const { success } = updateSchema.safeParse(userData);
    if (!success)
        return res.status(411).json({
            message: "Error while updating information",
        });
    await userModel.findByIdAndUpdate(req.userID, userData)

    res.json({
        message: "Updated successfully!",
    });
});

router.get("/me", authMiddleware, async (req, res) => {
    const userData = await userModel.findById(req.userID)
    const userAccount = await accountModel.findOne({
        userID: userData._id
    })
    console.log(userAccount)
    res.json({
        userInfo: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            balance: userAccount.balance
        }
    })
})

router.post("/signup", async (req, res) => {
    const userData = req.body;
    const { success } = signupSchema.safeParse(userData);
    if (!success)
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
    const doesExist = await userModel.findOne({
        email: userData.email,
    });

    if (doesExist) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
    }

    const newUser = await userModel.create(userData);
    const userAccount = await accountModel.create({
        userID: newUser._id,
        balance: 1 + Math.random() * 1000
    })
    const userToken = jwt.sign({ userID: newUser.id }, JWT_SECRET);
    res.status(200).json({
        message: "User created successfully",
        token: userToken,
    });
});

router.post("/signin", async (req, res) => {
    const userData = req.body;
    const { success } = signinSchema.safeParse(userData);
    if (!success)
        return res.status(411).json({ message: "Incorrect credentials!" });

    const foundUser = await userModel.findOne({ username: userData.username });

    if (foundUser && foundUser.password === userData.password) {
        const userToken = jwt.sign(
            {
                userID: foundUser._id,
            },
            JWT_SECRET
        );
        res.status(200).json({
            message: "Signin successful",
            token: userToken,
        });
    } else return res.status(411).json({ message: "Incorrect credentials!" });
});

router.get("/bulk", authMiddleware, async (req, res) => {
    const data = req.query.filter;
    const filter = data || "";
    try {
        const foundUser = await userModel.find({
            $or: [
                {
                    first_name: {
                        $regex: filter,
                    },
                },
                {
                    last_name: {
                        $regex: filter,
                    },
                },
                {
                    username: {
                        $regex: filter
                    }
                }
            ],
        });

        res.status(200).json({
            users: foundUser.map(user => ({
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                _id: user._id
            }))
        })
    } catch (e) {
        console.log(e)
        return res.json({})
    }
});

module.exports = router;
