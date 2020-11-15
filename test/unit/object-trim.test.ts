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

    it('should be able to trim request data', async (): Promise<void> => {

        let requestBody: Record<string, any> | undefined;
        const url: string = chance.string();

        const api: ExampleAPI = new ExampleAPI(url);
        api.useMixin(createObjectTrimMixin({
            trimRequestBody: true,
        }));

        api.preHook.sideEffect.add((data: IRequestConfig) => {
            requestBody = data.body;
        });

        const response: ExampleAPIResponse = await api.fetch();

        expect(typeof response.hello).to.be.equal('string');
        expect(requestBody).to.be.deep.equal({});
    });
});
