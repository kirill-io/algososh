import { useState, useRef, ChangeEvent, FormEvent } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TReversingStringResult } from "../../types/string-state";
import { DELAY_MS } from "../../utils/constants";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [steps, setSteps] = useState<TReversingStringResult  | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [buttonLoader, setButtonLoader] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout>();

  const reversingString = (initialString: string): TReversingStringResult => {
    const initialStringSymbols = initialString.split('');
    const stringLength = initialString.length;
    const initialState = Array(stringLength).fill(ElementStates.Default);
    const result: TReversingStringResult = {
      steps: [[...initialStringSymbols]],
      state: [[...initialState]]
    };
    
    const middle = Math.floor(initialString.length / 2);    

    if (stringLength === 1) {
      result.state[stringLength - 1][stringLength - 1] = ElementStates.Modified;
      return result;
    }

    for (let i = 0; i < middle; i++) {
      let tmp = initialStringSymbols[i];
      initialStringSymbols[i] = initialStringSymbols[initialStringSymbols.length - 1 - i];
      initialStringSymbols[initialStringSymbols.length - 1 - i] = tmp;
      result.steps.push([...initialStringSymbols]);
      
      if (i === 0) {
        result.state[i][i] = ElementStates.Changing;
        result.state[i][stringLength - 1] = ElementStates.Changing;
      } else {
        initialState[i] = ElementStates.Changing;
        initialState[stringLength - 1 - i] = ElementStates.Changing;
        initialState[i - 1] = ElementStates.Modified;
        initialState[stringLength - i] = ElementStates.Modified;
        result.state.push([...initialState]);
      }
    }

    result.state.push([...Array(stringLength).fill(ElementStates.Modified)])

    return result;
  };

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
            
            if (nextState === steps.steps!.length - 1 && intervalRef.current) {
              setButtonLoader(false);
              clearInterval(intervalRef.current);
            }
  
            return nextState;
          });
        }, DELAY_MS);
      }
    }
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
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
            <Input maxLength={11} isLimitText={true} onChange={onChangeInputHandler} />
            <Button text="Развернуть" type="submit" isLoader={buttonLoader} />
          </form>
        </div>
        <div className={styles.circles_container}>
          {steps && 
            steps.steps[currentStep].map((item, i) => <Circle letter={item} key={i} state={steps.state[currentStep][i]} />)
          }
        </div>
      </div>
    </SolutionLayout>
  );
};
