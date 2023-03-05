<script setup lang="ts">
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import {useToaster} from '../compositions/useToaster';
import {isSessionExpired as isSessionExpiredAction, killSession} from '../store/actions/session.actions';
import {state, Theme} from '../store/store';
import {Session, User} from '../types';
import Icon from './Icon.vue';
import SessionState from "SessionState";

const router = useRouter();
const toaster = useToaster();

const session = computed<SessionState | null>(() => state.session);
const username = computed<string>(() => session.value?.username || '');
const isAdmin = computed<boolean>(() => session.value?.role === 'admin' || false);
const theme = computed<Theme>(() => state.theme);
const isSessionExpired = computed<boolean>(() => isSessionExpiredAction());
const vUsername = computed<string>(() => {
  if (username.value.length <= 10) {
    return username.value
  } else {
    return `${username.value.substring(0, 7)}...`;
  }
});

const logout = async () => {
  await killSession();
  await router.push({name: 'signIn'});
  await toaster.success('Logout successful');
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-blue sticky-top">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand mr-2 logo">
        <img src="/logo.png" alt="logo"/>
      </router-link>
      <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li
              class="mx-2 nav-item"
              :class="{
              active:
                $route.path.startsWith('/download') ||
                $route.path.startsWith('/loader'),
            }"
          >
            <router-link :to="{ name: 'download' }" class="nav-link">
              <Icon name="bolt" class="mx-1"/>
              Mod loader
            </router-link>
          </li>
          <li
              class="mx-2 nav-item"
              :class="{ active: $route.path.startsWith('/mods') }"
          >
            <router-link :to="{ name: 'mods' }" class="nav-link">
              <Icon name="plug" class="mx-1"/>
              Mods
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="mx-1 nav-item">
            <a
                class="nav-link"
                href="/discord"
                data-toggle="tooltip"
                title=""
                target="_blank"
                data-original-title="Discord server"
            >
              <Icon type="b" name="discord" class="mx-2"/>
              <span class="d-inline d-lg-none">Discord server</span>
            </a>
          </li>
          <li class="mx-1 nav-item">
            <a
                class="nav-link"
                href="/docs"
                target="_blank"
                data-toggle="tooltip"
                title=""
                data-original-title="Documentation"
            >
              <Icon name="book" class="mx-2"/>
              <span class="d-inline d-lg-none">Documentation</span>
            </a>
          </li>
          <li class="mx-1 nav-item">
            <a
                class="nav-link donate-button"
                href="#"
                data-toggle="tooltip"
                title=""
                data-original-title="Donate"
            >
              <Icon name="donate" class="mx-2"/>
              <span class="d-inline d-lg-none">Support us</span>
            </a>
          </li>
          <li v-if="isSessionExpired" class="nav-item">
            <router-link
                :to="{ name: 'signIn', query: { redirect: $route.name } }"
                class="nav-link"
                :class="{ active: $route.path.startsWith('/signin') }"
            >
              <Icon name="sign-in-alt"/>
              Login
            </router-link>
          </li>
          <template v-else>
            <li class="nav-item dropdown mx-1">
              <a
                  class="nav-link d-lg-flex justify-content-between align-items-center"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  id="navbarDropdownMenuLink"
                  :title="username"
              >
                <Icon name="user" class="mx-2"/>
                {{ vUsername }}
                <icon name="caret-down" class="float-right ml-md-1"/>
              </a>
              <div
                  class="dropdown-menu mb-2"
                  aria-labelledby="navbarDropdownMenuLink"
              >
                <router-link
                    :to="{ name: 'user', params: { username } }"
                    class="dropdown-item"
                >
                  <i class="fas fa-user-circle mr-1"></i>
                  {{ username }} profile
                </router-link>
                <router-link :to="{ name: 'account' }" class="dropdown-item">
                  <i class="fas fa-cog mr-1"></i> Account settings
                </router-link>
                <button class="dropdown-item" @click="logout">
                  <i class="fas fa-sign-out-alt mr-1"></i> Sign out
                </button>
              </div>
            </li>
            <li class="mx-1 nav-item dropdown active">
              <a
                  class="nav-link"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                  id="navbarAddDropdown"
              >
                <span class="d-none d-lg-inline">
                  <i
                      class="fas fa-plus-circle ml-3"
                      style="transform: scale(2)"
                  ></i>
                </span>
                <span class="d-inline d-lg-none">
                  <i class="fas fa-plus mx-2"></i>
                  Add
                  <icon name="caret-down" class="float-right"/>
                </span>
              </a>
              <div
                  class="dropdown-menu dropdown-menu-right mb-2"
                  aria-labelledby="navbarAddDropdown"
              >
                <router-link :to="{ name: 'addMod' }" class="dropdown-item">
                  <i class="fas fa-plug mr-1" style="width: 20px"></i>
                  Add a mod
                </router-link>
                <template v-if="isAdmin">
                  <hr class="mt-2 mb-1"/>
                  <small class="text-muted ml-4">ADMIN TOOLS</small>
                  <router-link
                      :to="{ name: 'addLoaderVersion' }"
                      class="dropdown-item"
                  >
                    <i class="fas fa-bolt mr-1" style="width: 20px"></i>
                    Add a loader version
                  </router-link>
                  <router-link
                      :to="{ name: 'addLauncherVersion' }"
                      class="dropdown-item"
                  >
                    <i class="fas fa-desktop mr-1" style="width: 20px"></i>
                    Add a launcher version
                  </router-link>
                  <router-link
                      :to="{ name: 'addRaftVersion' }"
                      class="dropdown-item"
                  >
                    <i class="fas fa-anchor mr-1" style="width: 20px"></i>
                    Add a Raft version
                  </router-link>
                </template>
              </div>
            </li>
            <li v-if="isAdmin" class="mx-1 nav-item dropdown">
              <a
                  class="nav-link"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  id="navbarAdminDropdown"
              >
                <span class="d-none d-lg-inline">
                  <i class="fas fa-cogs ml-3"></i>
                </span>
                <span class="d-inline d-lg-none">
                  <i class="fas fa-cogs mx-2"></i> Admin options
                </span>
              </a>
              <div
                  class="dropdown-menu dropdown-menu-right mb-2"
                  aria-labelledby="navbarAdminDropdown"
              >
                <router-link
                    :to="{ name: 'launcherVersionManagement' }"
                    class="dropdown-item"
                >
                  <i class="fas fa-desktop mr-1" style="width: 20px"></i>
                  Launcher version management
                </router-link>
                <router-link
                    :to="{ name: 'loaderVersionManagement' }"
                    class="dropdown-item"
                >
                  <i class="fas fa-bolt mr-1" style="width: 20px"></i>
                  Loader version management
                </router-link>
                <router-link
                    :to="{ name: 'raftVersionManagement' }"
                    class="dropdown-item"
                >
                  <i class="fas fa-anchor mr-1" style="width: 20px"></i>
                  Raft version management
                </router-link>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
  <the-donation-modal/>
</template>

<style scoped lang="scss">
@import '../assets/styles/variables';

.navbar {
  transition: background-color $dark-mode-transition-duration $dark-mode-transition-type;

  .nav-link {
    transition: color 0.25s ease-in-out;
  }
}
</style>