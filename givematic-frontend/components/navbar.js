import { ConnectButton } from '@rainbow-me/rainbowkit';

function Navbar() {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800 flex justify-between">
      <div className="flex items-center">
        <span className="text-3xl text-white"><a href="/">GIVEMATIC</a></span>
        <span className="text-lg ml-4 text-white"><a href="/charity">Charity</a></span>
      </div>
      <ConnectButton />
    </nav>
  )
}

export default Navbar