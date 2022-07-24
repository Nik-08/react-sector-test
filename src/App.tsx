import React from "react";
import { Container, Search, Table } from "./components";

function App() {
  return (
    <Container>
      <Search />
      <div className='main'>
        <Table />
      </div>
    </Container>
  );
}

export default App;
