import { expect, test } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Table, { Row } from './Table';

test('table 1', async () => {
  const columnStructures = [{ id: 'BBB', header: 'BBB', show: true, rowHeader: true }];
  const rows = [] as Row[];
  render(<Table columnStructures={columnStructures} rows={rows} ariaLabel="test1" />);

  const rowElements = screen.getAllByRole('row');
  expect(rowElements).toHaveLength(1);

  // If next 3 lines are uncommented the next test starts to pass?
  // const columnheaders = within(rowElements[0]).getAllByRole('columnheader');
  // const columnButton = within(columnheaders[0]).getByRole('button');
  // fireEvent.click(columnButton);
});

test('starts to fail if above 3 lines are commented', async () => {
  const columnStructures = [
    { id: 'AA', header: 'AA' },
    { id: 'BB', header: 'BB', show: true, rowHeader: true },
  ];
  const rows = [{ id: '1', cells: ['A1', 'B1'] }];

  render(<Table columnStructures={columnStructures} rows={rows} ariaLabel="test2" />);

  const rowElements = screen.getAllByRole('row');
  expect(rowElements).toHaveLength(2);
  let columnheaders = within(rowElements[0]).getAllByRole('columnheader');
  const columnButton = within(columnheaders[0]).getByRole('button');
  fireEvent.click(columnButton);
  const selectionButton = await screen.findByRole('menuitemcheckbox', { name: columnStructures[0].header });
  fireEvent.click(selectionButton);
  fireEvent.keyDown(selectionButton, { key: 'Escape', code: 'Escape' });

  const rowElements2 = screen.getAllByRole('row');
  columnheaders = within(rowElements2[0]).getAllByRole('columnheader');
  expect(columnheaders).toHaveLength(2);
});
