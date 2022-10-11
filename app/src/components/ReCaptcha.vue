<!--
    Parts of this component are copied from
    https://www.npmjs.com/package/vue3-recaptcha2 which is ISC-licensed:

    Copyright 2021 Dmitry Sergienko

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
    SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
    OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
    CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
-->

<template>
  <div ref="recaptcha" :key="key"></div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from 'vue';
import { Theme } from '../types/State';

interface ReCaptchaRenderParameters {
  sitekey: string;
  theme?: Theme;
  size?: ReCaptchaSize;
  tabindex?: number;
  callback?: (responseToken: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
}

type ReCaptchaSize = 'compact' | 'normal';

interface ReCaptchaGlobal {
  /**
   * @returns the widget id of the rendered captcha.
   */
  render: (
    component: Element | string,
    parameters: ReCaptchaRenderParameters,
  ) => string;
  /**
   * @param widgetId the id of the widget to reset. Defaults to the first
   * widget created.
   */
  reset: (widgetId?: string) => void;
}

declare global {
  interface Window {
    grecaptcha: ReCaptchaGlobal | undefined;
    recaptchaReady: (() => void) | undefined;
  }
}

export default defineComponent({
  name: 're-captcha',
  props: {
    siteKey: {
      type: String,
      required: true,
    },
    size: {
      type: String as PropType<ReCaptchaSize>,
      required: false,
      default: 'normal',
    },
    theme: {
      type: String as PropType<Theme>,
      required: false,
      default: 'light',
    },
    tabindex: {
      type: Number,
      required: false,
      default: -1,
    },
  },
  emits: {
    verify: String,
    expire: null,
    fail: null,
  },
  data() {
    return {
      key: 0,
    };
  },
  setup(_props) {
    const recaptcha: Ref<string | undefined> = ref();

    return {
      recaptcha,
    };
  },
  watch: {
    theme(newValue: string) {
      this.reset();
      this.key++; // force re-render
      this.$nextTick(() => {
        this.renderRecaptcha();
      });
    },
  },
  methods: {
    renderRecaptcha() {
      this.recaptcha = window.grecaptcha!.render(
        this.$refs.recaptcha as string,
        {
          sitekey: this.siteKey,
          theme: this.theme,
          size: this.size,
          tabindex: this.tabindex,
          callback: (responseToken) => this.$emit('verify', responseToken),
          'expired-callback': () => this.$emit('expire'),
          'error-callback': () => this.$emit('fail'),
        },
      );
    },
    reset() {
      window.grecaptcha!.reset(this.recaptcha);
    },
  },
  mounted() {
    if (!window.grecaptcha) {
      new Promise<void>((resolve) => {
        window.recaptchaReady = function () {
          resolve();
        };

        const doc = window.document;
        const scriptId = 'recaptcha-script';
        const scriptTag = doc.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.setAttribute(
          'src',
          'https://www.google.com/recaptcha/api.js?onload=recaptchaReady&render=explicit',
        );
        doc.head.appendChild(scriptTag);
      }).then(() => {
        this.renderRecaptcha();
      });
    } else {
      this.renderRecaptcha();
    }
  }, // TODO remove globals on unmount
});
</script>