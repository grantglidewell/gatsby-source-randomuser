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
    // user postcodes come back as numbers and strings
    // this causes issues with schema formation
    user.location.postcode = user.location.postcode.toString();
    return { ...user,
      id: createNodeId(`randomUser-${user.email}`),
      parent: null,
      children: [],
      internal: {
        type: `randomUser`,
        content: JSON.stringify(user),
        contentDigest: createContentDigest(user)
      }
    };
  };

  configOptions.format = 'json';
  console.log('source:randomuser.me - fetching users');
  return fetch(`https://randomuser.me/api/?${queryString.stringify(configOptions)}`).then(data => data.json()).then(json => json.results).then(users => // modify users for createNode with node IDS
  users.map(user => {
    createNode(processUser(user));
  }));
};