const dynamodb = require('../connectors/dynamodb')

const createUser = async (Item) => {
  console.log(`creating user ${Item}`)
  return new Promise(async (res, rej) => {
    try {
      await dynamodb.docClient.put({
        TableName: "Users", Item: {
          ...Item,
          organization: null,
          description: null,
          profileImage: null
        }
      }).promise()
      const user = await getUser({stakeAddress: Item.stakeAddress})
      res(user)
    } catch (e) {
      console.log('error adding item', e)
      rej('error creating user')
    }
  })
}

const updateUserProfile = async (stakeAddress, profile) => {
  return new Promise(async (res, rej) => {
    console.log(`updating stake address ${stakeAddress}`)
    try {
      const updateArgs = {
        TableName: "Users",
        Key: {
          stakeAddress: stakeAddress
        },
        UpdateExpression: "set username=:u, organization=:o, description=:d, profileImage=:i",
        ExpressionAttributeValues: {
          ":u": profile.username,
          ":o": profile.organization,
          ":d": profile.description,
          ":i": profile.profileImage
        }
      }
      console.log('updating user args ', updateArgs)
      await dynamodb.docClient.update(updateArgs).promise()
      const user = await getUser(stakeAddress)
      console.log('updated user ', JSON.stringify(user, null, 2))
      res(user)
    } catch (e) {
      console.log('error updating item', e)
      rej('error updating user')
    }
  })
}

const getUser = async (stakeAddress) => {
  return new Promise(async (res, rej) => {
    console.log('getting user ', stakeAddress)
    try {
      const user = await dynamodb.docClient.get({TableName: "Users", Key: {stakeAddress}}).promise()
      console.log('got user ', user.Item)
      res(user.Item)
    } catch (e) {
      console.log('error getting user', e)
      rej('user does not exist')
    }

  })
}

const getUsers = async () => {
  var params = {
    TableName: "Users",
    ProjectionExpression: "stakeAddress, username, password, description, profileImage"
  };
  const users = []
  
  console.log("Scanning Users table.");
  let data
  try {
    do {
      data = await dynamodb.docClient.scan(params).promise()
      console.log('got user data ', data)
      users.push(...data.Items)
      console.log('users are ', users, data.ScannedCount, data.Count)
    }
    while (data.ScannedCount !== users.length)
  } catch (e) {
    console.log(`error getting users ${e.message}`)
    return []
  }
  console.log('Finished scanning Users')
  return users
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUserProfile
}