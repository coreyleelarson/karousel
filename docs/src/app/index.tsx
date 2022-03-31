import { Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { Docs } from "../routes/Docs";
import { DocsOverview } from "../routes/Docs/DocsOverview";
import { DocsSSR } from "../routes/Docs/DocsSSR";
import { DocsStyling } from "../routes/Docs/DocsStyling";
import { Home } from "../routes/Home";

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Home />} index />
        <Route element={<Docs />} path="docs">
          <Route element={<DocsOverview />} index />
          <Route element={<DocsStyling />} path="styling" />
          <Route element={<DocsSSR />} path="ssr" />
        </Route>
      </Routes>
    </>
  );
}
