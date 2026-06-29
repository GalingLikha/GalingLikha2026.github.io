<script>
// ═══════════════════════════════════════════════════════
// COUNTDOWN TIMER
// ═══════════════════════════════════════════════════════
function updateCountdown(){
  const target=new Date('2026-08-01T09:00:00+08:00');
  const now=new Date();
  const diff=target-now;
  if(diff<=0){document.querySelectorAll('.cd-num').forEach(el=>el.textContent='0');return;}
  const d=Math.floor(diff/86400000);
  const h=Math.floor((diff%86400000)/3600000);
  const m=Math.floor((diff%3600000)/60000);
  const s=Math.floor((diff%60000)/1000);
  document.getElementById('cd-d').textContent=d;
  document.getElementById('cd-h').textContent=String(h).padStart(2,'0');
  document.getElementById('cd-m').textContent=String(m).padStart(2,'0');
  document.getElementById('cd-s').textContent=String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

// ═══════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════
function toggleNav(){document.getElementById('navlinks').classList.toggle('open');}
function closeNav(){document.getElementById('navlinks').classList.remove('open');}
window.addEventListener('scroll',function(){
  const links=document.querySelectorAll('.nav-links a');
  const sections=['hero','presentations','documents','about','apply'];
  let current='';
  sections.forEach(id=>{
    const el=document.getElementById(id);
    if(el&&window.scrollY>=el.offsetTop-80)current=id;
  });
  links.forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')==='#'+current);
  });
});

// ═══════════════════════════════════════════════════════
// ACCORDION
// ═══════════════════════════════════════════════════════
function toggleAcc(btn){
  const item=btn.closest('.acc-item');
  item.classList.toggle('open');
}

// ═══════════════════════════════════════════════════════
// DECK SYSTEM
// ═══════════════════════════════════════════════════════
const dkState={'dk1':0,'dk2':0,'dk3':0};

function openDeck(id){
  document.getElementById('deck-overlay').classList.add('open');
  ['dk1','dk2','dk3'].forEach(did=>{
    const d=document.getElementById(did);
    d.classList.toggle('active-deck',did===id);
  });
  document.querySelectorAll('.ds-tab').forEach(t=>{
    t.classList.toggle('on',t.classList.contains(id.replace('dk','d')));
  });
  initDeckDots(id);
  document.body.style.overflow='hidden';
}

function closeDeck(scrollHome){
  document.getElementById('deck-overlay').classList.remove('open');
  document.body.style.overflow='';
  if(scrollHome){
    setTimeout(function(){
      var hero=document.getElementById('hero');
      if(hero)hero.scrollIntoView({behavior:'smooth',block:'start'});
    },80);
  }
}

function initDeckDots(id){
  const d=document.getElementById(id);
  const slides=d.querySelectorAll('.slide');
  d.querySelectorAll('.snav-dots').forEach(dc=>{
    dc.innerHTML='';
    slides.forEach((_,i)=>{
      const dot=document.createElement('button');
      dot.className='snav-dot'+(i===dkState[id]?' on':'');
      dot.onclick=()=>goSlide(id,i);
      dc.appendChild(dot);
    });
  });
  updateDeckCtr(id);
}

function goSlide(id,n){
  const d=document.getElementById(id);
  const slides=d.querySelectorAll('.slide');
  const prev=dkState[id];
  if(n===prev||n<0||n>=slides.length)return;
  slides[prev].classList.remove('active');
  dkState[id]=n;
  slides[n].classList.add('active');
  d.querySelectorAll('.snav-dot').forEach((dot,i)=>dot.classList.toggle('on',i===n));
  updateDeckCtr(id);
}

function updateDeckCtr(id){
  const d=document.getElementById(id);
  const total=d.querySelectorAll('.slide').length;
  d.querySelectorAll('.snav-ctr').forEach(el=>el.textContent=(dkState[id]+1)+'/'+total);
}

