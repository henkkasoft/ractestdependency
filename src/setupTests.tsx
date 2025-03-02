import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(async () => {
  cleanup();
  vi.clearAllMocks();
});
