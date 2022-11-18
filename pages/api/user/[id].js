import mongoose from "mongoose";
import User from "../../../src/models/User";
import dbConnect from "../../../src/utils/dbConnect";

export default async function handler({ method, query: { id } }, res) {
  await dbConnect();
  console.log(id);
  switch (method) {
    case "GET":
      try {
        const user = await User.findById(new mongoose.Types.ObjectId(id));

        if (!user) {
          return res
            .status(400)
            .json({ success: false, message: "No existe el usuario" });
        }

        return res.status(200).json({ success: true, user });
      } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, error });
      }
  }
}
