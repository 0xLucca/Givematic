import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useContractWrite } from 'wagmi'
import { givematicABI } from '../abis/givematic.js'

function createCharityModal({closeModal}) {
  const [expenses, setExpenses] = useState([{guid: uuidv4(), category: '', address: '', share: '', isOverhead: false}])
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Animals')

  const { donateData, isErrorDonate, isLoadingDonate, write } = useContractWrite(
    {
      addressOrName: '0xf50b1A751fdEbfB89Cd79e3969f30CF3C3F4c4Be',
      contractInterface: givematicABI,
    },
    'createPaymentSplitter',
    {
      args: [name, category, expenses.map(e => e.address), expenses.map(e => e.share), '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889']
    }
  )

  const addExpense = () => {
    let e = Object.assign([], expenses)
    e.push({guid: uuidv4(), category: '', address: '', share: '', isOverhead: false})
    setExpenses(e)
  }

  const setProperty = (i, v, p) => {
    console.log(i, v)
    let e = Object.assign([], expenses)
    e[i][p] = v
    setExpenses(e)
  }

  const create = () => {
    write()
  }

  return (
    <div className="flex flex-col items-center absolute bg-white left-1/4 top-1/4 border p-8 shadow-slate-300 w-100 rounded">
      <div className="flex flex-col mb-7">
        <label className="mb-2">Organization Name:</label>
        <input onChange={(e) => setName(e.target.value)} placeholder="Charity Name" className="border p-2 mb-4" type="text" />
        <label className="mb-2">Organization Category:</label>
        <select onChange={(e) => setCategory(e.target.value)} className="p-2">
          <option>Animals</option>
          <option>Arts & Culture</option>
          <option>Community Development</option>
          <option>Education</option>
          <option>Environmental</option>
          <option>Health</option>
          <option>Religious</option>
          <option>Social Services</option>
        </select>
      </div>
      <table className="table-auto p-8">
        <thead>
          <tr className="flex justify-between">
            <th>Category</th>
            <th>Address</th>
            <th>Share</th>
            <th>Overhead</th>
          </tr>
        </thead>
       <tbody>
        {
            expenses.map((e, i) => {
              return (
                <tr key={e.guid} className="flex justify-between">
                  <td><input placeholder="category" onChange={(e) => setProperty(i, e.target.value, 'category')} type="text" value={e.category} /></td>
                  <td><input placeholder="address" onChange={(e) => setProperty(i, e.target.value, 'address')} type="text" value={e.address} /></td>
                  <td><input placeholder="share" onChange={(e) => setProperty(i, e.target.value, 'share')} type="number" min="0" value={e.share} /></td>
                  <td><input placeholder="overhead" onChange={(e) => setProperty(i, e.target.value, 'overhead')} type="checkbox" value={e.isOverhead} /></td>
                </tr>
              )
            })
          }
       </tbody>
      </table>
      <div>
        <button className="border p-2 mt-4" onClick={() => addExpense()}>+ Expense</button>
      </div>
      <div className="flex mt-6 justify-end w-full">
        <button className="mt-4 text-white mr-4 px-4 py-2 rounded dark:bg-gray-800" onClick={() => create()}>Create</button>
        <button className="mt-4 px-4 py-2  rounded border" onClick={() => closeModal()}>Close</button>
      </div>
    </div>
  )
}

export default createCharityModal