import React, { useState } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getProjectsQuery = gql`
  {
    projects {
      id
      title
    }
  }
`;

function AddTask(props) {
  const [inputs, setInputs] = useState({
    title: "",
    weight: 1,
    description: "",
    projectId: "",
  });

  const handleChange = (e) => {
    const newInputs = { ...inputs };
    if (e.target.name === "weight") newInputs[e.target.name] = parseInt(e.target.value);
    else newInputs[e.target.name] = e.target.value;
    setInputs(newInputs);
  };

  const displayProjects = () => {
    const { data } = props;

    if (data.loading) {
      return <option>Loading projects...</option>;
    } else {
      return data.projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.title}
        </option>
      ));
    }
  };

  return (
    <form className="task" id="add-task">
      {/* Your form fields */}
      <div className="field">
        <label>Project:</label>
        <select
          name="projectId"
          onChange={handleChange}
          value={inputs.projectId}
          required
        >
          <option value="" selected disabled>
            Select project
          </option>
          {displayProjects()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default graphql(getProjectsQuery)(AddTask);