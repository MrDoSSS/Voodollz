<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue'
import { useMint } from '@/composables/mint'
import { useStore } from '@/store'
import { setMetamaskProvider, setWalletLinkProvider } from '@/ethereum'
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'

const { inc, dec, amount, price, mint, status, loading, reset } = useMint()
const { contract, wallet } = useStore()
const countdown = ref<{ hours: string; minutes: string; seconds: string }>()
const timer = ref<{ hours: string; minutes: string; seconds: string }>()

const connectMetamask = () => {
  setMetamaskProvider()
  connect()
}

const connectCoinbase = () => {
  setWalletLinkProvider()
  connect()
}

const connect = async () => {
  try {
    loading.value = true
    await contract.init()
    wallet.init()
    await wallet.connect()
  } finally {
    loading.value = false
  }
}

const calculateCountdown = () => {
  const countdownDate = dayjs(Date.UTC(2021, 11, 1, 20, 0, 0))
  const hours = Math.floor(countdownDate.diff(dayjs(), 'h', true))
  const minutes = Math.floor(
    countdownDate.diff(dayjs(), 'm', true) - hours * 60
  )
  const seconds = Math.ceil(
    countdownDate.diff(dayjs(), 's') - minutes * 60 - hours * 3600
  )

  countdown.value = {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }

  if ((hours <= 0 && minutes <= 0 && seconds <= 0) || hours < 0) {
    clearInterval(countdownInterval)
    countdown.value = undefined
  }
}

const calculateTimer = () => {
  const timerDate = dayjs(Date.UTC(2021, 11, 2, 2, 0, 0))
  const hours = Math.floor(timerDate.diff(dayjs(), 'h', true))
  const minutes = Math.floor(timerDate.diff(dayjs(), 'm', true) - hours * 60)
  const seconds = Math.ceil(
    timerDate.diff(dayjs(), 's') - minutes * 60 - hours * 3600
  )

  timer.value = {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }

  if (minutes <= 0 && seconds <= 0) {
    clearInterval(timerInterval)
    timer.value = undefined
  }
}

let countdownInterval: NodeJS.Timeout
let timerInterval: NodeJS.Timeout

onMounted(() => {
  countdownInterval = setInterval(calculateCountdown, 1000)
  timerInterval = setInterval(calculateTimer, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }

  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

calculateCountdown()
calculateTimer()
</script>
<template>
  <div class="mint d-flex flex-column">
    <Navbar />
    <div class="flex-grow-1 d-flex align-items-center">
      <div class="custom-container">
        <div class="mint__buy">
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
              <div class="mint__buy_desc h-100" :class="{ loading }">
                <div class="spinner-border" v-if="loading"></div>
                <div
                  class="d-flex flex-column justify-content-center h-100"
                  v-if="countdown"
                >
                  <h1 class="mb-1 mb-md-2 text-center text-md-start">
                    Coming soon
                  </h1>
                  <div class="row">
                    <div class="col-4">
                      <div
                        class="
                          mint__buy_control_countdown
                          d-flex
                          align-items-center
                          justify-content-center
                        "
                      >
                        {{ countdown?.hours }}
                      </div>
                    </div>
                    <div class="col-4">
                      <div
                        class="
                          mint__buy_control_countdown
                          d-flex
                          align-items-center
                          justify-content-center
                        "
                      >
                        {{ countdown?.minutes }}
                      </div>
                    </div>
                    <div class="col-4">
                      <div
                        class="
                          mint__buy_control_countdown
                          d-flex
                          align-items-center
                          justify-content-center
                        "
                      >
                        {{ countdown?.seconds }}
                      </div>
                    </div>
                  </div>
                </div>
                <template v-else>
                  <template v-if="timer">
                    <div class="mint__buy_control_timer ff-risque">
                      <span>Time for mint</span>
                      <div>
                        {{ timer?.hours }}:{{ timer?.minutes }}:{{
                          timer?.seconds
                        }}
                      </div>
                    </div>
                  </template>
                  <template
                    v-if="
                      !contract.state.initialized || !wallet.state.connected
                    "
                  >
                    <h1 class="mb-0">Connect</h1>
                    <p class="mb-3">Choice your wallet:</p>
                    <div class="mint__connect d-flex flex-column">
                      <div class="d-flex mb-2 align-items-center">
                        <img src="/metamask.png" />
                        <button
                          class="mint__connect_btn ms-1 flex-grow-1"
                          @click="connectMetamask"
                        >
                          Metamask
                        </button>
                      </div>
                      <div class="d-flex align-items-center">
                        <img src="/coinbase.png" />
                        <button
                          class="mint__connect_btn ms-1 flex-grow-1"
                          @click="connectCoinbase"
                        >
                          Coinbase
                        </button>
                      </div>
                    </div>
                  </template>

                  <template v-else-if="status === 'init'">
                    <h1 class="mb-1">
                      {{ contract.state.presaled ? 'Pre-sale' : 'Sale' }}
                    </h1>
                    <p class="mb-0">
                      Maximum tokens per wallet:
                      {{ contract.state.presaled ? 6 : 5 }}
                    </p>
                    <p class="mb-2">Maximum tokens per transaction: 3</p>
                    <template v-if="!contract.state.active">
                      <h2 class="mb-0">Switch to your eth mainnet</h2>
                      <p class="ff-risque">or reload page</p>
                    </template>
                    <template
                      v-else-if="
                        wallet.state.connected || wallet.state.metaMaskDetected
                      "
                    >
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
                  </template>
                  <template v-else-if="status === 'error'">
                    <h1>O-oops!</h1>
                    <p class="mb-2">
                      Something going wrong! Please, try again.
                    </p>
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
                    <p class="mb-2">
                      Exceeds maximum Voodollz tokens at address
                    </p>
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
    padding-bottom: 4rem;
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
      border-top-left-radius: 7rem;
      border-top-right-radius: 7rem;

      @include media-breakpoint-up(md) {
        border-top-right-radius: 0;
        border-bottom-left-radius: 7rem;
      }
    }

    &_desc {
      padding: 5rem 8rem;
      position: relative;

      @include media-breakpoint-down(lg) {
        padding: 4rem 2rem;
      }

      @include media-breakpoint-down(md) {
        padding: 2rem 2rem 4rem;
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
      &_metamask,
      &_countdown {
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

      &_countdown {
        min-width: unset;
        width: 100%;
        padding: 0.5rem 0;
      }

      &_timer {
        position: absolute;
        bottom: -7rem;
        right: -3rem;
        padding: 2rem 5rem;
        border-radius: 5rem;
        background-color: #000;
        color: #fff;

        @include media-breakpoint-down(md) {
          right: 1rem;
          padding: 1rem 3rem;
          bottom: -5rem;
        }

        div {
          font-size: 5rem;
          font-weight: bold;
          line-height: 1;
          width: 18rem;

          @include media-breakpoint-down(md) {
            font-size: 3rem;
            width: 12rem;
          }
        }
      }
    }
  }

  &__connect {
    max-width: 28rem;
    &_btn {
      font-size: 2.4rem;
      background-color: #000;
      padding: 1.2rem 5rem;
      border-radius: 1.4rem;
      color: #fff;
      line-height: 1;
      min-width: 9.7rem;
      text-align: center;
      border: none;
      font-family: 'Risque', cursive;
    }
  }
}
</style>
