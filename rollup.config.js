'use strict';
import buble from '@rollup/plugin-buble'
import node from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import {terser} from 'rollup-plugin-terser'
import * as pkg from "./package.json";

const MIN = process.env.MIN === 'true' || false; // true/false|unset
const ES5 = process.env.ES5 === 'true';
const FORMAT = process.env.FORMAT; // JS umd|iife|esm
const INPUT = process.env.INPUTFILE;
const OUTPUTC = process.env.OUTPUTFILE;

const year = (new Date).getFullYear();

const banner =
`/*!
* EventListener v${pkg.version} (${pkg.homepage})
* ${pkg.description}
* Copyright ${year} © ${pkg.author}
* Licensed under MIT (https://github.com/thednp/event-listener.js/blob/master/LICENSE)
*/`;

const miniBannerJS = `// EventListener v${pkg.version} | ${pkg.author} © ${year} | ${pkg.license}-License`;

const INPUTFILE = INPUT ? INPUT : 'src/index.js';
const OUTPUTFILE = OUTPUTC ? OUTPUTC : 'dist/event-listener'+(FORMAT!=='umd'?'.'+FORMAT:'')+(MIN?'.min':'')+'.js';

const OUTPUT = {
  file: OUTPUTFILE,
  format: FORMAT // or iife
};

const PLUGINS = [ 
  node({mainFields: ['jsnext','module'], dedupe: ['shorter-js']}),
  json(), 
];

if (MIN){
  PLUGINS.push(terser({output: {preamble: miniBannerJS}}));
} else {
  OUTPUT.banner = banner;
}

if (ES5){
  PLUGINS.push(buble({objectAssign: 'Object.assign'}));
}

if (FORMAT!=='esm') {
  OUTPUT.name = 'EventListener';
}

export default [
  {
    input: INPUTFILE,
    output: OUTPUT,
    plugins: PLUGINS
  }
]