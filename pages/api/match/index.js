import Match from "../../../src/models/Match";
import dbConnect from "../../../src/utils/dbConnect";

export default async function handler(_, res) {
  await dbConnect();

  try {
    const matches = await Match.find({}).populate({ path: "teams" }).populate({ path: "winner" });
    return res.status(200).json({ success: true, matches });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ success: false, error });
  }
}
