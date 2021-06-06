import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

type Produto = {
  _id: string;
  nome: string;
  descricao: string;
  imagem: string;
  estoque: number;
};
type Produtos = {
  produtos: Produto[];
};

function CardProdutos({ produtos }: Produtos) {
  async function realizaCompra(
    quantidadeTotal: number,
    quantidadeComprada: number,
    id: string
  ) {
    if (quantidadeComprada <= 0 || quantidadeComprada > quantidadeTotal) {
      alert("Não é possível comprar a quantidade pedida");
    } else {
      const { data } = await api.put(`/produtos/estoque/${id}`, {
        estoque: quantidadeTotal - quantidadeComprada,
      });

      alert("Produto comprado com sucesso!");
      window.location.reload();
    }
  }
  return (
    <div className={styles.cards}>
      {produtos.map((produto) => {
        return (
          <Card className={styles.card} key={produto._id}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={produto.nome}
                height="140"
                image={produto.imagem}
                title={produto.nome}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {produto.nome}
                </Typography>
                <Typography variant="body2" component="p">
                  {produto.descricao}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <strong>Estoque Atual: </strong> {produto.estoque} unidades
            </CardActions>
            <CardActions>
              <TextField
                id={produto._id}
                label="Comprar"
                type="number"
                placeholder="Insira quantos itens deseja"
                InputProps={{
                  inputProps: { min: 0, max: produto.estoque },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CardActions>
            <CardActions>
              <Button
                variant="contained"
                onClick={() => {
                  realizaCompra(
                    produto.estoque,
                    document.getElementById(produto._id).value,
                    produto._id
                  );
                }}
                className={styles.button}
              >
                Comprar
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}
export default CardProdutos;
