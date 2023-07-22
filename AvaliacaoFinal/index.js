import express from "express";

const app = express();
app.use(express.json());

const usuario = [];
const recado = [];

// Criação de conta
app.post('/usuario', (requisicao, resposta) => {
  const { name, email, password } = requisicao.body;

  // Verifica se o e-mail já está sendo usado
  const existeUsuario = usuario.find(user => user.email === email);
  if (existeUsuario) {
    return resposta.status(400).json({ error: 'E-mail já em uso' });
  }

  // Cria um novo usuário
  const novoUsuario = {
    id: usuario.length + 1,
    name,
    email,
    password
  };
  usuario.push(novoUsuario);

  return resposta.status(201).json(novoUsuario);
});

// Rota de login
app.post('/login', (requisicao, resposta) => {
    const { email, password } = requisicao.body;
  
    // Verifica se o usuário existe
    const user = usuario.find(user => user.email === email);
    if (!user) {
      return resposta.status(401).json({ error: 'Email ou senha inválidos' });
    }
  
    // Verifica se a senha está correta
    if (user.password !== password) {
      return resposta.status(401).json({ error: 'Email ou senha inválidos' });
    }
  
    return resposta.json({ message: 'Login efetuado com sucesso' });
  });
  
  // Rota para criar um recado
  app.post('/recado', (requisicao, resposta) => {
    const { title, description, userId } = requisicao.body;
  
    // Verifica se o usuário existe
    const user = usuario.find(user => user.id === userId);
    if (!user) {
      return resposta.status(404).json({ error: 'Usuário não encontrado' });
    }
  
    // Cria um novo recado
    const novoRecado = {
      id: recado.length + 1,
      title,
      description,
      userId
    };
    recado.push(novoRecado);
  
    return resposta.status(201).json(novoRecado);
  });
  
  // Rota para obter todos os recados de um usuário
  app.get('/recado/:userId', (requisicao, resposta) => {
    const { userId } = requisicao.params;
  
    // Verifica se o usuário existe
    const user = usuario.find(user => user.id === parseInt(userId));
    if (!user) {
      return resposta.status(404).json({ error: 'Usuário não encontrado' });
    }
  
    // Obtém os recados do usuário
    const usuarioRecado = recado.filter(note => note.userId === parseInt(userId));
  
    return resposta.json(usuarioRecado);
  });
  
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });