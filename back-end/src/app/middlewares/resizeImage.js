import sharp from 'sharp';
import fs from 'fs';
import { messages } from '@/utils/errors/ErrorMessages';
import { resolve } from 'path';

const resize = (filePath) => {
  return new Promise((resolve, reject) => {
    //Trecho pra verificar se a largura da imagem é maior que 500px
    sharp(filePath)
      .metadata()
      .then(({ width }) => {
        if (width > 500) {
          //Se for maior, a imagem será redimensionada para 500px
          sharp(filePath)
            .resize({ width: 500 })
            .toBuffer()
            .then((buffer) => {
              if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                  if (err) {
                    console.error(
                      err,
                      'Não foi possível redimensionar a imagem',
                    );
                    reject(err);
                  } else {
                    fs.writeFileSync(filePath, buffer);
                    resolve();
                  }
                });
              } else {
                reject('Arquivo não encontrado');
              }
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default (req, res, next) => {
  if (!req.file) {
    if (!req.files) {
      next(); //A imagem não será tratada. Algumas vezes esse middleware é chamado em rotas
      return; //em que não é obrigatória a imagem
    }
  }

  if (req.file) {
    const filePath = req.file.path;
    resize(filePath).catch(console.error);
  } else {
    const files = req.files;

    files.forEach((file) => {
      const filePath = file.path;
      resize(filePath).catch(console.error);
    });
  }
  next();
};
