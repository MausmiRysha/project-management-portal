import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
