import { useEffect, useState, useRef, ChangeEvent } from "react";
import { Stack } from "./stack";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays"; 

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [stackValue, setStackValue] = useState<string[] | null>(null);
  const [topElementIndex, setTopElementIndex] = useState<number | null>(null);
  const [stateElementIndex, setStateElementIndex] = useState<number | null>(
    null,
  );
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
  const [clearButtonDisabled, setClearButtonDisabled] = useState(true);
  const [addButtonLoader, setAddButtonLoader] = useState(false);
  const [deleteButtonLoader, setDeleteButtonLoader] = useState(false);

  const stack = useRef(new Stack<string>());
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, []);

  const push = () => {
    if (inputValue && inputRef.current) {
      stack.current.push(inputValue);
      inputRef.current.value = "";
      setAddButtonDisabled(true);
      setStackValue(stack.current.getStack);
      setTopElementIndex(stack.current.getSize - 1);
      setStateElementIndex(stack.current.getSize - 1);
      setAddButtonLoader(true);
      setDeleteButtonDisabled(true);
      setClearButtonDisabled(true);

      timeoutRef.current = setTimeout(() => {
        setStateElementIndex(stack.current.getSize);
        setAddButtonLoader(false);
        setDeleteButtonDisabled(false);
        setClearButtonDisabled(false);
      }, SHORT_DELAY_IN_MS);
    }
  };

  const pop = () => {
    setStateElementIndex(stack.current.getSize - 1);
    setDeleteButtonLoader(true);
    setClearButtonDisabled(true);

    if (stack.current.getSize - 1 === 0) {
      setDeleteButtonDisabled(true);
    }

    timeoutRef.current = setTimeout(() => {
      stack.current.pop();
      !stack.current.getStack.length
        ? setStackValue(null)
        : setStackValue([...stack.current.getStack]);
      setTopElementIndex(stack.current.getSize - 1);
      setDeleteButtonLoader(false);

      if (stack.current.getSize !== 0) {
        setClearButtonDisabled(false);
      }
    }, SHORT_DELAY_IN_MS);
  };

  const clear = () => {
    stack.current.clear();
    setStackValue(null);
    setDeleteButtonDisabled(true);
    setClearButtonDisabled(true);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);

    if (e.currentTarget.value && e.currentTarget.value.trim() !== "") {
      setAddButtonDisabled(false);
    }
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <div className={styles.container}>
            <Input
              maxLength={4}
              isLimitText={true}
              extraClass={styles.input}
              onChange={onChangeInputHandler}
              useRef={inputRef}
            />
            <Button
              text="Добавить"
              extraClass={styles.add_button}
              onClick={push}
              disabled={addButtonDisabled}
              isLoader={addButtonLoader}
            />
            <Button
              text="Удалить"
              extraClass={styles.delete_button}
              onClick={pop}
              disabled={deleteButtonDisabled}
              isLoader={deleteButtonLoader}
            />
          </div>
          <Button
            text="Очистить"
            extraClass={styles.clear_button}
            onClick={clear}
            disabled={clearButtonDisabled}
          />
        </form>
        <div className={styles.result}>
          {stackValue &&
            stackValue.map((item, i) => (
              <Circle
                letter={item}
                index={i}
                key={i}
                head={topElementIndex === i ? "top" : null}
                state={
                  stateElementIndex === i
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
              />
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
