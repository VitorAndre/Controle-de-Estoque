import styles from "./header.module.scss";

export function Navbar() {
  return (
    <div className={styles.header}>
      <a href="/">Início</a>
      <a href="/dashProdutos">Dashboard</a>
      <a href="/dashProdutos/addProduto">Adicionar Produto</a>
    </div>
  );
}
