import { Router } from 'express';
import ProdutoSchema from '@/app/schemas/Produtos';
import { isValidObjectId } from 'mongoose'; //ignorem essa importação de início
import Multer from '@/app/middlewares/Multer';
import resizeImage from '@/app/middlewares/resizeImage';
import DeletePhoto from '../../utils/DeletePhoto';
import { messages } from '@/utils/errors/ErrorMessages';
import formatUrls from '@/utils/formatUrls';

const ProdutoRouter = new Router();

function checkData({ nome, descricao, estoque }) {
  if (!nome) return 'O nome do produto é obrigatório';
  if (!descricao) return 'A descrição do produto é obrigatória';
  if (!estoque) return 'É necessário inserir um estoque';
  return;
}

ProdutoRouter.post('/', [Multer.single('image'), resizeImage], (req, res) => {
  const { nome, descricao, estoque } = req.body;
  let error = checkData({ nome, descricao, estoque });
  if (error) {
    if (req.file) DeletePhoto(req.file.path);
    return res.status(400).send({ erro: error });
  } else {
    if (!req.file)
      return res.status(400).send({ erro: 'Nenhuma imagem foi enviada' });
  }
  if (estoque < 0) {
    if (req.file) DeletePhoto(req.file.path);
    return res.status(400).send({ erro: 'Valor de estoque incorreto' });
  }
  const imagem = req.file.path;

  ProdutoSchema.create({ nome, descricao, estoque, imagem })
    .then((resultado) => {
      return res.send(resultado);
    })
    .catch((err) => {
      if (req.file) DeletePhoto(req.file.path);

      console.error(err, 'Erro ao criar objeto');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

ProdutoRouter.get('/', (req, res) => {
  ProdutoSchema.find()
    .then((resultado) => {
      return res.send(
        resultado.map((item) => {
          item.imagem = formatUrls(item.imagem);
          return item;
        }),
      );
    })
    .catch((err) => {
      console.error(err, 'Erro ao listar objetos');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

ProdutoRouter.get('/:id', (req, res) => {
  const id = req.params.id;

  ProdutoSchema.findById(id)
    .then((resultado) => {
      resultado.imagem = formatUrls(resultado.imagem);
      return res.send(resultado);
    })
    .catch((err) => {
      console.error(err, 'Erro ao listar objetos');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

ProdutoRouter.put('/:id', [Multer.single('image'), resizeImage], (req, res) => {
  const id = req.params.id;
  const { nome, descricao, estoque } = req.body;
  let error = checkData({ nome, descricao, estoque });

  if (error) {
    if (req.file) DeletePhoto(req.file.path);
    return res.status(400).send({ erro: error });
  }
  if (estoque < 0) {
    if (req.file) DeletePhoto(req.file.path);
    return res.status(400).send({ erro: 'Valor de estoque incorreto' });
  }
  const imagem = req.file ? req.file.path : null;

  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  ProdutoSchema.findByIdAndUpdate(
    id,
    !imagem
      ? { nome, descricao, estoque }
      : { nome, descricao, estoque, imagem },
  )
    .then((resultado) => {
      if (resultado) return res.send(resultado);
      else return res.status(404).send({ erro: 'Objeto não encontrado' });
    })
    .catch((err) => {
      if (req.file) DeletePhoto(req.file.path);

      console.error(err, 'Erro ao editar o objeto');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

ProdutoRouter.put('/estoque/:id', (req, res) => {
  const id = req.params.id;
  const { estoque } = req.body;
  if (!id) return res.status(400).send({ erro: 'ID é obrigatório' });
  if (!isValidObjectId(id))
    return res.status(400).send({ erro: 'ID inválido' });

  if (estoque < 0) {
    if (req.file) DeletePhoto(req.file.path);
    return res.status(400).send({ erro: 'Valor de estoque incorreto' });
  }
  ProdutoSchema.findByIdAndUpdate(id, { estoque }, { new: true })
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
      if (resultado) {
        DeletePhoto(resultado.imagem);
        return res.send(resultado);
      } else return res.status(404).send({ erro: 'Objeto não encontrado' });
    })
    .catch((err) => {
      console.error(err, 'Erro ao remover objeto');
      return res.status(500).send({ erro: 'Erro interno do servidor' });
    });
});

export default ProdutoRouter;
