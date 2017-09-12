

import gql from 'graphql-tag';


export default gql`
    query QuerySong($id: ID!){
        song(id: $id){
            id
            title 
            
            lyrics {
                id
                likes
                content
            }
        }
    }
`;



