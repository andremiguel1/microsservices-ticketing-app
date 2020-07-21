import { useState, useCallback } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      doRequest();

      console.log(email + ' _ ' + password);
    },
    [email, password]
  );

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className='form-group'>
        <label>E-mail</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label>E-mail</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='form-control'
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Sign Up
      </button>
      {errors}
    </form>
  );
};
