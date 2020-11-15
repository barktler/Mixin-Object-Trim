/**
 * @author WMXPY
 * @namespace Object_Trim
 * @description Object Trim
 */

import { Barktler, BarktlerMixin, IRequestConfig, IResponseConfig } from "@barktler/core";

export type ObjectTrimMixinOptions = {

    readonly trimRequestBody: boolean;
    readonly trimResponseData: boolean;
};

export const createObjectTrimMixin = (options: Partial<ObjectTrimMixinOptions> = {}): BarktlerMixin => {

    const mergedOptions: ObjectTrimMixinOptions = {

        trimRequestBody: false,
        trimResponseData: false,
        ...options,
    };

    return (instance: Barktler) => {

        if (mergedOptions.trimRequestBody) {

            instance.preHook.processor.add((request: IRequestConfig): IRequestConfig => {

                if (!request.body) {
                    return request;
                }

                return {
                    ...request,
                    body: Object.keys(request.body).reduce((previous: Record<string, any>, key: string) => {
                        if (request.body[key] === null || typeof request.body[key] === 'undefined') {
                            return previous;
                        }
                        return {
                            ...previous,
                            [key]: request.body[key],
                        };
                    }, {}),
                };
            });
        }

        if (mergedOptions.trimResponseData) {

            instance.postHook.processor.add((response: IResponseConfig): IResponseConfig => {

                if (!response.data) {
                    return response;
                }

                return {
                    ...response,
                    data: Object.keys(response.data).reduce((previous: Record<string, any>, key: string) => {
                        if (response.data[key] === null || typeof response.data[key] === 'undefined') {
                            return previous;
                        }
                        return {
                            ...previous,
                            [key]: response.data[key],
                        };
                    }, {}),
                };
            });
        }
    };
};
