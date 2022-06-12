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
    const { id, price, userId, userName ,prevUserId} = req.body;

    const data = await Player.findByIdAndUpdate(id, {
        current_price: price,
        curr_status: "sold",
        curr_owner: userName,
    });
    const user = await User.findById(userId);
    const prevUser = await User.findOne({ name: prevUserId });

    const newBoughtArr = user.playersBought;
    if (!newBoughtArr.includes(id)) {
        newBoughtArr.push(id);
    }
    console.log(newBoughtArr);
    await User.findByIdAndUpdate(userId, {
        playersBought: newBoughtArr,
    });

    const updatedArr = prevUser.playersBought;
    if (updatedArr.includes(id)) {
        updatedArr.splice(updatedArr.indexOf(id), 1);
    }

    if (data) {
        res.status(201).json(data);
    } else {
        res.status(400);
        throw new Error("player not found");
    }
};

const updateTime = async (req, res) => {
    const { id, sec, min } = req.body;
    //console.log(id,min);
    //let timeInMili = sec * 1000 + min * 60 * 1000;
    const data = await Player.findById(id);
    let timeInMili = data.time_left - 1000;
    const data2 = await Player.findByIdAndUpdate(id, { time_left: timeInMili });
    if (data2) {
        res.status(201).json({
            min: Math.floor(timeInMili / 1000 / 60),
            sec: Math.floor(timeInMili / 1000 % 60),
        });
    } else {
        res.status(400);
        throw new Error("player not found");
    }
};

export { playerController, playerUpdater, updateTime };
