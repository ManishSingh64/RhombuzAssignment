import React, { useState } from "react";
import data from "../db.json";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import {ArrowUpDownIcon} from '@chakra-ui/icons'

export const Tablee = () => {
  const [tableData, setTableData] = useState(data);

  console.log(tableData);
  return (
    <div>
      <TableContainer maxWidth="80%" margin="auto" border='1px solid gray.200'>
        <Table variant="simple">
          <Thead bg='gray.100'>
            <Tr>
              <Th>First Name <ArrowUpDownIcon cursor='pointer' /></Th>
              <Th>Last Name <ArrowUpDownIcon cursor='pointer'/></Th>
              <Th>Email <ArrowUpDownIcon cursor='pointer'/></Th>
              <Th>Gender <ArrowUpDownIcon cursor='pointer'/></Th>
            </Tr>
          </Thead>
          {tableData.map((el) => (
            <Tbody>
              <Tr>
                <Td >{el.first_name}</Td>
                <Td >{el.last_name}</Td>
                <Td >{el.email}</Td>
                <Td >{el.gender}</Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};
