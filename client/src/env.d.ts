//@ts-ignore
interface ImportMetaEnv extends Readonly<Record<string, string | number | boolean>> {
  readonly VITE_PORT: number;
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
