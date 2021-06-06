import React from "react";
import { GetStaticProps } from "next";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { api } from "../../services/api";
import stylesDash from "./stylesDash.module.scss";

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

export default function DashProdutos({ produtos }: Produtos) {
  function deletaProduto(id: string) {
    api.delete(`/produtos/${id}`);
    alert("Produto deletado com sucesso!");
    window.location.reload();
  }
  return (
    <div>
      <TableContainer className={stylesDash.dashProdutos}>
        <Table className={stylesDash.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={stylesDash.head}>
                Nome
              </TableCell>
              <TableCell
                align="center"
                className={(stylesDash.head, stylesDash.descricao)}
              >
                Descrição
              </TableCell>
              <TableCell align="center" className={stylesDash.head}>
                Estoque
              </TableCell>
              <TableCell align="center" className={stylesDash.head}>
                Editar
              </TableCell>
              <TableCell align="center" className={stylesDash.head}>
                Excluir
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((row) => (
              <TableRow key={row._id}>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  className={stylesDash.body}
                >
                  {row.nome}
                </TableCell>
                <TableCell align="center" className={stylesDash.body}>
                  {row.descricao}
                </TableCell>
                <TableCell align="center" className={stylesDash.body}>
                  {row.estoque}
                </TableCell>
                <TableCell align="center" className={stylesDash.body}>
                  <a
                    href={`/dashProdutos/editProduto/${row._id}`}
                    target="_blank"
                    className={stylesDash.edit}
                  >
                    Editar
                  </a>
                </TableCell>
                <TableCell align="center" className={stylesDash.body}>
                  <a
                    onClick={() => deletaProduto(row._id)}
                    className={stylesDash.excluir}
                  >
                    Excluir
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button type="button" className={stylesDash.add}>
        <a href="/dashProdutos/addProduto">Adicionar produto</a>
      </button>
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
