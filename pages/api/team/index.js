import Team from "../../../src/models/Team";
import dbConnect from "../../../src/utils/dbConnect";

export default async function handler({ method, body }, res) {
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const teams = await Team.find();

        return res.status(200).json({ success: true, teams });
      } catch (error) {
        console.log(error);
        return res.status(404).json({ success: false, error });
      }
  }
}
