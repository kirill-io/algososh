import { useState, useRef, ChangeEvent, FormEvent } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_MS_500 } from "../../utils/constants";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [steps, setSteps] = useState<number[] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [buttonLoader, setButtonLoader] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout>();

  const fibIterative = (n: number): number[] => {
    const fib = [1, 1];

    for (let i = 2; i <= n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }

    return fib;
  };

  const startAlgorithm = () => {
    setButtonLoader(true);

    const steps = fibIterative(Number(inputValue));
    setSteps(steps);
    setCurrentStep(0);

    intervalRef.current = setInterval(() => {
      setCurrentStep((prevState) => {
        const nextState = prevState + 1;

        if (nextState === steps.length - 1 && intervalRef.current) {
          setButtonLoader(false);
          clearInterval(intervalRef.current);
        }

        return nextState;
      })
    }, DELAY_MS_500);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onSubmitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startAlgorithm();
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={onSubmitFormHandler}>
            <Input placeholder="Введите значение" maxLength={19} isLimitText={true} type="number" max={19} min={1} onChange={onChangeInputHandler} />
            <Button text="Рассчитать" type="submit" isLoader={buttonLoader} extraClass={styles.button} />
          </form>
        </div>
        <div className={styles.circles_container}>
          {steps &&
            steps.slice(0, currentStep + 1).map((item, i) => <Circle letter={String(item)} key={i} tail={String(i)} />)
          }
        </div>
      </div>
    </SolutionLayout>
  );
};
