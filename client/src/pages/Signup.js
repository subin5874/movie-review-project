import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Signup.module.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const [userName, setUserName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isAvailableUserName, setIsAvailableUserName] = useState(null);
  const [isAvailableID, setIsAvailableID] = useState(null);

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const onChangeId = (e) => {
    setId(e.target.value);
  };

  //User Name 중복 체크
  useEffect(() => {
    if (userName) {
      const debouncedCheckUsername = debounce(checkUsername, 500);
      debouncedCheckUsername(userName);

      return () => {
        debouncedCheckUsername.cancel();
      };
    }
  }, [userName]);

  const checkUsername = async (userName) => {
    console.log('확인 시작');
    axios
      .get('http://localhost:3003/user/checkUserName', {
        params: {
          userName: userName,
        },
      })
      .then((res) => {
        console.log('중복확인 결과:', res.data.isAvailable);
        setIsAvailableUserName(res.data.isAvailable);
      })
      .catch((err) => {
        console.error('Error checking username availability:', err);
      });
  };

  //ID 중복 체크
  useEffect(() => {
    if (id) {
      const debouncedCheckID = debounce(checkID, 500);
      debouncedCheckID(id);

      return () => {
        debouncedCheckID.cancel();
      };
    }
  }, [id]);

  const checkID = async (id) => {
    console.log('확인 시작');
    axios
      .get('http://localhost:3003/user/checkID', {
        params: {
          id: id,
        },
      })
      .then((res) => {
        console.log('중복확인 결과:', res.data.isAvailable);
        setIsAvailableID(res.data.isAvailable);
      })
      .catch((err) => {
        console.error('Error checking username availability:', err);
      });
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSignup = (data) => {
    axios
      .post('http://localhost:3003/user/signup', {
        userName: data.userName,
        id: data.id,
        password: data.password,
      })
      .then((res) => {
        window.alert('회원가입이 성공적으로 완료되었습니다!');
        navigate('/login');
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className={styles.signup_container}>
      <div className={styles.top_bar}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        <div className={styles.signup_box}>
          <span>회원가입</span>
          <form
            onSubmit={handleSubmit(onSignup)}
            className={styles.signup_form}
          >
            <article className={styles.signup_input_box}>
              <label htmlFor="userName">사용자 이름</label>
              <input
                type="text"
                className={styles.signup_input}
                placeholder="사용자 이름"
                aria-invalid={
                  isSubmitted ? (errors.userName ? 'true' : 'false') : undefined
                }
                {...register('userName', {
                  required: '*사용자 이름은 필수 입력입니다.',
                  maxLength: {
                    value: 10,
                    message: '*10자리 이하 사용자 이름을 사용하세요.',
                  },
                })}
                onChange={onChangeUserName}
              />
              {userName &&
                (isAvailableUserName ? (
                  <span className={styles.isAvailable_true_msg}>
                    *사용 가능한 아이디입니다.
                  </span>
                ) : (
                  <span className={styles.isAvailable_false_msg}>
                    *중복된 아이디입니다.
                  </span>
                ))}
              {!userName && (
                <span className={styles.input_warning_msg}>*중복 불가능</span>
              )}

              {errors.userName && (
                <span className={styles.error_msg}>
                  {errors.userName.message}
                </span>
              )}
            </article>
            <article className={styles.signup_input_box}>
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                className={styles.signup_input}
                placeholder="아이디"
                aria-invalid={
                  isSubmitted ? (errors.id ? 'true' : 'false') : undefined
                }
                {...register('id', {
                  required: '*아이디는 필수 입력입니다.',
                  minLength: {
                    value: 8,
                    message: '*8자리 이상 아이디를 사용하세요.',
                  },
                  maxLength: {
                    value: 15,
                    message: '*15자리 이하 아이디를 사용하세요.',
                  },
                })}
                onChange={onChangeId}
              />
              {id &&
                (isAvailableID ? (
                  <span className={styles.isAvailable_true_msg}>
                    *사용 가능한 아이디입니다.
                  </span>
                ) : (
                  <span className={styles.isAvailable_false_msg}>
                    *중복된 아이디입니다.
                  </span>
                ))}
              {!id && (
                <span className={styles.input_warning_msg}>*중복 불가능</span>
              )}
              {errors.id && (
                <span className={styles.error_msg}>{errors.id.message}</span>
              )}
            </article>
            <article className={styles.signup_input_box}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                className={styles.signup_input}
                placeholder="비밀번호"
                aria-invalid={
                  isSubmitted ? (errors.password ? 'true' : 'false') : undefined
                }
                {...register('password', {
                  required: '*비밀번호는 필수 입력입니다.',
                  minLength: {
                    value: 10,
                    message: '*10자리 이상 비밀번호를 사용하세요.',
                  },
                  maxLength: {
                    value: 20,
                    message: '*20자리 이하 비밀번호를 사용하세요.',
                  },
                })}
                onChange={onChangePassword}
              />
              {errors.password && (
                <span className={styles.error_msg}>
                  {errors.password.message}
                </span>
              )}
            </article>
            <article className={styles.signup_input_box}>
              <label htmlFor="ckPassword">비밀번호 확인</label>
              <input
                type="password"
                className={styles.signup_input}
                placeholder="비밀번호 확인"
                aria-invalid={
                  isSubmitted
                    ? errors.ckPassword
                      ? 'true'
                      : 'false'
                    : undefined
                }
                {...register('ckPassword', {
                  required: '*비밀번호를 확인해주세요.',
                  pattern: {
                    value: new RegExp(`${password}`, 'g'),
                    message: '*비밀번호가 일치하지 않습니다.',
                  },
                })}
              />
              {errors.ckPassword && (
                <span className={styles.error_msg}>
                  {errors.ckPassword.message}
                </span>
              )}
            </article>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.signup_submit_btn}
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
