import axios from 'axios';
import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { API_KEY } from '../App';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;  
  border-bottom: 1px solid lightgray;
`

const CoverImage = styled.img`
  height: 270px;
  /* width: 270px; */
  object-fit: cover;
  margin-left: 40px;
  margin-right: 30px;
`
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`

const MovieName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: black;
  overflow: hidden;
  margin-bottom: 14px;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`

const MovieInfo = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: black;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`

const Close = styled.span`
  font-size: 25px;
  font-weight: 600;
  color: black;
  /* background: lightgray;  */
  height: fit-content;
  padding: 8px;
  cursor: pointer;
  opacity: 0.8;
`;

function MovieInfoComponent(props) {
  const[movieInfo,setMovieInfo] = useState();
  const {selectedMovie} = props;
  useEffect(()=>{
    axios
    .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
    .then((response)=> setMovieInfo(response.data));
  },[selectedMovie]);
    
  return (
    <Container>
      {movieInfo?<>
        <CoverImage src={movieInfo?.Poster}/>
        <InfoColumn>
        <MovieName>{movieInfo?.Type}: {movieInfo?.Title}</MovieName>
        <MovieInfo>IMDB Rating: <span>{movieInfo?.imdbRating}</span></MovieInfo>
        <MovieInfo>Language: <span>{movieInfo?.Language}</span></MovieInfo>
        <MovieInfo>Rated: <span>{movieInfo?.Rated}</span></MovieInfo>
        <MovieInfo>Release: <span>{movieInfo?.Release}</span></MovieInfo>
        <MovieInfo>Runtime: <span>{movieInfo?.Runtime}</span></MovieInfo>
        <MovieInfo>Genre: <span>{movieInfo?.Genre}</span></MovieInfo>
        <MovieInfo>Director: <span>{movieInfo?.Director}</span></MovieInfo>
        <MovieInfo>Actors: <span>{movieInfo?.Actors}</span></MovieInfo>
        <MovieInfo>Plot: <span>{movieInfo?.Plot}</span></MovieInfo>
        </InfoColumn>
        <Close onClick={() => props.onMovieSelect()}>X</Close>
      </>:"Loading..."}
      
    </Container>
  )
}

export default MovieInfoComponent
