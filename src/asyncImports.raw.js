void (async ()=>{
    // load deps from edge
    const hybridsURL = 'https://www.unpkg.com/hybrids@8.0.8/src/index.js'
    globalThis.hybrids = await import(hybridsURL)

    // load local modules
    await import('./flex-row.js')
    

    // load stylizer
    const unocssURL = 'https://cdn.jsdelivr.net/npm/@unocss/runtime/attributify.global.js'
    globalThis.__unocss = {
      // rules: [
      //   // custom rules...
      // ],
      // presets: [
      //   // custom presets...
      // ],
      shortcuts: [
        {
          'frow-g2': 'flex flex-row justify-between gap-2',
          'fcol-g2': 'flex flex-col justify-around gap-2',
          'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
        },
        // dynamic shortcuts:
        // [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
      ]
    }

    const initUnocssRuntime = await import(unocssURL)

    const { __unocss_runtime: unoRuntime } = globalThis
    console.log({unoRuntime, initUnocssRuntime, globalThis})
     
    /**
     * TODO try:
     * https://github.com/unocss/unocss/tree/main/packages/preset-icons/
     */
  })()