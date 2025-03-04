import { vi, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ComboBox from './ComboBox';

test('cleanup not clear document.body.innerHTML', async () => {
  const label = 'testLabel';
  const items = [
    { id: '1', name: 'one' },
    { id: '2', name: 'two' },
    { id: '3', name: 'three' },
    { id: '4', name: 'four' },
  ];
  const onChange = vi.fn();
  render(<ComboBox label={label} items={items} onSelectionChange={onChange} selectedKey={items[2].id} />);

  const labeledElements = screen.getAllByLabelText(label);
  expect(labeledElements).length(2);
  const input = labeledElements[0];
  expect(input).toBeInstanceOf(HTMLInputElement);
  expect(input).toHaveValue(items[2].name);
  const openButton = labeledElements[1];
  expect(openButton).toBeInstanceOf(HTMLButtonElement);
  fireEvent.click(openButton);

  expect(onChange).toBeCalledTimes(0);
});
