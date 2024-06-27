const d=document.querySelector(".js__characterInput"),_=document.querySelector(".js__characterBtn"),f=document.querySelector(".js__characterList"),h=document.querySelector(".js__favouritesList");let i=[],r=[];function u(a){let t="";return a.imageUrl!==void 0?t=`<li>
                    <div class = 'character__container js__characterContainer' data-id = '${a._id}'>
                        <img class = 'character__img' src= '${a.imageUrl}' alt = 'Imagen de ${a.name}'>
                        <p class = 'character__name'>${a.name}</p>
                    </div>                
                </li>`:t=`<li>
                    <div class = 'character__container js__characterContainer' data-id = '${a._id}'>
                        <img class = 'character__img' src= 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney' alt = 'Imagen de ${a.name}'>
                        <p class = 'character__name'>${a.name}</p>
                    </div>                
                </li>`,t}function v(a){let t="";return a.imageUrl!==void 0?t=`<li>
                    <div class = 'favourite__container js__characterContainer selected' data-id = '${a._id}'>
                        <p class = 'closing__favourite__container js__closingFavouriteContainer' data-id = '${a._id}'>X</p>
                        <img class = 'favourite__img' src= '${a.imageUrl}' alt = 'Imagen de ${a.name}'>
                        <p class = 'favourite__name'>${a.name}</p>
                    </div>                
                </li>`:t=`<li>
                    <div class = 'favourite__container js__characterContainer selected' data-id = '${a._id}'>
                        <div class = 'closing__favourite__container js__closingFavouriteContainer' data-id = '${a._id}'>X</div>
                        <img class = 'favourite__img' src= 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney' alt = 'Imagen de ${a.name}'>
                        <p class = 'favourite__name'>${a.name}</p>
                    </div>                
                </li>`,t}function l(a){let t="";for(const e of a)t+=u(e);f.innerHTML=t;const c=document.querySelectorAll(".js__characterContainer");for(const e of c)e.addEventListener("click",p)}function s(a){let t="";for(const e of a)t+=v(e);h.innerHTML=t;const c=document.querySelectorAll(".js__closingFavouriteContainer");for(const e of c)e.addEventListener("click",m)}function p(a){const t=a.currentTarget.dataset.id,c=i.find(n=>parseInt(n._id)===parseInt(t)),e=r.findIndex(n=>parseInt(n._id)===parseInt(t));e===-1?(r.push(c),localStorage.setItem("favs",JSON.stringify(r))):(r.splice(e,1),localStorage.setItem("favs",JSON.stringify(r))),s(r)}function g(){const a=d.value;fetch(`https://api.disneyapi.dev/character?pageSize=50&name=${a}`).then(t=>t.json()).then(t=>{i=t.data,l(i)})}function m(a){const t=a.currentTarget.dataset.id,c=r.findIndex(e=>parseInt(e._id)===parseInt(t));r.splice(c,1),localStorage.setItem("favs",JSON.stringify(r)),s(r)}_.addEventListener("click",g);fetch("https://api.disneyapi.dev/character?pageSize=50").then(a=>a.json()).then(a=>{i=a.data,l(i)});const o=JSON.parse(localStorage.getItem("favs"));o!==null&&(r=o,s(r));
//# sourceMappingURL=main.js.map
