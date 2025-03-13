import '@testing-library/jest-dom/vitest';
import { afterEach, expect, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { destroyAnnouncer } from '@react-aria/live-announcer';

afterEach(async () => {
  cleanup();
  vi.clearAllMocks();
  destroyAnnouncer();
  expect(document.body.innerHTML).toBe('');
});
