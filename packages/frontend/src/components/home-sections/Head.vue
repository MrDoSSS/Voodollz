<template>
  <div class="home__head d-flex flex-column">
    <div class="custom-container-fluid mb-3 mb-lg-0">
      <div class="d-flex justify-content-between align-items-center">
        <div class="home__head_logo">
          <router-link class="ff-risque d-flex align-items-center" to="/">
            <img src="/logo.png" class="me-1" />
            Voodollz
          </router-link>
        </div>
        <nav class="home__head_nav d-flex align-items-center">
          <ul class="home__head_nav_social me-md-3">
            <li>
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
          <ul class="home__head_nav_anchors d-none d-md-flex">
            <li>
              <a href="#roadmap">Roadmap</a>
            </li>
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#community">Community</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="home__head_desc flex-grow-1 d-flex align-items-end mb-4">
      <div class="custom-container">
        <div class="row">
          <div class="col-12 col-lg-4 offset-lg-8">
            <h1>Voodollz</h1>
            <p class="mb-2">
              A collection of 3D generated characters knitted to perfection and
              coming alive on the Ethereum blockchain.
            </p>
            <img src="/home/head-btn.png" alt="" class="d-none d-lg-inline" />
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

  > * {
    position: relative;
    z-index: 1;
  }

  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/home/head.png') no-repeat 10rem 100% / contain;

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

  &_logo {
    font-size: 2rem;
  }

  &_nav {
    &_social {
      li {
        margin-right: 1.5rem;
      }
      font-size: 2.5rem;
    }

    ul {
      list-style: none;
      display: flex;
      margin-bottom: 0;
      padding: 0;
    }

    &_anchors {
      li {
        margin-right: 2.4rem;
      }
    }
  }

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      color: #fafafa;
    }
  }

  &_desc {
    color: #4d1e37;
    position: relative;

    @media screen and (min-width: 2000px) {
      top: -10rem;
      right: -18rem;
    }

    button {
      background-color: transparent;
      border-radius: 7rem;
      padding: 1rem 4rem;
      font-size: 3.6rem;
      border: 2px solid currentColor;
      color: #4d1e37;

      @include media-breakpoint-down(lg) {
        font-size: 2.6rem;
        padding: 0.8rem 3rem;
      }
    }
  }
}
</style>
