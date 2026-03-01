"use strict";(()=>{var Xs=Object.create;var or=Object.defineProperty;var aa=Object.getOwnPropertyDescriptor;var Zs=Object.getOwnPropertyNames;var Js=Object.getPrototypeOf,Qs=Object.prototype.hasOwnProperty;var en=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),tn=(r,e)=>{for(var t in e)or(r,t,{get:e[t],enumerable:!0})},rn=(r,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Zs(e))!Qs.call(r,o)&&o!==t&&or(r,o,{get:()=>e[o],enumerable:!(i=aa(e,o))||i.enumerable});return r};var on=(r,e,t)=>(t=r!=null?Xs(Js(r)):{},rn(e||!r||!r.__esModule?or(t,"default",{value:r,enumerable:!0}):t,r));var g=(r,e,t,i)=>{for(var o=i>1?void 0:i?aa(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(o=(i?s(e,t,o):s(o))||o);return i&&o&&or(e,t,o),o};var Us=en((S_,$t)=>{var y=function(){this.Diff_Timeout=1,this.Diff_EditCost=4,this.Match_Threshold=.5,this.Match_Distance=1e3,this.Patch_DeleteThreshold=.5,this.Patch_Margin=4,this.Match_MaxBits=32},j=-1,G=1,N=0;y.Diff=function(r,e){return[r,e]};y.prototype.diff_main=function(r,e,t,i){typeof i>"u"&&(this.Diff_Timeout<=0?i=Number.MAX_VALUE:i=new Date().getTime()+this.Diff_Timeout*1e3);var o=i;if(r==null||e==null)throw new Error("Null input. (diff_main)");if(r==e)return r?[new y.Diff(N,r)]:[];typeof t>"u"&&(t=!0);var a=t,s=this.diff_commonPrefix(r,e),l=r.substring(0,s);r=r.substring(s),e=e.substring(s),s=this.diff_commonSuffix(r,e);var c=r.substring(r.length-s);r=r.substring(0,r.length-s),e=e.substring(0,e.length-s);var h=this.diff_compute_(r,e,a,o);return l&&h.unshift(new y.Diff(N,l)),c&&h.push(new y.Diff(N,c)),this.diff_cleanupMerge(h),h};y.prototype.diff_compute_=function(r,e,t,i){var o;if(!r)return[new y.Diff(G,e)];if(!e)return[new y.Diff(j,r)];var a=r.length>e.length?r:e,s=r.length>e.length?e:r,l=a.indexOf(s);if(l!=-1)return o=[new y.Diff(G,a.substring(0,l)),new y.Diff(N,s),new y.Diff(G,a.substring(l+s.length))],r.length>e.length&&(o[0][0]=o[2][0]=j),o;if(s.length==1)return[new y.Diff(j,r),new y.Diff(G,e)];var c=this.diff_halfMatch_(r,e);if(c){var h=c[0],u=c[1],f=c[2],b=c[3],m=c[4],E=this.diff_main(h,f,t,i),S=this.diff_main(u,b,t,i);return E.concat([new y.Diff(N,m)],S)}return t&&r.length>100&&e.length>100?this.diff_lineMode_(r,e,i):this.diff_bisect_(r,e,i)};y.prototype.diff_lineMode_=function(r,e,t){var i=this.diff_linesToChars_(r,e);r=i.chars1,e=i.chars2;var o=i.lineArray,a=this.diff_main(r,e,!1,t);this.diff_charsToLines_(a,o),this.diff_cleanupSemantic(a),a.push(new y.Diff(N,""));for(var s=0,l=0,c=0,h="",u="";s<a.length;){switch(a[s][0]){case G:c++,u+=a[s][1];break;case j:l++,h+=a[s][1];break;case N:if(l>=1&&c>=1){a.splice(s-l-c,l+c),s=s-l-c;for(var f=this.diff_main(h,u,!1,t),b=f.length-1;b>=0;b--)a.splice(s,0,f[b]);s=s+f.length}c=0,l=0,h="",u="";break}s++}return a.pop(),a};y.prototype.diff_bisect_=function(r,e,t){for(var i=r.length,o=e.length,a=Math.ceil((i+o)/2),s=a,l=2*a,c=new Array(l),h=new Array(l),u=0;u<l;u++)c[u]=-1,h[u]=-1;c[s+1]=0,h[s+1]=0;for(var f=i-o,b=f%2!=0,m=0,E=0,S=0,O=0,$=0;$<a&&!(new Date().getTime()>t);$++){for(var T=-$+m;T<=$-E;T+=2){var R=s+T,L;T==-$||T!=$&&c[R-1]<c[R+1]?L=c[R+1]:L=c[R-1]+1;for(var P=L-T;L<i&&P<o&&r.charAt(L)==e.charAt(P);)L++,P++;if(c[R]=L,L>i)E+=2;else if(P>o)m+=2;else if(b){var I=s+f-T;if(I>=0&&I<l&&h[I]!=-1){var A=i-h[I];if(L>=A)return this.diff_bisectSplit_(r,e,L,P,t)}}}for(var C=-$+S;C<=$-O;C+=2){var I=s+C,A;C==-$||C!=$&&h[I-1]<h[I+1]?A=h[I+1]:A=h[I-1]+1;for(var W=A-C;A<i&&W<o&&r.charAt(i-A-1)==e.charAt(o-W-1);)A++,W++;if(h[I]=A,A>i)O+=2;else if(W>o)S+=2;else if(!b){var R=s+f-C;if(R>=0&&R<l&&c[R]!=-1){var L=c[R],P=s+L-R;if(A=i-A,L>=A)return this.diff_bisectSplit_(r,e,L,P,t)}}}}return[new y.Diff(j,r),new y.Diff(G,e)]};y.prototype.diff_bisectSplit_=function(r,e,t,i,o){var a=r.substring(0,t),s=e.substring(0,i),l=r.substring(t),c=e.substring(i),h=this.diff_main(a,s,!1,o),u=this.diff_main(l,c,!1,o);return h.concat(u)};y.prototype.diff_linesToChars_=function(r,e){var t=[],i={};t[0]="";function o(c){for(var h="",u=0,f=-1,b=t.length;f<c.length-1;){f=c.indexOf(`
`,u),f==-1&&(f=c.length-1);var m=c.substring(u,f+1);(i.hasOwnProperty?i.hasOwnProperty(m):i[m]!==void 0)?h+=String.fromCharCode(i[m]):(b==a&&(m=c.substring(u),f=c.length),h+=String.fromCharCode(b),i[m]=b,t[b++]=m),u=f+1}return h}var a=4e4,s=o(r);a=65535;var l=o(e);return{chars1:s,chars2:l,lineArray:t}};y.prototype.diff_charsToLines_=function(r,e){for(var t=0;t<r.length;t++){for(var i=r[t][1],o=[],a=0;a<i.length;a++)o[a]=e[i.charCodeAt(a)];r[t][1]=o.join("")}};y.prototype.diff_commonPrefix=function(r,e){if(!r||!e||r.charAt(0)!=e.charAt(0))return 0;for(var t=0,i=Math.min(r.length,e.length),o=i,a=0;t<o;)r.substring(a,o)==e.substring(a,o)?(t=o,a=t):i=o,o=Math.floor((i-t)/2+t);return o};y.prototype.diff_commonSuffix=function(r,e){if(!r||!e||r.charAt(r.length-1)!=e.charAt(e.length-1))return 0;for(var t=0,i=Math.min(r.length,e.length),o=i,a=0;t<o;)r.substring(r.length-o,r.length-a)==e.substring(e.length-o,e.length-a)?(t=o,a=t):i=o,o=Math.floor((i-t)/2+t);return o};y.prototype.diff_commonOverlap_=function(r,e){var t=r.length,i=e.length;if(t==0||i==0)return 0;t>i?r=r.substring(t-i):t<i&&(e=e.substring(0,t));var o=Math.min(t,i);if(r==e)return o;for(var a=0,s=1;;){var l=r.substring(o-s),c=e.indexOf(l);if(c==-1)return a;s+=c,(c==0||r.substring(o-s)==e.substring(0,s))&&(a=s,s++)}};y.prototype.diff_halfMatch_=function(r,e){if(this.Diff_Timeout<=0)return null;var t=r.length>e.length?r:e,i=r.length>e.length?e:r;if(t.length<4||i.length*2<t.length)return null;var o=this;function a(E,S,O){for(var $=E.substring(O,O+Math.floor(E.length/4)),T=-1,R="",L,P,I,A;(T=S.indexOf($,T+1))!=-1;){var C=o.diff_commonPrefix(E.substring(O),S.substring(T)),W=o.diff_commonSuffix(E.substring(0,O),S.substring(0,T));R.length<W+C&&(R=S.substring(T-W,T)+S.substring(T,T+C),L=E.substring(0,O-W),P=E.substring(O+C),I=S.substring(0,T-W),A=S.substring(T+C))}return R.length*2>=E.length?[L,P,I,A,R]:null}var s=a(t,i,Math.ceil(t.length/4)),l=a(t,i,Math.ceil(t.length/2)),c;if(!s&&!l)return null;l?s?c=s[4].length>l[4].length?s:l:c=l:c=s;var h,u,f,b;r.length>e.length?(h=c[0],u=c[1],f=c[2],b=c[3]):(f=c[0],b=c[1],h=c[2],u=c[3]);var m=c[4];return[h,u,f,b,m]};y.prototype.diff_cleanupSemantic=function(r){for(var e=!1,t=[],i=0,o=null,a=0,s=0,l=0,c=0,h=0;a<r.length;)r[a][0]==N?(t[i++]=a,s=c,l=h,c=0,h=0,o=r[a][1]):(r[a][0]==G?c+=r[a][1].length:h+=r[a][1].length,o&&o.length<=Math.max(s,l)&&o.length<=Math.max(c,h)&&(r.splice(t[i-1],0,new y.Diff(j,o)),r[t[i-1]+1][0]=G,i--,i--,a=i>0?t[i-1]:-1,s=0,l=0,c=0,h=0,o=null,e=!0)),a++;for(e&&this.diff_cleanupMerge(r),this.diff_cleanupSemanticLossless(r),a=1;a<r.length;){if(r[a-1][0]==j&&r[a][0]==G){var u=r[a-1][1],f=r[a][1],b=this.diff_commonOverlap_(u,f),m=this.diff_commonOverlap_(f,u);b>=m?(b>=u.length/2||b>=f.length/2)&&(r.splice(a,0,new y.Diff(N,f.substring(0,b))),r[a-1][1]=u.substring(0,u.length-b),r[a+1][1]=f.substring(b),a++):(m>=u.length/2||m>=f.length/2)&&(r.splice(a,0,new y.Diff(N,u.substring(0,m))),r[a-1][0]=G,r[a-1][1]=f.substring(0,f.length-m),r[a+1][0]=j,r[a+1][1]=u.substring(m),a++),a++}a++}};y.prototype.diff_cleanupSemanticLossless=function(r){function e(m,E){if(!m||!E)return 6;var S=m.charAt(m.length-1),O=E.charAt(0),$=S.match(y.nonAlphaNumericRegex_),T=O.match(y.nonAlphaNumericRegex_),R=$&&S.match(y.whitespaceRegex_),L=T&&O.match(y.whitespaceRegex_),P=R&&S.match(y.linebreakRegex_),I=L&&O.match(y.linebreakRegex_),A=P&&m.match(y.blanklineEndRegex_),C=I&&E.match(y.blanklineStartRegex_);return A||C?5:P||I?4:$&&!R&&L?3:R||L?2:$||T?1:0}for(var t=1;t<r.length-1;){if(r[t-1][0]==N&&r[t+1][0]==N){var i=r[t-1][1],o=r[t][1],a=r[t+1][1],s=this.diff_commonSuffix(i,o);if(s){var l=o.substring(o.length-s);i=i.substring(0,i.length-s),o=l+o.substring(0,o.length-s),a=l+a}for(var c=i,h=o,u=a,f=e(i,o)+e(o,a);o.charAt(0)===a.charAt(0);){i+=o.charAt(0),o=o.substring(1)+a.charAt(0),a=a.substring(1);var b=e(i,o)+e(o,a);b>=f&&(f=b,c=i,h=o,u=a)}r[t-1][1]!=c&&(c?r[t-1][1]=c:(r.splice(t-1,1),t--),r[t][1]=h,u?r[t+1][1]=u:(r.splice(t+1,1),t--))}t++}};y.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/;y.whitespaceRegex_=/\s/;y.linebreakRegex_=/[\r\n]/;y.blanklineEndRegex_=/\n\r?\n$/;y.blanklineStartRegex_=/^\r?\n\r?\n/;y.prototype.diff_cleanupEfficiency=function(r){for(var e=!1,t=[],i=0,o=null,a=0,s=!1,l=!1,c=!1,h=!1;a<r.length;)r[a][0]==N?(r[a][1].length<this.Diff_EditCost&&(c||h)?(t[i++]=a,s=c,l=h,o=r[a][1]):(i=0,o=null),c=h=!1):(r[a][0]==j?h=!0:c=!0,o&&(s&&l&&c&&h||o.length<this.Diff_EditCost/2&&s+l+c+h==3)&&(r.splice(t[i-1],0,new y.Diff(j,o)),r[t[i-1]+1][0]=G,i--,o=null,s&&l?(c=h=!0,i=0):(i--,a=i>0?t[i-1]:-1,c=h=!1),e=!0)),a++;e&&this.diff_cleanupMerge(r)};y.prototype.diff_cleanupMerge=function(r){r.push(new y.Diff(N,""));for(var e=0,t=0,i=0,o="",a="",s;e<r.length;)switch(r[e][0]){case G:i++,a+=r[e][1],e++;break;case j:t++,o+=r[e][1],e++;break;case N:t+i>1?(t!==0&&i!==0&&(s=this.diff_commonPrefix(a,o),s!==0&&(e-t-i>0&&r[e-t-i-1][0]==N?r[e-t-i-1][1]+=a.substring(0,s):(r.splice(0,0,new y.Diff(N,a.substring(0,s))),e++),a=a.substring(s),o=o.substring(s)),s=this.diff_commonSuffix(a,o),s!==0&&(r[e][1]=a.substring(a.length-s)+r[e][1],a=a.substring(0,a.length-s),o=o.substring(0,o.length-s))),e-=t+i,r.splice(e,t+i),o.length&&(r.splice(e,0,new y.Diff(j,o)),e++),a.length&&(r.splice(e,0,new y.Diff(G,a)),e++),e++):e!==0&&r[e-1][0]==N?(r[e-1][1]+=r[e][1],r.splice(e,1)):e++,i=0,t=0,o="",a="";break}r[r.length-1][1]===""&&r.pop();var l=!1;for(e=1;e<r.length-1;)r[e-1][0]==N&&r[e+1][0]==N&&(r[e][1].substring(r[e][1].length-r[e-1][1].length)==r[e-1][1]?(r[e][1]=r[e-1][1]+r[e][1].substring(0,r[e][1].length-r[e-1][1].length),r[e+1][1]=r[e-1][1]+r[e+1][1],r.splice(e-1,1),l=!0):r[e][1].substring(0,r[e+1][1].length)==r[e+1][1]&&(r[e-1][1]+=r[e+1][1],r[e][1]=r[e][1].substring(r[e+1][1].length)+r[e+1][1],r.splice(e+1,1),l=!0)),e++;l&&this.diff_cleanupMerge(r)};y.prototype.diff_xIndex=function(r,e){var t=0,i=0,o=0,a=0,s;for(s=0;s<r.length&&(r[s][0]!==G&&(t+=r[s][1].length),r[s][0]!==j&&(i+=r[s][1].length),!(t>e));s++)o=t,a=i;return r.length!=s&&r[s][0]===j?a:a+(e-o)};y.prototype.diff_prettyHtml=function(r){for(var e=[],t=/&/g,i=/</g,o=/>/g,a=/\n/g,s=0;s<r.length;s++){var l=r[s][0],c=r[s][1],h=c.replace(t,"&amp;").replace(i,"&lt;").replace(o,"&gt;").replace(a,"&para;<br>");switch(l){case G:e[s]='<ins style="background:#e6ffe6;">'+h+"</ins>";break;case j:e[s]='<del style="background:#ffe6e6;">'+h+"</del>";break;case N:e[s]="<span>"+h+"</span>";break}}return e.join("")};y.prototype.diff_text1=function(r){for(var e=[],t=0;t<r.length;t++)r[t][0]!==G&&(e[t]=r[t][1]);return e.join("")};y.prototype.diff_text2=function(r){for(var e=[],t=0;t<r.length;t++)r[t][0]!==j&&(e[t]=r[t][1]);return e.join("")};y.prototype.diff_levenshtein=function(r){for(var e=0,t=0,i=0,o=0;o<r.length;o++){var a=r[o][0],s=r[o][1];switch(a){case G:t+=s.length;break;case j:i+=s.length;break;case N:e+=Math.max(t,i),t=0,i=0;break}}return e+=Math.max(t,i),e};y.prototype.diff_toDelta=function(r){for(var e=[],t=0;t<r.length;t++)switch(r[t][0]){case G:e[t]="+"+encodeURI(r[t][1]);break;case j:e[t]="-"+r[t][1].length;break;case N:e[t]="="+r[t][1].length;break}return e.join("	").replace(/%20/g," ")};y.prototype.diff_fromDelta=function(r,e){for(var t=[],i=0,o=0,a=e.split(/\t/g),s=0;s<a.length;s++){var l=a[s].substring(1);switch(a[s].charAt(0)){case"+":try{t[i++]=new y.Diff(G,decodeURI(l))}catch{throw new Error("Illegal escape in diff_fromDelta: "+l)}break;case"-":case"=":var c=parseInt(l,10);if(isNaN(c)||c<0)throw new Error("Invalid number in diff_fromDelta: "+l);var h=r.substring(o,o+=c);a[s].charAt(0)=="="?t[i++]=new y.Diff(N,h):t[i++]=new y.Diff(j,h);break;default:if(a[s])throw new Error("Invalid diff operation in diff_fromDelta: "+a[s])}}if(o!=r.length)throw new Error("Delta length ("+o+") does not equal source text length ("+r.length+").");return t};y.prototype.match_main=function(r,e,t){if(r==null||e==null||t==null)throw new Error("Null input. (match_main)");return t=Math.max(0,Math.min(t,r.length)),r==e?0:r.length?r.substring(t,t+e.length)==e?t:this.match_bitap_(r,e,t):-1};y.prototype.match_bitap_=function(r,e,t){if(e.length>this.Match_MaxBits)throw new Error("Pattern too long for this browser.");var i=this.match_alphabet_(e),o=this;function a(L,P){var I=L/e.length,A=Math.abs(t-P);return o.Match_Distance?I+A/o.Match_Distance:A?1:I}var s=this.Match_Threshold,l=r.indexOf(e,t);l!=-1&&(s=Math.min(a(0,l),s),l=r.lastIndexOf(e,t+e.length),l!=-1&&(s=Math.min(a(0,l),s)));var c=1<<e.length-1;l=-1;for(var h,u,f=e.length+r.length,b,m=0;m<e.length;m++){for(h=0,u=f;h<u;)a(m,t+u)<=s?h=u:f=u,u=Math.floor((f-h)/2+h);f=u;var E=Math.max(1,t-u+1),S=Math.min(t+u,r.length)+e.length,O=Array(S+2);O[S+1]=(1<<m)-1;for(var $=S;$>=E;$--){var T=i[r.charAt($-1)];if(m===0?O[$]=(O[$+1]<<1|1)&T:O[$]=(O[$+1]<<1|1)&T|((b[$+1]|b[$])<<1|1)|b[$+1],O[$]&c){var R=a(m,$-1);if(R<=s)if(s=R,l=$-1,l>t)E=Math.max(1,2*t-l);else break}}if(a(m+1,t)>s)break;b=O}return l};y.prototype.match_alphabet_=function(r){for(var e={},t=0;t<r.length;t++)e[r.charAt(t)]=0;for(var t=0;t<r.length;t++)e[r.charAt(t)]|=1<<r.length-t-1;return e};y.prototype.patch_addContext_=function(r,e){if(e.length!=0){if(r.start2===null)throw Error("patch not initialized");for(var t=e.substring(r.start2,r.start2+r.length1),i=0;e.indexOf(t)!=e.lastIndexOf(t)&&t.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)i+=this.Patch_Margin,t=e.substring(r.start2-i,r.start2+r.length1+i);i+=this.Patch_Margin;var o=e.substring(r.start2-i,r.start2);o&&r.diffs.unshift(new y.Diff(N,o));var a=e.substring(r.start2+r.length1,r.start2+r.length1+i);a&&r.diffs.push(new y.Diff(N,a)),r.start1-=o.length,r.start2-=o.length,r.length1+=o.length+a.length,r.length2+=o.length+a.length}};y.prototype.patch_make=function(r,e,t){var i,o;if(typeof r=="string"&&typeof e=="string"&&typeof t>"u")i=r,o=this.diff_main(i,e,!0),o.length>2&&(this.diff_cleanupSemantic(o),this.diff_cleanupEfficiency(o));else if(r&&typeof r=="object"&&typeof e>"u"&&typeof t>"u")o=r,i=this.diff_text1(o);else if(typeof r=="string"&&e&&typeof e=="object"&&typeof t>"u")i=r,o=e;else if(typeof r=="string"&&typeof e=="string"&&t&&typeof t=="object")i=r,o=t;else throw new Error("Unknown call format to patch_make.");if(o.length===0)return[];for(var a=[],s=new y.patch_obj,l=0,c=0,h=0,u=i,f=i,b=0;b<o.length;b++){var m=o[b][0],E=o[b][1];switch(!l&&m!==N&&(s.start1=c,s.start2=h),m){case G:s.diffs[l++]=o[b],s.length2+=E.length,f=f.substring(0,h)+E+f.substring(h);break;case j:s.length1+=E.length,s.diffs[l++]=o[b],f=f.substring(0,h)+f.substring(h+E.length);break;case N:E.length<=2*this.Patch_Margin&&l&&o.length!=b+1?(s.diffs[l++]=o[b],s.length1+=E.length,s.length2+=E.length):E.length>=2*this.Patch_Margin&&l&&(this.patch_addContext_(s,u),a.push(s),s=new y.patch_obj,l=0,u=f,c=h);break}m!==G&&(c+=E.length),m!==j&&(h+=E.length)}return l&&(this.patch_addContext_(s,u),a.push(s)),a};y.prototype.patch_deepCopy=function(r){for(var e=[],t=0;t<r.length;t++){var i=r[t],o=new y.patch_obj;o.diffs=[];for(var a=0;a<i.diffs.length;a++)o.diffs[a]=new y.Diff(i.diffs[a][0],i.diffs[a][1]);o.start1=i.start1,o.start2=i.start2,o.length1=i.length1,o.length2=i.length2,e[t]=o}return e};y.prototype.patch_apply=function(r,e){if(r.length==0)return[e,[]];r=this.patch_deepCopy(r);var t=this.patch_addPadding(r);e=t+e+t,this.patch_splitMax(r);for(var i=0,o=[],a=0;a<r.length;a++){var s=r[a].start2+i,l=this.diff_text1(r[a].diffs),c,h=-1;if(l.length>this.Match_MaxBits?(c=this.match_main(e,l.substring(0,this.Match_MaxBits),s),c!=-1&&(h=this.match_main(e,l.substring(l.length-this.Match_MaxBits),s+l.length-this.Match_MaxBits),(h==-1||c>=h)&&(c=-1))):c=this.match_main(e,l,s),c==-1)o[a]=!1,i-=r[a].length2-r[a].length1;else{o[a]=!0,i=c-s;var u;if(h==-1?u=e.substring(c,c+l.length):u=e.substring(c,h+this.Match_MaxBits),l==u)e=e.substring(0,c)+this.diff_text2(r[a].diffs)+e.substring(c+l.length);else{var f=this.diff_main(l,u,!1);if(l.length>this.Match_MaxBits&&this.diff_levenshtein(f)/l.length>this.Patch_DeleteThreshold)o[a]=!1;else{this.diff_cleanupSemanticLossless(f);for(var b=0,m,E=0;E<r[a].diffs.length;E++){var S=r[a].diffs[E];S[0]!==N&&(m=this.diff_xIndex(f,b)),S[0]===G?e=e.substring(0,c+m)+S[1]+e.substring(c+m):S[0]===j&&(e=e.substring(0,c+m)+e.substring(c+this.diff_xIndex(f,b+S[1].length))),S[0]!==j&&(b+=S[1].length)}}}}}return e=e.substring(t.length,e.length-t.length),[e,o]};y.prototype.patch_addPadding=function(r){for(var e=this.Patch_Margin,t="",i=1;i<=e;i++)t+=String.fromCharCode(i);for(var i=0;i<r.length;i++)r[i].start1+=e,r[i].start2+=e;var o=r[0],a=o.diffs;if(a.length==0||a[0][0]!=N)a.unshift(new y.Diff(N,t)),o.start1-=e,o.start2-=e,o.length1+=e,o.length2+=e;else if(e>a[0][1].length){var s=e-a[0][1].length;a[0][1]=t.substring(a[0][1].length)+a[0][1],o.start1-=s,o.start2-=s,o.length1+=s,o.length2+=s}if(o=r[r.length-1],a=o.diffs,a.length==0||a[a.length-1][0]!=N)a.push(new y.Diff(N,t)),o.length1+=e,o.length2+=e;else if(e>a[a.length-1][1].length){var s=e-a[a.length-1][1].length;a[a.length-1][1]+=t.substring(0,s),o.length1+=s,o.length2+=s}return t};y.prototype.patch_splitMax=function(r){for(var e=this.Match_MaxBits,t=0;t<r.length;t++)if(!(r[t].length1<=e)){var i=r[t];r.splice(t--,1);for(var o=i.start1,a=i.start2,s="";i.diffs.length!==0;){var l=new y.patch_obj,c=!0;for(l.start1=o-s.length,l.start2=a-s.length,s!==""&&(l.length1=l.length2=s.length,l.diffs.push(new y.Diff(N,s)));i.diffs.length!==0&&l.length1<e-this.Patch_Margin;){var h=i.diffs[0][0],u=i.diffs[0][1];h===G?(l.length2+=u.length,a+=u.length,l.diffs.push(i.diffs.shift()),c=!1):h===j&&l.diffs.length==1&&l.diffs[0][0]==N&&u.length>2*e?(l.length1+=u.length,o+=u.length,c=!1,l.diffs.push(new y.Diff(h,u)),i.diffs.shift()):(u=u.substring(0,e-l.length1-this.Patch_Margin),l.length1+=u.length,o+=u.length,h===N?(l.length2+=u.length,a+=u.length):c=!1,l.diffs.push(new y.Diff(h,u)),u==i.diffs[0][1]?i.diffs.shift():i.diffs[0][1]=i.diffs[0][1].substring(u.length))}s=this.diff_text2(l.diffs),s=s.substring(s.length-this.Patch_Margin);var f=this.diff_text1(i.diffs).substring(0,this.Patch_Margin);f!==""&&(l.length1+=f.length,l.length2+=f.length,l.diffs.length!==0&&l.diffs[l.diffs.length-1][0]===N?l.diffs[l.diffs.length-1][1]+=f:l.diffs.push(new y.Diff(N,f))),c||r.splice(++t,0,l)}}};y.prototype.patch_toText=function(r){for(var e=[],t=0;t<r.length;t++)e[t]=r[t];return e.join("")};y.prototype.patch_fromText=function(r){var e=[];if(!r)return e;for(var t=r.split(`
`),i=0,o=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;i<t.length;){var a=t[i].match(o);if(!a)throw new Error("Invalid patch string: "+t[i]);var s=new y.patch_obj;for(e.push(s),s.start1=parseInt(a[1],10),a[2]===""?(s.start1--,s.length1=1):a[2]=="0"?s.length1=0:(s.start1--,s.length1=parseInt(a[2],10)),s.start2=parseInt(a[3],10),a[4]===""?(s.start2--,s.length2=1):a[4]=="0"?s.length2=0:(s.start2--,s.length2=parseInt(a[4],10)),i++;i<t.length;){var l=t[i].charAt(0);try{var c=decodeURI(t[i].substring(1))}catch{throw new Error("Illegal escape in patch_fromText: "+c)}if(l=="-")s.diffs.push(new y.Diff(j,c));else if(l=="+")s.diffs.push(new y.Diff(G,c));else if(l==" ")s.diffs.push(new y.Diff(N,c));else{if(l=="@")break;if(l!=="")throw new Error('Invalid patch mode "'+l+'" in: '+c)}i++}}return e};y.patch_obj=function(){this.diffs=[],this.start1=null,this.start2=null,this.length1=0,this.length2=0};y.patch_obj.prototype.toString=function(){var r,e;this.length1===0?r=this.start1+",0":this.length1==1?r=this.start1+1:r=this.start1+1+","+this.length1,this.length2===0?e=this.start2+",0":this.length2==1?e=this.start2+1:e=this.start2+1+","+this.length2;for(var t=["@@ -"+r+" +"+e+` @@
`],i,o=0;o<this.diffs.length;o++){switch(this.diffs[o][0]){case G:i="+";break;case j:i="-";break;case N:i=" ";break}t[o+1]=i+encodeURI(this.diffs[o][1])+`
`}return t.join("").replace(/%20/g," ")};$t.exports=y;$t.exports.diff_match_patch=y;$t.exports.DIFF_DELETE=j;$t.exports.DIFF_INSERT=G;$t.exports.DIFF_EQUAL=N});function n(r,e,t,i){var o=arguments.length,a=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,e,t,i);else for(var l=r.length-1;l>=0;l--)(s=r[l])&&(a=(o<3?s(a):o>3?s(e,t,a):s(e,t))||a);return o>3&&a&&Object.defineProperty(e,t,a),a}var w=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};var ar=globalThis,sr=ar.ShadowRoot&&(ar.ShadyCSS===void 0||ar.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ci=Symbol(),sa=new WeakMap,Lt=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ci)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(sr&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=sa.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&sa.set(t,e))}return e}toString(){return this.cssText}},na=r=>new Lt(typeof r=="string"?r:r+"",void 0,Ci),x=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((i,o,a)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[a+1],r[0]);return new Lt(t,r,Ci)},la=(r,e)=>{if(sr)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),o=ar.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,r.appendChild(i)}},Ai=sr?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return na(t)})(r):r;var{is:an,defineProperty:sn,getOwnPropertyDescriptor:nn,getOwnPropertyNames:ln,getOwnPropertySymbols:cn,getPrototypeOf:dn}=Object,nr=globalThis,ca=nr.trustedTypes,hn=ca?ca.emptyScript:"",pn=nr.reactiveElementPolyfillSupport,Mt=(r,e)=>r,Nt={toAttribute(r,e){switch(e){case Boolean:r=r?hn:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},lr=(r,e)=>!an(r,e),da={attribute:!0,type:String,converter:Nt,reflect:!1,useDefault:!1,hasChanged:lr};Symbol.metadata??=Symbol("metadata"),nr.litPropertyMetadata??=new WeakMap;var Re=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=da){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),o=this.getPropertyDescriptor(e,i,t);o!==void 0&&sn(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){let{get:o,set:a}=nn(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:o,set(s){let l=o?.call(this);a?.call(this,s),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??da}static _$Ei(){if(this.hasOwnProperty(Mt("elementProperties")))return;let e=dn(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Mt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Mt("properties"))){let t=this.properties,i=[...ln(t),...cn(t)];for(let o of i)this.createProperty(o,t[o])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,o]of t)this.elementProperties.set(i,o)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let o=this._$Eu(t,i);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let o of i)t.unshift(Ai(o))}else e!==void 0&&t.push(Ai(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return la(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(o!==void 0&&i.reflect===!0){let a=(i.converter?.toAttribute!==void 0?i.converter:Nt).toAttribute(t,i.type);this._$Em=e,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(e,t){let i=this.constructor,o=i._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let a=i.getPropertyOptions(o),s=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:Nt;this._$Em=o,this[o]=s.fromAttribute(t,a.type)??this._$Ej?.get(o)??null,this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){let o=this.constructor,a=this[e];if(i??=o.getPropertyOptions(e),!((i.hasChanged??lr)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:a},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),a!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[o,a]of i){let{wrapped:s}=a,l=this[o];s!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,a,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};Re.elementStyles=[],Re.shadowRootOptions={mode:"open"},Re[Mt("elementProperties")]=new Map,Re[Mt("finalized")]=new Map,pn?.({ReactiveElement:Re}),(nr.reactiveElementVersions??=[]).push("2.1.0");var un={attribute:!0,type:String,converter:Nt,reflect:!1,hasChanged:lr},fn=(r=un,e,t)=>{let{kind:i,metadata:o}=t,a=globalThis.litPropertyMetadata.get(o);if(a===void 0&&globalThis.litPropertyMetadata.set(o,a=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),a.set(t.name,r),i==="accessor"){let{name:s}=t;return{set(l){let c=e.get.call(this);e.set.call(this,l),this.requestUpdate(s,c,r)},init(l){return l!==void 0&&this.C(s,void 0,r,l),l}}}if(i==="setter"){let{name:s}=t;return function(l){let c=this[s];e.call(this,l),this.requestUpdate(s,c,r)}}throw Error("Unsupported decorator location: "+i)};function d(r){return(e,t)=>typeof t=="object"?fn(r,e,t):((i,o,a)=>{let s=o.hasOwnProperty(a);return o.constructor.createProperty(a,i),s?Object.getOwnPropertyDescriptor(o,a):void 0})(r,e,t)}function M(r){return d({...r,state:!0,attribute:!1})}var we=(r,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(r,e,t),t);function k(r,e){return(t,i,o)=>{let a=s=>s.renderRoot?.querySelector(r)??null;if(e){let{get:s,set:l}=typeof i=="object"?t:o??(()=>{let c=Symbol();return{get(){return this[c]},set(h){this[c]=h}}})();return we(t,i,{get(){let c=s.call(this);return c===void 0&&(c=a(this),(c!==null||this.hasUpdated)&&l.call(this,c)),c}})}return we(t,i,{get(){return a(this)}})}}var mn;function Ce(r){return(e,t)=>we(e,t,{get(){return(this.renderRoot??(mn??=document.createDocumentFragment())).querySelectorAll(r)}})}function Ti(r){return(e,t)=>we(e,t,{async get(){return await this.updateComplete,this.renderRoot?.querySelector(r)??null}})}function ie(r){return(e,t)=>{let{slot:i,selector:o}=r??{},a="slot"+(i?`[name=${i}]`:":not([name])");return we(e,t,{get(){let s=this.renderRoot?.querySelector(a),l=s?.assignedElements(r)??[];return o===void 0?l:l.filter(c=>c.matches(o))}})}}function cr(r){return(e,t)=>{let{slot:i}=r??{},o="slot"+(i?`[name=${i}]`:":not([name])");return we(e,t,{get(){return this.renderRoot?.querySelector(o)?.assignedNodes(r)??[]}})}}var $i=globalThis,dr=$i.trustedTypes,ha=dr?dr.createPolicy("lit-html",{createHTML:r=>r}):void 0,Oi="$lit$",Le=`lit$${Math.random().toFixed(9).slice(2)}$`,Ri="?"+Le,vn=`<${Ri}>`,st=document,Dt=()=>st.createComment(""),Pt=r=>r===null||typeof r!="object"&&typeof r!="function",Li=Array.isArray,ga=r=>Li(r)||typeof r?.[Symbol.iterator]=="function",Ii=`[ 	
\f\r]`,zt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pa=/-->/g,ua=/>/g,ot=RegExp(`>|${Ii}(?:([^\\s"'>=/]+)(${Ii}*=${Ii}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fa=/'/g,ma=/"/g,ba=/^(?:script|style|textarea|title)$/i,Mi=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),p=Mi(1),vr=Mi(2),ya=Mi(3),se=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),va=new WeakMap,at=st.createTreeWalker(st,129);function xa(r,e){if(!Li(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ha!==void 0?ha.createHTML(e):e}var _a=(r,e)=>{let t=r.length-1,i=[],o,a=e===2?"<svg>":e===3?"<math>":"",s=zt;for(let l=0;l<t;l++){let c=r[l],h,u,f=-1,b=0;for(;b<c.length&&(s.lastIndex=b,u=s.exec(c),u!==null);)b=s.lastIndex,s===zt?u[1]==="!--"?s=pa:u[1]!==void 0?s=ua:u[2]!==void 0?(ba.test(u[2])&&(o=RegExp("</"+u[2],"g")),s=ot):u[3]!==void 0&&(s=ot):s===ot?u[0]===">"?(s=o??zt,f=-1):u[1]===void 0?f=-2:(f=s.lastIndex-u[2].length,h=u[1],s=u[3]===void 0?ot:u[3]==='"'?ma:fa):s===ma||s===fa?s=ot:s===pa||s===ua?s=zt:(s=ot,o=void 0);let m=s===ot&&r[l+1].startsWith("/>")?" ":"";a+=s===zt?c+vn:f>=0?(i.push(h),c.slice(0,f)+Oi+c.slice(f)+Le+m):c+Le+(f===-2?l:m)}return[xa(r,a+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},Ft=class r{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let a=0,s=0,l=e.length-1,c=this.parts,[h,u]=_a(e,t);if(this.el=r.createElement(h,i),at.currentNode=this.el.content,t===2||t===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=at.nextNode())!==null&&c.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(Oi)){let b=u[s++],m=o.getAttribute(f).split(Le),E=/([.?@])?(.*)/.exec(b);c.push({type:1,index:a,name:E[2],strings:m,ctor:E[1]==="."?pr:E[1]==="?"?ur:E[1]==="@"?fr:lt}),o.removeAttribute(f)}else f.startsWith(Le)&&(c.push({type:6,index:a}),o.removeAttribute(f));if(ba.test(o.tagName)){let f=o.textContent.split(Le),b=f.length-1;if(b>0){o.textContent=dr?dr.emptyScript:"";for(let m=0;m<b;m++)o.append(f[m],Dt()),at.nextNode(),c.push({type:2,index:++a});o.append(f[b],Dt())}}}else if(o.nodeType===8)if(o.data===Ri)c.push({type:2,index:a});else{let f=-1;for(;(f=o.data.indexOf(Le,f+1))!==-1;)c.push({type:7,index:a}),f+=Le.length-1}a++}}static createElement(e,t){let i=st.createElement("template");return i.innerHTML=e,i}};function nt(r,e,t=r,i){if(e===se)return e;let o=i!==void 0?t._$Co?.[i]:t._$Cl,a=Pt(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),a===void 0?o=void 0:(o=new a(r),o._$AT(r,t,i)),i!==void 0?(t._$Co??=[])[i]=o:t._$Cl=o),o!==void 0&&(e=nt(r,o._$AS(r,e.values),o,i)),e}var hr=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??st).importNode(t,!0);at.currentNode=o;let a=at.nextNode(),s=0,l=0,c=i[0];for(;c!==void 0;){if(s===c.index){let h;c.type===2?h=new vt(a,a.nextSibling,this,e):c.type===1?h=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(h=new mr(a,this,e)),this._$AV.push(h),c=i[++l]}s!==c?.index&&(a=at.nextNode(),s++)}return at.currentNode=st,o}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},vt=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=nt(this,e,t),Pt(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==se&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ga(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&Pt(this._$AH)?this._$AA.nextSibling.data=e:this.T(st.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Ft.createElement(xa(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{let a=new hr(o,this),s=a.u(this.options);a.p(t),this.T(s),this._$AH=a}}_$AC(e){let t=va.get(e.strings);return t===void 0&&va.set(e.strings,t=new Ft(e)),t}k(e){Li(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,o=0;for(let a of e)o===t.length?t.push(i=new r(this.O(Dt()),this.O(Dt()),this,this.options)):i=t[o],i._$AI(a),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){let i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},lt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,a){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=v}_$AI(e,t=this,i,o){let a=this.strings,s=!1;if(a===void 0)e=nt(this,e,t,0),s=!Pt(e)||e!==this._$AH&&e!==se,s&&(this._$AH=e);else{let l=e,c,h;for(e=a[0],c=0;c<a.length-1;c++)h=nt(this,l[i+c],t,c),h===se&&(h=this._$AH[c]),s||=!Pt(h)||h!==this._$AH[c],h===v?e=v:e!==v&&(e+=(h??"")+a[c+1]),this._$AH[c]=h}s&&!o&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},pr=class extends lt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}},ur=class extends lt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==v)}},fr=class extends lt{constructor(e,t,i,o,a){super(e,t,i,o,a),this.type=5}_$AI(e,t=this){if((e=nt(this,e,t,0)??v)===se)return;let i=this._$AH,o=e===v&&i!==v||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==v&&(i===v||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},mr=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){nt(this,e)}},wa={M:Oi,P:Le,A:Ri,C:1,L:_a,R:hr,D:ga,V:nt,I:vt,H:lt,N:ur,U:fr,B:pr,F:mr},gn=$i.litHtmlPolyfillSupport;gn?.(Ft,vt),($i.litHtmlVersions??=[]).push("3.3.0");var gt=(r,e,t)=>{let i=t?.renderBefore??e,o=i._$litPart$;if(o===void 0){let a=t?.renderBefore??null;i._$litPart$=o=new vt(e.insertBefore(Dt(),a),a,void 0,t??{})}return o._$AI(r),o};var Ni=globalThis,_=class extends Re{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=gt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return se}};_._$litElement$=!0,_.finalized=!0,Ni.litElementHydrateSupport?.({LitElement:_});var bn=Ni.litElementPolyfillSupport;bn?.({LitElement:_});(Ni.litElementVersions??=[]).push("4.2.0");var ue={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Me=r=>(...e)=>({_$litDirective$:r,values:e}),Ae=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var U=Me(class extends Ae{constructor(r){if(super(r),r.type!==ue.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter(e=>r[e]).join(" ")+" "}update(r,[e]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}let t=r.element.classList;for(let i of this.st)i in e||(t.remove(i),this.st.delete(i));for(let i in e){let o=!!e[i];o===this.st.has(i)||this.nt?.has(i)||(o?(t.add(i),this.st.add(i)):(t.remove(i),this.st.delete(i)))}return se}});var zi=["role","ariaAtomic","ariaAutoComplete","ariaBusy","ariaChecked","ariaColCount","ariaColIndex","ariaColSpan","ariaCurrent","ariaDisabled","ariaExpanded","ariaHasPopup","ariaHidden","ariaInvalid","ariaKeyShortcuts","ariaLabel","ariaLevel","ariaLive","ariaModal","ariaMultiLine","ariaMultiSelectable","ariaOrientation","ariaPlaceholder","ariaPosInSet","ariaPressed","ariaReadOnly","ariaRequired","ariaRoleDescription","ariaRowCount","ariaRowIndex","ariaRowSpan","ariaSelected","ariaSetSize","ariaSort","ariaValueMax","ariaValueMin","ariaValueNow","ariaValueText"],yn=zi.map(Di);function gr(r){return yn.includes(r)}function Di(r){return r.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}var br=Symbol("privateIgnoreAttributeChangesFor");function J(r){var e;if(!1)return r;class t extends r{constructor(){super(...arguments),this[e]=new Set}attributeChangedCallback(o,a,s){if(!gr(o)){super.attributeChangedCallback(o,a,s);return}if(this[br].has(o))return;this[br].add(o),this.removeAttribute(o),this[br].delete(o);let l=Fi(o);s===null?delete this.dataset[l]:this.dataset[l]=s,this.requestUpdate(Fi(o),a)}getAttribute(o){return gr(o)?super.getAttribute(Pi(o)):super.getAttribute(o)}removeAttribute(o){super.removeAttribute(o),gr(o)&&(super.removeAttribute(Pi(o)),this.requestUpdate())}}return e=br,xn(t),t}function xn(r){for(let e of zi){let t=Di(e),i=Pi(t),o=Fi(t);r.createProperty(e,{attribute:t,noAccessor:!0}),r.createProperty(Symbol(i),{attribute:i,noAccessor:!0}),Object.defineProperty(r.prototype,e,{configurable:!0,enumerable:!0,get(){return this.dataset[o]??null},set(a){let s=this.dataset[o]??null;a!==s&&(a===null?delete this.dataset[o]:this.dataset[o]=a,this.requestUpdate(e,s))}})}}function Pi(r){return`data-${r}`}function Fi(r){return r.replace(/-\w/,e=>e[1].toUpperCase())}var _n=J(_),We=class extends _n{constructor(){super(...arguments),this.value=0,this.max=1,this.indeterminate=!1,this.fourColor=!1}render(){let{ariaLabel:e}=this;return p`
      <div
        class="progress ${U(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${e||v}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate?v:this.value}
        >${this.renderIndicator()}</div
      >
    `}getRenderClasses(){return{indeterminate:this.indeterminate,"four-color":this.fourColor}}};n([d({type:Number})],We.prototype,"value",void 0);n([d({type:Number})],We.prototype,"max",void 0);n([d({type:Boolean})],We.prototype,"indeterminate",void 0);n([d({type:Boolean,attribute:"four-color"})],We.prototype,"fourColor",void 0);var yr=class extends We{renderIndicator(){return this.indeterminate?this.renderIndeterminateContainer():this.renderDeterminateContainer()}renderDeterminateContainer(){let e=(1-this.value/this.max)*100;return p`
      <svg viewBox="0 0 4800 4800">
        <circle class="track" pathLength="100"></circle>
        <circle
          class="active-track"
          pathLength="100"
          stroke-dashoffset=${e}></circle>
      </svg>
    `}renderIndeterminateContainer(){return p` <div class="spinner">
      <div class="left">
        <div class="circle"></div>
      </div>
      <div class="right">
        <div class="circle"></div>
      </div>
    </div>`}};var Ea=x`:host{--_active-indicator-color: var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width: var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color: var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size: var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.progress,.spinner,.left,.right,.circle,svg,.track,.active-track{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{cx:50%;cy:50%;r:calc(50%*(1 - var(--_active-indicator-width)/100));stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:rgba(0,0,0,0)}.active-track{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);stroke:var(--_active-indicator-color)}.track{stroke:rgba(0,0,0,0)}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1568.2352941176ms}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) rgba(0,0,0,0) rgba(0,0,0,0);animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-666.5ms,0ms}@media(forced-colors: active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}
`;var Bi=class extends yr{};Bi.styles=[Ea];Bi=n([w("md-circular-progress")],Bi);var ka="run-macro",xr={aiConfig:"smart",checkedLanguages:[],enableConversationMode:!1,enableEarcons:!1,expandAtOrigin:!1,initialPhrases:[],initialPhrasesPerLanguage:{},messageHistoryWithPrefix:[],persona:"",sentenceSmallMargin:!1,ttsVoice:"",voicePitch:0,voiceSpeakingRate:0},Sa=4;function wn(r,e){return r=r.replaceAll(`\\
`,""),r.split(`
`).map(t=>t.trim()).filter(t=>t.match(/^[0-9]+\./)).slice(0,e).map(t=>t.replace(/^\d+\.\s?/,""))}var _r=class r{constructor(){this.fetchAbortController=null}abortFetch(){this.fetchAbortController?.abort()}async fetchSuggestions(e,t,i,o){this.fetchAbortController?.abort(),this.fetchAbortController=new AbortController;let a=this.fetchAbortController.signal,s=o.wordMacroId,c={language:t,num:"5",text:e,persona:o.persona,lastOutputSpeech:o.lastOutputSpeech,lastInputSpeech:o.lastInputSpeech,conversationHistory:o.conversationHistory,sentenceEmotion:o.sentenceEmotion},h=r.fetchSuggestion(c,a,s,i),u=o.sentenceMacroId,f=r.fetchSuggestion(c,a,u,i);return Promise.all([f,h]).catch(m=>{if(m instanceof DOMException)console.log("Request was aborted by user:",c);else{let E=m?.debug_error||m||"something";alert(`Failed to access Gemini server or ${E}.`)}return null})}static async fetchSuggestion(e,t,i,o,a=0){let s=await r.fetchMacro(e,t,i,o,a);return wn(s,+e.num)}static async fetchMacro(e,t,i,o,a){let s=new FormData;s.append("id",i),s.append("userInputs",JSON.stringify(e)),s.append("temperature",`${a}`),s.append("model_id",o),s.append("_csrf_token",document.body.dataset.csrfToken||"");let l=h=>{if(!(h instanceof Object&&"messages"in h))throw new Error("API response doesn't have messages");return!Array.isArray(h.messages)||h.messages.length===0?"":h.messages[0].text};return fetch(ka,{method:"POST",body:s,signal:t}).then(h=>h.json()).then(l)}};var ct=class extends _{constructor(){super(...arguments);this.label="";this.active=!1}render(){return p`<button>${this.label}</button>`}};ct.styles=x`
    :host {
      display: inline-block;
    }

    :host([active]) button,
    button:hover {
      background: var(--color-primary, yellow);
    }

    :host([rounded]) button {
      border-color: #f28b82;
      border-radius: 5vh;
    }

    :host([emotion]) button {
      border-color: #f98ec9;
    }

    button {
      background: var(--color-surface, white);
      border-radius: 0.5vh;
      border: solid 3px #8ab4f8;
      color: var(--color-on-surface);
      cursor: pointer;
      font-family: 'Roboto Mono', 'Noto Sans JP', monospace;
      font-size: min(5vh, 3rem);
      padding: 0 1rem;
    }
  `,g([d({type:String})],ct.prototype,"label",2),g([d({type:Boolean})],ct.prototype,"active",2),ct=g([w("pv-button")],ct);var En=Object.defineProperty,kn=(r,e,t)=>e in r?En(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Hi=(r,e,t)=>(kn(r,typeof e!="symbol"?e+"":e,t),t),Sn=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)},Ui=(r,e)=>{if(Object(e)!==e)throw TypeError('Cannot use the "in" operator on this value');return r.has(e)},wr=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)},Ca=(r,e,t)=>(Sn(r,e,"access private method"),t);function Aa(r,e){return Object.is(r,e)}var Q=null,Bt=!1,Er=1,kr=Symbol("SIGNAL");function bt(r){let e=Q;return Q=r,e}function Cn(){return Q}function An(){return Bt}var Gi={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Sr(r){if(Bt)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(Q===null)return;Q.consumerOnSignalRead(r);let e=Q.nextProducerIndex++;if(yt(Q),e<Q.producerNode.length&&Q.producerNode[e]!==r&&qi(Q)){let t=Q.producerNode[e];Cr(t,Q.producerIndexOfThis[e])}Q.producerNode[e]!==r&&(Q.producerNode[e]=r,Q.producerIndexOfThis[e]=qi(Q)?$a(r,Q,e):0),Q.producerLastReadVersion[e]=r.version}function Tn(){Er++}function Ta(r){if(!(!r.dirty&&r.lastCleanEpoch===Er)){if(!r.producerMustRecompute(r)&&!Ln(r)){r.dirty=!1,r.lastCleanEpoch=Er;return}r.producerRecomputeValue(r),r.dirty=!1,r.lastCleanEpoch=Er}}function Ia(r){if(r.liveConsumerNode===void 0)return;let e=Bt;Bt=!0;try{for(let t of r.liveConsumerNode)t.dirty||$n(t)}finally{Bt=e}}function In(){return Q?.consumerAllowSignalWrites!==!1}function $n(r){var e;r.dirty=!0,Ia(r),(e=r.consumerMarkedDirty)==null||e.call(r.wrapper??r)}function On(r){return r&&(r.nextProducerIndex=0),bt(r)}function Rn(r,e){if(bt(e),!(!r||r.producerNode===void 0||r.producerIndexOfThis===void 0||r.producerLastReadVersion===void 0)){if(qi(r))for(let t=r.nextProducerIndex;t<r.producerNode.length;t++)Cr(r.producerNode[t],r.producerIndexOfThis[t]);for(;r.producerNode.length>r.nextProducerIndex;)r.producerNode.pop(),r.producerLastReadVersion.pop(),r.producerIndexOfThis.pop()}}function Ln(r){yt(r);for(let e=0;e<r.producerNode.length;e++){let t=r.producerNode[e],i=r.producerLastReadVersion[e];if(i!==t.version||(Ta(t),i!==t.version))return!0}return!1}function $a(r,e,t){var i;if(Ki(r),yt(r),r.liveConsumerNode.length===0){(i=r.watched)==null||i.call(r.wrapper);for(let o=0;o<r.producerNode.length;o++)r.producerIndexOfThis[o]=$a(r.producerNode[o],r,o)}return r.liveConsumerIndexOfThis.push(t),r.liveConsumerNode.push(e)-1}function Cr(r,e){var t;if(Ki(r),yt(r),typeof ngDevMode<"u"&&ngDevMode&&e>=r.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${e} is out of bounds of ${r.liveConsumerNode.length} consumers)`);if(r.liveConsumerNode.length===1){(t=r.unwatched)==null||t.call(r.wrapper);for(let o=0;o<r.producerNode.length;o++)Cr(r.producerNode[o],r.producerIndexOfThis[o])}let i=r.liveConsumerNode.length-1;if(r.liveConsumerNode[e]=r.liveConsumerNode[i],r.liveConsumerIndexOfThis[e]=r.liveConsumerIndexOfThis[i],r.liveConsumerNode.length--,r.liveConsumerIndexOfThis.length--,e<r.liveConsumerNode.length){let o=r.liveConsumerIndexOfThis[e],a=r.liveConsumerNode[e];yt(a),a.producerIndexOfThis[o]=e}}function qi(r){var e;return r.consumerIsAlwaysLive||(((e=r?.liveConsumerNode)==null?void 0:e.length)??0)>0}function yt(r){r.producerNode??(r.producerNode=[]),r.producerIndexOfThis??(r.producerIndexOfThis=[]),r.producerLastReadVersion??(r.producerLastReadVersion=[])}function Ki(r){r.liveConsumerNode??(r.liveConsumerNode=[]),r.liveConsumerIndexOfThis??(r.liveConsumerIndexOfThis=[])}function Oa(r){if(Ta(r),Sr(r),r.value===ji)throw r.error;return r.value}function Mn(r){let e=Object.create(Nn);e.computation=r;let t=()=>Oa(e);return t[kr]=e,t}var Vi=Symbol("UNSET"),Wi=Symbol("COMPUTING"),ji=Symbol("ERRORED"),Nn={...Gi,value:Vi,dirty:!0,error:null,equal:Aa,producerMustRecompute(r){return r.value===Vi||r.value===Wi},producerRecomputeValue(r){if(r.value===Wi)throw new Error("Detected cycle in computations.");let e=r.value;r.value=Wi;let t=On(r),i,o=!1;try{i=r.computation.call(r.wrapper),o=e!==Vi&&e!==ji&&r.equal.call(r.wrapper,e,i)}catch(a){i=ji,r.error=a}finally{Rn(r,t)}if(o){r.value=e;return}r.value=i,r.version++}};function zn(){throw new Error}var Dn=zn;function Pn(){Dn()}function Fn(r){let e=Object.create(Un);e.value=r;let t=()=>(Sr(e),e.value);return t[kr]=e,t}function Bn(){return Sr(this),this.value}function Hn(r,e){In()||Pn(),r.equal.call(r.wrapper,r.value,e)||(r.value=e,Vn(r))}var Un={...Gi,equal:Aa,value:void 0};function Vn(r){r.version++,Tn(),Ia(r)}var oe=Symbol("node"),te;(r=>{var e,t,i,o,a,s;class l{constructor(u,f={}){wr(this,t),Hi(this,e);let m=Fn(u)[kr];if(this[oe]=m,m.wrapper=this,f){let E=f.equals;E&&(m.equal=E),m.watched=f[r.subtle.watched],m.unwatched=f[r.subtle.unwatched]}}get(){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return Bn.call(this[oe])}set(u){if(!(0,r.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(An())throw new Error("Writes to signals not permitted during Watcher callback");let f=this[oe];Hn(f,u)}}e=oe,t=new WeakSet,i=function(){},r.isState=h=>typeof h=="object"&&Ui(t,h),r.State=l;class c{constructor(u,f){wr(this,a),Hi(this,o);let m=Mn(u)[kr];if(m.consumerAllowSignalWrites=!0,this[oe]=m,m.wrapper=this,f){let E=f.equals;E&&(m.equal=E),m.watched=f[r.subtle.watched],m.unwatched=f[r.subtle.unwatched]}}get(){if(!(0,r.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return Oa(this[oe])}}o=oe,a=new WeakSet,s=function(){},r.isComputed=h=>typeof h=="object"&&Ui(a,h),r.Computed=c,(h=>{var u,f,b,m,E;function S(I){let A,C=null;try{C=bt(null),A=I()}finally{bt(C)}return A}h.untrack=S;function O(I){var A;if(!(0,r.isComputed)(I)&&!(0,r.isWatcher)(I))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((A=I[oe].producerNode)==null?void 0:A.map(C=>C.wrapper))??[]}h.introspectSources=O;function $(I){var A;if(!(0,r.isComputed)(I)&&!(0,r.isState)(I))throw new TypeError("Called introspectSinks without a Signal argument");return((A=I[oe].liveConsumerNode)==null?void 0:A.map(C=>C.wrapper))??[]}h.introspectSinks=$;function T(I){if(!(0,r.isComputed)(I)&&!(0,r.isState)(I))throw new TypeError("Called hasSinks without a Signal argument");let A=I[oe].liveConsumerNode;return A?A.length>0:!1}h.hasSinks=T;function R(I){if(!(0,r.isComputed)(I)&&!(0,r.isWatcher)(I))throw new TypeError("Called hasSources without a Computed or Watcher argument");let A=I[oe].producerNode;return A?A.length>0:!1}h.hasSources=R;class L{constructor(A){wr(this,f),wr(this,m),Hi(this,u);let C=Object.create(Gi);C.wrapper=this,C.consumerMarkedDirty=A,C.consumerIsAlwaysLive=!0,C.consumerAllowSignalWrites=!1,C.producerNode=[],this[oe]=C}watch(...A){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Ca(this,m,E).call(this,A);let C=this[oe];C.dirty=!1;let W=bt(C);for(let _e of A)Sr(_e[oe]);bt(W)}unwatch(...A){if(!(0,r.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");Ca(this,m,E).call(this,A);let C=this[oe];yt(C);for(let W=C.producerNode.length-1;W>=0;W--)if(A.includes(C.producerNode[W].wrapper)){Cr(C.producerNode[W],C.producerIndexOfThis[W]);let _e=C.producerNode.length-1;if(C.producerNode[W]=C.producerNode[_e],C.producerIndexOfThis[W]=C.producerIndexOfThis[_e],C.producerNode.length--,C.producerIndexOfThis.length--,C.nextProducerIndex--,W<C.producerNode.length){let ye=C.producerIndexOfThis[W],Rt=C.producerNode[W];Ki(Rt),Rt.liveConsumerIndexOfThis[ye]=W}}}getPending(){if(!(0,r.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[oe].producerNode.filter(C=>C.dirty).map(C=>C.wrapper)}}u=oe,f=new WeakSet,b=function(){},m=new WeakSet,E=function(I){for(let A of I)if(!(0,r.isComputed)(A)&&!(0,r.isState)(A))throw new TypeError("Called watch/unwatch without a Computed or State argument")},r.isWatcher=I=>Ui(f,I),h.Watcher=L;function P(){var I;return(I=Cn())==null?void 0:I.wrapper}h.currentComputed=P,h.watched=Symbol("watched"),h.unwatched=Symbol("unwatched")})(r.subtle||(r.subtle={}))})(te||(te={}));var Wn=Symbol("SignalWatcherBrand"),qn=new FinalizationRegistry(({watcher:r,signal:e})=>{r.unwatch(e)}),Ra=new WeakMap;function Ne(r){return r[Wn]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),r):class extends r{constructor(){super(...arguments),this._$St=new te.State(0),this._$Si=!1,this._$So=!0,this._$Sh=new Set}_$Sl(){if(this._$Su!==void 0)return;this._$Sv=new te.Computed(()=>{this._$St.get(),super.performUpdate()});let e=this._$Su=new te.subtle.Watcher(function(){let t=Ra.get(this);t!==void 0&&(t._$Si===!1&&t.requestUpdate(),this.watch())});Ra.set(e,this),qn.register(this,{watcher:e,signal:this._$Sv}),e.watch(this._$Sv)}_$Sp(){this._$Su!==void 0&&(this._$Su.unwatch(this._$Sv),this._$Sv=void 0,this._$Su=void 0)}performUpdate(){this.isUpdatePending&&(this._$Sl(),this._$Si=!0,this._$St.set(this._$St.get()+1),this._$Si=!1,this._$Sv.get())}update(e){try{this._$So?(this._$So=!1,super.update(e)):this._$Sh.forEach(t=>t.commit())}finally{this.isUpdatePending=!1,this._$Sh.clear()}}requestUpdate(e,t,i){this._$So=!0,super.requestUpdate(e,t,i)}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected===!1&&this._$Sp()})}_(e){this._$Sh.add(e);let t=this._$So;this.requestUpdate(),this._$So=t}m(e){this._$Sh.delete(e)}}}var{I:jd}=wa;var Ar=r=>r.strings===void 0;var jn={},La=(r,e=jn)=>r._$AH=e;var Ht=(r,e)=>{let t=r._$AN;if(t===void 0)return!1;for(let i of t)i._$AO?.(e,!1),Ht(i,e);return!0},Tr=r=>{let e,t;do{if((e=r._$AM)===void 0)break;t=e._$AN,t.delete(r),r=e}while(t?.size===0)},Ma=r=>{for(let e;e=r._$AM;r=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(r))break;t.add(r),Yn(e)}};function Gn(r){this._$AN!==void 0?(Tr(this),this._$AM=r,Ma(this)):this._$AM=r}function Kn(r,e=!1,t=0){let i=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(e)if(Array.isArray(i))for(let a=t;a<i.length;a++)Ht(i[a],!1),Tr(i[a]);else i!=null&&(Ht(i,!1),Tr(i));else Ht(this,r)}var Yn=r=>{r.type==ue.CHILD&&(r._$AP??=Kn,r._$AQ??=Gn)},Ir=class extends Ae{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),Ma(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Ht(this,e),Tr(this))}setValue(e){if(Ar(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};var $r=class extends Ir{_$Sl(){if(this._$Su!==void 0)return;this._$SW=new te.Computed(()=>{var t;return(t=this._$Sj)===null||t===void 0?void 0:t.get()});let e=this._$Su=new te.subtle.Watcher(()=>{var t;(t=this._$SO)===null||t===void 0||t._(this),e.watch()});e.watch(this._$SW)}_$Sp(){var e;this._$Su!==void 0&&(this._$Su.unwatch(this._$SW),this._$SW=void 0,this._$Su=void 0,(e=this._$SO)===null||e===void 0||e.m(this))}commit(){this.setValue(te.subtle.untrack(()=>{var e;return(e=this._$SW)===null||e===void 0?void 0:e.get()}))}render(e){return te.subtle.untrack(()=>e.get())}update(e,[t]){var i,o;return(i=this._$SO)!==null&&i!==void 0||(this._$SO=(o=e.options)===null||o===void 0?void 0:o.host),t!==this._$Sj&&this._$Sj!==void 0&&this._$Sp(),this._$Sj=t,this._$Sl(),te.subtle.untrack(()=>this._$SW.get())}disconnected(){this._$Sp()}reconnected(){this._$Sl()}},Yi=Me($r);var Xi=r=>(e,...t)=>r(e,...t.map(i=>i instanceof te.State||i instanceof te.Computed?Yi(i):i)),Xn=Xi(p),Zn=Xi(vr);var hh=te.State,ph=te.Computed,Ee=(r,e)=>new te.State(r,e);var za=Symbol.for(""),Jn=r=>{if(r?.r===za)return r?._$litStatic$};var X=(r,...e)=>({_$litStatic$:e.reduce((t,i,o)=>t+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+r[o+1],r[0]),r:za}),Na=new Map,Zi=r=>(e,...t)=>{let i=t.length,o,a,s=[],l=[],c,h=0,u=!1;for(;h<i;){for(c=e[h];h<i&&(a=t[h],(o=Jn(a))!==void 0);)c+=o+e[++h],u=!0;h!==i&&l.push(a),s.push(c),h++}if(h===i&&s.push(e[i]),u){let f=s.join("$$lit$$");(e=Na.get(f))===void 0&&(s.raw=s,Na.set(f,e=s)),t=l}return r(e,...t)},qe=Zi(p),yh=Zi(vr),xh=Zi(ya);var Ut=class extends Ne(_){render(){return qe`<${this.state.keyboard} .state=${this.state}></${this.state.keyboard}>`}};g([d({type:Object})],Ut.prototype,"state",2),Ut=g([w("pv-character-input")],Ut);var Vt="lit-localize-status";var Da=r=>typeof r!="string"&&"strTag"in r,Or=(r,e,t)=>{let i=r[0];for(let o=1;o<r.length;o++)i+=e[t?t[o-1]:o-1],i+=r[o];return i};var Wt=r=>Da(r)?Or(r.strings,r.values):r;var z=Wt,Pa=!1;function Ji(r){if(Pa)throw new Error("lit-localize can only be configured once");z=r,Pa=!0}var Qi=class{constructor(e){this.__litLocalizeEventHandler=t=>{t.detail.status==="ready"&&this.host.requestUpdate()},this.host=e}hostConnected(){window.addEventListener(Vt,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(Vt,this.__litLocalizeEventHandler)}},Qn=r=>r.addController(new Qi(r)),Fa=Qn;var je=()=>(r,e)=>(r.addInitializer(Fa),r);var qt=class{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}};var ze=[];for(let r=0;r<256;r++)ze[r]=(r>>4&15).toString(16)+(r&15).toString(16);function Ba(r){let e=0,t=8997,i=0,o=33826,a=0,s=40164,l=0,c=52210;for(let h=0;h<r.length;h++)t^=r.charCodeAt(h),e=t*435,i=o*435,a=s*435,l=c*435,a+=t<<8,l+=o<<8,i+=e>>>16,t=e&65535,a+=i>>>16,o=i&65535,c=l+(a>>>16)&65535,s=a&65535;return ze[c>>8]+ze[c&255]+ze[s>>8]+ze[s&255]+ze[o>>8]+ze[o&255]+ze[t>>8]+ze[t&255]}var el="",tl="h",rl="s";function Ha(r,e){return(e?tl:rl)+Ba(typeof r=="string"?r:r.join(el))}var Ua=new WeakMap,Va=new Map;function Wa(r,e,t){if(r){let i=t?.id??il(e),o=r[i];if(o){if(typeof o=="string")return o;if("strTag"in o)return Or(o.strings,e.values,o.values);{let a=Ua.get(o);return a===void 0&&(a=o.values,Ua.set(o,a)),{...o,values:a.map(s=>e.values[s])}}}}return Wt(e)}function il(r){let e=typeof r=="string"?r:r.strings,t=Va.get(e);return t===void 0&&(t=Ha(e,typeof r!="string"&&!("strTag"in r)),Va.set(e,t)),t}function eo(r){window.dispatchEvent(new CustomEvent(Vt,{detail:r}))}var Lr="",to,qa,Mr,ro,ja,dt=new qt;dt.resolve();var Rr=0,Ga=r=>(Ji((e,t)=>Wa(ja,e,t)),Lr=qa=r.sourceLocale,Mr=new Set(r.targetLocales),Mr.add(r.sourceLocale),ro=r.loadLocale,{getLocale:ol,setLocale:al}),ol=()=>Lr,al=r=>{if(r===(to??Lr))return dt.promise;if(!Mr||!ro)throw new Error("Internal error");if(!Mr.has(r))throw new Error("Invalid locale code");Rr++;let e=Rr;return to=r,dt.settled&&(dt=new qt),eo({status:"loading",loadingLocale:r}),(r===qa?Promise.resolve({templates:void 0}):ro(r)).then(i=>{Rr===e&&(Lr=r,to=void 0,ja=i.templates,eo({status:"ready",readyLocale:r}),dt.resolve())},i=>{Rr===e&&(eo({status:"error",errorLocale:r,errorMessage:i.toString()}),dt.reject(i))}),dt.promise};var xt=class extends _{constructor(){super(...arguments);this.history=[]}render(){return p`<header>
        <span class="icon">communication</span>${z("Conversation")}
      </header>
      ${this.history.map(t=>p`<div class="turn">
            ${t[1].split(", PartnerInput").map(i=>{let[o,a]=i.split(":"),s=o.startsWith("UserOutput")?"user":"partner";return p`<p class=${s}>${a}</p>`})}
          </div>`)}`}};xt.styles=x`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      overflow-y: scroll;
      padding-left: 0.5rem;
    }

    .turn {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    p {
      line-height: 1.2rem;
      margin: 0;
      max-width: 80%;
      padding: 0.5rem;
      width: fit-content;
    }

    .user {
      align-self: flex-end;
      background: var(--color-primary);
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 0.25rem;
      color: var(--color-on-parimary);
    }

    .partner {
      align-self: flex-start;
      background: var(--color-secondary);
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 1rem;
      color: var(--color-on-secondary);
    }

    header {
      align-items: center;
      display: flex;
      font-size: 1.2rem;
      font-weight: 500;
      gap: 0.5rem;
    }

    .icon {
      font-family: 'Material Symbols Outlined';
    }

    header .icon {
      font-size: 2rem;
    }
  `,g([d({type:Array})],xt.prototype,"history",2),xt=g([w("pv-conversation-history")],xt);var Nr=class extends _{render(){return p`<slot></slot>`}connectedCallback(){if(super.connectedCallback(),this.getAttribute("aria-hidden")==="false"){this.removeAttribute("aria-hidden");return}this.setAttribute("aria-hidden","true")}};var Ka=x`:host{font-size:var(--md-icon-size, 24px);width:var(--md-icon-size, 24px);height:var(--md-icon-size, 24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font, Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}
`;var io=class extends Nr{};io.styles=[Ka];io=n([w("md-icon")],io);var Ya=Symbol("attachableController"),Xa;Xa=new MutationObserver(r=>{for(let e of r)e.target[Ya]?.hostConnected()});var _t=class{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(e){e===null?this.host.removeAttribute("for"):this.host.setAttribute("for",e)}get control(){return this.host.hasAttribute("for")?!this.htmlFor||!this.host.isConnected?null:this.host.getRootNode().querySelector(`#${this.htmlFor}`):this.currentControl||this.host.parentElement}set control(e){e?this.attach(e):this.detach()}constructor(e,t){this.host=e,this.onControlChange=t,this.currentControl=null,e.addController(this),e[Ya]=this,Xa?.observe(e,{attributeFilter:["for"]})}attach(e){e!==this.currentControl&&(this.setCurrentControl(e),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(e){this.onControlChange(this.currentControl,e),this.currentControl=e}};var sl=["focusin","focusout","pointerdown"],wt=class extends _{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new _t(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(e){if(!e[Za]){switch(e.type){default:return;case"focusin":this.visible=this.control?.matches(":focus-visible")??!1;break;case"focusout":case"pointerdown":this.visible=!1;break}e[Za]=!0}}onControlChange(e,t){if(!!1)for(let i of sl)e?.removeEventListener(i,this),t?.addEventListener(i,this)}update(e){e.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(e)}};n([d({type:Boolean,reflect:!0})],wt.prototype,"visible",void 0);n([d({type:Boolean,reflect:!0})],wt.prototype,"inward",void 0);var Za=Symbol("handledByFocusRing");var Ja=x`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;var oo=class extends wt{};oo.styles=[Ja];oo=n([w("md-focus-ring")],oo);var ne={STANDARD:"cubic-bezier(0.2, 0, 0, 1)",STANDARD_ACCELERATE:"cubic-bezier(.3,0,1,1)",STANDARD_DECELERATE:"cubic-bezier(0,0,0,1)",EMPHASIZED:"cubic-bezier(.3,0,0,1)",EMPHASIZED_ACCELERATE:"cubic-bezier(.3,0,.8,.15)",EMPHASIZED_DECELERATE:"cubic-bezier(.05,.7,.1,1)"};function Qa(){let r=null;return{start(){return r?.abort(),r=new AbortController,r.signal},finish(){r=null}}}var nl=450,es=225,ll=.2,cl=10,dl=75,hl=.35,pl="::after",ul="forwards",ce;(function(r){r[r.INACTIVE=0]="INACTIVE",r[r.TOUCH_DELAY=1]="TOUCH_DELAY",r[r.HOLDING=2]="HOLDING",r[r.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK"})(ce||(ce={}));var fl=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"],ml=150,vl=window.matchMedia("(forced-colors: active)"),Ge=class extends _{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=ce.INACTIVE,this.attachableController=new _t(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){let e={hovered:this.hovered,pressed:this.pressed};return p`<div class="surface ${U(e)}"></div>`}update(e){e.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(e)}handlePointerenter(e){this.shouldReactToEvent(e)&&(this.hovered=!0)}handlePointerleave(e){this.shouldReactToEvent(e)&&(this.hovered=!1,this.state!==ce.INACTIVE&&this.endPressAnimation())}handlePointerup(e){if(this.shouldReactToEvent(e)){if(this.state===ce.HOLDING){this.state=ce.WAITING_FOR_CLICK;return}if(this.state===ce.TOUCH_DELAY){this.state=ce.WAITING_FOR_CLICK,this.startPressAnimation(this.rippleStartEvent);return}}}async handlePointerdown(e){if(this.shouldReactToEvent(e)){if(this.rippleStartEvent=e,!this.isTouch(e)){this.state=ce.WAITING_FOR_CLICK,this.startPressAnimation(e);return}this.state=ce.TOUCH_DELAY,await new Promise(t=>{setTimeout(t,ml)}),this.state===ce.TOUCH_DELAY&&(this.state=ce.HOLDING,this.startPressAnimation(e))}}handleClick(){if(!this.disabled){if(this.state===ce.WAITING_FOR_CLICK){this.endPressAnimation();return}this.state===ce.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation())}}handlePointercancel(e){this.shouldReactToEvent(e)&&this.endPressAnimation()}handleContextmenu(){this.disabled||this.endPressAnimation()}determineRippleSize(){let{height:e,width:t}=this.getBoundingClientRect(),i=Math.max(e,t),o=Math.max(hl*i,dl),a=this.currentCSSZoom??1,s=Math.floor(i*ll/a),c=Math.sqrt(t**2+e**2)+cl;this.initialSize=s;let h=(c+o)/s;this.rippleScale=`${h/a}`,this.rippleSize=`${s}px`}getNormalizedPointerEventCoords(e){let{scrollX:t,scrollY:i}=window,{left:o,top:a}=this.getBoundingClientRect(),s=t+o,l=i+a,{pageX:c,pageY:h}=e,u=this.currentCSSZoom??1;return{x:(c-s)/u,y:(h-l)/u}}getTranslationCoordinates(e){let{height:t,width:i}=this.getBoundingClientRect(),o=this.currentCSSZoom??1,a={x:(i/o-this.initialSize)/2,y:(t/o-this.initialSize)/2},s;return e instanceof PointerEvent?s=this.getNormalizedPointerEventCoords(e):s={x:i/o/2,y:t/o/2},s={x:s.x-this.initialSize/2,y:s.y-this.initialSize/2},{startPoint:s,endPoint:a}}startPressAnimation(e){if(!this.mdRoot)return;this.pressed=!0,this.growAnimation?.cancel(),this.determineRippleSize();let{startPoint:t,endPoint:i}=this.getTranslationCoordinates(e),o=`${t.x}px, ${t.y}px`,a=`${i.x}px, ${i.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${o}) scale(1)`,`translate(${a}) scale(${this.rippleScale})`]},{pseudoElement:pl,duration:nl,easing:ne.STANDARD,fill:ul})}async endPressAnimation(){this.rippleStartEvent=void 0,this.state=ce.INACTIVE;let e=this.growAnimation,t=1/0;if(typeof e?.currentTime=="number"?t=e.currentTime:e?.currentTime&&(t=e.currentTime.to("ms").value),t>=es){this.pressed=!1;return}await new Promise(i=>{setTimeout(i,es-t)}),this.growAnimation===e&&(this.pressed=!1)}shouldReactToEvent(e){if(this.disabled||!e.isPrimary||this.rippleStartEvent&&this.rippleStartEvent.pointerId!==e.pointerId)return!1;if(e.type==="pointerenter"||e.type==="pointerleave")return!this.isTouch(e);let t=e.buttons===1;return this.isTouch(e)||t}isTouch({pointerType:e}){return e==="touch"}async handleEvent(e){if(!vl?.matches)switch(e.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(e);break;case"pointerdown":await this.handlePointerdown(e);break;case"pointerenter":this.handlePointerenter(e);break;case"pointerleave":this.handlePointerleave(e);break;case"pointerup":this.handlePointerup(e);break;default:break}}onControlChange(e,t){if(!!1)for(let i of fl)e?.removeEventListener(i,this),t?.addEventListener(i,this)}};n([d({type:Boolean,reflect:!0})],Ge.prototype,"disabled",void 0);n([M()],Ge.prototype,"hovered",void 0);n([M()],Ge.prototype,"pressed",void 0);n([k(".surface")],Ge.prototype,"mdRoot",void 0);var ts=x`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;var ao=class extends Ge{};ao.styles=[ts];ao=n([w("md-ripple")],ao);var Z=Symbol("internals"),so=Symbol("privateInternals");function he(r){class e extends r{get[Z](){return this[so]||(this[so]=this.attachInternals()),this[so]}}return e}function zr(r){r.addInitializer(e=>{let t=e;t.addEventListener("click",async i=>{let{type:o,[Z]:a}=t,{form:s}=a;if(!(!s||o==="button")&&(await new Promise(l=>{setTimeout(l)}),!i.defaultPrevented)){if(o==="reset"){s.reset();return}s.addEventListener("submit",l=>{Object.defineProperty(l,"submitter",{configurable:!0,enumerable:!0,get:()=>t})},{capture:!0,once:!0}),a.setFormValue(t.value),s.requestSubmit()}})})}function no(r,e=!0){return e&&getComputedStyle(r).getPropertyValue("direction").trim()==="rtl"}var gl=J(he(_)),re=class extends gl{get name(){return this.getAttribute("name")??""}set name(e){this.setAttribute("name",e)}get form(){return this[Z].form}get labels(){return this[Z].labels}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.flipIconInRtl=!1,this.href="",this.download="",this.target="",this.ariaLabelSelected="",this.toggle=!1,this.selected=!1,this.type="submit",this.value="",this.flipIcon=no(this,this.flipIconInRtl),this.addEventListener("click",this.handleClick.bind(this))}willUpdate(){this.href&&(this.disabled=!1,this.softDisabled=!1)}render(){let e=this.href?X`div`:X`button`,{ariaLabel:t,ariaHasPopup:i,ariaExpanded:o}=this,a=t&&this.ariaLabelSelected,s=this.toggle?this.selected:v,l=v;return this.href||(l=a&&this.selected?this.ariaLabelSelected:t),qe`<${e}
        class="icon-button ${U(this.getRenderClasses())}"
        id="button"
        aria-label="${l||v}"
        aria-haspopup="${!this.href&&i||v}"
        aria-expanded="${!this.href&&o||v}"
        aria-pressed="${s}"
        aria-disabled=${!this.href&&this.softDisabled||v}
        ?disabled="${!this.href&&this.disabled}"
        @click="${this.handleClickOnChild}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected?v:this.renderIcon()}
        ${this.selected?this.renderSelectedIcon():v}
        ${this.href?this.renderLink():this.renderTouchTarget()}
  </${e}>`}renderLink(){let{ariaLabel:e}=this;return p`
      <a
        class="link"
        id="link"
        href="${this.href}"
        download="${this.download||v}"
        target="${this.target||v}"
        aria-label="${e||v}">
        ${this.renderTouchTarget()}
      </a>
    `}getRenderClasses(){return{"flip-icon":this.flipIcon,selected:this.toggle&&this.selected}}renderIcon(){return p`<span class="icon"><slot></slot></span>`}renderSelectedIcon(){return p`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`}renderTouchTarget(){return p`<span class="touch"></span>`}renderFocusRing(){return p`<md-focus-ring
      part="focus-ring"
      for=${this.href?"link":"button"}></md-focus-ring>`}renderRipple(){let e=!this.href&&(this.disabled||this.softDisabled);return p`<md-ripple
      for=${this.href?"link":v}
      ?disabled="${e}"></md-ripple>`}connectedCallback(){this.flipIcon=no(this,this.flipIconInRtl),super.connectedCallback()}handleClick(e){if(!this.href&&this.softDisabled){e.stopImmediatePropagation(),e.preventDefault();return}}async handleClickOnChild(e){await 0,!(!this.toggle||this.disabled||this.softDisabled||e.defaultPrevented)&&(this.selected=!this.selected,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0})))}};zr(re);re.formAssociated=!0;re.shadowRootOptions={mode:"open",delegatesFocus:!0};n([d({type:Boolean,reflect:!0})],re.prototype,"disabled",void 0);n([d({type:Boolean,attribute:"soft-disabled",reflect:!0})],re.prototype,"softDisabled",void 0);n([d({type:Boolean,attribute:"flip-icon-in-rtl"})],re.prototype,"flipIconInRtl",void 0);n([d()],re.prototype,"href",void 0);n([d()],re.prototype,"download",void 0);n([d()],re.prototype,"target",void 0);n([d({attribute:"aria-label-selected"})],re.prototype,"ariaLabelSelected",void 0);n([d({type:Boolean})],re.prototype,"toggle",void 0);n([d({type:Boolean,reflect:!0})],re.prototype,"selected",void 0);n([d()],re.prototype,"type",void 0);n([d({reflect:!0})],re.prototype,"value",void 0);n([M()],re.prototype,"flipIcon",void 0);var rs=x`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{display:grid;height:100%;outline:none;place-items:center;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1}}
`;var is=x`:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:is(:disabled,[aria-disabled=true]){color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:is(:disabled,[aria-disabled=true]){opacity:var(--_disabled-icon-opacity)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}.selected:not(:disabled,[aria-disabled=true]){color:var(--_selected-icon-color)}.selected:not(:disabled,[aria-disabled=true]):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled,[aria-disabled=true]):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled,[aria-disabled=true]):active{color:var(--_selected-pressed-icon-color)}
`;var lo=class extends re{getRenderClasses(){return{...super.getRenderClasses(),standard:!0}}};lo.styles=[rs,is];lo=n([w("md-icon-button")],lo);function Ke(r){let e=new MouseEvent("click",{bubbles:!0});return r.dispatchEvent(e),e}function Ye(r){return r.currentTarget!==r.target||r.composedPath()[0]!==r.target||r.target.disabled?!1:!bl(r)}function bl(r){let e=co;return e&&(r.preventDefault(),r.stopImmediatePropagation()),yl(),e}var co=!1;async function yl(){co=!0,await null,co=!1}function fe(r,e){e.bubbles&&(!r.shadowRoot||e.composed)&&e.stopPropagation();let t=Reflect.construct(e.constructor,[e.type,e]),i=r.dispatchEvent(t);return i||e.preventDefault(),i}var Te=Symbol("createValidator"),Ie=Symbol("getValidityAnchor"),ho=Symbol("privateValidator"),De=Symbol("privateSyncValidity"),Dr=Symbol("privateCustomValidationMessage");function Xe(r){var e;class t extends r{constructor(){super(...arguments),this[e]=""}get validity(){return this[De](),this[Z].validity}get validationMessage(){return this[De](),this[Z].validationMessage}get willValidate(){return this[De](),this[Z].willValidate}checkValidity(){return this[De](),this[Z].checkValidity()}reportValidity(){return this[De](),this[Z].reportValidity()}setCustomValidity(o){this[Dr]=o,this[De]()}requestUpdate(o,a,s){super.requestUpdate(o,a,s),this[De]()}firstUpdated(o){super.firstUpdated(o),this[De]()}[(e=Dr,De)](){if(!1)return;this[ho]||(this[ho]=this[Te]());let{validity:o,validationMessage:a}=this[ho].getValidity(),s=!!this[Dr],l=this[Dr]||a;this[Z].setValidity({...o,customError:s},l,this[Ie]()??void 0)}[Te](){throw new Error("Implement [createValidator]")}[Ie](){throw new Error("Implement [getValidityAnchor]")}}return t}var me=Symbol("getFormValue"),Et=Symbol("getFormState");function $e(r){class e extends r{get form(){return this[Z].form}get labels(){return this[Z].labels}get name(){return this.getAttribute("name")??""}set name(i){this.setAttribute("name",i)}get disabled(){return this.hasAttribute("disabled")}set disabled(i){this.toggleAttribute("disabled",i)}attributeChangedCallback(i,o,a){if(i==="name"||i==="disabled"){let s=i==="disabled"?o!==null:o;this.requestUpdate(i,s);return}super.attributeChangedCallback(i,o,a)}requestUpdate(i,o,a){super.requestUpdate(i,o,a),this[Z].setFormValue(this[me](),this[Et]())}[me](){throw new Error("Implement [getFormValue]")}[Et](){return this[me]()}formDisabledCallback(i){this.disabled=i}}return e.formAssociated=!0,n([d({noAccessor:!0})],e.prototype,"name",null),n([d({type:Boolean,noAccessor:!0})],e.prototype,"disabled",null),e}var Ze=class{constructor(e){this.getCurrentState=e,this.currentValidity={validity:{},validationMessage:""}}getValidity(){let e=this.getCurrentState();if(!(!this.prevState||!this.equals(this.prevState,e)))return this.currentValidity;let{validity:i,validationMessage:o}=this.computeValidity(e);return this.prevState=this.copy(e),this.currentValidity={validationMessage:o,validity:{badInput:i.badInput,customError:i.customError,patternMismatch:i.patternMismatch,rangeOverflow:i.rangeOverflow,rangeUnderflow:i.rangeUnderflow,stepMismatch:i.stepMismatch,tooLong:i.tooLong,tooShort:i.tooShort,typeMismatch:i.typeMismatch,valueMissing:i.valueMissing}},this.currentValidity}};var kt=class extends Ze{computeValidity(e){return this.checkboxControl||(this.checkboxControl=document.createElement("input"),this.checkboxControl.type="checkbox"),this.checkboxControl.checked=e.checked,this.checkboxControl.required=e.required,{validity:this.checkboxControl.validity,validationMessage:this.checkboxControl.validationMessage}}equals(e,t){return e.checked===t.checked&&e.required===t.required}copy({checked:e,required:t}){return{checked:e,required:t}}};var xl=J(Xe($e(he(_)))),ve=class extends xl{constructor(){super(),this.checked=!1,this.indeterminate=!1,this.required=!1,this.value="on",this.prevChecked=!1,this.prevDisabled=!1,this.prevIndeterminate=!1,this.addEventListener("click",e=>{!Ye(e)||!this.input||(this.focus(),Ke(this.input))})}update(e){(e.has("checked")||e.has("disabled")||e.has("indeterminate"))&&(this.prevChecked=e.get("checked")??this.checked,this.prevDisabled=e.get("disabled")??this.disabled,this.prevIndeterminate=e.get("indeterminate")??this.indeterminate),super.update(e)}render(){let e=!this.prevChecked&&!this.prevIndeterminate,t=this.prevChecked&&!this.prevIndeterminate,i=this.prevIndeterminate,o=this.checked&&!this.indeterminate,a=this.indeterminate,s=U({disabled:this.disabled,selected:o||a,unselected:!o&&!a,checked:o,indeterminate:a,"prev-unselected":e,"prev-checked":t,"prev-indeterminate":i,"prev-disabled":this.prevDisabled}),{ariaLabel:l,ariaInvalid:c}=this;return p`
      <div class="container ${s}">
        <input
          type="checkbox"
          id="input"
          aria-checked=${a?"mixed":v}
          aria-label=${l||v}
          aria-invalid=${c||v}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .indeterminate=${this.indeterminate}
          .checked=${this.checked}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <div class="outline"></div>
        <div class="background"></div>
        <md-focus-ring part="focus-ring" for="input"></md-focus-ring>
        <md-ripple for="input" ?disabled=${this.disabled}></md-ripple>
        <svg class="icon" viewBox="0 0 18 18" aria-hidden="true">
          <rect class="mark short" />
          <rect class="mark long" />
        </svg>
      </div>
    `}handleInput(e){let t=e.target;this.checked=t.checked,this.indeterminate=t.indeterminate}handleChange(e){fe(this,e)}[me](){return!this.checked||this.indeterminate?null:this.value}[Et](){return String(this.checked)}formResetCallback(){this.checked=this.hasAttribute("checked")}formStateRestoreCallback(e){this.checked=e==="true"}[Te](){return new kt(()=>this)}[Ie](){return this.input}};ve.shadowRootOptions={..._.shadowRootOptions,delegatesFocus:!0};n([d({type:Boolean})],ve.prototype,"checked",void 0);n([d({type:Boolean})],ve.prototype,"indeterminate",void 0);n([d({type:Boolean})],ve.prototype,"required",void 0);n([d()],ve.prototype,"value",void 0);n([M()],ve.prototype,"prevChecked",void 0);n([M()],ve.prototype,"prevDisabled",void 0);n([M()],ve.prototype,"prevIndeterminate",void 0);n([k("input")],ve.prototype,"input",void 0);var os=x`:host{border-start-start-radius:var(--md-checkbox-container-shape-start-start, var(--md-checkbox-container-shape, 2px));border-start-end-radius:var(--md-checkbox-container-shape-start-end, var(--md-checkbox-container-shape, 2px));border-end-end-radius:var(--md-checkbox-container-shape-end-end, var(--md-checkbox-container-shape, 2px));border-end-start-radius:var(--md-checkbox-container-shape-end-start, var(--md-checkbox-container-shape, 2px));display:inline-flex;height:var(--md-checkbox-container-size, 18px);position:relative;vertical-align:top;width:var(--md-checkbox-container-size, 18px);-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-checkbox-container-size, 18px))/2)}md-focus-ring{height:44px;inset:unset;width:44px}input{appearance:none;height:48px;margin:0;opacity:0;outline:none;position:absolute;width:48px;z-index:1;cursor:inherit}:host([touch-target=none]) input{height:100%;width:100%}.container{border-radius:inherit;display:flex;height:100%;place-content:center;place-items:center;position:relative;width:100%}.outline,.background,.icon{inset:0;position:absolute}.outline,.background{border-radius:inherit}.outline{border-color:var(--md-checkbox-outline-color, var(--md-sys-color-on-surface-variant, #49454f));border-style:solid;border-width:var(--md-checkbox-outline-width, 2px);box-sizing:border-box}.background{background-color:var(--md-checkbox-selected-container-color, var(--md-sys-color-primary, #6750a4))}.background,.icon{opacity:0;transition-duration:150ms,50ms;transition-property:transform,opacity;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15),linear;transform:scale(0.6)}:where(.selected) :is(.background,.icon){opacity:1;transition-duration:350ms,50ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1),linear;transform:scale(1)}md-ripple{border-radius:var(--md-checkbox-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-checkbox-state-layer-size, 40px);inset:unset;width:var(--md-checkbox-state-layer-size, 40px);--md-ripple-hover-color: var(--md-checkbox-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-checkbox-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-opacity: var(--md-checkbox-pressed-state-layer-opacity, 0.12)}.selected md-ripple{--md-ripple-hover-color: var(--md-checkbox-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-checkbox-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-selected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-checkbox-selected-pressed-state-layer-opacity, 0.12)}.icon{fill:var(--md-checkbox-selected-icon-color, var(--md-sys-color-on-primary, #fff));height:var(--md-checkbox-icon-size, 18px);width:var(--md-checkbox-icon-size, 18px)}.mark.short{height:2px;transition-property:transform,height;width:2px}.mark.long{height:2px;transition-property:transform,width;width:10px}.mark{animation-duration:150ms;animation-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15);transition-duration:150ms;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15)}.selected .mark{animation-duration:350ms;animation-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1);transition-duration:350ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1)}.checked .mark,.prev-checked.unselected .mark{transform:scaleY(-1) translate(7px, -14px) rotate(45deg)}.checked .mark.short,.prev-checked.unselected .mark.short{height:5.6568542495px}.checked .mark.long,.prev-checked.unselected .mark.long{width:11.313708499px}.indeterminate .mark,.prev-indeterminate.unselected .mark{transform:scaleY(-1) translate(4px, -10px) rotate(0deg)}.prev-unselected .mark{transition-property:none}.prev-unselected.checked .mark.long{animation-name:prev-unselected-to-checked}@keyframes prev-unselected-to-checked{from{width:0}}:where(:hover) .outline{border-color:var(--md-checkbox-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-hover-outline-width, 2px)}:where(:hover) .background{background:var(--md-checkbox-selected-hover-container-color, var(--md-sys-color-primary, #6750a4))}:where(:hover) .icon{fill:var(--md-checkbox-selected-hover-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:focus-within) .outline{border-color:var(--md-checkbox-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-focus-outline-width, 2px)}:where(:focus-within) .background{background:var(--md-checkbox-selected-focus-container-color, var(--md-sys-color-primary, #6750a4))}:where(:focus-within) .icon{fill:var(--md-checkbox-selected-focus-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:active) .outline{border-color:var(--md-checkbox-pressed-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-pressed-outline-width, 2px)}:where(:active) .background{background:var(--md-checkbox-selected-pressed-container-color, var(--md-sys-color-primary, #6750a4))}:where(:active) .icon{fill:var(--md-checkbox-selected-pressed-icon-color, var(--md-sys-color-on-primary, #fff))}:where(.disabled,.prev-disabled) :is(.background,.icon,.mark){animation-duration:0s;transition-duration:0s}:where(.disabled) .outline{border-color:var(--md-checkbox-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-disabled-outline-width, 2px);opacity:var(--md-checkbox-disabled-container-opacity, 0.38)}:where(.selected.disabled) .outline{visibility:hidden}:where(.selected.disabled) .background{background:var(--md-checkbox-selected-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-checkbox-selected-disabled-container-opacity, 0.38)}:where(.disabled) .icon{fill:var(--md-checkbox-selected-disabled-icon-color, var(--md-sys-color-surface, #fef7ff))}@media(forced-colors: active){.background{background-color:CanvasText}.selected.disabled .background{background-color:GrayText;opacity:1}.outline{border-color:CanvasText}.disabled .outline{border-color:GrayText;opacity:1}.icon{fill:Canvas}}
`;var po=class extends ve{};po.styles=[os];po=n([w("md-checkbox")],po);var as=x`:host{display:flex;--md-ripple-hover-color: var(--md-menu-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-menu-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-menu-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-menu-item-pressed-state-layer-opacity, 0.12)}:host([disabled]){opacity:var(--md-menu-item-disabled-opacity, 0.3);pointer-events:none}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.list-item:not(.disabled){cursor:pointer}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;color:var(--md-menu-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-menu-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-menu-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-menu-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-menu-item-one-line-container-height, 56px);padding-top:var(--md-menu-item-top-space, 12px);padding-bottom:var(--md-menu-item-bottom-space, 12px);padding-inline-start:var(--md-menu-item-leading-space, 16px);padding-inline-end:var(--md-menu-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-menu-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-menu-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-menu-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-menu-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-menu-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-menu-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-menu-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-menu-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-menu-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-menu-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-menu-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}.list-item{background-color:var(--md-menu-item-container-color, transparent)}.list-item.selected{background-color:var(--md-menu-item-selected-container-color, var(--md-sys-color-secondary-container, #e8def8))}.selected:not(.disabled) ::slotted(*){color:var(--md-menu-item-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b))}@media(forced-colors: active){:host([disabled]),:host([disabled]) slot{color:GrayText;opacity:1}.list-item{position:relative}.list-item.selected::before{content:"";position:absolute;inset:0;box-sizing:border-box;border-radius:inherit;pointer-events:none;border:3px double CanvasText}}
`;var St=class extends _{constructor(){super(...arguments),this.multiline=!1}render(){return p`
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          class="default-slot"
          @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          name="supporting-text"
          @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `}handleTextSlotChange(){let e=!1,t=0;for(let i of this.textSlots)if(_l(i)&&(t+=1),t>1){e=!0;break}this.multiline=e}};n([d({type:Boolean,reflect:!0})],St.prototype,"multiline",void 0);n([Ce(".text slot")],St.prototype,"textSlots",void 0);function _l(r){for(let e of r.assignedNodes({flatten:!0})){let t=e.nodeType===Node.ELEMENT_NODE,i=e.nodeType===Node.TEXT_NODE&&e.textContent?.match(/\S/);if(t||i)return!0}return!1}var ss=x`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`;var uo=class extends St{};uo.styles=[ss];uo=n([w("md-item")],uo);function wl(r,e){return new CustomEvent("close-menu",{bubbles:!0,composed:!0,detail:{initiator:r,reason:e,itemPath:[r]}})}var mo=wl;var fo={SPACE:"Space",ENTER:"Enter"},Pr={CLICK_SELECTION:"click-selection",KEYDOWN:"keydown"},El={ESCAPE:"Escape",SPACE:fo.SPACE,ENTER:fo.ENTER};function Fr(r){return Object.values(El).some(e=>e===r)}function ns(r){return Object.values(fo).some(e=>e===r)}function jt(r,e){let t=new Event("md-contains",{bubbles:!0,composed:!0}),i=[],o=s=>{i=s.composedPath()};return e.addEventListener("md-contains",o),r.dispatchEvent(t),e.removeEventListener("md-contains",o),i.length>0}var pe={NONE:"none",LIST_ROOT:"list-root",FIRST_ITEM:"first-item",LAST_ITEM:"last-item"};var Br=class{constructor(e,t){this.host=e,this.internalTypeaheadText=null,this.onClick=()=>{this.host.keepOpen||this.host.dispatchEvent(mo(this.host,{kind:Pr.CLICK_SELECTION}))},this.onKeydown=i=>{if(this.host.href&&i.code==="Enter"){let a=this.getInteractiveElement();a instanceof HTMLAnchorElement&&a.click()}if(i.defaultPrevented)return;let o=i.code;this.host.keepOpen&&o!=="Escape"||Fr(o)&&(i.preventDefault(),this.host.dispatchEvent(mo(this.host,{kind:Pr.KEYDOWN,key:o})))},this.getHeadlineElements=t.getHeadlineElements,this.getSupportingTextElements=t.getSupportingTextElements,this.getDefaultElements=t.getDefaultElements,this.getInteractiveElement=t.getInteractiveElement,this.host.addController(this)}get typeaheadText(){if(this.internalTypeaheadText!==null)return this.internalTypeaheadText;let e=this.getHeadlineElements(),t=[];return e.forEach(i=>{i.textContent&&i.textContent.trim()&&t.push(i.textContent.trim())}),t.length===0&&this.getDefaultElements().forEach(i=>{i.textContent&&i.textContent.trim()&&t.push(i.textContent.trim())}),t.length===0&&this.getSupportingTextElements().forEach(i=>{i.textContent&&i.textContent.trim()&&t.push(i.textContent.trim())}),t.join(" ")}get tagName(){switch(this.host.type){case"link":return"a";case"button":return"button";default:case"menuitem":case"option":return"li"}}get role(){return this.host.type==="option"?"option":"menuitem"}hostConnected(){this.host.toggleAttribute("md-menu-item",!0)}hostUpdate(){this.host.href&&(this.host.type="link")}setTypeaheadText(e){this.internalTypeaheadText=e}};function kl(){return new Event("request-selection",{bubbles:!0,composed:!0})}function Sl(){return new Event("request-deselection",{bubbles:!0,composed:!0})}var Hr=class{get role(){return this.menuItemController.role}get typeaheadText(){return this.menuItemController.typeaheadText}setTypeaheadText(e){this.menuItemController.setTypeaheadText(e)}get displayText(){return this.internalDisplayText!==null?this.internalDisplayText:this.menuItemController.typeaheadText}setDisplayText(e){this.internalDisplayText=e}constructor(e,t){this.host=e,this.internalDisplayText=null,this.firstUpdate=!0,this.onClick=()=>{this.menuItemController.onClick()},this.onKeydown=i=>{this.menuItemController.onKeydown(i)},this.lastSelected=this.host.selected,this.menuItemController=new Br(e,t),e.addController(this)}hostUpdate(){this.lastSelected!==this.host.selected&&(this.host.ariaSelected=this.host.selected?"true":"false")}hostUpdated(){this.lastSelected!==this.host.selected&&!this.firstUpdate&&(this.host.selected?this.host.dispatchEvent(kl()):this.host.dispatchEvent(Sl())),this.lastSelected=this.host.selected,this.firstUpdate=!1}};var Cl=J(_),de=class extends Cl{constructor(){super(...arguments),this.disabled=!1,this.isMenuItem=!0,this.selected=!1,this.value="",this.type="option",this.selectOptionController=new Hr(this,{getHeadlineElements:()=>this.headlineElements,getSupportingTextElements:()=>this.supportingTextElements,getDefaultElements:()=>this.defaultElements,getInteractiveElement:()=>this.listItemRoot})}get typeaheadText(){return this.selectOptionController.typeaheadText}set typeaheadText(e){this.selectOptionController.setTypeaheadText(e)}get displayText(){return this.selectOptionController.displayText}set displayText(e){this.selectOptionController.setDisplayText(e)}render(){return this.renderListItem(p`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `)}renderListItem(e){return p`
      <li
        id="item"
        tabindex=${this.disabled?-1:0}
        role=${this.selectOptionController.role}
        aria-label=${this.ariaLabel||v}
        aria-selected=${this.ariaSelected||v}
        aria-checked=${this.ariaChecked||v}
        aria-expanded=${this.ariaExpanded||v}
        aria-haspopup=${this.ariaHasPopup||v}
        class="list-item ${U(this.getRenderClasses())}"
        @click=${this.selectOptionController.onClick}
        @keydown=${this.selectOptionController.onKeydown}
        >${e}</li
      >
    `}renderRipple(){return p` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.disabled}></md-ripple>`}renderFocusRing(){return p` <md-focus-ring
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`}getRenderClasses(){return{disabled:this.disabled,selected:this.selected}}renderBody(){return p`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `}focus(){this.listItemRoot?.focus()}};de.shadowRootOptions={..._.shadowRootOptions,delegatesFocus:!0};n([d({type:Boolean,reflect:!0})],de.prototype,"disabled",void 0);n([d({type:Boolean,attribute:"md-menu-item",reflect:!0})],de.prototype,"isMenuItem",void 0);n([d({type:Boolean})],de.prototype,"selected",void 0);n([d()],de.prototype,"value",void 0);n([k(".list-item")],de.prototype,"listItemRoot",void 0);n([ie({slot:"headline"})],de.prototype,"headlineElements",void 0);n([ie({slot:"supporting-text"})],de.prototype,"supportingTextElements",void 0);n([cr({slot:""})],de.prototype,"defaultElements",void 0);n([d({attribute:"typeahead-text"})],de.prototype,"typeaheadText",null);n([d({attribute:"display-text"})],de.prototype,"displayText",null);var vo=class extends de{};vo.styles=[as];vo=n([w("md-select-option")],vo);var Ur=class extends _{connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){return p`<span class="shadow"></span>`}};var ls=x`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;var go=class extends Ur{};go.styles=[ls];go=n([w("md-elevation")],go);var Al=J(he(_)),ee=class extends Al{get name(){return this.getAttribute("name")??""}set name(e){this.setAttribute("name",e)}get form(){return this[Z].form}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.href="",this.download="",this.target="",this.trailingIcon=!1,this.hasIcon=!1,this.type="submit",this.value="",this.addEventListener("click",this.handleClick.bind(this))}focus(){this.buttonElement?.focus()}blur(){this.buttonElement?.blur()}render(){let e=this.disabled||this.softDisabled,t=this.href?this.renderLink():this.renderButton(),i=this.href?"link":"button";return p`
      ${this.renderElevationOrOutline?.()}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${i}></md-focus-ring>
      <md-ripple
        part="ripple"
        for=${i}
        ?disabled="${e}"></md-ripple>
      ${t}
    `}renderButton(){let{ariaLabel:e,ariaHasPopup:t,ariaExpanded:i}=this;return p`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-disabled=${this.softDisabled||v}
      aria-label="${e||v}"
      aria-haspopup="${t||v}"
      aria-expanded="${i||v}">
      ${this.renderContent()}
    </button>`}renderLink(){let{ariaLabel:e,ariaHasPopup:t,ariaExpanded:i}=this;return p`<a
      id="link"
      class="button"
      aria-label="${e||v}"
      aria-haspopup="${t||v}"
      aria-expanded="${i||v}"
      aria-disabled=${this.disabled||this.softDisabled||v}
      tabindex="${this.disabled&&!this.softDisabled?-1:v}"
      href=${this.href}
      download=${this.download||v}
      target=${this.target||v}
      >${this.renderContent()}
    </a>`}renderContent(){let e=p`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;return p`
      <span class="touch"></span>
      ${this.trailingIcon?v:e}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon?e:v}
    `}handleClick(e){if(this.softDisabled||this.disabled&&this.href){e.stopImmediatePropagation(),e.preventDefault();return}!Ye(e)||!this.buttonElement||(this.focus(),Ke(this.buttonElement))}handleSlotChange(){this.hasIcon=this.assignedIcons.length>0}};zr(ee);ee.formAssociated=!0;ee.shadowRootOptions={mode:"open",delegatesFocus:!0};n([d({type:Boolean,reflect:!0})],ee.prototype,"disabled",void 0);n([d({type:Boolean,attribute:"soft-disabled",reflect:!0})],ee.prototype,"softDisabled",void 0);n([d()],ee.prototype,"href",void 0);n([d()],ee.prototype,"download",void 0);n([d()],ee.prototype,"target",void 0);n([d({type:Boolean,attribute:"trailing-icon",reflect:!0})],ee.prototype,"trailingIcon",void 0);n([d({type:Boolean,attribute:"has-icon",reflect:!0})],ee.prototype,"hasIcon",void 0);n([d()],ee.prototype,"type",void 0);n([d({reflect:!0})],ee.prototype,"value",void 0);n([k(".button")],ee.prototype,"buttonElement",void 0);n([ie({slot:"icon",flatten:!0})],ee.prototype,"assignedIcons",void 0);var Vr=class extends ee{renderElevationOrOutline(){return p`<md-elevation part="elevation"></md-elevation>`}};var cs=x`:host{--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color: var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color: var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-button-leading-space, 24px);--_trailing-space: var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}
`;var ds=x`md-elevation{transition-duration:280ms}:host(:is([disabled],[soft-disabled])) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host(:is([disabled],[soft-disabled])) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}
`;var Wr=x`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host(:is([disabled],[soft-disabled])) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host(:is([disabled],[soft-disabled])) .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host(:is([disabled],[soft-disabled])) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}
`;var bo=class extends Vr{};bo.styles=[Wr,ds,cs];bo=n([w("md-filled-button")],bo);var qr=class extends ee{};var hs=x`:host{--_container-height: var(--md-text-button-container-height, 40px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-text-button-icon-size, 18px);--_pressed-icon-color: var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-text-button-leading-space, 12px);--_trailing-space: var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space: var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space: var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space: var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space: var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}
`;var yo=class extends qr{};yo.styles=[Wr,hs];yo=n([w("md-text-button")],yo);var us=Symbol("dispatchHooks");function fs(r,e){let t=r[us];if(!t)throw new Error(`'${r.type}' event needs setupDispatchHooks().`);t.addEventListener("after",e)}var ps=new WeakMap;function ms(r,...e){let t=ps.get(r);t||(t=new Set,ps.set(r,t));for(let i of e){if(t.has(i))continue;let o=!1;r.addEventListener(i,a=>{if(o)return;a.stopImmediatePropagation();let s=Reflect.construct(a.constructor,[a.type,a]),l=new EventTarget;s[us]=l,o=!0;let c=r.dispatchEvent(s);o=!1,c||a.preventDefault(),l.dispatchEvent(new Event("after"))},{capture:!0}),t.add(i)}}var Tl=J(Xe($e(he(_)))),ke=class extends Tl{constructor(){super(),this.selected=!1,this.icons=!1,this.showOnlySelectedIcon=!1,this.required=!1,this.value="on",!!1&&(this.addEventListener("click",e=>{!Ye(e)||!this.input||(this.focus(),Ke(this.input))}),ms(this,"keydown"),this.addEventListener("keydown",e=>{fs(e,()=>{e.defaultPrevented||e.key!=="Enter"||this.disabled||!this.input||this.input.click()})}))}render(){return p`
      <div class="switch ${U(this.getRenderClasses())}">
        <input
          id="switch"
          class="touch"
          type="checkbox"
          role="switch"
          aria-label=${this.ariaLabel||v}
          ?checked=${this.selected}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <md-focus-ring part="focus-ring" for="switch"></md-focus-ring>
        <span class="track"> ${this.renderHandle()} </span>
      </div>
    `}getRenderClasses(){return{selected:this.selected,unselected:!this.selected,disabled:this.disabled}}renderHandle(){let e={"with-icon":this.showOnlySelectedIcon?this.selected:this.icons};return p`
      ${this.renderTouchTarget()}
      <span class="handle-container">
        <md-ripple for="switch" ?disabled="${this.disabled}"></md-ripple>
        <span class="handle ${U(e)}">
          ${this.shouldShowIcons()?this.renderIcons():p``}
        </span>
      </span>
    `}renderIcons(){return p`
      <div class="icons">
        ${this.renderOnIcon()}
        ${this.showOnlySelectedIcon?p``:this.renderOffIcon()}
      </div>
    `}renderOnIcon(){return p`
      <slot class="icon icon--on" name="on-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
        </svg>
      </slot>
    `}renderOffIcon(){return p`
      <slot class="icon icon--off" name="off-icon">
        <svg viewBox="0 0 24 24">
          <path
            d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
        </svg>
      </slot>
    `}renderTouchTarget(){return p`<span class="touch"></span>`}shouldShowIcons(){return this.icons||this.showOnlySelectedIcon}handleInput(e){let t=e.target;this.selected=t.checked}handleChange(e){fe(this,e)}[me](){return this.selected?this.value:null}[Et](){return String(this.selected)}formResetCallback(){this.selected=this.hasAttribute("selected")}formStateRestoreCallback(e){this.selected=e==="true"}[Te](){return new kt(()=>({checked:this.selected,required:this.required}))}[Ie](){return this.input}};ke.shadowRootOptions={mode:"open",delegatesFocus:!0};n([d({type:Boolean})],ke.prototype,"selected",void 0);n([d({type:Boolean})],ke.prototype,"icons",void 0);n([d({type:Boolean,attribute:"show-only-selected-icon"})],ke.prototype,"showOnlySelectedIcon",void 0);n([d({type:Boolean})],ke.prototype,"required",void 0);n([d()],ke.prototype,"value",void 0);n([k("input")],ke.prototype,"input",void 0);var vs=x`@layer styles, hcm;@layer styles{:host{display:inline-flex;outline:none;vertical-align:top;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-switch-track-height, 32px))/2) 0px}md-focus-ring{--md-focus-ring-shape-start-start: var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-start-end: var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-end: var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));--md-focus-ring-shape-end-start: var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}.switch{align-items:center;display:inline-flex;flex-shrink:0;position:relative;width:var(--md-switch-track-width, 52px);height:var(--md-switch-track-height, 32px);border-start-start-radius:var(--md-switch-track-shape-start-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-track-shape-start-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-track-shape-end-end, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-track-shape-end-start, var(--md-switch-track-shape, var(--md-sys-shape-corner-full, 9999px)))}input{appearance:none;height:max(100%,var(--md-switch-touch-target-size, 48px));outline:none;margin:0;position:absolute;width:max(100%,var(--md-switch-touch-target-size, 48px));z-index:1;cursor:inherit;top:50%;left:50%;transform:translate(-50%, -50%)}:host([touch-target=none]) input{display:none}}@layer styles{.track{position:absolute;width:100%;height:100%;box-sizing:border-box;border-radius:inherit;display:flex;justify-content:center;align-items:center}.track::before{content:"";display:flex;position:absolute;height:100%;width:100%;border-radius:inherit;box-sizing:border-box;transition-property:opacity,background-color;transition-timing-function:linear;transition-duration:67ms}.disabled .track{background-color:rgba(0,0,0,0);border-color:rgba(0,0,0,0)}.disabled .track::before,.disabled .track::after{transition:none;opacity:var(--md-switch-disabled-track-opacity, 0.12)}.disabled .track::before{background-clip:content-box}.selected .track::before{background-color:var(--md-switch-selected-track-color, var(--md-sys-color-primary, #6750a4))}.selected:hover .track::before{background-color:var(--md-switch-selected-hover-track-color, var(--md-sys-color-primary, #6750a4))}.selected:focus-within .track::before{background-color:var(--md-switch-selected-focus-track-color, var(--md-sys-color-primary, #6750a4))}.selected:active .track::before{background-color:var(--md-switch-selected-pressed-track-color, var(--md-sys-color-primary, #6750a4))}.selected.disabled .track{background-clip:border-box}.selected.disabled .track::before{background-color:var(--md-switch-disabled-selected-track-color, var(--md-sys-color-on-surface, #1d1b20))}.unselected .track::before{background-color:var(--md-switch-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-track-outline-color, var(--md-sys-color-outline, #79747e));border-style:solid;border-width:var(--md-switch-track-outline-width, 2px)}.unselected:hover .track::before{background-color:var(--md-switch-hover-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-hover-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:focus-visible .track::before{background-color:var(--md-switch-focus-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-focus-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected:active .track::before{background-color:var(--md-switch-pressed-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-pressed-track-outline-color, var(--md-sys-color-outline, #79747e))}.unselected.disabled .track::before{background-color:var(--md-switch-disabled-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));border-color:var(--md-switch-disabled-track-outline-color, var(--md-sys-color-on-surface, #1d1b20))}}@layer hcm{@media(forced-colors: active){.selected .track::before{background:ButtonText;border-color:ButtonText}.disabled .track::before{border-color:GrayText;opacity:1}.disabled.selected .track::before{background:GrayText}}}@layer styles{.handle-container{display:flex;place-content:center;place-items:center;position:relative;transition:margin 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)}.selected .handle-container{margin-inline-start:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.unselected .handle-container{margin-inline-end:calc(var(--md-switch-track-width, 52px) - var(--md-switch-track-height, 32px))}.disabled .handle-container{transition:none}.handle{border-start-start-radius:var(--md-switch-handle-shape-start-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-start-end-radius:var(--md-switch-handle-shape-start-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-end-radius:var(--md-switch-handle-shape-end-end, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));border-end-start-radius:var(--md-switch-handle-shape-end-start, var(--md-switch-handle-shape, var(--md-sys-shape-corner-full, 9999px)));height:var(--md-switch-handle-height, 16px);width:var(--md-switch-handle-width, 16px);transform-origin:center;transition-property:height,width;transition-duration:250ms,250ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1),cubic-bezier(0.2, 0, 0, 1);z-index:0}.handle::before{content:"";display:flex;inset:0;position:absolute;border-radius:inherit;box-sizing:border-box;transition:background-color 67ms linear}.disabled .handle,.disabled .handle::before{transition:none}.selected .handle{height:var(--md-switch-selected-handle-height, 24px);width:var(--md-switch-selected-handle-width, 24px)}.handle.with-icon{height:var(--md-switch-with-icon-handle-height, 24px);width:var(--md-switch-with-icon-handle-width, 24px)}.selected:not(.disabled):active .handle,.unselected:not(.disabled):active .handle{height:var(--md-switch-pressed-handle-height, 28px);width:var(--md-switch-pressed-handle-width, 28px);transition-timing-function:linear;transition-duration:100ms}.selected .handle::before{background-color:var(--md-switch-selected-handle-color, var(--md-sys-color-on-primary, #fff))}.selected:hover .handle::before{background-color:var(--md-switch-selected-hover-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:focus-within .handle::before{background-color:var(--md-switch-selected-focus-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected:active .handle::before{background-color:var(--md-switch-selected-pressed-handle-color, var(--md-sys-color-primary-container, #eaddff))}.selected.disabled .handle::before{background-color:var(--md-switch-disabled-selected-handle-color, var(--md-sys-color-surface, #fef7ff));opacity:var(--md-switch-disabled-selected-handle-opacity, 1)}.unselected .handle::before{background-color:var(--md-switch-handle-color, var(--md-sys-color-outline, #79747e))}.unselected:hover .handle::before{background-color:var(--md-switch-hover-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:focus-within .handle::before{background-color:var(--md-switch-focus-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected:active .handle::before{background-color:var(--md-switch-pressed-handle-color, var(--md-sys-color-on-surface-variant, #49454f))}.unselected.disabled .handle::before{background-color:var(--md-switch-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-handle-opacity, 0.38)}md-ripple{border-radius:var(--md-switch-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-switch-state-layer-size, 40px);inset:unset;width:var(--md-switch-state-layer-size, 40px)}.selected md-ripple{--md-ripple-hover-color: var(--md-switch-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-color: var(--md-switch-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-switch-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-selected-pressed-state-layer-opacity, 0.12)}.unselected md-ripple{--md-ripple-hover-color: var(--md-switch-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-color: var(--md-switch-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-switch-hover-state-layer-opacity, 0.08);--md-ripple-pressed-opacity: var(--md-switch-pressed-state-layer-opacity, 0.12)}}@layer hcm{@media(forced-colors: active){.unselected .handle::before{background:ButtonText}.disabled .handle::before{opacity:1}.disabled.unselected .handle::before{background:GrayText}}}@layer styles{.icons{position:relative;height:100%;width:100%}.icon{position:absolute;inset:0;margin:auto;display:flex;align-items:center;justify-content:center;fill:currentColor;transition:fill 67ms linear,opacity 33ms linear,transform 167ms cubic-bezier(0.2, 0, 0, 1);opacity:0}.disabled .icon{transition:none}.selected .icon--on,.unselected .icon--off{opacity:1}.unselected .handle:not(.with-icon) .icon--on{transform:rotate(-45deg)}.icon--off{width:var(--md-switch-icon-size, 16px);height:var(--md-switch-icon-size, 16px);color:var(--md-switch-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:hover .icon--off{color:var(--md-switch-hover-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:focus-within .icon--off{color:var(--md-switch-focus-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected:active .icon--off{color:var(--md-switch-pressed-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9))}.unselected.disabled .icon--off{color:var(--md-switch-disabled-icon-color, var(--md-sys-color-surface-container-highest, #e6e0e9));opacity:var(--md-switch-disabled-icon-opacity, 0.38)}.icon--on{width:var(--md-switch-selected-icon-size, 16px);height:var(--md-switch-selected-icon-size, 16px);color:var(--md-switch-selected-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:hover .icon--on{color:var(--md-switch-selected-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:focus-within .icon--on{color:var(--md-switch-selected-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected:active .icon--on{color:var(--md-switch-selected-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d))}.selected.disabled .icon--on{color:var(--md-switch-disabled-selected-icon-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-switch-disabled-selected-icon-opacity, 0.38)}}@layer hcm{@media(forced-colors: active){.icon--off{fill:Canvas}.icon--on{fill:ButtonText}.disabled.unselected .icon--off,.disabled.selected .icon--on{opacity:1}.disabled .icon--on{fill:GrayText}}}
`;var xo=class extends ke{};xo.styles=[vs];xo=n([w("md-switch")],xo);var jr=Symbol("isFocusable"),_o=Symbol("privateIsFocusable"),Gr=Symbol("externalTabIndex"),Kr=Symbol("isUpdatingTabIndex"),Yr=Symbol("updateTabIndex");function gs(r){var e,t,i;class o extends r{constructor(){super(...arguments),this[e]=!0,this[t]=null,this[i]=!1}get[jr](){return this[_o]}set[jr](s){this[jr]!==s&&(this[_o]=s,this[Yr]())}connectedCallback(){super.connectedCallback(),this[Yr]()}attributeChangedCallback(s,l,c){if(s!=="tabindex"){super.attributeChangedCallback(s,l,c);return}if(this.requestUpdate("tabIndex",Number(l??-1)),!this[Kr]){if(!this.hasAttribute("tabindex")){this[Gr]=null,this[Yr]();return}this[Gr]=this.tabIndex}}[(e=_o,t=Gr,i=Kr,Yr)](){let s=this[jr]?0:-1,l=this[Gr]??s;this[Kr]=!0,this.tabIndex=l,this[Kr]=!1}}return n([d({noAccessor:!0})],o.prototype,"tabIndex",void 0),o}var wo=Symbol("animateIndicator"),Il=gs(_),ge=class extends Il{get selected(){return this.active}set selected(e){this.active=e}constructor(){super(),this.isTab=!0,this.active=!1,this.hasIcon=!1,this.iconOnly=!1,this.fullWidthIndicator=!1,this.internals=this.attachInternals(),this.internals.role="tab",this.addEventListener("keydown",this.handleKeydown.bind(this))}render(){let e=p`<div class="indicator"></div>`;return p`<div
      class="button"
      role="presentation"
      @click=${this.handleContentClick}>
      <md-focus-ring part="focus-ring" inward .control=${this}></md-focus-ring>
      <md-elevation part="elevation"></md-elevation>
      <md-ripple .control=${this}></md-ripple>
      <div
        class="content ${U(this.getContentClasses())}"
        role="presentation">
        <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${this.fullWidthIndicator?v:e}
      </div>
      ${this.fullWidthIndicator?e:v}
    </div>`}getContentClasses(){return{"has-icon":this.hasIcon,"has-label":!this.iconOnly}}updated(){this.internals.ariaSelected=String(this.active)}async handleKeydown(e){await 0,!e.defaultPrevented&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.click())}handleContentClick(e){e.stopPropagation(),this.click()}[wo](e){if(!this.indicator)return;this.indicator.getAnimations().forEach(i=>{i.cancel()});let t=this.getKeyframes(e);t!==null&&this.indicator.animate(t,{duration:250,easing:ne.EMPHASIZED})}getKeyframes(e){let t=$l();if(!this.active)return t?[{opacity:1},{transform:"none"}]:null;let i={},o=e.indicator?.getBoundingClientRect()??{},a=o.left,s=o.width,l=this.indicator.getBoundingClientRect(),c=l.left,h=l.width,u=s/h;return!t&&a!==void 0&&c!==void 0&&!isNaN(u)?i.transform=`translateX(${(a-c).toFixed(4)}px) scaleX(${u.toFixed(4)})`:i.opacity=0,[i,{transform:"none"}]}handleSlotChange(){this.iconOnly=!1;for(let e of this.assignedDefaultNodes){let t=e.nodeType===Node.TEXT_NODE&&!!e.wholeText.match(/\S/);if(e.nodeType===Node.ELEMENT_NODE||t)return}this.iconOnly=!0}handleIconSlotChange(){this.hasIcon=this.assignedIcons.length>0}};n([d({type:Boolean,reflect:!0,attribute:"md-tab"})],ge.prototype,"isTab",void 0);n([d({type:Boolean,reflect:!0})],ge.prototype,"active",void 0);n([d({type:Boolean})],ge.prototype,"selected",null);n([d({type:Boolean,attribute:"has-icon"})],ge.prototype,"hasIcon",void 0);n([d({type:Boolean,attribute:"icon-only"})],ge.prototype,"iconOnly",void 0);n([k(".indicator")],ge.prototype,"indicator",void 0);n([M()],ge.prototype,"fullWidthIndicator",void 0);n([cr({flatten:!0})],ge.prototype,"assignedDefaultNodes",void 0);n([ie({slot:"icon",flatten:!0})],ge.prototype,"assignedIcons",void 0);function $l(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}var Gt=class extends ge{constructor(){super(...arguments),this.inlineIcon=!1}getContentClasses(){return{...super.getContentClasses(),stacked:!this.inlineIcon}}};n([d({type:Boolean,attribute:"inline-icon"})],Gt.prototype,"inlineIcon",void 0);var bs=x`:host{--_active-indicator-color: var(--md-primary-tab-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-primary-tab-active-indicator-height, 3px);--_active-indicator-shape: var(--md-primary-tab-active-indicator-shape, 3px 3px 0px 0px);--_active-hover-state-layer-color: var(--md-primary-tab-active-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-hover-state-layer-opacity: var(--md-primary-tab-active-hover-state-layer-opacity, 0.08);--_active-pressed-state-layer-color: var(--md-primary-tab-active-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-state-layer-opacity: var(--md-primary-tab-active-pressed-state-layer-opacity, 0.12);--_container-color: var(--md-primary-tab-container-color, var(--md-sys-color-surface, #fef7ff));--_container-elevation: var(--md-primary-tab-container-elevation, 0);--_container-height: var(--md-primary-tab-container-height, 48px);--_with-icon-and-label-text-container-height: var(--md-primary-tab-with-icon-and-label-text-container-height, 64px);--_hover-state-layer-color: var(--md-primary-tab-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-primary-tab-hover-state-layer-opacity, 0.08);--_pressed-state-layer-color: var(--md-primary-tab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-primary-tab-pressed-state-layer-opacity, 0.12);--_active-focus-icon-color: var(--md-primary-tab-active-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_active-hover-icon-color: var(--md-primary-tab-active-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_active-icon-color: var(--md-primary-tab-active-icon-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-icon-color: var(--md-primary-tab-active-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-primary-tab-icon-size, 24px);--_focus-icon-color: var(--md-primary-tab-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-icon-color: var(--md-primary-tab-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-color: var(--md-primary-tab-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-primary-tab-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-primary-tab-label-text-font, var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-primary-tab-label-text-line-height, var(--md-sys-typescale-title-small-line-height, 1.25rem));--_label-text-size: var(--md-primary-tab-label-text-size, var(--md-sys-typescale-title-small-size, 0.875rem));--_label-text-weight: var(--md-primary-tab-label-text-weight, var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)));--_active-focus-label-text-color: var(--md-primary-tab-active-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-hover-label-text-color: var(--md-primary-tab-active-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-label-text-color: var(--md-primary-tab-active-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-label-text-color: var(--md-primary-tab-active-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-label-text-color: var(--md-primary-tab-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-primary-tab-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-color: var(--md-primary-tab-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-primary-tab-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start: var(--md-primary-tab-container-shape-start-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-start-end: var(--md-primary-tab-container-shape-start-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-end: var(--md-primary-tab-container-shape-end-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-primary-tab-container-shape-end-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)))}.content.stacked{flex-direction:column;gap:2px}.content.stacked.has-icon.has-label{height:var(--_with-icon-and-label-text-container-height)}
`;var ys=x`:host{display:inline-flex;align-items:center;justify-content:center;outline:none;padding:0 16px;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:middle;user-select:none;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);color:var(--_label-text-color);z-index:0;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);--md-elevation-level: var(--_container-elevation)}md-focus-ring{--md-focus-ring-shape: 8px}:host([active]) md-focus-ring{margin-bottom:calc(var(--_active-indicator-height) + 1px)}.button::before{background:var(--_container-color);content:"";inset:0;position:absolute;z-index:-1}.button::before,md-ripple,md-elevation{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start)}.content{position:relative;box-sizing:border-box;display:inline-flex;flex-direction:row;align-items:center;justify-content:center;height:var(--_container-height);gap:8px}.indicator{position:absolute;box-sizing:border-box;z-index:-1;transform-origin:bottom left;background:var(--_active-indicator-color);border-radius:var(--_active-indicator-shape);height:var(--_active-indicator-height);inset:auto 0 0 0;opacity:0}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;color:var(--_icon-color);font-size:var(--_icon-size);width:var(--_icon-size);height:var(--_icon-size)}:host(:hover){color:var(--_hover-label-text-color);cursor:pointer}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus){color:var(--_focus-label-text-color)}:host(:focus) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active){color:var(--_pressed-label-text-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([active]) .indicator{opacity:1}:host([active]){color:var(--_active-label-text-color);--md-ripple-hover-color: var(--_active-hover-state-layer-color);--md-ripple-hover-opacity: var(--_active-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_active-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_active-pressed-state-layer-opacity)}:host([active]) ::slotted([slot=icon]){color:var(--_active-icon-color)}:host([active]:hover){color:var(--_active-hover-label-text-color)}:host([active]:hover) ::slotted([slot=icon]){color:var(--_active-hover-icon-color)}:host([active]:focus){color:var(--_active-focus-label-text-color)}:host([active]:focus) ::slotted([slot=icon]){color:var(--_active-focus-icon-color)}:host([active]:active){color:var(--_active-pressed-label-text-color)}:host([active]:active) ::slotted([slot=icon]){color:var(--_active-pressed-icon-color)}:host,::slotted(*){white-space:nowrap}@media(forced-colors: active){.indicator{background:CanvasText}}
`;var Eo=class extends Gt{};Eo.styles=[ys,bs];Eo=n([w("md-primary-tab")],Eo);var ht=class extends _{constructor(){super(...arguments),this.inset=!1,this.insetStart=!1,this.insetEnd=!1}};n([d({type:Boolean,reflect:!0})],ht.prototype,"inset",void 0);n([d({type:Boolean,reflect:!0,attribute:"inset-start"})],ht.prototype,"insetStart",void 0);n([d({type:Boolean,reflect:!0,attribute:"inset-end"})],ht.prototype,"insetEnd",void 0);var xs=x`:host{box-sizing:border-box;color:var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));display:flex;height:var(--md-divider-thickness, 1px);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}
`;var ko=class extends ht{};ko.styles=[xs];ko=n([w("md-divider")],ko);var Pe=class extends _{get activeTab(){return this.tabs.find(e=>e.active)??null}set activeTab(e){e&&this.activateTab(e)}get activeTabIndex(){return this.tabs.findIndex(e=>e.active)}set activeTabIndex(e){let t=()=>{let i=this.tabs[e];i&&this.activateTab(i)};if(!this.slotElement){this.updateComplete.then(t);return}t()}get focusedTab(){return this.tabs.find(e=>e.matches(":focus-within"))}constructor(){super(),this.autoActivate=!1,this.internals=this.attachInternals(),this.internals.role="tablist",this.addEventListener("keydown",this.handleKeydown.bind(this)),this.addEventListener("keyup",this.handleKeyup.bind(this)),this.addEventListener("focusout",this.handleFocusout.bind(this))}async scrollToTab(e){await this.updateComplete;let{tabs:t}=this;if(e??=this.activeTab,!e||!t.includes(e)||!this.tabsScrollerElement)return;for(let b of this.tabs)await b.updateComplete;let i=e.offsetLeft,o=e.offsetWidth,a=this.scrollLeft,s=this.offsetWidth,l=48,c=i-l,h=i+o-s+l,u=Math.min(c,Math.max(h,a)),f=this.focusedTab?"auto":"instant";this.tabsScrollerElement.scrollTo({behavior:f,top:0,left:u})}render(){return p`
      <div class="tabs">
        <slot
          @slotchange=${this.handleSlotChange}
          @click=${this.handleTabClick}></slot>
      </div>
      <md-divider part="divider"></md-divider>
    `}async handleTabClick(e){let t=e.target;await 0,!(e.defaultPrevented||!Ol(t)||t.active)&&this.activateTab(t)}activateTab(e){let{tabs:t}=this,i=this.activeTab;if(!(!t.includes(e)||i===e)){for(let o of t)o.active=o===e;if(i){if(!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))){for(let a of t)a.active=a===i;return}e[wo](i)}this.updateFocusableTab(e),this.scrollToTab(e)}}updateFocusableTab(e){for(let t of this.tabs)t.tabIndex=t===e?0:-1}async handleKeydown(e){await 0;let t=e.key==="ArrowLeft",i=e.key==="ArrowRight",o=e.key==="Home",a=e.key==="End";if(e.defaultPrevented||!t&&!i&&!o&&!a)return;let{tabs:s}=this;if(s.length<2)return;e.preventDefault();let l;if(o||a)l=o?0:s.length-1;else{let u=getComputedStyle(this).direction==="rtl"?t:i,{focusedTab:f}=this;if(!f)l=u?0:s.length-1;else{let b=this.tabs.indexOf(f);l=u?b+1:b-1,l>=s.length?l=0:l<0&&(l=s.length-1)}}let c=s[l];c.focus(),this.autoActivate?this.activateTab(c):this.updateFocusableTab(c)}handleKeyup(){this.scrollToTab(this.focusedTab??this.activeTab)}handleFocusout(){if(this.matches(":focus-within"))return;let{activeTab:e}=this;e&&this.updateFocusableTab(e)}handleSlotChange(){let e=this.tabs[0];!this.activeTab&&e&&this.activateTab(e),this.scrollToTab(this.activeTab)}};n([ie({flatten:!0,selector:"[md-tab]"})],Pe.prototype,"tabs",void 0);n([d({type:Number,attribute:"active-tab-index"})],Pe.prototype,"activeTabIndex",null);n([d({type:Boolean,attribute:"auto-activate"})],Pe.prototype,"autoActivate",void 0);n([k(".tabs")],Pe.prototype,"tabsScrollerElement",void 0);n([k("slot")],Pe.prototype,"slotElement",void 0);function Ol(r){return r instanceof HTMLElement&&r.hasAttribute("md-tab")}var _s=x`:host{box-sizing:border-box;display:flex;flex-direction:column;overflow:auto;scroll-behavior:smooth;scrollbar-width:none;position:relative}:host([hidden]){display:none}:host::-webkit-scrollbar{display:none}.tabs{align-items:end;display:flex;height:100%;overflow:inherit;scroll-behavior:inherit;scrollbar-width:inherit;justify-content:space-between;width:100%}::slotted(*){flex:1}::slotted([active]){z-index:1}
`;var Kt=class extends Pe{};Kt.styles=[_s];Kt=n([w("md-tabs")],Kt);var q=class extends _{constructor(){super(...arguments),this.disabled=!1,this.error=!1,this.focused=!1,this.label="",this.noAsterisk=!1,this.populated=!1,this.required=!1,this.resizable=!1,this.supportingText="",this.errorText="",this.count=-1,this.max=-1,this.hasStart=!1,this.hasEnd=!1,this.isAnimating=!1,this.refreshErrorAlert=!1,this.disableTransitions=!1}get counterText(){let e=this.count??-1,t=this.max??-1;return e<0||t<=0?"":`${e} / ${t}`}get supportingOrErrorText(){return this.error&&this.errorText?this.errorText:this.supportingText}reannounceError(){this.refreshErrorAlert=!0}update(e){e.has("disabled")&&e.get("disabled")!==void 0&&(this.disableTransitions=!0),this.disabled&&this.focused&&(e.set("focused",!0),this.focused=!1),this.animateLabelIfNeeded({wasFocused:e.get("focused"),wasPopulated:e.get("populated")}),super.update(e)}render(){let e=this.renderLabel(!0),t=this.renderLabel(!1),i=this.renderOutline?.(e),o={disabled:this.disabled,"disable-transitions":this.disableTransitions,error:this.error&&!this.disabled,focused:this.focused,"with-start":this.hasStart,"with-end":this.hasEnd,populated:this.populated,resizable:this.resizable,required:this.required,"no-label":!this.label};return p`
      <div class="field ${U(o)}">
        <div class="container-overflow">
          ${this.renderBackground?.()}
          <slot name="container"></slot>
          ${this.renderStateLayer?.()} ${this.renderIndicator?.()} ${i}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${t} ${i?v:e}
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
        ${this.renderSupportingText()}
      </div>
    `}updated(e){(e.has("supportingText")||e.has("errorText")||e.has("count")||e.has("max"))&&this.updateSlottedAriaDescribedBy(),this.refreshErrorAlert&&requestAnimationFrame(()=>{this.refreshErrorAlert=!1}),this.disableTransitions&&requestAnimationFrame(()=>{this.disableTransitions=!1})}renderSupportingText(){let{supportingOrErrorText:e,counterText:t}=this;if(!e&&!t)return v;let i=p`<span>${e}</span>`,o=t?p`<span class="counter">${t}</span>`:v,s=this.error&&this.errorText&&!this.refreshErrorAlert?"alert":v;return p`
      <div class="supporting-text" role=${s}>${i}${o}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `}updateSlottedAriaDescribedBy(){for(let e of this.slottedAriaDescribedBy)gt(p`${this.supportingOrErrorText} ${this.counterText}`,e),e.setAttribute("hidden","")}renderLabel(e){if(!this.label)return v;let t;e?t=this.focused||this.populated||this.isAnimating:t=!this.focused&&!this.populated&&!this.isAnimating;let i={hidden:!t,floating:e,resting:!e},o=`${this.label}${this.required&&!this.noAsterisk?"*":""}`;return p`
      <span class="label ${U(i)}" aria-hidden=${!t}
        >${o}</span
      >
    `}animateLabelIfNeeded({wasFocused:e,wasPopulated:t}){if(!this.label)return;e??=this.focused,t??=this.populated;let i=e||t,o=this.focused||this.populated;i!==o&&(this.isAnimating=!0,this.labelAnimation?.cancel(),this.labelAnimation=this.floatingLabelEl?.animate(this.getLabelKeyframes(),{duration:150,easing:ne.STANDARD}),this.labelAnimation?.addEventListener("finish",()=>{this.isAnimating=!1}))}getLabelKeyframes(){let{floatingLabelEl:e,restingLabelEl:t}=this;if(!e||!t)return[];let{x:i,y:o,height:a}=e.getBoundingClientRect(),{x:s,y:l,height:c}=t.getBoundingClientRect(),h=e.scrollWidth,u=t.scrollWidth,f=u/h,b=s-i,m=l-o+Math.round((c-a*f)/2),E=`translateX(${b}px) translateY(${m}px) scale(${f})`,S="translateX(0) translateY(0) scale(1)",O=t.clientWidth,T=u>O?`${O/f}px`:"";return this.focused||this.populated?[{transform:E,width:T},{transform:S,width:T}]:[{transform:S,width:T},{transform:E,width:T}]}getSurfacePositionClientRect(){return this.containerEl.getBoundingClientRect()}};n([d({type:Boolean})],q.prototype,"disabled",void 0);n([d({type:Boolean})],q.prototype,"error",void 0);n([d({type:Boolean})],q.prototype,"focused",void 0);n([d()],q.prototype,"label",void 0);n([d({type:Boolean,attribute:"no-asterisk"})],q.prototype,"noAsterisk",void 0);n([d({type:Boolean})],q.prototype,"populated",void 0);n([d({type:Boolean})],q.prototype,"required",void 0);n([d({type:Boolean})],q.prototype,"resizable",void 0);n([d({attribute:"supporting-text"})],q.prototype,"supportingText",void 0);n([d({attribute:"error-text"})],q.prototype,"errorText",void 0);n([d({type:Number})],q.prototype,"count",void 0);n([d({type:Number})],q.prototype,"max",void 0);n([d({type:Boolean,attribute:"has-start"})],q.prototype,"hasStart",void 0);n([d({type:Boolean,attribute:"has-end"})],q.prototype,"hasEnd",void 0);n([ie({slot:"aria-describedby"})],q.prototype,"slottedAriaDescribedBy",void 0);n([M()],q.prototype,"isAnimating",void 0);n([M()],q.prototype,"refreshErrorAlert",void 0);n([M()],q.prototype,"disableTransitions",void 0);n([k(".label.floating")],q.prototype,"floatingLabelEl",void 0);n([k(".label.resting")],q.prototype,"restingLabelEl",void 0);n([k(".container")],q.prototype,"containerEl",void 0);var Xr=class extends q{renderBackground(){return p` <div class="background"></div> `}renderStateLayer(){return p` <div class="state-layer"></div> `}renderIndicator(){return p`<div class="active-indicator"></div>`}};var ws=x`@layer styles{:host{--_active-indicator-color: var(--md-filled-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-field-active-indicator-height, 1px);--_bottom-space: var(--md-filled-field-bottom-space, 16px);--_container-color: var(--md-filled-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_content-color: var(--md-filled-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-filled-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-filled-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-filled-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-filled-field-content-space, 16px);--_content-weight: var(--md-filled-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-active-indicator-color: var(--md-filled-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-field-disabled-container-opacity, 0.04);--_disabled-content-color: var(--md-filled-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-filled-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-filled-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-filled-field-disabled-leading-content-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-filled-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-filled-field-disabled-trailing-content-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-content-color: var(--md-filled-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-active-indicator-color: var(--md-filled-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-content-color: var(--md-filled-field-error-focus-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-label-text-color: var(--md-filled-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-filled-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-filled-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-content-color: var(--md-filled-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-filled-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-filled-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-filled-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-filled-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-filled-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-field-focus-active-indicator-height, 3px);--_focus-content-color: var(--md-filled-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-filled-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-filled-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-field-hover-active-indicator-height, 1px);--_hover-content-color: var(--md-filled-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-content-color: var(--md-filled-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-filled-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-filled-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-filled-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-filled-field-leading-space, 16px);--_supporting-text-color: var(--md-filled-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-filled-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-filled-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-filled-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-filled-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-filled-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-filled-field-top-space, 16px);--_trailing-content-color: var(--md-filled-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-filled-field-trailing-space, 16px);--_with-label-bottom-space: var(--md-filled-field-with-label-bottom-space, 8px);--_with-label-top-space: var(--md-filled-field-with-label-top-space, 8px);--_with-leading-content-leading-space: var(--md-filled-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-filled-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-filled-field-container-shape-start-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-field-container-shape-start-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-field-container-shape-end-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-field-container-shape-end-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)))}.background,.state-layer{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color)}.state-layer{visibility:hidden}.field:not(.disabled):hover .state-layer{visibility:visible}.label.floating{position:absolute;top:var(--_with-label-top-space)}.field:not(.with-start) .label-wrapper{margin-inline-start:var(--_leading-space)}.field:not(.with-end) .label-wrapper{margin-inline-end:var(--_trailing-space)}.active-indicator{inset:auto 0 0 0;pointer-events:none;position:absolute;width:100%;z-index:1}.active-indicator::before,.active-indicator::after{border-bottom:var(--_active-indicator-height) solid var(--_active-indicator-color);inset:auto 0 0 0;content:"";position:absolute;width:100%}.active-indicator::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .active-indicator::after{opacity:1}.field:not(.with-start) .content ::slotted(*){padding-inline-start:var(--_leading-space)}.field:not(.with-end) .content ::slotted(*){padding-inline-end:var(--_trailing-space)}.field:not(.no-label) .content ::slotted(:not(textarea)){padding-bottom:var(--_with-label-bottom-space);padding-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}.field:not(.no-label) .content ::slotted(textarea){margin-bottom:var(--_with-label-bottom-space);margin-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}:hover .active-indicator::before{border-bottom-color:var(--_hover-active-indicator-color);border-bottom-width:var(--_hover-active-indicator-height)}.active-indicator::after{border-bottom-color:var(--_focus-active-indicator-color);border-bottom-width:var(--_focus-active-indicator-height)}:hover .state-layer{background:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.disabled .active-indicator::before{border-bottom-color:var(--_disabled-active-indicator-color);border-bottom-width:var(--_disabled-active-indicator-height);opacity:var(--_disabled-active-indicator-opacity)}.disabled .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.error .active-indicator::before{border-bottom-color:var(--_error-active-indicator-color)}.error:hover .active-indicator::before{border-bottom-color:var(--_error-hover-active-indicator-color)}.error:hover .state-layer{background:var(--_error-hover-state-layer-color);opacity:var(--_error-hover-state-layer-opacity)}.error .active-indicator::after{border-bottom-color:var(--_error-focus-active-indicator-color)}.resizable .container{bottom:var(--_focus-active-indicator-height);clip-path:inset(var(--_focus-active-indicator-height) 0 0 0)}.resizable .container>*{top:var(--_focus-active-indicator-height)}}@layer hcm{@media(forced-colors: active){.disabled .active-indicator::before{border-color:GrayText;opacity:1}}}
`;var Zr=x`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}slot[name=container]{border-radius:inherit}slot[name=container]::slotted(*){border-radius:inherit;inset:0;pointer-events:none;position:absolute}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start{margin-inline:var(--_with-leading-content-leading-space) var(--_content-space)}.with-end .end{margin-inline:var(--_content-space) var(--_with-trailing-content-trailing-space)}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`;var So=class extends Xr{};So.styles=[Zr,ws];So=n([w("md-filled-field")],So);var Es=x`:host{--_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);--_caret-color: var(--md-filled-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);--_disabled-input-text-color: var(--md-filled-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-filled-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-filled-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filled-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-filled-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filled-text-field-disabled-trailing-icon-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-caret-color: var(--md-filled-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-filled-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-filled-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-filled-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-filled-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-input-text-color: var(--md-filled-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-filled-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-filled-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-filled-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-filled-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-filled-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-filled-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 3px);--_focus-input-text-color: var(--md-filled-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-filled-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-filled-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);--_hover-input-text-color: var(--md-filled-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-icon-color: var(--md-filled-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filled-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-filled-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-filled-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-filled-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-filled-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-filled-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-filled-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-filled-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-filled-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-filled-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-filled-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-filled-text-field-leading-icon-size, 24px);--_supporting-text-color: var(--md-filled-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-filled-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-filled-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-filled-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-filled-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-filled-text-field-container-shape-start-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-text-field-container-shape-start-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-text-field-container-shape-end-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-text-field-container-shape-end-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_icon-input-space: var(--md-filled-text-field-icon-input-space, 16px);--_leading-space: var(--md-filled-text-field-leading-space, 16px);--_trailing-space: var(--md-filled-text-field-trailing-space, 16px);--_top-space: var(--md-filled-text-field-top-space, 16px);--_bottom-space: var(--md-filled-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-filled-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-filled-text-field-input-text-suffix-leading-space, 2px);--_with-label-top-space: var(--md-filled-text-field-with-label-top-space, 8px);--_with-label-bottom-space: var(--md-filled-text-field-with-label-bottom-space, 8px);--_focus-caret-color: var(--md-filled-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-filled-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-filled-text-field-with-trailing-icon-trailing-space, 12px);--md-filled-field-active-indicator-color: var(--_active-indicator-color);--md-filled-field-active-indicator-height: var(--_active-indicator-height);--md-filled-field-bottom-space: var(--_bottom-space);--md-filled-field-container-color: var(--_container-color);--md-filled-field-container-shape-end-end: var(--_container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_container-shape-start-start);--md-filled-field-content-color: var(--_input-text-color);--md-filled-field-content-font: var(--_input-text-font);--md-filled-field-content-line-height: var(--_input-text-line-height);--md-filled-field-content-size: var(--_input-text-size);--md-filled-field-content-space: var(--_icon-input-space);--md-filled-field-content-weight: var(--_input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_error-active-indicator-color);--md-filled-field-error-content-color: var(--_error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_error-label-text-color);--md-filled-field-error-leading-content-color: var(--_error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_label-text-color);--md-filled-field-label-text-font: var(--_label-text-font);--md-filled-field-label-text-line-height: var(--_label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_label-text-populated-size);--md-filled-field-label-text-size: var(--_label-text-size);--md-filled-field-label-text-weight: var(--_label-text-weight);--md-filled-field-leading-content-color: var(--_leading-icon-color);--md-filled-field-leading-space: var(--_leading-space);--md-filled-field-supporting-text-color: var(--_supporting-text-color);--md-filled-field-supporting-text-font: var(--_supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_supporting-text-size);--md-filled-field-supporting-text-weight: var(--_supporting-text-weight);--md-filled-field-top-space: var(--_top-space);--md-filled-field-trailing-content-color: var(--_trailing-icon-color);--md-filled-field-trailing-space: var(--_trailing-space);--md-filled-field-with-label-bottom-space: var(--_with-label-bottom-space);--md-filled-field-with-label-top-space: var(--_with-label-top-space);--md-filled-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-filled-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;var Co=Me(class extends Ae{constructor(r){if(super(r),r.type!==ue.PROPERTY&&r.type!==ue.ATTRIBUTE&&r.type!==ue.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ar(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[e]){if(e===se||e===v)return e;let t=r.element,i=r.name;if(r.type===ue.PROPERTY){if(e===t[i])return se}else if(r.type===ue.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return se}else if(r.type===ue.ATTRIBUTE&&t.getAttribute(i)===e+"")return se;return La(r),e}});var ks="important",Rl=" !"+ks,Fe=Me(class extends Ae{constructor(r){if(super(r),r.type!==ue.ATTRIBUTE||r.name!=="style"||r.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((e,t)=>{let i=r[t];return i==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(r,[e]){let{style:t}=r.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?t.removeProperty(i):t[i]=null);for(let i in e){let o=e[i];if(o!=null){this.ft.add(i);let a=typeof o=="string"&&o.endsWith(Rl);i.includes("-")||a?t.setProperty(i,a?o.slice(0,-11):o,a?ks:""):t[i]=o}}return se}});var Ss={fromAttribute(r){return r??""},toAttribute(r){return r||null}};var Ct=Symbol("onReportValidity"),Jr=Symbol("privateCleanupFormListeners"),Qr=Symbol("privateDoNotReportInvalid"),ei=Symbol("privateIsSelfReportingValidity"),ti=Symbol("privateCallOnReportValidity");function ri(r){var e,t,i;class o extends r{constructor(...s){super(...s),this[e]=new AbortController,this[t]=!1,this[i]=!1,!!1&&this.addEventListener("invalid",l=>{this[Qr]||!l.isTrusted||this.addEventListener("invalid",()=>{this[ti](l)},{once:!0})},{capture:!0})}checkValidity(){this[Qr]=!0;let s=super.checkValidity();return this[Qr]=!1,s}reportValidity(){this[ei]=!0;let s=super.reportValidity();return s&&this[ti](null),this[ei]=!1,s}[(e=Jr,t=Qr,i=ei,ti)](s){let l=s?.defaultPrevented;l||(this[Ct](s),!(!l&&s?.defaultPrevented))||(this[ei]||Nl(this[Z].form,this))&&this.focus()}[Ct](s){throw new Error("Implement [onReportValidity]")}formAssociatedCallback(s){super.formAssociatedCallback&&super.formAssociatedCallback(s),this[Jr].abort(),s&&(this[Jr]=new AbortController,Ll(this,s,()=>{this[ti](null)},this[Jr].signal))}}return o}function Ll(r,e,t,i){let o=Ml(e),a=!1,s,l=!1;o.addEventListener("before",()=>{l=!0,s=new AbortController,a=!1,r.addEventListener("invalid",()=>{a=!0},{signal:s.signal})},{signal:i}),o.addEventListener("after",()=>{l=!1,s?.abort(),!a&&t()},{signal:i}),e.addEventListener("submit",()=>{l||t()},{signal:i})}var Ao=new WeakMap;function Ml(r){if(!Ao.has(r)){let e=new EventTarget;Ao.set(r,e);for(let t of["reportValidity","requestSubmit"]){let i=r[t];r[t]=function(){e.dispatchEvent(new Event("before"));let o=Reflect.apply(i,this,arguments);return e.dispatchEvent(new Event("after")),o}}}return Ao.get(r)}function Nl(r,e){if(!r)return!0;let t;for(let i of r.elements)if(i.matches(":invalid")){t=i;break}return t===e}var ii=class extends Ze{computeValidity({state:e,renderedControl:t}){let i=t;Yt(e)&&!i?(i=this.inputControl||document.createElement("input"),this.inputControl=i):i||(i=this.textAreaControl||document.createElement("textarea"),this.textAreaControl=i);let o=Yt(e)?i:null;if(o&&(o.type=e.type),i.value!==e.value&&(i.value=e.value),i.required=e.required,o){let a=e;a.pattern?o.pattern=a.pattern:o.removeAttribute("pattern"),a.min?o.min=a.min:o.removeAttribute("min"),a.max?o.max=a.max:o.removeAttribute("max"),a.step?o.step=a.step:o.removeAttribute("step")}return(e.minLength??-1)>-1?i.setAttribute("minlength",String(e.minLength)):i.removeAttribute("minlength"),(e.maxLength??-1)>-1?i.setAttribute("maxlength",String(e.maxLength)):i.removeAttribute("maxlength"),{validity:i.validity,validationMessage:i.validationMessage}}equals({state:e},{state:t}){let i=e.type===t.type&&e.value===t.value&&e.required===t.required&&e.minLength===t.minLength&&e.maxLength===t.maxLength;return!Yt(e)||!Yt(t)?i:i&&e.pattern===t.pattern&&e.min===t.min&&e.max===t.max&&e.step===t.step}copy({state:e}){return{state:Yt(e)?this.copyInput(e):this.copyTextArea(e),renderedControl:null}}copyInput(e){let{type:t,pattern:i,min:o,max:a,step:s}=e;return{...this.copySharedState(e),type:t,pattern:i,min:o,max:a,step:s}}copyTextArea(e){return{...this.copySharedState(e),type:e.type}}copySharedState({value:e,required:t,minLength:i,maxLength:o}){return{value:e,required:t,minLength:i,maxLength:o}}};function Yt(r){return r.type!=="textarea"}var zl=J(ri(Xe($e(he(_))))),D=class extends zl{constructor(){super(...arguments),this.error=!1,this.errorText="",this.label="",this.noAsterisk=!1,this.required=!1,this.value="",this.prefixText="",this.suffixText="",this.hasLeadingIcon=!1,this.hasTrailingIcon=!1,this.supportingText="",this.textDirection="",this.rows=2,this.cols=20,this.inputMode="",this.max="",this.maxLength=-1,this.min="",this.minLength=-1,this.noSpinner=!1,this.pattern="",this.placeholder="",this.readOnly=!1,this.multiple=!1,this.step="",this.type="text",this.autocomplete="",this.dirty=!1,this.focused=!1,this.nativeError=!1,this.nativeErrorText=""}get selectionDirection(){return this.getInputOrTextarea().selectionDirection}set selectionDirection(e){this.getInputOrTextarea().selectionDirection=e}get selectionEnd(){return this.getInputOrTextarea().selectionEnd}set selectionEnd(e){this.getInputOrTextarea().selectionEnd=e}get selectionStart(){return this.getInputOrTextarea().selectionStart}set selectionStart(e){this.getInputOrTextarea().selectionStart=e}get valueAsNumber(){let e=this.getInput();return e?e.valueAsNumber:NaN}set valueAsNumber(e){let t=this.getInput();t&&(t.valueAsNumber=e,this.value=t.value)}get valueAsDate(){let e=this.getInput();return e?e.valueAsDate:null}set valueAsDate(e){let t=this.getInput();t&&(t.valueAsDate=e,this.value=t.value)}get hasError(){return this.error||this.nativeError}select(){this.getInputOrTextarea().select()}setRangeText(...e){this.getInputOrTextarea().setRangeText(...e),this.value=this.getInputOrTextarea().value}setSelectionRange(e,t,i){this.getInputOrTextarea().setSelectionRange(e,t,i)}showPicker(){let e=this.getInput();e&&e.showPicker()}stepDown(e){let t=this.getInput();t&&(t.stepDown(e),this.value=t.value)}stepUp(e){let t=this.getInput();t&&(t.stepUp(e),this.value=t.value)}reset(){this.dirty=!1,this.value=this.getAttribute("value")??"",this.nativeError=!1,this.nativeErrorText=""}attributeChangedCallback(e,t,i){e==="value"&&this.dirty||super.attributeChangedCallback(e,t,i)}render(){let e={disabled:this.disabled,error:!this.disabled&&this.hasError,textarea:this.type==="textarea","no-spinner":this.noSpinner};return p`
      <span class="text-field ${U(e)}">
        ${this.renderField()}
      </span>
    `}updated(e){let t=this.getInputOrTextarea().value;this.value!==t&&(this.value=t)}renderField(){return qe`<${this.fieldTag}
      class="field"
      count=${this.value.length}
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      error-text=${this.getErrorText()}
      ?focused=${this.focused}
      ?has-end=${this.hasTrailingIcon}
      ?has-start=${this.hasLeadingIcon}
      label=${this.label}
      ?no-asterisk=${this.noAsterisk}
      max=${this.maxLength}
      ?populated=${!!this.value}
      ?required=${this.required}
      ?resizable=${this.type==="textarea"}
      supporting-text=${this.supportingText}
    >
      ${this.renderLeadingIcon()}
      ${this.renderInputOrTextarea()}
      ${this.renderTrailingIcon()}
      <div id="description" slot="aria-describedby"></div>
      <slot name="container" slot="container"></slot>
    </${this.fieldTag}>`}renderLeadingIcon(){return p`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderTrailingIcon(){return p`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderInputOrTextarea(){let e={direction:this.textDirection},t=this.ariaLabel||this.label||v,i=this.autocomplete,o=(this.maxLength??-1)>-1,a=(this.minLength??-1)>-1;if(this.type==="textarea")return p`
        <textarea
          class="input"
          style=${Fe(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${t}
          autocomplete=${i||v}
          name=${this.name||v}
          ?disabled=${this.disabled}
          maxlength=${o?this.maxLength:v}
          minlength=${a?this.minLength:v}
          placeholder=${this.placeholder||v}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${Co(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;let s=this.renderPrefix(),l=this.renderSuffix(),c=this.inputMode;return p`
      <div class="input-wrapper">
        ${s}
        <input
          class="input"
          style=${Fe(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${t}
          autocomplete=${i||v}
          name=${this.name||v}
          ?disabled=${this.disabled}
          inputmode=${c||v}
          max=${this.max||v}
          maxlength=${o?this.maxLength:v}
          min=${this.min||v}
          minlength=${a?this.minLength:v}
          pattern=${this.pattern||v}
          placeholder=${this.placeholder||v}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step||v}
          type=${this.type}
          .value=${Co(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${l}
      </div>
    `}renderPrefix(){return this.renderAffix(this.prefixText,!1)}renderSuffix(){return this.renderAffix(this.suffixText,!0)}renderAffix(e,t){return e?p`<span class="${U({suffix:t,prefix:!t})}">${e}</span>`:v}getErrorText(){return this.error?this.errorText:this.nativeErrorText}handleFocusChange(){this.focused=this.inputOrTextarea?.matches(":focus")??!1}handleInput(e){this.dirty=!0,this.value=e.target.value}redispatchEvent(e){fe(this,e)}getInputOrTextarea(){return this.inputOrTextarea||(this.connectedCallback(),this.scheduleUpdate()),this.isUpdatePending&&this.scheduleUpdate(),this.inputOrTextarea}getInput(){return this.type==="textarea"?null:this.getInputOrTextarea()}handleIconChange(){this.hasLeadingIcon=this.leadingIcons.length>0,this.hasTrailingIcon=this.trailingIcons.length>0}[me](){return this.value}formResetCallback(){this.reset()}formStateRestoreCallback(e){this.value=e}focus(){this.getInputOrTextarea().focus()}[Te](){return new ii(()=>({state:this,renderedControl:this.inputOrTextarea}))}[Ie](){return this.inputOrTextarea}[Ct](e){e?.preventDefault();let t=this.getErrorText();this.nativeError=!!e,this.nativeErrorText=this.validationMessage,t===this.getErrorText()&&this.field?.reannounceError()}};D.shadowRootOptions={..._.shadowRootOptions,delegatesFocus:!0};n([d({type:Boolean,reflect:!0})],D.prototype,"error",void 0);n([d({attribute:"error-text"})],D.prototype,"errorText",void 0);n([d()],D.prototype,"label",void 0);n([d({type:Boolean,attribute:"no-asterisk"})],D.prototype,"noAsterisk",void 0);n([d({type:Boolean,reflect:!0})],D.prototype,"required",void 0);n([d()],D.prototype,"value",void 0);n([d({attribute:"prefix-text"})],D.prototype,"prefixText",void 0);n([d({attribute:"suffix-text"})],D.prototype,"suffixText",void 0);n([d({type:Boolean,attribute:"has-leading-icon"})],D.prototype,"hasLeadingIcon",void 0);n([d({type:Boolean,attribute:"has-trailing-icon"})],D.prototype,"hasTrailingIcon",void 0);n([d({attribute:"supporting-text"})],D.prototype,"supportingText",void 0);n([d({attribute:"text-direction"})],D.prototype,"textDirection",void 0);n([d({type:Number})],D.prototype,"rows",void 0);n([d({type:Number})],D.prototype,"cols",void 0);n([d({reflect:!0})],D.prototype,"inputMode",void 0);n([d()],D.prototype,"max",void 0);n([d({type:Number})],D.prototype,"maxLength",void 0);n([d()],D.prototype,"min",void 0);n([d({type:Number})],D.prototype,"minLength",void 0);n([d({type:Boolean,attribute:"no-spinner"})],D.prototype,"noSpinner",void 0);n([d()],D.prototype,"pattern",void 0);n([d({reflect:!0,converter:Ss})],D.prototype,"placeholder",void 0);n([d({type:Boolean,reflect:!0})],D.prototype,"readOnly",void 0);n([d({type:Boolean,reflect:!0})],D.prototype,"multiple",void 0);n([d()],D.prototype,"step",void 0);n([d({reflect:!0})],D.prototype,"type",void 0);n([d({reflect:!0})],D.prototype,"autocomplete",void 0);n([M()],D.prototype,"dirty",void 0);n([M()],D.prototype,"focused",void 0);n([M()],D.prototype,"nativeError",void 0);n([M()],D.prototype,"nativeErrorText",void 0);n([k(".input")],D.prototype,"inputOrTextarea",void 0);n([k(".field")],D.prototype,"field",void 0);n([ie({slot:"leading-icon"})],D.prototype,"leadingIcons",void 0);n([ie({slot:"trailing-icon"})],D.prototype,"trailingIcons",void 0);var oi=class extends D{constructor(){super(...arguments),this.fieldTag=X`md-filled-field`}};var Cs=x`:host{display:inline-flex;outline:none;resize:both;text-align:start;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}slot[name=container]{border-radius:inherit}.icon{color:currentColor;display:flex;align-items:center;justify-content:center;fill:currentColor;position:relative}.icon ::slotted(*){display:flex;position:absolute}[has-start] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[has-end] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`;var To=class extends oi{constructor(){super(...arguments),this.fieldTag=X`md-filled-field`}};To.styles=[Cs,Es];To=n([w("md-filled-text-field")],To);var ai=class extends q{renderOutline(e){return p`
      <div class="outline">
        <div class="outline-start"></div>
        <div class="outline-notch">
          <div class="outline-panel-inactive"></div>
          <div class="outline-panel-active"></div>
          <div class="outline-label">${e}</div>
        </div>
        <div class="outline-end"></div>
      </div>
    `}};var As=x`@layer styles{:host{--_bottom-space: var(--md-outlined-field-bottom-space, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-outlined-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-outlined-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-outlined-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-outlined-field-content-space, 16px);--_content-weight: var(--md-outlined-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-outlined-field-leading-space, 16px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-outlined-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-outlined-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-outlined-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-outlined-field-top-space, 16px);--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-outlined-field-trailing-space, 16px);--_with-leading-content-leading-space: var(--md-outlined-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-outlined-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)))}.outline{border-color:var(--_outline-color);border-radius:inherit;display:flex;pointer-events:none;height:100%;position:absolute;width:100%;z-index:1}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - var(--_leading-space) - var(--_trailing-space));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .content ::slotted(*){padding-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-start) .label-wrapper{margin-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .content ::slotted(*){padding-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.field:not(.with-end) .label-wrapper{margin-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}.resizable .container{bottom:var(--_focus-outline-width);inset-inline-end:var(--_focus-outline-width);clip-path:inset(var(--_focus-outline-width) 0 0 var(--_focus-outline-width))}.resizable .container>*{top:var(--_focus-outline-width);inset-inline-start:var(--_focus-outline-width)}.resizable .container:dir(rtl){clip-path:inset(var(--_focus-outline-width) var(--_focus-outline-width) 0 0)}}@layer hcm{@media(forced-colors: active){.disabled .outline{border-color:GrayText;color:GrayText}.disabled :is(.outline-start,.outline-end,.outline-panel-inactive){opacity:1}}}
`;var Io=class extends ai{};Io.styles=[Zr,As];Io=n([w("md-outlined-field")],Io);function $o(r,e=Be){let t=Xt(r,e);return t&&(t.tabIndex=0,t.focus()),t}function Oo(r,e=Be){let t=Ro(r,e);return t&&(t.tabIndex=0,t.focus()),t}function Je(r,e=Be){for(let t=0;t<r.length;t++){let i=r[t];if(i.tabIndex===0&&e(i))return{item:i,index:t}}return null}function Xt(r,e=Be){for(let t of r)if(e(t))return t;return null}function Ro(r,e=Be){for(let t=r.length-1;t>=0;t--){let i=r[t];if(e(i))return i}return null}function Dl(r,e,t=Be,i=!0){for(let o=1;o<r.length;o++){let a=(o+e)%r.length;if(a<e&&!i)return null;let s=r[a];if(t(s))return s}return r[e]?r[e]:null}function Pl(r,e,t=Be,i=!0){for(let o=1;o<r.length;o++){let a=(e-o+r.length)%r.length;if(a>e&&!i)return null;let s=r[a];if(t(s))return s}return r[e]?r[e]:null}function Lo(r,e,t=Be,i=!0){if(e){let o=Dl(r,e.index,t,i);return o&&(o.tabIndex=0,o.focus()),o}else return $o(r,t)}function Mo(r,e,t=Be,i=!0){if(e){let o=Pl(r,e.index,t,i);return o&&(o.tabIndex=0,o.focus()),o}else return Oo(r,t)}function Be(r){return!r.disabled}var ae={ArrowDown:"ArrowDown",ArrowLeft:"ArrowLeft",ArrowUp:"ArrowUp",ArrowRight:"ArrowRight",Home:"Home",End:"End"},si=class{constructor(e){this.handleKeydown=u=>{let f=u.key;if(u.defaultPrevented||!this.isNavigableKey(f))return;let b=this.items;if(!b.length)return;let m=Je(b,this.isActivatable);u.preventDefault();let E=this.isRtl(),S=E?ae.ArrowRight:ae.ArrowLeft,O=E?ae.ArrowLeft:ae.ArrowRight,$=null;switch(f){case ae.ArrowDown:case O:$=Lo(b,m,this.isActivatable,this.wrapNavigation());break;case ae.ArrowUp:case S:$=Mo(b,m,this.isActivatable,this.wrapNavigation());break;case ae.Home:$=$o(b,this.isActivatable);break;case ae.End:$=Oo(b,this.isActivatable);break;default:break}$&&m&&m.item!==$&&(m.item.tabIndex=-1)},this.onDeactivateItems=()=>{let u=this.items;for(let f of u)this.deactivateItem(f)},this.onRequestActivation=u=>{this.onDeactivateItems();let f=u.target;this.activateItem(f),f.focus()},this.onSlotchange=()=>{let u=this.items,f=!1;for(let m of u){if(!m.disabled&&m.tabIndex>-1&&!f){f=!0,m.tabIndex=0;continue}m.tabIndex=-1}if(f)return;let b=Xt(u,this.isActivatable);b&&(b.tabIndex=0)};let{isItem:t,getPossibleItems:i,isRtl:o,deactivateItem:a,activateItem:s,isNavigableKey:l,isActivatable:c,wrapNavigation:h}=e;this.isItem=t,this.getPossibleItems=i,this.isRtl=o,this.deactivateItem=a,this.activateItem=s,this.isNavigableKey=l,this.isActivatable=c,this.wrapNavigation=h??(()=>!0)}get items(){let e=this.getPossibleItems(),t=[];for(let i of e){if(this.isItem(i)){t.push(i);continue}let a=i.item;a&&this.isItem(a)&&t.push(a)}return t}activateNextItem(){let e=this.items,t=Je(e,this.isActivatable);return t&&(t.item.tabIndex=-1),Lo(e,t,this.isActivatable,this.wrapNavigation())}activatePreviousItem(){let e=this.items,t=Je(e,this.isActivatable);return t&&(t.item.tabIndex=-1),Mo(e,t,this.isActivatable,this.wrapNavigation())}};var Zt={END_START:"end-start",END_END:"end-end",START_START:"start-start",START_END:"start-end"},ni=class{constructor(e,t){this.host=e,this.getProperties=t,this.surfaceStylesInternal={display:"none"},this.lastValues={isOpen:!1},this.host.addController(this)}get surfaceStyles(){return this.surfaceStylesInternal}async position(){let{surfaceEl:e,anchorEl:t,anchorCorner:i,surfaceCorner:o,positioning:a,xOffset:s,yOffset:l,disableBlockFlip:c,disableInlineFlip:h,repositionStrategy:u}=this.getProperties(),f=i.toLowerCase().trim(),b=o.toLowerCase().trim();if(!e||!t)return;let m=window.innerWidth,E=window.innerHeight,S=document.createElement("div");S.style.opacity="0",S.style.position="fixed",S.style.display="block",S.style.inset="0",document.body.appendChild(S);let O=S.getBoundingClientRect();S.remove();let $=window.innerHeight-O.bottom,T=window.innerWidth-O.right;this.surfaceStylesInternal={display:"block",opacity:"0"},this.host.requestUpdate(),await this.host.updateComplete,e.popover&&e.isConnected&&e.showPopover();let R=e.getSurfacePositionClientRect?e.getSurfacePositionClientRect():e.getBoundingClientRect(),L=t.getSurfacePositionClientRect?t.getSurfacePositionClientRect():t.getBoundingClientRect(),[P,I]=b.split("-"),[A,C]=f.split("-"),W=getComputedStyle(e).direction==="ltr",{blockInset:_e,blockOutOfBoundsCorrection:ye,surfaceBlockProperty:Rt}=this.calculateBlock({surfaceRect:R,anchorRect:L,anchorBlock:A,surfaceBlock:P,yOffset:l,positioning:a,windowInnerHeight:E,blockScrollbarHeight:$});if(ye&&!c){let ki=P==="start"?"end":"start",Si=A==="start"?"end":"start",Oe=this.calculateBlock({surfaceRect:R,anchorRect:L,anchorBlock:Si,surfaceBlock:ki,yOffset:l,positioning:a,windowInnerHeight:E,blockScrollbarHeight:$});ye>Oe.blockOutOfBoundsCorrection&&(_e=Oe.blockInset,ye=Oe.blockOutOfBoundsCorrection,Rt=Oe.surfaceBlockProperty)}let{inlineInset:ir,inlineOutOfBoundsCorrection:mt,surfaceInlineProperty:oa}=this.calculateInline({surfaceRect:R,anchorRect:L,anchorInline:C,surfaceInline:I,xOffset:s,positioning:a,isLTR:W,windowInnerWidth:m,inlineScrollbarWidth:T});if(mt&&!h){let ki=I==="start"?"end":"start",Si=C==="start"?"end":"start",Oe=this.calculateInline({surfaceRect:R,anchorRect:L,anchorInline:Si,surfaceInline:ki,xOffset:s,positioning:a,isLTR:W,windowInnerWidth:m,inlineScrollbarWidth:T});Math.abs(mt)>Math.abs(Oe.inlineOutOfBoundsCorrection)&&(ir=Oe.inlineInset,mt=Oe.inlineOutOfBoundsCorrection,oa=Oe.surfaceInlineProperty)}u==="move"&&(_e=_e-ye,ir=ir-mt),this.surfaceStylesInternal={display:"block",opacity:"1",[Rt]:`${_e}px`,[oa]:`${ir}px`},u==="resize"&&(ye&&(this.surfaceStylesInternal.height=`${R.height-ye}px`),mt&&(this.surfaceStylesInternal.width=`${R.width-mt}px`)),this.host.requestUpdate()}calculateBlock(e){let{surfaceRect:t,anchorRect:i,anchorBlock:o,surfaceBlock:a,yOffset:s,positioning:l,windowInnerHeight:c,blockScrollbarHeight:h}=e,u=l==="fixed"||l==="document"?1:0,f=l==="document"?1:0,b=a==="start"?1:0,m=a==="end"?1:0,S=(o!==a?1:0)*i.height+s,O=b*i.top+m*(c-i.bottom-h),$=b*window.scrollY-m*window.scrollY,T=Math.abs(Math.min(0,c-O-S-t.height));return{blockInset:u*O+f*$+S,blockOutOfBoundsCorrection:T,surfaceBlockProperty:a==="start"?"inset-block-start":"inset-block-end"}}calculateInline(e){let{isLTR:t,surfaceInline:i,anchorInline:o,anchorRect:a,surfaceRect:s,xOffset:l,positioning:c,windowInnerWidth:h,inlineScrollbarWidth:u}=e,f=c==="fixed"||c==="document"?1:0,b=c==="document"?1:0,m=t?1:0,E=t?0:1,S=i==="start"?1:0,O=i==="end"?1:0,T=(o!==i?1:0)*a.width+l,R=S*a.left+O*(h-a.right-u),L=S*(h-a.right-u)+O*a.left,P=m*R+E*L,I=S*window.scrollX-O*window.scrollX,A=O*window.scrollX-S*window.scrollX,C=m*I+E*A,W=Math.abs(Math.min(0,h-P-T-s.width)),_e=f*P+T+b*C,ye=i==="start"?"inset-inline-start":"inset-inline-end";return(c==="document"||c==="fixed")&&(i==="start"&&t||i==="end"&&!t?ye="left":ye="right"),{inlineInset:_e,inlineOutOfBoundsCorrection:W,surfaceInlineProperty:ye}}hostUpdate(){this.onUpdate()}hostUpdated(){this.onUpdate()}async onUpdate(){let e=this.getProperties(),t=!1;for(let[s,l]of Object.entries(e))if(t=t||l!==this.lastValues[s],t)break;let i=this.lastValues.isOpen!==e.isOpen,o=!!e.anchorEl,a=!!e.surfaceEl;t&&o&&a&&(this.lastValues.isOpen=e.isOpen,e.isOpen?(this.lastValues=e,await this.position(),e.onOpen()):i&&(await e.beforeClose(),this.close(),e.onClose()))}close(){this.surfaceStylesInternal={display:"none"},this.host.requestUpdate();let e=this.getProperties().surfaceEl;e?.popover&&e?.isConnected&&e.hidePopover()}};var be={INDEX:0,ITEM:1,TEXT:2},li=class{constructor(e){this.getProperties=e,this.typeaheadRecords=[],this.typaheadBuffer="",this.cancelTypeaheadTimeout=0,this.isTypingAhead=!1,this.lastActiveRecord=null,this.onKeydown=t=>{this.isTypingAhead?this.typeahead(t):this.beginTypeahead(t)},this.endTypeahead=()=>{this.isTypingAhead=!1,this.typaheadBuffer="",this.typeaheadRecords=[]}}get items(){return this.getProperties().getItems()}get active(){return this.getProperties().active}beginTypeahead(e){this.active&&(e.code==="Space"||e.code==="Enter"||e.code.startsWith("Arrow")||e.code==="Escape"||(this.isTypingAhead=!0,this.typeaheadRecords=this.items.map((t,i)=>[i,t,t.typeaheadText.trim().toLowerCase()]),this.lastActiveRecord=this.typeaheadRecords.find(t=>t[be.ITEM].tabIndex===0)??null,this.lastActiveRecord&&(this.lastActiveRecord[be.ITEM].tabIndex=-1),this.typeahead(e)))}typeahead(e){if(e.defaultPrevented)return;if(clearTimeout(this.cancelTypeaheadTimeout),e.code==="Enter"||e.code.startsWith("Arrow")||e.code==="Escape"){this.endTypeahead(),this.lastActiveRecord&&(this.lastActiveRecord[be.ITEM].tabIndex=-1);return}e.code==="Space"&&e.preventDefault(),this.cancelTypeaheadTimeout=setTimeout(this.endTypeahead,this.getProperties().typeaheadBufferTime),this.typaheadBuffer+=e.key.toLowerCase();let t=this.lastActiveRecord?this.lastActiveRecord[be.INDEX]:-1,i=this.typeaheadRecords.length,o=c=>(c[be.INDEX]+i-t)%i,a=this.typeaheadRecords.filter(c=>!c[be.ITEM].disabled&&c[be.TEXT].startsWith(this.typaheadBuffer)).sort((c,h)=>o(c)-o(h));if(a.length===0){clearTimeout(this.cancelTypeaheadTimeout),this.lastActiveRecord&&(this.lastActiveRecord[be.ITEM].tabIndex=-1),this.endTypeahead();return}let s=this.typaheadBuffer.length===1,l;this.lastActiveRecord===a[0]&&s?l=a[1]??a[0]:l=a[0],this.lastActiveRecord&&(this.lastActiveRecord[be.ITEM].tabIndex=-1),this.lastActiveRecord=l,l[be.ITEM].tabIndex=0,l[be.ITEM].focus()}};var No=200,Ts=new Set([ae.ArrowDown,ae.ArrowUp,ae.Home,ae.End]),Fl=new Set([ae.ArrowLeft,ae.ArrowRight,...Ts]);function Bl(r=document){let e=r.activeElement;for(;e&&e?.shadowRoot?.activeElement;)e=e.shadowRoot.activeElement;return e}var K=class extends _{get openDirection(){return this.menuCorner.split("-")[0]==="start"?"DOWN":"UP"}get anchorElement(){return this.anchor?this.getRootNode().querySelector(`#${this.anchor}`):this.currentAnchorElement}set anchorElement(e){this.currentAnchorElement=e,this.requestUpdate("anchorElement")}constructor(){super(),this.anchor="",this.positioning="absolute",this.quick=!1,this.hasOverflow=!1,this.open=!1,this.xOffset=0,this.yOffset=0,this.noHorizontalFlip=!1,this.noVerticalFlip=!1,this.typeaheadDelay=No,this.anchorCorner=Zt.END_START,this.menuCorner=Zt.START_START,this.stayOpenOnOutsideClick=!1,this.stayOpenOnFocusout=!1,this.skipRestoreFocus=!1,this.defaultFocus=pe.FIRST_ITEM,this.noNavigationWrap=!1,this.typeaheadActive=!0,this.isSubmenu=!1,this.pointerPath=[],this.isRepositioning=!1,this.openCloseAnimationSignal=Qa(),this.listController=new si({isItem:e=>e.hasAttribute("md-menu-item"),getPossibleItems:()=>this.slotItems,isRtl:()=>getComputedStyle(this).direction==="rtl",deactivateItem:e=>{e.selected=!1,e.tabIndex=-1},activateItem:e=>{e.selected=!0,e.tabIndex=0},isNavigableKey:e=>{if(!this.isSubmenu)return Fl.has(e);let i=getComputedStyle(this).direction==="rtl"?ae.ArrowLeft:ae.ArrowRight;return e===i?!0:Ts.has(e)},wrapNavigation:()=>!this.noNavigationWrap}),this.lastFocusedElement=null,this.typeaheadController=new li(()=>({getItems:()=>this.items,typeaheadBufferTime:this.typeaheadDelay,active:this.typeaheadActive})),this.currentAnchorElement=null,this.internals=this.attachInternals(),this.menuPositionController=new ni(this,()=>({anchorCorner:this.anchorCorner,surfaceCorner:this.menuCorner,surfaceEl:this.surfaceEl,anchorEl:this.anchorElement,positioning:this.positioning==="popover"?"document":this.positioning,isOpen:this.open,xOffset:this.xOffset,yOffset:this.yOffset,disableBlockFlip:this.noVerticalFlip,disableInlineFlip:this.noHorizontalFlip,onOpen:this.onOpened,beforeClose:this.beforeClose,onClose:this.onClosed,repositionStrategy:this.hasOverflow&&this.positioning!=="popover"?"move":"resize"})),this.onWindowResize=()=>{this.isRepositioning||this.positioning!=="document"&&this.positioning!=="fixed"&&this.positioning!=="popover"||(this.isRepositioning=!0,this.reposition(),this.isRepositioning=!1)},this.handleFocusout=async e=>{let t=this.anchorElement;if(this.stayOpenOnFocusout||!this.open||this.pointerPath.includes(t))return;if(e.relatedTarget){if(jt(e.relatedTarget,this)||this.pointerPath.length!==0&&jt(e.relatedTarget,t))return}else if(this.pointerPath.includes(this))return;let i=this.skipRestoreFocus;this.skipRestoreFocus=!0,this.close(),await this.updateComplete,this.skipRestoreFocus=i},this.onOpened=async()=>{this.lastFocusedElement=Bl();let e=this.items,t=Je(e);t&&this.defaultFocus!==pe.NONE&&(t.item.tabIndex=-1);let i=!this.quick;switch(this.quick?this.dispatchEvent(new Event("opening")):i=!!await this.animateOpen(),this.defaultFocus){case pe.FIRST_ITEM:let o=Xt(e);o&&(o.tabIndex=0,o.focus(),await o.updateComplete);break;case pe.LAST_ITEM:let a=Ro(e);a&&(a.tabIndex=0,a.focus(),await a.updateComplete);break;case pe.LIST_ROOT:this.focus();break;default:case pe.NONE:break}i||this.dispatchEvent(new Event("opened"))},this.beforeClose=async()=>{this.open=!1,this.skipRestoreFocus||this.lastFocusedElement?.focus?.(),this.quick||await this.animateClose()},this.onClosed=()=>{this.quick&&(this.dispatchEvent(new Event("closing")),this.dispatchEvent(new Event("closed")))},this.onWindowPointerdown=e=>{this.pointerPath=e.composedPath()},this.onDocumentClick=e=>{if(!this.open)return;let t=e.composedPath();!this.stayOpenOnOutsideClick&&!t.includes(this)&&!t.includes(this.anchorElement)&&(this.open=!1)},this.internals.role="menu",this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keydown",this.captureKeydown,{capture:!0}),this.addEventListener("focusout",this.handleFocusout)}get items(){return this.listController.items}willUpdate(e){if(e.has("open")){if(this.open){this.removeAttribute("aria-hidden");return}this.setAttribute("aria-hidden","true")}}update(e){e.has("open")&&(this.open?this.setUpGlobalEventListeners():this.cleanUpGlobalEventListeners()),e.has("positioning")&&this.positioning==="popover"&&!this.showPopover&&(this.positioning="fixed"),super.update(e)}connectedCallback(){super.connectedCallback(),this.open&&this.setUpGlobalEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.cleanUpGlobalEventListeners()}getBoundingClientRect(){return this.surfaceEl?this.surfaceEl.getBoundingClientRect():super.getBoundingClientRect()}getClientRects(){return this.surfaceEl?this.surfaceEl.getClientRects():super.getClientRects()}render(){return this.renderSurface()}renderSurface(){return p`
      <div
        class="menu ${U(this.getSurfaceClasses())}"
        style=${Fe(this.menuPositionController.surfaceStyles)}
        popover=${this.positioning==="popover"?"manual":v}>
        ${this.renderElevation()}
        <div class="items">
          <div class="item-padding"> ${this.renderMenuItems()} </div>
        </div>
      </div>
    `}renderMenuItems(){return p`<slot
      @close-menu=${this.onCloseMenu}
      @deactivate-items=${this.onDeactivateItems}
      @request-activation=${this.onRequestActivation}
      @deactivate-typeahead=${this.handleDeactivateTypeahead}
      @activate-typeahead=${this.handleActivateTypeahead}
      @stay-open-on-focusout=${this.handleStayOpenOnFocusout}
      @close-on-focusout=${this.handleCloseOnFocusout}
      @slotchange=${this.listController.onSlotchange}></slot>`}renderElevation(){return p`<md-elevation part="elevation"></md-elevation>`}getSurfaceClasses(){return{open:this.open,fixed:this.positioning==="fixed","has-overflow":this.hasOverflow}}captureKeydown(e){e.target===this&&!e.defaultPrevented&&Fr(e.code)&&(e.preventDefault(),this.close()),this.typeaheadController.onKeydown(e)}async animateOpen(){let e=this.surfaceEl,t=this.slotEl;if(!e||!t)return!0;let i=this.openDirection;this.dispatchEvent(new Event("opening")),e.classList.toggle("animating",!0);let o=this.openCloseAnimationSignal.start(),a=e.offsetHeight,s=i==="UP",l=this.items,c=500,h=50,u=250,f=(c-u)/l.length,b=e.animate([{height:"0px"},{height:`${a}px`}],{duration:c,easing:ne.EMPHASIZED}),m=t.animate([{transform:s?`translateY(-${a}px)`:""},{transform:""}],{duration:c,easing:ne.EMPHASIZED}),E=e.animate([{opacity:0},{opacity:1}],h),S=[];for(let T=0;T<l.length;T++){let R=s?l.length-1-T:T,L=l[R],P=L.animate([{opacity:0},{opacity:1}],{duration:u,delay:f*T});L.classList.toggle("md-menu-hidden",!0),P.addEventListener("finish",()=>{L.classList.toggle("md-menu-hidden",!1)}),S.push([L,P])}let O=T=>{},$=new Promise(T=>{O=T});return o.addEventListener("abort",()=>{b.cancel(),m.cancel(),E.cancel(),S.forEach(([T,R])=>{T.classList.toggle("md-menu-hidden",!1),R.cancel()}),O(!0)}),b.addEventListener("finish",()=>{e.classList.toggle("animating",!1),this.openCloseAnimationSignal.finish(),O(!1)}),await $}animateClose(){let e,t=new Promise(P=>{e=P}),i=this.surfaceEl,o=this.slotEl;if(!i||!o)return e(!1),t;let s=this.openDirection==="UP";this.dispatchEvent(new Event("closing")),i.classList.toggle("animating",!0);let l=this.openCloseAnimationSignal.start(),c=i.offsetHeight,h=this.items,u=150,f=50,b=u-f,m=50,E=50,S=.35,O=(u-E-m)/h.length,$=i.animate([{height:`${c}px`},{height:`${c*S}px`}],{duration:u,easing:ne.EMPHASIZED_ACCELERATE}),T=o.animate([{transform:""},{transform:s?`translateY(-${c*(1-S)}px)`:""}],{duration:u,easing:ne.EMPHASIZED_ACCELERATE}),R=i.animate([{opacity:1},{opacity:0}],{duration:f,delay:b}),L=[];for(let P=0;P<h.length;P++){let I=s?P:h.length-1-P,A=h[I],C=A.animate([{opacity:1},{opacity:0}],{duration:m,delay:E+O*P});C.addEventListener("finish",()=>{A.classList.toggle("md-menu-hidden",!0)}),L.push([A,C])}return l.addEventListener("abort",()=>{$.cancel(),T.cancel(),R.cancel(),L.forEach(([P,I])=>{I.cancel(),P.classList.toggle("md-menu-hidden",!1)}),e(!1)}),$.addEventListener("finish",()=>{i.classList.toggle("animating",!1),L.forEach(([P])=>{P.classList.toggle("md-menu-hidden",!1)}),this.openCloseAnimationSignal.finish(),this.dispatchEvent(new Event("closed")),e(!0)}),t}handleKeydown(e){this.pointerPath=[],this.listController.handleKeydown(e)}setUpGlobalEventListeners(){document.addEventListener("click",this.onDocumentClick,{capture:!0}),window.addEventListener("pointerdown",this.onWindowPointerdown),document.addEventListener("resize",this.onWindowResize,{passive:!0}),window.addEventListener("resize",this.onWindowResize,{passive:!0})}cleanUpGlobalEventListeners(){document.removeEventListener("click",this.onDocumentClick,{capture:!0}),window.removeEventListener("pointerdown",this.onWindowPointerdown),document.removeEventListener("resize",this.onWindowResize),window.removeEventListener("resize",this.onWindowResize)}onCloseMenu(){this.close()}onDeactivateItems(e){e.stopPropagation(),this.listController.onDeactivateItems()}onRequestActivation(e){e.stopPropagation(),this.listController.onRequestActivation(e)}handleDeactivateTypeahead(e){e.stopPropagation(),this.typeaheadActive=!1}handleActivateTypeahead(e){e.stopPropagation(),this.typeaheadActive=!0}handleStayOpenOnFocusout(e){e.stopPropagation(),this.stayOpenOnFocusout=!0}handleCloseOnFocusout(e){e.stopPropagation(),this.stayOpenOnFocusout=!1}close(){this.open=!1,this.slotItems.forEach(t=>{t.close?.()})}show(){this.open=!0}activateNextItem(){return this.listController.activateNextItem()??null}activatePreviousItem(){return this.listController.activatePreviousItem()??null}reposition(){this.open&&this.menuPositionController.position()}};n([k(".menu")],K.prototype,"surfaceEl",void 0);n([k("slot")],K.prototype,"slotEl",void 0);n([d()],K.prototype,"anchor",void 0);n([d()],K.prototype,"positioning",void 0);n([d({type:Boolean})],K.prototype,"quick",void 0);n([d({type:Boolean,attribute:"has-overflow"})],K.prototype,"hasOverflow",void 0);n([d({type:Boolean,reflect:!0})],K.prototype,"open",void 0);n([d({type:Number,attribute:"x-offset"})],K.prototype,"xOffset",void 0);n([d({type:Number,attribute:"y-offset"})],K.prototype,"yOffset",void 0);n([d({type:Boolean,attribute:"no-horizontal-flip"})],K.prototype,"noHorizontalFlip",void 0);n([d({type:Boolean,attribute:"no-vertical-flip"})],K.prototype,"noVerticalFlip",void 0);n([d({type:Number,attribute:"typeahead-delay"})],K.prototype,"typeaheadDelay",void 0);n([d({attribute:"anchor-corner"})],K.prototype,"anchorCorner",void 0);n([d({attribute:"menu-corner"})],K.prototype,"menuCorner",void 0);n([d({type:Boolean,attribute:"stay-open-on-outside-click"})],K.prototype,"stayOpenOnOutsideClick",void 0);n([d({type:Boolean,attribute:"stay-open-on-focusout"})],K.prototype,"stayOpenOnFocusout",void 0);n([d({type:Boolean,attribute:"skip-restore-focus"})],K.prototype,"skipRestoreFocus",void 0);n([d({attribute:"default-focus"})],K.prototype,"defaultFocus",void 0);n([d({type:Boolean,attribute:"no-navigation-wrap"})],K.prototype,"noNavigationWrap",void 0);n([ie({flatten:!0})],K.prototype,"slotItems",void 0);n([M()],K.prototype,"typeaheadActive",void 0);var Is=x`:host{--md-elevation-level: var(--md-menu-container-elevation, 2);--md-elevation-shadow-color: var(--md-menu-container-shadow-color, var(--md-sys-color-shadow, #000));min-width:112px;color:unset;display:contents}md-focus-ring{--md-focus-ring-shape: var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px))}.menu{border-radius:var(--md-menu-container-shape, var(--md-sys-shape-corner-extra-small, 4px));display:none;inset:auto;border:none;padding:0px;overflow:visible;background-color:rgba(0,0,0,0);color:inherit;opacity:0;z-index:20;position:absolute;user-select:none;max-height:inherit;height:inherit;min-width:inherit;max-width:inherit;scrollbar-width:inherit}.menu::backdrop{display:none}.fixed{position:fixed}.items{display:block;list-style-type:none;margin:0;outline:none;box-sizing:border-box;background-color:var(--md-menu-container-color, var(--md-sys-color-surface-container, #f3edf7));height:inherit;max-height:inherit;overflow:auto;min-width:inherit;max-width:inherit;border-radius:inherit;scrollbar-width:inherit}.item-padding{padding-block:var(--md-menu-top-space, 8px) var(--md-menu-bottom-space, 8px)}.has-overflow:not([popover]) .items{overflow:visible}.has-overflow.animating .items,.animating .items{overflow:hidden}.has-overflow.animating .items{pointer-events:none}.animating ::slotted(.md-menu-hidden){opacity:0}slot{display:block;height:inherit;max-height:inherit}::slotted(:is(md-divider,[role=separator])){margin:8px 0}@media(forced-colors: active){.menu{border-style:solid;border-color:CanvasText;border-width:1px}}
`;var zo=class extends K{};zo.styles=[Is];zo=n([w("md-menu")],zo);var ci=class extends Ze{computeValidity(e){return this.selectControl||(this.selectControl=document.createElement("select")),gt(p`<option value=${e.value}></option>`,this.selectControl),this.selectControl.value=e.value,this.selectControl.required=e.required,{validity:this.selectControl.validity,validationMessage:this.selectControl.validationMessage}}equals(e,t){return e.value===t.value&&e.required===t.required}copy({value:e,required:t}){return{value:e,required:t}}};function $s(r){let e=[];for(let t=0;t<r.length;t++){let i=r[t];i.selected&&e.push([i,t])}return e}var Os,di=Symbol("value"),Hl=J(ri(Xe($e(he(_))))),V=class extends Hl{get value(){return this[di]}set value(e){this.lastUserSetValue=e,this.select(e)}get options(){return this.menu?.items??[]}get selectedIndex(){let[e,t]=(this.getSelectedOptions()??[])[0]??[];return t??-1}set selectedIndex(e){this.lastUserSetSelectedIndex=e,this.selectIndex(e)}get selectedOptions(){return(this.getSelectedOptions()??[]).map(([e])=>e)}get hasError(){return this.error||this.nativeError}constructor(){super(),this.quick=!1,this.required=!1,this.errorText="",this.label="",this.noAsterisk=!1,this.supportingText="",this.error=!1,this.menuPositioning="popover",this.clampMenuWidth=!1,this.typeaheadDelay=No,this.hasLeadingIcon=!1,this.displayText="",this.menuAlign="start",this[Os]="",this.lastUserSetValue=null,this.lastUserSetSelectedIndex=null,this.lastSelectedOption=null,this.lastSelectedOptionRecords=[],this.nativeError=!1,this.nativeErrorText="",this.focused=!1,this.open=!1,this.defaultFocus=pe.NONE,this.prevOpen=this.open,this.selectWidth=0,!!1&&(this.addEventListener("focus",this.handleFocus.bind(this)),this.addEventListener("blur",this.handleBlur.bind(this)))}select(e){let t=this.options.find(i=>i.value===e);t&&this.selectItem(t)}selectIndex(e){let t=this.options[e];t&&this.selectItem(t)}reset(){for(let e of this.options)e.selected=e.hasAttribute("selected");this.updateValueAndDisplayText(),this.nativeError=!1,this.nativeErrorText=""}showPicker(){this.open=!0}[(Os=di,Ct)](e){e?.preventDefault();let t=this.getErrorText();this.nativeError=!!e,this.nativeErrorText=this.validationMessage,t===this.getErrorText()&&this.field?.reannounceError()}update(e){if(this.hasUpdated||this.initUserSelection(),this.prevOpen!==this.open&&this.open){let t=this.getBoundingClientRect();this.selectWidth=t.width}this.prevOpen=this.open,super.update(e)}render(){return p`
      <span
        class="select ${U(this.getRenderClasses())}"
        @focusout=${this.handleFocusout}>
        ${this.renderField()} ${this.renderMenu()}
      </span>
    `}async firstUpdated(e){await this.menu?.updateComplete,this.lastSelectedOptionRecords.length||this.initUserSelection(),!this.lastSelectedOptionRecords.length&&!!1&&!this.options.length&&setTimeout(()=>{this.updateValueAndDisplayText()}),super.firstUpdated(e)}getRenderClasses(){return{disabled:this.disabled,error:this.error,open:this.open}}renderField(){let e=this.ariaLabel||this.label;return qe`
      <${this.fieldTag}
          aria-haspopup="listbox"
          role="combobox"
          part="field"
          id="field"
          tabindex=${this.disabled?"-1":"0"}
          aria-label=${e||v}
          aria-describedby="description"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="listbox"
          class="field"
          label=${this.label}
          ?no-asterisk=${this.noAsterisk}
          .focused=${this.focused||this.open}
          .populated=${!!this.displayText}
          .disabled=${this.disabled}
          .required=${this.required}
          .error=${this.hasError}
          ?has-start=${this.hasLeadingIcon}
          has-end
          supporting-text=${this.supportingText}
          error-text=${this.getErrorText()}
          @keydown=${this.handleKeydown}
          @click=${this.handleClick}>
         ${this.renderFieldContent()}
         <div id="description" slot="aria-describedby"></div>
      </${this.fieldTag}>`}renderFieldContent(){return[this.renderLeadingIcon(),this.renderLabel(),this.renderTrailingIcon()]}renderLeadingIcon(){return p`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderTrailingIcon(){return p`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}>
          <svg height="5" viewBox="7 10 10 5" focusable="false">
            <polygon
              class="down"
              stroke="none"
              fill-rule="evenodd"
              points="7 10 12 15 17 10"></polygon>
            <polygon
              class="up"
              stroke="none"
              fill-rule="evenodd"
              points="7 15 12 10 17 15"></polygon>
          </svg>
        </slot>
      </span>
    `}renderLabel(){return p`<div id="label">${this.displayText||p`&nbsp;`}</div>`}renderMenu(){let e=this.label||this.ariaLabel;return p`<div class="menu-wrapper">
      <md-menu
        id="listbox"
        .defaultFocus=${this.defaultFocus}
        role="listbox"
        tabindex="-1"
        aria-label=${e||v}
        stay-open-on-focusout
        part="menu"
        exportparts="focus-ring: menu-focus-ring"
        anchor="field"
        style=${Fe({"--__menu-min-width":`${this.selectWidth}px`,"--__menu-max-width":this.clampMenuWidth?`${this.selectWidth}px`:void 0})}
        no-navigation-wrap
        .open=${this.open}
        .quick=${this.quick}
        .positioning=${this.menuPositioning}
        .typeaheadDelay=${this.typeaheadDelay}
        .anchorCorner=${this.menuAlign==="start"?"end-start":"end-end"}
        .menuCorner=${this.menuAlign==="start"?"start-start":"start-end"}
        @opening=${this.handleOpening}
        @opened=${this.redispatchEvent}
        @closing=${this.redispatchEvent}
        @closed=${this.handleClosed}
        @close-menu=${this.handleCloseMenu}
        @request-selection=${this.handleRequestSelection}
        @request-deselection=${this.handleRequestDeselection}>
        ${this.renderMenuContent()}
      </md-menu>
    </div>`}renderMenuContent(){return p`<slot></slot>`}handleKeydown(e){if(this.open||this.disabled||!this.menu)return;let t=this.menu.typeaheadController,i=e.code==="Space"||e.code==="ArrowDown"||e.code==="ArrowUp"||e.code==="End"||e.code==="Home"||e.code==="Enter";if(!t.isTypingAhead&&i){switch(e.preventDefault(),this.open=!0,e.code){case"Space":case"ArrowDown":case"Enter":this.defaultFocus=pe.NONE;break;case"End":this.defaultFocus=pe.LAST_ITEM;break;case"ArrowUp":case"Home":this.defaultFocus=pe.FIRST_ITEM;break;default:break}return}if(e.key.length===1){t.onKeydown(e),e.preventDefault();let{lastActiveRecord:a}=t;if(!a)return;this.labelEl?.setAttribute?.("aria-live","polite"),this.selectItem(a[be.ITEM])&&this.dispatchInteractionEvents()}}handleClick(){this.open=!this.open}handleFocus(){this.focused=!0}handleBlur(){this.focused=!1}handleFocusout(e){e.relatedTarget&&jt(e.relatedTarget,this)||(this.open=!1)}getSelectedOptions(){if(!this.menu)return this.lastSelectedOptionRecords=[],null;let e=this.menu.items;return this.lastSelectedOptionRecords=$s(e),this.lastSelectedOptionRecords}async getUpdateComplete(){return await this.menu?.updateComplete,super.getUpdateComplete()}updateValueAndDisplayText(){let e=this.getSelectedOptions()??[],t=!1;if(e.length){let[i]=e[0];t=this.lastSelectedOption!==i,this.lastSelectedOption=i,this[di]=i.value,this.displayText=i.displayText}else t=this.lastSelectedOption!==null,this.lastSelectedOption=null,this[di]="",this.displayText="";return t}async handleOpening(e){if(this.labelEl?.removeAttribute?.("aria-live"),this.redispatchEvent(e),this.defaultFocus!==pe.NONE)return;let t=this.menu.items,i=Je(t)?.item,[o]=this.lastSelectedOptionRecords[0]??[null];i&&i!==o&&(i.tabIndex=-1),o=o??t[0],o&&(o.tabIndex=0,o.focus())}redispatchEvent(e){fe(this,e)}handleClosed(e){this.open=!1,this.redispatchEvent(e)}handleCloseMenu(e){let t=e.detail.reason,i=e.detail.itemPath[0];this.open=!1;let o=!1;t.kind==="click-selection"?o=this.selectItem(i):t.kind==="keydown"&&ns(t.key)?o=this.selectItem(i):(i.tabIndex=-1,i.blur()),o&&this.dispatchInteractionEvents()}selectItem(e){return(this.getSelectedOptions()??[]).forEach(([i])=>{e!==i&&(i.selected=!1)}),e.selected=!0,this.updateValueAndDisplayText()}handleRequestSelection(e){let t=e.target;this.lastSelectedOptionRecords.some(([i])=>i===t)||this.selectItem(t)}handleRequestDeselection(e){let t=e.target;this.lastSelectedOptionRecords.some(([i])=>i===t)&&this.updateValueAndDisplayText()}initUserSelection(){this.lastUserSetValue&&!this.lastSelectedOptionRecords.length?this.select(this.lastUserSetValue):this.lastUserSetSelectedIndex!==null&&!this.lastSelectedOptionRecords.length?this.selectIndex(this.lastUserSetSelectedIndex):this.updateValueAndDisplayText()}handleIconChange(){this.hasLeadingIcon=this.leadingIcons.length>0}dispatchInteractionEvents(){this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0}))}getErrorText(){return this.error?this.errorText:this.nativeErrorText}[me](){return this.value}formResetCallback(){this.reset()}formStateRestoreCallback(e){this.value=e}click(){this.field?.click()}[Te](){return new ci(()=>this)}[Ie](){return this.field}};V.shadowRootOptions={..._.shadowRootOptions,delegatesFocus:!0};n([d({type:Boolean})],V.prototype,"quick",void 0);n([d({type:Boolean})],V.prototype,"required",void 0);n([d({type:String,attribute:"error-text"})],V.prototype,"errorText",void 0);n([d()],V.prototype,"label",void 0);n([d({type:Boolean,attribute:"no-asterisk"})],V.prototype,"noAsterisk",void 0);n([d({type:String,attribute:"supporting-text"})],V.prototype,"supportingText",void 0);n([d({type:Boolean,reflect:!0})],V.prototype,"error",void 0);n([d({attribute:"menu-positioning"})],V.prototype,"menuPositioning",void 0);n([d({type:Boolean,attribute:"clamp-menu-width"})],V.prototype,"clampMenuWidth",void 0);n([d({type:Number,attribute:"typeahead-delay"})],V.prototype,"typeaheadDelay",void 0);n([d({type:Boolean,attribute:"has-leading-icon"})],V.prototype,"hasLeadingIcon",void 0);n([d({attribute:"display-text"})],V.prototype,"displayText",void 0);n([d({attribute:"menu-align"})],V.prototype,"menuAlign",void 0);n([d()],V.prototype,"value",null);n([d({type:Number,attribute:"selected-index"})],V.prototype,"selectedIndex",null);n([M()],V.prototype,"nativeError",void 0);n([M()],V.prototype,"nativeErrorText",void 0);n([M()],V.prototype,"focused",void 0);n([M()],V.prototype,"open",void 0);n([M()],V.prototype,"defaultFocus",void 0);n([k(".field")],V.prototype,"field",void 0);n([k("md-menu")],V.prototype,"menu",void 0);n([k("#label")],V.prototype,"labelEl",void 0);n([ie({slot:"leading-icon",flatten:!0})],V.prototype,"leadingIcons",void 0);var hi=class extends V{constructor(){super(...arguments),this.fieldTag=X`md-outlined-field`}};var Rs=x`:host{--_text-field-disabled-input-text-color: var(--md-outlined-select-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-input-text-opacity: var(--md-outlined-select-text-field-disabled-input-text-opacity, 0.38);--_text-field-disabled-label-text-color: var(--md-outlined-select-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-label-text-opacity: var(--md-outlined-select-text-field-disabled-label-text-opacity, 0.38);--_text-field-disabled-leading-icon-color: var(--md-outlined-select-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-leading-icon-opacity: var(--md-outlined-select-text-field-disabled-leading-icon-opacity, 0.38);--_text-field-disabled-outline-color: var(--md-outlined-select-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-outline-opacity: var(--md-outlined-select-text-field-disabled-outline-opacity, 0.12);--_text-field-disabled-outline-width: var(--md-outlined-select-text-field-disabled-outline-width, 1px);--_text-field-disabled-supporting-text-color: var(--md-outlined-select-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-supporting-text-opacity: var(--md-outlined-select-text-field-disabled-supporting-text-opacity, 0.38);--_text-field-disabled-trailing-icon-color: var(--md-outlined-select-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-trailing-icon-opacity: var(--md-outlined-select-text-field-disabled-trailing-icon-opacity, 0.38);--_text-field-error-focus-input-text-color: var(--md-outlined-select-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-focus-label-text-color: var(--md-outlined-select-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-leading-icon-color: var(--md-outlined-select-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-focus-outline-color: var(--md-outlined-select-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-supporting-text-color: var(--md-outlined-select-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-trailing-icon-color: var(--md-outlined-select-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-input-text-color: var(--md-outlined-select-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-hover-label-text-color: var(--md-outlined-select-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-leading-icon-color: var(--md-outlined-select-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-hover-outline-color: var(--md-outlined-select-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-supporting-text-color: var(--md-outlined-select-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-trailing-icon-color: var(--md-outlined-select-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-input-text-color: var(--md-outlined-select-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-label-text-color: var(--md-outlined-select-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-leading-icon-color: var(--md-outlined-select-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-outline-color: var(--md-outlined-select-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_text-field-error-supporting-text-color: var(--md-outlined-select-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-trailing-icon-color: var(--md-outlined-select-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-focus-input-text-color: var(--md-outlined-select-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-focus-label-text-color: var(--md-outlined-select-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-leading-icon-color: var(--md-outlined-select-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-outline-color: var(--md-outlined-select-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-outline-width: var(--md-outlined-select-text-field-focus-outline-width, 3px);--_text-field-focus-supporting-text-color: var(--md-outlined-select-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-trailing-icon-color: var(--md-outlined-select-text-field-focus-trailing-icon-color, var(--md-sys-color-primary, #6750a4));--_text-field-hover-input-text-color: var(--md-outlined-select-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-label-text-color: var(--md-outlined-select-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-leading-icon-color: var(--md-outlined-select-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-outline-color: var(--md-outlined-select-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-outline-width: var(--md-outlined-select-text-field-hover-outline-width, 1px);--_text-field-hover-supporting-text-color: var(--md-outlined-select-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-trailing-icon-color: var(--md-outlined-select-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-input-text-color: var(--md-outlined-select-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-input-text-font: var(--md-outlined-select-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-input-text-line-height: var(--md-outlined-select-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-input-text-size: var(--md-outlined-select-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-input-text-weight: var(--md-outlined-select-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-label-text-color: var(--md-outlined-select-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-label-text-font: var(--md-outlined-select-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-label-text-line-height: var(--md-outlined-select-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-label-text-populated-line-height: var(--md-outlined-select-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-label-text-populated-size: var(--md-outlined-select-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-label-text-size: var(--md-outlined-select-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-label-text-weight: var(--md-outlined-select-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-leading-icon-color: var(--md-outlined-select-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-leading-icon-size: var(--md-outlined-select-text-field-leading-icon-size, 24px);--_text-field-outline-color: var(--md-outlined-select-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_text-field-outline-width: var(--md-outlined-select-text-field-outline-width, 1px);--_text-field-supporting-text-color: var(--md-outlined-select-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-supporting-text-font: var(--md-outlined-select-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-supporting-text-line-height: var(--md-outlined-select-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-supporting-text-size: var(--md-outlined-select-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-supporting-text-weight: var(--md-outlined-select-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-trailing-icon-color: var(--md-outlined-select-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-trailing-icon-size: var(--md-outlined-select-text-field-trailing-icon-size, 24px);--_text-field-container-shape-start-start: var(--md-outlined-select-text-field-container-shape-start-start, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-start-end: var(--md-outlined-select-text-field-container-shape-start-end, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-end: var(--md-outlined-select-text-field-container-shape-end-end, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-start: var(--md-outlined-select-text-field-container-shape-end-start, var(--md-outlined-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--md-outlined-field-container-shape-end-end: var(--_text-field-container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_text-field-container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_text-field-container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_text-field-container-shape-start-start);--md-outlined-field-content-color: var(--_text-field-input-text-color);--md-outlined-field-content-font: var(--_text-field-input-text-font);--md-outlined-field-content-line-height: var(--_text-field-input-text-line-height);--md-outlined-field-content-size: var(--_text-field-input-text-size);--md-outlined-field-content-weight: var(--_text-field-input-text-weight);--md-outlined-field-disabled-content-color: var(--_text-field-disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_text-field-disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_text-field-disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_text-field-disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_text-field-disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_text-field-disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_text-field-disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_text-field-disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_text-field-disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_text-field-disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_text-field-disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_text-field-disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_text-field-disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_text-field-error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_text-field-error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_text-field-error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_text-field-error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_text-field-error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_text-field-error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_text-field-error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_text-field-error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_text-field-error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_text-field-error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_text-field-error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_text-field-error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_text-field-error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_text-field-error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_text-field-error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_text-field-error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_text-field-error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_text-field-error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_text-field-focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_text-field-focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_text-field-focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_text-field-focus-outline-color);--md-outlined-field-focus-outline-width: var(--_text-field-focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_text-field-focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_text-field-focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_text-field-hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_text-field-hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_text-field-hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_text-field-hover-outline-color);--md-outlined-field-hover-outline-width: var(--_text-field-hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_text-field-hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_text-field-hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_text-field-label-text-color);--md-outlined-field-label-text-font: var(--_text-field-label-text-font);--md-outlined-field-label-text-line-height: var(--_text-field-label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_text-field-label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_text-field-label-text-populated-size);--md-outlined-field-label-text-size: var(--_text-field-label-text-size);--md-outlined-field-label-text-weight: var(--_text-field-label-text-weight);--md-outlined-field-leading-content-color: var(--_text-field-leading-icon-color);--md-outlined-field-outline-color: var(--_text-field-outline-color);--md-outlined-field-outline-width: var(--_text-field-outline-width);--md-outlined-field-supporting-text-color: var(--_text-field-supporting-text-color);--md-outlined-field-supporting-text-font: var(--_text-field-supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_text-field-supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_text-field-supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_text-field-supporting-text-weight);--md-outlined-field-trailing-content-color: var(--_text-field-trailing-icon-color)}[has-start] .icon.leading{font-size:var(--_text-field-leading-icon-size);height:var(--_text-field-leading-icon-size);width:var(--_text-field-leading-icon-size)}.icon.trailing{font-size:var(--_text-field-trailing-icon-size);height:var(--_text-field-trailing-icon-size);width:var(--_text-field-trailing-icon-size)}
`;var Ls=x`:host{color:unset;min-width:210px;display:flex}.field{cursor:default;outline:none}.select{position:relative;flex-direction:column}.icon.trailing svg,.icon ::slotted(*){fill:currentColor}.icon ::slotted(*){width:inherit;height:inherit;font-size:inherit}.icon slot{display:flex;height:100%;width:100%;align-items:center;justify-content:center}.icon.trailing :is(.up,.down){opacity:0;transition:opacity 75ms linear 75ms}.select:not(.open) .down,.select.open .up{opacity:1}.field,.select,md-menu{min-width:inherit;width:inherit;max-width:inherit;display:flex}md-menu{min-width:var(--__menu-min-width);max-width:var(--__menu-max-width, inherit)}.menu-wrapper{width:0px;height:0px;max-width:inherit}md-menu ::slotted(:not[disabled]){cursor:pointer}.field,.select{width:100%}:host{display:inline-flex}:host([disabled]){pointer-events:none}
`;var Do=class extends hi{};Do.styles=[Ls,Rs];Do=n([w("md-outlined-select")],Do);var Ms={dialog:[[[{transform:"translateY(-50px)"},{transform:"translateY(0)"}],{duration:500,easing:ne.EMPHASIZED}]],scrim:[[[{opacity:0},{opacity:.32}],{duration:500,easing:"linear"}]],container:[[[{opacity:0},{opacity:1}],{duration:50,easing:"linear",pseudoElement:"::before"}],[[{height:"35%"},{height:"100%"}],{duration:500,easing:ne.EMPHASIZED,pseudoElement:"::before"}]],headline:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],content:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:0},{opacity:0,offset:.5},{opacity:1}],{duration:300,easing:"linear",fill:"forwards"}]]},Ns={dialog:[[[{transform:"translateY(0)"},{transform:"translateY(-50px)"}],{duration:150,easing:ne.EMPHASIZED_ACCELERATE}]],scrim:[[[{opacity:.32},{opacity:0}],{duration:150,easing:"linear"}]],container:[[[{height:"100%"},{height:"35%"}],{duration:150,easing:ne.EMPHASIZED_ACCELERATE,pseudoElement:"::before"}],[[{opacity:"1"},{opacity:"0"}],{delay:100,duration:50,easing:"linear",pseudoElement:"::before"}]],headline:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],content:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]]};var Ul=J(_),Y=class extends Ul{get open(){return this.isOpen}set open(e){e!==this.isOpen&&(this.isOpen=e,e?(this.setAttribute("open",""),this.show()):(this.removeAttribute("open"),this.close()))}constructor(){super(),this.quick=!1,this.returnValue="",this.noFocusTrap=!1,this.getOpenAnimation=()=>Ms,this.getCloseAnimation=()=>Ns,this.isOpen=!1,this.isOpening=!1,this.isConnectedPromise=this.getIsConnectedPromise(),this.isAtScrollTop=!1,this.isAtScrollBottom=!1,this.nextClickIsFromContent=!1,this.hasHeadline=!1,this.hasActions=!1,this.hasIcon=!1,this.escapePressedWithoutCancel=!1,this.treewalker=document.createTreeWalker(this,NodeFilter.SHOW_ELEMENT),this.addEventListener("submit",this.handleSubmit)}async show(){this.isOpening=!0,await this.isConnectedPromise,await this.updateComplete;let e=this.dialog;if(e.open||!this.isOpening){this.isOpening=!1;return}if(!this.dispatchEvent(new Event("open",{cancelable:!0}))){this.open=!1,this.isOpening=!1;return}e.showModal(),this.open=!0,this.scroller&&(this.scroller.scrollTop=0),this.querySelector("[autofocus]")?.focus(),await this.animateDialog(this.getOpenAnimation()),this.dispatchEvent(new Event("opened")),this.isOpening=!1}async close(e=this.returnValue){if(this.isOpening=!1,!this.isConnected){this.open=!1;return}await this.updateComplete;let t=this.dialog;if(!t.open||this.isOpening){this.open=!1;return}let i=this.returnValue;if(this.returnValue=e,!this.dispatchEvent(new Event("close",{cancelable:!0}))){this.returnValue=i;return}await this.animateDialog(this.getCloseAnimation()),t.close(e),this.open=!1,this.dispatchEvent(new Event("closed"))}connectedCallback(){super.connectedCallback(),this.isConnectedPromiseResolve()}disconnectedCallback(){super.disconnectedCallback(),this.isConnectedPromise=this.getIsConnectedPromise()}render(){let e=this.open&&!(this.isAtScrollTop&&this.isAtScrollBottom),t={"has-headline":this.hasHeadline,"has-actions":this.hasActions,"has-icon":this.hasIcon,scrollable:e,"show-top-divider":e&&!this.isAtScrollTop,"show-bottom-divider":e&&!this.isAtScrollBottom},i=this.open&&!this.noFocusTrap,o=p`
      <div
        class="focus-trap"
        tabindex="0"
        aria-hidden="true"
        @focus=${this.handleFocusTrapFocus}></div>
    `,{ariaLabel:a}=this;return p`
      <div class="scrim"></div>
      <dialog
        class=${U(t)}
        aria-label=${a||v}
        aria-labelledby=${this.hasHeadline?"headline":v}
        role=${this.type==="alert"?"alertdialog":v}
        @cancel=${this.handleCancel}
        @click=${this.handleDialogClick}
        @close=${this.handleClose}
        @keydown=${this.handleKeydown}
        .returnValue=${this.returnValue||v}>
        ${i?o:v}
        <div class="container" @click=${this.handleContentClick}>
          <div class="headline">
            <div class="icon" aria-hidden="true">
              <slot name="icon" @slotchange=${this.handleIconChange}></slot>
            </div>
            <h2 id="headline" aria-hidden=${!this.hasHeadline||v}>
              <slot
                name="headline"
                @slotchange=${this.handleHeadlineChange}></slot>
            </h2>
            <md-divider></md-divider>
          </div>
          <div class="scroller">
            <div class="content">
              <div class="top anchor"></div>
              <slot name="content"></slot>
              <div class="bottom anchor"></div>
            </div>
          </div>
          <div class="actions">
            <md-divider></md-divider>
            <slot name="actions" @slotchange=${this.handleActionsChange}></slot>
          </div>
        </div>
        ${i?o:v}
      </dialog>
    `}firstUpdated(){this.intersectionObserver=new IntersectionObserver(e=>{for(let t of e)this.handleAnchorIntersection(t)},{root:this.scroller}),this.intersectionObserver.observe(this.topAnchor),this.intersectionObserver.observe(this.bottomAnchor)}handleDialogClick(){if(this.nextClickIsFromContent){this.nextClickIsFromContent=!1;return}this.dispatchEvent(new Event("cancel",{cancelable:!0}))&&this.close()}handleContentClick(){this.nextClickIsFromContent=!0}handleSubmit(e){let t=e.target,{submitter:i}=e;t.getAttribute("method")!=="dialog"||!i||this.close(i.getAttribute("value")??this.returnValue)}handleCancel(e){if(e.target!==this.dialog)return;this.escapePressedWithoutCancel=!1;let t=!fe(this,e);e.preventDefault(),!t&&this.close()}handleClose(){this.escapePressedWithoutCancel&&(this.escapePressedWithoutCancel=!1,this.dialog?.dispatchEvent(new Event("cancel",{cancelable:!0})))}handleKeydown(e){e.key==="Escape"&&(this.escapePressedWithoutCancel=!0,setTimeout(()=>{this.escapePressedWithoutCancel=!1}))}async animateDialog(e){if(this.cancelAnimations?.abort(),this.cancelAnimations=new AbortController,this.quick)return;let{dialog:t,scrim:i,container:o,headline:a,content:s,actions:l}=this;if(!t||!i||!o||!a||!s||!l)return;let{container:c,dialog:h,scrim:u,headline:f,content:b,actions:m}=e,E=[[t,h??[]],[i,u??[]],[o,c??[]],[a,f??[]],[s,b??[]],[l,m??[]]],S=[];for(let[O,$]of E)for(let T of $){let R=O.animate(...T);this.cancelAnimations.signal.addEventListener("abort",()=>{R.cancel()}),S.push(R)}await Promise.all(S.map(O=>O.finished.catch(()=>{})))}handleHeadlineChange(e){let t=e.target;this.hasHeadline=t.assignedElements().length>0}handleActionsChange(e){let t=e.target;this.hasActions=t.assignedElements().length>0}handleIconChange(e){let t=e.target;this.hasIcon=t.assignedElements().length>0}handleAnchorIntersection(e){let{target:t,isIntersecting:i}=e;t===this.topAnchor&&(this.isAtScrollTop=i),t===this.bottomAnchor&&(this.isAtScrollBottom=i)}getIsConnectedPromise(){return new Promise(e=>{this.isConnectedPromiseResolve=e})}handleFocusTrapFocus(e){let[t,i]=this.getFirstAndLastFocusableChildren();if(!t||!i){this.dialog?.focus();return}let o=e.target===this.firstFocusTrap,a=!o,s=e.relatedTarget===t,l=e.relatedTarget===i,c=!s&&!l;if(a&&l||o&&c){t.focus();return}if(o&&s||a&&c){i.focus();return}}getFirstAndLastFocusableChildren(){if(!this.treewalker)return[null,null];let e=null,t=null;for(this.treewalker.currentNode=this.treewalker.root;this.treewalker.nextNode();){let i=this.treewalker.currentNode;Vl(i)&&(e||(e=i),t=i)}return[e,t]}};n([d({type:Boolean})],Y.prototype,"open",null);n([d({type:Boolean})],Y.prototype,"quick",void 0);n([d({attribute:!1})],Y.prototype,"returnValue",void 0);n([d()],Y.prototype,"type",void 0);n([d({type:Boolean,attribute:"no-focus-trap"})],Y.prototype,"noFocusTrap",void 0);n([k("dialog")],Y.prototype,"dialog",void 0);n([k(".scrim")],Y.prototype,"scrim",void 0);n([k(".container")],Y.prototype,"container",void 0);n([k(".headline")],Y.prototype,"headline",void 0);n([k(".content")],Y.prototype,"content",void 0);n([k(".actions")],Y.prototype,"actions",void 0);n([M()],Y.prototype,"isAtScrollTop",void 0);n([M()],Y.prototype,"isAtScrollBottom",void 0);n([k(".scroller")],Y.prototype,"scroller",void 0);n([k(".top.anchor")],Y.prototype,"topAnchor",void 0);n([k(".bottom.anchor")],Y.prototype,"bottomAnchor",void 0);n([k(".focus-trap")],Y.prototype,"firstFocusTrap",void 0);n([M()],Y.prototype,"hasHeadline",void 0);n([M()],Y.prototype,"hasActions",void 0);n([M()],Y.prototype,"hasIcon",void 0);function Vl(r){let e=":is(button,input,select,textarea,object,:is(a,area)[href],[tabindex],[contenteditable=true])",t=":not(:disabled,[disabled])";return r.matches(e+t+':not([tabindex^="-"])')?!0:!r.localName.includes("-")||!r.matches(t)?!1:r.shadowRoot?.delegatesFocus??!1}var zs=x`:host{border-start-start-radius:var(--md-dialog-container-shape-start-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-start-end-radius:var(--md-dialog-container-shape-start-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-end-radius:var(--md-dialog-container-shape-end-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-start-radius:var(--md-dialog-container-shape-end-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:none;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:none}.scrim{background:var(--md-sys-color-scrim, #000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));display:flex;flex-direction:column;font-family:var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));font-size:var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));line-height:var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));font-weight:var(--md-dialog-headline-weight, var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)));position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--md-dialog-icon-color, var(--md-sys-color-secondary, #625b71));fill:currentColor;font-size:var(--md-dialog-icon-size, 24px);margin-top:24px;height:var(--md-dialog-icon-size, 24px);width:var(--md-dialog-icon-size, 24px)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));flex:1;font-weight:var(--md-dialog-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)));height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-headline.show-top-divider .headline md-divider,.has-actions.show-bottom-divider .actions md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors: active){dialog{outline:2px solid WindowText}}
`;var Po=class extends Y{};Po.styles=[zs];Po=n([w("md-dialog")],Po);var Ds=x`@media(forced-colors: active){:host{--md-slider-active-track-color: CanvasText;--md-slider-disabled-active-track-color: GrayText;--md-slider-disabled-active-track-opacity: 1;--md-slider-disabled-handle-color: GrayText;--md-slider-disabled-inactive-track-color: GrayText;--md-slider-disabled-inactive-track-opacity: 1;--md-slider-focus-handle-color: CanvasText;--md-slider-handle-color: CanvasText;--md-slider-handle-shadow-color: Canvas;--md-slider-hover-handle-color: CanvasText;--md-slider-hover-state-layer-color: Canvas;--md-slider-hover-state-layer-opacity: 1;--md-slider-inactive-track-color: Canvas;--md-slider-label-container-color: Canvas;--md-slider-label-text-color: CanvasText;--md-slider-pressed-handle-color: CanvasText;--md-slider-pressed-state-layer-color: Canvas;--md-slider-pressed-state-layer-opacity: 1;--md-slider-with-overlap-handle-outline-color: CanvasText}.label,.label::before{border:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}:host(:not([disabled])) .track::before{border:1px solid var(--_active-track-color)}.tickmarks::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='CanvasText'%3E%3Ccircle cx='2' cy='2'  r='1'/%3E%3C/svg%3E")}.tickmarks::after{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='Canvas'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/svg%3E")}:host([disabled]) .tickmarks::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='Canvas'%3E%3Ccircle cx='2' cy='2'  r='1'/%3E%3C/svg%3E")}}
`;function pi(r,e,t){return r?e(r):t?.(r)}var Wl=J($e(he(_))),H=class extends Wl{get nameStart(){return this.getAttribute("name-start")??this.name}set nameStart(e){this.setAttribute("name-start",e)}get nameEnd(){return this.getAttribute("name-end")??this.nameStart}set nameEnd(e){this.setAttribute("name-end",e)}get renderAriaLabelStart(){let{ariaLabel:e}=this;return this.ariaLabelStart||e&&`${e} start`||this.valueLabelStart||String(this.valueStart)}get renderAriaValueTextStart(){return this.ariaValueTextStart||this.valueLabelStart||String(this.valueStart)}get renderAriaLabelEnd(){let{ariaLabel:e}=this;return this.range?this.ariaLabelEnd||e&&`${e} end`||this.valueLabelEnd||String(this.valueEnd):e||this.valueLabel||String(this.value)}get renderAriaValueTextEnd(){if(this.range)return this.ariaValueTextEnd||this.valueLabelEnd||String(this.valueEnd);let{ariaValueText:e}=this;return e||this.valueLabel||String(this.value)}constructor(){super(),this.min=0,this.max=100,this.valueLabel="",this.valueLabelStart="",this.valueLabelEnd="",this.ariaLabelStart="",this.ariaValueTextStart="",this.ariaLabelEnd="",this.ariaValueTextEnd="",this.step=1,this.ticks=!1,this.labeled=!1,this.range=!1,this.handleStartHover=!1,this.handleEndHover=!1,this.startOnTop=!1,this.handlesOverlapping=!1,this.ripplePointerId=1,this.isRedispatchingEvent=!1,this.addEventListener("click",e=>{!Ye(e)||!this.inputEnd||(this.focus(),Ke(this.inputEnd))})}focus(){this.inputEnd?.focus()}willUpdate(e){this.renderValueStart=e.has("valueStart")?this.valueStart:this.inputStart?.valueAsNumber;let t=e.has("valueEnd")&&this.range||e.has("value");this.renderValueEnd=t?this.range?this.valueEnd:this.value:this.inputEnd?.valueAsNumber,e.get("handleStartHover")!==void 0?this.toggleRippleHover(this.rippleStart,this.handleStartHover):e.get("handleEndHover")!==void 0&&this.toggleRippleHover(this.rippleEnd,this.handleEndHover)}updated(e){if(this.range&&(this.renderValueStart=this.inputStart.valueAsNumber),this.renderValueEnd=this.inputEnd.valueAsNumber,this.range){let t=(this.max-this.min)/3;if(this.valueStart===void 0){this.inputStart.valueAsNumber=this.min+t;let i=this.inputStart.valueAsNumber;this.valueStart=this.renderValueStart=i}if(this.valueEnd===void 0){this.inputEnd.valueAsNumber=this.min+2*t;let i=this.inputEnd.valueAsNumber;this.valueEnd=this.renderValueEnd=i}}else this.value??=this.renderValueEnd;if(e.has("range")||e.has("renderValueStart")||e.has("renderValueEnd")||this.isUpdatePending){let t=this.handleStart?.querySelector(".handleNub"),i=this.handleEnd?.querySelector(".handleNub");this.handlesOverlapping=ql(t,i)}this.performUpdate()}render(){let e=this.step===0?1:this.step,t=Math.max(this.max-this.min,e),i=this.range?((this.renderValueStart??this.min)-this.min)/t:0,o=((this.renderValueEnd??this.min)-this.min)/t,a={"--_start-fraction":String(i),"--_end-fraction":String(o),"--_tick-count":String(t/e)},s={ranged:this.range},l=this.valueLabelStart||String(this.renderValueStart),c=(this.range?this.valueLabelEnd:this.valueLabel)||String(this.renderValueEnd),h={start:!0,value:this.renderValueStart,ariaLabel:this.renderAriaLabelStart,ariaValueText:this.renderAriaValueTextStart,ariaMin:this.min,ariaMax:this.valueEnd??this.max},u={start:!1,value:this.renderValueEnd,ariaLabel:this.renderAriaLabelEnd,ariaValueText:this.renderAriaValueTextEnd,ariaMin:this.range?this.valueStart??this.min:this.min,ariaMax:this.max},f={start:!0,hover:this.handleStartHover,label:l},b={start:!1,hover:this.handleEndHover,label:c},m={hover:this.handleStartHover||this.handleEndHover};return p` <div
      class="container ${U(s)}"
      style=${Fe(a)}>
      ${pi(this.range,()=>this.renderInput(h))}
      ${this.renderInput(u)} ${this.renderTrack()}
      <div class="handleContainerPadded">
        <div class="handleContainerBlock">
          <div class="handleContainer ${U(m)}">
            ${pi(this.range,()=>this.renderHandle(f))}
            ${this.renderHandle(b)}
          </div>
        </div>
      </div>
    </div>`}renderTrack(){return p`
      <div class="track"></div>
      ${this.ticks?p`<div class="tickmarks"></div>`:v}
    `}renderLabel(e){return p`<div class="label" aria-hidden="true">
      <span class="labelContent" part="label">${e}</span>
    </div>`}renderHandle({start:e,hover:t,label:i}){let o=!this.disabled&&e===this.startOnTop,a=!this.disabled&&this.handlesOverlapping,s=e?"start":"end";return p`<div
      class="handle ${U({[s]:!0,hover:t,onTop:o,isOverlapping:a})}">
      <md-focus-ring part="focus-ring" for=${s}></md-focus-ring>
      <md-ripple
        for=${s}
        class=${s}
        ?disabled=${this.disabled}></md-ripple>
      <div class="handleNub">
        <md-elevation part="elevation"></md-elevation>
      </div>
      ${pi(this.labeled,()=>this.renderLabel(i))}
    </div>`}renderInput({start:e,value:t,ariaLabel:i,ariaValueText:o,ariaMin:a,ariaMax:s}){let l=e?"start":"end";return p`<input
      type="range"
      class="${U({start:e,end:!e})}"
      @focus=${this.handleFocus}
      @pointerdown=${this.handleDown}
      @pointerup=${this.handleUp}
      @pointerenter=${this.handleEnter}
      @pointermove=${this.handleMove}
      @pointerleave=${this.handleLeave}
      @keydown=${this.handleKeydown}
      @keyup=${this.handleKeyup}
      @input=${this.handleInput}
      @change=${this.handleChange}
      id=${l}
      .disabled=${this.disabled}
      .min=${String(this.min)}
      aria-valuemin=${a}
      .max=${String(this.max)}
      aria-valuemax=${s}
      .step=${String(this.step)}
      .value=${String(t)}
      .tabIndex=${e?1:0}
      aria-label=${i||v}
      aria-valuetext=${o} />`}async toggleRippleHover(e,t){let i=await e;i&&(t?i.handlePointerenter(new PointerEvent("pointerenter",{isPrimary:!0,pointerId:this.ripplePointerId})):i.handlePointerleave(new PointerEvent("pointerleave",{isPrimary:!0,pointerId:this.ripplePointerId})))}handleFocus(e){this.updateOnTop(e.target)}startAction(e){let t=e.target,i=t===this.inputStart?this.inputEnd:this.inputStart;this.action={canFlip:e.type==="pointerdown",flipped:!1,target:t,fixed:i,values:new Map([[t,t.valueAsNumber],[i,i?.valueAsNumber]])}}finishAction(e){this.action=void 0}handleKeydown(e){this.startAction(e)}handleKeyup(e){this.finishAction(e)}handleDown(e){this.startAction(e),this.ripplePointerId=e.pointerId;let t=e.target===this.inputStart;this.handleStartHover=!this.disabled&&t&&!!this.handleStart,this.handleEndHover=!this.disabled&&!t&&!!this.handleEnd}async handleUp(e){if(!this.action)return;let{target:t,values:i,flipped:o}=this.action;await new Promise(requestAnimationFrame),t!==void 0&&(t.focus(),o&&t.valueAsNumber!==i.get(t)&&t.dispatchEvent(new Event("change",{bubbles:!0}))),this.finishAction(e)}handleMove(e){this.handleStartHover=!this.disabled&&Ps(e,this.handleStart),this.handleEndHover=!this.disabled&&Ps(e,this.handleEnd)}handleEnter(e){this.handleMove(e)}handleLeave(){this.handleStartHover=!1,this.handleEndHover=!1}updateOnTop(e){this.startOnTop=e.classList.contains("start")}needsClamping(){if(!this.action)return!1;let{target:e,fixed:t}=this.action;return e===this.inputStart?e.valueAsNumber>t.valueAsNumber:e.valueAsNumber<t.valueAsNumber}isActionFlipped(){let{action:e}=this;if(!e)return!1;let{target:t,fixed:i,values:o}=e;return e.canFlip&&o.get(t)===o.get(i)&&this.needsClamping()&&(e.canFlip=!1,e.flipped=!0,e.target=i,e.fixed=t),e.flipped}flipAction(){if(!this.action)return!1;let{target:e,fixed:t,values:i}=this.action,o=e.valueAsNumber!==t.valueAsNumber;return e.valueAsNumber=t.valueAsNumber,t.valueAsNumber=i.get(t),o}clampAction(){if(!this.needsClamping()||!this.action)return!1;let{target:e,fixed:t}=this.action;return e.valueAsNumber=t.valueAsNumber,!0}handleInput(e){if(this.isRedispatchingEvent)return;let t=!1,i=!1;this.range&&(this.isActionFlipped()&&(t=!0,i=this.flipAction()),this.clampAction()&&(t=!0,i=!1));let o=e.target;this.updateOnTop(o),this.range?(this.valueStart=this.inputStart.valueAsNumber,this.valueEnd=this.inputEnd.valueAsNumber):this.value=this.inputEnd.valueAsNumber,t&&e.stopPropagation(),i&&(this.isRedispatchingEvent=!0,fe(o,e),this.isRedispatchingEvent=!1)}handleChange(e){let t=e.target,{target:i,values:o}=this.action??{};i&&i.valueAsNumber===o.get(t)||fe(this,e),this.finishAction(e)}[me](){if(this.range){let e=new FormData;return e.append(this.nameStart,String(this.valueStart)),e.append(this.nameEnd,String(this.valueEnd)),e}return String(this.value)}formResetCallback(){if(this.range){let t=this.getAttribute("value-start");this.valueStart=t!==null?Number(t):void 0;let i=this.getAttribute("value-end");this.valueEnd=i!==null?Number(i):void 0;return}let e=this.getAttribute("value");this.value=e!==null?Number(e):void 0}formStateRestoreCallback(e){if(Array.isArray(e)){let[[,t],[,i]]=e;this.valueStart=Number(t),this.valueEnd=Number(i),this.range=!0;return}this.value=Number(e),this.range=!1}};H.shadowRootOptions={..._.shadowRootOptions,delegatesFocus:!0};n([d({type:Number})],H.prototype,"min",void 0);n([d({type:Number})],H.prototype,"max",void 0);n([d({type:Number})],H.prototype,"value",void 0);n([d({type:Number,attribute:"value-start"})],H.prototype,"valueStart",void 0);n([d({type:Number,attribute:"value-end"})],H.prototype,"valueEnd",void 0);n([d({attribute:"value-label"})],H.prototype,"valueLabel",void 0);n([d({attribute:"value-label-start"})],H.prototype,"valueLabelStart",void 0);n([d({attribute:"value-label-end"})],H.prototype,"valueLabelEnd",void 0);n([d({attribute:"aria-label-start"})],H.prototype,"ariaLabelStart",void 0);n([d({attribute:"aria-valuetext-start"})],H.prototype,"ariaValueTextStart",void 0);n([d({attribute:"aria-label-end"})],H.prototype,"ariaLabelEnd",void 0);n([d({attribute:"aria-valuetext-end"})],H.prototype,"ariaValueTextEnd",void 0);n([d({type:Number})],H.prototype,"step",void 0);n([d({type:Boolean})],H.prototype,"ticks",void 0);n([d({type:Boolean})],H.prototype,"labeled",void 0);n([d({type:Boolean})],H.prototype,"range",void 0);n([k("input.start")],H.prototype,"inputStart",void 0);n([k(".handle.start")],H.prototype,"handleStart",void 0);n([Ti("md-ripple.start")],H.prototype,"rippleStart",void 0);n([k("input.end")],H.prototype,"inputEnd",void 0);n([k(".handle.end")],H.prototype,"handleEnd",void 0);n([Ti("md-ripple.end")],H.prototype,"rippleEnd",void 0);n([M()],H.prototype,"handleStartHover",void 0);n([M()],H.prototype,"handleEndHover",void 0);n([M()],H.prototype,"startOnTop",void 0);n([M()],H.prototype,"handlesOverlapping",void 0);n([M()],H.prototype,"renderValueStart",void 0);n([M()],H.prototype,"renderValueEnd",void 0);function Ps({x:r,y:e},t){if(!t)return!1;let{top:i,left:o,bottom:a,right:s}=t.getBoundingClientRect();return r>=o&&r<=s&&e>=i&&e<=a}function ql(r,e){if(!(r&&e))return!1;let t=r.getBoundingClientRect(),i=e.getBoundingClientRect();return!(t.top>i.bottom||t.right<i.left||t.bottom<i.top||t.left>i.right)}var Fs=x`:host{--_active-track-color: var(--md-slider-active-track-color, var(--md-sys-color-primary, #6750a4));--_active-track-height: var(--md-slider-active-track-height, 4px);--_active-track-shape: var(--md-slider-active-track-shape, var(--md-sys-shape-corner-full, 9999px));--_disabled-active-track-color: var(--md-slider-disabled-active-track-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-track-opacity: var(--md-slider-disabled-active-track-opacity, 0.38);--_disabled-handle-color: var(--md-slider-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-handle-elevation: var(--md-slider-disabled-handle-elevation, 0);--_disabled-inactive-track-color: var(--md-slider-disabled-inactive-track-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-inactive-track-opacity: var(--md-slider-disabled-inactive-track-opacity, 0.12);--_focus-handle-color: var(--md-slider-focus-handle-color, var(--md-sys-color-primary, #6750a4));--_handle-color: var(--md-slider-handle-color, var(--md-sys-color-primary, #6750a4));--_handle-elevation: var(--md-slider-handle-elevation, 1);--_handle-height: var(--md-slider-handle-height, 20px);--_handle-shadow-color: var(--md-slider-handle-shadow-color, var(--md-sys-color-shadow, #000));--_handle-shape: var(--md-slider-handle-shape, var(--md-sys-shape-corner-full, 9999px));--_handle-width: var(--md-slider-handle-width, 20px);--_hover-handle-color: var(--md-slider-hover-handle-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-slider-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-slider-hover-state-layer-opacity, 0.08);--_inactive-track-color: var(--md-slider-inactive-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_inactive-track-height: var(--md-slider-inactive-track-height, 4px);--_inactive-track-shape: var(--md-slider-inactive-track-shape, var(--md-sys-shape-corner-full, 9999px));--_label-container-color: var(--md-slider-label-container-color, var(--md-sys-color-primary, #6750a4));--_label-container-height: var(--md-slider-label-container-height, 28px);--_pressed-handle-color: var(--md-slider-pressed-handle-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-slider-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-slider-pressed-state-layer-opacity, 0.12);--_state-layer-size: var(--md-slider-state-layer-size, 40px);--_with-overlap-handle-outline-color: var(--md-slider-with-overlap-handle-outline-color, var(--md-sys-color-on-primary, #fff));--_with-overlap-handle-outline-width: var(--md-slider-with-overlap-handle-outline-width, 1px);--_with-tick-marks-active-container-color: var(--md-slider-with-tick-marks-active-container-color, var(--md-sys-color-on-primary, #fff));--_with-tick-marks-container-size: var(--md-slider-with-tick-marks-container-size, 2px);--_with-tick-marks-disabled-container-color: var(--md-slider-with-tick-marks-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_with-tick-marks-inactive-container-color: var(--md-slider-with-tick-marks-inactive-container-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-slider-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-slider-label-text-font, var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-slider-label-text-line-height, var(--md-sys-typescale-label-medium-line-height, 1rem));--_label-text-size: var(--md-slider-label-text-size, var(--md-sys-typescale-label-medium-size, 0.75rem));--_label-text-weight: var(--md-slider-label-text-weight, var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)));--_start-fraction: 0;--_end-fraction: 0;--_tick-count: 0;display:inline-flex;vertical-align:middle;min-inline-size:200px;--md-elevation-level: var(--_handle-elevation);--md-elevation-shadow-color: var(--_handle-shadow-color)}md-focus-ring{height:48px;inset:unset;width:48px}md-elevation{transition-duration:250ms}@media(prefers-reduced-motion){.label{transition-duration:0}}:host([disabled]){opacity:var(--_disabled-active-track-opacity);--md-elevation-level: var(--_disabled-handle-elevation)}.container{flex:1;display:flex;align-items:center;position:relative;block-size:var(--_state-layer-size);pointer-events:none;touch-action:none}.track,.tickmarks{position:absolute;inset:0;display:flex;align-items:center}.track::before,.tickmarks::before,.track::after,.tickmarks::after{position:absolute;content:"";inset-inline-start:calc(var(--_state-layer-size)/2 - var(--_with-tick-marks-container-size));inset-inline-end:calc(var(--_state-layer-size)/2 - var(--_with-tick-marks-container-size));background-size:calc((100% - var(--_with-tick-marks-container-size)*2)/var(--_tick-count)) 100%}.track::before,.tickmarks::before{block-size:var(--_inactive-track-height);border-radius:var(--_inactive-track-shape)}.track::before{background:var(--_inactive-track-color)}.tickmarks::before{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-inactive-container-color) 0, var(--_with-tick-marks-inactive-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}:host([disabled]) .track::before{opacity:calc(1/var(--_disabled-active-track-opacity)*var(--_disabled-inactive-track-opacity));background:var(--_disabled-inactive-track-color)}.track::after,.tickmarks::after{block-size:var(--_active-track-height);border-radius:var(--_active-track-shape);clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))) 0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)))}.track::after{background:var(--_active-track-color)}.tickmarks::after{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-active-container-color) 0, var(--_with-tick-marks-active-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}.track:dir(rtl)::after{clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)) 0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))))}.tickmarks:dir(rtl)::after{clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)) 0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))))}:host([disabled]) .track::after{background:var(--_disabled-active-track-color)}:host([disabled]) .tickmarks::before{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-disabled-container-color) 0, var(--_with-tick-marks-disabled-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}.handleContainerPadded{position:relative;block-size:100%;inline-size:100%;padding-inline:calc(var(--_state-layer-size)/2)}.handleContainerBlock{position:relative;block-size:100%;inline-size:100%}.handleContainer{position:absolute;inset-block-start:0;inset-block-end:0;inset-inline-start:calc(100%*var(--_start-fraction));inline-size:calc(100%*(var(--_end-fraction) - var(--_start-fraction)))}.handle{position:absolute;block-size:var(--_state-layer-size);inline-size:var(--_state-layer-size);border-radius:var(--_handle-shape);display:flex;place-content:center;place-items:center}.handleNub{position:absolute;height:var(--_handle-height);width:var(--_handle-width);border-radius:var(--_handle-shape);background:var(--_handle-color)}:host([disabled]) .handleNub{background:var(--_disabled-handle-color)}input.end:focus~.handleContainerPadded .handle.end>.handleNub,input.start:focus~.handleContainerPadded .handle.start>.handleNub{background:var(--_focus-handle-color)}.container>.handleContainerPadded .handle.hover>.handleNub{background:var(--_hover-handle-color)}:host(:not([disabled])) input.end:active~.handleContainerPadded .handle.end>.handleNub,:host(:not([disabled])) input.start:active~.handleContainerPadded .handle.start>.handleNub{background:var(--_pressed-handle-color)}.onTop.isOverlapping .label,.onTop.isOverlapping .label::before{outline:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}.onTop.isOverlapping .handleNub{border:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}.handle.start{inset-inline-start:calc(0px - var(--_state-layer-size)/2)}.handle.end{inset-inline-end:calc(0px - var(--_state-layer-size)/2)}.label{position:absolute;box-sizing:border-box;display:flex;padding:4px;place-content:center;place-items:center;border-radius:var(--md-sys-shape-corner-full, 9999px);color:var(--_label-text-color);font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);inset-block-end:100%;min-inline-size:var(--_label-container-height);min-block-size:var(--_label-container-height);background:var(--_label-container-color);transition:transform 100ms cubic-bezier(0.2, 0, 0, 1);transform-origin:center bottom;transform:scale(0)}:host(:focus-within) .label,.handleContainer.hover .label,:where(:has(input:active)) .label{transform:scale(1)}.label::before,.label::after{position:absolute;display:block;content:"";background:inherit}.label::before{inline-size:calc(var(--_label-container-height)/2);block-size:calc(var(--_label-container-height)/2);bottom:calc(var(--_label-container-height)/-10);transform:rotate(45deg)}.label::after{inset:0px;border-radius:inherit}.labelContent{z-index:1}input[type=range]{opacity:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:absolute;box-sizing:border-box;height:100%;width:100%;margin:0;background:rgba(0,0,0,0);cursor:pointer;pointer-events:auto;appearance:none}input[type=range]:focus{outline:none}::-webkit-slider-runnable-track{-webkit-appearance:none}::-moz-range-track{appearance:none}::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;block-size:var(--_handle-height);inline-size:var(--_handle-width);opacity:0;z-index:2}input.end::-webkit-slider-thumb{--_track-and-knob-padding: calc( (var(--_state-layer-size) - var(--_handle-width)) / 2 );--_x-translate: calc( var(--_track-and-knob-padding) - 2 * var(--_end-fraction) * var(--_track-and-knob-padding) );transform:translateX(var(--_x-translate))}input.end:dir(rtl)::-webkit-slider-thumb{transform:translateX(calc(-1 * var(--_x-translate)))}input.start::-webkit-slider-thumb{--_track-and-knob-padding: calc( (var(--_state-layer-size) - var(--_handle-width)) / 2 );--_x-translate: calc( var(--_track-and-knob-padding) - 2 * var(--_start-fraction) * var(--_track-and-knob-padding) );transform:translateX(var(--_x-translate))}input.start:dir(rtl)::-webkit-slider-thumb{transform:translateX(calc(-1 * var(--_x-translate)))}::-moz-range-thumb{appearance:none;block-size:var(--_state-layer-size);inline-size:var(--_state-layer-size);transform:scaleX(0);opacity:0;z-index:2}.ranged input.start{clip-path:inset(0 calc(100% - (var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2))) 0 0)}.ranged input.start:dir(rtl){clip-path:inset(0 0 0 calc(100% - (var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2))))}.ranged input.end{clip-path:inset(0 0 0 calc(var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2)))}.ranged input.end:dir(rtl){clip-path:inset(0 calc(var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2)) 0 0)}.onTop{z-index:1}.handle{--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-ripple{border-radius:50%;height:var(--_state-layer-size);width:var(--_state-layer-size)}
`;var Fo=class extends H{};Fo.styles=[Fs,Ds];Fo=n([w("md-slider")],Fo);var Jt=class extends CustomEvent{},le=class extends _{constructor(){super(...arguments);this.label="";this.value=[];this.open=!1;this.expandAtOrigin=!1;this.numCharsOnHandler=3;this.onKeydownWhileOpenWithThis=this.onKeydownWhileOpen.bind(this)}onKeydownWhileOpen(t){if(t.key==="Escape"){this.open=!1;return}if(t.key==="Tab"&&this.shadowRoot&&this.focusibleButtons){let i=this.shadowRoot.activeElement;t.shiftKey&&i===this.focusibleButtons[0]?(this.focusibleButtons[this.focusibleButtons.length-1].focus(),t.preventDefault()):!t.shiftKey&&i===this.focusibleButtons[this.focusibleButtons.length-1]&&(this.focusibleButtons[0].focus(),t.preventDefault())}}onKeypadOpen(){if(this.container&&this.expandedKeypadRows&&this.handlerButton){if(this.expandAtOrigin)this.container.style.position="absolute",this.container.style.top="0",this.container.style.left="0",this.expandedKeypadRows.forEach(t=>{t.style.transform="none"});else{let t=this.handlerButton.getBoundingClientRect();this.container.style.position="fixed",this.container.style.top=`${t?.top}px`,this.container.style.left=`${t?.left}px`,this.expandedKeypadRows.forEach(i=>{i.style.transform="";let o=i.getBoundingClientRect();o.right>window.innerWidth&&(i.style.transform=`translateX(${window.innerWidth-o.right-16}px)`)})}this.firstKeypad?.focus(),this.addEventListener("keydown",this.onKeydownWhileOpenWithThis),this.dispatchEvent(new Event("keypad-open",{bubbles:!0,composed:!0}))}}onKeypadClose(){this.removeEventListener("keydown",this.onKeydownWhileOpenWithThis),this.handlerButton?.focus()}firstUpdated(){this.resizeObserver=new ResizeObserver(()=>{if(!this.handlerButton)return;let t=this.handlerButton.getBoundingClientRect().width;this.allButtons?.forEach(i=>{i!==this.handlerButton&&(i.style.width=`${t}px`),i.style.fontSize=`${t/this.numCharsOnHandler}px`})}),this.resizeObserver.observe(this.handlerButton)}updated(t){let i=t.get("open");i===!0?this.onKeypadClose():i===!1&&this.onKeypadOpen()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect()}render(){return p`<button
        class="handler"
        @click="${()=>{this.open=!0,this.dispatchEvent(new Jt("keypad-handler-click",{detail:"open",bubbles:!0,composed:!0}))}}"
      >
        ${this.label}
      </button>
      <ul class="container">
        <button
          class="close"
          @click="${()=>{this.open=!1,this.dispatchEvent(new Jt("keypad-handler-click",{detail:"close",bubbles:!0,composed:!0}))}}"
        >
          close
        </button>
        ${this.value.map(t=>p`<li>
              <ul class="row">
                ${Array.from(t).map(i=>p`<li>
                      <button
                        @click="${()=>{this.open=!1;let o=i.replace("\u2423"," ");this.dispatchEvent(new Jt("character-select",{detail:o,bubbles:!0,composed:!0}))}}"
                      >
                        ${i}
                      </button>
                    </li>`)}
              </ul>
            </li>`)}
      </ul>
      <div
        class="backdrop"
        @click="${()=>{this.open=!1}}"
      ></div>`}};le.styles=x`
    button {
      align-items: center;
      aspect-ratio: 1;
      background: var(--color-surface, white);
      border-radius: 20%;
      border: solid 3px #81c995;
      color: var(--color-on-surface);
      cursor: pointer;
      display: flex;
      font-family: 'Roboto Mono', 'Noto Sans JP', monospace;
      justify-content: center;
      max-width: 8rem;
      min-width: 2rem;
      padding: 0;
      width: 100%;
    }

    button:hover,
    button:focus {
      background: var(--color-primary, yellow);
    }

    .close {
      font-family: 'Material Symbols Outlined';
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    ul.container {
      display: none;
      left: 0;
      position: absolute;
      top: 0;
      z-index: 1000;
    }

    :host([open]) ul.container {
      display: block;
    }

    ul.row {
      display: flex;
      gap: 0.5rem;
    }

    ul button {
      margin-bottom: 0.5rem;
    }

    .backdrop {
      background: rgba(0, 0, 0, 0.5);
      display: none;
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 100;
    }

    :host([open]) .backdrop {
      display: block;
    }
  `,g([d({type:String,reflect:!0})],le.prototype,"label",2),g([d({type:Array})],le.prototype,"value",2),g([d({type:Boolean,reflect:!0})],le.prototype,"open",2),g([d({type:Boolean,reflect:!0})],le.prototype,"expandAtOrigin",2),g([d({type:Number})],le.prototype,"numCharsOnHandler",2),g([Ce("button")],le.prototype,"allButtons",2),g([k("button.handler")],le.prototype,"handlerButton",2),g([k("ul.container")],le.prototype,"container",2),g([Ce("ul.container button")],le.prototype,"focusibleButtons",2),g([k("li button")],le.prototype,"firstKeypad",2),g([Ce("ul.row")],le.prototype,"expandedKeypadRows",2),le=g([w("pv-expand-keypad")],le);var jl=[[{label:"abc",value:["abc"]},{label:"def",value:["def"]},{label:"ghi",value:["ghi"]},{label:"jkl",value:["jkl"]},{label:"mno",value:["mno"]},{label:"pqrs",value:["pqrs"]},{label:"tuv",value:["tuv"]},{label:"wxyz",value:["wxyz"]},{label:"0~9",value:["01234","56789"]},{label:".,!?",value:["\u2423.,!?"]}]],Gl=[[{label:"\u3042",value:["\u3042\u3044\u3046\u3048\u304A","\u3041\u3043\u3045\u3047\u3049"]},{label:"\u304B",value:["\u304B\u304D\u304F\u3051\u3053","\u304C\u304E\u3050\u3052\u3054"]},{label:"\u3055",value:["\u3055\u3057\u3059\u305B\u305D","\u3056\u3058\u305A\u305C\u305E"]},{label:"\u305F",value:["\u305F\u3061\u3064\u3066\u3068\u3063","\u3060\u3062\u3065\u3067\u3069"]},{label:"\u306A",value:["\u306A\u306B\u306C\u306D\u306E"]},{label:"\u306F",value:["\u306F\u3072\u3075\u3078\u307B","\u3070\u3073\u3076\u3079\u307C","\u3071\u3074\u3077\u307A\u307D"]},{label:"\u307E",value:["\u307E\u307F\u3080\u3081\u3082"]},{label:"\u3084",value:["\u3084\u3086\u3088","\u3083\u3085\u3087"]},{label:"\u3089",value:["\u3089\u308A\u308B\u308C\u308D"]},{label:"\u308F",value:["\u308F\u3092\u3093"]},{label:"\u309B\u309C",value:["\u3002\u3001\u30FC\uFF1F\uFF01","\u2423\u309B\u309C"]}]],Kl=[[{label:"abc",value:["abc","\xE0\xE2\xE7"]},{label:"def",value:["def","\xE8\xE9\xEA\xEB"]},{label:"ghi",value:["ghi","\xEE\xEF"]},{label:"jkl",value:["jkl"]},{label:"mno",value:["mno","\xF4\u0153"]},{label:"pqrs",value:["pqrs"]},{label:"tuv",value:["tuv","\xF9\xFB\xFC"]},{label:"wxyz",value:["wxyz","\xFF"]},{label:"0~9",value:["01234","56789"]},{label:".,!?",value:["\u2423.,!?"]}]],Yl=[[{label:"abc",value:["abc","\xE4"]},{label:"def",value:["def"]},{label:"ghi",value:["ghi"]},{label:"jkl",value:["jkl"]},{label:"mno",value:["mno","\xF6"]},{label:"pqrs",value:["pqrs"]},{label:"tuv",value:["tuv","\xFC"]},{label:"wxyz",value:["wxyz"]},{label:"0~9",value:["01234","56789"]},{label:".,!?",value:["\u2423.,!?"]}]],Xl=[[{label:"abc",value:["abc","\xE5\xE4"]},{label:"def",value:["def"]},{label:"ghi",value:["ghi"]},{label:"jkl",value:["jkl"]},{label:"mno",value:["mno","\xF6"]},{label:"pqrs",value:["pqrs"]},{label:"tuv",value:["tuv","\xFC"]},{label:"wxyz",value:["wxyz"]},{label:"0~9",value:["01234","56789"]},{label:".,!?",value:["\u2423.,!?"]}]],He=class extends _{constructor(t){super();this.keygrid=t}static{this.styles=x`
    :host {
      position: relative;
    }

    ul {
      display: flex;
      gap: 0.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      flex: 1;
      max-width: 9rem;
    }
  `}firstUpdated(){this.addEventListener("keypad-open",t=>{let i=t.composedPath()[0];this.keypads?.forEach(o=>{o.open=o===i})})}render(){return this.keygrid.map(t=>p`
        <ul>
          ${t.map(i=>p`
              <li>
                <pv-expand-keypad
                  .label=${i.label}
                  .value=${i.value}
                  ?expandAtOrigin=${this.state?.expandAtOrigin||!1}
                ></pv-expand-keypad>
              </li>
            `)}
        </ul>
      `)}};g([d({type:Object})],He.prototype,"state",2),g([Ce("pv-expand-keypad")],He.prototype,"keypads",2);var ui=class extends He{constructor(){super(jl)}};ui=g([w("pv-alphanumeric-single-row-keyboard")],ui);var fi=class extends He{constructor(){super(Gl)}};fi=g([w("pv-hiragana-single-row-keyboard")],fi);var mi=class extends He{constructor(){super(Kl)}};mi=g([w("pv-french-single-row-keyboard")],mi);var vi=class extends He{constructor(){super(Yl)}};vi=g([w("pv-german-single-row-keyboard")],vi);var gi=class extends He{constructor(){super(Xl)}};gi=g([w("pv-swedish-single-row-keyboard")],gi);var Zl=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["z","x","c","v","b","n","m","?","!"],[","," ","."]],Qt=class extends _{render(){return p`<div class="container">
      ${Zl.map((e,t)=>p`<div class="row ${t%2===0?"even":"odd"}">
            ${e.map(i=>p`<button
                  @click=${()=>{this.dispatchEvent(new CustomEvent("character-select",{detail:i,bubbles:!0,composed:!0}))}}
                >
                  ${i}
                </button>`)}
          </div>`)}
    </div>`}};Qt.styles=x`
    .container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    button {
      background: var(--color-surface, white);
      border-radius: 0.5vh;
      border: solid 3px #8ab4f8;
      color: var(--color-on-surface);
      cursor: pointer;
      flex: 1;
      font-family: 'Roboto Mono', 'Noto Sans JP', monospace;
      font-size: min(4vh, 1.5rem);
      min-width: 2em;
      padding: 0.5rem 1rem;
      text-align: center;
    }

    .row {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
    }

    .row.odd button {
      background: var(--color-secondary);
    }

    .row button:focus,
    .row button:hover {
      background: var(--color-primary, yellow);
    }
  `,Qt=g([w("pv-qwerty-keyboard")],Qt);var Bo=String.fromCodePoint(61440),bi=new Map([["\u3042","\u3041"],["\u3044","\u3043"],["\u3046","\u3045"],["\u3048","\u3047"],["\u304A","\u3049"],["\u3064","\u3063"],["\u3084","\u3083"],["\u3086","\u3085"],["\u3088","\u3087"],["\u308F","\u308E"],["\u304B","\u3095"],["\u3051","\u3096"]]),Ho=new Map(Array.from(bi,r=>[r[1],r[0]])),Bs=[["\u3042","\u3044","\u3046","\u3048","\u304A"],["\u304B","\u304D","\u304F","\u3051","\u3053"],["\u3055","\u3057","\u3059","\u305B","\u305D"],["\u305F","\u3061","\u3064","\u3066","\u3068"],["\u306A","\u306B","\u306C","\u306D","\u306E"],["\u306F","\u3072","\u3075","\u3078","\u307B"],["\u307E","\u307F","\u3080","\u3081","\u3082"],["\u3084","\u3086","\u3088","",{label:"\u5C0F",value:Bo}],["\u3089","\u308A","\u308B","\u308C","\u308D"],["\u308F","\u3092","\u3093","\u3001","\u3002"],["\u309B","\u309C","\u30FC","\uFF1F","\uFF01"]],er=class extends _{render(){return p`<div class="container">
      ${Bs.map((e,t)=>e.map((i,o)=>i?p`<button
                class="${t%2===0?"even":"odd"}"
                style="grid-column: ${t+1}; grid-row: ${o+1}"
                @click=${()=>{this.dispatchEvent(new CustomEvent("character-select",{detail:typeof i=="string"?i:i.value,bubbles:!0,composed:!0}))}}
              >
                ${typeof i=="string"?i:i.label}
              </button>`:p`<span></span>`))}
    </div>`}};er.styles=x`
    .container {
      direction: rtl;
      display: grid;
      gap: 0.5rem;
      grid-template-columns: repeat(${Bs.length}, 1fr);
      grid-template-rows: repeat(5, 1fr);
    }

    button {
      align-items: center;
      background: var(--color-surface, white);
      border-radius: 0.5vh;
      border: solid 3px #8ab4f8;
      color: var(--color-on-surface);
      cursor: pointer;
      direction: ltr;
      display: flex;
      font-family: 'Roboto Mono', 'Noto Sans JP', monospace;
      font-size: max(3vh, 1rem);
      justify-content: center;
      padding: 0 0.5rem;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
    }

    button.odd {
      background: var(--color-secondary);
    }

    button:focus,
    button:hover {
      background: var(--color-primary, yellow);
    }
  `,er=g([w("pv-fifty-key-keyboard")],er);var At=class{constructor(){this.code="";this.promptName="";this.keyboards=[];this.initialPhrases=[];this.emotions=[];this.aiConfigs={classic:{model:"gemini-2.0-flash-001",sentence:"SentenceGeneric20250311",word:"WordGeneric20240628"},fast:{model:"gemini-2.0-flash-lite-001",sentence:"SentenceGeneric20250311",word:"WordGeneric20240628"},smart:{model:"gemini-2.0-flash-001",sentence:"SentenceGeneric20250311",word:"WordGeneric20240628"},gemini_2_5_flash:{model:"gemini-2.5-flash",sentence:"SentenceGeneric20250311",word:"WordGeneric20240628"}}}segment(e){return e.split(" ")}join(e){return e.join(" ").replace(/ ([.,!?]+( |$))/g,"$1")+" "}appendWord(e,t){return t.startsWith("-")?e+t.slice(1)+" ":e+" "+t+" "}},yi=class extends At{constructor(){super(...arguments);this.code="en-US";this.promptName="English";this.emotions=[{emoji:"\u{1F4AC}",prompt:"Statement"},{emoji:"\u2753",prompt:"Question"},{emoji:"\u{1F64F}",prompt:"Request"},{emoji:"\u{1F6AB}",prompt:"Negative"}];this.initialPhrases=["I","You","They","What","Why","When","Where","How","Who","Can","Could you","Would you","Do you"]}},Uo=class extends yi{constructor(){super(...arguments);this.keyboards=[X`pv-alphanumeric-single-row-keyboard`]}render(){return p`${z("English (single-row keyboard)")}`}},Vo=class extends yi{constructor(){super(...arguments);this.keyboards=[X`pv-qwerty-keyboard`]}render(){return p`${z("English (QWERTY keyboard)")}`}},xi=class{constructor(){this.code="ja-JP";this.promptName="Japanese";this.keyboards=[];this.initialPhrases=["\u306F\u3044","\u3044\u3044\u3048","\u3042\u308A\u304C\u3068\u3046","\u3059\u307F\u307E\u305B\u3093","\u304A\u9858\u3044\u3057\u307E\u3059","\u79C1","\u3042\u306A\u305F","\u5F7C","\u5F7C\u5973","\u4ECA\u65E5","\u6628\u65E5","\u660E\u65E5"];this.emotions=[{emoji:"\u{1F4AC}",prompt:"\u5E73\u53D9",label:"\u666E\u901A"},{emoji:"\u2753",prompt:"\u7591\u554F",label:"\u8CEA\u554F"},{emoji:"\u{1F64F}",prompt:"\u4F9D\u983C",label:"\u304A\u9858\u3044"},{emoji:"\u{1F6AB}",prompt:"\u5426\u5B9A",label:"\u5426\u5B9A"}];this.aiConfigs={classic:{model:"gemini-2.5-flash",sentence:"SentenceJapanese20240628",word:"WordGeneric20240628"},fast:{model:"gemini-2.5-flash-lite",sentence:"SentenceJapanese20240628",word:"WordGeneric20240628"},smart:{model:"gemini-2.5-flash",sentence:"SentenceJapaneseLong20250603",word:"WordJapanese20250623"},gemini_2_5_flash:{model:"gemini-2.5-flash",sentence:"SentenceJapaneseLong20250603",word:"WordGeneric20240628"}};this.tinySegmenter=window.TinySegmenter?new window.TinySegmenter:null}segment(e){if(!this.tinySegmenter)return[e];let t=this.tinySegmenter?.segment(e);if(t.length===0)return t;let i=t[0],o=[i];for(let a of t.slice(1)){let s=i.charCodeAt(i.length-1),l=a.charCodeAt(0);s>=55296&&s<=56319&&l>=56320&&l<=57343?(o[o.length-1]+=a,i=o[o.length-1]):(o.push(a),i=a)}return o}join(e){return e.join("")}appendWord(e,t){return t.startsWith("-")?e+t.slice(1):e+t}},Wo=class extends xi{constructor(){super(...arguments);this.keyboards=[X`pv-hiragana-single-row-keyboard`,X`pv-alphanumeric-single-row-keyboard`]}render(){return p`${z("Japanese (single-row keyboard)")}`}},qo=class extends xi{constructor(){super(...arguments);this.keyboards=[X`pv-fifty-key-keyboard`,X`pv-qwerty-keyboard`]}render(){return p`${z("Japanese (Goj\u016Bon keyboard)")}`}},jo=class extends At{constructor(){super(...arguments);this.code="fr-FR";this.promptName="French";this.initialPhrases=["Je","Tu","Ils","Que","Pourquoi","Quand","O\xF9","Quelle","Qui","Peux-tu","Pourrais-tu","Ferais-tu","Fais-tu"]}},Go=class extends jo{constructor(){super(...arguments);this.keyboards=[X`pv-french-single-row-keyboard`]}render(){return p`${z("French (experimental)")}`}},Ko=class extends At{constructor(){super(...arguments);this.code="de-DE";this.promptName="German";this.initialPhrases=["Ich","Du","Sie","Was","Warum","Wann","Wo","Wie","Wer","Kannst","K\xF6nntest du","W\xFCrdest du","Tust du"]}},Yo=class extends Ko{constructor(){super(...arguments);this.keyboards=[X`pv-german-single-row-keyboard`]}render(){return p`${z("German (experimental)")}`}},Xo=class extends At{constructor(){super(...arguments);this.code="sv-SE";this.promptName="Swedish";this.initialPhrases=["Jag","Du","De","Vad","Varf\xF6r","N\xE4r","Var","Hur","Vem","Burk","Kan","Skulle du","G\xF6r du"]}},Zo=class extends Xo{constructor(){super(...arguments);this.keyboards=[X`pv-swedish-single-row-keyboard`]}render(){return p`${z("Swedish (experimental)")}`}},Jo=class{constructor(){this.code="zh-CN";this.promptName="Mandarin";this.keyboards=[];this.separetor="";this.initialPhrases=["\u4F60","\u6211","\u4ED6","\u5979","\u5B83","\u597D","\u4ECA\u5929","\u6628\u5929","\u660E\u5929"];this.aiConfigs={classic:{model:"gemini-2.5-flash",sentence:"SentenceMandarin20250616",word:"WordMandarin20250616"},fast:{model:"gemini-2.5-flash-lite",sentence:"SentenceMandarin20250616",word:"WordMandarin20250616"},smart:{model:"gemini-2.5-flash",sentence:"SentenceMandarin20250616",word:"WordMandarin20250616"},gemini_2_5_flash:{model:"gemini-2.5-flash",sentence:"SentenceMandarin20250616",word:"WordMandarin20250616"}}}segment(e){return Array.from(e)}join(e){return e.join("")}appendWord(e,t){return e=e.replace(/[a-z]+$/,""),t.startsWith("-")?e+t.slice(1):e+t}},Qo=class extends Jo{constructor(){super(...arguments);this.keyboards=[X`pv-alphanumeric-single-row-keyboard`]}render(){return p`${z("Mandarin (single-row keyboard)")}`}},Ue={englishWithSingleRowKeyboard:new Uo,englishWithQWERYKeyboard:new Vo,japaneseWithSingleRowKeyboard:new Wo,japaneseWithFullkeyboard:new qo,frenchExperimental:new Go,germanExperimental:new Yo,mandarinWithSingleRowKeyboard:new Qo,swedishExperimental:new Zo};var Jl={okClick:"ok-click"},Qe=class extends Ne(_){constructor(){super(...arguments);this.activeSettingsTabIndex=0}show(){this.settingsDialog?.show()}fireEvent(t){this.dispatchEvent(new CustomEvent(t,{detail:{callee:this},bubbles:!0,composed:!0}))}render(){let t=p`
      <div class="form-section">
        <label>
          ${z("Persona")}
          <p>
            <md-filled-text-field
              class="pv-persona-text-field"
              type="textarea"
              rows="5"
              @input=${s=>{this.state.persona=s.target.value}}
              value="${this.state.persona}"
            >
            </md-filled-text-field>
          </p>
        </label>
      </div>
      <div class="form-section">
        <label>
          ${z("Initial phrases")}
          <p>
            <md-filled-text-field
              class="pv-initial-phrase-text-field"
              type="textarea"
              rows="3"
              value="${this.state.initialPhrases.join(`
`)}"
              @input=${s=>{this.state.initialPhrases=s.target.value.split(`
`).filter(l=>l)}}
            >
            </md-filled-text-field>
          </p>
        </label>
      </div>
    `,i=p`
      <div class="form-section">
        <md-outlined-select
          label="${z("AI")}"
          @change=${s=>{let l=s.composedPath()[0];this.state.aiConfig=l.value}}
        >
          <md-select-option
            ?selected="${this.state.aiConfig==="fast"}"
            value="fast"
          >
            <div slot="headline">${z("Fast")}</div>
          </md-select-option>
          <md-select-option
            ?selected="${this.state.aiConfig==="smart"}"
            value="smart"
          >
            <div slot="headline">${z("Smart")}</div>
          </md-select-option>
          <md-select-option
            ?selected="${this.state.aiConfig==="classic"}"
            value="classic"
          >
            <div slot="headline">${z("Classic")}</div>
          </md-select-option>
          <md-select-option
            ?selected="${this.state.aiConfig==="gemini_2_5_flash"}"
            value="gemini_2_5_flash"
          >
            <div slot="headline">Gemini 2.5 Flash</div>
          </md-select-option>
        </md-outlined-select>
      </div>
      <div class="form-section">
        <label>
          ${z("Always expand at origin")}
          <md-switch
            ?selected=${this.state.expandAtOrigin}
            @change=${()=>{this.state.expandAtOrigin=!this.state.expandAtOrigin}}
          ></md-switch>
        </label>
      </div>
      <div class="form-section">
        <label>
          ${z("Use smaller sentence margin")}
          <md-switch
            ?selected=${this.state.sentenceSmallMargin}
            @change=${()=>{this.state.sentenceSmallMargin=!this.state.sentenceSmallMargin}}
          ></md-switch>
        </label>
      </div>
      <div class="form-section">
        <label>
          ${z("Enable earcons")}
          <md-switch
            ?selected=${this.state.enableEarcons}
            @change=${()=>{this.state.enableEarcons=!this.state.enableEarcons}}
          ></md-switch>
        </label>
      </div>
      ${this.state.features.featureEnableSpeechInput?p`
            <div class="form-section">
              <label>
                ${z("Enable conversation mode")}
                <md-switch
                  ?selected=${this.state.enableConversationMode}
                  @change=${()=>{this.state.enableConversationMode=!this.state.enableConversationMode}}
                ></md-switch>
              </label>
            </div>
          `:""}
      <div class="form-section">
        <div>
          <label>${z("Language")}</label>
        </div>
        <div class="language-select">
          <div>
            ${Object.entries(Ue).map(([s,l])=>p`<div class="language-option">
                  <div class="language-option-label">
                    <label>${l.render()}</label>
                  </div>
                  <div class="language-option-checkbox">
                    <md-checkbox
                      ?checked="${this.state.checkedLanguages.includes(s)}"
                      ?disabled="${this.state.checkedLanguages.length===1&&this.state.checkedLanguages.includes(s)}"
                      @change=${()=>{this.state.checkedLanguages.includes(s)?this.state.checkedLanguages=this.state.checkedLanguages.filter(c=>c!==s):this.state.checkedLanguages=[...this.state.checkedLanguages,s]}}
                    ></md-checkbox>
                  </div>
                </div>`)}
          </div>
        </div>
      </div>
    `,o=p`
      <div class="form-section">
        <md-outlined-select
          label="${z("TTS Voice")}"
          @change=${s=>{let l=s.target;this.state.voiceName=l.value}}
        >
          <md-select-option
            value="Default"
            ?selected="${this.state.voiceName===""}"
          >
            <div slot="headline">Default</div>
          </md-select-option>
          ${window.speechSynthesis.getVoices().filter(s=>s.lang.startsWith(this.state.lang.code)).map(s=>p`<md-select-option
                  value="${s.name}"
                  ?selected="${this.state.voiceName===s.name}"
                >
                  <div slot="headline">${s.name}</div>
                </md-select-option>`)}

        </md-outlined-select>
      </div>
      <div class="form-section">
        <label>
          ${z("Speaking rate")}
          <md-slider
            class="voice-config-slider"
            min="-10"
            max="10"
            value="${this.state.voiceSpeakingRate}"
            @change=${s=>{this.state.voiceSpeakingRate=Number(s.target.value)}}
          >
          </md-slider>
        </label>
      </div>
      <div class="form-section">
        <label>
          ${z("Pitch")}
          <md-slider
            class="voice-config-slider"
            min="-10"
            max="10"
            value="${this.state.voicePitch}"
            @change=${s=>{this.state.voicePitch=Number(s.target.value)}}
          >
          </md-slider>
        </label>
      </div>
    `,a=[i,t,o];return p`
      <md-dialog>
        <form slot="content" id="form-id" method="dialog">
          <md-tabs
            @change="${s=>{s.target instanceof Kt&&(this.activeSettingsTabIndex=s.target.activeTabIndex)}}"
          >
            <md-primary-tab ?active="${this.activeSettingsTabIndex===0}">
              ${z("General")}
            </md-primary-tab>
            <md-primary-tab ?active="${this.activeSettingsTabIndex===1}">
              ${z("Profile")}
            </md-primary-tab>
            <md-primary-tab ?active="${this.activeSettingsTabIndex===2}">
              ${z("VOICE")}
            </md-primary-tab>

          </md-tabs>
          ${a[this.activeSettingsTabIndex]}
        </form>
        <div slot="actions">
          <md-text-button
            form="form-id"
            @click="${()=>{this.settingsDialog?.close(),this.fireEvent(Jl.okClick)}}"
            >OK</md-text-button
          >
        </div>
      </md-dialog>
    `}};Qe.styles=x`
    :host {
      background: var(--color-background);
      display: flex;

      --md-icon-button-icon-size: 3rem;
      --md-icon-button-state-layer-width: 4rem;
      --md-icon-button-state-layer-height: 4rem;

      --mdc-typography-body2-font-size: 3rem;
      --mdc-typography-body2-line-height: 3.5rem;
    }

    /* Optimized only for iPad. May need to improve. */
    #form-id {
      height: 440px;
      width: 500px;
    }

    .voice-config-slider {
      display: inline-block;
      width: 350px;
    }

    .form-section {
      margin: 1rem 0;
    }

    .language-select {
      border: 1px solid var(--md-sys-color-outline, #79747e);
      border-radius: var(--md-sys-shape-corner-extra-small, 4px);
      display: inline-flex;
      height: 5rem;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    .language-option {
      border-color: black;
      display: flex;
      margin: 0.75rem 8px;
    }

    .language-option-label {
      flex: 1;
    }

    .language-option-checkbox {
      flex: 0;
      margin: 0 0 0 0.75rem;
    }

    .pv-persona-text-field,
    .pv-initial-phrase-text-field {
      width: 100%;
    }
  `,g([d({type:Object})],Qe.prototype,"state",2),g([d({type:Number,reflect:!0})],Qe.prototype,"activeSettingsTabIndex",2),g([k("md-dialog")],Qe.prototype,"settingsDialog",2),Qe=g([je(),w("pv-setting-panel")],Qe);var ea=null,ta=null,et=new(window.AudioContext||window.webkitAudioContext);fetch("static/click2.wav").then(r=>r.arrayBuffer()).then(r=>et.decodeAudioData(r)).then(r=>{ea=r}).catch(r=>{console.warn("Error loading click audio file:",r)});fetch("static/chime.wav").then(r=>r.arrayBuffer()).then(r=>et.decodeAudioData(r)).then(r=>{ta=r}).catch(r=>{console.warn("Error loading chime audio file:",r)});var Tt=class{static playClick(){return new Promise((e,t)=>{if(!ea)return t("Click audio buffer is not loaded yet.");let i=et.createBufferSource();i.buffer=ea,i.connect(et.destination),i.onended=()=>{i.disconnect(),e()},i.start(et.currentTime)})}static playChime(){return new Promise((e,t)=>{if(!ta)return t("Chime audio buffer is not loaded yet.");let i=et.createBufferSource();i.buffer=ta,i.connect(et.destination),i.onended=()=>{i.disconnect(),e()},i.start(et.currentTime)})}};var tt={backspaceClick:"backspace-click",contentCopyClick:"content-copy-click",deleteClick:"delete-click",firstUpdated:"first-updated",keyboardChangeClick:"keyboard-change-click",languageChangeClick:"language-change-click",settingClick:"setting-click",undoClick:"undo-click",outputSpeechClick:"output-speech-click"},rt=class extends Ne(_){constructor(){super(...arguments);this.isTtsReading=!1;this.lastOutputSpeechInternal="";this.lastInputSpeechInternal=""}get lastOutputSpeech(){return this.lastOutputSpeechInternal}get lastInputSpeech(){return this.lastInputSpeechInternal}fireEvent(t,i){this.dispatchEvent(new CustomEvent(t,{detail:i?{callee:this,...i}:{callee:this},bubbles:!0,composed:!0}))}onMicrophoneClick(){this.state.isMicrophoneOn=!this.state.isMicrophoneOn}render(){let t=this.state.text==="",i=this.state.lang.keyboards.length>1,o=this.state.checkedLanguages.length>1;return p`
      <div class="functions">
        <div class="functions-bar">
          <button
            @click="${()=>{this.fireEvent(tt.undoClick)}}"
          >
            <md-icon>undo</md-icon>
            <span>${z("Undo")}</span>
          </button>
          <button
            @click="${()=>{this.fireEvent(tt.backspaceClick)}}"
            ?disabled=${t}
          >
            <md-icon>backspace</md-icon>
            <span>${z("Backspace")}</span>
          </button>
          <button
            @click="${()=>{this.fireEvent(tt.deleteClick)}}"
            ?disabled=${t}
          >
            <md-icon>delete</md-icon>
            <span>${z("Clear")}</span>
          </button>
          <hr />
          ${o?p`
                <button
                  @click="${()=>{this.fireEvent(tt.languageChangeClick)}}"
                >
                  <md-icon>language</md-icon>
                  <span>${z("Language")}</span>
                </button>
              `:""}
          ${i?p`
                <button
                  @click="${()=>{this.fireEvent(tt.keyboardChangeClick)}}"
                >
                  <md-icon>language_japanese_kana</md-icon>
                  <span>${z("Keyboard")}</span>
                </button>
              `:""}
          <hr />
          <button
            @click="${()=>{this.fireEvent(tt.contentCopyClick)}}"
            ?disabled=${t}
          >
            <md-icon>content_copy</md-icon>
            <span>${z("Copy")}</span>
          </button>

          <button
            @click="${this.onTtsButtonClick}"
            ?disabled=${this.isTtsReading||t}
          >
            <md-icon>text_to_speech</md-icon>
            <span>${z("Read aloud")}</span>
          </button>
          ${this.state.enableConversationMode?p`
                <button @click="${this.onMicrophoneClick}">
                  <md-icon
                    >${this.state.isMicrophoneOn?"mic":"mic_off"}</md-icon
                  >
                  <span>${this.state.isMicrophoneOn?"Mute":"Unmute"}</span>
                </button>
              `:""}

          <hr />
          <button
            @click="${()=>{this.fireEvent(tt.settingClick)}}"
          >
            <md-icon>settings</md-icon>
            <span>${z("Settings")}</span>
          </button>
        </div>
      </div>
    `}async onTtsButtonClick(){window.speechSynthesis.cancel(),this.state.lastOutputSpeech=this.state.text,this.state.enableEarcons?Tt.playChime().then(()=>{this.startTts()}):this.startTts()}startTts(){let t=new SpeechSynthesisUtterance(this.state.text);t.lang=this.state.lang.code,t.rate=Math.pow(2,this.state.voiceSpeakingRate/10),t.pitch=(this.state.voicePitch+20)/20;let i=window.speechSynthesis,o=i.getVoices().find(a=>a.name===this.state.voiceName);o&&(t.voice=o),t.addEventListener("end",()=>{this.onTtsEnd()}),i.speak(t),this.isTtsReading=!0,this.fireEvent(tt.outputSpeechClick,{lastOutputSpeech:this.lastOutputSpeech,lastInputSpeech:this.lastInputSpeech})}onTtsEnd(){this.isTtsReading=!1}};rt.styles=x`
    :host {
      display: flex;
      --md-icon-size: 1.5rem;
    }

    .functions {
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .functions-bar {
      background: var(--color-secondary);
      border-radius: 10rem;
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
    }

    .functions-bar md-icon {
      font-weight: 300;
    }

    .functions-bar button {
      align-items: center;
      background: none;
      border: none;
      color: var(--color-on-secondary);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      font-family: inherit;
      margin: 0.25rem 0;
      padding: 0;
    }

    .functions-bar button md-icon img {
      height: 2rem;
      width: 2rem;
    }

    .functions-bar button span {
      display: none;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .functions-bar button:hover md-icon {
      background: rgba(0, 0, 0, 0.1);
    }

    .functions-bar button[disabled] {
      cursor: default;
      opacity: 0.4;
    }

    .functions-bar button[disabled]:hover md-icon {
      background: inherit;
    }

    /* Optimized only for iPad. May need to improve. */
    #form-id {
      height: 380px;
      width: 500px;
    }

    .form-section {
      margin: 1rem 0;
    }

    .pv-persona-text-field,
    .pv-initial-phrase-text-field {
      width: 100%;
    }

    hr {
      border: 0;
      margin: 0;
    }

    md-icon {
      border-radius: 100px;
      padding: 0.25rem;
    }

    @media screen and (min-height: 33rem) {
      :host {
        --md-icon-size: 2rem;
      }

      md-icon {
        padding: 0.5rem;
      }
    }

    @media screen and (min-height: 45rem) {
      .functions-bar {
        padding: 1rem 0.25rem;
      }

      .functions-bar button span {
        display: inline;
      }

      md-icon {
        padding: 0.125rem 0.5rem;
      }

      hr {
        margin: 0.5rem 0;
      }
    }
  `,g([d({type:Object})],rt.prototype,"state",2),g([d({type:Boolean,reflect:!0})],rt.prototype,"isTtsReading",2),g([d({type:String,reflect:!0})],rt.prototype,"lastInputSpeechInternal",2),rt=g([je(),w("pv-functions-bar")],rt);var pt=class extends _{constructor(){super(...arguments);this.labelText="";this.visible=!1;this.displayTimeout=0}show(){this.displayTimeout>0&&window.clearTimeout(this.displayTimeout),this.visible=!0,this.displayTimeout=window.setTimeout(()=>{this.visible=!1,this.displayTimeout=0,this.dispatchEvent(new Event("closed"))},5e3)}render(){return this.labelText}};pt.styles=x`
    :host {
      background: rgba(32, 33, 36, 0.8);
      border-radius: 0.5rem;
      bottom: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      color: #fff;
      font-size: 2rem;
      left: 50%;
      opacity: 0;
      padding: 0.5rem 1rem;
      position: fixed;
      transform: translateX(-50%) translateY(100%);
      transition: all 0.3s ease;
      z-index: 100;
    }

    :host([visible]) {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `,g([d({type:String})],pt.prototype,"labelText",2),g([d({type:Boolean,reflect:!0})],pt.prototype,"visible",2),pt=g([w("pv-snackbar")],pt);var tr=class{constructor(e,t){this.source=e;this.value=t}},ra=class extends CustomEvent{};function Ql(r,e){let t=[];for(let i=0;i<r.length&&r[i]===e[0];i++)t.push(e.shift());return t}function Hs(r){let e=[];for(let t of r){let i=t.match(/^(.*[^.,!?])([.,!?]+)$/);i?(e.push(i[1]),e.push(i[2])):e.push(t)}return e}var Ve=class extends _{constructor(){super(...arguments);this.suggestion=new tr("LLM","");this.offset="";this.mouseoverIndex=-1}render(){let t=Hs(this.state.lang.segment(this.suggestion.value)),i=Ql(t,Hs(this.state.lang.segment(this.offset)));return p`${i.length>0?p`<span class="ellipsis">… </span>`:""}
    ${t.map((o,a)=>a<i.length?"":p` <pv-button
            ?active="${a<=this.mouseoverIndex}"
            .label="${o}"
            @mouseenter="${()=>{this.mouseoverIndex=a}}"
            @mouseleave="${()=>{this.mouseoverIndex=-1}}"
            @click="${()=>{this.dispatchEvent(new ra("select",{detail:[this.state.lang.join(t.slice(0,a+1)),a-i.length,this.suggestion.source]}))}}"
          ></pv-button>`)}`}};Ve.styles=x`
    :host {
      -ms-overflow-style: none;
      display: block;
      overflow-x: scroll;
      scrollbar-width: none;
      white-space: nowrap;
    }

    :host::-webkit-scrollbar {
      display: none;
    }

    pv-button {
      margin-right: 0.5rem;
    }

    .ellipsis {
      font-family: 'Roboto Mono', monospace;
      font-size: 5vh;
    }
  `,g([d({type:Object})],Ve.prototype,"state",2),g([d({type:Object,reflect:!0})],Ve.prototype,"suggestion",2),g([d({type:String,reflect:!0})],Ve.prototype,"offset",2),g([d({type:Number})],Ve.prototype,"mouseoverIndex",2),Ve=g([w("pv-suggestion-stripe")],Ve);var Se=class extends _{constructor(){super(...arguments);this.value="";this.minRows=2;this.maxRows=4;this.placeholder=""}updateLayout(){if(!(this.hiddenTextArea instanceof HTMLTextAreaElement&&this.textArea instanceof HTMLTextAreaElement))return;let t=.8,i=this.getBoundingClientRect();this.hiddenTextArea.style.lineHeight=`${Math.round(i.height/this.minRows)}px`,this.hiddenTextArea.style.fontSize=`${Math.round(i.height/this.minRows*t)}px`;let o=this.hiddenTextArea.scrollHeight,a=Math.min(this.maxRows,Math.max(this.minRows,Math.floor(o/(i.height/this.minRows))));this.textArea.style.lineHeight=`${Math.round(i.height/a)}px`,this.textArea.style.fontSize=`${Math.round(i.height/a*t)}px`,this.textArea.value=this.value}firstUpdated(){window.addEventListener("resize",()=>{this.updateLayout()}),this.updateLayout()}updated(){this.hiddenTextArea instanceof HTMLTextAreaElement&&(this.hiddenTextArea.value=this.value,this.updateLayout(),this.dispatchEvent(new Event("updated")))}render(){return p`
      <textarea class="hidden"></textarea>
      <textarea
        class="main"
        placeholder="${this.placeholder}"
        @input="${t=>{t.isComposing||(this.value=t.composedPath()[0].value)}}"
        @compositionend="${t=>{this.value=t.composedPath()[0].value}}"
      ></textarea>
    `}};Se.styles=x`
    :host {
      display: block;
      position: relative;
    }

    textarea {
      background: var(--color-surface);
      border-radius: 0.5rem;
      border: solid 1px var(--color-outline);
      box-sizing: border-box;
      color: var(--color-on-surface);
      font-family: Roboto, 'Noto Sans JP', sans-serif;
      height: 100%;
      width: 100%;
    }

    textarea.hidden {
      opacity: 0;
      pointer-events: none;
      position: absolute;
    }
  `,g([d({type:String})],Se.prototype,"value",2),g([d({type:Number})],Se.prototype,"minRows",2),g([d({type:Number})],Se.prototype,"maxRows",2),g([d({type:String,reflect:!0})],Se.prototype,"placeholder",2),g([k("textarea.hidden")],Se.prototype,"hiddenTextArea",2),g([k("textarea.main")],Se.prototype,"textArea",2),Se=g([w("pv-scalable-textarea")],Se);var it={BUTTON_BACKSPACE:{kind:"BUTTON_BACKSPACE"},BUTTON_DELETE:{kind:"BUTTON_DELETE"},CHARACTER:{kind:"CHARACTER"},KEYBOARD:{kind:"KEYBOARD"},SNACK_BAR:{kind:"SNACK_BAR"},SUGGESTED_WORD:{kind:"SUGGESTED_WORD"}},It=class{constructor(e,t){this.value=e;this.sources=t}},_i=class r{constructor(){this.history=[new It("",[])];this.currentIndex=0}static{this.SIZE=250}add(e){this.history=this.history.slice(this.currentIndex),this.history.unshift(e),this.currentIndex=0,this.history=this.history.slice(0,r.SIZE)}canUndo(){return this.currentIndex<this.history.length-1}undo(){this.canUndo()&&this.currentIndex++}lastInput(){return this.history[this.currentIndex]}isLastInputSuggested(){let e=this.lastInput();return e?e.sources.some(t=>t.kind==="SUGGESTED_WORD"||t.kind==="SUGGESTED_SENTENCE"):!1}};var ec={textUpdate:"text-update"},ut=class extends _{constructor(){super(...arguments);this.inputHistory=new _i}get value(){return this.textArea?.value||""}isBlank(){return this.textArea&&this.textArea.value===""}canUndo(){return this.inputHistory.canUndo()}isLastInputSuggested(){return this.inputHistory.isLastInputSuggested()}setPlaceholder(t){this.textArea.placeholder=t}setTextFieldValue(t,i){this.textArea&&(this.addToInputHistory(t,i),this.textArea.value=t,this.textArea.placeholder="")}addToInputHistory(t,i){let o=new It(t,i);this.inputHistory.add(o)}textUndo(){if(!this.textArea||!this.inputHistory)return;this.inputHistory.undo();let t=this.inputHistory.lastInput();this.textArea.value=t.value,this.textArea.placeholder=""}textDelete(){this.setTextFieldValue("",[it.BUTTON_DELETE])}textBackspace(){if(!this.textArea)return;let t=this.value,i=t.length;this.setTextFieldValue(t.substring(0,i-1),[it.BUTTON_BACKSPACE])}contentCopy(){this.textArea&&navigator.clipboard.writeText(this.value)}render(){return p`
      <pv-scalable-textarea @updated="${i=>{let o=i.target.value;this.state.text=o;let s=this.inputHistory.lastInput()?.value||"";if(o!==s){let l=new It(o,[it.KEYBOARD]);this.inputHistory.add(l)}this.fireEvent(this.inputHistory.lastInput().sources)}}">
      </pv-scalable-textarea>
    `}fireEvent(t){this.dispatchEvent(new CustomEvent(ec.textUpdate,{detail:{callee:this,sources:t},bubbles:!0,composed:!0}))}};ut.styles=x`
    pv-scalable-textarea {
      box-sizing: border-box;
      height: 20svh;
    }
  `,g([d({type:Object})],ut.prototype,"state",2),g([k("pv-scalable-textarea")],ut.prototype,"textArea",2),ut=g([w("pv-textarea-wrapper"),je()],ut);var ft=class extends _{constructor(){super(...arguments);this.selected="";this.sentenceTypes=[]}render(){return p`<ul>
      ${this.sentenceTypes.map(t=>p`<li>
          <button
            @click=${()=>{this.selected=t.prompt===this.selected?"":t.prompt,this.dispatchEvent(new Event("select"))}}
            class="${t.prompt===this.selected?"selected":""}"
          >
            <div class="emoji">${t.emoji}</div>
            <div class="label">
              ${t.label??t.prompt}
            </div>
          </button>
        </li>`)}
    </ul>`}};ft.styles=x`
    ul {
      background: var(--color-surface);
      border-radius: 2rem;
      display: inline-flex;
      gap: 1rem;
      list-style: none;
      margin: 0;
      padding: 0;
      padding: 1rem;
    }

    li {
      text-align: center;
    }

    button {
      border-radius: 1rem;
      border: solid 3px transparent;
      color: #202124;
      cursor: pointer;
      font-family: var(--font-family-base);
      padding: 0.5rem 1rem;
      width: 8rem;
    }

    button:hover,
    button.selected {
      background: var(--color-primary);
    }

    button.selected {
      border-color: black;
    }

    button .emoji {
      font-size: 3rem;
      line-height: 1;
    }

    button .label {
      font-weight: 500;
    }
  `,g([d({type:String})],ft.prototype,"selected",2),g([d({type:Array})],ft.prototype,"sentenceTypes",2),ft=g([w("pv-sentence-type-selector")],ft);var Ks=on(Us());var Ot=class{constructor(e,t){this.domainHead=e,this.defaultValues=t}read(e){let t=`${this.domainHead}.${e}`,i=localStorage.getItem(t);if(i===null)return this.defaultValues[e];try{let{value:o}=JSON.parse(i);return o}catch{return this.defaultValues[e]}}write(e,t){let i=`${this.domainHead}.${e}`,o=JSON.stringify({value:t});localStorage.setItem(i,o)}};var Vs="en",Ws=["ja"];var ia={};tn(ia,{templates:()=>tc});var tc={s09085b07b5a0de5f:"AI\u8A2D\u5B9A",s12be3981db8aad36:"\u65E5\u672C\u8A9E (\u4E94\u5341\u97F3\u30AD\u30FC\u30DC\u30FC\u30C9)",s1369ddcc1b221411:"\u58F0\u306E\u9AD8\u3055",s19e84b851836664f:"\u9AD8\u901F",s2ca367238c69d1e7:"\u82F1\u8A9E (QWERTY\u30AD\u30FC\u30DC\u30FC\u30C9)",s3687049d1af562c4:"\u30B3\u30D4\u30FC",s3ceed4d952789f32:"\u8CE2\u3044",s41b4752c216d0b66:"\u4F1A\u8A71",s54f4fb35b3a04e2a:"\u82F1\u8A9E (\u4E00\u884C\u30AD\u30FC\u30DC\u30FC\u30C9)",s59e3e7ab292d7c11:"\u6587\u306E\u884C\u9593\u3092\u8A70\u3081\u308B",s5bc98d6c14b1d2c6:"\u8AAD\u307F\u4E0A\u3052\u308B",s5c9bb69e2a31ad59:"VOICE",s612301cee43af417:"\u52B9\u679C\u97F3\u3092\u518D\u751F",s6e237556e679b5b8:"\u30C6\u30AD\u30B9\u30C8\u8AAD\u307F\u4E0A\u3052\u97F3\u58F0",s868a566fb9603774:"\u30AD\u30FC\u30DC\u30FC\u30C9",s8f4be9f086eb530f:"\u3082\u3068\u306B\u623B\u3059",s91b073374c468b93:"\u5229\u7528\u8005\u306E\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB",s98aa8b9481114f33:"\u65E7\u30D0\u30FC\u30B8\u30E7\u30F3",s9c2aff542563e783:"\u65E5\u672C\u8A9E (\u4E00\u884C\u30AD\u30FC\u30DC\u30FC\u30C9)",s9d8b8aa2b404c2c8:"\u8A2D\u5B9A",sb061ff5a347a296e:"\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB",sb46606bea7e65177:"\u8AAD\u3080\u901F\u3055",sb4f1dffbb6be6302:"\u3059\u3079\u3066\u524A\u9664",sb6bc71df20a5484d:"\u30AD\u30FC\u3092\u5DE6\u7AEF\u304B\u3089\u5C55\u958B\u3059\u308B",sba8b78a7337ff2f4:"\u4F1A\u8A71\u30E2\u30FC\u30C9",sc3ac225273c8316b:"\u4E00\u822C",sd64445ead33533cc:"\u4E00\u6587\u5B57\u6D88\u3059",se127d1b851b56845:"\u521D\u671F\u30D5\u30EC\u30FC\u30BA",sefcf950b3cc4fc3b:"\u8A00\u8A9E\u5207\u66FF\u3048",sbd72ef798f281712:"French (experimental)",s408eb983f697801c:"German (experimental)",s5f836100f0c5709f:"Swedish (experimental)",s579d06c51e72b5a8:"Mandarin (single-row keyboard)"};var qs=x`
  :host {
    display: flex;
  }

  .container {
    box-sizing: border-box;
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    width: 100%;
  }

  .main {
    column-gap: 0.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .main textarea {
    width: 100%;
  }

  .keypad {
    flex: 1;
    min-height: 50vh;
  }

  .loader {
    align-items: center;
    background: color-mix(
      in srgb,
      var(--color-background) 80%,
      transparent 20%
    );
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: 0.3s ease;
    width: 100%;
  }

  .loader.loading {
    opacity: 1;
  }

  /* Optimized only for iPad. May need to improve. */
  #form-id {
    height: 380px;
    width: 500px;
  }

  .form-section {
    margin: 1rem 0;
  }

  .suggestions {
    position: relative;
  }

  ul.word-suggestions,
  ul.sentence-suggestions {
    list-style: none;
    margin: 0.25rem 0;
    padding: 0;
  }

  ul.word-suggestions li {
    display: inline-block;
  }

  ul.word-suggestions li,
  ul.sentence-suggestions li {
    margin: 0.25rem 0.25rem 0.25rem 0;
  }

  @media screen and (min-height: 30rem) {
    ul.word-suggestions li {
      margin: 0.5rem 0.5rem 0.5rem 0;
    }

    ul.sentence-suggestions li {
      margin: 1rem 0.5rem 2rem 0;
    }

    ul.sentence-suggestions li.tight {
      margin: 0.5rem 0.5rem 0.5rem 0;
    }
  }

  @media screen and (min-height: 45rem) {
    ul.word-suggestions li {
      margin: 1rem 1rem 1rem 0;
    }
  }

  .stats {
    background-color: rgba(1, 1, 1, 0);
    border: solid rgba(96, 96, 96, 0.5);
    bottom: 4px;
    color: rgba(96, 96, 96, 0.5);
    cursor: pointer;
    padding: 4px;
    position: absolute;
    right: 4px;
  }

  @media (prefers-color-scheme: dark) {
    .stats {
      background-color: rgba(1, 1, 1, 0);
      border: solid rgba(255, 255, 255, 0.5);
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .language-name {
    background: var(--color-on-background);
    border-radius: 1rem;
    color: var(--color-background);
    display: none;
    font-size: 2rem;
    left: 50%;
    padding: 1rem;
    pointer-events: none;
    position: fixed;
    opacity: 0.8;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .language-name[active] {
    display: block;
  }

  .conversation-history-container {
    background: var(--color-surface);
    border-radius: 0.5rem;
    max-width: 30vw;
    overflow: scroll;
    padding: 0.5rem;
    width: 360px;
  }

  pv-sentence-type-selector {
    margin-bottom: 1rem;
  }
`;var wi=class{constructor(e=null){this.langSignal=Ee(Ue.japaneseWithSingleRowKeyboard);this.checkedLanguagesSignal=Ee([]);this.keyboardSignal=Ee(X`pv-alphanumeric-single-row-keyboard`);this.emotionSignal=Ee("");this.textSignal=Ee("");this.aiConfigInternal="smart";this.expandAtOriginSignal=Ee(!1);this.sentenceSmallMarginSignal=Ee(!1);this.personaInternal="";this.initialPhrasesSignal=Ee([]);this.enableEarconsInternal=!1;this.enableConversationModeSignal=Ee(!1);this.isMicrophoneOnSignal=Ee(!1);this.lastInputSpeech="";this.lastOutputSpeech="";this.messageHistoryInternal=[];this.features={languages:[],sentenceMacroId:null,wordMacroId:null,featureEnableSpeechInput:!1,featureEnableSentenceEmotion:!1};this.storage=e??new Ot("com.google.pv",xr),this.loadState(),this.updateInitialPhrasesForCurrentLanguage()}get lang(){return this.langSignal.get()}set lang(e){this.langSignal.set(e)}get checkedLanguages(){return this.checkedLanguagesSignal.get()}set checkedLanguages(e){this.storage.write("checkedLanguages",e),this.checkedLanguagesSignal.set(e)}get keyboard(){return this.keyboardSignal.get()}set keyboard(e){this.keyboardSignal.set(e)}get emotion(){return this.emotionSignal.get()}set emotion(e){this.emotionSignal.set(e)}get text(){return this.textSignal.get()}set text(e){this.textSignal.set(e)}get aiConfig(){return this.aiConfigInternal}set aiConfig(e){this.storage.write("aiConfig",e),this.aiConfigInternal=e}get model(){return this.lang.aiConfigs[this.aiConfig]?.model}get sentenceMacroId(){return this.lang.aiConfigs[this.aiConfig]?.sentence}get wordMacroId(){return this.lang.aiConfigs[this.aiConfig]?.word}get expandAtOrigin(){return this.expandAtOriginSignal.get()}set expandAtOrigin(e){this.storage.write("expandAtOrigin",e),this.expandAtOriginSignal.set(e)}get sentenceSmallMargin(){return this.sentenceSmallMarginSignal.get()}set sentenceSmallMargin(e){this.storage.write("sentenceSmallMargin",e),this.sentenceSmallMarginSignal.set(e)}get persona(){return this.personaInternal}set persona(e){this.storage.write("persona",e),this.personaInternal=e}get initialPhrases(){return this.initialPhrasesSignal.get()}set initialPhrases(e){let t=this.getCurrentLanguageKey();if(t){let i=this.storage.read("initialPhrasesPerLanguage");i[t]=e,this.storage.write("initialPhrasesPerLanguage",i)}this.initialPhrasesSignal.set(e)}getInitialPhrasesForLanguage(e){return this.storage.read("initialPhrasesPerLanguage")[e]||[]}setInitialPhrasesForLanguage(e,t){let i=this.storage.read("initialPhrasesPerLanguage");i[e]=t,this.storage.write("initialPhrasesPerLanguage",i),this.getCurrentLanguageKey()===e&&this.initialPhrasesSignal.set(t)}getCurrentLanguageKey(){for(let[e,t]of Object.entries(Ue))if(t===this.lang)return e;return null}updateInitialPhrasesForCurrentLanguage(){let e=this.getCurrentLanguageKey();if(e){let t=this.getInitialPhrasesForLanguage(e);t.length>0?this.initialPhrasesSignal.set(t):(this.initialPhrasesSignal.set(this.lang.initialPhrases),this.setInitialPhrasesForLanguage(e,this.lang.initialPhrases))}}get voiceSpeakingRate(){return this.voiceSpeakingRateInternal}set voiceSpeakingRate(e){this.voiceSpeakingRateInternal=e,this.storage.write("voiceSpeakingRate",e)}get voicePitch(){return this.voicePitchInternal}set voicePitch(e){this.voicePitchInternal=e,this.storage.write("voicePitch",e)}get voiceName(){return this.voiceNameInternal}set voiceName(e){this.voiceNameInternal=e,this.storage.write("ttsVoice",e)}get enableEarcons(){return this.enableEarconsInternal}set enableEarcons(e){this.storage.write("enableEarcons",e),this.enableEarconsInternal=e}get enableConversationMode(){return this.enableConversationModeSignal.get()}set enableConversationMode(e){this.storage.write("enableConversationMode",e),this.enableConversationModeSignal.set(e)}get isMicrophoneOn(){return this.isMicrophoneOnSignal.get()}set isMicrophoneOn(e){this.isMicrophoneOnSignal.set(e)}get messageHistory(){return this.messageHistoryInternal}set messageHistory(e){this.messageHistoryInternal=e,this.storage.write("messageHistoryWithPrefix",e)}loadState(){this.aiConfigInternal=this.storage.read("aiConfig"),this.checkedLanguages=this.storage.read("checkedLanguages"),this.enableConversationMode=this.storage.read("enableConversationMode"),this.enableEarconsInternal=this.storage.read("enableEarcons"),this.expandAtOrigin=this.storage.read("expandAtOrigin");let e=this.storage.read("initialPhrases"),t=this.storage.read("initialPhrasesPerLanguage");if(e&&e.length>0&&(!t||Object.keys(t).length===0)){let i=this.checkedLanguages[0],o={...t,[i]:e};this.storage.write("initialPhrasesPerLanguage",o)}this.messageHistoryInternal=this.storage.read("messageHistoryWithPrefix"),this.personaInternal=this.storage.read("persona"),this.sentenceSmallMargin=this.storage.read("sentenceSmallMargin"),this.voiceNameInternal=this.storage.read("ttsVoice"),this.voicePitchInternal=this.storage.read("voicePitch"),this.voiceSpeakingRateInternal=this.storage.read("voiceSpeakingRate")}setStorage(e){this.storage.domainHead!==e.domainHead&&(this.storage=e,this.loadState())}};var Ei={SENTENCE_MACRO_ID:"sentenceMacroId",WORD_MACRO_ID:"wordMacroId"},rc=0,ic=10,oc=1024,ac=3,sc=10,nc=30,lc=10,{setLocale:cc}=Ga({sourceLocale:Vs,targetLocales:Ws,loadLocale:async r=>new Promise(e=>{switch(r){case"ja":e(ia);break;default:e({})}})});function dc(r){if(r.length===0)return"";let e=r.map(i=>i.length),t=Math.min(...e);for(let i=0;i<t;i++)if(new Set(r.map(o=>o[i])).size!==1)return r[0].slice(0,i);return r[e.indexOf(t)]}function rr(r,e){let t=r.replaceAll("\u309B","\u3099").replaceAll("\u309C","\u309A").normalize("NFKC").replaceAll("\u3099","\u309B").replaceAll("\u309A","\u309C").replace(/^\s+/,"").replace(/\s\s+/," ");return e&&(t=t.replace(/ ([,.?!])$/,"$1")),t}function Ys(r){let e=/([。？！]|[.?!] ) */,t=[],i=0;for(;i<r.length;){let o=e.exec(r.substring(i));if(!o){t.push(r.substring(i));break}let a=i+o.index+o[0].length;t.push(r.substring(i,a)),i=a}return t}function js(r){let e=Ys(r);return e.length===0?["",""]:[e.slice(0,e.length-1).join(""),e[e.length-1].trimEnd()]}function hc(r){let e=Ys(r);if(e.length===0)return["",""];let t=e.map(o=>o.length),i=0;for(let o=t.length-1;o>=0;o--)if(i+=t[o],i>=nc)return[e.slice(0,o).join(""),e.slice(o).join("")];return["",r]}function Gs(r){let e=r.match(/^[A-Za-z あ-んー]*/u);return e?e[0]:""}function pc(r,e){let t=new Ks.diff_match_patch,i=t.diff_main(r,e);if(t.diff_cleanupSemantic(i),i.length>lc||i.every(a=>a[0]!==0))return e;let o="";for(let a=0;a<i.length;a++){let[s,l]=i[a];o.length<r.length-sc?(s===0||s===-1)&&(o+=l,a<i.length-1&&s===-1&&i[a+1][0]===1&&a++):(s===0||s===1)&&(o+=l)}return o===r?e:o}function xe(){return function(r,e,t){let i=t.value;return t.value=function(...o){return this.state.enableEarcons&&Tt.playClick(),i.apply(this,o)},t}}var B=class extends Ne(_){constructor(t=null,i=null){super();this.isSpeechRecognitionActive=!1;this.suggestions=[];this.words=[];this.isLoading=!1;this.locale="ja";this.sentenceMacroId=null;this.languageLabels="japaneseWithSingleRowKeyboard,englishWithSingleRowKeyboard";this.languageIndex=0;this.keyboardIndex=0;this.conversationHistory=[];this.emotions=[];this.featureStorageDomain="com.google.pv";this.featureEnableSpeechInput=!1;this.featureEnableSentenceEmotion=!1;this.inFlightRequests=0;this.prevCallsMs=[];this.stateInternal=t??new wi,this.apiClient=i??new _r}get state(){return this.stateInternal}connectedCallback(){super.connectedCallback(),this.stateInternal.setStorage(new Ot(this.featureStorageDomain,xr)),cc(this.locale?this.locale:"ja"),this.stateInternal.features={languages:this.languageLabels.split(","),sentenceMacroId:this.sentenceMacroId,wordMacroId:null,featureEnableSpeechInput:this.featureEnableSpeechInput,featureEnableSentenceEmotion:this.featureEnableSentenceEmotion},this.stateInternal.checkedLanguages.length===0&&(this.stateInternal.checkedLanguages=this.stateInternal.features.languages),this.stateInternal.lang=Ue[this.stateInternal.checkedLanguages[0]],this.stateInternal.keyboard=this.stateInternal.lang.keyboards[this.keyboardIndex];let t=new URLSearchParams(window.location.search);t.has(Ei.SENTENCE_MACRO_ID)&&(this.stateInternal.features.sentenceMacroId=t.get(Ei.SENTENCE_MACRO_ID)),t.has(Ei.WORD_MACRO_ID)&&(this.stateInternal.features.wordMacroId=t.get(Ei.WORD_MACRO_ID)),this.stateInternal.updateInitialPhrasesForCurrentLanguage(),this.emotions=this.stateInternal.lang.emotions}updated(t){super.updated?.(t),this.state.enableConversationMode&&this.state.features.featureEnableSpeechInput&&this.state.isMicrophoneOn?this.startSpeechRecognition():this.stopSpeechRecognition()}disconnectedCallback(){super.disconnectedCallback(),this.stopSpeechRecognition()}startSpeechRecognition(){if(this.isSpeechRecognitionActive)return;let t=window.SpeechRecognition||window.webkitSpeechRecognition;t&&(this.speechRecognition=new t,this.speechRecognition&&(this.speechRecognition.lang=this.state.lang.code,this.speechRecognition.continuous=!0,this.speechRecognition.interimResults=!1,this.speechRecognition.onresult=i=>{let o=i.results[i.results.length-1];if(o&&o.isFinal&&o[0]){let a=o[0].transcript.trim();a&&(this.conversationHistory=[...this.conversationHistory,[Date.now(),`PartnerInput: ${a}`]],this.state.lastInputSpeech=a,this.snackbar?.labelText!==void 0&&(this.snackbar.labelText=a,this.snackbar.show()))}},this.speechRecognition.onerror=()=>{this.stopSpeechRecognition(),this.state.enableConversationMode&&this.state.features.featureEnableSpeechInput&&this.state.isMicrophoneOn&&setTimeout(()=>this.startSpeechRecognition(),1e3)},this.speechRecognition.onend=()=>{this.isSpeechRecognitionActive=!1,this.state.enableConversationMode&&this.state.features.featureEnableSpeechInput&&this.state.isMicrophoneOn&&this.startSpeechRecognition()},this.speechRecognition.start(),this.isSpeechRecognitionActive=!0))}stopSpeechRecognition(){this.speechRecognition&&(this.speechRecognition.onresult=null,this.speechRecognition.onerror=null,this.speechRecognition.onend=null,this.speechRecognition.stop(),this.speechRecognition=void 0),this.isSpeechRecognitionActive=!1}isBlank(){return this.textField&&this.textField.value===""}updateConversationHistory(){let t=`UserOutput: ${this.state.lastOutputSpeech}`;this.conversationHistory=[...this.conversationHistory,[Date.now(),t]]}updateMessageHistory(t){let[,i]=js(this.state.text);if(t.length===0||i.length<=rc)return;let o=Date.now(),a=[...this.state.messageHistory];if(a.length===0){a.push([i,Gs(i),o]),this.state.messageHistory=a;return}let[s,l]=a[a.length-1],c=Gs(i),h="";t[0].kind==="SENTENCE_HISTORY"||t[0].kind==="SUGGESTED_SENTENCE"||t[0].kind==="SUGGESTED_WORD"||s.startsWith(i)||i.startsWith(s)&&s.length-i.length<ic?(a.pop(),h=c.length>l.length?c:l):h=c,a.forEach(([u,f])=>{u===i&&f.startsWith(h)&&(h=f)}),a=a.filter(([u])=>u!==i),a.push([i,h,o]),a.slice(-oc),this.state.messageHistory=a}searchSuggestionsFromMessageHistory(){let[t,i]=js(this.state.text);if(!i)return null;let o=this.state.messageHistory.filter(([a,s])=>a.length>=ac&&a!==i&&(s.startsWith(i)||a.startsWith(i)));return o.length===0?null:t+o[o.length-1][0]}updateSentences(t){this.stateInternal.sentenceSmallMargin||(t=t.slice(0,Sa)),this.suggestions=t.map(i=>(i.value=rr(i.value),i))}updateWords(t){this.words=t.map(i=>rr(i))}delayBeforeFetchMs(){return Math.min(150*(this.prevCallsMs.length-1),300)}async updateSuggestions(){window.clearTimeout(this.timeoutId);let t=Date.now();if(this.prevCallsMs.push(t),this.prevCallsMs=this.prevCallsMs.filter(i=>i>t-1e3),this.isBlank()){this.apiClient.abortFetch(),this.isLoading=!1,this.suggestions=[],this.words=[];return}this.timeoutId=window.setTimeout(async()=>{this.inFlightRequests++,this.isLoading=!0;let[i,o]=hc(this.stateInternal.text),a=await this.apiClient.fetchSuggestions(o,this.stateInternal.lang.promptName,this.stateInternal.model,{sentenceMacroId:this.state.features.sentenceMacroId??this.stateInternal.sentenceMacroId,wordMacroId:this.state.features.wordMacroId??this.stateInternal.wordMacroId,persona:this.stateInternal.persona,lastInputSpeech:this.state.lastInputSpeech,lastOutputSpeech:this.state.lastOutputSpeech,conversationHistory:this.conversationHistory.map(([,h])=>h).join(`
`),sentenceEmotion:this.state.emotion});if(this.inFlightRequests--,this.inFlightRequests===0&&(this.isLoading=!1),!a)return;let[s,l]=a,c=s.map(h=>new tr("LLM",i+pc(o,h)));this.updateSentences(c),this.updateWords(l),this.requestUpdate()},this.delayBeforeFetchMs())}static composeUpdatedSentence(t,i){if(i===Bo){let o=t.slice(-1)[0];return[...bi.keys()].includes(o)?t.slice(0,-1)+bi.get(o):[...Ho.keys()].includes(o)?t.slice(0,-1)+Ho.get(o):t}return t+i}onCharacterSelect(t){if(!this.textField)return;let i=rr(B.composeUpdatedSentence(this.textField.value,t.detail),this.textField.isLastInputSuggested());this.textField.setTextFieldValue(i,[it.CHARACTER])}onSuggestionSelect(t){let[i,o,a]=t.detail,s=a==="HISTORY"?"SENTENCE_HISTORY":"SUGGESTED_SENTENCE";this.textField?.setTextFieldValue(i,[{kind:s,index:o}])}onSuggestedWordClick(t){let i=this.textField?.value??"",o=this.stateInternal.lang.appendWord(i,t),a=rr(o);this.textField?.setTextFieldValue(a,[it.SUGGESTED_WORD])}onSentenceTypeSelected(t){this.state.emotion=t.composedPath()[0].selected,this.updateSuggestions()}onSettingClick(){this.settingPanel.show()}onUndoClick(){this.textField?.textUndo()}onBackspaceClick(){this.textField?.textBackspace()}onDeleteClick(){this.textField?.textDelete(),this.sentenceEmotionButtons&&this.sentenceEmotionButtons.forEach(t=>{t.removeAttribute("active")})}switchLanguage(){this.state.lang=Ue[this.state.checkedLanguages[this.languageIndex]],this.keyboardIndex=0,this.state.keyboard=this.state.lang.keyboards[this.keyboardIndex],this.emotions=this.stateInternal.lang.emotions,this.state.emotion="",this.sentenceTypeSelector&&(this.sentenceTypeSelector.selected=""),this.state.updateInitialPhrasesForCurrentLanguage(),this.updateSuggestions(),this.languageName&&(this.languageName.setAttribute("active","true"),setTimeout(()=>{this.languageName?.removeAttribute("active")},750))}onLanguageChangeClick(){this.languageIndex=(this.languageIndex+1)%this.state.checkedLanguages.length,this.switchLanguage()}onKeyboardChangeClick(){this.keyboardIndex=(this.keyboardIndex+1)%this.state.lang.keyboards.length,this.state.keyboard=this.state.lang.keyboards[this.keyboardIndex],this.updateSuggestions()}onContentCopyClick(){this.textField?.contentCopy()}onKeypadHandlerClick(){}onSnackbarClose(){this.textField&&this.textField.addToInputHistory(this.textField.value,[it.SNACK_BAR])}onOkClick(){this.state.checkedLanguages.findIndex(i=>Ue[i]===this.state.lang)===-1&&(this.languageIndex=0,this.switchLanguage())}render(){let i=(this.isBlank()?this.stateInternal.initialPhrases:this.words).map(a=>a?p`
            <li>
              <pv-button
                label="${a}"
                rounded
                @click="${()=>this.onSuggestedWordClick(a)}"
              ></pv-button>
            </li>
          `:""),o=this.suggestions.map(a=>{if(!this.textField?.value)return"";let s=rr(this.textField.value),l=dc([a.value,s]);return p` <li
        class="${this.stateInternal.sentenceSmallMargin?"tight":""}"
      >
        <pv-suggestion-stripe
          .state=${this.stateInternal}
          .offset="${l}"
          .suggestion="${a}"
          @select="${this.onSuggestionSelect}"
        ></pv-suggestion-stripe>
      </li>`});return p`
      <div class="container">
        <pv-functions-bar
          .state=${this.stateInternal}
          @undo-click=${this.onUndoClick}
          @backspace-click=${this.onBackspaceClick}
          @delete-click=${this.onDeleteClick}
          @language-change-click=${this.onLanguageChangeClick}
          @keyboard-change-click=${this.onKeyboardChangeClick}
          @content-copy-click=${this.onContentCopyClick}
          @setting-click=${this.onSettingClick}
          @snackbar-close=${this.onSnackbarClose}
          @output-speech-click=${this.updateConversationHistory}

        ></pv-functions-bar>
        <div class="main">
          ${this.state.features.featureEnableSentenceEmotion?p`
                <pv-sentence-type-selector
                  .sentenceTypes=${this.emotions}
                  @select=${this.onSentenceTypeSelected}
                ></pv-sentence-type-selector>
              `:""}
          <div class="keypad">
            <pv-character-input
              .state=${this.stateInternal}
              @character-select=${this.onCharacterSelect}
              @keypad-handler-click=${this.onKeypadHandlerClick}
            ></pv-character-input>
            <div class="suggestions">
              <ul class="word-suggestions">
                ${i}
              </ul>
              <ul class="sentence-suggestions">
                ${o}
              </ul>
              <div class="loader ${this.isLoading?"loading":""}">
                <md-circular-progress indeterminate></md-circular-progress>
              </div>
            </div>
          </div>
          <div>
            <pv-textarea-wrapper
              .state=${this.stateInternal}
              @text-update=${a=>{this.updateSuggestions(),this.updateMessageHistory(a.detail.sources)}}
            ></pv-textarea-wrapper>
          </div>
          <div class="language-name">${this.stateInternal.lang.render()}</div>

        </div>
        ${this.state.features.featureEnableSpeechInput&&this.state.enableConversationMode?p`<div class="conversation-history-container">
              <pv-conversation-history
                .history=${this.conversationHistory}
              ></pv-conversation-history>
            </div>`:""}
      </div>

      <pv-snackbar @closed=${this.onSnackbarClose}></pv-snackbar>
      <pv-setting-panel
        .state=${this.stateInternal}
        @ok-click=${this.onOkClick}
      ></pv-setting-panel>
    `}};B.styles=qs,g([d({type:Array})],B.prototype,"suggestions",2),g([d({type:Array})],B.prototype,"words",2),g([d()],B.prototype,"isLoading",2),g([k("pv-textarea-wrapper")],B.prototype,"textField",2),g([k("pv-functions-bar")],B.prototype,"functionsBar",2),g([k("pv-setting-panel")],B.prototype,"settingPanel",2),g([d({type:String,attribute:"feature-locale"})],B.prototype,"locale",2),g([d({type:String,attribute:"feature-sentence-macro-id"})],B.prototype,"sentenceMacroId",2),g([d({type:String,attribute:"feature-languages"})],B.prototype,"languageLabels",2),g([k(".language-name")],B.prototype,"languageName",2),g([d({type:Array})],B.prototype,"conversationHistory",2),g([d({type:Array})],B.prototype,"emotions",2),g([d({type:String,attribute:"feature-storage-domain"})],B.prototype,"featureStorageDomain",2),g([d({type:Boolean,attribute:"feature-enable-speech-input"})],B.prototype,"featureEnableSpeechInput",2),g([d({type:Boolean,attribute:"feature-enable-sentence-emotion"})],B.prototype,"featureEnableSentenceEmotion",2),g([k("pv-sentence-type-selector")],B.prototype,"sentenceTypeSelector",2),g([Ce("[emotion]")],B.prototype,"sentenceEmotionButtons",2),g([k("pv-snackbar")],B.prototype,"snackbar",2),g([xe()],B.prototype,"onCharacterSelect",1),g([xe()],B.prototype,"onSuggestionSelect",1),g([xe()],B.prototype,"onSuggestedWordClick",1),g([xe()],B.prototype,"onSentenceTypeSelected",1),g([xe()],B.prototype,"onSettingClick",1),g([xe()],B.prototype,"onUndoClick",1),g([xe()],B.prototype,"onBackspaceClick",1),g([xe()],B.prototype,"onDeleteClick",1),g([xe()],B.prototype,"onLanguageChangeClick",1),g([xe()],B.prototype,"onKeyboardChangeClick",1),g([xe()],B.prototype,"onContentCopyClick",1),g([xe()],B.prototype,"onKeypadHandlerClick",1),B=g([w("pv-app"),je()],B);})();
/*! Bundled license information:

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/internal/aria/aria.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/aria/delegate.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/progress/internal/progress.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/progress/internal/circular-progress.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/progress/internal/circular-progress-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/progress/circular-progress.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

signal-polyfill/dist/index.js:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)
  (**
   * @license
   * Copyright 2024 Bloomberg Finance L.P.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@lit-labs/signals/lib/signal-watcher.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/signals/lib/watch.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/signals/lib/html-tag.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/signals/index.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/locale-status-event.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/str-tag.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/types.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/default-msg.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/localized-controller.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/localized-decorator.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/deferred.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/fnv1a64.js:
  (**
   * @license
   * Copyright 2014 Travis Webb
   * SPDX-License-Identifier: MIT
   *)

@lit/localize/internal/id-generation.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/internal/runtime-msg.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/init/runtime.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/init/transform.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/localize/lit-localize.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/icon/internal/icon.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/icon/internal/icon-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/icon/icon.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/controller/attachable-controller.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/internal/focus-ring.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/internal/focus-ring-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/md-focus-ring.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/motion/animation.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/internal/ripple.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/internal/ripple-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/ripple.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/element-internals.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/controller/form-submitter.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/controller/is-rtl.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/iconbutton/internal/icon-button.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/iconbutton/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/iconbutton/internal/standard-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/iconbutton/icon-button.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/events/form-label-activation.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/events/redispatch-event.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/constraint-validation.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/form-associated.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/checkbox-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/checkbox/internal/checkbox.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/checkbox/internal/checkbox-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/checkbox/checkbox.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menuitem/menu-item-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/internal/item.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/internal/item-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/item/item.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/shared.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/menuItemController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/selectoption/selectOptionController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/selectoption/select-option.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/select-option.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/elevation/internal/elevation.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/elevation/internal/elevation-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/elevation/elevation.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/button.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/filled-button.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/filled-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/shared-elevation-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/filled-button.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/text-button.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/internal/text-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/button/text-button.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/events/dispatch-hooks.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/switch/internal/switch.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/switch/internal/switch-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/switch/switch.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/focusable.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/internal/tab.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/internal/primary-tab.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/internal/primary-tab-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/internal/tab-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/primary-tab.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/divider/internal/divider.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/divider/internal/divider-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/divider/divider.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/internal/tabs.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/internal/tabs-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/tabs/tabs.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/filled-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/filled-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/filled-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/internal/filled-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/internal/controller/string-converter.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/on-report-validity.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/text-field-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/internal/text-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/internal/filled-text-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/textfield/filled-text-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/outlined-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/internal/outlined-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/field/outlined-field.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/internal/list-navigation-helpers.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/list/internal/list-controller.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/surfacePositionController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/controllers/typeaheadController.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menu.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/internal/menu-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/menu/menu.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/labs/behaviors/validators/select-validator.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/shared.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/select.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/outlined-select.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/outlined-select-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/internal/shared-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/select/outlined-select.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/dialog/internal/animations.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/dialog/internal/dialog.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/dialog/internal/dialog-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/dialog/dialog.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/slider/internal/forced-colors-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/directives/when.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/slider/internal/slider.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/slider/internal/slider-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/slider/slider.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
