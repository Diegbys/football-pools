import mongoose from "mongoose";
import Match from "../../../src/models/Match";
import User from "../../../src/models/User";
import dbConnect from "../../../src/utils/dbConnect";

export default async function handler({ method, query: { id }, body }, res) {
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const match = await Match.findById(
          new mongoose.Types.ObjectId(id)
        ).populate({ path: "teams" });

        if (!match) {
          return res
            .status(400)
            .json({ success: false, message: "No existe el match" });
        }

        return res.status(200).json({ success: true, match });
      } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, match });
      }

    case "PUT":
      try {
        let bodyToUpdate = { result: true };
        if (body.tie) {
          bodyToUpdate = { ...bodyToUpdate, ...{ tie: true, winner: null } };
        } else {
          bodyToUpdate = {
            ...bodyToUpdate,
            ...{
              winner: new mongoose.Types.ObjectId(body.selected),
              tie: false,
            },
          };
        }
        const match = await Match.findOneAndUpdate({ _id: id }, bodyToUpdate);

        const users = await User.find({ rol: 2 })
          .populate({ path: "predictions" })
          .lean();

        for (let index = 0; index < users.length; index++) {
          const user = users[index];
          const prediction = user.predictions.find(
            (p) => p.match.valueOf() === id
          );

          if (body.tie && prediction.tie) {
            updateUserPoint(user);
            continue;
          }

          if (body.selected === prediction.winner.valueOf()) {
            updateUserPoint(user);
          }
        }

        return res.status(200).json({ success: true, match });
      } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, match });
      }
  }
}

export async function updateUserPoint(user) {
  await User.findOneAndUpdate({ _id: user._id }, { points: user.points + 1 });
}
