import React, { useEffect, useState } from "react";
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
import {
  ArrowUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import axios from "axios";

export const Tablee = () => {
  const [tableData, setTableData] = useState();
  const [sortEmail, setSortEmail] = useState("");
  const [sortGender, setSortGender] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/user?sortByEmail=${sortEmail}&sortByGender=${sortGender}&page=${page}&limit=10`
      )
      .then((res) => {
        console.log(res.data);
        setTableData(res.data.users);
        setPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      });
  }, [sortEmail, sortGender, page]);
  function sortEmailFunc() {
    if (sortEmail == "") {
      setSortEmail("asc");
      setSortGender("");
    } else if (sortEmail == "asc") {
      setSortEmail("desc");
      setSortGender("");
    } else {
      setSortEmail("");
      setSortGender("");
    }
  }
  function sortGenderFunc() {
    if (sortGender == "") {
      setSortGender("asc");
      setSortEmail("");
    } else if (sortGender == "asc") {
      setSortGender("desc");
      setSortEmail("");
    } else {
      setSortGender("");
      setSortEmail("");
    }
  }
  let paginationButtonEnable = {
    border: "1px solid grey",
    backgroundColor: "purple",
    color: "white",
    width: "30px",
    borderRadius: "5px",
  };
  let paginationButtonDisable = {
    border: "1px solid grey",
    backgroundColor: "#8b6b96",
    color: "white",
    width: "30px",
    borderRadius: "5px",
    cursor:'not-allowed'
  }
  // console.log(tableData);
  return (
    <div>
      <TableContainer maxWidth="80%" margin="auto" border="1px solid gray.200">
        <Table variant="simple">
          <Thead bg="gray.100">
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>
                Email{" "}
                <ArrowUpDownIcon cursor="pointer" onClick={sortEmailFunc} />
              </Th>
              <Th>
                Gender{" "}
                <ArrowUpDownIcon cursor="pointer" onClick={sortGenderFunc} />
              </Th>
            </Tr>
          </Thead>
          {tableData?.map((el) => (
            <Tbody key={el._id}>
              <Tr>
                <Td>{el.first_name}</Td>
                <Td>{el.last_name}</Td>
                <Td>{el.email}</Td>
                <Td>{el.gender}</Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </TableContainer>
      <div>
        <h3>
          Page {page} of <label style={{ color: "grey" }}>{totalPages}</label>
        </h3>
        <button
          style={page == 1 ? paginationButtonDisable : paginationButtonEnable}
          disabled={page == 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <ChevronLeftIcon />
        </button>
        <button
          style={page == totalPages ? paginationButtonDisable : paginationButtonEnable}
          disabled={page == totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};
