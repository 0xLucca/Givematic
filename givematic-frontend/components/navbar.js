import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link'

function Navbar() {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800 flex justify-between">
      <div className="flex items-center">
        <span className="text-3xl text-white"><Link href="/"><a>GIVEMATIC</a></Link></span>
        <span className="text-lg ml-4 text-white"><Link href="/charity"><a>Charity</a></Link></span>
      </div>
      <ConnectButton />
    </nav>
  )
}

export default Navbar