/**
 * @author WMXPY
 * @namespace Object_Trim
 * @description Example
 * @override Mock
 */

import { Barktler, RequestDriver } from "@barktler/core";
import { createMockDriver } from "@barktler/driver-mock";

export type ExampleAPIResponse = {

    readonly hello: string;
};

export class ExampleAPI extends Barktler<any, ExampleAPIResponse> {

    protected readonly defaultDriver: RequestDriver | null = createMockDriver({
        mockResponseData: true,
    });

    public constructor() {

        super();

        super._declareResponseDataPattern({
            type: 'map',
            map: {
                hello: {
                    type: 'string',
                },
                emptyUndefined: {
                    type: 'empty',
                    allowUndefined: true,
                },
                emptyNull: {
                    type: 'empty',
                    allowNull: true,
                },
            },
        });
    }

    public async fetch(body: any): Promise<ExampleAPIResponse> {

        return await this._requestForData({
            url: 'https://example.com',
            method: 'POST',
            body,
        });
    }
}
