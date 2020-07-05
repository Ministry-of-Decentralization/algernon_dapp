const userStore = require('../../userStore/index')
const fileStore = require('../../fileStorage/index')

const resolvers = {
  Query: {
    health: () => 'OK',
    getUser: async (_, { stakeAddress} ) => await userStore.getUser(stakeAddress),
    getUsers: async () => await userStore.getUsers(),
    getFile: async (_, {hash}) => {
      const file = await fileStore.getFile(hash)
      return file
    }
  },
  Mutation: {
    addFile: async (_, {file}) => {
      try {
        console.log(`adding file ${file}`)
        const newFile = await fileStore.addFile(file)
        return newFile
      } catch (e) {
        console.log(`error addFile : ${e.message}`)
      }
    },
    createUser: async (_, {input}) => await userStore.createUser(input),
    updateUserProfile: async (_, {update}) =>  {
        const profile = await userStore.updateUserProfile(update.stakeAddress, update)
        console.log('updated user profile!!! ', JSON.stringify(profile, null, 2))
        return profile

    }
  }
};

module.exports = resolvers