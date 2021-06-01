//Centraliza as urls do front-end, que varia dependendo do ambiente em que o servidor está rodando

var urls = {
  frontUrl: 'http://localhost:3000',
  backUrl: 'http://localhost:3333',
};

//Note que a url para /uploads é diferente nos servidores, pois o servidor tem um redirecionamento.
//Onde deveria ser /api/uploads, é redirecionado para apenas /uploads

export default urls;
