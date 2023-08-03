import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Тестирование компонента Circle:', () => {
  it('Проверка корректности отрисовки компонента Circle без буквы', () => {
    const circle = renderer.create(<Circle />).toJSON();

    expect(circle).toMatchSnapshot();
  });

  it('Проверка корректности отрисовки компонента Circle с буквами', () => {
    const circle = renderer.create(<Circle letter="ABCD" />).toJSON();

    expect(circle).toMatchSnapshot();
  });

  it('Проверка корректности отрисовки компонента Circle со строкой в head', () => {
    const circle = renderer.create(<Circle head="ABCD" />).toJSON();

    expect(circle).toMatchSnapshot();
  });

  it('Проверка корректности отрисовки компонента Circle с react-элементом в head', () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();

    expect(circle).toMatchSnapshot();
  });

  it('Проверка корректности отрисовки компонента Circle со строкой в tail', () => {
    const circle = renderer.create(<Circle tail="ABCD" />).toJSON();

    expect(circle).toMatchSnapshot();
  });

  it('Проверка корректности отрисовки компонента Circle с react-элементом в tail', () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();

    expect(circle).toMatchSnapshot();
  });

  it('Проверка корректности отрисовки компонента Circle с числом в index', () => {
    const circle = renderer.create(<Circle index="013" />).toJSON();

    expect(circle).toMatchSnapshot();
  });

  it('Проверка корректности отрисовки компонента Circle с isSmall ===  true', () => {
    const circle = renderer.create(<Circle isSmall={true}/>).toJSON();

    expect(circle).toMatchSnapshot();
  });

  it('Проверка корректности отрисовки компонента Circle в состоянии default', () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();

    expect(circle).toMatchSnapshot();
  });

  it('Проверка корректности отрисовки компонента Circle в состоянии changing', () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();

    expect(circle).toMatchSnapshot();
  });

  it('Проверка корректности отрисовки компонента Circle в состоянии modified', () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();

    expect(circle).toMatchSnapshot();
  });
});