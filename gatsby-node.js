"use strict";

const fetch = require('node-fetch');

const queryString = require('query-string');

exports.sourceNodes = ({
  actions,
  createNodeId,
  createContentDigest
}, configOptions) => {
  const {
    createNode
  } = actions;

  const processUser = user => {
    const nodeId = createNodeId(`randomUser-${user.email}`);
    const nodeContent = JSON.stringify(user);
    const nodeData = Object.assign({}, user, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `randomUser`,
        content: nodeContent,
        contentDigest: createContentDigest(user)
      }
    });
    return nodeData;
  };

  configOptions.format = 'json';
  console.log('source:randomuser.me - fetching users');
  return fetch(`https://randomuser.me/api/?${queryString.stringify(configOptions)}`).then(data => data.json()).then(json => json.results).then(users => // modify users for createNode with node IDS
  users.map(user => {
    createNode(processUser(user));
  }));
};