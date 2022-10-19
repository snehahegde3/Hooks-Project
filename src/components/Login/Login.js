import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

//useReducer need not have to have a reducer function within the component
//when the reducer function is called, all the data that is needed by the function
//is passed into it automatically
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};
const Login = (props) => {
  const authCtx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  //remembder that useEffect runs AFTER the component renrederes. After.
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking for validity');
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500); //runs after 500msec
    //adding the setFormIsValid function itself as a dependency
    //but DO NOT add this as it itself is a state updating function which never changes
    //this effect function reruns each time theres a chnge in either of the
    //values mentioned in the dependency array

    //you might think this isnt a side effect exactly
    //but checking and updating something after a keystroke can also be considered a side effect
    //its a side effect of user entering data

    //a cleanup function makes sure that the setFormIsValid is not set on each keystroke
    //and only acts when the user pauses
    //we can add a cleanup function with this
    //this runs before the useEffect executes the next time
    //wheneever the component unmounts
    return () => {
      console.log('Cleanup');
      clearTimeout(identifier);

      //clears the timeout just before the ueEffect runs again
    };
  }, [emailState.isValid, passwordState.isValid]);
  //do not pass in the entire emailState as this runs each time the input changes
  //we want it to run only when the validity changes

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

    //here, the setFormIsValid is changing state depending on other states.
    //if the FormIsValid gets updates before the other two states updates,
    //it results in false state
    //so we use useReducer

    // setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  //on click of the login,
  //the first invalid input gets focused on
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id='email'
          label='E-Mail'
          isValid={emailState.isValid}
          type='email'
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id='password'
          label='Password'
          isValid={passwordState.isValid}
          type='password'
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
