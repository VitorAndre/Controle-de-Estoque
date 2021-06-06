import React from "react";
import TextField from "@material-ui/core/TextField";
import { api } from "../../../../services/api";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "../../stylesForms.module.scss";

type Produto = {
  _id: string;
  nome: string;
  descricao: string;
  imagem: string;
  estoque: number;
};
type Produtos = {
  produto: Produto;
};

export default function EditProduto({ produto }: Produtos) {
  async function submit(event) {
    let formData = new FormData(); //formdata object
    let imageData = event.target.image.files[0];

    formData.append("nome", event.target.nome.value);
    formData.append("estoque", event.target.estoque.value);
    formData.append("descricao", event.target.descricao.value);
    formData.append("image", imageData);
    let realizaCadastro = await api
      .put(`/produtos/${produto._id}`, formData, {
        headers: {
          "Content-Type": `multipart/form-data;`,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });

    if (realizaCadastro.status == 200) {
      alert("Produto editado com sucesso!");
      window.location.href = "/dashProdutos";
    } else {
      alert(realizaCadastro.response.data.erro);
    }
  }
  function mudaTextoFile() {
    document.getElementById("labelFile").innerText = document
      .getElementById("image")
      .value.split("\\")[2];
  }

  return (
    <>
      <h1 className={styles.titulo}>Editar produto</h1>

      <form
        noValidate
        autoComplete="off"
        onSubmit={submit}
        className={styles.forms}
      >
        <div>
          <TextField
            id="nome"
            label="Nome do produto"
            defaultValue={produto.nome}
            className={styles.nome}
          />

          <TextField
            id="estoque"
            label="Estoque"
            defaultValue={produto.estoque}
            type="number"
            placeholder="Insira quantos itens deseja"
            InputProps={{ inputProps: { min: 0 } }}
            className={styles.estoque}
          />
        </div>
        <div>
          <TextField
            id="descricao"
            label="Descrição"
            multiline
            rows={4}
            defaultValue={produto.descricao}
            className={styles.descricao}
          />
        </div>
        <div>
          <label for="image" id="labelFile" className={styles.fileLabel}>
            Editar imagem
          </label>
          <input
            type="file"
            id="image"
            className={styles.file}
            onChange={mudaTextoFile}
          />
        </div>
        <div>
          <input type="submit" value="Enviar" className={styles.submit} />
        </div>
      </form>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { idProduto } = ctx.params;

  const { data } = await api.get(`/produtos/${idProduto}`);

  const produto = data;

  return {
    props: { produto },
    revalidate: 43200,
  };
};
