import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { addProjectMutation } from "../queries/queries"; // Adjust the import path as necessary

function AddProject() {
  const [inputsProject, setInputsProject] = useState({
    title: '',
    weight: 1,
    description: ''
  });

  const [addProject, { data, loading, error }] = useMutation(addProjectMutation);

  const handleChange = (e) => {
    const newInputsProject = { ...inputsProject };
    newInputsProject[e.target.name] = e.target.name === "weight" ? parseInt(e.target.value, 10) : e.target.value;
    setInputsProject(newInputsProject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addProject({
        variables: {
          title: inputsProject.title,
          weight: inputsProject.weight,
          description: inputsProject.description,
        },
      });
      console.log("Added project", data);
    } catch (error) {
      console.error("Error adding project", error);
    }
  };

  return (
    <form className="project" id="add-project" onSubmit={handleSubmit}>
      <div className="field">
        <label>Project title:</label>
        <input type="text" name="title" onChange={handleChange} value={inputsProject.title} />
      </div>
      <div className="field">
        <label>Weight:</label>
        <input type="number" name="weight" onChange={handleChange} value={inputsProject.weight} />
      </div>
      <div className="field">
        <label>Description:</label>
        <textarea name="description" onChange={handleChange} value={inputsProject.description}></textarea>
      </div>
      <button type="submit">Add Project</button>
    </form>
  );
}

export default AddProject;