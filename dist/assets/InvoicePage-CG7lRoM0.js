import{u,m as f,a as v,h,j as e,H as I,O as c,B as l,X as g}from"./index-CeEBSq9K.js";import{A as o}from"./AppCardData-_GUx42YH.js";import{F as N}from"./index-CKFZ7l3k.js";function E(){const r=u(),{invoiceid:a}=f(),{status:d,getInvoice:x,removeInvoice:m}=v(),{callApi:p}=h("DELETE","DELETEINVOCIE"),n=x(decodeURIComponent(a||"")),t=()=>{r("/account/invoices")},j=async()=>{await p(!0,{invoiceID:decodeURIComponent(a||"")})&&(m(decodeURIComponent(a||"")),t())};return d==="loading"?e.jsx(I,{size:50,color:"white",className:"m-auto"}):n?e.jsxs("div",{className:"w-full",children:[e.jsx("div",{className:"p-4",children:e.jsx(c,{btnText:"Go back",onClick:t,icon:e.jsx(l,{size:24})})}),e.jsxs("div",{className:"flex flex-col gap-y-20 mt-10 p-6",children:[e.jsxs("div",{className:"flex flex-col-reverse md:flex-row gap-y-4 justify-between",children:[e.jsxs("div",{className:"flex flex-col gap-y-1 w-full",children:[e.jsx(o,{desciption:"Subject",data:n.subject}),e.jsx(o,{desciption:"From",data:n.from}),e.jsx(o,{desciption:"Sent at",data:n.sentAt})]}),e.jsx("div",{className:"self-end md:self-start",children:e.jsx(g,{btnText:"Delete",onClick:j,icon:e.jsx(N,{})})})]}),e.jsx("ul",{className:"flex flex-col gap-y-4 text-sky-200",children:n.text.split(`

`).filter(s=>s).map(s=>e.jsx("li",{children:s.split(`
`).map(i=>e.jsx("p",{children:i},s+i+Math.random()))},s+Math.random()))})]})]}):e.jsxs("div",{children:[e.jsx("div",{className:"p-4",children:e.jsx(c,{btnText:"Go back",onClick:t,icon:e.jsx(l,{size:24})})}),e.jsx("h2",{className:"text-2xl font-semibold text-red-400 ml-[20px] pt-[30px] pb-[60px]",children:"Invoice not found"})]})}export{E as default};
