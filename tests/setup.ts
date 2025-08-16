import '@testing-library/jest-dom'

declare global {
  var IntersectionObserver: typeof IntersectionObserver
  var ResizeObserver: typeof ResizeObserver
}

// Mock IntersectionObserver
globalThis.IntersectionObserver = class IntersectionObserver {
  root: globalThis.Element | null = null
  rootMargin: string = '0px'
  thresholds: ReadonlyArray<number> = [0]

  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords(): globalThis.IntersectionObserverEntry[] {
    return []
  }
}

// Mock ResizeObserver
globalThis.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock next/router
globalThis.jest.mock('next/router', () => ({
  useRouter: () => ({
    push: globalThis.jest.fn(),
    replace: globalThis.jest.fn(),
    prefetch: globalThis.jest.fn(),
    back: globalThis.jest.fn(),
    reload: globalThis.jest.fn(),
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}))

// Mock next/navigation
globalThis.jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: globalThis.jest.fn(),
    replace: globalThis.jest.fn(),
    prefetch: globalThis.jest.fn(),
    back: globalThis.jest.fn(),
    forward: globalThis.jest.fn(),
    refresh: globalThis.jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new globalThis.URLSearchParams(),
}))
