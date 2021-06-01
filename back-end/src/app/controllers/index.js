import express from 'express';
import ProdutoRouter from './Produtos';

const router = express();
router.disable('x-powered-by');

router.use('/produtos', ProdutoRouter);

export default router;
