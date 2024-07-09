import React from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

function Login() {
  const onLogin = () => {
    console.log('로그인');
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        <Link to="/" className={styles.logo_box}>
          <img
            src="/assets/images/main-logo.png"
            alt="로그인"
            className={styles.logo_image}
          />
        </Link>
        <div className={styles.login_box}>
          <form onSubmit={onLogin} className={styles.login_form}>
            <article className={styles.login_input_box}>
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                placeholder="아이디를 입력하세요"
                className={styles.login_input}
              />
            </article>
            <article className={styles.login_input_box}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className={styles.login_input}
              />
            </article>
            <button type="submit" className={styles.login_submit_btn}>
              로그인
            </button>
          </form>
        </div>
        <div className={styles.go_signup_box}>
          <span>아직 회원이 아니신가요?</span>
          <Link to="/signup" className={styles.go_signup_btn}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
