import { ConnectButton } from '@rainbow-me/rainbowkit';

function Navbar() {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800 flex justify-between">
      <span className="text-3xl text-white">GIVEMATIC</span>
      <ConnectButton />
    </nav>
  )
}

export default Navbar