import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent,
  FormEvent,
} from "react";
import { randomArrayNumber } from "../../utils/randomArray";
import { selectionSort, bubbleSort } from "./utils";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TStep, SortSelection, SortDirection } from "./types";
import { DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [randomArray, setRandomArray] = useState<number[] | null>(null);
  const [steps, setSteps] = useState<TStep[] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [sortMethod, setSortMethod] = useState(SortSelection.Selection);
  const [buttonLoader, setButtonLoader] = useState({
    increase: false,
    decrease: false,
  });

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setRandomArray(randomArrayNumber(3, 17, 0, 100));

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startAlgorithm = (array: number[], sortDirection: string) => {
    const steps =
      sortMethod === SortSelection.Selection
        ? selectionSort(array, sortDirection)
        : bubbleSort(array, sortDirection);
    setSteps(steps);
    setCurrentStep(0);

    intervalRef.current = setInterval(() => {
      setCurrentStep((prevState) => {
        const nextState = prevState + 1;

        if (nextState === steps.length - 1 && intervalRef.current) {
          setButtonLoader({
            increase: false,
            decrease: false,
          });
          clearInterval(intervalRef.current);
        }

        return nextState;
      });
    }, DELAY_IN_MS);
  };

  const selectionElementState = (
    item: number,
    elementA: number | null,
    elementB: number | null,
    sortedElements: number[],
  ) => {
    if (item === elementA || item === elementB) {
      return ElementStates.Changing;
    }

    if (!elementA && !elementB) {
      return ElementStates.Modified;
    }

    if (sortedElements.includes(item)) {
      return ElementStates.Modified;
    }
  };

  const onChangeRadioInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value === SortSelection.Selection
      ? setSortMethod(SortSelection.Selection)
      : setSortMethod(SortSelection.Bubble);
  };

  const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.value === SortDirection.Increase
      ? setButtonLoader({ ...buttonLoader, increase: true })
      : setButtonLoader({ ...buttonLoader, decrease: true });
    if (randomArray) {
      startAlgorithm(randomArray, e.currentTarget.value);
    }
  };

  const onSubmitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSteps(null);
    setRandomArray(randomArrayNumber(3, 17, 0, 100));
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={onSubmitFormHandler}>
          <div className={styles.container}>
            <div className={styles.container_radio}>
              <RadioInput
                label="Выбор"
                name="radio"
                value={SortSelection.Selection}
                extraClass={styles.radio}
                onChange={onChangeRadioInputHandler}
                defaultChecked
              />
              <RadioInput
                label="Пузырёк"
                name="radio"
                value={SortSelection.Bubble}
                extraClass={styles.radio}
                onChange={onChangeRadioInputHandler}
              />
            </div>
            <div className={styles.container_button}>
              <Button
                text="По возрастанию"
                value={SortDirection.Increase}
                sorting={Direction.Ascending}
                extraClass={styles.button}
                onClick={onClickButtonHandler}
                isLoader={buttonLoader.increase}
                disabled={buttonLoader.decrease}
              />
              <Button
                text="По убыванию"
                value={SortDirection.Decrease}
                sorting={Direction.Descending}
                extraClass={styles.button}
                onClick={onClickButtonHandler}
                isLoader={buttonLoader.decrease}
                disabled={buttonLoader.increase}
              />
            </div>
          </div>
          <Button
            text="Новый массив"
            type="submit"
            extraClass={styles.button}
            disabled={buttonLoader.increase || buttonLoader.decrease}
          />
        </form>
        <div className={styles.column}>
          {randomArray &&
            !steps &&
            randomArray.map((item, i) => <Column index={item} key={i} />)}
          {steps &&
            steps[currentStep].currentArray.map((item: number, i: number) => (
              <Column
                index={item}
                key={i}
                state={selectionElementState(
                  i,
                  steps[currentStep].elementA,
                  steps[currentStep].elementB,
                  steps[currentStep].sortedElements,
                )}
              />
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
