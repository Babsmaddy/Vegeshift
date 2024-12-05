// sweetalert2@11.7.1 downloaded from https://ga.jspm.io/npm:sweetalert2@11.7.1/dist/sweetalert2.all.js

var t="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var e={};(function(t,o){e=o()})(0,(function(){var e={awaitingPromise:new WeakMap,promise:new WeakMap,innerParams:new WeakMap,domCache:new WeakMap};const o="swal2-";
/**
   * @param {string[]} items
   * @returns {object}
   */const prefix=t=>{const e={};for(const s in t)e[t[s]]=o+t[s];return e};const s=prefix(["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","default-outline","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error"]);const n=prefix(["success","warning","info","question","error"]);const a="SweetAlert2:";
/**
   * Filter the unique values into a new array
   *
   * @param {Array} arr
   * @returns {Array}
   */const uniqueArray=t=>{const e=[];for(let o=0;o<t.length;o++)-1===e.indexOf(t[o])&&e.push(t[o]);return e};
/**
   * Capitalize the first letter of a string
   *
   * @param {string} str
   * @returns {string}
   */const capitalizeFirstLetter=t=>t.charAt(0).toUpperCase()+t.slice(1)
/**
   * Standardize console warnings
   *
   * @param {string | Array} message
   */;const warn=t=>{console.warn(`${a} ${"object"===typeof t?t.join(" "):t}`)};
/**
   * Standardize console errors
   *
   * @param {string} message
   */const error=t=>{console.error(`${a} ${t}`)};
/**
   * Private global state for `warnOnce`
   *
   * @type {Array}
   * @private
   */const i=[];
/**
   * Show a console warning, but only if it hasn't already been shown
   *
   * @param {string} message
   */const warnOnce=t=>{if(!i.includes(t)){i.push(t);warn(t)}};
/**
   * Show a one-time console warning about deprecated params/methods
   *
   * @param {string} deprecatedParam
   * @param {string} useInstead
   */const warnAboutDeprecation=(t,e)=>{warnOnce(`"${t}" is deprecated and will be removed in the next major release. Please use "${e}" instead.`)};
/**
   * If `arg` is a function, call it (with no arguments or context) and return the result.
   * Otherwise, just pass the value through
   *
   * @param {Function | any} arg
   * @returns {any}
   */const callIfFunction=t=>"function"===typeof t?t():t
/**
   * @param {any} arg
   * @returns {boolean}
   */;const hasToPromiseFn=t=>t&&"function"===typeof t.toPromise
/**
   * @param {any} arg
   * @returns {Promise}
   */;const asPromise=t=>hasToPromiseFn(t)?t.toPromise():Promise.resolve(t)
/**
   * @param {any} arg
   * @returns {boolean}
   */;const isPromise=t=>t&&Promise.resolve(t)===t
/**
   * Gets the popup container which contains the backdrop and the popup itself.
   *
   * @returns {HTMLElement | null}
   */;const getContainer=()=>document.body.querySelector(`.${s.container}`)
/**
   * @param {string} selectorString
   * @returns {HTMLElement | null}
   */;const elementBySelector=t=>{const e=getContainer();return e?e.querySelector(t):null};
/**
   * @param {string} className
   * @returns {HTMLElement | null}
   */const elementByClass=t=>elementBySelector(`.${t}`);
/**
   * @returns {HTMLElement | null}
   */const getPopup=()=>elementByClass(s.popup)
/**
   * @returns {HTMLElement | null}
   */;const getIcon=()=>elementByClass(s.icon)
/**
   * @returns {HTMLElement | null}
   */;const getIconContent=()=>elementByClass(s["icon-content"])
/**
   * @returns {HTMLElement | null}
   */;const getTitle=()=>elementByClass(s.title)
/**
   * @returns {HTMLElement | null}
   */;const getHtmlContainer=()=>elementByClass(s["html-container"])
/**
   * @returns {HTMLElement | null}
   */;const getImage=()=>elementByClass(s.image)
/**
   * @returns {HTMLElement | null}
   */;const getProgressSteps=()=>elementByClass(s["progress-steps"])
/**
   * @returns {HTMLElement | null}
   */;const getValidationMessage=()=>elementByClass(s["validation-message"])
/**
   * @returns {HTMLButtonElement | null}
   */;const getConfirmButton=()=>/** @type {HTMLButtonElement} */elementBySelector(`.${s.actions} .${s.confirm}`)
/**
   * @returns {HTMLButtonElement | null}
   */;const getCancelButton=()=>/** @type {HTMLButtonElement} */elementBySelector(`.${s.actions} .${s.cancel}`)
/**
   * @returns {HTMLButtonElement | null}
   */;const getDenyButton=()=>/** @type {HTMLButtonElement} */elementBySelector(`.${s.actions} .${s.deny}`)
/**
   * @returns {HTMLElement | null}
   */;const getInputLabel=()=>elementByClass(s["input-label"])
/**
   * @returns {HTMLElement | null}
   */;const getLoader=()=>elementBySelector(`.${s.loader}`)
/**
   * @returns {HTMLElement | null}
   */;const getActions=()=>elementByClass(s.actions)
/**
   * @returns {HTMLElement | null}
   */;const getFooter=()=>elementByClass(s.footer)
/**
   * @returns {HTMLElement | null}
   */;const getTimerProgressBar=()=>elementByClass(s["timer-progress-bar"])
/**
   * @returns {HTMLElement | null}
   */;const getCloseButton=()=>elementByClass(s.close);const r='\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n';
/**
   * @returns {HTMLElement[]}
   */const getFocusableElements=()=>{const t=Array.from(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(((t,e)=>{const o=parseInt(t.getAttribute("tabindex"));const s=parseInt(e.getAttribute("tabindex"));return o>s?1:o<s?-1:0}));const e=Array.from(getPopup().querySelectorAll(r)).filter((t=>"-1"!==t.getAttribute("tabindex")));return uniqueArray(t.concat(e)).filter((t=>isVisible$1(t)))};
/**
   * @returns {boolean}
   */const isModal=()=>hasClass(document.body,s.shown)&&!hasClass(document.body,s["toast-shown"])&&!hasClass(document.body,s["no-backdrop"]);
/**
   * @returns {boolean}
   */const isToast=()=>getPopup()&&hasClass(getPopup(),s.toast);
/**
   * @returns {boolean}
   */const isLoading=()=>getPopup().hasAttribute("data-loading");const l={previousBodyPadding:null};
/**
   * Securely set innerHTML of an element
   * https://github.com/sweetalert2/sweetalert2/issues/1926
   *
   * @param {HTMLElement} elem
   * @param {string} html
   */const setInnerHtml=(t,e)=>{t.textContent="";if(e){const o=new DOMParser;const s=o.parseFromString(e,"text/html");Array.from(s.querySelector("head").childNodes).forEach((e=>{t.appendChild(e)}));Array.from(s.querySelector("body").childNodes).forEach((e=>{e instanceof HTMLVideoElement||e instanceof HTMLAudioElement?t.appendChild(e.cloneNode(true)):t.appendChild(e)}))}};
/**
   * @param {HTMLElement} elem
   * @param {string} className
   * @returns {boolean}
   */const hasClass=(t,e)=>{if(!e)return false;const o=e.split(/\s+/);for(let e=0;e<o.length;e++)if(!t.classList.contains(o[e]))return false;return true};
/**
   * @param {HTMLElement} elem
   * @param {SweetAlertOptions} params
   */const removeCustomClasses=(t,e)=>{Array.from(t.classList).forEach((o=>{Object.values(s).includes(o)||Object.values(n).includes(o)||Object.values(e.showClass).includes(o)||t.classList.remove(o)}))};
/**
   * @param {HTMLElement} elem
   * @param {SweetAlertOptions} params
   * @param {string} className
   */const applyCustomClass=(t,e,o)=>{removeCustomClasses(t,e);if(e.customClass&&e.customClass[o]){if("string"!==typeof e.customClass[o]&&!e.customClass[o].forEach){warn(`Invalid type of customClass.${o}! Expected string or iterable object, got "${typeof e.customClass[o]}"`);return}addClass(t,e.customClass[o])}};
/**
   * @param {HTMLElement} popup
   * @param {import('./renderers/renderInput').InputClass} inputClass
   * @returns {HTMLInputElement | null}
   */const getInput$1=(t,e)=>{if(!e)return null;switch(e){case"select":case"textarea":case"file":return t.querySelector(`.${s.popup} > .${s[e]}`);case"checkbox":return t.querySelector(`.${s.popup} > .${s.checkbox} input`);case"radio":return t.querySelector(`.${s.popup} > .${s.radio} input:checked`)||t.querySelector(`.${s.popup} > .${s.radio} input:first-child`);case"range":return t.querySelector(`.${s.popup} > .${s.range} input`);default:return t.querySelector(`.${s.popup} > .${s.input}`)}};
/**
   * @param {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} input
   */const focusInput=t=>{t.focus();if("file"!==t.type){const e=t.value;t.value="";t.value=e}};
/**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[]} classList
   * @param {boolean} condition
   */const toggleClass=(t,e,o)=>{if(t&&e){"string"===typeof e&&(e=e.split(/\s+/).filter(Boolean));e.forEach((e=>{Array.isArray(t)?t.forEach((t=>{o?t.classList.add(e):t.classList.remove(e)})):o?t.classList.add(e):t.classList.remove(e)}))}};
/**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[]} classList
   */const addClass=(t,e)=>{toggleClass(t,e,true)};
/**
   * @param {HTMLElement | HTMLElement[] | null} target
   * @param {string | string[] | readonly string[]} classList
   */const removeClass=(t,e)=>{toggleClass(t,e,false)};
/**
   * Get direct child of an element by class name
   *
   * @param {HTMLElement} elem
   * @param {string} className
   * @returns {HTMLElement | undefined}
   */const getDirectChildByClass=(t,e)=>{const o=Array.from(t.children);for(let t=0;t<o.length;t++){const s=o[t];if(s instanceof HTMLElement&&hasClass(s,e))return s}};
/**
   * @param {HTMLElement} elem
   * @param {string} property
   * @param {*} value
   */const applyNumericalStyle=(t,e,o)=>{o===`${parseInt(o)}`&&(o=parseInt(o));o||0===parseInt(o)?t.style[e]="number"===typeof o?`${o}px`:o:t.style.removeProperty(e)};
/**
   * @param {HTMLElement} elem
   * @param {string} display
   */const show=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"flex";t.style.display=e};
