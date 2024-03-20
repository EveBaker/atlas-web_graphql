import React from 'react';
import { graphql } from 'react-apollo';
import TaskDetails from './TaskDetails';
import { getTasksQuery } from '../queries/queries';

const getTasksQuery =gql`
{
  tasks {
    id
    title
  }
}
`;

function TaskList(props) {
  const [state, setState] = useState({
    selected: null,
  });


  function displayTasks() {
    const { data } = props;

    if (data.loading) {
      return <div>Loading tasks...</div>;
    } else {
      return data.tasks.map(task => (
        <li key={task.id} onClick={() => setState({ selected: task.id })}>
          {task.title}
        </li>
      ));
    }
  }

  return (
    <div>
      <ul id="task-list">{displayTasks()}</ul>
      <TaskDetails taskId={state.selected} />
    </div>
  );
}

export default graphql(getTasksQuery)(TaskList);