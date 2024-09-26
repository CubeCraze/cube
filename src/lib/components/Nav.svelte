<script>
  import { userAddress } from '$lib/stores';
  import WalletConnectionModal from './WalletConnectionModal.svelte';
  import NavWalletDisplay from './NavWalletDisplay.svelte';
  import NavPageLink from './NavPageLink.svelte';
</script>

<div class="top-nav-wrapper">
  <div class="top-nav-content">
    <a href="/game" data-sveltekit-preload-data="off">Game</a>
    <img src="/pooltogether.svg" alt="PoolTogether" class="desktop-only" />
    <img src="/pooltogether-small.svg" alt="PoolTogether" class="mobile-only" />
    <WalletConnectionModal>
      <NavWalletDisplay slot="button-content" />
    </WalletConnectionModal>
  </div>
</div>

{#if !!$userAddress}
  <nav>
    <NavPageLink href="/deposit" name="Deposit" viewBox="0 0 25 25">
      <!-- SVG content -->
    </NavPageLink>
    <NavPageLink href="/withdraw" name="Withdraw" viewBox="0 0 24 25">
      <!-- SVG content -->
    </NavPageLink>
    <NavPageLink href="/prizes" name="Prizes" viewBox="0 0 24 25">
      <!-- SVG content -->
    </NavPageLink>
    <NavPageLink href="/account" name="Account" viewBox="0 0 25 25">
      <!-- SVG content -->
    </NavPageLink>
  </nav>
{/if}

<style>
div.top-nav-wrapper {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: var(--pt-bg-purple-darker);
  box-shadow: 0 0 10px 2px hsl(263, 86%, 8%);
  overflow-x: hidden;
}

div.top-nav-content {
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Main nav styles for mobile-first approach */
nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem 0;
  background-color: var(--pt-purple-600);
  border-top: 2px solid var(--pt-purple-500);
  z-index: 1;
}

/* Mobile and tablet sizes: Adjust content */
nav::after {
  position: absolute;
  right: 1rem;
  top: -66px; /* Adjust this as necessary */
}

/* For larger screens: Align content properly */
@media (min-width: 48rem) {
  nav {
    position: fixed; /* Ensure nav is fixed at the bottom */
    bottom: 0;
    width: 100%; /* Full width */
    max-width: 48rem; /* Limit width for desktop */
    height: 3.25rem;
    display: flex;
    justify-content: center;
    gap: 2.5rem;
    padding: 1rem 0;
    translate: -50%;
    left: 50%; /* Ensure it's centered */
    background-color: transparent; /* Transparent for larger screens */
    border: none; /* Remove borders on larger screens */
  }

  /* Adjust the position of the floating logo (if necessary) */
  nav::after {
    right: 2rem; /* Slightly move it in for larger screens */
    top: -70px; /* Adjust as necessary */
  }
}
</style>