function nextSlide(id){
  const d=document.getElementById(id);
  goSlide(id,Math.min(dkState[id]+1,d.querySelectorAll('.slide').length-1));
}
function prevSlide(id){goSlide(id,Math.max(dkState[id]-1,0));}

document.addEventListener('keydown',e=>{
  if(!document.getElementById('deck-overlay').classList.contains('open'))return;
  const active=['dk1','dk2','dk3'].find(id=>document.getElementById(id).classList.contains('active-deck'));
  if(!active)return;
  if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();nextSlide(active);}
  if(e.key==='ArrowLeft'){e.preventDefault();prevSlide(active);}
  if(e.key==='Escape')closeDeck();
});

let touchX=0;
document.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX;},{passive:true});
document.addEventListener('touchend',e=>{
  if(!document.getElementById('deck-overlay').classList.contains('open'))return;
  const dx=e.changedTouches[0].clientX-touchX;
  if(Math.abs(dx)<50)return;
  const active=['dk1','dk2','dk3'].find(id=>document.getElementById(id).classList.contains('active-deck'));
  if(!active)return;
  dx<0?nextSlide(active):prevSlide(active);
},{passive:true});

// ═══════════════════════════════════════════════════════
// DOCUMENT LIBRARY
// ═══════════════════════════════════════════════════════
const JMC_B64 = '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';

function downloadJMC(){
  const link=document.createElement('a');
  link.href='data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,'+JMC_B64;
  link.download='DILG-PCW_JMC_GalingLikha2026_AWDA.docx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function docPlaceholder(){
  showDocModal('📁 Document Available from Secretariat',
    '<p style="font-size:14px;color:var(--body);line-height:1.65;margin-bottom:1em;">This document will be available for download once uploaded by the Galing Likha 2026 AWDA Secretariat.</p>' +
    '<p style="font-size:13px;color:var(--muted);margin-bottom:.5em;">📧 For early access: <strong>secretariat@galinglikha2026.ph</strong></p>' +
    '<p style="font-size:13px;color:var(--muted);">Authorised staff can upload documents using the Admin Upload area below (password required).</p>');
}

function docNotice(){ docPlaceholder(); }

