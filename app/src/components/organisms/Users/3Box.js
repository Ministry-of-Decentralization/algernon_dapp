import React, { useState, useEffect} from 'react'
import Box3 from '3box'
import { fm } from '../../../utils/web3'
import Button from '../../atoms/inputs/buttons/Button'
import Text from '@material-ui/core/TextField'
import { Box } from '@material-ui/core'

const updateProfile = async (openBox, field, value = 'carl') => {
  console.log(`update  profile ${field} -- ${value}`)
  const profileUpdate = await openBox.public.set(field, value)
  console.log(`updated profile ${profileUpdate}`)
  await profileUpdate.syncDone
  const update = await openBox.public.get(field)
  const all = await openBox.public.all()
  console.log(`updated profile ${update} -- ${Object.keys(all)} ${all.name}`)

}

const NameForm = ({openBox}) => {
  const [name , setName] = useState('')
  console.log(`name is ${name}`)
  const updateName = (e, b) => {
    console.log(`update name ${e} -- ${b} -- ${e.value}`)
    setName(e.value)
  }
  return (
    <div>
      <Text value={name} onChange={updateName} />
      <Button label='Update Name' onClick={() => updateProfile(openBox, 'name', name)} />
    </div>
  )
}

export default ({address}) => {
  const [box, setBox] = useState({})
  
  const getProfile = async (address) => {
    console.log(`getting profile for address ${address}`)
    const profile = await Box3.getProfile(address)
    console.log(`profile for address ${address}\n<><> ${JSON.stringify(profile, null, 2)} <><>`)
    const verifiedAccounts = await Box3.getVerifiedAccounts(profile)
    console.log(`verified accounts\n${Object.keys(verifiedAccounts)}`)

    const spaces = await Box3.listSpaces(address)
    const space = await Box3.getSpace(address, 'algernon')

    console.log(`spaces ${spaces}\nspace${Object.keys(space)}`)

    setBox({...box, profile, spaces}) 
  }

  const openSpace = async (openBox, spaceName) => {
    const space = await openBox.openSpace(spaceName)
    await space.public.set('currentlyLearning', 'DAOs')
    console.log(`opened space ${space}`)
    return space
  }
  
  const connectTo3Box = async () => {
    const provider = fm.getProvider()
    try {
    const openBox = await Box3.openBox(address, provider)
    console.log(`opened 3box`)
    
     await openBox.syncDone
    console.log(`synceded 3box ${Object.keys(openBox)}`)
    const space = await openSpace(openBox, 'algernon')
    const profile = await openBox.public.all()
    const learning = await space.public.all()
    console.log(`all ${Object.keys(profile)} -- ${profile.name} - ${learning.currentlyLearning}`)
    setBox({...box, openBox, profile})
  } catch (e) {
    console.log(`error opening box ${e.message}`)
  }
  }

  useEffect(() => {
    address && getProfile(address)
  }, [address])
  
  console.log('3 box profile ', address,  box)
  return (
    <div>
      <h2>3Box!</h2>
      
      { box.openBox ? <NameForm openBox={box.openBox} /> : <Button label="Connect" onClick={connectTo3Box} />}

      { box.profile && box.profile.name ?
        <div>
          Name: {box.profile.name}
        </div>
        :
        null
      }
      
    </div>
  )
}