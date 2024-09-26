<script lang="ts">
  import { onMount } from "svelte";
  import {
    MOONWELL_USDC,
    AAVE_WETH,
    MOONWELL_AERO,
    MOONWELL_WSTETH,
    MOONWELL_CBETH,
    BEEFY_WETH_WELL,
    ANGLE_USDA
  } from "$lib/constants"; 
  import { getWethInputOutput } from "$lib/utils/liquidationUtils";
  import type { Address } from 'viem';

  // Liquidation pair info
  let liquidationPairs = [
    { name: 'moonwell usdc', decimals: 6, ...MOONWELL_USDC },
    { name: 'aave weth', decimals: 18, ...AAVE_WETH },
    { name: 'moonwell aero', decimals: 18, ...MOONWELL_AERO },
    { name: 'moonwell wsteth', decimals: 18, ...MOONWELL_WSTETH },
    { name: 'moonwell cbeth', decimals: 18, ...MOONWELL_CBETH },
    { name: 'beefy wethwell', decimals: 18, ...BEEFY_WETH_WELL },
    { name: 'angle usda', decimals: 6, ...ANGLE_USDA }
  ];

  // Define the expected result type from the function
  interface QuoteResult {
    amountIn: bigint;
    amountOut: bigint;
  }

  // Store WETH input and vault token output values for each pair
  let vaultInfo = liquidationPairs.map(pair => ({
    inValueWeth: 0n, // WETH input value
    outValueToken: 0n, // Vault token output value
    name: pair.name,
    liquidationPair: pair.liquidationPair as Address,
    decimals: pair.decimals // Token decimals
  }));

  // Fetch the WETH In/Out values using real contract data
  const fetchLiquidationData = async () => {
    for (let i = 0; i < vaultInfo.length; i++) {
      try {
        const amountOut = BigInt(1 * 10 ** vaultInfo[i].decimals); // 1 token out with correct decimals
        const result: QuoteResult = await getWethInputOutput(vaultInfo[i].liquidationPair, amountOut);
        vaultInfo[i].inValueWeth = result.amountIn;
        vaultInfo[i].outValueToken = result.amountOut;
      } catch (err) {
        console.error(`Error fetching data for ${vaultInfo[i].name}:`, err);
      }
    }
  };

  onMount(() => {
    fetchLiquidationData();
    const interval = setInterval(fetchLiquidationData, 60_000); // Refresh every 60 seconds
    return () => clearInterval(interval); // Clean up on component unmount
  });
</script>

<style>
  .fireworks-container {
    display: flex;
    flex-direction: column; 
    width: 100%;
    position: relative;
    margin-top: 30px;
  }

  .prizepool {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }

  .prizepool-box {
    width: calc(7 * 70px); /* 7 times the width of the liquidation pair boxes */
    height: 70px;
    background-color: grey;
    color: azure;
    border-radius: 50px;
    margin-bottom: 50px;
  }

  /* Liquidation Pair Boxes */
  .pairs-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 1000px;
    margin-bottom: 50px;
  }

  .fireworks {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .box {
    width: 70px;
    height: 70px;
    border-radius: 5px;
    margin-bottom: 75px;
  }

  .info {
    text-align: center;
    margin-bottom: 5px;
    color: white;
    font-size: 14px;
  }

  .name {
    font-size: 20px;
    color: white;
    text-align: center;
    margin-top: 5px;
  }

  /* Cannon styling */
  .cannon {
    width: 50px;
    height: 100px;
    background-color: black;
    position: relative;
    border-radius: 40%;
  }

  .cannon-top {
    width: 20px;
    height: 10px;
    position: absolute;
    top: -10px;
    left: 15px;
    border-radius: 5px;
  }

  /* Neon-like colors for cannons and boxes */
  .cannon.moonwell-usdc .cannon-top, .box.moonwell-usdc {
    background-color: #FF8C00; /* Neon Orange */
  }

  .cannon.aave-weth .cannon-top, .box.aave-weth {
    background-color: #00BFFF; /* Neon Blue */
  }

  .cannon.moonwell-aero .cannon-top, .box.moonwell-aero {
    background-color: #32CD32; /* Neon Green */
  }

  .cannon.moonwell-wsteth .cannon-top, .box.moonwell-wsteth {
    background-color: #FFFF00; /* Neon Yellow */
  }

  .cannon.moonwell-cbeth .cannon-top, .box.moonwell-cbeth {
    background-color: #800080; /* Neon Purple */
  }

  .cannon.beefy-wethwell .cannon-top, .box.beefy-wethwell {
    background-color: #FF4500; /* Neon Red */
  }

  .cannon.angle-usda .cannon-top, .box.angle-usda {
    background-color: #FF1493; /* Neon Pink */
  }
</style>

<div class="prizepool-container">
  <div class="prizepool">
    <div class="prizepool-box"></div>
  </div>

  <!-- Liquidation Pairs -->
  <div class="pairs-container">
    {#each vaultInfo as info}
      <div class="fireworks">
        <!-- In WETH and Out Token values above the box -->
        <div class="info">
          <div>WETH In: { (Number(info.inValueWeth) / 1e18).toFixed(6) } WETH</div>
          <div>Out: { (Number(info.outValueToken) / Math.pow(10, info.decimals)).toFixed(6) } {info.name.toUpperCase()}</div>
        </div>

        <!-- The colored box above the cannon -->
        <div class="box {info.name.replace(/ /g, '-')}"></div>

        <!-- Cannon below the box with a colored top matching the box -->
        <div class="cannon {info.name.replace(/ /g, '-')}">
          <div class="cannon-top"></div>
        </div>

        <!-- Vault name below the cannon -->
        <div class="name">{info.name}</div>
      </div>
    {/each}
  </div>
</div>
