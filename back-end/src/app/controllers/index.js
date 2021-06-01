import express from 'express';
import ProdutoRouter from './Produtos';
import UploadsRouter from './Uploads';

const router = express();
router.disable('x-powered-by');

router.use('/produtos', ProdutoRouter);
router.use('/uploads', UploadsRouter);

export default router;
