import {get} from './api.js';
import {esc} from './format.js';
import {board,bounty,leaderboard,profile} from './views.js';
const view=document.querySelector('#view');
let generation=0,currentEntries=[],currentSlug='',page=1;
function paginate(next){page=next;view.innerHTML=leaderboard(currentEntries,currentSlug,page);window.scrollTo(0,0);}
view.addEventListener('click',event=>{const button=event.target.closest('[data-page]');if(button)paginate(Number(button.dataset.page));if(event.target.closest('[data-retry]'))route();});
document.querySelector('#search').addEventListener('submit',event=>{event.preventDefault();const handle=new FormData(event.target).get('handle').trim().replace(/^@/,'');if(handle)location.hash='/u/'+encodeURIComponent(handle);});
async function route(){
  const ticket=++generation;window.__shotReady=false;
  view.setAttribute('aria-busy','true');view.innerHTML='<div class="loading"><span class="spinner"></span> Loading live data…</div>';
  try{
    const bits=(location.hash.slice(1).split('?')[0]||'/').split('/').filter(Boolean).map(decodeURIComponent);
    let html,title='Open bounties';
    if(!bits.length){html=board(await get('/competitions?status=open&activity=times'));}
    else if(bits[0]==='bounty'&&bits[1]){
      const slug=bits[1],path='/competitions/'+encodeURIComponent(slug);title=slug;
      if(bits[2]==='leaderboard'){const data=await get(path+'/leaderboard');if(ticket!==generation)return;currentEntries=data.entries||[];currentSlug=slug;page=1;html=leaderboard(currentEntries,slug,page);}
      else html=bounty(await get(path),slug);
    }else if(bits[0]==='u'&&bits[1]){title='@'+bits[1];html=profile(await get('/profiles/'+encodeURIComponent(bits[1])));}
    else html='<h1>Page not found</h1><a href="#/">Explore bounties →</a>';
    if(ticket!==generation)return;
    document.title=title+' · make.fun';view.innerHTML=html;
    for(const img of view.querySelectorAll('img[data-src]')){img.crossOrigin='anonymous';img.src=img.dataset.src;img.addEventListener('error',()=>img.remove(),{once:true});}
  }catch(error){if(ticket!==generation)return;view.innerHTML=`<section class="empty"><h1>Couldn’t load this page</h1><p>${esc(error.message)}</p><button data-retry>Try again</button> <a href="#/">Back to bounties</a></section>`;}
  finally{if(ticket===generation){view.removeAttribute('aria-busy');window.__shotReady=true;}}
}
window.addEventListener('hashchange',()=>{route();window.scrollTo(0,0);});
route();
