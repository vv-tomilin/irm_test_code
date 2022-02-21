import React, { useState } from 'react';

import { useQuery, useLazyQuery } from '@apollo/client';

import {
  QUERY_ALL_USERS,
  QUERY_ALL_MOVIES,
  GET_MOVIE_BY_NAME
} from './requests/queryes';

function DisplayData() {

  const [moviesSearch, setMoviesSearch] = useState('');

  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: moviesData } = useQuery(QUERY_ALL_MOVIES);

  const [
    fetchMovie,
    {
      data: movieSearchedData,
      error: movieError
    }
  ] = useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <h1>LOADING...</h1>
  }

  if (moviesData) {
    console.log(moviesData);
  }

  if (error) {
    console.log(error);
  }

  if (movieError) {
    console.log(movieError);
  }

  const changeMoveSearchInput = (e) => {
    setMoviesSearch(e.target.value);
  };

  const searchMovie = () => {
    fetchMovie({
      variables: {
        name: moviesSearch
      }
    });
  };

  return (
    <>
      <h1>List of Users</h1>
      <div
        style={{
          backgroundColor: "#9feecd",
          padding: "10px",
          marginBottom: "10px",
        }}>
        {
          data && data.users.map((user) => (
            <div
              style={{
                backgroundColor: "#edeeba",
                marginTop: "10px",
                borderRadius: "10px",
                textAlign: "center",
                with: "85%"
              }}
              key={user.id}>
              <h1>{user.name}</h1>
              <p>Username: {user.username}</p>
              <p>Age: {user.age}</p>
              <p>Nationality: {user.nationality}</p>
            </div>
          ))
        }
      </div>

      <div
        style={{
          backgroundColor: "#e7ff61",
          padding: "10px",
          marginBottom: "10px",
        }}>
        {
          moviesData && moviesData.movies.map((movie) => (
            <div
              style={{
                backgroundColor: "#edeeba",
                marginTop: "10px",
                borderRadius: "10px",
                textAlign: "center",
                with: "85%"
              }}
              key={movie.id}>
              <h1>{movie.name}</h1>
              <p>Publication: {movie.yearOfPublication}</p>
            </div>
          ))
        }
      </div>

      <div
        style={{
          backgroundColor: "#61b3ff",
          padding: "10px",
          marginBottom: "10px",
        }}>
        <input
          style={{ display: "block" }}
          type="text"
          placeholder="Interstellar"
          onChange={changeMoveSearchInput} />
        <button onClick={searchMovie}>Fetch Data</button>
        <div>
          {
            movieSearchedData &&
            <div>
              <h1>Movie name: {movieSearchedData.movie.name}</h1>
              <p>Year of publication: {movieSearchedData.movie.yearOfPublication}</p>
            </div>
          }
          {
            movieError && <h2>There was an error fetching the data</h2>
          }
        </div>
      </div>
    </>
  )
}

export default DisplayData;