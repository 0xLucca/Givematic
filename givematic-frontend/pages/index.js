import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CharityPool from '../components/charity-pool'
import { ethers } from "ethers";
import {useState, useEffect} from 'react'
import { useAccount, useConnect, useContractRead, useContractWrite } from 'wagmi'
import { givematicABI } from '../abis/givematic.js'

export default function Home() {
  const { data: account } = useAccount()
  const { pools, isError, isLoading } = useContractRead(
    {
      addressOrName: '0x9dD4c1315F81883BaC4b83F0506c8f15a2fdA5d1',
      contractInterface: givematicABI,
    },
    'getOwner',
  )

  return (
    <>
      <h1 className="text-3xl font-bold my-4">Charity Pools</h1>
      <CharityPool name="Hunger Fighter Pool" totalDonations="4000" beneficiaries={[{address: '0x1'}]} description="Help fight hunger"/>
      <CharityPool name="Clean Earth Pool" totalDonations="2000" beneficiaries={[{address: '0x2'}]} description="Help clean up the earth"/>
    </>
  )
}
