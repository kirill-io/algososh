import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import { getFibonacciNumbers } from "./utils";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [steps, setSteps] = useState<number[] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [buttonLoader, setButtonLoader] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, []);

  const startAlgorithm = () => {
    setButtonLoader(true);

    const steps = getFibonacciNumbers(Number(inputValue));
    setSteps(steps);
    setCurrentStep(0);

    intervalRef.current = setInterval(() => {
      setCurrentStep((prevState) => {
        const nextState = prevState + 1;

        if (nextState === steps.length) {
          if (intervalRef.current && inputRef.current) {
            setButtonLoader(false);
            setInputValue(null);
            inputRef.current.value = "";
            clearInterval(intervalRef.current);
          }
        }

        return nextState;
      });
    }, SHORT_DELAY_IN_MS);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      Number(e.currentTarget.value) >= 1 &&
      Number(e.currentTarget.value) <= 19
    ) {
      setInputValue(e.currentTarget.value);
    } else {
      setInputValue(null);
    }
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
            <Input
              placeholder="Введите значение"
              maxLength={19}
              isLimitText={true}
              type="number"
              max={19}
              min={1}
              onChange={onChangeInputHandler}
              useRef={inputRef}
            />
            <Button
              text="Рассчитать"
              type="submit"
              isLoader={buttonLoader}
              extraClass={styles.button}
              disabled={inputValue ? false : true}
            />
          </form>
        </div>
        <div className={styles.circles_container}>
          {steps &&
            steps
              .slice(0, currentStep + 1)
              .map((item, i) => (
                <Circle letter={String(item)} key={i} tail={String(i)} />
              ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
