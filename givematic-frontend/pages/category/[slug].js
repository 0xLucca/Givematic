import { useRouter } from 'next/router'
import CharityPool from '../../components/charity-pool'
import { useContractRead, useProvider } from 'wagmi'
import { givematicABI } from '../../abis/givematic.js'
import {useEffect, useState} from 'react'
import {ethers} from 'ethers'
import { paymentSplitter } from '../../abis/paymentSplitter'

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

function Category() {
  const provider = useProvider()
  const router = useRouter()
  const { slug } = router.query
  const [contracts, setContracts] = useState([])

  // const { data, isError, isLoading } = useContractRead(
  //   {
  //     addressOrName: '0xf50b1A751fdEbfB89Cd79e3969f30CF3C3F4c4Be',
  //     contractInterface: givematicABI,
  //   },
  //   'getPaymentSplitters',
  // )

  useEffect(() => {
    // async function test() {
    //   console.log('data', data)
    //   if (data) {
    //     data.forEach(d => {
    //       console.log(d)
    //       let c = new ethers.Contract(d, paymentSplitter, provider)
    //       try {
    //         c.category().then(cat => {
    //           console.log('category', cat)
    //           if(cat?.toLowerCase() == slug?.toLowerCase()) {
    //             let cs = Object.assign([], contracts)
    //             c.name().then(n => {
    //               let _contracts = Object.assign([], contracts)
    //               _contracts.push({name: n, address: c.address})
    //               setContracts(_contracts)
    //             })
    //           }
    //         })
    //       } catch(err) {
    //         console.log(err)
    //       }
    //     })
    //   }
    // }
    // test()

    const client = new ApolloClient({
      uri: "https://thegraph.com/hosted-service/subgraph/0xlucca/givematic",
      cache: new InMemoryCache(),
    })

    client
  .query({
    query: gql(splitterQuery),
  })
  .then((data) => console.log('Subgraph data: ', data))
  .catch((err) => {
    console.log('Error fetching data: ', err)
  })
   
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold my-4">{slug} Charity Pools</h1>
      {
        contracts.map(c => {
          return (
            <CharityPool key={c.name} name={c.name} totalDonations="4000" expenses={[{category: 'Category #1', address: '0x1', share: 100, overhead: true}, {category: 'Category #2', address: '0x2', share: 90, overhead: false}]} description="Help fight hunger" />
          )
        })
      }
    </div>
  )

}

export default Category
