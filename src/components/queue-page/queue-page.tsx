import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Queue } from "./queue";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [queueValue, setQueueValue] = useState<string[] | null>(null);
  const [headElementIndex, setHeadElementIndex] = useState<number | null>(null);
  const [tailElementIndex, setTailElementIndex] = useState<number | null>(null);
  const [stateHeadElementIndex, setStateHeadElementIndex] = useState<
    number | null
  >(null);
  const [stateTailElementIndex, setStateTailElementIndex] = useState<
    number | null
  >(null);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
  const [clearButtonDisabled, setClearButtonDisabled] = useState(true);
  const [addButtonLoader, setAddButtonLoader] = useState(false);
  const [deleteButtonLoader, setDeleteButtonLoader] = useState(false);

  const queue = useRef(new Queue<string>(Array(7).fill(undefined)));
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setQueueValue(queue.current.getQueue);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, []);

  const enqueue = () => {
    queue.current.getTail > 0
      ? setStateTailElementIndex(queue.current.getTail)
      : setStateTailElementIndex(0);
    setAddButtonLoader(true);
    setDeleteButtonDisabled(true);
    setClearButtonDisabled(true);
    if (queue.current.getTail !== queue.current.getQueue.length) {
      timeoutRef.current = setTimeout(() => {
        if (inputValue && inputRef.current) {
          setStateTailElementIndex(null);
          setInputValue(null);
          queue.current.enqueue(inputValue);
          inputRef.current.value = "";
          setQueueValue([...queue.current.getQueue]);
          setHeadElementIndex(queue.current.getHead);
          setTailElementIndex(queue.current.getTail - 1);
          setAddButtonDisabled(true);
          setAddButtonLoader(false);
          setDeleteButtonDisabled(false);
          setClearButtonDisabled(false);
        }
      }, SHORT_DELAY_IN_MS);
    } else {
      setAddButtonLoader(false);
      setDeleteButtonDisabled(false);
      setClearButtonDisabled(false);
    }
  };

  const dequeue = () => {
    setStateHeadElementIndex(queue.current.getHead);
    setDeleteButtonLoader(true);
    setClearButtonDisabled(true);
    if (headElementIndex === tailElementIndex) {
      setDeleteButtonDisabled(true);
    }
    timeoutRef.current = setTimeout(() => {
      setStateHeadElementIndex(null);
      queue.current.dequeue();
      setQueueValue([...queue.current.getQueue]);
      setHeadElementIndex(queue.current.getHead);
      setTailElementIndex(queue.current.getTail - 1);
      setClearButtonDisabled(false);
      setDeleteButtonLoader(false);
      if (queue.current.getEndQueue) {
        setTailElementIndex(null);
      }
    }, SHORT_DELAY_IN_MS);
  };

  const clear = () => {
    queue.current.clear();
    setQueueValue([...queue.current.getQueue]);
    setHeadElementIndex(null);
    setTailElementIndex(null);
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
    <SolutionLayout title="Очередь">
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
              onClick={enqueue}
              disabled={addButtonDisabled}
              isLoader={addButtonLoader}
            />
            <Button
              text="Удалить"
              extraClass={styles.delete_button}
              onClick={dequeue}
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
          {queueValue &&
            queueValue.map((item, i) => (
              <Circle
                letter={item}
                index={i}
                head={headElementIndex === i ? "head" : null}
                tail={tailElementIndex === i ? "tail" : null}
                state={
                  stateHeadElementIndex === i || stateTailElementIndex === i
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
                key={i}
              />
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
