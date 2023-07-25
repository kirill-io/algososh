import { useState, useEffect, useRef, ChangeEvent } from "react";
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
import { DELAY_MS_500 } from "../../utils/constants";
import { ElementStates } from "../../types/element-states";
import { TSteps, Position, Operation, ILinkedListNode } from "./types";

export const ListPage: React.FC = () => {
  const linkedList = useRef(
    new LinkedList<string>(randomArrayString(3, 6, 0, 100)),
  );
  const intervalRef = useRef<NodeJS.Timeout>();
  const inputValueRef = useRef<HTMLInputElement>(null);
  const inputIndexRef = useRef<HTMLInputElement>(null);

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
  const [addHeadButtonDisabled, setAddHeadButtonDisabled] = useState(true);
  const [addTailButtonDisabled, setAddTailButtonDisabled] = useState(true);
  const [deleteHeadButtonDisabled, setDeleteHeadButtonDisabled] =
    useState(true);
  const [deleteTailButtonDisabled, setDeleteTailButtonDisabled] =
    useState(true);
  const [addByIndexButtonDisabled, setAddByIndexButtonDisabled] =
    useState(true);
  const [deleteByIndexButtonDisabled, setDeleteByIndexButtonDisabled] =
    useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoaderButton, setIsLoaderButton] = useState<Operation | null>(null);

  const startAlgorithm = () => {
    if (steps) {
      setButtonDisabled(true);
      intervalRef.current = setInterval(() => {
        setCurrentStep((prevState) => {
          const nextState = prevState + 1;

          if (nextState === steps.length - 1 && intervalRef.current) {
            clearInterval(intervalRef.current);
            setIsLoaderButton(null);
            setButtonDisabled(false);
          }

          return nextState;
        });
      }, DELAY_MS_500);
    }
  };

  useEffect(() => {
    if (inputIndex && inputValue) {
      setAddByIndexButtonDisabled(false);
    } else {
      setAddByIndexButtonDisabled(true);
    }
  }, [inputValue, inputIndex]);

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
          setAddHeadButtonDisabled(true);
          setAddTailButtonDisabled(true);
          setAddByIndexButtonDisabled(true);
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
          setAddHeadButtonDisabled(true);
          setAddTailButtonDisabled(true);
          setAddByIndexButtonDisabled(true);
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
          setAddHeadButtonDisabled(true);
          setAddTailButtonDisabled(true);
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
          setAddHeadButtonDisabled(true);
          setAddTailButtonDisabled(true);
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
          setAddHeadButtonDisabled(true);
          setAddTailButtonDisabled(true);
          setAddByIndexButtonDisabled(true);
          setDeleteByIndexButtonDisabled(true);
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
          setAddByIndexButtonDisabled(true);
          setDeleteByIndexButtonDisabled(true);
        }
        break;
    }

    setOperation(null);
  }, [operation]);

  useEffect(() => {
    if (linkedList.current.toArray().length > 0) {
      setDeleteHeadButtonDisabled(false);
      setDeleteTailButtonDisabled(false);
    } else {
      setDeleteHeadButtonDisabled(true);
      setDeleteTailButtonDisabled(true);
      setDeleteByIndexButtonDisabled(true);
    }

    if (steps.length > 1) {
      startAlgorithm();
    }
  }, [steps]);

  const onChangeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.trim() !== "") {
      setInputValue(e.currentTarget.value.trim());
    } else {
      setInputValue(null);
    }

    if (e.currentTarget.value && e.currentTarget.value.trim() !== "") {
      setAddHeadButtonDisabled(false);
      setAddTailButtonDisabled(false);
    } else {
      setAddHeadButtonDisabled(true);
      setAddTailButtonDisabled(true);
    }
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

    if (
      e.currentTarget.value &&
      0 <= Number(e.currentTarget.value) &&
      Number(e.currentTarget.value) < linkedList.current.toArray().length
    ) {
      setDeleteByIndexButtonDisabled(false);
      setAddByIndexButtonDisabled(false);
    } else {
      setAddByIndexButtonDisabled(true);
      setDeleteByIndexButtonDisabled(true);
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <form className={styles.form}>
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
              disabled={addHeadButtonDisabled || buttonDisabled}
              isLoader={isLoaderButton === Operation.AddHead ? true : false}
            />
            <Button
              text="Добавить в tail"
              extraClass={styles.value_button}
              onClick={() => {
                setOperation(Operation.AddTail);
                setIsLoaderButton(Operation.AddTail);
              }}
              disabled={addTailButtonDisabled || buttonDisabled}
              isLoader={isLoaderButton === Operation.AddTail ? true : false}
            />
            <Button
              text="Удалить из head"
              extraClass={styles.value_button}
              onClick={() => {
                setOperation(Operation.DeleteHead);
                setIsLoaderButton(Operation.DeleteHead);
              }}
              disabled={deleteHeadButtonDisabled || buttonDisabled}
              isLoader={isLoaderButton === Operation.DeleteHead ? true : false}
            />
            <Button
              text="Удалить из tail"
              extraClass={styles.value_button}
              onClick={() => {
                setOperation(Operation.DeleteTail);
                setIsLoaderButton(Operation.DeleteTail);
              }}
              disabled={deleteTailButtonDisabled || buttonDisabled}
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
              disabled={addByIndexButtonDisabled || buttonDisabled}
              isLoader={isLoaderButton === Operation.AddByIndex ? true : false}
            />
            <Button
              text="Удалить по индексу"
              extraClass={styles.index_button}
              onClick={() => {
                setOperation(Operation.DeleteByIndex);
                setIsLoaderButton(Operation.DeleteByIndex);
              }}
              disabled={deleteByIndexButtonDisabled || buttonDisabled}
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
