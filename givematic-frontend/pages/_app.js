import '../styles/globals.css'
import Layout from '../components/layout'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://matic-mumbai--jsonrpc.datahub.figment.io/apikey/8e26d8eb38f954891008b1019c9a6c67`
      }),
    }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Givematic',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
