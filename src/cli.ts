#!/usr/bin/env node
import {compress, compressOptions} from "./index";
import * as yargs from "yargs";

const argv = yargs.command('ngx-compress [options]', 'Compress a directory').option('path', {
    alias: 'p',
    type: 'string',
    description: 'Path to compress',
    demand: true,
    default: 'dist'
}).option('verbose', {
    alias: 'v',
    type: 'boolean',
    default: false,
    description: 'Run with verbose logging'
}).option('compression', {
    alias: 'c',
    type: "array",
    default: ['br', 'gz'],
    description: 'Compression algorithms (br: brotli, gz: gzip)'
}).option('fileType', {
    alias: 'f',
    type: 'array',
    default: ['css', 'html', 'ico', 'jpeg', 'jpg', 'js', 'json', 'svg', 'xml'],
    description: 'File types that will be compressed'
}).help().alias('h', 'help').strict().argv;

compress(argv.path, {
    fileTypes: argv.fileType,
    compression: argv.compression,
    verbose: argv.verbose
} as compressOptions);
