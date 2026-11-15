export const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const money=value=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:Number(value)%1?2:0,maximumFractionDigits:2}).format(Number(value)||0);
export const date=value=>{const d=new Date(value);return Number.isFinite(+d)?d.toLocaleString('en-GB',{timeZone:'UTC',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false})+' UTC':'Not announced';};
export const timeLeft=value=>{const m=Math.ceil((new Date(value)-Date.now())/60000);if(!Number.isFinite(m))return 'No deadline';if(m<=0)return 'ended';const h=Math.floor(m/60),d=Math.floor(h/24);return (d?`${d}d ${h%24}h`:h?`${h}h ${m%60}m`:`${m}m`)+' left';};
export const pot=b=>Number(b.potUsd??b.rewardAmount??0);
export const deadline=b=>b.deadline??b.deadlineAt??b.endsAt;
export const bountyLink=slug=>'#/bounty/'+encodeURIComponent(slug);
export const profileLink=handle=>'#/u/'+encodeURIComponent(handle);
