/// <reference types: string
/* eslint-disable @typescript-eslint/no-unused-vars */

interface ImportMetaEnv {

	readonly VITE_UI_DOMAIN: string
	readonly VITE_APP_DOMAIN: string
	readonly VITE_DOMAIN: string
	readonly VITE_HUB_DOMAIN: string
	readonly VITE_CLERK_DOMAIN: string
	readonly VITE_HTTPS_DOMAIN: string

}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
