import Player from "../models/playerModel.js";
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
    const { id, price } = req.body;
    const data = await Player.findByIdAndUpdate(id, {current_price: price});
    if (data) {
        res.status(201).json(data);
    } else {
        res.status(400);
        throw new Error("player not found");
    }
};
export { playerController , playerUpdater}; 
