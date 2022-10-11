import Contact from '../pages/Contact.vue';
import Privacy from '../pages/Privacy.vue';
import Terms from '../pages/Terms.vue';

export const legalRoutes = [
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/terms', name: 'terms', component: Terms },
  { path: '/privacy', name: 'privacy', component: Privacy },
];
