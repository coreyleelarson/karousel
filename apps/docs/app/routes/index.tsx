import { useMemo } from "react";
import { LinksFunction } from "remix";
import { Configurator } from "~/components/Configurator";
import { useCycle } from "~/hooks/useCycle";
import homeStyles from "~/styles/routes/home.css";

export const links: LinksFunction = () => [
  { href: homeStyles, rel: "stylesheet" },
];

export default function Demo() {
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
    <main className="home">
      <article className="container">
        <header className="hero">
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
