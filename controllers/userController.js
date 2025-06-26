const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Cadastrar novo usuário
exports.createUser = async (req, res) => {
  try {
    console.log('Requisição de cadastro recebida:', req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log('Dados incompletos no cadastro');
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      console.log('E-mail já cadastrado:', email);
      return res.status(409).json({ error: 'E-mail já cadastrado.' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    console.log('Usuário cadastrado com sucesso:', user.id);
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.log('Erro no registro:', err);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  try {
    console.log('Requisição de login recebida:', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      console.log('Dados incompletos no login');
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Usuário não encontrado:', email);
      return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log('Senha inválida para o usuário:', email);
      return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
    }
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET || 'segredo',
      { expiresIn: '1d' }
    );
    console.log('Login bem-sucedido para usuário:', user.id);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.log('Erro no login:', err);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};

// Listar todos os usuários
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    // Faz merge dos dados antigos com os novos, mas só sobrescreve se vier definido e não for string vazia
    const updateData = { ...user.toJSON() };
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined && req.body[key] !== "") {
        updateData[key] = req.body[key];
      }
    });
    if (updateData.password) delete updateData.password;

    await User.update(updateData, { where: { id } });
    const updatedUser = await User.findByPk(id);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

// Buscar usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
}; 