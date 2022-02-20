const _ = require('lodash');

const { UserList, MovieList } = require('../FakeData');

const resolvers = {
  Query: {

    //* USER RESOLVERS
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    //* MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name: name })
      return movie;
    }
  },

  User: {
    favoriteMovies: () => {
      return _.filter(MovieList, (movie) => {
        return (
          movie.yearOfPublication >= 2000
          &&
          movie.yearOfPublication <= 2010
        );
      });
    }
  },
};

module.exports = { resolvers };