import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import { LinkedList } from "./linked-list";
import {
  prepend,
  append,
  deleteHead,
  deleteTail,
  addByIndex,
  deleteByIndex,
} from "./utils";
import { randomArrayString } from "../../utils/randomArray";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TSteps, Position, Operation, ILinkedListNode } from "./types";

export const ListPage: React.FC = () => {
  const linkedList = useRef(
    new LinkedList<string>(randomArrayString(3, 6, 0, 100)),
  );

  const [inputValue, setInputValue] = useState<string | null>(null);
  const [inputIndex, setInputIndex] = useState<string | null>(null);
  const [steps, setSteps] = useState<TSteps[]>([
    {
      index: null,
      value: undefined,
      list: linkedList.current.toArray(),
      state: [],
      direction: null,
      hideValue: [],
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [isLoaderButton, setIsLoaderButton] = useState<Operation | null>(null);

  const intervalRef = useRef<NodeJS.Timeout>();
  const inputValueRef = useRef<HTMLInputElement>(null);
  const inputIndexRef = useRef<HTMLInputElement>(null);

  const startAlgorithm = () => {
    if (steps) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prevState) => {
          const nextState = prevState + 1;

          if (nextState === steps.length - 1 && intervalRef.current) {
            clearInterval(intervalRef.current);
            setIsLoaderButton(null);
          }

          return nextState;
        });
      }, SHORT_DELAY_IN_MS);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    switch (operation) {
      case Operation.AddHead:
        setCurrentStep(0);
        if (inputValue && inputValueRef.current && inputIndexRef.current) {
          setSteps(prepend(inputValue, linkedList.current));
          inputValueRef.current.value = "";
          inputIndexRef.current.value = "";
          setInputValue(null);
          setInputIndex(null);
        }
        break;

      case Operation.AddTail:
        setCurrentStep(0);
        if (inputValue && inputValueRef.current && inputIndexRef.current) {
          setSteps(append(inputValue, linkedList.current));
          inputValueRef.current.value = "";
          inputIndexRef.current.value = "";
          setInputValue(null);
          setInputIndex(null);
        }
        break;

      case Operation.DeleteHead:
        if (inputValueRef.current && inputIndexRef.current) {
          setCurrentStep(0);
          setSteps(deleteHead(linkedList.current));
          inputValueRef.current.value = "";
          inputIndexRef.current.value = "";
          setInputValue(null);
          setInputIndex(null);
        }

        break;

      case Operation.DeleteTail:
        if (inputValueRef.current && inputIndexRef.current) {
          setCurrentStep(0);
          setSteps(deleteTail(linkedList.current));
          inputValueRef.current.value = "";
          inputIndexRef.current.value = "";
          setInputValue(null);
          setInputIndex(null);
        }
        break;

      case Operation.AddByIndex:
        if (inputValue && inputValueRef.current && inputIndexRef.current) {
          setCurrentStep(0);
          setSteps(
            addByIndex(inputValue, Number(inputIndex), linkedList.current),
          );
          inputValueRef.current.value = "";
          inputIndexRef.current.value = "";
          setInputValue(null);
          setInputIndex(null);
        }
        break;

      case Operation.DeleteByIndex:
        if (inputValueRef.current && inputIndexRef.current) {
          setCurrentStep(0);
          setSteps(deleteByIndex(Number(inputIndex), linkedList.current));
          inputValueRef.current.value = "";
          inputIndexRef.current.value = "";
          setInputValue(null);
          setInputIndex(null);
        }
        break;
    }

    setOperation(null);
  }, [operation, inputIndex, inputValue]);

  useEffect(() => {
    if (steps.length > 1) {
      startAlgorithm();
    }
  }, [steps]); // eslint-disable-line

  const onChangeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.trim() !== ""
      ? setInputValue(e.currentTarget.value)
      : setInputValue(null);
  };

  const onChangeInputIndexHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      0 <= Number(e.currentTarget.value) &&
      Number(e.currentTarget.value) < linkedList.current.toArray().length
    ) {
      setInputIndex(e.currentTarget.value);
    } else {
      setInputIndex(null);
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <div className={styles.row}>
            <Input
              maxLength={4}
              isLimitText={true}
              placeholder="Введите значение"
              extraClass={styles.input}
              onChange={onChangeInputValueHandler}
              useRef={inputValueRef}
            />
            <Button
              text="Добавить в head"
              extraClass={styles.value_button}
              onClick={() => {
                setOperation(Operation.AddHead);
                setIsLoaderButton(Operation.AddHead);
              }}
              disabled={inputValue === null || isLoaderButton !== null}
              isLoader={isLoaderButton === Operation.AddHead ? true : false}
            />
            <Button
              text="Добавить в tail"
              extraClass={styles.value_button}
              onClick={() => {
                setOperation(Operation.AddTail);
                setIsLoaderButton(Operation.AddTail);
              }}
              disabled={inputValue === null || isLoaderButton !== null}
              isLoader={isLoaderButton === Operation.AddTail ? true : false}
            />
            <Button
              text="Удалить из head"
              extraClass={styles.value_button}
              onClick={() => {
                setOperation(Operation.DeleteHead);
                setIsLoaderButton(Operation.DeleteHead);
              }}
              disabled={
                isLoaderButton !== null ||
                linkedList.current.toArray().length === 0
              }
              isLoader={isLoaderButton === Operation.DeleteHead ? true : false}
            />
            <Button
              text="Удалить из tail"
              extraClass={styles.value_button}
              onClick={() => {
                setOperation(Operation.DeleteTail);
                setIsLoaderButton(Operation.DeleteTail);
              }}
              disabled={
                isLoaderButton !== null ||
                linkedList.current.toArray().length === 0
              }
              isLoader={isLoaderButton === Operation.DeleteTail ? true : false}
            />
          </div>
          <div className={styles.row}>
            <Input
              placeholder="Введите индекс"
              type="number"
              maxLength={linkedList.current.toArray().length - 1}
              min={0}
              max={linkedList.current.toArray().length - 1}
              extraClass={styles.input}
              onChange={onChangeInputIndexHandler}
              useRef={inputIndexRef}
            />
            <Button
              text="Добавить по индексу"
              extraClass={styles.index_button}
              onClick={() => {
                setOperation(Operation.AddByIndex);
                setIsLoaderButton(Operation.AddByIndex);
              }}
              disabled={
                inputValue === null ||
                inputIndex === null ||
                isLoaderButton !== null
              }
              isLoader={isLoaderButton === Operation.AddByIndex ? true : false}
            />
            <Button
              text="Удалить по индексу"
              extraClass={styles.index_button}
              onClick={() => {
                setOperation(Operation.DeleteByIndex);
                setIsLoaderButton(Operation.DeleteByIndex);
              }}
              disabled={inputIndex === null || isLoaderButton !== null}
              isLoader={
                isLoaderButton === Operation.DeleteByIndex ? true : false
              }
            />
          </div>
        </form>
        <div className={styles.result}>
          {steps &&
            steps[currentStep].list.map(
              (
                item: ILinkedListNode<string>,
                i: number,
                array: ILinkedListNode<string>[],
              ) => {
                return (
                  <div className={styles.item} key={i}>
                    <Circle
                      letter={
                        steps[currentStep].hideValue[i]
                          ? undefined
                          : item.getValue
                      }
                      head={
                        i === steps[currentStep].index &&
                        steps[currentStep].direction === Position.Top ? (
                          <Circle
                            letter={steps[currentStep].value}
                            isSmall={true}
                            state={ElementStates.Changing}
                          />
                        ) : i === 0 ? (
                          "head"
                        ) : null
                      }
                      tail={
                        i === steps[currentStep].index &&
                        steps[currentStep].direction === Position.Bottom ? (
                          <Circle
                            letter={steps[currentStep].value}
                            isSmall={true}
                            state={ElementStates.Changing}
                          />
                        ) : i === steps[currentStep].list.length - 1 ? (
                          "tail"
                        ) : null
                      }
                      index={i}
                      key={i}
                      state={steps[currentStep].state[i]}
                    />
                    {array.length - 1 !== i && <ArrowIcon />}
                  </div>
                );
              },
            )}
        </div>
      </div>
    </SolutionLayout>
  );
};
