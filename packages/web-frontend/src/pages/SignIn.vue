<template>
  <div class="container">
    <div class="row justify-content-center my-5 mx-1">
      <div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Log in</h5>
            <form @submit.prevent="login">
              <api-provided-form
                form-name="login"
                :data="data"
                @change="onFormChange"
              />
              <button type="submit" class="btn btn-primary">Log in</button>
            </form>
            <small class="d-block text-center">or</small>
            <br />
            <a
              href="https://discord.com/api/oauth2/authorize?client_id=844498223334031400&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord&response_type=code&scope=identify%20email"
              class="d-block btn btn-secondary discord-login w-100"
              title="Sorry, not available yet. We are working on it :)"
            >
              <icon name="discord" type="b" /> Login with <b>Discord</b>
            </a>
          </div>
        </div>
        <ul class="mt-2">
          <li>
            Need an account?
            <router-link :to="{ name: 'register' }">Sign up</router-link>
          </li>
          <li>
            Forgot you password?
            <router-link :to="{ name: 'resetPassword' }">
              Request a new one
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import Icon from '../components/Icon.vue';
import { useForm } from '../compositions';
import api from '../modules/api';
import { setDocumentTitle } from '../utils';

export default defineComponent({
  name: 'SignInPage',
  components: { ApiProvidedForm, Icon },
  setup(props, { emit }) {
    return {
      ...useForm(emit),
    };
  },
  beforeRouteEnter() {
    setDocumentTitle('Sign in');
  },
  methods: {
    async login() {
      const { username, password } = this.data;
      let { redirect, paramsStr, queryStr } = this.$route.query;

      if (!redirect || redirect === 'login') {
        redirect = 'home';
      }

      const params = JSON.parse(paramsStr || null);
      const query = JSON.parse(queryStr || null);

      if (await api.login(username, password)) {
        await this.$router.replace({ name: redirect, params, query } as any);
      }
    },

    async discordLogin() {},
  },
});
</script>

<style scoped lang="scss">
@import '../assets/styles/variables';

.discord-login {
  background-color: $discord;
}
</style>
