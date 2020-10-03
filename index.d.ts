#!/usr/bin/env node
/// <reference path="../ssr/index.d.ts" />
declare module "config" {
    export = config;
    /**
     * @typedef {object} Config
     * @prop {string|string[]} assetsDir                      - folders with static content to be served.
     * @prop {string} entrypoint                              - HTML template, eg. assets/index.html.
     * @prop {string} script                                  - path to app, eg. build/bundle.js.
     * @prop {string|number} port                             - port to serve on.
     * @prop {boolean} ssr                                    - enable SSR for routes not resolved in assetsDir.
     * @prop {boolean} silent                                 - quiet console.log.
     * @prop {Partial<tossr.Config>} ssrOptions                  - options to pass to ssr
     */
    /**
   * Called before/after the app script is evaluated
   * @callback Eval
   * @param {object} dom The DOM object
   * */
    /** @type {Config} */
    const config: Config;
    namespace config {
        export { Config, Eval };
    }
    type Config = {
        /**
         * - folders with static content to be served.
         */
        assetsDir: string | string[];
        /**
         * - HTML template, eg. assets/index.html.
         */
        entrypoint: string;
        /**
         * - path to app, eg. build/bundle.js.
         */
        script: string;
        /**
         * - port to serve on.
         */
        port: string | number;
        /**
         * - enable SSR for routes not resolved in assetsDir.
         */
        ssr: boolean;
        /**
         * - quiet console.log.
         */
        silent: boolean;
        /**
         * - options to pass to ssr
         */
        ssrOptions: Partial<import("tossr").Config>;
    };
    /**
     * Called before/after the app script is evaluated
     */
    type Eval = (dom: object) => any;
}
declare module "spassr" {
    export function spassr(options: Partial<import("config").Config>): Promise<void>;
}
declare module "cli" {
    export {};
}
