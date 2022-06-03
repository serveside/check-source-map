import { readFileAsync } from "./readFileAsync";
import { readSourcemap } from "./readSourcemap";
import { Read } from "./types";

export async function readLocalSourcemap({ sourcemap, line = 1, column = 0 }: Read) {
    const rawSourcemapData = await readFileAsync(sourcemap, 'utf8');
    return readSourcemap(rawSourcemapData, { line, column });
}
