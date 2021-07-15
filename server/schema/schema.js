
const express = require('express')
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()






const zombies = [
	{ id: 1, zombieLocation: 'Hospital',zombieName:'Kevin'  },
	{ id: 2, zombieLocation: 'Hospital',zombieName:'John'  },
	{ id: 3, zombieLocation: 'Hospital', zombieName:'Ryan' },
	{ id: 4, zombieLocation: 'School',zombieName:'Mark' },
	{ id: 5, zombieLocation: 'School', zombieName:'Jane' },
	{ id: 6, zombieLocation: 'School',zombieName:'Joshua'},
	{ id: 7, zombieLocation: 'Warehouse',zombieName:'Christine'  },
	{ id: 8, zombieLocation: 'Warehouse',zombieName:'Sarah' }
]


const ZombieType = new GraphQLObjectType({
  name: 'Zombies',
  description: 'This represents a number of quarantine zombies',
  fields:{
    id: { type: GraphQLNonNull(GraphQLInt) },
    zombieLocation: { type: GraphQLNonNull(GraphQLString) },
    zombieName: { type: GraphQLNonNull(GraphQLString) },
  }
})



const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    zombies: {
      type: ZombieType,
      description: 'A Single Zombie Location',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => zombies.find(zombies => zombies.id === args.id)
    },

    zombies: {
      type: new GraphQLList(ZombieType),
      description: 'List of All Zombie Location',
      resolve: () => zombies
    },



  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addZombie: {
      type: ZombieType,
      description: 'Add a Zombie',
      args: {
        zombieLocation: { type: GraphQLNonNull(GraphQLString) },
        zombieName: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const zmb = { id: zombies.length + 1,zombieLocation:args.zombieLocation, zombieName: args.name,  }
        zombies.push(zmb)
        return zombies
      }
    },

    updateZombie: {
      type: ZombieType,
      description: 'Update Zombie Location',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        zombieLocation: { type: GraphQLNonNull(GraphQLString) },
        //zombieName: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const objIndex = zombies.findIndex((obj => obj.id == args.id));

        //const zmb = { id:args.id ,zombieLocation:args.zombieLocation, zombieName: args.name,  }
       zombies[objIndex].zombieLocation = args.zombieLocation
        
       // zombies.push(zmb)

       
          return {
            id: args.id,
            zombieLocation:args.zombieLocation
            // no author value
          }
        

      },
   
  }
 
  })
})

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})
