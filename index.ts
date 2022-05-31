#!/usr/bin/env node

import { SourceMapConsumer } from "source-map";
import yargsCli from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { readFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);

type Read = { sourcemap: string, line: number, column: number};
async function readSourcemap({ sourcemap, line = 1, column = 0 }: Read) {
    const rawSourcemapData = await readFileAsync(sourcemap, 'utf8');
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
        }
    },async (args) => {
        const data = await readSourcemap(args as unknown as Read);

        console.log(data);
    })
    .demandCommand(1)
    .help()
    .parse()
