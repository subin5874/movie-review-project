import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import MovieReview from './pages/MovieReview';
import MovieSearch from './pages/MovieSearch';
import MovieDetail from './pages/MovieDetail';
import WriteReview from './pages/WriteReview';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ReviewDetail from './pages/ReviewDetail';
import Mypage from './pages/Mypage';
import useCheckAccessToken from './services/authService';

function App() {
  //AccessToken, RefreshToken 검증 테스트 코드
  useCheckAccessToken();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/movieReview" exact element={<MovieReview />} />
          <Route path="/movieSearch" exact element={<MovieSearch />} />
          <Route path="/movieDetail/:movieNo" exact element={<MovieDetail />} />
          <Route path="/writeReview" exact element={<WriteReview />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route
            path="/reviewDetail/:boardNo"
            exact
            element={<ReviewDetail />}
          />
          <Route path="/mypage" exact element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
