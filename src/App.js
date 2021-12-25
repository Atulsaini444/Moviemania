import styled from 'styled-components';
import React,{useState} from 'react';
import "./App.css";
import axios from 'axios';
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';

export const API_KEY = "eaa7d671"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  color: white;
  align-items: center;
  padding: 5px;
  box-shadow: 0 3px 6px 0 #555;
  justify-content: space-between;
  height: 70px;
`

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 23px;
  color: rgb(0,175,178);
`

const Logo = styled.img`
  width: 45px;
  height: 45px;
  margin: 15px;
  margin-left: 20px;
`

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  width: 35%;
  margin-left: 20px;
  border-radius: 6px;
  align-items: center;
  margin-right: 20px;
  height: 40px;
  
`

const SearchIcon = styled.img`
  width: 18px;
  height: 18px;
`

const SearchInput = styled.input`
  width: 89%;
  height: 34px;
  font-size: 18px;
  font-weight: 500;
  margin-left: 9px;
  outline: none;
  border: none;
`

const MovieListContainer = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 justify-content: space-evenly;
 padding: 30px;
`

const Placeholder = styled.img`
  width: 60px;
  height: 60px;
  margin: 150px;
  opacity: 60%;
`

function App() {
  const[searchQuery, updateSearchQuery] = useState();
  const[timeoutId, updateTimeoutId] = useState();
  const[movieList, updateMovieList] = useState();
  const[selectedMovie, onMovieSelect] = useState();

  const fetchData = async(searchString) => {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`)
    console.log(response);
    updateMovieList(response.data.Search)
  }

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value),1000);
    updateTimeoutId(timeout);
  }
  
  return (
  <Container>
    <Header>
      <AppName>
        <Logo src='/logo.png'/>
        Moviemania
        </AppName>
      <SearchBox>
        <SearchIcon src='/search.png'/>
        <SearchInput placeholder = 'Search Moviemania' value={searchQuery} onChange={onTextChange}/>
      </SearchBox>
    </Header>
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
    <MovieListContainer>
      {movieList?.length ? movieList.map((movie, index)=><MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>):(<Placeholder src="/logo.png" />)
      }
    </MovieListContainer>
  </Container>
  );
}

export default App;
