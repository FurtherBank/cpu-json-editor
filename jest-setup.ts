import '@testing-library/jest-dom'
import 'umi/test-setup'

import React from 'react'
// import { _rs as onLibResize } from 'rc-resize-observer/lib/utils/observerUtil';
// import { _rs as onEsResize } from 'rc-resize-observer/es/utils/observerUtil';

// eslint-disable-next-line no-console
console.log('Current React Version:', React.version)

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useLayoutEffect: jest.requireActual('react').useEffect,
// }));

/* eslint-disable global-require */
if (typeof window !== 'undefined') {
  global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth
    global.window.innerHeight = height || global.window.innerHeight
    global.window.dispatchEvent(new Event('resize'))
  }
  global.window.scrollTo = () => {}
  // ref: https://github.com/ant-design/ant-design/issues/18774
  if (!window.matchMedia) {
    Object.defineProperty(global.window, 'matchMedia', {
      value: jest.fn((query) => ({
        matches: query.includes('max-width'),
        addListener: jest.fn(),
        removeListener: jest.fn()
      }))
    })
  }

  // Fix css-animation or rc-motion deps on these
  // https://github.com/react-component/motion/blob/9c04ef1a210a4f3246c9becba6e33ea945e00669/src/util/motion.ts#L27-L35
  // https://github.com/yiminghe/css-animation/blob/a5986d73fd7dfce75665337f39b91483d63a4c8c/src/Event.js#L44
  window.AnimationEvent = window.AnimationEvent || window.Event
  window.TransitionEvent = window.TransitionEvent || window.Event
}

console.log(`cpu-pro: 已使用 ${__filename} 作为 jest setup 文件。`)
