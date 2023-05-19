//metodos: index, show, update, store, destroy
/*
index: listagem de sessoes
store: criar uma nova sessao
show: listar uma UNICA sessao
update: alterar alguma sessao
destroy: deletar uma sessao
*/

import User from "../models/User";

class SessionController {
  async store(req, res) {
    const { email } = req.body;

    //vertificando se esse usuário já existe
    let newUser = await User.findOne({ email });

    if (!newUser) {
      newUser = await User.create({ email });
    }

    res.json(newUser);
  }
}

export default new SessionController();
