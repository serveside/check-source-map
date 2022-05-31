#!/usr/bin/env node

import { SourceMapConsumer } from "source-map";
import yargsCli from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { readFile } from "fs";
import { promisify } from "util";
import fetch from 'node-fetch';

const readFileAsync = promisify(readFile);

type Read = { sourcemap: string, line: number, column: number};
function readSourcemap(rawSourcemapData: string, {line, column}: Pick<Read, 'line' | 'column'>) {
    return SourceMapConsumer.with(
        rawSourcemapData,
        null,
        (smc) =>
            smc.originalPositionFor({
                line,
                column,
            })
    );
}

async function readRemoteSourcemap({ sourcemap, line = 1, column = 0 }: Read) {
    const rawSourcemapData = await fetch(sourcemap);
    return readSourcemap(await rawSourcemapData.json(), { line, column })
}
async function readLocalSourcemap({ sourcemap, line = 1, column = 0 }: Read) {
    const rawSourcemapData = await readFileAsync(sourcemap, 'utf8');
    return readSourcemap(rawSourcemapData, { line, column })
}

yargsCli(hideBin(process.argv))
    .scriptName('@serveside/check-source-map')
    .command('$0 <sourcemap>','get source line/column from sourcemap', {
        line: {
            alias: 'l',
            description: 'line number in the sourcemap'
        },
        column: {
            alias: 'c',
            description: 'column number in the sourcemap'
        },
    },async (args) => {
        let data;
        if (args.remote) {
            data = await readRemoteSourcemap(args as unknown as Read);
        }
        else {
            data = await readLocalSourcemap(args as unknown as Read);
        }

        console.log(data);
    })
    .options({
        remote: {
            alias: 'r',
            type: 'boolean',
            default: false,
            description: 'read sourcemap from remote url'
        }
    })
    .demandCommand(1)
    .help()
    .parse()
