import mongoose from '@/database';

const ProdutoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  imagem: {
    type: String,
    required: true,
  },
  estoque: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Produto', ProdutoSchema);
