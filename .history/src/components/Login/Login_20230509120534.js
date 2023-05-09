import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  /**
   * Cleanup function is executed in begining of the second execution withount including the first execution
   * userEffects use cases : 
   */
  //CASE 1: without dependencies : 
  useEffect(() => {
    console.log('EFFECT RUNNING WITH NOT DEPENDENCIES'); // this code  runs after every component redering cycle not before it not during it but after it, including the first time the component was rendred
  })
  //CASE 2 with empty array of dependencies 
  useEffect(() => {
    console.log('EFFECT RUNNING WITH EMPTY DEPENDENCIES'); // this code  runs will only runs once for the first time the component was rendred
    return ()=>{console.log('CLEANUP EFFECT')}   // in this cas the cleanup function will executed whenn the component is removed from the DOM 
  }, []);
  // CASE 3 with some dependencies :as we have below 
  //Adding timout is called debounds operattion 
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking form validity!')
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500)
    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);


  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);


  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
