<template>
  <div class="home__community" id="community">
    <div class="custom-container">
      <div class="row">
        <div
          class="
            col-12 col-lg-5
            offset-lg-7
            d-flex d-lg-block
            flex-column
            align-items-center
          "
        >
          <h2>Join the community</h2>
          <p class="mb-2 mb-lg-4 text-center text-lg-start">
            As our project is based on the people, you don’t want to be left
            from the most closed-knit community there is. We are growing fast,
            join us for news and constant updates to be ahead of the heard!
          </p>
          <a href="https://discord.gg/4txfTDg4z7" target="_blank"
            >Join our Discord</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home__community {
  background: radial-gradient(
    circle,
    rgba(211, 227, 214, 1) 0%,
    rgba(182, 202, 196, 1) 100%
  );
  padding: 10rem 0;
  color: #4d1e37;
  position: relative;

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
    background: url('/home/community.png') no-repeat 5% 100% / contain;

    @media screen and (min-width: 2000px) {
      background-position: 30rem 100%;
    }

    @include media-breakpoint-down(xl) {
      background-position: -30rem 100%;
    }

    @include media-breakpoint-down(lg) {
      content: none;
    }
  }

  @include media-breakpoint-down(lg) {
    padding: 7rem 0;
  }

  a {
    background: #4c1e37;
    padding: 1.4rem 4rem;
    color: #fff;
    text-decoration: none;

    &:hover {
      color: #fff;
      background: lighten(#4c1e37, 5);
    }
  }
}
</style>
