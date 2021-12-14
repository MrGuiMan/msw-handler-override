import { graphql } from "msw";

export const handlers = [
  graphql.query("GetTest", (req, res, ctx) =>
    res(
      ctx.data({
        is: "working",
      })
    )
  ),
];
