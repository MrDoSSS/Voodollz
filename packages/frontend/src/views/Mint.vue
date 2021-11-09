<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue'
import { useMint } from '@/composables/mint'
import { useStore } from '@/store'

const { inc, dec, amount, price, mint, status, loading, reset } = useMint()
const { contract, metamask } = useStore()
</script>
<template>
  <div class="mint d-flex flex-column">
    <Navbar />
    <div class="flex-grow-1 d-flex align-items-center">
      <div class="custom-container">
        <div class="mint__buy overflow-hidden">
          <div class="row g-0">
            <div class="col-12 col-md-5">
              <div class="mint__buy_img d-flex justify-content-center">
                <img
                  src="/mint/buy.png"
                  v-if="status === 'init'"
                  class="align-self-end"
                />
                <img
                  src="/mint/success.png"
                  v-else-if="status === 'success'"
                  class="align-self-center"
                />
                <img src="/mint/error.png" v-else class="align-self-center" />
              </div>
            </div>
            <div class="col-12 col-md-7">
              <div class="mint__buy_desc" :class="{ loading }">
                <div class="spinner-border" v-if="loading"></div>
                <template v-if="status === 'init'">
                  <h1 class="mb-1">
                    {{ contract.state.presaled ? 'Pre-sale' : 'Sale' }}
                  </h1>
                  <p class="mb-0">
                    Maximum tokens per wallet:
                    {{ contract.state.presaled ? 6 : 5 }}
                  </p>
                  <p class="mb-2">Maximum tokens per transaction: 3</p>
                  <template v-if="!contract.state.active">
                    <h2>Switch to your eth mainnet</h2>
                  </template>
                  <template v-else-if="metamask.state.metaMaskDetected">
                    <div class="mint__buy_control ff-risque d-flex mb-1">
                      <div
                        class="
                          mint__buy_control_amount
                          d-flex
                          align-items-center
                          justify-content-center
                        "
                      >
                        {{ amount }}
                      </div>
                      <div class="d-flex flex-column">
                        <button class="mint__buy_control_inc" @click="inc">
                          +
                        </button>
                        <button class="mint__buy_control_inc" @click="dec">
                          -
                        </button>
                      </div>
                      <button class="mint__buy_control_btn" @click="mint">
                        Mint
                      </button>
                    </div>
                    <p>Total: {{ price }} ETH + Gas Fee</p>
                  </template>
                  <a
                    class="mint__buy_control_metamask"
                    v-else
                    href="https://metamask.io/"
                    target="_blank"
                    >Install MetaMask</a
                  >
                </template>
                <template v-else-if="status === 'error'">
                  <h1>O-oops!</h1>
                  <p class="mb-2">Something going wrong! Please, try again.</p>
                  <button class="mint__buy_control_btn" @click="reset">
                    Back
                  </button>
                </template>
                <template v-else-if="status === 'presale-error'">
                  <h1>O-oops!</h1>
                  <p class="mb-2">
                    Mint now available only for presale members!
                  </p>
                  <button class="mint__buy_control_btn" @click="reset">
                    Back
                  </button>
                </template>
                <template v-else-if="status === 'amount-error'">
                  <h1>O-oops!</h1>
                  <p class="mb-2">Exceeds maximum Voodollz tokens at address</p>
                  <button class="mint__buy_control_btn" @click="reset">
                    Back
                  </button>
                </template>
                <template v-else-if="status === 'success'">
                  <h1>Congratz!</h1>
                  <p class="mb-2">
                    You can view your Voodoll on Opensea&nbsp;Marketplace!
                  </p>
                  <div class="d-flex">
                    <button class="mint__buy_control_btn me-2" @click="reset">
                      Back
                    </button>
                    <a
                      class="mint__opensea"
                      href="https://opensea.io/collection/voodollz"
                      target="_blank"
                    >
                      <img src="/opensea.svg" />
                    </a>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mint {
  background: radial-gradient(
    circle,
    rgba(211, 227, 214, 1) 0%,
    rgba(182, 202, 196, 1) 100%
  );
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  padding-top: 2rem;

  @include media-breakpoint-up(lg) {
    padding-top: 8rem;
  }

  > * {
    position: relative;
    z-index: 100;
  }

  @include media-breakpoint-up(md) {
    &::after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('/mint/bg.png') no-repeat 50% 100% / contain;
      z-index: 1;
    }
  }

  @include media-breakpoint-down(md) {
    padding-bottom: 2rem;
  }

  &__opensea {
    img {
      max-height: 7.7rem;
    }
  }

  &__buy {
    background-color: #fff;
    border-radius: 7rem;
    filter: drop-shadow(0px 0px 33px rgba(0, 0, 0, 0.25));
    color: #4d1e37;
    max-width: 90rem;
    margin: auto;

    @include media-breakpoint-up(md) {
      margin-top: -8rem;
    }

    h1 {
      font-size: 6.2rem;

      @include media-breakpoint-down(md) {
        font-size: 4rem;
      }
    }

    &_img {
      background-color: #000;
      height: 100%;
    }

    &_desc {
      padding: 5rem 8rem;
      position: relative;

      @include media-breakpoint-down(md) {
        padding: 2rem 2rem 3rem;
      }

      @include media-breakpoint-down(lg) {
        padding: 4rem 2rem;
      }

      .spinner-border {
        width: 5rem;
        height: 5rem;
        position: absolute;
        top: calc(50% - 2.5rem);
        left: calc(50% - 2.5rem);
      }

      &.loading {
        &:before {
          position: absolute;
          content: '';
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.5);
        }
      }
    }

    &_control {
      > *:not(:last-child) {
        margin-right: 0.5rem;
      }

      &_amount,
      &_btn,
      &_metamask {
        font-size: 6.2rem;
        background-color: #000;
        padding: 0.2rem 3rem;
        border-radius: 1.4rem;
        color: #fff;
        line-height: 1;
        min-width: 9.7rem;
        text-align: center;

        @include media-breakpoint-down(md) {
          font-size: 4rem;
        }
      }

      &_inc {
        font-size: 4.8rem;
        background-color: #000;
        padding: 1rem 0.8rem;
        border-radius: 1.4rem;
        color: #fff;
        line-height: 0;
        border: none;
        flex-grow: 1;
        &:hover {
          background-color: #111;
        }

        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }
      }

      &_btn {
        font-size: 4.8rem;
        border: none;
        min-height: 7.7rem;
        font-family: 'Risque', cursive;

        &:hover {
          background-color: #111;
        }
      }

      &_metamask {
        text-decoration: none;
        white-space: nowrap;
        font-size: 3.5rem;
        font-family: 'Risque', cursive;
        display: inline-flex;
        min-height: 7rem;
        align-items: center;

        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
