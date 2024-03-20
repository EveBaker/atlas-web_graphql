import { gql } from 'apollo-boost';

const getTaskQuery = gql`
{
    tasks {
        id
        title
    }
}
`;

const getProjectsQuery = gql`
{
    projects {
        id
        title
    }
}
`;

export {getTaskQuery, getProjectsQuery};