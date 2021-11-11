<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="home__head d-flex flex-column">
    <Navbar />
    <div class="home__head_desc flex-grow-1 d-flex align-items-end mb-4">
      <div class="custom-container">
        <div class="row">
          <div class="col-12 col-lg-4 offset-lg-8">
            <h1>Voodollz</h1>
            <p class="mb-3">
              A collection of 3D generated characters knitted to perfection and
              coming alive on the Ethereum blockchain.
            </p>
            <div class="home__head_mint text-center">
              <div class="d-flex align-items-center">
                <router-link
                  class="home__head_mint_btn ff-risque me-2"
                  :to="{ name: 'mint' }"
                  >Go Mint!</router-link
                >
                <a
                  class="home__head_opensea"
                  href="https://opensea.io/collection/voodollz"
                  target="_blank"
                >
                  <img src="/opensea.svg" />
                </a>
              </div>
              <p class="mt-2">During pre-sale...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home__head {
  background: radial-gradient(
    circle,
    rgba(211, 227, 214, 1) 0%,
    rgba(182, 202, 196, 1) 100%
  );
  position: relative;
  overflow: hidden;

  @include media-breakpoint-up(lg) {
    padding-top: 8rem;
    min-height: 90vh;
  }

  @include media-breakpoint-down(lg) {
    padding: 2rem 0 57rem;
  }

  &_opensea {
    img {
      max-height: 6rem;
    }
  }

  > * {
    position: relative;
    z-index: 100;
  }

  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/home/head.png') no-repeat 10rem 100% / contain;
    z-index: 1;

    @media screen and (max-width: 1699px) {
      background-position: -10rem 100%;
    }

    @include media-breakpoint-down(xl) {
      background-position: -30rem 100%;
    }

    @include media-breakpoint-down(lg) {
      background: url('/home/head-m.png') no-repeat center bottom / contain;
    }
  }

  &_desc {
    color: #4d1e37;
    position: relative;

    @media screen and (min-width: 2000px) {
      top: -10rem;
      right: -18rem;
    }
  }

  &_mint {
    max-width: 32rem;

    &_btn {
      padding: 1.6rem 5rem;
      background-color: #000;
      border-radius: 1.4rem;
      font-size: 3.6rem;
      white-space: nowrap;
      color: #fff;
      text-decoration: none;

      &:hover {
        color: #fff;
        background-color: #111;
      }
    }
  }
}
</style>
