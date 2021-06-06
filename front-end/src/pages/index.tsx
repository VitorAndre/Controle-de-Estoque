import CardProdutos from "../components/CardProdutos";
import { GetStaticProps } from "next";
import { api } from "../services/api";
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
export default function Home({ produtos }: Produtos) {
  return (
    <div>
      <h1 className={styles.titulo}>Produtos</h1>
      <CardProdutos produtos={produtos}></CardProdutos>
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("/produtos");
  const produtos = data;
  return {
    props: { produtos },
    revalidate: 43200,
  };
};
