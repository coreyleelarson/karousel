import { CodeBlock } from "~/components/CodeBlock";
import { ErrorBlock } from "~/components/ErrorBlock";

const autoGeneratedIdsCode = `
import { SSRProvider as KarouselSSRProvider } from 'karousel';

<KarouselSSRProvider>
  <App />
</KarouselSSRProvider>
`;

const responsiveCode = `
import { Karousel } from 'karousel';

export const MyComponent = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Karousel
      slidesToScroll={2}
      slidesToShow={2}
      responsive={isClient ? [
        {
          breakpoint: 768,
          options: {
            slidesToScroll: 4,
            slidesToShow: 4,
          },
        },
      ] : undefined}
    >
      <span>Item 1</span>
      <span>Item 2</span>
      <span>Item 3</span>
      <span>Item 4</span>
      <span>Item 5</span>
      <span>Item 6</span>
      <span>Item 7</span>
      <span>Item 8</span>
    </Karousel>
  );
}
`;

export default function SSR() {
  return (
    <article>
      <header>
        <h1>Server Side Rendering</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </header>
      <section>
        <h2>Auto-Generated IDs</h2>
        <p>
          To enable accessibility, Karousel utilizes{" "}
          <a
            href="https://react-spectrum.adobe.com/react-aria/useId.html"
            target="_blank"
            rel="noreferrer"
          >
            react-aria's useId hook
          </a>{" "}
          to autogenerate unique IDs under the hood using.
        </p>
        <p>
          To ensure that auto generated ids are consistent between the client
          and server, you must wrap your application with{" "}
          <a
            href="https://react-spectrum.adobe.com/react-aria/SSRProvider.html"
            target="_blank"
            rel="noreferrer"
          >
            react-aria's `SSRProvider`
          </a>
          , which Karousel re-exports for your convenience:
        </p>
        <CodeBlock code={autoGeneratedIdsCode} />
      </section>
      <hr />
      <section>
        <h2>Responsive Options</h2>
        <p>
          When passing responsive options in a server-side rendered application,
          there will most likely be prop mismatches between the client and
          server:
        </p>
        <ErrorBlock>
          Warning: Prop `aria-hidden` did not match. Server: "true" Client:
          "false"
        </ErrorBlock>
        <p>
          This will potentially cause unexpected behavior and lead to a broken
          experience.
        </p>
        <p>
          The reason this happens is because there is no window on the server,
          therefore there is no way to use media query detection to determine
          the right Karousel options to set. During the hydration pass on the
          client, window is available and will attempt to switch the options
          based on the viewport width.
        </p>
        <p>
          To solve this, the React team recommends to use a technique called{" "}
          <a
            href="https://reactjs.org/docs/react-dom.html#hydrate"
            target="_blank"
            rel="noreferrer"
          >
            two-pass rendering
          </a>
          .
        </p>
        <p>
          The component will render exactly the same as the server, avoiding any
          prop mismatches. The `useEffect` will immediately update `isClient`,
          causing an additional render pass during which you can pass in your
          responsive props:
        </p>
        <CodeBlock code={responsiveCode} />
      </section>
    </article>
  );
}
