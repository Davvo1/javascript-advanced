(()=>{const e=document.querySelector("#submit"),t=document.querySelector("#book-list");let n;e.addEventListener("click",(function(e){const o=document.querySelector("#input").value.toLowerCase();e.preventDefault();const r=document.querySelector("#loading");r.style.display="block";const c=document.querySelector("#warning-element");c.textContent="",c.classList.remove("warning-message"),async function(){try{let e=await fetch(`https://openlibrary.org/subjects/${o}.json`);if(!e.ok)throw new Error("Error fetching data.");let s=await e.json();if(0===s.works.length)throw new Error("Error fetching works.");t.innerHTML="";for(let e=0;e<s.works.length;e++){n=s.works[e].key;const o=document.createElement("div");o.innerHTML=`\n                <img class="image-item" src="https://covers.openlibrary.org/b/id/${s.works[e].cover_id}-M.jpg?default=false">\n                <span class="span-item" id="my-span">${s.works[e].title}</span>\n                <span class="author">${s.works[e].authors[0].name}</span>`,o.classList.add("container-item"),t.append(o)}return r.style.display="none",s.works}catch(e){return r.style.display="none",console.log(e),c.textContent="Error fetching data. Please try again later.",c.classList.add("warning-message"),t.innerHTML="",[]}}().then((e=>{!function(e){let t=e.map((e=>e.key));const n=document.querySelectorAll(".span-item");for(let o=0;o<e.length;o++){const e=n[o],r=t[o];e.addEventListener("click",(()=>{s(r)}))}}(e)}))}));const o=document.querySelector("#popup"),r=document.querySelector("#book-desc");async function s(e){let t=await fetch(`https://openlibrary.org${e}.json`),n=await t.json();console.log(n),r.innerHTML=`\n        <img src="src/x-icon.png" class="close" onclick="closePopUp()">\n        <p>${n.description?.value||n.description||"Description not available."}</p>`,o.className="popup"}document.querySelector("BODY").addEventListener("click",(function(){r.innerHTML="",o.classList.remove("popup")}))})();