import classes from './Input.module.css';
import React, { useRef, useImperativeHandle } from 'react';
//we not only get props, but ref
//ref not used 99% of the time but here we are :')
//here we export a React component that is bound to a ref and is also a functional component
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  //   useEffect(() => {
  //     inputRef.current.focus();
  //   }, []);
  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      //all the data that is available for use from the outside
      focus: activate,
    };
  });
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
