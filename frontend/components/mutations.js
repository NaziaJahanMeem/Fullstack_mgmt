import { gql } from "@apollo/client";
 
const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $phone: String!,$gender:UserGender,$image:String!) {
    addUser(name: $name, email: $email, phone: $phone, gender:$gender,image:$image) {
      id
      name
      email
      phone
      gender
      image
    }
  }
`;
const UPDATE_USER = gql`
mutation updateUser($id:ID!, $name: String!, $email: String!, $phone: String!,$gender:UserGenderUpdate) {
  updateUser(id:$id, name: $name, email: $email, phone: $phone, gender:$gender) {
    id
    name
    email
    phone
    gender
  }
}
`;
const DELETE_USER=gql`
    mutation deleteUser($id:ID!){
        deleteUser(id:$id){
            id
            name
            email
            phone
            gender
        }
    }
`;
export { ADD_USER,DELETE_USER,UPDATE_USER };
