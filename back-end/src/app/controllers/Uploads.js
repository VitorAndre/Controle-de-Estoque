import { Router } from 'express';
import fileConfig from '@/config/files';
import path from 'path';
import fs from 'fs';

const UploadsRouter = new Router();

UploadsRouter.get('/:path/:fileName', (req, res) => {
  var filePath =
    req.params.path === 'emails'
      ? path.resolve(`./src/resources/mail/auth/images/${req.params.fileName}`)
      : path.resolve(
          `${fileConfig.uploadsPath}/${req.params.path}/${req.params.fileName}`,
        );

  fs.exists(filePath, (exists) => {
    if (exists) {
      return res.sendFile(filePath);
    } else {
      return res.status(404).send({
        erro: 'Arquivo não encontrado',
      });
    }
  });
});

export default UploadsRouter;
