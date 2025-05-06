import '@testing-library/jest-dom'; // Extends jest with extra matchers
import { vi } from 'vitest';

// Mock global intersection observer
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock the global fetch API with Vitest
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);
