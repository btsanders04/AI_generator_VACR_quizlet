(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[464],{91100:function(e,t,r){Promise.resolve().then(r.bind(r,84590)),Promise.resolve().then(r.t.bind(r,72972,23))},84590:function(e,t,r){"use strict";r.d(t,{default:function(){return c}});var s=r(57437),n=r(2265),a=r(33145),l=r(43406);function c(){let[e,t]=(0,n.useState)(null),[r,c]=(0,n.useState)(""),[i,o]=(0,n.useState)(null),[d,u]=(0,n.useState)(!1),[x,b]=(0,n.useState)(0),[h,m]=(0,n.useState)(0),g=async()=>{try{let e=(0,l.Ou)();t(e)}catch(e){console.error("Error fetching random image:",e)}};return((0,n.useEffect)(()=>{g()},[]),e)?(0,s.jsxs)("div",{className:"flex flex-col items-center gap-4 text-black",children:[(0,s.jsxs)("div",{className:"flex items-start gap-4",children:[(0,s.jsx)(a.default,{src:e.url,alt:"Random aircraft",width:400,height:300}),(0,s.jsxs)("div",{className:"bg-gray-100 p-4 rounded",children:[(0,s.jsx)("h3",{className:"text-lg font-bold mb-2",children:"Score"}),(0,s.jsxs)("div",{className:"text-green-600",children:["Correct: ",x]}),(0,s.jsxs)("div",{className:"text-red-600",children:["Incorrect: ",h]})]})]}),(0,s.jsxs)("form",{onSubmit:t=>{if(t.preventDefault(),e){let t=r.toLowerCase().trim()===e.answer.toLowerCase();o(t),t?b(e=>e+1):m(e=>e+1),u(!0)}},className:"flex flex-col items-center gap-2",children:[(0,s.jsx)("input",{type:"text",value:r,onChange:e=>c(e.target.value),className:"border border-gray-300 rounded px-2 py-1 text-black",placeholder:"Enter aircraft name"}),(0,s.jsxs)("div",{className:"flex gap-2",children:[(0,s.jsx)("button",{type:"submit",className:"px-4 py-2 rounded ".concat(r.trim()?"bg-blue-500 text-white hover:bg-blue-600":"bg-gray-300 text-gray-500 cursor-not-allowed"),disabled:!r.trim(),children:"Submit"}),(0,s.jsx)("button",{type:"button",onClick:()=>{i||d||m(e=>e+1),u(!0),setTimeout(()=>{c(""),o(null),u(!1),g()},2e3)},className:"px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600",children:"Next"}),(0,s.jsx)("button",{type:"button",onClick:()=>{b(0),m(0),c(""),o(null),u(!1),g()},className:"px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600",children:"Reset"})]})]}),null!==i&&!d&&(0,s.jsx)("div",{className:"mt-4 p-2 rounded ".concat(i?"bg-green-100 text-green-800":"bg-red-100 text-red-800"),children:i?"Correct!":"Incorrect. Try again!"}),d&&(0,s.jsxs)("div",{className:"mt-4 p-2 rounded bg-blue-100 text-blue-800",children:["The correct answer was: ",e.answer]})]}):(0,s.jsx)("div",{children:"Loading..."})}}},function(e){e.O(0,[972,145,406,971,117,744],function(){return e(e.s=91100)}),_N_E=e.O()}]);