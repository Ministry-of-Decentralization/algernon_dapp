import React, { useState, useEffect} from 'react'
import Box3 from '3box'

export const useUpdatePublic = async (openBox, field, value = 'steve') => {
  console.log(`update  profile ${field} -- ${value}`)
  const profileUpdate = await openBox.public.set(field, value)
  console.log(`updated profile ${profileUpdate}`)
  await profileUpdate.syncDone
  const update = await openBox.public.get(field)
  const all = await openBox.public.all()
  console.log(`updated profile ${update} -- ${Object.keys(all)} ${all.name}`)
}



export const useGetProfile = async (address) => {
  const profile = await Box3.getProfile(address)
  return profile
}

export const useGetVerifiedAccounts = async (address) => {
  const accounts = await Box3.useGetVerifiedAccounts(Address)
  return accounts
}

export const useOpenSpace = async (openBox, spaceName) => {
  const space = await openBox.openSpace(spaceName)
  console.log(`opened space ${space}`)
  return space
}

export const useOpenBox = async (address, provider) => {
  const box = await Box3.openBox(address, provider)
  console.log(`opened 3box`)
  await box.syncDone
  return box
}
