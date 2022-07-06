let { define, html } = globalThis?.hybrids ?? {} // import { define,html } from 'hybrids'; // will be async imported

const classDefaults = 'h-fit w-fit frow-g2'
const childrenClassAdditions = 'h-fit b-1 p-2'
const FlexRow = {
  tag: 'flex-row',
  
  class: '', 
  'classafter': `gap-2`, // be aware trumping may not work as you expect it to (based on the order of rule _definition_ NOT application order)

  content: (host) => {
    const { children, classafter = '' } = host

    host.classList.add(...classDefaults.split(' '), ...classafter.split(' ')) 

    return html`
      ${[...children].map(item => {
        item.classList.add(...childrenClassAdditions.split(' ')) 
        console.log({item, cn: item.className})
        return item
      })}
    `
  },
}

if(globalThis.hybrids){
  define(FlexRow)
}

void (async ()=>{
  // const hybridsModule = await import('https://www.unpkg.com/hybrids@8.0.8/src/index.js')
  // console.log(hybridsModule)

  // console.log(define === globalThis.hybrids?.define, {define, globalThis},'before' )
  if(!globalThis.hybrids){
    const url = 'https://www.unpkg.com/hybrids@8.0.8/src/index.js'
    globalThis.hybrids = await import(url)
    console.log('fetch needed in flex-row')
    ;( { define, html } = globalThis.hybrids) // destructuring onto pre initialized vars needs this funny ;(syntax) // https://flaviocopes.com/javascript-destructure-object-to-existing-variable/
    // console.log({define, globalThis}, define === globalThis.hybrids.define )
    define(FlexRow)
  } 
  
})()