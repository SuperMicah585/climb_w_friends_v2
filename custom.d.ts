declare module '*.png' {
    const value: string;
    export default value;
  }

  declare module '*.jpeg' {
    const value: string;
    export default value;
  }
  
  declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
  }

  interface ImportMetaEnv {
      readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_API_URL: string;
    readonly VITE_MAP_BOX_KEY: string;
    readonly VITE_DOMAIN:string;
    readonly VITE_REDIRECT_URI:string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  