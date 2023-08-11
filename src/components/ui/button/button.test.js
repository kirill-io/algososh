import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Тестирование компонента Button:", () => {
  it("Проверка корректности отрисовки компонента Button с текстом", () => {
    const button = renderer.create(<Button text="Любая строка" />).toJSON();

    expect(button).toMatchSnapshot();
  });

  it("Проверка корректности отрисовки компонента Button без текста", () => {
    const button = renderer.create(<Button text="" />).toJSON();

    expect(button).toMatchSnapshot();
  });

  it("Проверка корректности отрисовки заблокированного компонента Button", () => {
    const button = renderer.create(<Button disabled={true} />).toJSON();

    expect(button).toMatchSnapshot();
  });

  it("Проверка корректности отрисовки компонента Button с индикацией загрузки", () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON();

    expect(button).toMatchSnapshot();
  });

  it("Проверка корректности вызова колбека при клике по компоненту Button", () => {
    window.alert = jest.fn();

    render(
      <Button
        text="Компонент Button"
        onClick={() => alert("Клик по Button")}
      />,
    );

    const button = screen.getByText("Компонент Button");

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Клик по Button");
  });
});
