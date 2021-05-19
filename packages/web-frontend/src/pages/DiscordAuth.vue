<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="card d-flex justify-content-center align-items-center p-4">
          <span class="sr-only">Loading...</span>
          <icon name="discord" type="b" size="8x" class="mb-5" />
          <div class="text-center">
            <h1 class="text-loading">
              <span
                v-for="i in pleaseWait.length"
                :key="`please-wait-${i - 1}`"
                >{{ pleaseWait[i - 1] }}</span
              >
            </h1>
            <h3 class="mb-5">We are authenticating you with discord</h3>
            <h5 class="mt-5 text-danger" role="alert">
              <icon name="exclamation-triangle" />
              Please do <u>not</u> reload the page!
            </h5>
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NavigationGuardNext, RouteLocation } from 'vue-router';
import Icon from '../components/Icon.vue';
import api from '../modules/api';
import toaster from '../modules/toaster';

export default defineComponent({
  name: 'DiscordAuth',
  components: { Icon },
  setup() {
    return {
      pleaseWait: 'Please wait...',
    };
  },
  async beforeRouteEnter(
    to: RouteLocation,
    from: RouteLocation,
    next: NavigationGuardNext,
  ) {
    const { code } = to.query;

    if (!code) {
      next({ name: 'signIn' });
      toaster.error(`invalid discord code`);
    } else {
      next();
    }
  },
  async mounted() {
    const { code } = this.$route.query;

    await api.discordAuth(code);
  },
});
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';
.spinner-border {
  border-top-color: $discord;
  border-left-color: $discord;
  border-bottom-color: $discord;
  width: 10rem;
  height: 10rem;
}

.icon {
  &.fa-discord {
    color: $discord;
  }
}

.text-loading {
  $elements: 14;

  @for $i from 0 to $elements {
    span:nth-child(#{$i + 1}) {
      color: #fff;
      animation: discordLoading 1s infinite;
      animation-delay: calc(0.1s * #{$i + 1});
    }
  }
}

@keyframes discordLoading {
  0% {
    color: $discord;
  }
  50% {
    color: #fff;
  }
  100% {
    color: $discord;
  }
}
</style>
