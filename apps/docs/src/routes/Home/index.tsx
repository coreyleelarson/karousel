import { useMemo } from "react";
import { Configurator } from "../../components/Configurator";
import { useCycle } from "../../hooks/useCycle";
import styles from './styles.module.css';

export default function Home() {
  const [descriptor] = useCycle(
    ["simple", "accessible", "responsive", "customizable"],
    3000
  );
  const needsN = useMemo(
    () =>
      ["a", "e", "i", "o", "u"].includes(descriptor.charAt(0).toLowerCase()),
    [descriptor]
  );

  return (
    <main className={styles.home}>
      <article className="container">
        <header className={styles.hero}>
          <h1>karousel</h1>
          <p>
            A{needsN ? "n" : ""} <strong>{descriptor}</strong> React carousel,
            with a k.
          </p>
        </header>
        <Configurator />
      </article>
    </main>
  );
}
