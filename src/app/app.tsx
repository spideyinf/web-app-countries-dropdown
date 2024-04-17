import { ReactElement } from "react";
import Home from "pages/Home";
import Submit from "pages/Submit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Home />
            </main>
          }
        />
        <Route
          path="/submit"
          element={
            <main>
              <Submit />
            </main>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
