import * as fs from 'node:fs';
import * as path from 'node:path';
import { buildDossier } from './vendor/makefun-frontend.ts';
const root = import.meta.dirname;
if (targetIsSource(process.env.MAKEFUN_OUTPUT_DIR)) throw new Error('Output must be outside the source app.');
function targetIsSource(value) { return value ? [root,path.join(root,'app'),path.join(root,'screenshots')].includes(path.resolve(value)) : false; }
const target = path.resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');
fs.mkdirSync(target, {recursive:true});
for (const folder of ['app','screenshots']) {
  fs.rmSync(path.join(target,folder), {recursive:true,force:true});
  fs.cpSync(path.join(root,folder),path.join(target,folder),{recursive:true});
}
const limits = {text_max_bytes:163840,screenshots:{max:3,max_bytes:262144},app_max_files:993,app_max_bytes:16777216};
fs.writeFileSync(path.join(target,'dossier.json'),buildDossier(target,limits));
