import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RepositoriesTable, Issues } from "./components";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<RepositoriesTable />} />
        <Route path="/issues" element={<Issues />} />
      </Routes>
    </Router>
  );
};

export default App;
