import mongoose from "mongoose";

const mySchema = new mongoose.Schema({
    name: {
        type: "string",
    },
    base_price: {
        type: "number",
        default: "20",
    },
    current_price: {
        type: "number",
        default: "20",
    },
    curr_status: {
        type: "string",
        default: "unsold",
    },
    curr_owner: {
        type: "string",
        default: "none",
    },
});

const player = mongoose.model("player", mySchema);
export default player;
