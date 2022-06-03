import { SourceMapConsumer } from "source-map";
import { Read } from "./types";


export function readSourcemap(rawSourcemapData: string, { line, column }: Pick<Read, 'line' | 'column'>) {
    return SourceMapConsumer.with(
        rawSourcemapData,
        null,
        (smc) => smc.originalPositionFor({
            line,
            column,
        })
    );
}
