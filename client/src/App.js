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

function App() {
  // API호출
  /*
  const fetchMovies = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMovies([]); // 에러 발생 시 빈 배열로 초기화
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [apiEndpoint]); // apiEndpoint가 변경될 때마다 호출

  */

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
          <Route path="/reviewDetail" exact element={<ReviewDetail />} />
          {/* <Route path="/reviewDetail:boardNo" exact element={<ReviewDetail />} />
              boardNo 넘어가도록 하기*/}
          <Route path="/mypage" exact element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