/**
   * @param {HTMLElement} elem
   */const hide=t=>{t.style.display="none"};
/**
   * @param {HTMLElement} parent
   * @param {string} selector
   * @param {string} property
   * @param {string} value
   */const setStyle=(t,e,o,s)=>{
/** @type {HTMLElement} */
const n=t.querySelector(e);n&&(n.style[o]=s)};
/**
   * @param {HTMLElement} elem
   * @param {any} condition
   * @param {string} display
   */const toggle=function(t,e){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"flex";e?show(t,o):hide(t)};
/**
   * borrowed from jquery $(elem).is(':visible') implementation
   *
   * @param {HTMLElement} elem
   * @returns {boolean}
   */const isVisible$1=t=>!!(t&&(t.offsetWidth||t.offsetHeight||t.getClientRects().length))
/**
   * @returns {boolean}
   */;const allButtonsAreHidden=()=>!isVisible$1(getConfirmButton())&&!isVisible$1(getDenyButton())&&!isVisible$1(getCancelButton())
/**
   * @param {HTMLElement} elem
   * @returns {boolean}
   */;const isScrollable=t=>!!(t.scrollHeight>t.clientHeight)
/**
   * borrowed from https://stackoverflow.com/a/46352119
   *
   * @param {HTMLElement} elem
   * @returns {boolean}
   */;const hasCssAnimation=t=>{const e=window.getComputedStyle(t);const o=parseFloat(e.getPropertyValue("animation-duration")||"0");const s=parseFloat(e.getPropertyValue("transition-duration")||"0");return o>0||s>0};
/**
   * @param {number} timer
   * @param {boolean} reset
   */const animateTimerProgressBar=function(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const o=getTimerProgressBar();if(isVisible$1(o)){if(e){o.style.transition="none";o.style.width="100%"}setTimeout((()=>{o.style.transition=`width ${t/1e3}s linear`;o.style.width="0%"}),10)}};const stopTimerProgressBar=()=>{const t=getTimerProgressBar();const e=parseInt(window.getComputedStyle(t).width);t.style.removeProperty("transition");t.style.width="100%";const o=parseInt(window.getComputedStyle(t).width);const s=e/o*100;t.style.width=`${s}%`};const c=100;
/** @type {GlobalState} */const u={};const focusPreviousActiveElement=()=>{if(u.previousActiveElement instanceof HTMLElement){u.previousActiveElement.focus();u.previousActiveElement=null}else document.body&&document.body.focus()};
/**
   * Restore previous active (focused) element
   *
   * @param {boolean} returnFocus
   * @returns {Promise}
   */const restoreActiveElement=t=>new Promise((e=>{if(!t)return e();const o=window.scrollX;const s=window.scrollY;u.restoreFocusTimeout=setTimeout((()=>{focusPreviousActiveElement();e()}),c);window.scrollTo(o,s)}));
/**
   * Detect Node env
   *
   * @returns {boolean}
   */const isNodeEnv=()=>"undefined"===typeof window||"undefined"===typeof document;const d=`\n <div aria-labelledby="${s.title}" aria-describedby="${s["html-container"]}" class="${s.popup}" tabindex="-1">\n   <button type="button" class="${s.close}"></button>\n   <ul class="${s["progress-steps"]}"></ul>\n   <div class="${s.icon}"></div>\n   <img class="${s.image}" />\n   <h2 class="${s.title}" id="${s.title}"></h2>\n   <div class="${s["html-container"]}" id="${s["html-container"]}"></div>\n   <input class="${s.input}" />\n   <input type="file" class="${s.file}" />\n   <div class="${s.range}">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="${s.select}"></select>\n   <div class="${s.radio}"></div>\n   <label for="${s.checkbox}" class="${s.checkbox}">\n     <input type="checkbox" />\n     <span class="${s.label}"></span>\n   </label>\n   <textarea class="${s.textarea}"></textarea>\n   <div class="${s["validation-message"]}" id="${s["validation-message"]}"></div>\n   <div class="${s.actions}">\n     <div class="${s.loader}"></div>\n     <button type="button" class="${s.confirm}"></button>\n     <button type="button" class="${s.deny}"></button>\n     <button type="button" class="${s.cancel}"></button>\n   </div>\n   <div class="${s.footer}"></div>\n   <div class="${s["timer-progress-bar-container"]}">\n     <div class="${s["timer-progress-bar"]}"></div>\n   </div>\n </div>\n`.replace(/(^|\n)\s*/g,"");
/**
   * @returns {boolean}
   */const resetOldContainer=()=>{const t=getContainer();if(!t)return false;t.remove();removeClass([document.documentElement,document.body],[s["no-backdrop"],s["toast-shown"],s["has-column"]]);return true};const resetValidationMessage$1=()=>{u.currentInstance.resetValidationMessage()};const addInputChangeListeners=()=>{const t=getPopup();const e=getDirectChildByClass(t,s.input);const o=getDirectChildByClass(t,s.file);
/** @type {HTMLInputElement} */const n=t.querySelector(`.${s.range} input`);
/** @type {HTMLOutputElement} */const a=t.querySelector(`.${s.range} output`);const i=getDirectChildByClass(t,s.select);
/** @type {HTMLInputElement} */const r=t.querySelector(`.${s.checkbox} input`);const l=getDirectChildByClass(t,s.textarea);e.oninput=resetValidationMessage$1;o.onchange=resetValidationMessage$1;i.onchange=resetValidationMessage$1;r.onchange=resetValidationMessage$1;l.oninput=resetValidationMessage$1;n.oninput=()=>{resetValidationMessage$1();a.value=n.value};n.onchange=()=>{resetValidationMessage$1();a.value=n.value}};
/**
   * @param {string | HTMLElement} target
   * @returns {HTMLElement}
   */const getTarget=t=>"string"===typeof t?document.querySelector(t):t
/**
   * @param {SweetAlertOptions} params
   */;const setupAccessibility=t=>{const e=getPopup();e.setAttribute("role",t.toast?"alert":"dialog");e.setAttribute("aria-live",t.toast?"polite":"assertive");t.toast||e.setAttribute("aria-modal","true")};
/**
   * @param {HTMLElement} targetElement
   */const setupRTL=t=>{"rtl"===window.getComputedStyle(t).direction&&addClass(getContainer(),s.rtl)};
/**
   * Add modal + backdrop + no-war message for Russians to DOM
   *
   * @param {SweetAlertOptions} params
   */const init=t=>{const e=resetOldContainer();if(isNodeEnv()){error("SweetAlert2 requires document to initialize");return}const o=document.createElement("div");o.className=s.container;e&&addClass(o,s["no-transition"]);setInnerHtml(o,d);const n=getTarget(t.target);n.appendChild(o);setupAccessibility(t);setupRTL(n);addInputChangeListeners()};
/**
   * @param {HTMLElement | object | string} param
   * @param {HTMLElement} target
   */const parseHtmlToContainer=(t,e)=>{t instanceof HTMLElement?e.appendChild(t):"object"===typeof t?handleObject(t,e):t&&setInnerHtml(e,t)};
/**
   * @param {object} param
   * @param {HTMLElement} target
   */const handleObject=(t,e)=>{t.jquery?handleJqueryElem(e,t):setInnerHtml(e,t.toString())};
/**
   * @param {HTMLElement} target
   * @param {HTMLElement} elem
   */const handleJqueryElem=(t,e)=>{t.textContent="";if(0 in e)for(let o=0;o in e;o++)t.appendChild(e[o].cloneNode(true));else t.appendChild(e.cloneNode(true))};
/**
   * @returns {'webkitAnimationEnd' | 'animationend' | false}
   */const p=(()=>{if(isNodeEnv())return false;const t=document.createElement("div");const e={WebkitAnimation:"webkitAnimationEnd",animation:"animationend"};for(const o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&"undefined"!==typeof t.style[o])return e[o];return false})();
/**
   * Measure scrollbar width for padding body during modal show/hide
   * https://github.com/twbs/bootstrap/blob/master/js/src/modal.js
   *
   * @returns {number}
   */const measureScrollbar=()=>{const t=document.createElement("div");t.className=s["scrollbar-measure"];document.body.appendChild(t);const e=t.getBoundingClientRect().width-t.clientWidth;document.body.removeChild(t);return e};
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const renderActions=(t,e)=>{const o=getActions();const s=getLoader();e.showConfirmButton||e.showDenyButton||e.showCancelButton?show(o):hide(o);applyCustomClass(o,e,"actions");renderButtons(o,s,e);setInnerHtml(s,e.loaderHtml);applyCustomClass(s,e,"loader")};
/**
   * @param {HTMLElement} actions
   * @param {HTMLElement} loader
   * @param {SweetAlertOptions} params
   */function renderButtons(t,e,o){const s=getConfirmButton();const n=getDenyButton();const a=getCancelButton();renderButton(s,"confirm",o);renderButton(n,"deny",o);renderButton(a,"cancel",o);handleButtonsStyling(s,n,a,o);if(o.reverseButtons)if(o.toast){t.insertBefore(a,s);t.insertBefore(n,s)}else{t.insertBefore(a,e);t.insertBefore(n,e);t.insertBefore(s,e)}}
/**
   * @param {HTMLElement} confirmButton
   * @param {HTMLElement} denyButton
   * @param {HTMLElement} cancelButton
   * @param {SweetAlertOptions} params
   */function handleButtonsStyling(t,e,o,n){if(n.buttonsStyling){addClass([t,e,o],s.styled);if(n.confirmButtonColor){t.style.backgroundColor=n.confirmButtonColor;addClass(t,s["default-outline"])}if(n.denyButtonColor){e.style.backgroundColor=n.denyButtonColor;addClass(e,s["default-outline"])}if(n.cancelButtonColor){o.style.backgroundColor=n.cancelButtonColor;addClass(o,s["default-outline"])}}else removeClass([t,e,o],s.styled)}
