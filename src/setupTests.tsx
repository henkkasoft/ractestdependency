import '@testing-library/jest-dom/vitest';
import { afterEach, expect, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(async () => {
  cleanup();
  vi.clearAllMocks();
  expect(document.body.innerHTML).toBe('');
});
