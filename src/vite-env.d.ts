/// <reference types="vite/client" />

//agregar las variables que no se modificaran

interface ImportMetaEnv {
    readonly Variable: String;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}