function previewJMC(){
  showDocModal('DILG-PCW Joint Memorandum Circular<br><small style="font-size:14px;font-weight:400;color:var(--muted);">Galing Likha 2026 Amazing Weaves Distinction Awards (AWDA)</small>',
    `<div style="background:var(--d1bg);border:1.5px solid var(--d1);border-radius:6px;padding:.85em 1.1em;margin-bottom:1em;">
      <p style="font-size:13px;font-weight:700;color:var(--d1);">Jointly issued by:</p>
      <p style="font-size:13.5px;color:var(--body);line-height:1.6;"><strong>JUANITO VICTOR C. REMULLA JR.</strong><br>Secretary, Department of the Interior and Local Government</p>
      <p style="font-size:13.5px;color:var(--body);line-height:1.6;margin-top:.4em;"><strong>ERMELITA V. VALDEAVILLA</strong><br>Chairperson, Philippine Commission on Women</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:.6em;">
      <div class="acc-item open"><button class="acc-head" onclick="toggleAcc(this)">Background &amp; Purpose <span class="acc-arrow">▼</span></button><div class="acc-body"><p style="font-size:13px;color:var(--body);line-height:1.65;padding:.5em 0;">Galing Likha 2026 AWDA is a <strong>standards-based recognition program — not a cultural competition</strong>. It does not pit one culture against another. It recognizes weaving communities and partner LGUs that demonstrate distinction in authenticity, craft excellence, fair livelihood outcomes, sustainability, market readiness, and enabling local governance support.</p></div></div>
      <div class="acc-item"><button class="acc-head" onclick="toggleAcc(this)">Evaluation Criteria <span class="acc-arrow">▼</span></button><div class="acc-body"><div style="display:flex;flex-direction:column;gap:.35em;padding:.5em 0;">
        <div style="display:grid;grid-template-columns:1fr auto;gap:.5em;font-size:13px;padding:.35em .6em;background:var(--linen);border-radius:3px;"><span><strong>Cultural Protection</strong> — documentation, cultural narratives, craft excellence</span><span style="color:var(--d1);font-weight:700;">20%</span></div>
        <div style="display:grid;grid-template-columns:1fr auto;gap:.5em;font-size:13px;padding:.35em .6em;background:var(--cream);border-radius:3px;"><span><strong>Craft Excellence &amp; Eco-conscious Innovation</strong> — technical mastery, natural fiber sourcing</span><span style="color:var(--d1);font-weight:700;">20%</span></div>
        <div style="display:grid;grid-template-columns:1fr auto;gap:.5em;font-size:13px;padding:.35em .6em;background:var(--linen);border-radius:3px;"><span><strong>LGU Policy &amp; Ecosystem</strong> — enabling policy, programs, partnerships</span><span style="color:var(--d1);font-weight:700;">15%</span></div>
        <div style="display:grid;grid-template-columns:1fr auto;gap:.5em;font-size:13px;padding:.35em .6em;background:var(--cream);border-radius:3px;"><span><strong>Community Impact</strong> — raw material sourcing, skills transfer, mentorship</span><span style="color:var(--d1);font-weight:700;">15%</span></div>
        <div style="display:grid;grid-template-columns:1fr auto;gap:.5em;font-size:13px;padding:.35em .6em;background:var(--linen);border-radius:3px;"><span><strong>Market Access &amp; Value Chain</strong> — integration, linkages, export market access</span><span style="color:var(--d1);font-weight:700;">15%</span></div>
        <div style="display:grid;grid-template-columns:1fr auto;gap:.5em;font-size:13px;padding:.35em .6em;background:var(--cream);border-radius:3px;"><span><strong>Sustainable Livelihood</strong> — GAD resources, adoption and replication model</span><span style="color:var(--d1);font-weight:700;">15%</span></div>
      </div></div></div>
      <div class="acc-item"><button class="acc-head" onclick="toggleAcc(this)">Awards &amp; Incentives <span class="acc-arrow">▼</span></button><div class="acc-body"><div style="padding:.5em 0;font-size:13.5px;color:var(--body);line-height:1.7;"><p>• <strong>Island-Level Distinction Awardees</strong> (Bottom 3 of Top 5 per island group): <strong>PhP 30,000</strong> each</p><p>• <strong>Island-Level Excellence Awardees / National Finalists</strong> (Top 2 per island group): <strong>PhP 75,000</strong> each</p><p>• <strong>National Distinction Awardees</strong> (1 per island group, 3 total): <strong>PhP 150,000</strong> each</p></div></div></div>
      <div class="acc-item"><button class="acc-head" onclick="toggleAcc(this)">ASEAN Trade Expo 2026 <span class="acc-arrow">▼</span></button><div class="acc-body"><p style="font-size:13px;color:var(--body);line-height:1.65;padding:.5em 0;">AWDA is a passport to the ASEAN Trade Expo, held 10-12 November 2026 at Okada Manila alongside the 2nd ASEAN Women Economic Summit. Here, Filipino weaves meet ASEAN buyers, investors, and policymakers; cross-border matchmaking and digital traceability platforms; ESG-aligned investment dialogues; and a storytelling stage where weavers become enterprise leaders.</p></div></div>
    </div>
    <div style="margin-top:1.2em;text-align:center;"><button class="btn btn-gold" onclick="downloadJMC()">⬇ Download Full JMC (DOCX)</button></div>`);
}


function downloadActiveDeck(){
  window.print();
}

function showDocModal(title, body){
  document.getElementById('modal-overlay').classList.add('open');
  const m=document.getElementById('conf-modal');
  m.querySelector('h2').innerHTML=title;
  let sb=document.getElementById('summary-section');
  sb.innerHTML=body;
  document.getElementById('ref-num-display').style.display='none';
  const nextSteps=m.querySelector('div[style*="font-size:13px"]');
  if(nextSteps)nextSteps.style.display='none';
  const btnRow=m.querySelector('div[style*="justify-content:center"]');
  if(btnRow)btnRow.innerHTML='<button class="btn btn-outline" onclick="closeModal()">Close</button>';
}

