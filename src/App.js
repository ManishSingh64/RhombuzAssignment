
import "./App.css";
import { Tablee } from "./components/Tablee";
import { Heading } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Heading>Users Data</Heading>
      <br/>
      <Tablee />
    </div>
  );
}

export default App;
