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
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    reload: jest.fn(),
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new globalThis.URLSearchParams(),
}))
