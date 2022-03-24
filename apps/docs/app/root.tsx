import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import { Header } from "~/components/Header";
import { Navigation } from "~/components/Navigation";
import globalStyles from '~/styles/global.css';
import resetStyles from '~/styles/reset.css';
import tokenStyles from '~/styles/tokens.css';

export const links: LinksFunction = () => [
  { href: tokenStyles, rel: 'stylesheet' },
  { href: resetStyles, rel: 'stylesheet' },
  { href: globalStyles, rel: 'stylesheet' },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <Navigation />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
