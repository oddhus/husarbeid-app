import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { chakra, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import React from "react";
import { useTable, useSortBy, TableInstance, Column } from "react-table";
import { FamilyTaskInfoFragment } from "../../generated/graphql";

interface TaskboardProps {
  data: FamilyTaskInfoFragment[];
}

export const Taskboard = ({ data }: TaskboardProps) => {
  const columns = React.useMemo(
    () =>
      [
        {
          Header: "Description",
          accessor: "shortDescription",
        },
        {
          Header: "Created On",
          accessor: (row) =>
            formatDistance(new Date(row.createdOn), new Date(), {
              addSuffix: true,
            }),
        },
        {
          Header: "Payment",
          accessor: "payment",
          isNumeric: true,
        },
        {
          Header: "Completed",
          accessor: (row) => (row.isCompleted ? "Yes" : "No"),
        },
      ] as Column<FamilyTaskInfoFragment>[],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render("Header")}
                <chakra.span pl="4">
                  {column.isSorted && column.isSortedDesc && (
                    <TriangleDownIcon aria-label="sorted descending" />
                  )}
                  {column.isSorted && !column.isSortedDesc && (
                    <TriangleUpIcon aria-label="sorted ascending" />
                  )}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell: any) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
