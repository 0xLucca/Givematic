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
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const splitterQuery = `
{
  paymentSplitters(first: 5) {
    id
    address
    name
    category
    shares
    payees {
      id
      address
    }
  }
  donations(first: 5) {
    id
    donator
    paymentSplitter {
      id
    }
    amount
  }
}
`

const query = `
{
  donations(where: {paymentSplitter: $splitterAddress}){
    id
    donator
    amount
  }
}
`

export default function Home() {
  const provider = useProvider()
  const [contracts, setContracts] = useState([])
  const { data, isError, isLoading } = useContractRead(
    {
      addressOrName: '0xf50b1A751fdEbfB89Cd79e3969f30CF3C3F4c4Be',
      contractInterface: givematicABI,
    },
    'getPaymentSplitters',
  )

  // useEffect(() => {
  //   async function test() {
  //     // console.log(data)
  //     // if (data) {
  //     //   data.forEach(d => {
  //     //     console.log(d)
  //     //     let c = new ethers.Contract(d, paymentSplitter, provider)
  //     //     c.name().then(name => {
  //     //       console.log(name)
  //     //       c.category().then(category => {
  //     //         console.log(category)
  //     //         let pools = Object.assign([], pools)
  //     //         pools.push({name: name, category: category})
  //     //         setPools(pools)
  //     //       })
  //     //     })
          
  //     //   })
  //     // }
  //     // console.log(data)
  //     // if(data) {
  //     //   data.forEach(d => {
  //     //     let c = new ethers.Contract(d, paymentSplitter, provider)
  //     //     console.log('CONTRACT', c)
  //     //   })
  //     // }
  //     // // Notice we pass in "Hello World" as the parameter to the constructor
  //     // let contract = await factory.deploy("Hello World");
  //   }
  //   test()
  // }, [data])

  useEffect(() => {
    const client = new ApolloClient({
      uri: "https://api.thegraph.com/subgraphs/id/QmXVGRAQZU2SBqqcPp1iuyGy5Y9EUEM913GAFRvuQLwmJn",
      cache: new InMemoryCache(),
    })

    client
  .query({
    query: gql(splitterQuery),
  })
  .then(({data}) => {
    console.log("SubGraph Data: ", data)
    setContracts(data.paymentSplitters)
    data.paymentSplitters.forEach(ps => {
      client.query({
        query: gql(query),
      })
    })
  })
  .catch((err) => {
    console.log('Error fetching data: ', err)
  })
   
  }, [])

  const setExpenses = (c) => {
    console.log(c)
    let expenses = []
    c.payees.forEach((p, i) => {
      expenses.push({address: p.address, share: parseInt(c.shares[i])})
    })
    console.log('expense', expenses)
    return expenses
  }

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
        contracts.map(c => {
          return (
            <CharityPool key={c.address} name={c.name} expenses={setExpenses(c)}/>
          )
        })
      }
    </>
  )
}
