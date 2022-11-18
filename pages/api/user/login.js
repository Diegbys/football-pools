import User from "../../../src/models/User";
import dbConnect from "../../../src/utils/dbConnect";

export default async function handler(req, res) {

  await dbConnect();

  try {
    const user = await User.findOne({ name: req.body.name });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Ususario no encontrado" });
    }

    if (user.rol != 1) {
      return res
        .status(400)
        .json({ success: false, message: "El usuario no es administrador" });
    }

    if (user.password != req.body.password) {
      return res
        .status(400)
        .json({ success: false, message: "Contraseña incorrecta" });
    }

    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error, message: "Error conection" });
  }
}