/**
   * @param {HTMLElement} button
   * @param {'confirm' | 'deny' | 'cancel'} buttonType
   * @param {SweetAlertOptions} params
   */function renderButton(t,e,o){toggle(t,o[`show${capitalizeFirstLetter(e)}Button`],"inline-block");setInnerHtml(t,o[`${e}ButtonText`]);t.setAttribute("aria-label",o[`${e}ButtonAriaLabel`]);t.className=s[e];applyCustomClass(t,o,`${e}Button`);addClass(t,o[`${e}ButtonClass`])}
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const renderCloseButton=(t,e)=>{const o=getCloseButton();setInnerHtml(o,e.closeButtonHtml);applyCustomClass(o,e,"closeButton");toggle(o,e.showCloseButton);o.setAttribute("aria-label",e.closeButtonAriaLabel)};
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const renderContainer=(t,e)=>{const o=getContainer();if(o){handleBackdropParam(o,e.backdrop);handlePositionParam(o,e.position);handleGrowParam(o,e.grow);applyCustomClass(o,e,"container")}};
/**
   * @param {HTMLElement} container
   * @param {SweetAlertOptions['backdrop']} backdrop
   */function handleBackdropParam(t,e){"string"===typeof e?t.style.background=e:e||addClass([document.documentElement,document.body],s["no-backdrop"])}
/**
   * @param {HTMLElement} container
   * @param {SweetAlertOptions['position']} position
   */function handlePositionParam(t,e){if(e in s)addClass(t,s[e]);else{warn('The "position" parameter is not valid, defaulting to "center"');addClass(t,s.center)}}
/**
   * @param {HTMLElement} container
   * @param {SweetAlertOptions['grow']} grow
   */function handleGrowParam(t,e){if(e&&"string"===typeof e){const o=`grow-${e}`;o in s&&addClass(t,s[o])}}
/** @type {InputClass[]} */const m=["input","file","range","select","radio","checkbox","textarea"];
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const renderInput=(t,o)=>{const n=getPopup();const a=e.innerParams.get(t);const i=!a||o.input!==a.input;m.forEach((t=>{const e=getDirectChildByClass(n,s[t]);setAttributes(t,o.inputAttributes);e.className=s[t];i&&hide(e)}));if(o.input){i&&showInput(o);setCustomClass(o)}};
/**
   * @param {SweetAlertOptions} params
   */const showInput=t=>{if(!w[t.input]){error(`Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "${t.input}"`);return}const e=getInputContainer(t.input);const o=w[t.input](e,t);show(e);t.inputAutoFocus&&setTimeout((()=>{focusInput(o)}))};
/**
   * @param {HTMLInputElement} input
   */const removeAttributes=t=>{for(let e=0;e<t.attributes.length;e++){const o=t.attributes[e].name;["type","value","style"].includes(o)||t.removeAttribute(o)}};
/**
   * @param {InputClass} inputClass
   * @param {SweetAlertOptions['inputAttributes']} inputAttributes
   */const setAttributes=(t,e)=>{const o=getInput$1(getPopup(),t);if(o){removeAttributes(o);for(const t in e)o.setAttribute(t,e[t])}};
/**
   * @param {SweetAlertOptions} params
   */const setCustomClass=t=>{const e=getInputContainer(t.input);"object"===typeof t.customClass&&addClass(e,t.customClass.input)};
/**
   * @param {HTMLInputElement | HTMLTextAreaElement} input
   * @param {SweetAlertOptions} params
   */const setInputPlaceholder=(t,e)=>{t.placeholder&&!e.inputPlaceholder||(t.placeholder=e.inputPlaceholder)};
/**
   * @param {Input} input
   * @param {Input} prependTo
   * @param {SweetAlertOptions} params
   */const setInputLabel=(t,e,o)=>{if(o.inputLabel){t.id=s.input;const n=document.createElement("label");const a=s["input-label"];n.setAttribute("for",t.id);n.className=a;"object"===typeof o.customClass&&addClass(n,o.customClass.inputLabel);n.innerText=o.inputLabel;e.insertAdjacentElement("beforebegin",n)}};
/**
   * @param {SweetAlertOptions['input']} inputType
   * @returns {HTMLElement}
   */const getInputContainer=t=>getDirectChildByClass(getPopup(),s[t]||s.input);
