const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList } = require('graphql');
const _ = require('lodash');

// data for projects
const projects = [
  { 
  id: '1', 
  title: 'Advanced HTML', 
  weight: 1, 
  description: 'Welcome to the Web Stack specialization...' },
  { 
    id: '2', 
    title: 'Bootstrap', 
    weight: 1, 
    description: 'Bootstrap is a free and open-source CSS framework...' }
];

// data for tasks
const tasks = [
  { 
  id: '1', 
  title: 'Create your first webpage', 
  weight: 1, 
  description: 'Create your first HTML file...', 
  projectId: '1' },
  { 
    id: '2', 
    title: 'Structure your webpage', 
    weight: 1, 
    description: 'Copy the content...', 
    projectId: '1' }
];



const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      weight: { type: GraphQLInt },
      description: { type: GraphQLString },
      project: {
        type: ProjectType, // specifys the type
        resolve(parent, args) { // parent = task
        return projects.find(project => project.id === parent.projectId);
        }
      }
    })
  });


  const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      weight: { type: GraphQLInt },
      description: { type: GraphQLString },
      tasks: {
        type: new GraphQLList(TaskType), // lists task types
        resolve(parent, args) { // parent = project
          return tasks.filter(task => task.projectId === parent.id);
        }
      }
    })
  });


  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      task: {
        type: TaskType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return _.find(tasks, { id: args.id });
        }
      },
      project: {
        type: ProjectType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return _.find(projects, { id: args.id });
        }
      },
      tasks: {
        type: new GraphQLList(TaskType),
        resolve(parent, args) {
          return tasks; // return all tasks
        }
      },
      projects: {
        type: new GraphQLList(ProjectType),
        resolve(parent, args) {
          return projects; // return all projects
        }
      }
    })
  });


  module.exports = new GraphQLSchema({
    query: RootQuery
  });
  