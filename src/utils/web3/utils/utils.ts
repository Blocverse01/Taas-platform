import { formatEther, isAddress, parseEther, parseUnits, formatUnits } from "viem"

interface Web3Utils {
  parseEther: (value: string) => bigint
  formatEther: (value: bigint, unit?: "wei" | "gwei") => string
  isAddress: (value: string) => boolean
  parseUnits: (value: string, decimals: number) => bigint
  formatUnits: (value: bigint, decimals: number) => string
}

const utils: Web3Utils = {
  parseEther: (value) => parseEther(value),
  formatEther: (value, unit) => formatEther(value, unit),
  isAddress: (value) => isAddress(value),
  parseUnits: (value, decimals) => parseUnits(value, decimals),
  formatUnits: (value, decimals) => formatUnits(value, decimals),
}

export { utils }