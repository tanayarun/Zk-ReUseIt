import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      external: [
        '@ethersproject/contracts',
        '@ethersproject/bignumber',
        '@ethersproject/abstract-signer',
        '@ethersproject/wallet',
        '@ethersproject/constants',
        '@ethersproject/providers',
        '@ethersproject/wordlists',
        '@ethersproject/logger',
        '@ethersproject/abi',
        '@ethersproject/address',
        '@ethersproject/base64',
        '@ethersproject/basex',
        '@ethersproject/bytes',
        '@ethersproject/hash',
        '@ethersproject/hdnode',
        '@ethersproject/json-wallets',
        '@ethersproject/keccak256',
        '@ethersproject/solidity',
        '@ethersproject/random',
        '@ethersproject/properties',
        '@ethersproject/rlp',
        '@ethersproject/signing-key',
        '@ethersproject/strings',
        '@ethersproject/transactions',
        '@ethersproject/units',
        '@ethersproject/web'
      ]
    }
  },
})
