<template>
  <div class="container">
    <section class="my-5 mx-1 with-json-forms">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Add a new mod version to "{{ mod.title }}"</h5>
          <form class="form" @submit.prevent="onSubmit" novalidate>
            <api-provided-form
              v-if="ready"
              :data="version"
              form-name="addModVersion"
              :show-errors="showErrors"
              @change="onChange"
            />
            <hr />
            <div
              class="action-row row d-flex flex-md-row flex-column align-items-sm-strech"
            >
              <button
                type="submit"
                class="btn btn-success submit-button m-2"
                :disabled="loading"
                :class="{ disabled: loading }"
              >
                <icon v-if="!loading" name="paper-plane" />
                <div
                  v-else
                  class="spinner-grow spinner-grow-sm mx-1"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
                Submit changes
              </button>
              <button
                type="button"
                class="btn btn-outline-primary m-2"
                :disabled="loading"
                :class="{ disabled: loading }"
                data-toggle="collapse"
                data-target="#preview"
                aria-expanded="false"
                aria-controls="preview"
              >
                <icon name="eye" />
                show preview
              </button>
              <button
                type="button"
                class="btn btn-outline-danger m-2"
                :class="{ disabled: loading }"
                :disabled="loading"
                @click.prevent="$router.go(-1)"
              >
                <icon name="times" />
                Discard changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <ul>
        <li>
          <router-link :to="{ name: 'mod', params: { id: mod.id } }"
            >Go back to the mod's page</router-link
          >
        </li>
      </ul>
    </section>
    <section class="collapse my-3 mx-1" id="preview">
      <mod-version-details :version="version" :preview="true" />
    </section>
  </div>
  <confirm-modal
    v-if="showModal"
    title="Are you sure you want to leave?"
    message="You have unsaved Changes"
    btn-confirm="Yes"
    btn-cancel="No"
    @confirm="onRouteLeaveConfirm"
    @cancel="onRouteLeaveCancel"
  />
</template>

<script lang="ts">
import { defineComponent, version } from 'vue';

import { api } from '../modules/api';
import { toaster } from '../modules/toaster';

import { ready } from 'jquery';
import { useActiveMeta } from 'vue-meta';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import Icon from '../components/Icon.vue';
import ConfirmModal from '../components/modals/ConfirmModal.vue';
import ModVersionDetails from '../components/ModVersionDetails.vue';
import { useAddModVersion } from '../compositions/useAddModVersion';

export default defineComponent({
  name: 'AddModVersionPage',
  components: { ModVersionDetails, Icon, ApiProvidedForm, ConfirmModal },
  setup() {
    const meta = useActiveMeta();

    meta.title = 'Add mod version';

    return {
      ...useAddModVersion(),
    };
  },
  methods: {
    async onSubmit(): Promise<void> {
      if (!this.loading) {
        this.loading = true;
        const newVersion = await api.addModVersion(
          this.$route.params.id,
          this.version,
        );
        if (!!newVersion) {
          this.hasUnsavedChanges = false;
          await this.$router.push({
            name: 'modVersions',
            params: { id: newVersion.modId },
          });
          toaster.success(
            `New Version <b>"${newVersion.version}"</b> has been released!`,
          );
        }
        this.loading = false;
      }
    },
  },
});
</script>
