function e(e){return e&&e.__esModule?e.default:e}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},r=o.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){t[e]=o},o.parcelRequired7c6=r);var i=r("7Y9D8");const u=document.querySelector('[name="delay"]'),l=document.querySelector('[name="step"]'),d=document.querySelector('[name="amount"]');function a(e,o){return new Promise(((n,t)=>{const r=Math.random()>.3;setTimeout((()=>{r?n({position:e,delay:o}):t({position:e,delay:o})}),o)}))}document.querySelector(".form").addEventListener("submit",(function(o){o.preventDefault();const n=Number(u.value),t=Number(l.value),r=Number(d.value);for(let o=0;o<r;o+=1)a(o+1,n+o*t).then((o=>{e(i).Notify.success(`✅ Fulfilled promise ${o.position} in ${o.delay}ms`)})).catch((o=>{e(i).Notify.failure(`❌ Rejected promise ${o.position} in ${o.delay}ms`)}))}));
//# sourceMappingURL=03-promises.4ef0c52a.js.map
