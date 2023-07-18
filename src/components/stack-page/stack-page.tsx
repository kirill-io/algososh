import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Stack } from "./stack";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_MS_500 } from "../../utils/constants";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [stackValue, setStackValue] = useState<string[] | null>(null);
  const [topElementIndex, setTopElementIndex] = useState<number | null>(null);
  const [stateElementIndex, setStateElementIndex] = useState<number | null>(null);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
  const [clearButtonDisabled, setClearButtonDisabled] = useState(true);

  const stack = useRef(new Stack());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stackValue) {
      setDeleteButtonDisabled(false);
      setClearButtonDisabled(false);
    } else {
      setDeleteButtonDisabled(true);
      setClearButtonDisabled(true);
    }
  }, [stackValue]);

  const push = () => {
    if (inputValue && inputRef.current) {
      stack.current.push(inputValue);
      inputRef.current.value = "";
      setAddButtonDisabled(true);
      setStackValue(stack.current.getStack);
      setTopElementIndex(stack.current.getSize - 1);
      setStateElementIndex(stack.current.getSize - 1)
      setTimeout(() => {
        setStateElementIndex(stack.current.getSize);
      }, DELAY_MS_500);
    }
  };

  const pop = () => {
    setStateElementIndex(stack.current.getSize - 1);

    setTimeout(() => {
      stack.current.pop();
      !stack.current.getStack.length ? setStackValue(null) : setStackValue([...stack.current.getStack]);
      setTopElementIndex(stack.current.getSize - 1);
    }, DELAY_MS_500);
  };

  const clear = () => {
    stack.current.clear();
    setStackValue(null);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);

    if (e.currentTarget.value) {
      setAddButtonDisabled(false);
    }
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <div className={styles.container}>
            <Input maxLength={4} isLimitText={true} extraClass={styles.input} onChange={onChangeInputHandler} useRef={inputRef} />
            <Button text="Добавить" extraClass={styles.add_button} onClick={push} disabled={addButtonDisabled ? true : false} />
            <Button text="Удалить" extraClass={styles.delete_button} onClick={pop} disabled={deleteButtonDisabled ? true : false} />
          </div>
          <Button text="Очистить" extraClass={styles.clear_button} onClick={clear} disabled={clearButtonDisabled ? true : false} />
        </form>
        <div className={styles.result}>
          {stackValue &&
            stackValue.map((item, i) => <Circle letter={item} index={i} key={i} head={topElementIndex === i ? "top" : null} state={stateElementIndex === i ? ElementStates.Changing : ElementStates.Default} />)
          }
        </div>
      </div>
    </SolutionLayout>
  );
};
