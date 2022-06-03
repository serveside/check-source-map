#!/usr/bin/env node

import yargsCli from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { Read, readRemoteSourcemap, readLocalSourcemap } from "../module";

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
