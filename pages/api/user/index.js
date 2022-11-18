import mongoose from "mongoose";
import Prediction from "../../../src/models/Prediction";
import User from "../../../src/models/User";
import dbConnect from "../../../src/utils/dbConnect";

export default async function handler({ method, body }, res) {
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const users = await User.find({ rol: 2 }).populate();

        if (users.length == 0) {
          return res
            .status(400)
            .json({ success: false, message: "No hay usuarios registrados" });
        }

        return res.status(200).json({ success: true, users });
      } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, error });
      }

    case "POST":
      try {
        const predictions = body.predictions.map((prediction) => {
          let res = {
            _id: new mongoose.Types.ObjectId(),
            match: new mongoose.Types.ObjectId(prediction.match._id),
            tie: prediction.tie,
          };
          if (prediction.winner) {
            res["winner"] = new mongoose.Types.ObjectId(prediction.winner);
          }

          return res;
        });
        await Prediction.insertMany(predictions);
        const user = await User.create({
          name: body.name,
          rol: 2,
          points: 0,
          predictions: predictions.map((e) => e._id),
        });

        return res.status(200).json({ success: true, user });
      } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, error });
      }
  }
}
