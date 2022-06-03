import React, {useEffect, useRef, useState} from 'react';

type DebouncePropsType = {
  props: any
}
export const Debounce: React.FC<DebouncePropsType> = ({props}) => {

  useEffect(() => {
    debouncedLogging(props)
  }, [props])

  const [info, setInfo] = useState<string>('');

  const Debounced = (func: Function, delay: number) => {
    const ref = useRef(0);
    return (...args: any) => {
      clearTimeout(ref.current);
      ref.current = Number(setTimeout(() => func(...args), delay));
    };
  };

  const debouncedLogging = Debounced(setInfo, 800);

  return (
    <div>
      <h2>Value MIN: {info[0]}</h2>
      <h2>Value MAX: {info[1]}</h2>
    </div>
  );
};
