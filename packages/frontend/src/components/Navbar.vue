<template>
  <div class="top-navbar custom-container-fluid mb-3 mb-lg-0">
    <div class="d-flex justify-content-between align-items-center">
      <div class="top-navbar_logo">
        <router-link class="ff-risque d-flex align-items-center" to="/">
          <img src="/logo.png" class="me-1" />
          Voodollz
        </router-link>
      </div>
      <nav class="top-navbar_nav d-flex align-items-center">
        <ul class="top-navbar_nav_social me-md-3">
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
        <ul class="top-navbar_nav_anchors d-none d-md-flex">
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
</template>

<style lang="scss">
.top-navbar {
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
}
</style>
