import React, { useState } from "react";
import { graphql } from "react-apollo";
import * as compose from 'lodash.flowright';
import { getProjectsQuery, addTaskMutation } from "../queries/queries";

function AddTask(props) {
  const [inputs, setInputs] = useState({
    title: "",
    weight: 1,
    description: "",
    projectId: "",
  });

  const handleChange = (e) => {
    const newInputs = { ...inputs };
    newInputs[e.target.name] = e.target.name === "weight" ? parseInt(e.target.value, 10) : e.target.value;
    setInputs(newInputs);
  };

  const displayProjects = () => {
    const data = props.getProjectsQuery;

    if (data.loading) return <option disabled>Loading projects...</option>;

    return data.projects.map((project) => (
      <option key={project.id} value={project.id}>
        {project.title}
      </option>
    ));
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.addTaskMutation({
      variables: {
        title: inputs.title,
        weight: inputs.weight,
        description: inputs.description,
        projectId: inputs.projectId,
      },
      refetchQueries: [{ query: getProjectsQuery }],
    });
  };

  return (
    <form className="task" id="add-task" onSubmit={submitForm}>
      <div className="field">
        <label>Project:</label>
        <select
          name="projectId"
          value={inputs.projectId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select project</option>
          {displayProjects()}
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
}

export default compose(
  graphql(getProjectsQuery, { name: "getProjectsQuery" }),
  graphql(addTaskMutation, { name: "addTaskMutation" })
)(AddTask);