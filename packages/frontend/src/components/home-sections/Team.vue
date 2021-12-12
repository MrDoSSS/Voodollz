<script></script>
<template>
  <div class="home__team" id="team">
    <div class="custom-container">
      <div class="row gx-lg-4 justify-content-around mb-3">
        <div class="col-12 col-lg-4 mb-3 mb-lg-0">
          <div class="home__team_item">
            <h2>Berl</h2>
            <div
              class="
                d-flex
                flex-column flex-lg-row
                mb-1
                justify-content-lg-between
                align-items-lg-center
              "
            >
              <p class="text-muted">Founder, Marketing Genius</p>
              <div class="d-flex">
                <a href="#" target="_blank"><i class="bi bi-discord"></i></a>
              </div>
            </div>
            <div class="home__team_item_avatar">
              <img src="/home/team-1.png" alt="" />
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 mb-3 mb-lg-0">
          <div class="home__team_item">
            <h2>Egor Digitax</h2>
            <div
              class="
                d-flex
                flex-column flex-lg-row
                mb-1
                justify-content-lg-between
                align-items-lg-center
              "
            >
              <p class="text-muted">Artist, Occultist, Preacher</p>
              <div class="d-flex">
                <a
                  href="https://instagram.com/egordigitax "
                  target="_blank"
                  class="me-1"
                  ><i class="bi bi-instagram"></i
                ></a>
                <a href="#" target="_blank"><i class="bi bi-discord"></i></a>
              </div>
            </div>
            <div class="home__team_item_avatar">
              <img src="/home/team-2.png" alt="" />
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 mb-3 mb-lg-0">
          <div class="home__team_item">
            <h2>Dr. Martin</h2>
            <div
              class="
                d-flex
                flex-column flex-lg-row
                mb-1
                justify-content-lg-between
                align-items-lg-center
              "
            >
              <p class="text-muted">Idea Generator, Real Doctor</p>
              <div class="d-flex">
                <a href="#" target="_blank"><i class="bi bi-discord"></i></a>
              </div>
            </div>
            <div class="home__team_item_avatar">
              <img src="/home/team-3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="row gx-lg-4 justify-content-center mb-3">
        <div class="col-12 col-lg-4 mb-3 mb-lg-0">
          <div class="home__team_item">
            <h2>Raptablinkz</h2>
            <div
              class="
                d-flex
                flex-column flex-lg-row
                mb-1
                justify-content-lg-between
                align-items-lg-center
              "
            >
              <p class="text-muted">Abstract Thinker, The Lazy Creative Guy</p>
              <div class="d-flex">
                <a href="#" target="_blank"><i class="bi bi-discord"></i></a>
              </div>
            </div>
            <div class="home__team_item_avatar">
              <img src="/home/team-4.png" alt="" />
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="home__team_item">
            <h2>Mr. Doss</h2>
            <div
              class="
                d-flex
                flex-column flex-lg-row
                mb-1
                justify-content-lg-between
                align-items-lg-center
              "
            >
              <p class="text-muted">Development, Transactions, Beer</p>
              <div class="d-flex">
                <a href="#" target="_blank"><i class="bi bi-discord"></i></a>
              </div>
            </div>
            <div class="home__team_item_avatar">
              <img src="/home/team-5.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home__team {
  margin-bottom: 13rem;
  &_item {
    p {
      font-size: 1.6rem;

      @include media-breakpoint-up(lg) {
        margin-bottom: 0;
      }
    }

    h2 {
      margin-bottom: 0;

      @include media-breakpoint-down(lg) {
        margin-bottom: 1rem;
      }
    }

    a {
      color: #fff;
      font-size: 2.2rem;

      &:hover {
        color: #fff;
      }
    }

    &_avatar {
      background: #bec3d5;

      img {
        width: 100%;
      }
    }
  }
}
</style>
