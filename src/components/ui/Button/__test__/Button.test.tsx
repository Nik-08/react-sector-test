import { render, screen } from "@testing-library/react";
import { Button } from "../Button";

const text = "Вперед";

test("renders learn react link", () => {
  render(<Button text={text} />);

  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Вперед")).toBeInTheDocument();
});
