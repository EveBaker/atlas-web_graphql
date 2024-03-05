const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID} = require('graphql');
const _ = require('lodash');


// data for tasks
const tasks = [
  { id: '1', title: 'Create your first webpage', weight: 1, description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)' },
  { id: '2', title: 'Structure your webpage', weight: 1, description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order' }
];

// data for projects
const projects = [
  { id: '1', title: 'Advanced HTML', weight: 1, description: 'Welcome to the Web Stack specialization...' },
  { id: '2', title: 'Bootstrap', weight: 1, description: 'Bootstrap is a free and open-source CSS framework...' }
];

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      weight: { type: GraphQLInt },
      description: { type: GraphQLString }
    })
  });

  const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      weight: { type: GraphQLInt },
      description: { type: GraphQLString }
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
      }
    })
  });


  module.exports = new GraphQLSchema({
    query: RootQuery
  });
  