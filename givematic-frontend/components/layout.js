import Navbar from './navbar'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">{children}</main>
    </>
  )
}

export default Layout