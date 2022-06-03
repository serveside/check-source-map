import fetch from 'node-fetch';
import { readSourcemap } from "./readSourcemap";
import { Read } from "./types";

export async function readRemoteSourcemap({ sourcemap, line = 1, column = 0 }: Read) {
    const rawSourcemapData = await fetch(sourcemap);
    return readSourcemap(await rawSourcemapData.json(), { line, column });
}
