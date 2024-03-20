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

const addTaskMutation = gql`
mutation($title: String!, $weight: Int!, $description: String!) {
    addTask(title: $title, weight: $weight, description: $description) {
        title
        id
    }
}
`;

export {getTaskQuery, getProjectsQuery, addTaskMutation};