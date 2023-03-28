import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de março de 2023</time>
            <strong>
              🚀 Aumente sua produtividade com esses 15 CheatSheets incríveis! 📚
            </strong>
            <p>15 CheatSheat que podem te ajudar</p>
          </a>
          <a href="">
            <time>12 de março de 2023</time>
            <strong>
              🚀 Aumente sua produtividade com esses 15 CheatSheets incríveis! 📚
            </strong>
            <p>15 CheatSheat que podem te ajudar</p>
          </a>
          <a href="">
            <time>12 de março de 2023</time>
            <strong>
              🚀 Aumente sua produtividade com esses 15 CheatSheets incríveis! 📚
            </strong>
            <p>15 CheatSheat que podem te ajudar</p>
          </a>
          <a href="">
            <time>12 de março de 2023</time>
            <strong>
              🚀 Aumente sua produtividade com esses 15 CheatSheets incríveis! 📚
            </strong>
            <p>15 CheatSheat que podem te ajudar</p>
          </a>
        </div>
      </main>
    </>
  );
}
