<template>
  <footer class="home__footer">
    <div class="custom-container">
      <div
        class="
          d-lg-flex
          mb-2 mb-lg-0
          justify-content-between
          align-items-center
        "
      >
        <div class="ff-risque mb-1 d-flex align-items-center">
          <img src="/logo.png" class="me-1" />
          Voodollz
        </div>
        <ul class="home__footer_nav">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <a href="#">Terms & Conditions</a>
          </li>
          <li>
            <a href="#">Smart contract</a>
          </li>
        </ul>
      </div>
      <div class="d-lg-flex justify-content-between align-items-center">
        <p class="mb-1 mb-lg-0 text-muted">
          A collection of 3D generated characters coming alive on the Ethereum
          blockchain.
        </p>
        <ul class="home__footer_nav d-flex">
          <li class="me-2">
            <a href="https://twitter.com/Voodollz_" target="_blank"
              ><i class="bi bi-twitter"></i
            ></a>
          </li>
          <li>
            <a href="https://discord.gg/4txfTDg4z7" target="_blank"
              ><i class="bi bi-discord"></i
            ></a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.home__footer {
  padding: 8rem 0;

  @include media-breakpoint-down(lg) {
    padding: 4rem 0;
  }

  &_nav {
    list-style: none;
    margin-bottom: 0;
    padding: 0;

    @include media-breakpoint-up(lg) {
      display: flex;
      justify-content: flex-end;
    }

    li {
      margin-right: 3rem;

      @include media-breakpoint-down(lg) {
        margin-right: 1.5rem;
      }
    }
  }

  a {
    color: rgba(255, 255, 255, 0.66);
    text-decoration: none;

    &.active {
      color: #fff;
    }

    &:hover {
      color: #fff;
    }
  }
}
</style>
