// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import ResponseForm from "./components/ResponseForm";
import ResponseList from "./components/ResponseList";

const App = () => {
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = () => setRefresh((r) => r + 1);

  return (
    <div style={{ padding: "2rem" }}>
      <Header />
      <ResponseForm onSubmitSuccess={triggerRefresh} />
      <ResponseList refreshTrigger={refresh} />
    </div>
  );
};

export default App;