let adminUnlocked=false;
function promptAdminLogin(){
  if(adminUnlocked){toggleUpload();return;}
  const pw=prompt('Enter admin password to upload documents:');
  if(pw==='GalingLikha2026'){adminUnlocked=true;toggleUpload();}
  else if(pw!==null){alert('Incorrect password.');}
}

function toggleUpload(){
  const ua=document.getElementById('upload-admin');
  ua.style.display=ua.style.display==='none'?'block':'none';
}

let upFileData=null;
function handleUpSelect(input){
  const f=input.files[0];
  if(!f)return;
  document.getElementById('up-file-name').textContent='Selected: '+f.name+' ('+Math.round(f.size/1024)+'KB)';
  const reader=new FileReader();
  reader.onload=ev=>{upFileData={name:f.name,data:ev.target.result,size:f.size};};
  reader.readAsDataURL(f);
}
function handleUpDrop(e){
  e.preventDefault();
  const f=e.dataTransfer.files[0];
  if(!f)return;
  document.getElementById('up-file-name').textContent='Selected: '+f.name;
  const reader=new FileReader();
  reader.onload=ev=>{upFileData={name:f.name,data:ev.target.result,size:f.size};};
  reader.readAsDataURL(f);
}
function saveUpload(){
  const title=document.getElementById('up-title').value.trim();
  const type=document.getElementById('up-type').value;
  const desc=document.getElementById('up-desc').value.trim();
  if(!title||!desc){alert('Please fill in the document title and description.');return;}
  if(!upFileData){alert('Please select a file to upload.');return;}
  const docs=JSON.parse(localStorage.getItem('gl-docs')||'[]');
  docs.push({title,type,desc,name:upFileData.name,data:upFileData.data,id:Date.now()});
  localStorage.setItem('gl-docs',JSON.stringify(docs));
  renderUploadedDocs();
  document.getElementById('up-title').value='';
  document.getElementById('up-desc').value='';
  document.getElementById('up-file-name').textContent='';
  upFileData=null;
  document.getElementById('up-file').value='';
  alert('Document uploaded successfully!');
}
function renderUploadedDocs(){
  const docs=JSON.parse(localStorage.getItem('gl-docs')||'[]');
  const area=document.getElementById('uploaded-docs-area');
  if(!docs.length){area.innerHTML='';return;}
  area.innerHTML='<h3 style="font-family:Cormorant Garamond,serif;font-size:18px;font-weight:700;color:var(--ink);margin:1.5em 0 .75em;">Uploaded Documents</h3><div class="g3" id="uploaded-grid"></div>';
  const grid=document.getElementById('uploaded-grid');
  docs.forEach(doc=>{
    const card=document.createElement('div');
    card.className='doc-card';
    card.innerHTML='<div class="doc-icon">📄</div><div><span class="tag pdf">'+doc.type+'</span></div><div class="doc-name">'+doc.title+'</div><div class="doc-desc">'+doc.desc+'</div><div style="font-size:11px;color:var(--muted);">'+doc.name+'</div><div class="doc-actions"><a class="btn btn-gold btn-sm" href="'+doc.data+'" download="'+doc.name+'">⬇ Download</a><button class="btn btn-outline btn-sm" onclick="removeDoc('+doc.id+')">🗑 Remove</button></div>';
    grid.appendChild(card);
  });
}
function removeDoc(id){
  let docs=JSON.parse(localStorage.getItem('gl-docs')||'[]');
  docs=docs.filter(d=>d.id!==id);
  localStorage.setItem('gl-docs',JSON.stringify(docs));
  renderUploadedDocs();
}
renderUploadedDocs();
</script>