import {
  Column,
  Table as RATable,
  TableBody,
  TableHeader,
  Button,
  MenuTrigger,
  Popover,
  Menu,
  MenuItem,
  Row as RARow,
  Cell,
} from 'react-aria-components';
import { useMemo, useState } from 'react';

export type ColumnStructure = {
  id: string;
  header: string;
  show?: boolean;
  rowHeader?: boolean;
};

export type Row = {
  id: string;
  cells: string[];
};

export interface TableProps {
  columnStructures: ColumnStructure[];
  rows: Row[];
  ariaLabel: string;
}

function Table({ rows, columnStructures, ariaLabel }: Readonly<TableProps>) {
  const [finalColumnStructures, setFinalColumnStructures] = useState<ColumnStructure[]>([...columnStructures]);

  const filteredColumnStructures = useMemo(() => {
    return finalColumnStructures.filter((item) => item.show);
  }, [finalColumnStructures]);

  const filteredRows = useMemo(() => {
    return rows.map((row) => {
      const filteredCells = row.cells.filter((_cell, cellIndex) => finalColumnStructures[cellIndex]?.show);
      return { id: row.id, cells: filteredCells };
    });
  }, [rows, finalColumnStructures]);

  const renderColumnButton = (header: string) => {
    return (
      <MenuTrigger>
        <Button>{header}</Button>
        <Popover>
          <Menu
            selectionMode="multiple"
            selectedKeys={filteredColumnStructures.map((selected) => selected.header)}
            onAction={(selected) => {
              const updatedArray = [...finalColumnStructures];
              const selectedIndex = updatedArray.findIndex((i) => i.header === selected);
              if (selectedIndex !== -1) {
                updatedArray[selectedIndex].show = !updatedArray[selectedIndex].show;
                setFinalColumnStructures(updatedArray);
              }
            }}
            items={columnStructures}
          >
            {(menuItem) => <MenuItem>{menuItem.header}</MenuItem>}
          </Menu>
        </Popover>
      </MenuTrigger>
    );
  };

  return (
    <RATable aria-label={ariaLabel}>
      <TableHeader>
        {filteredColumnStructures.map((item) => {
          return (
            <Column key={item.header} isRowHeader={item.rowHeader}>
              <div>{renderColumnButton(item.header)}</div>
            </Column>
          );
        })}
      </TableHeader>
      <TableBody items={filteredRows}>
        {(row) => {
          return (
            <RARow
              columns={row.cells.map((cell) => {
                return { id: cell };
              })}
            >
              {(cell) => <Cell>{cell.id}</Cell>}
            </RARow>
          );
        }}
      </TableBody>
    </RATable>
  );
}

export default Table;
