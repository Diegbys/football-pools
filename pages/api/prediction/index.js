import Prediction from "../../../src/models/Prediction";
import dbConnect from "../../../src/utils/dbConnect";

export default async function handler({ method, body }, res) {
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const predictions = await Prediction.find();

        return res.status(200).json({ success: true, predictions });
      } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, error });
      }
  }
}
