import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CharityPool from '../components/charity-pool'
import { ethers } from "ethers";
import {useState, useEffect} from 'react'
import { useContractRead, useContractWrite, useProvider } from 'wagmi'
import { givematicABI } from '../abis/givematic.js'
import { paymentSplitter } from '../abis/paymentSplitter'
import Link from 'next/link'
import {graphql} from 'graphql'

export default function Home() {
  const provider = useProvider()
  const [pools, setPools] = useState([])
  const { data, isError, isLoading } = useContractRead(
    {
      addressOrName: '0xf50b1A751fdEbfB89Cd79e3969f30CF3C3F4c4Be',
      contractInterface: givematicABI,
    },
    'getPaymentSplitters',
  )

  useEffect(() => {
    async function test() {
      console.log(data)
      if (data) {
        data.forEach(d => {
          console.log(d)
          let c = new ethers.Contract(d, paymentSplitter, provider)
          c.name().then(name => {
            console.log(name)
            c.category().then(category => {
              console.log(category)
              let pools = Object.assign([], pools)
              pools.push({name: name, category: category})
              setPools(pools)
            })
          })
          
        })
      }
      // console.log(data)
      // if(data) {
      //   data.forEach(d => {
      //     let c = new ethers.Contract(d, paymentSplitter, provider)
      //     console.log('CONTRACT', c)
      //   })
      // }
      // // Notice we pass in "Hello World" as the parameter to the constructor
      // let contract = await factory.deploy("Hello World");
    }
    test()
  }, [data])

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold my-4">Categories</h1>
        <div className="flex flex-wrap gap-8 basis-1/3 justify-center">
          <Link href='/category/animals'>
            <a className="w-1/4 bg-neutral-200 p-8 text-center rounded border cursor-pointer">
              Animals
            </a>
          </Link>
          <Link href="/category/arts">
            <a className="w-1/4 bg-neutral-200 p-8 text-center rounded border cursor-pointer">
              Arts & Culture
            </a>
          </Link>
          <Link href="/category/community">
            <a className="w-1/4 bg-neutral-200 p-8 text-center rounded border cursor-pointer">
              Community
            </a>
          </Link>
          <Link href="/category/education">
            <a className="w-1/4 bg-neutral-200 p-8 text-center rounded border cursor-pointer">
              Education
            </a>
          </Link>
          <Link href="/category/environmental">
            <a className="w-1/4 bg-neutral-200 p-8 text-center rounded border cursor-pointer">
              Environmental
            </a>
          </Link>
          <Link href="/category/health">
            <a className="w-1/4 bg-neutral-200 p-8 text-center rounded border cursor-pointer">
              Health
            </a>
          </Link>
          <Link href="/category/religious">
            <a className="w-1/4 bg-neutral-200 p-8 text-center rounded border cursor-pointer">
              Religious
            </a>
          </Link>
          <Link href="/category/social">
            <a className="w-1/4 bg-neutral-200 p-8 text-center rounded border cursor-pointer">
              Social Services
            </a>
          </Link>
          <Link href="/category/development">
            <a className="w-1/4 bg-neutral-200 p-8 text-center rounded border cursor-pointer">
              Development
            </a>
          </Link>
        </div>
      </div>
      <h1 className="text-3xl font-bold my-4">Charity Pools</h1>
      {
        pools.map(p => {
          return (
            <CharityPool name={p.name} totalDonations="3000" expenses={[{category: 'Category #1', address: '0x1', share: 100, overhead: true}, {category: 'Category #2', address: '0x2', share: 90, overhead: false}]} description="Help fight hunger"/>
          )
        })
      }
      <CharityPool name="Hunger Fighter Pool" totalDonations="4000" expenses={[{category: 'Category #1', address: '0x1', share: 100, overhead: true}, {category: 'Category #2', address: '0x2', share: 90, overhead: false}]} description="Help fight hunger"/>
      <CharityPool name="Clean Earth Pool" totalDonations="2000" expenses={[{category: 'Category #2', address: '0x2', share: 20, overhead: false}]} description="Help clean up the earth"/>
    </>
  )
}
