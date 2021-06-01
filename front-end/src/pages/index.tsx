import CardProdutos from "../components/CardProdutos";
import { GetStaticProps } from "next";
import { api } from "../services/api";

export default function Home({ produtos }) {
  return (
    <div>
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
