import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { reversingString } from "./utils";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TReversingStringResult } from "./types";
import { DELAY_MS_1000 } from "../../utils/constants";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [steps, setSteps] = useState<TReversingStringResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [buttonLoader, setButtonLoader] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  const startAlgorithm = () => {
    if (inputValue) {
      if (inputValue.length > 1) {
        setButtonLoader(true);
      }

      const steps = reversingString(inputValue);
      setSteps(steps);
      setCurrentStep(0);

      if (steps.steps.length > 1) {
        intervalRef.current = setInterval(() => {
          setCurrentStep((prevState) => {
            const nextState = prevState + 1;

            if (
              nextState === steps.steps.length - 1 &&
              intervalRef.current &&
              inputRef.current
            ) {
              setButtonLoader(false);
              setInputValue(null);
              inputRef.current.value = "";
              clearInterval(intervalRef.current);
            }

            return nextState;
          });
        }, DELAY_MS_1000);
      }
    }
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.trim() !== "") {
      setInputValue(e.currentTarget.value);
    }
  };

  const onSubmitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startAlgorithm();
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={onSubmitFormHandler}>
            <Input
              maxLength={11}
              isLimitText={true}
              onChange={onChangeInputHandler}
              useRef={inputRef}
            />
            <Button
              text="Развернуть"
              type="submit"
              isLoader={buttonLoader}
              extraClass={styles.button}
              disabled={inputValue ? false : true}
            />
          </form>
        </div>
        <div className={styles.circles_container}>
          {steps &&
            steps.steps[currentStep].map((item, i) => (
              <Circle
                letter={item}
                key={i}
                state={steps.state[currentStep][i]}
              />
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
