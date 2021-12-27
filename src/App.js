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
  background-color: rgb(41,50,65);
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
  @media (max-width: 430px) {
    font-size: 18px;
  }
`

const Logo = styled.img`
  width: 45px;
  height: 45px;
  margin: 15px;
  margin-left: 20px;
  @media (max-width: 430px) {
    width: 34px;
    height: 34px;
    margin-left: 10px;
    margin-right: 10px;
  }
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
  @media (max-width: 574px) {
    font-size: 15px;
  }
  @media (max-width: 504px) {
    font-size: 14px;
  }
`

const MovieListContainer = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 justify-content: space-evenly;
 padding: 30px;
`

const MainCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  margin-top: 130px;

`

const Placeholder = styled.img`
  width: 60px;
  height: 60px;
  opacity: 80%;
  margin-bottom: 10px;
  @media (max-width: 641px) {
    width: 50px;
    height: 50px;
  }
`

const Message = styled.div`
  font-size: 40px;
  font-weight: 500;
  color: grey;
  word-spacing: 4px;
  @media (max-width: 641px) {
    font-size: 27px;
  }
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
      {movieList?.length ? movieList.map((movie, index)=><MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>):(<><MainCenter>
          <Placeholder src="/logo.png" /> 
          <Message>Search something</Message>
        </MainCenter>
      </>) 
      }
    </MovieListContainer>
  </Container>
  );
}

export default App;
