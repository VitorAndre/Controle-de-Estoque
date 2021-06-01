import { Router } from 'express';
import ProdutoSchema from '@/app/schemas/Produtos';
import { isValidObjectId } from 'mongoose'; //ignorem essa importação de início

const ProdutoRouter = new Router();

ProdutoRouter.post('/', (req, res) => {
  const { nome, descricao, estoque } = req.body;
  if (!nome) return res.status(400).send({ erro: 'É necessário um título' });
  if (!descricao)
    return res.status(400).send({ erro: 'É necessária uma descrição' });
  if (!estoque)
    return res.status(400).send({ erro: 'É necessário inserir um estoque' });

  ProdutoSchema.create({ nome, descricao })
    .then((resultado) => {
      return res.send(resultado);
    })
    .catch((err) => {
      console.error(err, 'Erro ao criar objeto');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

ProdutoRouter.get('/', (req, res) => {
  ProdutoSchema.find()
    .then((resultado) => {
      return res.send(resultado);
    })
    .catch((err) => {
      console.error(err, 'Erro ao listar objetos');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

ProdutoRouter.put('/:id', (req, res) => {
  const id = req.params.id;
  const { titulo, descricao } = req.body;

  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  ProdutoSchema.findByIdAndUpdate(id, { titulo, descricao })
    .then((resultado) => {
      if (resultado) return res.send(resultado);
      else return res.status(404).send({ erro: 'Objeto não encontrado' });
    })
    .catch((err) => {
      console.error(err, 'Erro ao editar o objeto');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

ProdutoRouter.delete('/:id', (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  ProdutoSchema.findByIdAndRemove(id)
    .then((resultado) => {
      if (resultado) return res.send(resultado);
      else return res.status(404).send({ erro: 'Objeto não encontrado' });
    })
    .catch((err) => {
      console.error(err, 'Erro ao remover objeto');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

export default ProdutoRouter;
