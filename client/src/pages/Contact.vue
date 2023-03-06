<template>
  <div class="container">
    <section class="my-3">
      <h1>Contact and disclaimers</h1>
      <div class="card">
        <div class="card-body">
          <div class="card-text">
            <p>
              If you require any more information or have any questions about
              our site's disclaimer, please feel free to contact us by email at
              <a :href="`mailto:contact@${brand}.com`" target="_blank"
                >contact@{{ brand }}.com</a
              >.
            </p>
            <h2>Disclaimers for {{ brand }}</h2>
            <p>
              All the information on this website - www.{{ brand }}.com - is
              published in good faith and for general information purpose only.
              {{ brand }} does not make any warranties about the completeness,
              reliability and accuracy of this information. Any action you take
              upon the information you find on this website ({{ brand }}), is
              strictly at your own risk. {{ brand }} will not be liable for any
              losses and/or damages in connection with the use of our website.
              Our Disclaimer was generated with the help of the
              <a href="https://www.disclaimergenerator.net/" target="_blank"
                >Disclaimer Generator</a
              >
              and the
              <a
                href="https://www.termsandcondiitionssample.com"
                target="_blank"
                >Terms and Conditions Template</a
              >.
            </p>
            <p>
              From our website, you can visit other websites by following
              hyperlinks to such external sites. While we strive to provide only
              quality links to useful and ethical websites, we have no control
              over the content and nature of these sites. These links to other
              websites do not imply a recommendation for all the content found
              on these sites. Site owners and content may change without notice
              and may occur before we have the opportunity to remove a link
              which may have gone 'bad'.
            </p>
            <p>
              Please be also aware that when you leave our website, other sites
              may have different privacy policies and terms which are beyond our
              control. Please be sure to check the Privacy Policies of these
              sites as well as their "Terms of Service" before engaging in any
              business or uploading any information.
            </p>
            <h2>Consent</h2>
            <p>
              By using our website, you hereby consent to our disclaimer and
              agree to its terms.
            </p>
            <h2>Update</h2>
            <p>
              Should we update, amend or make any changes to this document,
              those changes will be prominently posted here.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useActiveMeta } from 'vue-meta';

export default defineComponent({
  name: 'ContactPage',
  setup() {
    const meta = useActiveMeta();
    const brand = import.meta.env.VITE_BRAND;

    meta.title = 'Contact';

    return {
      brand,
    }
  },
});
</script>
