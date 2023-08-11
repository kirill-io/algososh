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
  const [stackValue, setStackValue] = useState<string[]>([]);
  const [topElementIndex, setTopElementIndex] = useState<number | null>(null);
  const [stateElementIndex, setStateElementIndex] = useState<number | null>(
    null,
  );
  const [buttonLoader, setButtonLoader] = useState({
    add: false,
    delete: false,
  });

  const stack = useRef(new Stack<string>());
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const push = () => {
    if (inputValue && inputRef.current) {
      stack.current.push(inputValue);
      inputRef.current.value = "";
      setInputValue(null);
      setStackValue(stack.current.getStack);
      setTopElementIndex(stack.current.getSize - 1);
      setStateElementIndex(stack.current.getSize - 1);
      setButtonLoader({ ...buttonLoader, add: true });

      timeoutRef.current = setTimeout(() => {
        setStateElementIndex(stack.current.getSize);
        setButtonLoader({ ...buttonLoader, add: false });
      }, SHORT_DELAY_IN_MS);
    }
  };

  const pop = () => {
    setStateElementIndex(stack.current.getSize - 1);
    setButtonLoader({ ...buttonLoader, delete: true });

    timeoutRef.current = setTimeout(() => {
      stack.current.pop();
      !stack.current.getStack.length
        ? setStackValue([])
        : setStackValue([...stack.current.getStack]);
      setTopElementIndex(stack.current.getSize - 1);
      setButtonLoader({ ...buttonLoader, delete: false });
    }, SHORT_DELAY_IN_MS);
  };

  const clear = () => {
    stack.current.clear();
    setStackValue([]);
    setInputValue(null);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.trim() !== ""
      ? setInputValue(e.currentTarget.value)
      : setInputValue(null);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <div className={styles.container}>
            <Input
              type="text"
              maxLength={4}
              isLimitText={true}
              extraClass={styles.input}
              onChange={onChangeInputHandler}
              useRef={inputRef}
            />
            <Button
              text="Добавить"
              extraClass={styles.add_button}
              type="submit"
              onClick={push}
              disabled={inputValue === null || buttonLoader.delete}
              isLoader={buttonLoader.add}
            />
            <Button
              text="Удалить"
              extraClass={styles.delete_button}
              onClick={pop}
              disabled={stackValue.length === 0 || buttonLoader.add}
              isLoader={buttonLoader.delete}
              data-cy="deleteButton"
            />
          </div>
          <Button
            text="Очистить"
            extraClass={styles.clear_button}
            onClick={clear}
            disabled={
              stackValue.length === 0 || buttonLoader.add || buttonLoader.delete
            }
            data-cy="clearButton"
          />
        </form>
        <div className={styles.result} data-cy="stack">
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
