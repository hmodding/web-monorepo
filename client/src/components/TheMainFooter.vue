<script setup lang="ts">
import { computed } from 'vue';
import ThemeSwitch from './ThemeSwitch.vue';
import {SUBMIT_AN_ISSUE_LINK} from "../const/links.const";

const fullYear = computed(() => new Date().getFullYear());

const submitAnIssueLink = SUBMIT_AN_ISSUE_LINK;
</script>

<template>
  <footer class="mt-5">
    <div class="container">
      <small class="text-muted">
        <hr />
        <div class="row my-3">
          <div class="col-9 col-sm-7 text-left">
            © {{fullYear || '2021'}} | Made by
            <a href="https://github.com/made-by-traxam" target="_blank">traxam</a>,
            <a href="https://github.com/Felix-Staud" target="_blank">zer0</a> and
            <a href="https://www.hytekgames.net" target="_blank">TeKGameR</a>
            Not affiliated with Raft, Redbeet Interactive or Axolot Games.
          </div>
          <div class="d-sm-none col-3 text-right">
            <theme-switch />
          </div>
          <div class="col-12 col-sm-4 text-md-right">
            <a
              :href="submitAnIssueLink"
              target="_blank"
              class="whitespace-nowrap"
              >Submit an issue</a
            >
            &nbsp;|&nbsp;
            <router-link :to="{ name: 'contact' }" class="whitespace-nowrap">
              Contact and disclaimers
            </router-link>
            &nbsp;|&nbsp;
            <router-link :to="{ name: 'terms' }" class="whitespace-nowrap"
              >Terms of Service</router-link
            >
            &nbsp;|&nbsp;
            <router-link :to="{ name: 'privacy' }" class="whitespace-nowrap"
              >Privacy policy</router-link
            >
          </div>
          <div class="d-none d-sm-block col-1 text-right">
            <theme-switch />
          </div>
        </div>
      </small>
    </div>
  </footer>
</template>
