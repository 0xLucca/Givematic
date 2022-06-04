import {useState} from 'react'
import { useContractWrite } from 'wagmi'
import { givematicABI } from '../abis/givematic.js'

function CharityPool({ name, totalDonations, beneficiaries, description }) {
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

  return (
    <div className="border p-6  mt-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <h4>{totalDonations} MATIC</h4>
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
        <h3 className="text-md font-medium mt-4">Beneficiaries</h3>
        <ul>
          {
          beneficiaries.map(b => {
            return <li key={b.address}>{b.address}</li>
            })
          }
        </ul>
        <input className="p-2" type="number" min="0" placeholder="Donate MATIC"/>
        <button onClick={() => write()} className="dark:bg-gray-800 px-4 py-2 dark:bg-gray-800 rounded text-white ml-4">Donate</button>
      </div>
      :
      null
    }
    </div>
  )
}

export default CharityPool
