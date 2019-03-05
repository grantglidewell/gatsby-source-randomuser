# gatsby-source-randomuser

This source plugin makes [randomuser.me](https://randomuser.me) data available via GraphQL queries in Gatsby

## Installation

```
# Install the plugin
yarn add gatsby-source-randomuser
```

in `gatsby-config.js`

```
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-randomuser',
      options: {
        // options
      }
    }
  ]
};
```

## Configuration options

[Randomuser.me options](https://randomuser.me/documentation#howto) can be used with this plugin

example configuration:

```
options: {
  results: 25,
  seed: "foobar",
  inc: "name,email",
  nat: "fr",
  gender: "female",
  password: "upper,1-8",
}
```

## Query random users

```
{
  allRandomUser {
    edges {
      node {
        id
        name {
          title
          first
          last
        }
        email
      }
    }
  }
}
```
