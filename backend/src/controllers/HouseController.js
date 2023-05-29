import House from "../models/House";
import User from "../models/User";

class HouseController {
  async index(req, res) {
    const { status } = req.query;

    const houses = await House.find({ status });

    res.json(houses);
  }

  async store(req, res) {
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description, // = description: description
      price,
      location,
      status,
    });

    res.json(house);
  }

  async update(req, res) {
    const { filename } = req.file;
    const { house_id } = req.params;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    // apenas o usuário que criou a casa pode atualizar
    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if (String(user._id) !== String(houses.user)) {
      res.status(401).json({ error: "Não autorizado." });
    }

    await House.updateOne(
      { _id: house_id },
      {
        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      }
    );

    res.send();
  }

  async destroy(req, res) {
    const { house_id } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if (String(user._id) !== String(houses.user)) {
      res.status(401).json({ error: "Não autorizado." });
    }

    await House.findByIdAndDelete({ _id: house_id });

    res.json({ message: "Excluida com sucesso!" });
  }
}

export default new HouseController();
