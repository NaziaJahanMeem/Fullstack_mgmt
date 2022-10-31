import { gql } from "@apollo/client";
const GET_USERS=gql`
    query getUsers{
        users{
            id
            name
            email
            phone
            gender
            image
        }
    }
`;
export { GET_USERS };

