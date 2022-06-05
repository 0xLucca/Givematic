import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from 'react'
import CreateCharityModal from '../components/createCharityModal'
import { givematicABI } from '../abis/givematic.js'
import { useContractRead } from 'wagmi'
import {Link} from 'next/link'

export default function Charity() {
  const [modalOpen, setModalOpen] = useState(false)

  const closeModal = () => {
    setModalOpen(false)
  }

  // This will load in all of this user's pools
  const { pools, isError, isLoading } = useContractRead(
    {
      addressOrName: '0x9dD4c1315F81883BaC4b83F0506c8f15a2fdA5d1',
      contractInterface: givematicABI,
    },
    'getOwner',
  )

  useEffect(() => {
    console.log("Pools", pools)
  }, pools)

  return (
    <div className={styles.container}>
      <h1 className="text-3xl mt-4 font-bold">Your Charities</h1>
      <button onClick={() => setModalOpen(true)} className="mt-4 dark:bg-gray-800 px-4 py-2 dark:bg-gray-800 rounded text-white">Create Charity Pool</button>
      {
      modalOpen ?
      <CreateCharityModal closeModal={closeModal}/>
      :
      null
    }
    </div>
   
  )
}
