import { gql } from '@apollo/client';

export const GET_ZOMBIES = gql`
query {
  zombies {
    id
    zombieLocation
    zombieName
    }
  }`;

export const UPDATE_ZOMBIES = gql`
mutation UpdateZombie($id: Int!, $location: String!) {
    updateZombie(id:$id,zombieLocation:$location) {
        id
    	  zombieLocation
    }
  }
`;

