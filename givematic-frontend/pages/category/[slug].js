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

  const setExpenses = (c) => {
    let expenses = []
    c.payees.forEach((p, i) => {
      expenses.push({address: p.address, share: parseInt(c.shares[i])})
    })
    console.log('expense', expenses)
    return expenses
  }

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
    setContracts(data.paymentSplitters.filter(ps => ps.category.toLowerCase() === slug?.toLowerCase()))
  })
  .catch((err) => {
    console.log('Error fetching data: ', err)
  })
   
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold my-4">{slug[0].toUpperCase() + slug.substring(1)} Charity Pools</h1>
      {
        contracts.map(c => {
          return (
            <CharityPool key={c.name} name={c.name} totalDonations="4000" expenses={setExpenses(c)} />
          )
        })
      }
    </div>
  )

}

export default Category
