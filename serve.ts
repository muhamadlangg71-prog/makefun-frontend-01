import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const base=resolve(import.meta.dirname,'app');
const option=process.argv.indexOf('--port');
const port=option<0?8080:Number(process.argv[option+1]);
if(!Number.isInteger(port)||port<1||port>65535)throw Error('Invalid --port');
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript'};
createServer(async(req,res)=>{
  try {
    const file=resolve(base,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/\/$/,'/index.html'));
    if(!file.startsWith(base+sep)) throw Error();
    const body=await readFile(file);
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'}).end(body);
  } catch {res.writeHead(404).end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Serving on http://localhost:${port}`));
