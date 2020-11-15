/**
 * @author WMXPY
 * @namespace Object_Trim
 * @description Object Trim
 * @override Unit
 */

import { IRequestConfig } from "@barktler/core";
import { expect } from "chai";
import * as Chance from "chance";
import { createObjectTrimMixin } from "../../src";
import { ExampleAPI, ExampleAPIResponse } from "../mock/example";

describe('Given [createObjectTrimMixin] function', (): void => {

    const chance: Chance.Chance = new Chance('object-trim-object-trim');

    it('should be able to trim request body', async (): Promise<void> => {

        let requestBody: Record<string, any> | undefined;

        const validKey: string = chance.string();
        const validValue: string = chance.string();

        const undefinedKey: string = chance.string();
        const nullKey: string = chance.string();

        const api: ExampleAPI = new ExampleAPI();
        api.useMixin(createObjectTrimMixin({
            trimRequestBody: true,
        }));

        api.preHook.sideEffect.add((data: IRequestConfig) => {
            requestBody = data.body;
        });

        const response: ExampleAPIResponse = await api.fetch({
            [validKey]: validValue,
            [undefinedKey]: undefined,
            [nullKey]: null,
        });

        expect(typeof response.hello).to.be.equal('string');
        expect(requestBody).to.be.deep.equal({
            [validKey]: validValue,
        });
    });

    it('should be able to trim response data', async (): Promise<void> => {

        const api: ExampleAPI = new ExampleAPI();
        api.useMixin(createObjectTrimMixin({
            trimResponseData: true,
        }));

        const response: ExampleAPIResponse = await api.fetch({});

        expect(typeof response.hello).to.be.equal('string');
    });
});
