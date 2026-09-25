/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_QUOTE_PATH?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_BASE_PATH?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
