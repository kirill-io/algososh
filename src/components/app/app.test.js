import { render, screen } from "@testing-library/react";
import App from "./app";

test("Компонент App отрендерился", () => {
  render(<App />);
  const appComponent = screen.getByTestId("appComponent");
  expect(appComponent).toBeInTheDocument();
});
