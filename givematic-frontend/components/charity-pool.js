import {useState} from 'react'
import { useContractWrite } from 'wagmi'
import { givematicABI } from '../abis/givematic.js'

function CharityPool({ name, totalDonations, expenses, description }) {
  const [expanded, setExpanded] = useState(false)

  const { donateData, isErrorDonate, isLoadingDonate, write } = useContractWrite(
    {
      addressOrName: '0x9dD4c1315F81883BaC4b83F0506c8f15a2fdA5d1',
      contractInterface: givematicABI,
    },
    'changeOwner',
    {
      args: ['0x2521a0D08328064142aa7B5dce02687582ED9634']
    }
  )

  const calcOverheadPercent = (expenses) => {
    const overhead = expenses.reduce((sum, e) => {
      if (e.overhead) {
        return e.share + sum
      }
      return sum
    }, 0)
    const total = expenses.reduce((sum, e) => {
      return e.share + sum
    }, 0)
    return (overhead / total * 100).toFixed(0)
  }

  const calcCausePercent = (expenses) => {
    const cause = expenses.reduce((sum, e) => {
      if (!e.overhead) {
        return e.share + sum
      }
      return sum
    }, 0)
    const total = expenses.reduce((sum, e) => {
      return e.share + sum
    }, 0)
    console.log('total', total)
    return (cause / total * 100).toFixed(0)
  }

  const totalShares = (expenses) => {
    return expenses.reduce((sum, e) => {
      return sum + e.share
    }, 0)
  }

  return (

    <div className="border p-6  mt-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <h4>Total Donations: {totalDonations} MATIC</h4>
          <div className="flex">
            <div className="mr-6">% to cause: <span className="text-green-700">{calcCausePercent(expenses)}%</span></div>
            <div>% to overhead: <span className="text-red-700">{calcOverheadPercent(expenses)}%</span></div>
          </div>
        </div>
        <div>
          <input className="p-2" type="number" min="0" placeholder="Donate MATIC"/>
          <button onClick={() => write()} className="dark:bg-gray-800 px-4 py-2 dark:bg-gray-800 rounded text-white ml-4">Donate</button>
        </div>
        <div className="cursor-pointer text-2xl" onClick={() => setExpanded(!expanded)}>
          {
            expanded ?
            "<"
            :
            ">"
          }
          
        </div>
      </div>
      {
      expanded ?
      <div className="mt-4 border-t py-2">
        <h3 className="text-md font-medium">Description</h3>
        {description}
        <table className="table-auto w-full mx-auto my-4">
        <thead>
          <tr className="flex justify-between">
            <th>Category</th>
            <th>Address</th>
            <th>Share</th>
          </tr>
        </thead>
       <tbody>
        {
            expenses.map((e, i) => {
              return (
                <tr key={e.guid} className="flex justify-between">
                  <td><div>{e.category}</div></td>
                  <td><div>{e.address}</div></td>
                  <td>
                    <div>
                      {
                        e.overhead ?
                        <span className="text-red-700">{(e.share/totalShares(expenses)*100).toFixed(0)}%</span>
                        :
                        <span>{(e.share/totalShares(expenses)*100).toFixed(0)}%</span>
                      }
                      
                    </div>
                  </td>
                </tr>
              )
            })
          }
       </tbody>
      </table>
      </div>
      :
      null
    }
    </div>
  )
}

export default CharityPool
