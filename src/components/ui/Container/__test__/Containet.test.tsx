import { render, screen } from "@testing-library/react";
import { Container } from "../Container";

const children = (
  <div>
    <span>Test</span>
  </div>
);

test("renders learn react link", () => {
  render(<Container children={children} />);

  expect(screen.getByText("Test")).toBeInTheDocument();
});