/**
   * @param {HTMLInputElement | HTMLOutputElement | HTMLTextAreaElement} input
   * @param {SweetAlertOptions['inputValue']} inputValue
   */const checkAndSetInputValue=(t,e)=>{["string","number"].includes(typeof e)?t.value=`${e}`:isPromise(e)||warn(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof e}"`)};
/** @type {Record<string, (input: Input | HTMLElement, params: SweetAlertOptions) => Input>} */const w={};
/**
   * @param {HTMLInputElement} input
   * @param {SweetAlertOptions} params
   * @returns {HTMLInputElement}
   */w.text=w.email=w.password=w.number=w.tel=w.url=(t,e)=>{checkAndSetInputValue(t,e.inputValue);setInputLabel(t,t,e);setInputPlaceholder(t,e);t.type=e.input;return t};
/**
   * @param {HTMLInputElement} input
   * @param {SweetAlertOptions} params
   * @returns {HTMLInputElement}
   */w.file=(t,e)=>{setInputLabel(t,t,e);setInputPlaceholder(t,e);return t};
/**
   * @param {HTMLInputElement} range
   * @param {SweetAlertOptions} params
   * @returns {HTMLInputElement}
   */w.range=(t,e)=>{const o=t.querySelector("input");const s=t.querySelector("output");checkAndSetInputValue(o,e.inputValue);o.type=e.input;checkAndSetInputValue(s,e.inputValue);setInputLabel(o,t,e);return t};
/**
   * @param {HTMLSelectElement} select
   * @param {SweetAlertOptions} params
   * @returns {HTMLSelectElement}
   */w.select=(t,e)=>{t.textContent="";if(e.inputPlaceholder){const o=document.createElement("option");setInnerHtml(o,e.inputPlaceholder);o.value="";o.disabled=true;o.selected=true;t.appendChild(o)}setInputLabel(t,t,e);return t};
/**
   * @param {HTMLInputElement} radio
   * @returns {HTMLInputElement}
   */w.radio=t=>{t.textContent="";return t};
/**
   * @param {HTMLLabelElement} checkboxContainer
   * @param {SweetAlertOptions} params
   * @returns {HTMLInputElement}
   */w.checkbox=(t,e)=>{const o=getInput$1(getPopup(),"checkbox");o.value="1";o.id=s.checkbox;o.checked=Boolean(e.inputValue);const n=t.querySelector("span");setInnerHtml(n,e.inputPlaceholder);return o};
/**
   * @param {HTMLTextAreaElement} textarea
   * @param {SweetAlertOptions} params
   * @returns {HTMLTextAreaElement}
   */w.textarea=(t,e)=>{checkAndSetInputValue(t,e.inputValue);setInputPlaceholder(t,e);setInputLabel(t,t,e);
/**
     * @param {HTMLElement} el
     * @returns {number}
     */const getMargin=t=>parseInt(window.getComputedStyle(t).marginLeft)+parseInt(window.getComputedStyle(t).marginRight);setTimeout((()=>{if("MutationObserver"in window){const e=parseInt(window.getComputedStyle(getPopup()).width);const textareaResizeHandler=()=>{const o=t.offsetWidth+getMargin(t);getPopup().style.width=o>e?`${o}px`:null};new MutationObserver(textareaResizeHandler).observe(t,{attributes:true,attributeFilter:["style"]})}}));return t};
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const renderContent=(t,e)=>{const o=getHtmlContainer();applyCustomClass(o,e,"htmlContainer");if(e.html){parseHtmlToContainer(e.html,o);show(o,"block")}else if(e.text){o.textContent=e.text;show(o,"block")}else hide(o);renderInput(t,e)};
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const renderFooter=(t,e)=>{const o=getFooter();toggle(o,e.footer);e.footer&&parseHtmlToContainer(e.footer,o);applyCustomClass(o,e,"footer")};
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const renderIcon=(t,o)=>{const s=e.innerParams.get(t);const a=getIcon();if(s&&o.icon===s.icon){setContent(a,o);applyStyles(a,o)}else if(o.icon||o.iconHtml)if(o.icon&&-1===Object.keys(n).indexOf(o.icon)){error(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${o.icon}"`);hide(a)}else{show(a);setContent(a,o);applyStyles(a,o);addClass(a,o.showClass.icon)}else hide(a)};
/**
   * @param {HTMLElement} icon
   * @param {SweetAlertOptions} params
   */const applyStyles=(t,e)=>{for(const o in n)e.icon!==o&&removeClass(t,n[o]);addClass(t,n[e.icon]);setColor(t,e);adjustSuccessIconBackgroundColor();applyCustomClass(t,e,"icon")};const adjustSuccessIconBackgroundColor=()=>{const t=getPopup();const e=window.getComputedStyle(t).getPropertyValue("background-color");
/** @type {NodeListOf<HTMLElement>} */const o=t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");for(let t=0;t<o.length;t++)o[t].style.backgroundColor=e};const g='\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n';const f='\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n';
/**
   * @param {HTMLElement} icon
   * @param {SweetAlertOptions} params
   */const setContent=(t,e)=>{let o=t.innerHTML;let s;if(e.iconHtml)s=iconContent(e.iconHtml);else if("success"===e.icon){s=g;o=o.replace(/ style=".*?"/g,"")}else if("error"===e.icon)s=f;else{const t={question:"?",warning:"!",info:"i"};s=iconContent(t[e.icon])}o.trim()!==s.trim()&&setInnerHtml(t,s)};
/**
   * @param {HTMLElement} icon
   * @param {SweetAlertOptions} params
   */const setColor=(t,e)=>{if(e.iconColor){t.style.color=e.iconColor;t.style.borderColor=e.iconColor;for(const o of[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"])setStyle(t,o,"backgroundColor",e.iconColor);setStyle(t,".swal2-success-ring","borderColor",e.iconColor)}};
/**
   * @param {string} content
   * @returns {string}
   */const iconContent=t=>`<div class="${s["icon-content"]}">${t}</div>`
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */;const renderImage=(t,e)=>{const o=getImage();if(e.imageUrl){show(o,"");o.setAttribute("src",e.imageUrl);o.setAttribute("alt",e.imageAlt);applyNumericalStyle(o,"width",e.imageWidth);applyNumericalStyle(o,"height",e.imageHeight);o.className=s.image;applyCustomClass(o,e,"image")}else hide(o)};
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const renderPopup=(t,e)=>{const o=getContainer();const s=getPopup();if(e.toast){applyNumericalStyle(o,"width",e.width);s.style.width="100%";s.insertBefore(getLoader(),getIcon())}else applyNumericalStyle(s,"width",e.width);applyNumericalStyle(s,"padding",e.padding);e.color&&(s.style.color=e.color);e.background&&(s.style.background=e.background);hide(getValidationMessage());addClasses$1(s,e)};
/**
   * @param {HTMLElement} popup
   * @param {SweetAlertOptions} params
   */const addClasses$1=(t,e)=>{t.className=`${s.popup} ${isVisible$1(t)?e.showClass.popup:""}`;if(e.toast){addClass([document.documentElement,document.body],s["toast-shown"]);addClass(t,s.toast)}else addClass(t,s.modal);applyCustomClass(t,e,"popup");"string"===typeof e.customClass&&addClass(t,e.customClass);e.icon&&addClass(t,s[`icon-${e.icon}`])};
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const renderProgressSteps=(t,e)=>{const o=getProgressSteps();if(e.progressSteps&&0!==e.progressSteps.length){show(o);o.textContent="";e.currentProgressStep>=e.progressSteps.length&&warn("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)");e.progressSteps.forEach(((t,n)=>{const a=createStepElement(t);o.appendChild(a);n===e.currentProgressStep&&addClass(a,s["active-progress-step"]);if(n!==e.progressSteps.length-1){const t=createLineElement(e);o.appendChild(t)}}))}else hide(o)};
/**
   * @param {string} step
   * @returns {HTMLLIElement}
   */const createStepElement=t=>{const e=document.createElement("li");addClass(e,s["progress-step"]);setInnerHtml(e,t);return e};
/**
   * @param {SweetAlertOptions} params
   * @returns {HTMLLIElement}
   */const createLineElement=t=>{const e=document.createElement("li");addClass(e,s["progress-step-line"]);t.progressStepsDistance&&applyNumericalStyle(e,"width",t.progressStepsDistance);return e};
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const renderTitle=(t,e)=>{const o=getTitle();toggle(o,e.title||e.titleText,"block");e.title&&parseHtmlToContainer(e.title,o);e.titleText&&(o.innerText=e.titleText);applyCustomClass(o,e,"title")};
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const render=(t,e)=>{renderPopup(t,e);renderContainer(t,e);renderProgressSteps(t,e);renderIcon(t,e);renderImage(t,e);renderTitle(t,e);renderCloseButton(t,e);renderContent(t,e);renderActions(t,e);renderFooter(t,e);"function"===typeof e.didRender&&e.didRender(getPopup())};function hideLoading(){const o=e.innerParams.get(this||t);if(!o)return;const n=e.domCache.get(this||t);hide(n.loader);isToast()?o.icon&&show(getIcon()):showRelatedButton(n);removeClass([n.popup,n.actions],s.loading);n.popup.removeAttribute("aria-busy");n.popup.removeAttribute("data-loading");n.confirmButton.disabled=false;n.denyButton.disabled=false;n.cancelButton.disabled=false}const showRelatedButton=t=>{const e=t.popup.getElementsByClassName(t.loader.getAttribute("data-button-to-replace"));e.length?show(e[0],"inline-block"):allButtonsAreHidden()&&hide(t.actions)};
/**
   * Gets the input DOM node, this method works with input parameter.
   *
   * @param {SweetAlert2} instance
   * @returns {HTMLElement | null}
   */function getInput(o){const s=e.innerParams.get(o||this||t);const n=e.domCache.get(o||this||t);return n?getInput$1(n.popup,s.input):null}const isVisible=()=>isVisible$1(getPopup());const clickConfirm=()=>getConfirmButton()&&getConfirmButton().click();const clickDeny=()=>getDenyButton()&&getDenyButton().click();const clickCancel=()=>getCancelButton()&&getCancelButton().click();const h=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"});
/**
   * @param {GlobalState} globalState
   */const removeKeydownHandler=t=>{if(t.keydownTarget&&t.keydownHandlerAdded){t.keydownTarget.removeEventListener("keydown",t.keydownHandler,{capture:t.keydownListenerCapture});t.keydownHandlerAdded=false}};
/**
   * @param {SweetAlert2} instance
   * @param {GlobalState} globalState
   * @param {SweetAlertOptions} innerParams
   * @param {*} dismissWith
   */const addKeydownHandler=(t,e,o,s)=>{removeKeydownHandler(e);if(!o.toast){e.keydownHandler=e=>keydownHandler(t,e,s);e.keydownTarget=o.keydownListenerCapture?window:getPopup();e.keydownListenerCapture=o.keydownListenerCapture;e.keydownTarget.addEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture});e.keydownHandlerAdded=true}};
/**
   * @param {number} index
   * @param {number} increment
   */const setFocus=(t,e)=>{const o=getFocusableElements();if(o.length){t+=e;t===o.length?t=0:-1===t&&(t=o.length-1);o[t].focus()}else getPopup().focus()};const b=["ArrowRight","ArrowDown"];const y=["ArrowLeft","ArrowUp"];
/**
   * @param {SweetAlert2} instance
   * @param {KeyboardEvent} event
   * @param {Function} dismissWith
   */const keydownHandler=(t,o,s)=>{const n=e.innerParams.get(t);if(n&&!o.isComposing&&229!==o.keyCode){n.stopKeydownPropagation&&o.stopPropagation();"Enter"===o.key?handleEnter(t,o,n):"Tab"===o.key?handleTab(o):[...b,...y].includes(o.key)?handleArrows(o.key):"Escape"===o.key&&handleEsc(o,n,s)}};
/**
   * @param {SweetAlert2} instance
   * @param {KeyboardEvent} event
   * @param {SweetAlertOptions} innerParams
   */const handleEnter=(t,e,o)=>{if(callIfFunction(o.allowEnterKey)&&e.target&&t.getInput()&&e.target instanceof HTMLElement&&e.target.outerHTML===t.getInput().outerHTML){if(["textarea","file"].includes(o.input))return;clickConfirm();e.preventDefault()}};
/**
   * @param {KeyboardEvent} event
   */const handleTab=t=>{const e=t.target;const o=getFocusableElements();let s=-1;for(let t=0;t<o.length;t++)if(e===o[t]){s=t;break}t.shiftKey?setFocus(s,-1):setFocus(s,1);t.stopPropagation();t.preventDefault()};
/**
   * @param {string} key
   */const handleArrows=t=>{const e=getConfirmButton();const o=getDenyButton();const s=getCancelButton();
/** @type HTMLElement[] */const n=[e,o,s];if(document.activeElement instanceof HTMLElement&&!n.includes(document.activeElement))return;const a=b.includes(t)?"nextElementSibling":"previousElementSibling";let i=document.activeElement;for(let t=0;t<getActions().children.length;t++){i=i[a];if(!i)return;if(i instanceof HTMLButtonElement&&isVisible$1(i))break}i instanceof HTMLButtonElement&&i.focus()};
/**
   * @param {KeyboardEvent} event
   * @param {SweetAlertOptions} innerParams
   * @param {Function} dismissWith
   */const handleEsc=(t,e,o)=>{if(callIfFunction(e.allowEscapeKey)){t.preventDefault();o(h.esc)}};var v={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};const setAriaHidden=()=>{const t=Array.from(document.body.children);t.forEach((t=>{if(t!==getContainer()&&!t.contains(getContainer())){t.hasAttribute("aria-hidden")&&t.setAttribute("data-previous-aria-hidden",t.getAttribute("aria-hidden"));t.setAttribute("aria-hidden","true")}}))};const unsetAriaHidden=()=>{const t=Array.from(document.body.children);t.forEach((t=>{if(t.hasAttribute("data-previous-aria-hidden")){t.setAttribute("aria-hidden",t.getAttribute("data-previous-aria-hidden"));t.removeAttribute("data-previous-aria-hidden")}else t.removeAttribute("aria-hidden")}))};const iOSfix=()=>{const t=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1;if(t&&!hasClass(document.body,s.iosfix)){const t=document.body.scrollTop;document.body.style.top=-1*t+"px";addClass(document.body,s.iosfix);lockBodyScroll();addBottomPaddingForTallPopups()}};const addBottomPaddingForTallPopups=()=>{const t=navigator.userAgent;const e=!!t.match(/iPad/i)||!!t.match(/iPhone/i);const o=!!t.match(/WebKit/i);const s=e&&o&&!t.match(/CriOS/i);if(s){const t=44;getPopup().scrollHeight>window.innerHeight-t&&(getContainer().style.paddingBottom=`${t}px`)}};const lockBodyScroll=()=>{const t=getContainer();let e;
/**
     * @param {TouchEvent} event
     */t.ontouchstart=t=>{e=shouldPreventTouchMove(t)};
/**
     * @param {TouchEvent} event
     */t.ontouchmove=t=>{if(e){t.preventDefault();t.stopPropagation()}}};
/**
   * @param {TouchEvent} event
   * @returns {boolean}
   */const shouldPreventTouchMove=t=>{const e=t.target;const o=getContainer();return!isStylus(t)&&!isZoom(t)&&(e===o||!isScrollable(o)&&e instanceof HTMLElement&&"INPUT"!==e.tagName&&"TEXTAREA"!==e.tagName&&(!isScrollable(getHtmlContainer())||!getHtmlContainer().contains(e)))};
/**
   * https://github.com/sweetalert2/sweetalert2/issues/1786
   *
   * @param {*} event
   * @returns {boolean}
   */const isStylus=t=>t.touches&&t.touches.length&&"stylus"===t.touches[0].touchType;
/**
   * https://github.com/sweetalert2/sweetalert2/issues/1891
   *
   * @param {TouchEvent} event
   * @returns {boolean}
   */const isZoom=t=>t.touches&&t.touches.length>1;const undoIOSfix=()=>{if(hasClass(document.body,s.iosfix)){const t=parseInt(document.body.style.top,10);removeClass(document.body,s.iosfix);document.body.style.top="";document.body.scrollTop=-1*t}};const fixScrollbar=()=>{if(null===l.previousBodyPadding&&document.body.scrollHeight>window.innerHeight){l.previousBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"));document.body.style.paddingRight=`${l.previousBodyPadding+measureScrollbar()}px`}};const undoScrollbar=()=>{if(null!==l.previousBodyPadding){document.body.style.paddingRight=`${l.previousBodyPadding}px`;l.previousBodyPadding=null}};function removePopupAndResetState(t,e,o,s){if(isToast())triggerDidCloseAndDispose(t,s);else{restoreActiveElement(o).then((()=>triggerDidCloseAndDispose(t,s)));removeKeydownHandler(u)}const n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);if(n){e.setAttribute("style","display:none !important");e.removeAttribute("class");e.innerHTML=""}else e.remove();if(isModal()){undoScrollbar();undoIOSfix();unsetAriaHidden()}removeBodyClasses()}function removeBodyClasses(){removeClass([document.documentElement,document.body],[s.shown,s["height-auto"],s["no-backdrop"],s["toast-shown"]])}function close(e){e=prepareResolveValue(e);const o=v.swalPromiseResolve.get(this||t);const s=triggerClosePopup(this||t);if(this.isAwaitingPromise()){if(!e.isDismissed){handleAwaitingPromise(this||t);o(e)}}else s&&o(e)}function isAwaitingPromise(){return!!e.awaitingPromise.get(this||t)}const triggerClosePopup=t=>{const o=getPopup();if(!o)return false;const s=e.innerParams.get(t);if(!s||hasClass(o,s.hideClass.popup))return false;removeClass(o,s.showClass.popup);addClass(o,s.hideClass.popup);const n=getContainer();removeClass(n,s.showClass.backdrop);addClass(n,s.hideClass.backdrop);handlePopupAnimation(t,o,s);return true};function rejectPromise(e){const o=v.swalPromiseReject.get(this||t);handleAwaitingPromise(this||t);o&&o(e)}const handleAwaitingPromise=t=>{if(t.isAwaitingPromise()){e.awaitingPromise.delete(t);e.innerParams.get(t)||t._destroy()}};const prepareResolveValue=t=>"undefined"===typeof t?{isConfirmed:false,isDenied:false,isDismissed:true}:Object.assign({isConfirmed:false,isDenied:false,isDismissed:false},t);const handlePopupAnimation=(t,e,o)=>{const s=getContainer();const n=p&&hasCssAnimation(e);"function"===typeof o.willClose&&o.willClose(e);n?animatePopup(t,e,s,o.returnFocus,o.didClose):removePopupAndResetState(t,s,o.returnFocus,o.didClose)};const animatePopup=(t,e,o,s,n)=>{u.swalCloseEventFinishedCallback=removePopupAndResetState.bind(null,t,o,s,n);e.addEventListener(p,(function(t){if(t.target===e){u.swalCloseEventFinishedCallback();delete u.swalCloseEventFinishedCallback}}))};const triggerDidCloseAndDispose=(t,e)=>{setTimeout((()=>{"function"===typeof e&&e.bind(t.params)();t._destroy()}))};
/**
   * @param {SweetAlert2} instance
   * @param {string[]} buttons
   * @param {boolean} disabled
   */function setButtonsDisabled(t,o,s){const n=e.domCache.get(t);o.forEach((t=>{n[t].disabled=s}))}
/**
   * @param {HTMLInputElement} input
   * @param {boolean} disabled
   */function setInputDisabled(t,e){if(t)if("radio"===t.type){const o=t.parentNode.parentNode;const s=o.querySelectorAll("input");for(let t=0;t<s.length;t++)s[t].disabled=e}else t.disabled=e}function enableButtons(){setButtonsDisabled(this||t,["confirmButton","denyButton","cancelButton"],false)}function disableButtons(){setButtonsDisabled(this||t,["confirmButton","denyButton","cancelButton"],true)}function enableInput(){setInputDisabled(this.getInput(),false)}function disableInput(){setInputDisabled(this.getInput(),true)}
/**
   * Show block with validation message
   *
   * @param {string} error
   */function showValidationMessage(o){const n=e.domCache.get(this||t);const a=e.innerParams.get(this||t);setInnerHtml(n.validationMessage,o);n.validationMessage.className=s["validation-message"];a.customClass&&a.customClass.validationMessage&&addClass(n.validationMessage,a.customClass.validationMessage);show(n.validationMessage);const i=this.getInput();if(i){i.setAttribute("aria-invalid",true);i.setAttribute("aria-describedby",s["validation-message"]);focusInput(i);addClass(i,s.inputerror)}}function resetValidationMessage(){const o=e.domCache.get(this||t);o.validationMessage&&hide(o.validationMessage);const n=this.getInput();if(n){n.removeAttribute("aria-invalid");n.removeAttribute("aria-describedby");removeClass(n,s.inputerror)}}const x={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:false,showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",color:void 0,backdrop:true,heightAuto:true,allowOutsideClick:true,allowEscapeKey:true,allowEnterKey:true,stopKeydownPropagation:true,keydownListenerCapture:false,showConfirmButton:true,showDenyButton:false,showCancelButton:false,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:true,reverseButtons:false,focusConfirm:true,focusDeny:false,focusCancel:false,returnFocus:true,showCloseButton:false,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:false,showLoaderOnDeny:false,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:false,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoFocus:true,inputAutoTrim:true,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:false,validationMessage:void 0,grow:false,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:true};const k=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","color","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","willClose"];const C={};const A=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"];
/**
   * Is valid parameter
   *
   * @param {string} paramName
   * @returns {boolean}
   */const isValidParameter=t=>Object.prototype.hasOwnProperty.call(x,t);
/**
   * Is valid parameter for Swal.update() method
   *
   * @param {string} paramName
   * @returns {boolean}
   */const isUpdatableParameter=t=>-1!==k.indexOf(t);
/**
   * Is deprecated parameter
   *
   * @param {string} paramName
   * @returns {string | undefined}
   */const isDeprecatedParameter=t=>C[t];
/**
   * @param {string} param
   */const checkIfParamIsValid=t=>{isValidParameter(t)||warn(`Unknown parameter "${t}"`)};
/**
   * @param {string} param
   */const checkIfToastParamIsValid=t=>{A.includes(t)&&warn(`The parameter "${t}" is incompatible with toasts`)};
/**
   * @param {string} param
   */const checkIfParamIsDeprecated=t=>{isDeprecatedParameter(t)&&warnAboutDeprecation(t,isDeprecatedParameter(t))};
/**
   * Show relevant warnings for given params
   *
   * @param {SweetAlertOptions} params
   */const showWarningsForParams=t=>{false===t.backdrop&&t.allowOutsideClick&&warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');for(const e in t){checkIfParamIsValid(e);t.toast&&checkIfToastParamIsValid(e);checkIfParamIsDeprecated(e)}};
/**
   * Updates popup parameters.
   *
   * @param {SweetAlertOptions} params
   */function update(o){const s=getPopup();const n=e.innerParams.get(this||t);if(!s||hasClass(s,n.hideClass.popup)){warn("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");return}const a=filterValidParams(o);const i=Object.assign({},n,a);render(this||t,i);e.innerParams.set(this||t,i);Object.defineProperties(this||t,{params:{value:Object.assign({},(this||t).params,o),writable:false,enumerable:true}})}
/**
   * @param {SweetAlertOptions} params
   * @returns {SweetAlertOptions}
   */const filterValidParams=t=>{const e={};Object.keys(t).forEach((o=>{isUpdatableParameter(o)?e[o]=t[o]:warn(`Invalid parameter to update: ${o}`)}));return e};function _destroy(){const o=e.domCache.get(this||t);const s=e.innerParams.get(this||t);if(s){if(o.popup&&u.swalCloseEventFinishedCallback){u.swalCloseEventFinishedCallback();delete u.swalCloseEventFinishedCallback}"function"===typeof s.didDestroy&&s.didDestroy();disposeSwal(this||t)}else disposeWeakMaps(this||t)}
/**
   * @param {SweetAlert2} instance
   */const disposeSwal=t=>{disposeWeakMaps(t);delete t.params;delete u.keydownHandler;delete u.keydownTarget;delete u.currentInstance};
/**
   * @param {SweetAlert2} instance
   */const disposeWeakMaps=t=>{if(t.isAwaitingPromise()){unsetWeakMaps(e,t);e.awaitingPromise.set(t,true)}else{unsetWeakMaps(v,t);unsetWeakMaps(e,t)}};
/**
   * @param {object} obj
   * @param {SweetAlert2} instance
   */const unsetWeakMaps=(t,e)=>{for(const o in t)t[o].delete(e)};var B=Object.freeze({__proto__:null,hideLoading:hideLoading,disableLoading:hideLoading,getInput:getInput,close:close,isAwaitingPromise:isAwaitingPromise,rejectPromise:rejectPromise,handleAwaitingPromise:handleAwaitingPromise,closePopup:close,closeModal:close,closeToast:close,enableButtons:enableButtons,disableButtons:disableButtons,enableInput:enableInput,disableInput:disableInput,showValidationMessage:showValidationMessage,resetValidationMessage:resetValidationMessage,update:update,_destroy:_destroy});
/**
   * Shows loader (spinner), this is useful with AJAX requests.
   * By default the loader be shown instead of the "Confirm" button.
   *
   * @param {HTMLButtonElement} [buttonToReplace]
   */const showLoading=t=>{let e=getPopup();e||new I;e=getPopup();const o=getLoader();isToast()?hide(getIcon()):replaceButton(e,t);show(o);e.setAttribute("data-loading","true");e.setAttribute("aria-busy","true");e.focus()};
/**
   * @param {HTMLElement} popup
   * @param {HTMLButtonElement} [buttonToReplace]
   */const replaceButton=(t,e)=>{const o=getActions();const n=getLoader();!e&&isVisible$1(getConfirmButton())&&(e=getConfirmButton());show(o);if(e){hide(e);n.setAttribute("data-button-to-replace",e.className)}n.parentNode.insertBefore(n,e);addClass([t,o],s.loading)};
/**
   * @typedef { string | number | boolean } InputValue
   */
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const handleInputOptionsAndValue=(t,e)=>{if("select"===e.input||"radio"===e.input)handleInputOptions(t,e);else if(["text","email","number","tel","textarea"].includes(e.input)&&(hasToPromiseFn(e.inputValue)||isPromise(e.inputValue))){showLoading(getConfirmButton());handleInputValue(t,e)}};
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} innerParams
   * @returns {string | number | File | FileList | null}
   */const getInputValue=(t,e)=>{const o=t.getInput();if(!o)return null;switch(e.input){case"checkbox":return getCheckboxValue(o);case"radio":return getRadioValue(o);case"file":return getFileValue(o);default:return e.inputAutoTrim?o.value.trim():o.value}};
/**
   * @param {HTMLInputElement} input
   * @returns {number}
   */const getCheckboxValue=t=>t.checked?1:0
/**
   * @param {HTMLInputElement} input
   * @returns {string | null}
   */;const getRadioValue=t=>t.checked?t.value:null
/**
   * @param {HTMLInputElement} input
   * @returns {FileList | File | null}
   */;const getFileValue=t=>t.files.length?null!==t.getAttribute("multiple")?t.files:t.files[0]:null
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */;const handleInputOptions=(t,e)=>{const o=getPopup();
/**
     * @param {Record<string, any>} inputOptions
     */const processInputOptions=t=>{P[e.input](o,formatInputOptions(t),e)};if(hasToPromiseFn(e.inputOptions)||isPromise(e.inputOptions)){showLoading(getConfirmButton());asPromise(e.inputOptions).then((e=>{t.hideLoading();processInputOptions(e)}))}else"object"===typeof e.inputOptions?processInputOptions(e.inputOptions):error("Unexpected type of inputOptions! Expected object, Map or Promise, got "+typeof e.inputOptions)};
/**
   * @param {SweetAlert2} instance
   * @param {SweetAlertOptions} params
   */const handleInputValue=(t,e)=>{const o=t.getInput();hide(o);asPromise(e.inputValue).then((s=>{o.value="number"===e.input?`${parseFloat(s)||0}`:`${s}`;show(o);o.focus();t.hideLoading()})).catch((e=>{error(`Error in inputValue promise: ${e}`);o.value="";show(o);o.focus();t.hideLoading()}))};const P={
/**
     * @param {HTMLElement} popup
     * @param {Record<string, any>} inputOptions
     * @param {SweetAlertOptions} params
     */
select:(t,e,o)=>{const n=getDirectChildByClass(t,s.select);
/**
       * @param {HTMLElement} parent
       * @param {string} optionLabel
       * @param {string} optionValue
       */const renderOption=(t,e,s)=>{const n=document.createElement("option");n.value=s;setInnerHtml(n,e);n.selected=isSelected(s,o.inputValue);t.appendChild(n)};e.forEach((t=>{const e=t[0];const o=t[1];if(Array.isArray(o)){const t=document.createElement("optgroup");t.label=e;t.disabled=false;n.appendChild(t);o.forEach((e=>renderOption(t,e[1],e[0])))}else renderOption(n,o,e)}));n.focus()},
/**
     * @param {HTMLElement} popup
     * @param {Record<string, any>} inputOptions
     * @param {SweetAlertOptions} params
     */
radio:(t,e,o)=>{const n=getDirectChildByClass(t,s.radio);e.forEach((t=>{const e=t[0];const a=t[1];const i=document.createElement("input");const r=document.createElement("label");i.type="radio";i.name=s.radio;i.value=e;isSelected(e,o.inputValue)&&(i.checked=true);const l=document.createElement("span");setInnerHtml(l,a);l.className=s.label;r.appendChild(i);r.appendChild(l);n.appendChild(r)}));const a=n.querySelectorAll("input");a.length&&a[0].focus()}};
/**
   * Converts `inputOptions` into an array of `[value, label]`s
   *
   * @param {Record<string, any>} inputOptions
   * @returns {Array<Array<string>>}
   */const formatInputOptions=t=>{const e=[];"undefined"!==typeof Map&&t instanceof Map?t.forEach(((t,o)=>{let s=t;"object"===typeof s&&(s=formatInputOptions(s));e.push([o,s])})):Object.keys(t).forEach((o=>{let s=t[o];"object"===typeof s&&(s=formatInputOptions(s));e.push([o,s])}));return e};
/**
   * @param {string} optionValue
   * @param {InputValue | Promise<InputValue> | { toPromise: () => InputValue }} inputValue
   * @returns {boolean}
   */const isSelected=(t,e)=>e&&e.toString()===t.toString();
/**
   * @param {SweetAlert2} instance
   */const handleConfirmButtonClick=t=>{const o=e.innerParams.get(t);t.disableButtons();o.input?handleConfirmOrDenyWithInput(t,"confirm"):confirm(t,true)};
/**
   * @param {SweetAlert2} instance
   */const handleDenyButtonClick=t=>{const o=e.innerParams.get(t);t.disableButtons();o.returnInputValueOnDeny?handleConfirmOrDenyWithInput(t,"deny"):deny(t,false)};
/**
   * @param {SweetAlert2} instance
   * @param {Function} dismissWith
   */const handleCancelButtonClick=(t,e)=>{t.disableButtons();e(h.cancel)};
/**
   * @param {SweetAlert2} instance
   * @param {'confirm' | 'deny'} type
   */const handleConfirmOrDenyWithInput=(t,o)=>{const s=e.innerParams.get(t);if(!s.input){error(`The "input" parameter is needed to be set when using returnInputValueOn${capitalizeFirstLetter(o)}`);return}const n=getInputValue(t,s);if(s.inputValidator)handleInputValidator(t,n,o);else if(t.getInput().checkValidity())"deny"===o?deny(t,n):confirm(t,n);else{t.enableButtons();t.showValidationMessage(s.validationMessage)}};
/**
   * @param {SweetAlert2} instance
   * @param {string | number | File | FileList | null} inputValue
   * @param {'confirm' | 'deny'} type
   */const handleInputValidator=(t,o,s)=>{const n=e.innerParams.get(t);t.disableInput();const a=Promise.resolve().then((()=>asPromise(n.inputValidator(o,n.validationMessage))));a.then((e=>{t.enableButtons();t.enableInput();e?t.showValidationMessage(e):"deny"===s?deny(t,o):confirm(t,o)}))};
/**
   * @param {SweetAlert2} instance
   * @param {any} value
   */const deny=(t,o)=>{const s=e.innerParams.get(t||void 0);s.showLoaderOnDeny&&showLoading(getDenyButton());if(s.preDeny){e.awaitingPromise.set(t||void 0,true);const n=Promise.resolve().then((()=>asPromise(s.preDeny(o,s.validationMessage))));n.then((e=>{if(false===e){t.hideLoading();handleAwaitingPromise(t)}else t.close({isDenied:true,value:"undefined"===typeof e?o:e})})).catch((e=>rejectWith(t||void 0,e)))}else t.close({isDenied:true,value:o})};
/**
   * @param {SweetAlert2} instance
   * @param {any} value
   */const succeedWith=(t,e)=>{t.close({isConfirmed:true,value:e})};
/**
   *
   * @param {SweetAlert2} instance
   * @param {string} error
   */const rejectWith=(t,e)=>{t.rejectPromise(e)};
/**
   *
   * @param {SweetAlert2} instance
   * @param {any} value
   */const confirm=(t,o)=>{const s=e.innerParams.get(t||void 0);s.showLoaderOnConfirm&&showLoading();if(s.preConfirm){t.resetValidationMessage();e.awaitingPromise.set(t||void 0,true);const n=Promise.resolve().then((()=>asPromise(s.preConfirm(o,s.validationMessage))));n.then((e=>{if(isVisible$1(getValidationMessage())||false===e){t.hideLoading();handleAwaitingPromise(t)}else succeedWith(t,"undefined"===typeof e?o:e)})).catch((e=>rejectWith(t||void 0,e)))}else succeedWith(t,o)};const handlePopupClick=(t,o,s)=>{const n=e.innerParams.get(t);if(n.toast)handleToastClick(t,o,s);else{handleModalMousedown(o);handleContainerMousedown(o);handleModalClick(t,o,s)}};const handleToastClick=(t,o,s)=>{o.popup.onclick=()=>{const o=e.innerParams.get(t);o&&(isAnyButtonShown(o)||o.timer||o.input)||s(h.close)}};
/**
   * @param {*} innerParams
   * @returns {boolean}
   */const isAnyButtonShown=t=>t.showConfirmButton||t.showDenyButton||t.showCancelButton||t.showCloseButton;let $=false;const handleModalMousedown=t=>{t.popup.onmousedown=()=>{t.container.onmouseup=function(e){t.container.onmouseup=void 0;e.target===t.container&&($=true)}}};const handleContainerMousedown=t=>{t.container.onmousedown=()=>{t.popup.onmouseup=function(e){t.popup.onmouseup=void 0;(e.target===t.popup||t.popup.contains(e.target))&&($=true)}}};const handleModalClick=(t,o,s)=>{o.container.onclick=n=>{const a=e.innerParams.get(t);$?$=false:n.target===o.container&&callIfFunction(a.allowOutsideClick)&&s(h.backdrop)}};const isJqueryElement=t=>"object"===typeof t&&t.jquery;const isElement=t=>t instanceof Element||isJqueryElement(t);const argsToParams=t=>{const e={};"object"!==typeof t[0]||isElement(t[0])?["title","html","icon"].forEach(((o,s)=>{const n=t[s];"string"===typeof n||isElement(n)?e[o]=n:void 0!==n&&error(`Unexpected type of ${o}! Expected "string" or "Element", got ${typeof n}`)})):Object.assign(e,t[0]);return e};function fire(){const e=this||t;for(var o=arguments.length,s=new Array(o),n=0;n<o;n++)s[n]=arguments[n];return new e(...s)}
/**
   * Returns an extended version of `Swal` containing `params` as defaults.
   * Useful for reusing Swal configuration.
   *
   * For example:
   *
   * Before:
   * const textPromptOptions = { input: 'text', showCancelButton: true }
   * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
   * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
   *
   * After:
   * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
   * const {value: firstName} = await TextPrompt('What is your first name?')
   * const {value: lastName} = await TextPrompt('What is your last name?')
   *
   * @param mixinParams
   */function mixin(t){class MixinSwal extends(this){_main(e,o){return super._main(e,Object.assign({},t,o))}}return MixinSwal}
/**
   * If `timer` parameter is set, returns number of milliseconds of timer remained.
   * Otherwise, returns undefined.
   *
   * @returns {number | undefined}
   */const getTimerLeft=()=>u.timeout&&u.timeout.getTimerLeft();
/**
   * Stop timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   *
   * @returns {number | undefined}
   */const stopTimer=()=>{if(u.timeout){stopTimerProgressBar();return u.timeout.stop()}};
/**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   *
   * @returns {number | undefined}
   */const resumeTimer=()=>{if(u.timeout){const t=u.timeout.start();animateTimerProgressBar(t);return t}};
/**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   *
   * @returns {number | undefined}
   */const toggleTimer=()=>{const t=u.timeout;return t&&(t.running?stopTimer():resumeTimer())};
/**
   * Increase timer. Returns number of milliseconds of an updated timer.
   * If `timer` parameter isn't set, returns undefined.
   *
   * @param {number} n
   * @returns {number | undefined}
   */const increaseTimer=t=>{if(u.timeout){const e=u.timeout.increase(t);animateTimerProgressBar(e,true);return e}};
/**
   * Check if timer is running. Returns true if timer is running
   * or false if timer is paused or stopped.
   * If `timer` parameter isn't set, returns undefined
   *
   * @returns {boolean}
   */const isTimerRunning=()=>u.timeout&&u.timeout.isRunning();let E=false;const T={};
/**
   * @param {string} attr
   */function bindClickHandler(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"data-swal-template";T[e]=this||t;if(!E){document.body.addEventListener("click",bodyClickListener);E=true}}const bodyClickListener=t=>{for(let e=t.target;e&&e!==document;e=e.parentNode)for(const t in T){const o=e.getAttribute(t);if(o){T[t].fire({template:o});return}}};var S=Object.freeze({__proto__:null,isValidParameter:isValidParameter,isUpdatableParameter:isUpdatableParameter,isDeprecatedParameter:isDeprecatedParameter,argsToParams:argsToParams,getContainer:getContainer,getPopup:getPopup,getTitle:getTitle,getHtmlContainer:getHtmlContainer,getImage:getImage,getIcon:getIcon,getIconContent:getIconContent,getInputLabel:getInputLabel,getCloseButton:getCloseButton,getActions:getActions,getConfirmButton:getConfirmButton,getDenyButton:getDenyButton,getCancelButton:getCancelButton,getLoader:getLoader,getFooter:getFooter,getTimerProgressBar:getTimerProgressBar,getFocusableElements:getFocusableElements,getValidationMessage:getValidationMessage,getProgressSteps:getProgressSteps,isLoading:isLoading,isVisible:isVisible,clickConfirm:clickConfirm,clickDeny:clickDeny,clickCancel:clickCancel,fire:fire,mixin:mixin,showLoading:showLoading,enableLoading:showLoading,getTimerLeft:getTimerLeft,stopTimer:stopTimer,resumeTimer:resumeTimer,toggleTimer:toggleTimer,increaseTimer:increaseTimer,isTimerRunning:isTimerRunning,bindClickHandler:bindClickHandler});class Timer{
/**
     * @param {Function} callback
     * @param {number} delay
     */
constructor(t,e){this.callback=t;this.remaining=e;this.running=false;this.start()}start(){if(!this.running){this.running=true;this.started=new Date;this.id=setTimeout(this.callback,this.remaining)}return this.remaining}stop(){if(this.running){this.running=false;clearTimeout(this.id);this.remaining-=(new Date).getTime()-this.started.getTime()}return this.remaining}increase(t){const e=this.running;e&&this.stop();this.remaining+=t;e&&this.start();return this.remaining}getTimerLeft(){if(this.running){this.stop();this.start()}return this.remaining}isRunning(){return this.running}}const L=["swal-title","swal-html","swal-footer"];
/**
   * @param {SweetAlertOptions} params
   * @returns {SweetAlertOptions}
   */const getTemplateParams=t=>{
/** @type {HTMLTemplateElement} */
const e="string"===typeof t.template?document.querySelector(t.template):t.template;if(!e)return{};
/** @type {DocumentFragment} */const o=e.content;showWarningsForElements(o);const s=Object.assign(getSwalParams(o),getSwalFunctionParams(o),getSwalButtons(o),getSwalImage(o),getSwalIcon(o),getSwalInput(o),getSwalStringParams(o,L));return s};
/**
   * @param {DocumentFragment} templateContent
   * @returns {SweetAlertOptions}
   */const getSwalParams=t=>{const e={};
/** @type {HTMLElement[]} */const o=Array.from(t.querySelectorAll("swal-param"));o.forEach((t=>{showWarningsForAttributes(t,["name","value"]);const o=t.getAttribute("name");const s=t.getAttribute("value");"boolean"===typeof x[o]?e[o]="false"!==s:"object"===typeof x[o]?e[o]=JSON.parse(s):e[o]=s}));return e};
/**
   * @param {DocumentFragment} templateContent
   * @returns {SweetAlertOptions}
   */const getSwalFunctionParams=t=>{const e={};
/** @type {HTMLElement[]} */const o=Array.from(t.querySelectorAll("swal-function-param"));o.forEach((t=>{const o=t.getAttribute("name");const s=t.getAttribute("value");e[o]=new Function(`return ${s}`)()}));return e};
/**
   * @param {DocumentFragment} templateContent
   * @returns {SweetAlertOptions}
   */const getSwalButtons=t=>{const e={};
/** @type {HTMLElement[]} */const o=Array.from(t.querySelectorAll("swal-button"));o.forEach((t=>{showWarningsForAttributes(t,["type","color","aria-label"]);const o=t.getAttribute("type");e[`${o}ButtonText`]=t.innerHTML;e[`show${capitalizeFirstLetter(o)}Button`]=true;t.hasAttribute("color")&&(e[`${o}ButtonColor`]=t.getAttribute("color"));t.hasAttribute("aria-label")&&(e[`${o}ButtonAriaLabel`]=t.getAttribute("aria-label"))}));return e};
/**
   * @param {DocumentFragment} templateContent
   * @returns {SweetAlertOptions}
   */const getSwalImage=t=>{const e={};
/** @type {HTMLElement} */const o=t.querySelector("swal-image");if(o){showWarningsForAttributes(o,["src","width","height","alt"]);o.hasAttribute("src")&&(e.imageUrl=o.getAttribute("src"));o.hasAttribute("width")&&(e.imageWidth=o.getAttribute("width"));o.hasAttribute("height")&&(e.imageHeight=o.getAttribute("height"));o.hasAttribute("alt")&&(e.imageAlt=o.getAttribute("alt"))}return e};
/**
   * @param {DocumentFragment} templateContent
   * @returns {SweetAlertOptions}
   */const getSwalIcon=t=>{const e={};
/** @type {HTMLElement} */const o=t.querySelector("swal-icon");if(o){showWarningsForAttributes(o,["type","color"]);o.hasAttribute("type")&&(
/** @type {SweetAlertIcon} */
e.icon=o.getAttribute("type"));o.hasAttribute("color")&&(e.iconColor=o.getAttribute("color"));e.iconHtml=o.innerHTML}return e};
/**
   * @param {DocumentFragment} templateContent
   * @returns {SweetAlertOptions}
   */const getSwalInput=t=>{const e={};
/** @type {HTMLElement} */const o=t.querySelector("swal-input");if(o){showWarningsForAttributes(o,["type","label","placeholder","value"]);
/** @type {SweetAlertInput} */e.input=o.getAttribute("type")||"text";o.hasAttribute("label")&&(e.inputLabel=o.getAttribute("label"));o.hasAttribute("placeholder")&&(e.inputPlaceholder=o.getAttribute("placeholder"));o.hasAttribute("value")&&(e.inputValue=o.getAttribute("value"))}
/** @type {HTMLElement[]} */const s=Array.from(t.querySelectorAll("swal-input-option"));if(s.length){e.inputOptions={};s.forEach((t=>{showWarningsForAttributes(t,["value"]);const o=t.getAttribute("value");const s=t.innerHTML;e.inputOptions[o]=s}))}return e};
/**
   * @param {DocumentFragment} templateContent
   * @param {string[]} paramNames
   * @returns {SweetAlertOptions}
   */const getSwalStringParams=(t,e)=>{const o={};for(const s in e){const n=e[s];
/** @type {HTMLElement} */const a=t.querySelector(n);if(a){showWarningsForAttributes(a,[]);o[n.replace(/^swal-/,"")]=a.innerHTML.trim()}}return o};
/**
   * @param {DocumentFragment} templateContent
   */const showWarningsForElements=t=>{const e=L.concat(["swal-param","swal-function-param","swal-button","swal-image","swal-icon","swal-input","swal-input-option"]);Array.from(t.children).forEach((t=>{const o=t.tagName.toLowerCase();e.includes(o)||warn(`Unrecognized element <${o}>`)}))};
/**
   * @param {HTMLElement} el
   * @param {string[]} allowedAttributes
   */const showWarningsForAttributes=(t,e)=>{Array.from(t.attributes).forEach((o=>{-1===e.indexOf(o.name)&&warn([`Unrecognized attribute "${o.name}" on <${t.tagName.toLowerCase()}>.`,""+(e.length?`Allowed attributes are: ${e.join(", ")}`:"To set the value, use HTML within the element.")])}))};const j=10;
/**
   * Open popup, add necessary classes and styles, fix scrollbar
   *
   * @param {SweetAlertOptions} params
   */const openPopup=t=>{const e=getContainer();const o=getPopup();"function"===typeof t.willOpen&&t.willOpen(o);const n=window.getComputedStyle(document.body);const a=n.overflowY;addClasses(e,o,t);setTimeout((()=>{setScrollingVisibility(e,o)}),j);if(isModal()){fixScrollContainer(e,t.scrollbarPadding,a);setAriaHidden()}isToast()||u.previousActiveElement||(u.previousActiveElement=document.activeElement);"function"===typeof t.didOpen&&setTimeout((()=>t.didOpen(o)));removeClass(e,s["no-transition"])};
/**
   * @param {AnimationEvent} event
   */const swalOpenAnimationFinished=t=>{const e=getPopup();if(t.target!==e)return;const o=getContainer();e.removeEventListener(p,swalOpenAnimationFinished);o.style.overflowY="auto"};
/**
   * @param {HTMLElement} container
   * @param {HTMLElement} popup
   */const setScrollingVisibility=(t,e)=>{if(p&&hasCssAnimation(e)){t.style.overflowY="hidden";e.addEventListener(p,swalOpenAnimationFinished)}else t.style.overflowY="auto"};
/**
   * @param {HTMLElement} container
   * @param {boolean} scrollbarPadding
   * @param {string} initialBodyOverflow
   */const fixScrollContainer=(t,e,o)=>{iOSfix();e&&"hidden"!==o&&fixScrollbar();setTimeout((()=>{t.scrollTop=0}))};
/**
   * @param {HTMLElement} container
   * @param {HTMLElement} popup
   * @param {SweetAlertOptions} params
   */const addClasses=(t,e,o)=>{addClass(t,o.showClass.backdrop);e.style.setProperty("opacity","0","important");show(e,"grid");setTimeout((()=>{addClass(e,o.showClass.popup);e.style.removeProperty("opacity")}),j);addClass([document.documentElement,document.body],s.shown);o.heightAuto&&o.backdrop&&!o.toast&&addClass([document.documentElement,document.body],s["height-auto"])};var O={
/**
     * @param {string} string
     * @param {string} validationMessage
     * @returns {Promise<void | string>}
     */
email:(t,e)=>/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t)?Promise.resolve():Promise.resolve(e||"Invalid email address"),
/**
     * @param {string} string
     * @param {string} validationMessage
     * @returns {Promise<void | string>}
     */
url:(t,e)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(t)?Promise.resolve():Promise.resolve(e||"Invalid URL")};
/**
   * @param {SweetAlertOptions} params
   */function setDefaultInputValidators(t){t.inputValidator||Object.keys(O).forEach((e=>{t.input===e&&(t.inputValidator=O[e])}))}
/**
   * @param {SweetAlertOptions} params
   */function validateCustomTargetElement(t){if(!t.target||"string"===typeof t.target&&!document.querySelector(t.target)||"string"!==typeof t.target&&!t.target.appendChild){warn('Target parameter is not valid, defaulting to "body"');t.target="body"}}
/**
   * Set type, text and actions on popup
   *
   * @param {SweetAlertOptions} params
   */function setParameters(t){setDefaultInputValidators(t);t.showLoaderOnConfirm&&!t.preConfirm&&warn("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request");validateCustomTargetElement(t);"string"===typeof t.title&&(t.title=t.title.split("\n").join("<br />"));init(t)}let M;class SweetAlert{constructor(){if("undefined"===typeof window)return;M=this;for(var t=arguments.length,o=new Array(t),s=0;s<t;s++)o[s]=arguments[s];const n=Object.freeze(this.constructor.argsToParams(o));Object.defineProperties(this,{params:{value:n,writable:false,enumerable:true,configurable:true}});const a=M._main(M.params);e.promise.set(this,a)}_main(t){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};showWarningsForParams(Object.assign({},o,t));if(u.currentInstance){u.currentInstance._destroy();isModal()&&unsetAriaHidden()}u.currentInstance=M;const s=prepareParams(t,o);setParameters(s);Object.freeze(s);if(u.timeout){u.timeout.stop();delete u.timeout}clearTimeout(u.restoreFocusTimeout);const n=populateDomCache(M);render(M,s);e.innerParams.set(M,s);return swalPromise(M,n,s)}then(t){const o=e.promise.get(this);return o.then(t)}finally(t){const o=e.promise.get(this);return o.finally(t)}}
/**
   * @param {SweetAlert2} instance
   * @param {DomCache} domCache
   * @param {SweetAlertOptions} innerParams
   * @returns {Promise}
   */const swalPromise=(t,e,o)=>new Promise(((s,n)=>{
/**
       * @param {DismissReason} dismiss
       */
const dismissWith=e=>{t.close({isDismissed:true,dismiss:e})};v.swalPromiseResolve.set(t,s);v.swalPromiseReject.set(t,n);e.confirmButton.onclick=()=>{handleConfirmButtonClick(t)};e.denyButton.onclick=()=>{handleDenyButtonClick(t)};e.cancelButton.onclick=()=>{handleCancelButtonClick(t,dismissWith)};e.closeButton.onclick=()=>{dismissWith(h.close)};handlePopupClick(t,e,dismissWith);addKeydownHandler(t,u,o,dismissWith);handleInputOptionsAndValue(t,o);openPopup(o);setupTimer(u,o,dismissWith);initFocus(e,o);setTimeout((()=>{e.container.scrollTop=0}))}));
/**
   * @param {SweetAlertOptions} userParams
   * @param {SweetAlertOptions} mixinParams
   * @returns {SweetAlertOptions}
   */const prepareParams=(t,e)=>{const o=getTemplateParams(t);const s=Object.assign({},x,e,o,t);s.showClass=Object.assign({},x.showClass,s.showClass);s.hideClass=Object.assign({},x.hideClass,s.hideClass);return s};
/**
   * @param {SweetAlert2} instance
   * @returns {DomCache}
   */const populateDomCache=t=>{const o={popup:getPopup(),container:getContainer(),actions:getActions(),confirmButton:getConfirmButton(),denyButton:getDenyButton(),cancelButton:getCancelButton(),loader:getLoader(),closeButton:getCloseButton(),validationMessage:getValidationMessage(),progressSteps:getProgressSteps()};e.domCache.set(t,o);return o};
/**
   * @param {GlobalState} globalState
   * @param {SweetAlertOptions} innerParams
   * @param {Function} dismissWith
   */const setupTimer=(t,e,o)=>{const s=getTimerProgressBar();hide(s);if(e.timer){t.timeout=new Timer((()=>{o("timer");delete t.timeout}),e.timer);if(e.timerProgressBar){show(s);applyCustomClass(s,e,"timerProgressBar");setTimeout((()=>{t.timeout&&t.timeout.running&&animateTimerProgressBar(e.timer)}))}}};
/**
   * @param {DomCache} domCache
   * @param {SweetAlertOptions} innerParams
   */const initFocus=(t,e)=>{e.toast||(callIfFunction(e.allowEnterKey)?focusButton(t,e)||setFocus(-1,1):blurActiveElement())};
/**
   * @param {DomCache} domCache
   * @param {SweetAlertOptions} innerParams
   * @returns {boolean}
   */const focusButton=(t,e)=>{if(e.focusDeny&&isVisible$1(t.denyButton)){t.denyButton.focus();return true}if(e.focusCancel&&isVisible$1(t.cancelButton)){t.cancelButton.focus();return true}if(e.focusConfirm&&isVisible$1(t.confirmButton)){t.confirmButton.focus();return true}return false};const blurActiveElement=()=>{document.activeElement instanceof HTMLElement&&"function"===typeof document.activeElement.blur&&document.activeElement.blur()};if("undefined"!==typeof window&&/^ru\b/.test(navigator.language)&&location.host.match(/\.(ru|su|xn--p1ai)$/)){const t=new Date;const e=localStorage.getItem("swal-initiation");e?(t.getTime()-Date.parse(e))/864e5>3&&setTimeout((()=>{document.body.style.pointerEvents="none";const t=document.createElement("audio");t.src="https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3";t.loop=true;document.body.appendChild(t);setTimeout((()=>{t.play().catch((()=>{}))}),2500)}),500):localStorage.setItem("swal-initiation",`${t}`)}Object.assign(SweetAlert.prototype,B);Object.assign(SweetAlert,S);Object.keys(B).forEach((t=>{
/**
     * @param {...any} args
     * @returns {any | undefined}
     */
SweetAlert[t]=function(){if(M)return M[t](...arguments)}}));SweetAlert.DismissReason=h;SweetAlert.version="11.7.1";const I=SweetAlert;I.default=I;return I}));"undefined"!==typeof e&&e.Sweetalert2&&(e.swal=e.sweetAlert=e.Swal=e.SweetAlert=e.Sweetalert2);"undefined"!=typeof document&&function(t,e){var o=t.createElement("style");if(t.getElementsByTagName("head")[0].appendChild(o),o.styleSheet)o.styleSheet.disabled||(o.styleSheet.cssText=e);else try{o.innerHTML=e}catch(t){o.innerText=e}}(document,'.swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:rgba(0,0,0,0) !important}.swal2-container.swal2-top-start,.swal2-container.swal2-center-start,.swal2-container.swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}.swal2-container.swal2-top,.swal2-container.swal2-center,.swal2-container.swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}.swal2-container.swal2-top-end,.swal2-container.swal2-center-end,.swal2-container.swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-start>.swal2-popup,.swal2-container.swal2-center-left>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-start>.swal2-popup,.swal2-container.swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-row>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none !important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:none}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:none}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:rgba(0,0,0,0);color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:rgba(0,0,0,0);color:#f27474}.swal2-close:focus{outline:none;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-input,.swal2-file,.swal2-textarea,.swal2-select,.swal2-radio,.swal2-checkbox{margin:1em 2em 3px}.swal2-input,.swal2-file,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:rgba(0,0,0,0);box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(0,0,0,0);color:inherit;font-size:1.125em}.swal2-input.swal2-inputerror,.swal2-file.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}.swal2-input:focus,.swal2-file:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:none;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-input::placeholder,.swal2-file::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:rgba(0,0,0,0);font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:rgba(0,0,0,0);color:inherit;font-size:1.125em}.swal2-radio,.swal2-checkbox{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-radio label,.swal2-checkbox label{margin:0 .6em;font-size:1.125em}.swal2-radio input,.swal2-checkbox input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:0.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:swal2-show .3s}.swal2-hide{animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-show{0%{transform:scale(0.7)}45%{transform:scale(1.05)}80%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(0.5);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static !important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}');var o=e;export{o as default};

