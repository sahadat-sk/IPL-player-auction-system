import Player from "../models/playerModel.js";
import User from "../models/userModel.js";
const playerController = async (req, res) => {
    const data = await Player.find({});
    // const player = await Player.create({
    //     name: "dhoni",
    // });

    if (data) {
        //console.log(data);
        res.status(201).json(data);
    } else {
        res.status(400);
        throw new Error("player not found");
    }
};
const playerUpdater = async (req, res) => {
    const { id, price, userId, userName } = req.body;

    const data = await Player.findByIdAndUpdate(id, {
        current_price: price,
        curr_status: "sold",
        curr_owner: userName,
    });
    const user = await User.findById(userId);
    const newBoughtArr = user.playersBought;
    if (!newBoughtArr.includes(id)) {
        newBoughtArr.push(id);
    }
    //console.log(newBoughtArr);
    await User.findByIdAndUpdate(userId, {
        playersBought: newBoughtArr,
    });

    if (data) {
        res.status(201).json(data);
    } else {
        res.status(400);
        throw new Error("player not found");
    }
};

const statUpdater = async (id, userId) => {
    const data = await Player.findByIdAndUpdate(id, { current_price: price });
};

export { playerController, playerUpdater };
