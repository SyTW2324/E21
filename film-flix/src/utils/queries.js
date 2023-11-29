import { gql } from "@apollo/client";

export const FIND_MY_DATA = gql`
    query findMyData {
        findMyData {
            username
            _id
            email
            favoriteMovies {
                title
            }
            favoriteSeries {
                title
            }
        }
    }
`;




