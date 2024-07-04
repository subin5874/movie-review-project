import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import MovieReview from './pages/MovieReview';
import MovieSearch from './pages/MovieSearch';
import MovieDetail from './pages/MovieDetail';

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
          <Route path="/movieDetailView" exact element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
