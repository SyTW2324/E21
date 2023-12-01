import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $passwordHash: String!) {
        login(
            email: $email,
            passwordHash: $passwordHash)
        {
            value
        }
    }
`;