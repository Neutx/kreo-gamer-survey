(()=>{var e={};e.id=694,e.ids=[694],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},55511:e=>{"use strict";e.exports=require("crypto")},14985:e=>{"use strict";e.exports=require("dns")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},73496:e=>{"use strict";e.exports=require("http2")},91645:e=>{"use strict";e.exports=require("net")},21820:e=>{"use strict";e.exports=require("os")},33873:e=>{"use strict";e.exports=require("path")},19771:e=>{"use strict";e.exports=require("process")},27910:e=>{"use strict";e.exports=require("stream")},34631:e=>{"use strict";e.exports=require("tls")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},14109:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>n.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>l});var s=t(70260),a=t(28203),i=t(25155),n=t.n(i),o=t(67292),d={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);t.d(r,d);let l=["",{children:["admin-view",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,42905)),"D:\\Kreoo\\kreo-gamer-survey\\src\\app\\admin-view\\login\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,64540)),"D:\\Kreoo\\kreo-gamer-survey\\src\\app\\admin-view\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,71354)),"D:\\Kreoo\\kreo-gamer-survey\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,41485,23)),"next/dist/client/components/unauthorized-error"]}],c=["D:\\Kreoo\\kreo-gamer-survey\\src\\app\\admin-view\\login\\page.tsx"],u={require:t,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/admin-view/login/page",pathname:"/admin-view/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},55629:(e,r,t)=>{Promise.resolve().then(t.bind(t,64540))},79597:(e,r,t)=>{Promise.resolve().then(t.bind(t,7712))},18089:(e,r,t)=>{Promise.resolve().then(t.bind(t,42905))},99593:(e,r,t)=>{Promise.resolve().then(t.bind(t,54819))},41680:(e,r,t)=>{"use strict";t.d(r,{A:()=>d});var s=t(58009);let a=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),i=(...e)=>e.filter((e,r,t)=>!!e&&""!==e.trim()&&t.indexOf(e)===r).join(" ").trim();var n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let o=(0,s.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:t=2,absoluteStrokeWidth:a,className:o="",children:d,iconNode:l,...c},u)=>(0,s.createElement)("svg",{ref:u,...n,width:r,height:r,stroke:e,strokeWidth:a?24*Number(t)/Number(r):t,className:i("lucide",o),...c},[...l.map(([e,r])=>(0,s.createElement)(e,r)),...Array.isArray(d)?d:[d]])),d=(e,r)=>{let t=(0,s.forwardRef)(({className:t,...n},d)=>(0,s.createElement)(o,{ref:d,iconNode:r,className:i(`lucide-${a(e)}`,t),...n}));return t.displayName=`${e}`,t}},79334:(e,r,t)=>{"use strict";var s=t(58686);t.o(s,"usePathname")&&t.d(r,{usePathname:function(){return s.usePathname}}),t.o(s,"useRouter")&&t.d(r,{useRouter:function(){return s.useRouter}})},7712:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>u});var s=t(45512),a=t(58009),i=t(79334),n=t(28531),o=t.n(n),d=t(77141),l=t(1564),c=t(39400);function u({children:e}){let[r,t]=(0,a.useState)(null),[n,u]=(0,a.useState)(!0),m=(0,i.usePathname)(),x=(0,i.useRouter)(),p=async()=>{try{await (0,l.CI)(d.j),x.push("/admin-view/login")}catch(e){console.error("Error signing out:",e),x.push("/admin-view/login")}};return"/admin-view/login"===m?(0,s.jsx)(s.Fragment,{children:e}):n?(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-gray-900",children:(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"})}):r?(0,s.jsxs)("div",{className:"min-h-screen bg-gray-950 text-white",children:[(0,s.jsxs)("nav",{className:"bg-gray-900 border-b border-gray-800",children:[(0,s.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,s.jsxs)("div",{className:"flex items-center justify-between h-16",children:[(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{className:"flex-shrink-0",children:(0,s.jsx)("span",{className:"text-xl font-bold text-purple-500",children:"Kreo Admin"})}),(0,s.jsx)("div",{className:"hidden md:block",children:(0,s.jsxs)("div",{className:"ml-10 flex items-baseline space-x-4",children:[(0,s.jsx)(o(),{href:"/admin-view/dashboard",className:`px-3 py-2 rounded-md text-sm font-medium ${"/admin-view/dashboard"===m?"bg-gray-800 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white"}`,children:"Responses"}),(0,s.jsx)(o(),{href:"/admin-view/analytics",className:`px-3 py-2 rounded-md text-sm font-medium ${"/admin-view/analytics"===m?"bg-gray-800 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white"}`,children:"Analytics"}),(0,s.jsx)(o(),{href:"/",className:"px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white",children:"View Survey"})]})})]}),(0,s.jsx)("div",{className:"hidden md:block",children:(0,s.jsx)("div",{className:"ml-4 flex items-center md:ml-6",children:(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsx)("div",{className:"text-sm text-gray-300",children:r?.email}),(0,s.jsx)(c.$,{onClick:p,variant:"outline",className:"text-sm text-gray-300 border-gray-600 hover:bg-gray-700",children:"Sign out"})]})})}),(0,s.jsx)("div",{className:"-mr-2 flex md:hidden",children:(0,s.jsxs)("button",{type:"button",className:"bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white","aria-controls":"mobile-menu","aria-expanded":"false",children:[(0,s.jsx)("span",{className:"sr-only",children:"Open main menu"}),(0,s.jsx)("svg",{className:"block h-6 w-6",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 6h16M4 12h16M4 18h16"})})]})})]})}),(0,s.jsx)("div",{className:"md:hidden",id:"mobile-menu",children:(0,s.jsxs)("div",{className:"px-2 pt-2 pb-3 space-y-1 sm:px-3",children:[(0,s.jsx)(o(),{href:"/admin-view/dashboard",className:`block px-3 py-2 rounded-md text-base font-medium ${"/admin-view/dashboard"===m?"bg-gray-800 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white"}`,children:"Responses"}),(0,s.jsx)(o(),{href:"/admin-view/analytics",className:`block px-3 py-2 rounded-md text-base font-medium ${"/admin-view/analytics"===m?"bg-gray-800 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white"}`,children:"Analytics"}),(0,s.jsx)(o(),{href:"/",className:"block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white",children:"View Survey"}),(0,s.jsxs)("div",{className:"pt-4 pb-3 border-t border-gray-700",children:[(0,s.jsx)("div",{className:"flex items-center px-5",children:(0,s.jsxs)("div",{className:"ml-3",children:[(0,s.jsx)("div",{className:"text-base font-medium leading-none text-white",children:"Admin User"}),(0,s.jsx)("div",{className:"text-sm font-medium leading-none text-gray-400",children:r?.email})]})}),(0,s.jsx)("div",{className:"mt-3 px-2 space-y-1",children:(0,s.jsx)("button",{onClick:p,className:"block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700",children:"Sign out"})})]})]})})]}),(0,s.jsx)("main",{className:"max-w-7xl mx-auto py-6 sm:px-6 lg:px-8",children:e})]}):null}},54819:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>p});var s=t(45512),a=t(58009),i=t(79334),n=t(77141),o=t(1564),d=t(39400),l=t(64590),c=t(77722),u=t(17184);let m=(0,t(41680).A)("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]),x=["dlprwz@gmail.com","ishan@kreo-tech.com","admin@kreo-tech.com"];function p(){let[e,r]=(0,a.useState)(!1),[t,p]=(0,a.useState)(null),[h,f]=(0,a.useState)(""),[g,v]=(0,a.useState)(""),y=(0,i.useRouter)(),b=async e=>{e.preventDefault(),r(!0),p(null);try{let e=await (0,o.x9)(n.j,h,g);e.user&&e.user.email&&(x.includes(e.user.email)?y.push("/admin-view/dashboard"):(await n.j.signOut(),p("You do not have permission to access the admin panel.")))}catch(e){console.error("Error signing in:",e),e&&"object"==typeof e&&"code"in e?"auth/invalid-credential"===e.code||"auth/wrong-password"===e.code?p("Invalid email or password. Please try again."):"auth/user-not-found"===e.code?p("No account found with this email."):"auth/too-many-requests"===e.code?p("Too many failed login attempts. Please try again later."):p(`Failed to sign in: ${e.code}. Please try again.`):p("Failed to sign in. Please try again.")}finally{r(!1)}};return(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4",children:(0,s.jsxs)(l.Zp,{className:"w-full max-w-md bg-white/10 backdrop-blur-md border-gray-800",children:[(0,s.jsxs)(l.aR,{className:"text-center",children:[(0,s.jsx)(l.ZB,{className:"text-2xl font-bold text-white",children:"Kreo Admin Panel"}),(0,s.jsx)(l.BT,{className:"text-gray-300",children:"Sign in to access the survey dashboard"})]}),(0,s.jsxs)(l.Wu,{children:[(0,s.jsx)("div",{className:"flex justify-center mb-6",children:(0,s.jsx)("div",{className:"w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center",children:(0,s.jsx)("span",{className:"text-3xl font-bold text-white",children:"KG"})})}),t&&(0,s.jsxs)("div",{className:"bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4 flex items-start gap-2",children:[(0,s.jsx)(m,{className:"h-5 w-5 mt-0.5 flex-shrink-0"}),(0,s.jsx)("span",{children:t})]}),(0,s.jsxs)("form",{onSubmit:b,className:"space-y-4",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(u.J,{htmlFor:"email",className:"text-gray-200",children:"Email"}),(0,s.jsx)(c.p,{id:"email",type:"email",value:h,onChange:e=>f(e.target.value),placeholder:"admin@example.com",required:!0,className:"bg-gray-800/50 border-gray-700 text-white"})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[(0,s.jsx)(u.J,{htmlFor:"password",className:"text-gray-200",children:"Password"}),(0,s.jsx)(c.p,{id:"password",type:"password",value:g,onChange:e=>v(e.target.value),placeholder:"••••••••",required:!0,className:"bg-gray-800/50 border-gray-700 text-white"})]}),(0,s.jsx)(d.$,{type:"submit",disabled:e,className:"w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg",children:e?"Signing in...":"Sign In"})]})]}),(0,s.jsx)(l.wL,{className:"text-center text-gray-400 text-sm",children:"Only authorized personnel can access this dashboard"})]})})}},39400:(e,r,t)=>{"use strict";t.d(r,{$:()=>l});var s=t(45512),a=t(58009),i=t(12705),n=t(21643),o=t(44195);let d=(0,n.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),l=a.forwardRef(({className:e,variant:r,size:t,asChild:a=!1,...n},l)=>{let c=a?i.DX:"button";return(0,s.jsx)(c,{className:(0,o.cn)(d({variant:r,size:t,className:e})),ref:l,...n})});l.displayName="Button"},64590:(e,r,t)=>{"use strict";t.d(r,{BT:()=>l,Wu:()=>c,ZB:()=>d,Zp:()=>n,aR:()=>o,wL:()=>u});var s=t(45512),a=t(58009),i=t(44195);let n=a.forwardRef(({className:e,...r},t)=>(0,s.jsx)("div",{ref:t,className:(0,i.cn)("rounded-xl border bg-card text-card-foreground shadow",e),...r}));n.displayName="Card";let o=a.forwardRef(({className:e,...r},t)=>(0,s.jsx)("div",{ref:t,className:(0,i.cn)("flex flex-col space-y-1.5 p-6",e),...r}));o.displayName="CardHeader";let d=a.forwardRef(({className:e,...r},t)=>(0,s.jsx)("div",{ref:t,className:(0,i.cn)("font-semibold leading-none tracking-tight",e),...r}));d.displayName="CardTitle";let l=a.forwardRef(({className:e,...r},t)=>(0,s.jsx)("div",{ref:t,className:(0,i.cn)("text-sm text-muted-foreground",e),...r}));l.displayName="CardDescription";let c=a.forwardRef(({className:e,...r},t)=>(0,s.jsx)("div",{ref:t,className:(0,i.cn)("p-6 pt-0",e),...r}));c.displayName="CardContent";let u=a.forwardRef(({className:e,...r},t)=>(0,s.jsx)("div",{ref:t,className:(0,i.cn)("flex items-center p-6 pt-0",e),...r}));u.displayName="CardFooter"},77722:(e,r,t)=>{"use strict";t.d(r,{p:()=>n});var s=t(45512),a=t(58009),i=t(44195);let n=a.forwardRef(({className:e,type:r,...t},a)=>(0,s.jsx)("input",{type:r,className:(0,i.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:a,...t}));n.displayName="Input"},17184:(e,r,t)=>{"use strict";t.d(r,{J:()=>c});var s=t(45512),a=t(58009),i=t(30830),n=a.forwardRef((e,r)=>(0,s.jsx)(i.sG.label,{...e,ref:r,onMouseDown:r=>{r.target.closest("button, input, select, textarea")||(e.onMouseDown?.(r),!r.defaultPrevented&&r.detail>1&&r.preventDefault())}}));n.displayName="Label";var o=t(21643),d=t(44195);let l=(0,o.F)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=a.forwardRef(({className:e,...r},t)=>(0,s.jsx)(n,{ref:t,className:(0,d.cn)(l(),e),...r}));c.displayName=n.displayName},44195:(e,r,t)=>{"use strict";t.d(r,{cn:()=>i});var s=t(82281),a=t(94805);function i(...e){return(0,a.QP)((0,s.$)(e))}},64540:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});let s=(0,t(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"D:\\\\Kreoo\\\\kreo-gamer-survey\\\\src\\\\app\\\\admin-view\\\\layout.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"D:\\Kreoo\\kreo-gamer-survey\\src\\app\\admin-view\\layout.tsx","default")},42905:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});let s=(0,t(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"D:\\\\Kreoo\\\\kreo-gamer-survey\\\\src\\\\app\\\\admin-view\\\\login\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"D:\\Kreoo\\kreo-gamer-survey\\src\\app\\admin-view\\login\\page.tsx","default")},30830:(e,r,t)=>{"use strict";t.d(r,{hO:()=>d,sG:()=>o});var s=t(58009),a=t(55740),i=t(12705),n=t(45512),o=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,r)=>{let t=s.forwardRef((e,t)=>{let{asChild:s,...a}=e,o=s?i.DX:r;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,n.jsx)(o,{...a,ref:t})});return t.displayName=`Primitive.${r}`,{...e,[r]:t}},{});function d(e,r){e&&a.flushSync(()=>e.dispatchEvent(r))}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[438,267,531,702],()=>t(14109));module.exports=s})();