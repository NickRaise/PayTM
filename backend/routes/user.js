const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const zod = require("zod");
const authMiddleware = require("../utils/middlewares");

const signupSchema = zod.object({
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

    await userModel.updateOne(userData, {
        _id: req.userID,
    });

    res.json({
        message: "Updated successfully!",
    });
});

router.post("/signup", async (req, res) => {
    const userData = req.body;
    const { success } = signupSchema.safeParse(userData);
    if (!success)
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });

    const doesExist = await userModel.findOne({
        username: userData.username,
    });

    if (doesExist)
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });

    const newUser = await userModel.create(userData);

    const userToken = jwt.sign({ userID: newUser._id }, JWT_SECRET);
    res.status(200).json({
        message: "User created successfully",
        token: userToken,
    });
});

router.post("/signin", (req, res) => {
    const userData = req.body;
    const { success } = signinSchema.safeParse(userData);

    if (!success)
        return res.status(411).json({ message: "Error while logging in" });

    const foundUser = userModel.findOne({ username: userData.username });

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
    } else return res.status(411).json({ message: "Error while logging in" });
});

router.get("/bulk", (res, req) => {
    const { filter } = res.body || "";
    const foundUser = userModel({
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
        ],
    });

    //          my approach
    // if (!foundUser)
    //     return res.status(403).json({
    //         message: "No user with the given name!",
    //     });

    // foundUser.forEach((userData) => {
    //     userData.password = undefined;
    // });

    // return res.status(203).json({
    //     users: foundUser,
    // });

    res.status(200).json({
        users: foundUser.map(user => ({
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
        }))
    })


});

module.exports = router;
