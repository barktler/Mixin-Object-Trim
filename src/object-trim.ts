/**
 * @author WMXPY
 * @namespace Object_Trim
 * @description Object Trim
 */

import { Barktler, BarktlerMixin, IRequestConfig } from "@barktler/core";

export type BaseURLMixinOptions = {

    readonly beaeURL: string;
};

export const createBaseURLMixin = (options: Partial<BaseURLMixinOptions> = {}): BarktlerMixin => {

    const mergedOptions: BaseURLMixinOptions = {

        beaeURL: '',
        ...options,
    };

    return (instance: Barktler) => {

        instance.preHook.processor.add((request: IRequestConfig): IRequestConfig => {

            return {
                ...request,
                url: mergedOptions.beaeURL + request.url,
            };
        });
    };
};
