import React from "react";
import TextField from "@material-ui/core/TextField";
import { api } from "../../../services/api";
import styles from "../stylesForms.module.scss";

export default function addProduto() {
  async function submit(event) {
    let formData = new FormData(); //formdata object
    const imagem = event.target.image.files[0];

    formData.append("nome", event.target.nome.value);
    formData.append("estoque", event.target.estoque.value);
    formData.append("descricao", event.target.descricao.value);
    formData.append("image", imagem);
    let realizaCadastro = await api
      .post("/produtos", formData, {
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
      alert("Produto adicionado com sucesso!");
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
      <h1 className={styles.titulo}>Adicionar produto</h1>
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
            className={styles.nome}
          />
          <TextField
            id="estoque"
            label="Estoque"
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
            className={styles.descricao}
          />
        </div>
        <div>
          <label for="image" id="labelFile" className={styles.fileLabel}>
            Selecione uma imagem
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
