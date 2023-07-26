import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
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
  const [buttonLoader, setButtonLoader] = useState({
    add: false,
    delete: false,
  });

  const queue = useRef(new Queue<string>(Array(7).fill(undefined)));
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setQueueValue(queue.current.getQueue);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const enqueue = () => {
    queue.current.getTail > 0
      ? setStateTailElementIndex(queue.current.getTail)
      : setStateTailElementIndex(0);
    setButtonLoader({ ...buttonLoader, add: true });

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
          setButtonLoader({ ...buttonLoader, add: false });
        }
      }, SHORT_DELAY_IN_MS);
    } else {
      setButtonLoader({ ...buttonLoader, add: false });
    }
  };

  const dequeue = () => {
    setStateHeadElementIndex(queue.current.getHead);
    setButtonLoader({ ...buttonLoader, delete: true });

    timeoutRef.current = setTimeout(() => {
      setStateHeadElementIndex(null);
      queue.current.dequeue();
      setQueueValue([...queue.current.getQueue]);
      setHeadElementIndex(queue.current.getHead);
      setTailElementIndex(queue.current.getTail - 1);
      setButtonLoader({ ...buttonLoader, delete: false });

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
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.trim() !== ""
      ? setInputValue(e.currentTarget.value)
      : setInputValue(null);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
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
              disabled={inputValue === null || buttonLoader.delete}
              isLoader={buttonLoader.add}
            />
            <Button
              text="Удалить"
              extraClass={styles.delete_button}
              onClick={dequeue}
              disabled={
                headElementIndex === null ||
                tailElementIndex === null ||
                buttonLoader.add
              }
              isLoader={buttonLoader.delete}
            />
          </div>
          <Button
            text="Очистить"
            extraClass={styles.clear_button}
            onClick={clear}
            disabled={
              headElementIndex === null ||
              buttonLoader.add ||
              buttonLoader.delete
            }
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
