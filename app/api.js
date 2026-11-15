const cache=new Map();
const pending=new Map();
export function get(path){
  if(pending.has(path))return pending.get(path);
  const saved=cache.get(path);
  const request=fetch('https://make.fun/api'+path,{method:'GET',headers:saved?.etag?{'If-None-Match':saved.etag}:{}}).then(async response=>{
    if(response.status===304&&saved)return saved.data;
    if(response.status===404)throw Error('This bounty or profile could not be found.');
    if(!response.ok)throw Error(`The API returned ${response.status}. Please try again.`);
    const data=await response.json();
    cache.set(path,{data,etag:response.headers.get('ETag')});
    return data;
  }).finally(()=>pending.delete(path));
  pending.set(path,request);
  return request;
}
