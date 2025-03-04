import { ComboBox as RAComboBox, Button, Popover, Input, ListBox, ListBoxItem, Label } from 'react-aria-components';

export type Item = {
  id: string;
  name: string;
};

export interface ComboBoxProps {
  label: string;
  items: Item[] | undefined;
  selectedKey?: string;
  onSelectionChange: (id: string) => void;
}

function ComboBox({
  label,
  items = [],
  selectedKey,
  onSelectionChange,
}: Readonly<ComboBoxProps>) {

  return (
    <RAComboBox
      selectedKey={selectedKey ?? ''}
      onSelectionChange={(key) => {
        if (typeof key === 'number') onSelectionChange(key.toString());
        if (typeof key === 'string') onSelectionChange(key);
      }}
      aria-label={label}
      menuTrigger="focus"
    >
      <Label>{label}</Label>
      <div>
        <Input />
        <Button>
          <span aria-hidden="true" />
        </Button>
      </div>
      <Popover>
        <ListBox items={items}>
          {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
        </ListBox>
      </Popover>
    </RAComboBox>
  );
}

export default ComboBox;
