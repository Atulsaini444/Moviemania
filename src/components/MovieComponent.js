import React from 'react';
import styled from 'styled-components';

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 10px 0 #aaa;
  width: 225px;
  padding: 10px;
  margin-bottom: 25px;
  cursor: pointer;
  @media (max-width: 510px) {
    width: 285px;
    height: 380px;
  }
`

const CoverImage = styled.img`
  height: 202px;
  object-fit: cover;
  @media (max-width: 511px) {
    height: 280px;
  }
`

const MovieName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`

const MovieInfo = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: black;
  text-transform: capitalize;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`

function MovieComponent(props) {
  const{Title, Year, imdbID, Type, Poster} = props.movie;
  return (
    <MovieContainer onClick = {() => props.onMovieSelect(imdbID)}>
      <CoverImage src={Poster}/>
      <MovieName>{Title} </MovieName>
      <InfoColumn>
        <MovieInfo>Year: {Year}</MovieInfo>
        <MovieInfo>Type: {Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  )
}

export default MovieComponent
