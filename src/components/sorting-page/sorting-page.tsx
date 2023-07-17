import { useState, useEffect, useRef, ChangeEvent, MouseEvent, FormEvent } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TSortingResult } from "../../types/sorting-page-state";
import { DELAY_MS_1000 } from "../../utils/constants";

export const SortingPage: React.FC = () => {  
  const [randomArray, setRandomArray] = useState<number[] | null>(null);
  const [steps, setSteps] = useState<TSortingResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [sortMethod, setSortMethod] = useState("selection");
  const [increaseButtonLoader, setIncreaseButtonLoader] = useState(false);
  const [decreaseButtonLoader, setDecreaseButtonLoader] = useState(false);
  const [increaseButtonDisabled, setIncreaseButtonDisabled] = useState(false);
  const [decreaseButtonDisabled, setDecreaseButtonDisabled] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setRandomArray(Array(randomInteger(3, 17)).fill(null).map(() => randomInteger(0, 100)));   
  }, []);

  const selectionSort = (array: number[], sortDirection: string) => {
    const steps = [];
    const sortedElements = [];

    for (let i = 0; i < array.length - 1; i++) {
      let index = i;

      for (let j = i + 1; j < array.length; j++) {
        if (sortDirection === "increase" ? array[j] < array[index] : array[j] > array[index]) {
          index = j;
        }

        steps.push({
          currentArray: [...array],
          elementA: i,
          elementB: j,
          sortedElements: [...sortedElements]
        })
      }

      if (index !== i) {
        let tmp = array[i];
        array[i] = array[index];
        array[index] = tmp;
      }
      sortedElements.push(i);
    }

    sortedElements.push(array.length - 2, array.length - 1);
    steps.push({
      currentArray: [...array],
      elementA: null,
      elementB: null,
      sortedElements: [...sortedElements]
    })

    return steps;
  };

  const bubbleSort = (array: number[], sortDirection: string) => {
    const steps = [];
    const sortedElements = [];

    for (let i = 0; i < array.length; i++) {
      if (i > 0) {
        sortedElements.push(array.length - i);
      }      

      for (let j = 0; j < array.length - i - 1; j++) { 
        if (sortDirection === "increase" ? array[j] > array[j + 1] : array[j] < array[j + 1]) {
          let tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;
        }

        steps.push({
          currentArray: [...array],
          elementA: j,
          elementB: j + 1,
          sortedElements: [...sortedElements]
        })
      }
    }

    sortedElements.push(0);
    steps.push({
      currentArray: [...array],
      elementA: null,
      elementB: null,
      sortedElements: [...sortedElements]
    })

    return steps;
  };

  const randomInteger = (min: number, max: number) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  const startAlgorithm = (array: number[], sortDirection: string) => {
    const steps = sortMethod === "selection" ? selectionSort(array, sortDirection) : bubbleSort(array, sortDirection);
    setSteps(steps);
    setCurrentStep(0);

    intervalRef.current = setInterval(() => {
      setCurrentStep((prevState) => {
        const nextState = prevState + 1;
        
        if (nextState === steps.length - 1 && intervalRef.current) {
          setIncreaseButtonLoader(false);
          setDecreaseButtonLoader(false);
          setIncreaseButtonDisabled(false);
          setDecreaseButtonDisabled(false);
          clearInterval(intervalRef.current);
        }

        return nextState;
      });
    }, DELAY_MS_1000);
  };

  const selectionElementState = (item: number, elementA: number | null, elementB: number | null, sortedElements: number[]) => {
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
    e.currentTarget.value === "selection" ? setSortMethod("selection") : setSortMethod("bubble");
  };

  const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.value === "increase" ? setIncreaseButtonLoader(true) : setDecreaseButtonLoader(true);
    e.currentTarget.value === "increase" ? setDecreaseButtonDisabled(true) : setIncreaseButtonDisabled(true);
    if (randomArray) {
      startAlgorithm(randomArray, e.currentTarget.value);
    }
  };

  const onSubmitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSteps(null);
    setRandomArray(Array(randomInteger(3, 17)).fill(null).map(() => randomInteger(0, 100)));    
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={onSubmitFormHandler}>
          <div className={styles.container}>
            <div className={styles.container_radio}>
              <RadioInput label="Выбор" name="radio" value="selection" extraClass={styles.radio} onChange={onChangeRadioInputHandler} defaultChecked />
              <RadioInput label="Пузырёк" name="radio" value="bubble" extraClass={styles.radio} onChange={onChangeRadioInputHandler} />
            </div>
            <div className={styles.container_button}>
              <Button text="По возрастанию" value="increase" sorting={Direction.Ascending} extraClass={styles.button} onClick={onClickButtonHandler}  isLoader={increaseButtonLoader} disabled={increaseButtonDisabled} />
              <Button text="По убыванию" value="decrease" sorting={Direction.Descending} extraClass={styles.button} onClick={onClickButtonHandler}  isLoader={decreaseButtonLoader} disabled={decreaseButtonDisabled} />
            </div>
          </div>
          <Button text="Новый массив" type="submit" extraClass={styles.button} disabled={increaseButtonDisabled || decreaseButtonDisabled} />
        </form>
        <div className={styles.column}>
          {randomArray && !steps &&
            randomArray.map((item, i) => <Column index={item} key={i} />)
          }
          {steps &&
            steps[currentStep].currentArray.map((item: number, i: number) => <Column index={item} key={i} state={selectionElementState(i, steps[currentStep].elementA, steps[currentStep].elementB, steps[currentStep].sortedElements)} />)
          }
        </div>
      </div>
    </SolutionLayout>
  );
};
