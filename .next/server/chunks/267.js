"use strict";exports.id=267,exports.ids=[267],exports.modules={29952:(e,r,o)=>{o.d(r,{s:()=>s,t:()=>l});var t=o(58009);function n(e,r){if("function"==typeof e)return e(r);null!=e&&(e.current=r)}function l(...e){return r=>{let o=!1,t=e.map(e=>{let t=n(e,r);return o||"function"!=typeof t||(o=!0),t});if(o)return()=>{for(let r=0;r<t.length;r++){let o=t[r];"function"==typeof o?o():n(e[r],null)}}}}function s(...e){return t.useCallback(l(...e),e)}},12705:(e,r,o)=>{o.d(r,{DX:()=>s});var t=o(58009),n=o(29952),l=o(45512),s=t.forwardRef((e,r)=>{let{children:o,...n}=e,s=t.Children.toArray(o),a=s.find(d);if(a){let e=a.props.children,o=s.map(r=>r!==a?r:t.Children.count(e)>1?t.Children.only(null):t.isValidElement(e)?e.props.children:null);return(0,l.jsx)(i,{...n,ref:r,children:t.isValidElement(e)?t.cloneElement(e,void 0,o):null})}return(0,l.jsx)(i,{...n,ref:r,children:o})});s.displayName="Slot";var i=t.forwardRef((e,r)=>{let{children:o,...l}=e;if(t.isValidElement(o)){let e=function(e){let r=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,o=r&&"isReactWarning"in r&&r.isReactWarning;return o?e.ref:(o=(r=Object.getOwnPropertyDescriptor(e,"ref")?.get)&&"isReactWarning"in r&&r.isReactWarning)?e.props.ref:e.props.ref||e.ref}(o),s=function(e,r){let o={...r};for(let t in r){let n=e[t],l=r[t];/^on[A-Z]/.test(t)?n&&l?o[t]=(...e)=>{l(...e),n(...e)}:n&&(o[t]=n):"style"===t?o[t]={...n,...l}:"className"===t&&(o[t]=[n,l].filter(Boolean).join(" "))}return{...e,...o}}(l,o.props);return o.type!==t.Fragment&&(s.ref=r?(0,n.t)(r,e):e),t.cloneElement(o,s)}return t.Children.count(o)>1?t.Children.only(null):null});i.displayName="SlotClone";var a=({children:e})=>(0,l.jsx)(l.Fragment,{children:e});function d(e){return t.isValidElement(e)&&e.type===a}},21643:(e,r,o)=>{o.d(r,{F:()=>s});var t=o(82281);let n=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,l=t.$,s=(e,r)=>o=>{var t;if((null==r?void 0:r.variants)==null)return l(e,null==o?void 0:o.class,null==o?void 0:o.className);let{variants:s,defaultVariants:i}=r,a=Object.keys(s).map(e=>{let r=null==o?void 0:o[e],t=null==i?void 0:i[e];if(null===r)return null;let l=n(r)||n(t);return s[e][l]}),d=o&&Object.entries(o).reduce((e,r)=>{let[o,t]=r;return void 0===t||(e[o]=t),e},{});return l(e,a,null==r?void 0:null===(t=r.compoundVariants)||void 0===t?void 0:t.reduce((e,r)=>{let{class:o,className:t,...n}=r;return Object.entries(n).every(e=>{let[r,o]=e;return Array.isArray(o)?o.includes({...i,...d}[r]):({...i,...d})[r]===o})?[...e,o,t]:e},[]),null==o?void 0:o.class,null==o?void 0:o.className)}},82281:(e,r,o)=>{o.d(r,{$:()=>t});function t(){for(var e,r,o=0,t="",n=arguments.length;o<n;o++)(e=arguments[o])&&(r=function e(r){var o,t,n="";if("string"==typeof r||"number"==typeof r)n+=r;else if("object"==typeof r){if(Array.isArray(r)){var l=r.length;for(o=0;o<l;o++)r[o]&&(t=e(r[o]))&&(n&&(n+=" "),n+=t)}else for(t in r)r[t]&&(n&&(n+=" "),n+=t)}return n}(e))&&(t&&(t+=" "),t+=r);return t}},94805:(e,r,o)=>{o.d(r,{QP:()=>eu});let t=e=>{let r=i(e),{conflictingClassGroups:o,conflictingClassGroupModifiers:t}=e;return{getClassGroupId:e=>{let o=e.split("-");return""===o[0]&&1!==o.length&&o.shift(),n(o,r)||s(e)},getConflictingClassGroupIds:(e,r)=>{let n=o[e]||[];return r&&t[e]?[...n,...t[e]]:n}}},n=(e,r)=>{if(0===e.length)return r.classGroupId;let o=e[0],t=r.nextPart.get(o),l=t?n(e.slice(1),t):void 0;if(l)return l;if(0===r.validators.length)return;let s=e.join("-");return r.validators.find(({validator:e})=>e(s))?.classGroupId},l=/^\[(.+)\]$/,s=e=>{if(l.test(e)){let r=l.exec(e)[1],o=r?.substring(0,r.indexOf(":"));if(o)return"arbitrary.."+o}},i=e=>{let{theme:r,classGroups:o}=e,t={nextPart:new Map,validators:[]};for(let e in o)a(o[e],t,e,r);return t},a=(e,r,o,t)=>{e.forEach(e=>{if("string"==typeof e){(""===e?r:d(r,e)).classGroupId=o;return}if("function"==typeof e){if(c(e)){a(e(t),r,o,t);return}r.validators.push({validator:e,classGroupId:o});return}Object.entries(e).forEach(([e,n])=>{a(n,d(r,e),o,t)})})},d=(e,r)=>{let o=e;return r.split("-").forEach(e=>{o.nextPart.has(e)||o.nextPart.set(e,{nextPart:new Map,validators:[]}),o=o.nextPart.get(e)}),o},c=e=>e.isThemeGetter,u=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let r=0,o=new Map,t=new Map,n=(n,l)=>{o.set(n,l),++r>e&&(r=0,t=o,o=new Map)};return{get(e){let r=o.get(e);return void 0!==r?r:void 0!==(r=t.get(e))?(n(e,r),r):void 0},set(e,r){o.has(e)?o.set(e,r):n(e,r)}}},p=e=>{let{prefix:r,experimentalParseClassName:o}=e,t=e=>{let r;let o=[],t=0,n=0,l=0;for(let s=0;s<e.length;s++){let i=e[s];if(0===t&&0===n){if(":"===i){o.push(e.slice(l,s)),l=s+1;continue}if("/"===i){r=s;continue}}"["===i?t++:"]"===i?t--:"("===i?n++:")"===i&&n--}let s=0===o.length?e:e.substring(l),i=b(s);return{modifiers:o,hasImportantModifier:i!==s,baseClassName:i,maybePostfixModifierPosition:r&&r>l?r-l:void 0}};if(r){let e=r+":",o=t;t=r=>r.startsWith(e)?o(r.substring(e.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:r,maybePostfixModifierPosition:void 0}}if(o){let e=t;t=r=>o({className:r,parseClassName:e})}return t},b=e=>e.endsWith("!")?e.substring(0,e.length-1):e.startsWith("!")?e.substring(1):e,f=e=>{let r=Object.fromEntries(e.orderSensitiveModifiers.map(e=>[e,!0]));return e=>{if(e.length<=1)return e;let o=[],t=[];return e.forEach(e=>{"["===e[0]||r[e]?(o.push(...t.sort(),e),t=[]):t.push(e)}),o.push(...t.sort()),o}},m=e=>({cache:u(e.cacheSize),parseClassName:p(e),sortModifiers:f(e),...t(e)}),g=/\s+/,h=(e,r)=>{let{parseClassName:o,getClassGroupId:t,getConflictingClassGroupIds:n,sortModifiers:l}=r,s=[],i=e.trim().split(g),a="";for(let e=i.length-1;e>=0;e-=1){let r=i[e],{isExternal:d,modifiers:c,hasImportantModifier:u,baseClassName:p,maybePostfixModifierPosition:b}=o(r);if(d){a=r+(a.length>0?" "+a:a);continue}let f=!!b,m=t(f?p.substring(0,b):p);if(!m){if(!f||!(m=t(p))){a=r+(a.length>0?" "+a:a);continue}f=!1}let g=l(c).join(":"),h=u?g+"!":g,x=h+m;if(s.includes(x))continue;s.push(x);let v=n(m,f);for(let e=0;e<v.length;++e){let r=v[e];s.push(h+r)}a=r+(a.length>0?" "+a:a)}return a};function x(){let e,r,o=0,t="";for(;o<arguments.length;)(e=arguments[o++])&&(r=v(e))&&(t&&(t+=" "),t+=r);return t}let v=e=>{let r;if("string"==typeof e)return e;let o="";for(let t=0;t<e.length;t++)e[t]&&(r=v(e[t]))&&(o&&(o+=" "),o+=r);return o},w=e=>{let r=r=>r[e]||[];return r.isThemeGetter=!0,r},y=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,k=/^\((?:(\w[\w-]*):)?(.+)\)$/i,z=/^\d+\/\d+$/,j=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,C=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,N=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,M=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,P=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,E=e=>z.test(e),$=e=>!!e&&!Number.isNaN(Number(e)),G=e=>!!e&&Number.isInteger(Number(e)),O=e=>e.endsWith("%")&&$(e.slice(0,-1)),S=e=>j.test(e),I=()=>!0,W=e=>C.test(e)&&!N.test(e),A=()=>!1,R=e=>M.test(e),V=e=>P.test(e),D=e=>!T(e)&&!Z(e),F=e=>ee(e,es,A),T=e=>y.test(e),q=e=>ee(e,ei,W),_=e=>ee(e,ea,$),B=e=>ee(e,eo,A),Q=e=>ee(e,en,V),X=e=>ee(e,A,R),Z=e=>k.test(e),H=e=>er(e,ei),J=e=>er(e,ed),K=e=>er(e,eo),L=e=>er(e,es),U=e=>er(e,en),Y=e=>er(e,ec,!0),ee=(e,r,o)=>{let t=y.exec(e);return!!t&&(t[1]?r(t[1]):o(t[2]))},er=(e,r,o=!1)=>{let t=k.exec(e);return!!t&&(t[1]?r(t[1]):o)},eo=e=>"position"===e,et=new Set(["image","url"]),en=e=>et.has(e),el=new Set(["length","size","percentage"]),es=e=>el.has(e),ei=e=>"length"===e,ea=e=>"number"===e,ed=e=>"family-name"===e,ec=e=>"shadow"===e;Symbol.toStringTag;let eu=function(e,...r){let o,t,n;let l=function(i){return t=(o=m(r.reduce((e,r)=>r(e),e()))).cache.get,n=o.cache.set,l=s,s(i)};function s(e){let r=t(e);if(r)return r;let l=h(e,o);return n(e,l),l}return function(){return l(x.apply(null,arguments))}}(()=>{let e=w("color"),r=w("font"),o=w("text"),t=w("font-weight"),n=w("tracking"),l=w("leading"),s=w("breakpoint"),i=w("container"),a=w("spacing"),d=w("radius"),c=w("shadow"),u=w("inset-shadow"),p=w("drop-shadow"),b=w("blur"),f=w("perspective"),m=w("aspect"),g=w("ease"),h=w("animate"),x=()=>["auto","avoid","all","avoid-page","page","left","right","column"],v=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],y=()=>["auto","hidden","clip","visible","scroll"],k=()=>["auto","contain","none"],z=()=>[Z,T,a],j=()=>[E,"full","auto",...z()],C=()=>[G,"none","subgrid",Z,T],N=()=>["auto",{span:["full",G,Z,T]},Z,T],M=()=>[G,"auto",Z,T],P=()=>["auto","min","max","fr",Z,T],W=()=>["start","end","center","between","around","evenly","stretch","baseline"],A=()=>["start","end","center","stretch"],R=()=>["auto",...z()],V=()=>[E,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...z()],ee=()=>[e,Z,T],er=()=>[O,q],eo=()=>["","none","full",d,Z,T],et=()=>["",$,H,q],en=()=>["solid","dashed","dotted","double"],el=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],es=()=>["","none",b,Z,T],ei=()=>["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",Z,T],ea=()=>["none",$,Z,T],ed=()=>["none",$,Z,T],ec=()=>[$,Z,T],eu=()=>[E,"full",...z()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[S],breakpoint:[S],color:[I],container:[S],"drop-shadow":[S],ease:["in","out","in-out"],font:[D],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[S],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[S],shadow:[S],spacing:["px",$],text:[S],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",E,T,Z,m]}],container:["container"],columns:[{columns:[$,T,Z,i]}],"break-after":[{"break-after":x()}],"break-before":[{"break-before":x()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...v(),T,Z]}],overflow:[{overflow:y()}],"overflow-x":[{"overflow-x":y()}],"overflow-y":[{"overflow-y":y()}],overscroll:[{overscroll:k()}],"overscroll-x":[{"overscroll-x":k()}],"overscroll-y":[{"overscroll-y":k()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:j()}],"inset-x":[{"inset-x":j()}],"inset-y":[{"inset-y":j()}],start:[{start:j()}],end:[{end:j()}],top:[{top:j()}],right:[{right:j()}],bottom:[{bottom:j()}],left:[{left:j()}],visibility:["visible","invisible","collapse"],z:[{z:[G,"auto",Z,T]}],basis:[{basis:[E,"full","auto",i,...z()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[$,E,"auto","initial","none",T]}],grow:[{grow:["",$,Z,T]}],shrink:[{shrink:["",$,Z,T]}],order:[{order:[G,"first","last","none",Z,T]}],"grid-cols":[{"grid-cols":C()}],"col-start-end":[{col:N()}],"col-start":[{"col-start":M()}],"col-end":[{"col-end":M()}],"grid-rows":[{"grid-rows":C()}],"row-start-end":[{row:N()}],"row-start":[{"row-start":M()}],"row-end":[{"row-end":M()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":P()}],"auto-rows":[{"auto-rows":P()}],gap:[{gap:z()}],"gap-x":[{"gap-x":z()}],"gap-y":[{"gap-y":z()}],"justify-content":[{justify:[...W(),"normal"]}],"justify-items":[{"justify-items":[...A(),"normal"]}],"justify-self":[{"justify-self":["auto",...A()]}],"align-content":[{content:["normal",...W()]}],"align-items":[{items:[...A(),"baseline"]}],"align-self":[{self:["auto",...A(),"baseline"]}],"place-content":[{"place-content":W()}],"place-items":[{"place-items":[...A(),"baseline"]}],"place-self":[{"place-self":["auto",...A()]}],p:[{p:z()}],px:[{px:z()}],py:[{py:z()}],ps:[{ps:z()}],pe:[{pe:z()}],pt:[{pt:z()}],pr:[{pr:z()}],pb:[{pb:z()}],pl:[{pl:z()}],m:[{m:R()}],mx:[{mx:R()}],my:[{my:R()}],ms:[{ms:R()}],me:[{me:R()}],mt:[{mt:R()}],mr:[{mr:R()}],mb:[{mb:R()}],ml:[{ml:R()}],"space-x":[{"space-x":z()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":z()}],"space-y-reverse":["space-y-reverse"],size:[{size:V()}],w:[{w:[i,"screen",...V()]}],"min-w":[{"min-w":[i,"screen","none",...V()]}],"max-w":[{"max-w":[i,"screen","none","prose",{screen:[s]},...V()]}],h:[{h:["screen",...V()]}],"min-h":[{"min-h":["screen","none",...V()]}],"max-h":[{"max-h":["screen",...V()]}],"font-size":[{text:["base",o,H,q]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[t,Z,_]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",O,T]}],"font-family":[{font:[J,T,r]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[n,Z,T]}],"line-clamp":[{"line-clamp":[$,"none",Z,_]}],leading:[{leading:[l,...z()]}],"list-image":[{"list-image":["none",Z,T]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",Z,T]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:ee()}],"text-color":[{text:ee()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...en(),"wavy"]}],"text-decoration-thickness":[{decoration:[$,"from-font","auto",Z,q]}],"text-decoration-color":[{decoration:ee()}],"underline-offset":[{"underline-offset":[$,"auto",Z,T]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:z()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",Z,T]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",Z,T]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...v(),K,B]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","space","round"]}]}],"bg-size":[{bg:["auto","cover","contain",L,F]}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},G,Z,T],radial:["",Z,T],conic:[G,Z,T]},U,Q]}],"bg-color":[{bg:ee()}],"gradient-from-pos":[{from:er()}],"gradient-via-pos":[{via:er()}],"gradient-to-pos":[{to:er()}],"gradient-from":[{from:ee()}],"gradient-via":[{via:ee()}],"gradient-to":[{to:ee()}],rounded:[{rounded:eo()}],"rounded-s":[{"rounded-s":eo()}],"rounded-e":[{"rounded-e":eo()}],"rounded-t":[{"rounded-t":eo()}],"rounded-r":[{"rounded-r":eo()}],"rounded-b":[{"rounded-b":eo()}],"rounded-l":[{"rounded-l":eo()}],"rounded-ss":[{"rounded-ss":eo()}],"rounded-se":[{"rounded-se":eo()}],"rounded-ee":[{"rounded-ee":eo()}],"rounded-es":[{"rounded-es":eo()}],"rounded-tl":[{"rounded-tl":eo()}],"rounded-tr":[{"rounded-tr":eo()}],"rounded-br":[{"rounded-br":eo()}],"rounded-bl":[{"rounded-bl":eo()}],"border-w":[{border:et()}],"border-w-x":[{"border-x":et()}],"border-w-y":[{"border-y":et()}],"border-w-s":[{"border-s":et()}],"border-w-e":[{"border-e":et()}],"border-w-t":[{"border-t":et()}],"border-w-r":[{"border-r":et()}],"border-w-b":[{"border-b":et()}],"border-w-l":[{"border-l":et()}],"divide-x":[{"divide-x":et()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":et()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...en(),"hidden","none"]}],"divide-style":[{divide:[...en(),"hidden","none"]}],"border-color":[{border:ee()}],"border-color-x":[{"border-x":ee()}],"border-color-y":[{"border-y":ee()}],"border-color-s":[{"border-s":ee()}],"border-color-e":[{"border-e":ee()}],"border-color-t":[{"border-t":ee()}],"border-color-r":[{"border-r":ee()}],"border-color-b":[{"border-b":ee()}],"border-color-l":[{"border-l":ee()}],"divide-color":[{divide:ee()}],"outline-style":[{outline:[...en(),"none","hidden"]}],"outline-offset":[{"outline-offset":[$,Z,T]}],"outline-w":[{outline:["",$,H,q]}],"outline-color":[{outline:[e]}],shadow:[{shadow:["","none",c,Y,X]}],"shadow-color":[{shadow:ee()}],"inset-shadow":[{"inset-shadow":["none",Z,T,u]}],"inset-shadow-color":[{"inset-shadow":ee()}],"ring-w":[{ring:et()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:ee()}],"ring-offset-w":[{"ring-offset":[$,q]}],"ring-offset-color":[{"ring-offset":ee()}],"inset-ring-w":[{"inset-ring":et()}],"inset-ring-color":[{"inset-ring":ee()}],opacity:[{opacity:[$,Z,T]}],"mix-blend":[{"mix-blend":[...el(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":el()}],filter:[{filter:["","none",Z,T]}],blur:[{blur:es()}],brightness:[{brightness:[$,Z,T]}],contrast:[{contrast:[$,Z,T]}],"drop-shadow":[{"drop-shadow":["","none",p,Z,T]}],grayscale:[{grayscale:["",$,Z,T]}],"hue-rotate":[{"hue-rotate":[$,Z,T]}],invert:[{invert:["",$,Z,T]}],saturate:[{saturate:[$,Z,T]}],sepia:[{sepia:["",$,Z,T]}],"backdrop-filter":[{"backdrop-filter":["","none",Z,T]}],"backdrop-blur":[{"backdrop-blur":es()}],"backdrop-brightness":[{"backdrop-brightness":[$,Z,T]}],"backdrop-contrast":[{"backdrop-contrast":[$,Z,T]}],"backdrop-grayscale":[{"backdrop-grayscale":["",$,Z,T]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[$,Z,T]}],"backdrop-invert":[{"backdrop-invert":["",$,Z,T]}],"backdrop-opacity":[{"backdrop-opacity":[$,Z,T]}],"backdrop-saturate":[{"backdrop-saturate":[$,Z,T]}],"backdrop-sepia":[{"backdrop-sepia":["",$,Z,T]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":z()}],"border-spacing-x":[{"border-spacing-x":z()}],"border-spacing-y":[{"border-spacing-y":z()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",Z,T]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[$,"initial",Z,T]}],ease:[{ease:["linear","initial",g,Z,T]}],delay:[{delay:[$,Z,T]}],animate:[{animate:["none",h,Z,T]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[f,Z,T]}],"perspective-origin":[{"perspective-origin":ei()}],rotate:[{rotate:ea()}],"rotate-x":[{"rotate-x":ea()}],"rotate-y":[{"rotate-y":ea()}],"rotate-z":[{"rotate-z":ea()}],scale:[{scale:ed()}],"scale-x":[{"scale-x":ed()}],"scale-y":[{"scale-y":ed()}],"scale-z":[{"scale-z":ed()}],"scale-3d":["scale-3d"],skew:[{skew:ec()}],"skew-x":[{"skew-x":ec()}],"skew-y":[{"skew-y":ec()}],transform:[{transform:[Z,T,"","none","gpu","cpu"]}],"transform-origin":[{origin:ei()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:eu()}],"translate-x":[{"translate-x":eu()}],"translate-y":[{"translate-y":eu()}],"translate-z":[{"translate-z":eu()}],"translate-none":["translate-none"],accent:[{accent:ee()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:ee()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",Z,T]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":z()}],"scroll-mx":[{"scroll-mx":z()}],"scroll-my":[{"scroll-my":z()}],"scroll-ms":[{"scroll-ms":z()}],"scroll-me":[{"scroll-me":z()}],"scroll-mt":[{"scroll-mt":z()}],"scroll-mr":[{"scroll-mr":z()}],"scroll-mb":[{"scroll-mb":z()}],"scroll-ml":[{"scroll-ml":z()}],"scroll-p":[{"scroll-p":z()}],"scroll-px":[{"scroll-px":z()}],"scroll-py":[{"scroll-py":z()}],"scroll-ps":[{"scroll-ps":z()}],"scroll-pe":[{"scroll-pe":z()}],"scroll-pt":[{"scroll-pt":z()}],"scroll-pr":[{"scroll-pr":z()}],"scroll-pb":[{"scroll-pb":z()}],"scroll-pl":[{"scroll-pl":z()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",Z,T]}],fill:[{fill:["none",...ee()]}],"stroke-w":[{stroke:[$,H,q,_]}],stroke:[{stroke:["none",...ee()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["before","after","placeholder","file","marker","selection","first-line","first-letter","backdrop","*","**"]}})}};