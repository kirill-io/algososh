import { reversingString } from "./utils";
import { ElementStates } from "../../types/element-states";

describe('Тестирование алгоритма разворота строки:', () => {
  it('Проверка корректности разворота строки с четным количеством символов', () => {
    const result = {
      steps: [
        ['т', 'е', 'с', 'т'],
        ['т', 'е', 'с', 'т'],
        ['т', 'с', 'е', 'т']
      ],
      state: [
        [ElementStates.Changing, ElementStates.Default, ElementStates.Default, ElementStates.Changing],
        [ElementStates.Modified, ElementStates.Changing, ElementStates.Changing, ElementStates.Modified],
        [ElementStates.Modified, ElementStates.Modified, ElementStates.Modified, ElementStates.Modified]
      ]
    };

    expect(reversingString('тест')).toStrictEqual(result);
  });

  it('Проверка корректности разворота строки с нечетным количеством символов', () => {
    const result = {
      steps: [
        ['т', 'е', 'с', 'т', 'ы'],
        ['ы', 'е', 'с', 'т', 'т'],
        ['ы', 'т', 'с', 'е', 'т']
      ],
      state: [
        [ElementStates.Changing, ElementStates.Default, ElementStates.Default, ElementStates.Default, ElementStates.Changing],
        [ElementStates.Modified, ElementStates.Changing, ElementStates.Default, ElementStates.Changing, ElementStates.Modified],
        [ElementStates.Modified, ElementStates.Modified, ElementStates.Modified, ElementStates.Modified, ElementStates.Modified]
      ]
    };

    expect(reversingString('тесты')).toStrictEqual(result);
  });

  it('Проверка корректности разворота строки с одним символом', () => {
    const result = {
      steps: [
        ['а']
      ],
      state: [
        [ElementStates.Modified]
      ]
    };

    expect(reversingString('а')).toStrictEqual(result);
  });

  it('Проверка корректности разворота строки с пустой строокой', () => {
    const result = {
      steps: [
        []
      ],
      state: [
        []
      ]
    };

    expect(reversingString('')).toStrictEqual(result);
  });
});