import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { tpdaLiquidationPairABI } from '$lib/abis/tpdaLiquidationPair'; 

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

export async function getWethInputOutput(liquidationPairAddress: `0x${string}`, amountOut: bigint) {
  try {
    const amountIn = await client.readContract({
      address: liquidationPairAddress,
      abi: tpdaLiquidationPairABI,
      functionName: 'computeExactAmountIn',
      args: [amountOut],
    });
    return { amountIn, amountOut };
  } catch (error) {
    console.error('Error fetching liquidation data:', error);
    throw error;
  }
}
