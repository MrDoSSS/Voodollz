<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper'
import 'swiper/css'

const modules = [Autoplay]
const colors = [
  '#F4E1E1',
  '#ECE1F4',
  '#F2F4E1',
  '#E1EDF4',
  '#E5F4E1',
  '#F4E1E1',
  '#ECE1F4',
  '#F2F4E1',
  '#E1EDF4',
  '#E5F4E1',
  '#F4E1E1',
  '#ECE1F4',
  '#F2F4E1',
  '#E1EDF4',
  '#E5F4E1',
]
</script>
<template>
  <div class="home__voodollz">
    <swiper
      slides-per-view="auto"
      :modules="modules"
      :space-between="60"
      :loop="true"
      :centered-slides="true"
      :centered-slides-bounds="true"
      :autoplay="{
        delay: 0,
        disableOnInteraction: false,
        waitForTransition: false,
      }"
      :speed="2000"
    >
      <component
        :is="SwiperSlide"
        v-for="i in 13"
        :key="i"
        :style="{ backgroundColor: colors[i] }"
      >
        <div
          class="home__voodollz_item"
          :style="{ backgroundImage: `url(/voodollz/${i}.png)` }"
        ></div>
      </component>
    </swiper>
  </div>
</template>

<style lang="scss">
.home__voodollz {
  margin: 15rem 0;

  @include media-breakpoint-down(lg) {
    margin: 7rem 0;
  }

  .swiper-slide {
    background: #ece1f4;
    border-radius: 22rem;

    width: 32rem;
    height: 52rem;
    overflow: hidden;

    div {
      width: 100%;
      height: 100%;
      background-position: center bottom;
      background-repeat: no-repeat;
    }
  }
}
</style>
