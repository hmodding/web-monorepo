declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
  // export const entry: JsonFormsRendererRegistryEntry; //for jsonforms
}
