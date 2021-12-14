import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

function App() {
  const { loading, error, data } = useQuery(gql`
    query GetTest {
      is
    }
  `);

  let componentRender = <span>Loading...</span>;
  if (error) {
    componentRender = <span>Error...</span>;
  } else if (data) {
    componentRender = <span>{data.is}</span>;
  }
  return <div className="App">{componentRender}</div>;
}

export default App;
