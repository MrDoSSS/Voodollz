<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const bound = ref<HTMLElement>()
const video = ref<HTMLVideoElement>()

const scrollVideo = () => {
  if (!video.value || !bound.value) return

  if (video.value.duration) {
    const distanceFromTop =
      window.scrollY + bound.value.getBoundingClientRect().top
    const rawPercentScrolled =
      (window.scrollY - distanceFromTop) /
      (bound.value.scrollHeight - window.innerHeight)
    const percentScrolled = Math.min(Math.max(rawPercentScrolled, 0), 1)

    // if (rawPercentScrolled > -0.1 && rawPercentScrolled < 1.5) {
    //   video.value.style.top = `${(rawPercentScrolled / 1.7) * 100}%`
    // }

    video.value.currentTime = video.value.duration * percentScrolled
  }
  requestAnimationFrame(scrollVideo)
}

onMounted(() => {
  requestAnimationFrame(scrollVideo)
})
</script>

<template>
  <div class="home__roadmap" id="roadmap">
    <div class="custom-container">
      <div class="row gx-lg-3 gx-xl-5">
        <div class="col-12 col-lg-7">
          <div class="home__roadmap_desc">
            <h2>The idea 💡</h2>
            <p class="mb-3 mb-lg-5">
              Voodollz bring innovation to the NFT space, we are the first ever
              project fully operated by the community. Here, people are the
              developers, every buyer decides the future. We grant all rights on
              the future utility, collaborations and any other decision to the
              community.
            </p>
            <img src="/home/roadmap-face.png" />
            <h2 class="mt-3 mt-lg-5">Roadmap</h2>
            <p>
              This is not your regular merch, game, blah blah blah project. We
              really want to be focused on what’s the most important - our
              people! This is why our roadmap is completely different from
              anything you will ever see.
            </p>
          </div>
          <div class="home__roadmap_steps">
            <div class="home__roadmap_step">
              <h2 class="solid">Voting introduction</h2>
              <p>
                After several collaborations and promotions, we will introduce
                the Voting system in our Discord. This is an idea we had in a
                long time and finally have the opportunity to make it into real
                life. People will have control over everything: every decision
                will be made by the final votes of all the discord members. (we
                will introduce voting before the mint to discuss the important
                questions of further utility for the Voodolz)
              </p>
              <div class="home__roadmap_step_number ff-rancho">01</div>
              <div class="home__roadmap_step_icon">
                <img src="/home/step-1.png" />
              </div>
            </div>
            <div class="home__roadmap_step">
              <h2>Mint preparation</h2>
              <p>
                The final preparation before the release begins. We will be
                adding new features based on the Community vote. Whitelist
                formed after several discord giveaways. Every potential buyer
                will decide on the time, date and other aspects of the drop.
              </p>
              <div class="home__roadmap_step_number ff-rancho">02</div>
              <div class="home__roadmap_step_icon">
                <img src="/home/step-2.png" />
              </div>
            </div>
            <div class="home__roadmap_step">
              <h2>Treasure hunt</h2>
              <p>
                We will introduce the one and only utility made without the
                community agreement - TREASURE HUNT. Clues and hints will be
                scattered all over Voodollz for a chance to win a secret prize.
                (its worth it)
              </p>
              <div class="home__roadmap_step_number ff-rancho">03</div>
            </div>
            <div class="home__roadmap_step">
              <h2>The start</h2>
              <p>
                Finally, mint day. After the release is complete we will form a
                closed channel to which only holders will be given access to.
              </p>
              <div class="home__roadmap_step_number ff-rancho">04</div>
              <div class="home__roadmap_step_icon">
                <img src="/home/step-4.png" />
              </div>
            </div>
            <div class="home__roadmap_step">
              <h2>Power to the people</h2>
              <p>
                Full community overturn. Now that the buyers are separated, they
                decide on the future. All of the ideas, utility etc. are voted
                by the closed channel and implemented by the team. There will be
                no information given to anyone besides our holders. Which means
                that every «official» Voodoll is now a developer of the project.
              </p>
              <div class="home__roadmap_step_number ff-rancho">05</div>
              <div class="home__roadmap_step_icon">
                <img src="/home/step-5.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-5 d-none d-lg-block">
          <div class="home__roadmap_anim" ref="bound">
            <video
              ref="video"
              src="/home/anim.mp4"
              preload=""
              muted="true"
            ></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home__roadmap {
  margin-bottom: 20rem;

  @include media-breakpoint-down(lg) {
    margin-bottom: 10rem;
  }

  &_desc {
    margin-bottom: 15rem;
    max-width: 46rem;

    @include media-breakpoint-down(lg) {
      max-width: none;
    }

    @include media-breakpoint-up(lg) {
      margin-left: 8rem;
    }

    img {
      max-width: 20rem;
    }
  }

  &_step {
    background: rgba(13, 29, 34, 0.66);
    padding: 5rem 9rem 7rem;
    position: relative;

    @include media-breakpoint-down(xl) {
      padding: 5rem 6rem 7rem;
    }

    @include media-breakpoint-down(lg) {
      padding: 6rem 3rem 4rem 5rem;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 4rem;
      z-index: 1;

      @include media-breakpoint-down(xl) {
        left: 2rem;
      }
    }

    &:first-child {
      &::before {
        top: -10rem;
        width: 0.4rem;
        height: 15rem;
        background: #d2e3d8;
      }
    }

    h2 {
      margin-bottom: 2rem;
      position: relative;
      display: flex;
      align-items: center;

      &.solid {
        &:before {
          background: url('/home/roadmap-icon-solid.png');
        }
      }

      &:before {
        content: '';
        position: absolute;
        left: -6.3rem;
        width: 2.8rem;
        height: 2.8rem;
        background: url('/home/roadmap-icon-outline.png');

        @include media-breakpoint-down(xl) {
          left: -5.3rem;
        }

        @include media-breakpoint-down(lg) {
          left: -4.3rem;
        }
      }
    }

    p {
      font-size: 1.6rem;

      @include media-breakpoint-up(lg) {
        max-width: 80%;
      }
    }

    &:not(:last-child) {
      margin-bottom: 10rem;

      @include media-breakpoint-down(xl) {
        margin-bottom: 7rem;
      }

      @include media-breakpoint-down(lg) {
        margin-bottom: 5rem;
      }

      &::after {
        background: #d2e3d8;
        width: 1px;
        height: 110%;
        top: 11rem;

        @include media-breakpoint-down(xl) {
          height: 100%;
        }

        @include media-breakpoint-down(lg) {
          height: 95%;
        }
      }
    }

    &_number {
      color: #d2e3d8;
      font-size: 12rem;
      bottom: -6rem;
      right: 4rem;
      line-height: 1;
      position: absolute;

      @include media-breakpoint-down(xl) {
        font-size: 10rem;
        bottom: -5rem;
        right: 2rem;
      }

      @include media-breakpoint-down(lg) {
        font-size: 6rem;
        bottom: -3rem;
        right: 2rem;
      }
    }

    &_icon {
      position: absolute;

      img {
        width: 100%;
      }

      @include media-breakpoint-down(xl) {
        max-width: 15rem;
        max-height: 15rem;
      }

      @include media-breakpoint-down(lg) {
        max-width: 10rem;
        max-height: 10rem;
      }
    }

    &:nth-child(1) &_icon {
      top: -9rem;
      right: 4rem;

      @include media-breakpoint-down(xl) {
        top: -7rem;
        right: 2rem;
      }

      @include media-breakpoint-down(lg) {
        top: -5rem;
        right: 2rem;
      }
    }

    &:nth-child(2) &_icon {
      bottom: -10rem;
      left: 9rem;

      @include media-breakpoint-down(xl) {
        bottom: -7rem;
        left: 3rem;
      }

      @include media-breakpoint-down(lg) {
        bottom: -5rem;
        left: 2rem;
      }
    }

    &:nth-child(4) &_icon {
      top: 2rem;
      right: -9rem;

      @include media-breakpoint-down(xl) {
        top: 1rem;
        right: -5rem;
      }

      @include media-breakpoint-down(lg) {
        top: 1rem;
        right: 0rem;
      }
    }

    &:nth-child(5) &_icon {
      bottom: -11rem;
      left: -6rem;

      @include media-breakpoint-down(xl) {
        bottom: -7rem;
        left: -3rem;
      }

      @include media-breakpoint-down(lg) {
        bottom: -5rem;
        left: 1rem;
      }
    }
  }

  &_anim {
    background: #dbfae6;
    border-radius: 30rem;
    height: 100%;
    overflow: hidden;
    position: relative;

    video {
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
