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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function CardProdutos({ produtos }) {
  const classes = useStyles();
  return produtos.map((produto) => {
    return (
      <Card className={classes.root}>
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
            <Typography variant="body2" color="textSecondary" component="p">
              {produto.descricao}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <strong>Estoque Atual: </strong> {produto.estoque} unidades
        </CardActions>{" "}
        <CardActions>
          <TextField
            id="standard-number"
            label="Comprar"
            type="number"
            placeholder="Insira quantos itens deseja"
            InputProps={{ inputProps: { min: 0, max: produto.estoque } }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </CardActions>{" "}
        <CardActions>
          <Button variant="contained" color="primary">
            Comprar
          </Button>
        </CardActions>
      </Card>
    );
  });
}
export default CardProdutos;
