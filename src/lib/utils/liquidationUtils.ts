import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { tpdaLiquidationRouterABI } from '$lib/abis/tpdaLiquidationRouter'; // Correct import name
import { LIQUIDATION_ROUTER } from '$lib/constants';


const client = createPublicClient({
    chain: {
      ...mainnet,
      id: 8453, // Base chain ID
      rpcUrls: {
        public: { http: [import.meta.env.VITE_ALCHEMY_API_URL_BASE || 'https://fallback-rpc-url.com'] },
        default: { http: [import.meta.env.VITE_ALCHEMY_API_URL_BASE || 'https://fallback-rpc-url.com'] },
      },
    },
    transport: http(),
  });

// Example function to get WETH In/Out values from a liquidation pair
export async function getWethInputOutput(liquidationPairAddress: `0x${string}`, amountOut: bigint) {
  try {
    const data = await client.readContract({
      address: liquidationPairAddress,
      abi: tpdaLiquidationRouterABI, // Correct ABI name
      functionName: 'quoteExactInputSingle', // Adjust based on ABI
      args: [
        {
          tokenIn: '0x4200000000000000000000000000000000000006', // WETH address on Base chain
          tokenOut: liquidationPairAddress, // Vault token address
          amountIn: amountOut, // Amount of WETH in
          fee: 3000, // Default fee for Uniswap pools, adjust if needed
          sqrtPriceLimitX96: 0n,
        },
      ],
    });

    return data; // Should return the WETH and token values
  } catch (error) {
    console.error('Error fetching liquidation data:', error);
    throw error;
  }
}