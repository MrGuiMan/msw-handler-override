import React, { ReactElement } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloClient";
import { server } from "./mocks/server";
import { graphql } from "msw";

function customRender(children: ReactElement) {
  render(<ApolloProvider client={client}>{children}</ApolloProvider>);
}

afterEach(() => cleanup());

test('renders "Loading" while data is being fetched', async () => {
  customRender(<App />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("renders whatever is provided in the query override", async () => {
  server.use(
    graphql.query("GetTest", (req, res, ctx) => {
      return res(
        ctx.data({
          is: "not working",
        })
      );
    })
  );
  customRender(<App />);
  expect(await screen.findByText("not working")).toBeInTheDocument();
});

test('renders "working" with no query override', async () => {
  customRender(<App />);
  expect(await screen.findByText("working")).toBeInTheDocument();
});
