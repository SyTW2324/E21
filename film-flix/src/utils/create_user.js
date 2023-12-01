import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation addUser(
        $username: String!
        $name: String!
        $passwordHash: String!
        $email: String!
        $gender: String!
        $favoriteMovies: [FilmInput]!
        $favoriteSeries: [SeriesInput]!
    ) {
        addUser(
            username: $username
            name: $name
            passwordHash: $passwordHash
            email: $email
            gender: $gender
            favoriteMovies: $favoriteMovies
            favoriteSeries: $favoriteSeries
        ) {
            email
        }
    }
`;