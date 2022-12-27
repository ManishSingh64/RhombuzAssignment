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
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import {
  ArrowUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import axios from "axios";

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
  cursor: "not-allowed",
};
export const Tablee = () => {
  const toast = useToast();
  const [tableData, setTableData] = useState();
  const [sortEmail, setSortEmail] = useState("");
  const [sortGender, setSortGender] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [status,setStatus] = useState(false)
  const [selectedRows, setSelectedRows] = useState();

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/user?sortByEmail=${sortEmail}&sortByGender=${sortGender}&page=${page}&limit=10`
      )
      .then((res) => {
        // console.log(res.data);
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
  function deleteRowFunc(el) {
    axios.delete(`http://localhost:8080/user/${el._id}`).then((res) => {
      axios
        .get(
          `http://localhost:8080/user?sortByEmail=${sortEmail}&sortByGender=${sortGender}&page=${page}&limit=10`
        )
        .then((res) => {
          setTableData(res.data.users);
          setPage(res.data.currentPage);
          setTotalPages(res.data.totalPages);
        });
    });

    return toast({
      title: "Row Deleted",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }
  function copyClipboardFunc(value) {
    navigator.clipboard.writeText(value);
    return toast({
      title: "Copied To Clipboard",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }
  function selectRowsFunc(el) {
    setStatus((prev) => !prev)
    if(status){
      console.log(el)
    }
  }
  // console.log(tableData);
  return (
    <div>
      <TableContainer maxWidth="80%" margin="auto" border="1px solid gray.200">
        <Table variant="simple">
          <Thead bg="gray.100">
            <Tr>
              <Th>Select</Th>
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
              <Th>Delete</Th>
            </Tr>
          </Thead>
          {tableData?.map((el) => (
            <Tbody key={el._id}>
              <Tr>
                <Td>
                  <Checkbox
                    colorScheme="red"
                    onChange={(el) => selectRowsFunc(el)}
                  ></Checkbox>
                </Td>
                <Td>
                  {el.first_name}{" "}
                  <CopyIcon style={{cursor:'copy'}} onClick={() => copyClipboardFunc(el.first_name)} />
                </Td>
                <Td>
                  {el.last_name}{" "}
                  <CopyIcon style={{cursor:'copy'}} onClick={() => copyClipboardFunc(el.last_name)} />
                </Td>
                <Td>
                  {el.email}{" "}
                  <CopyIcon style={{cursor:'copy'}} onClick={() => copyClipboardFunc(el.email)} />
                </Td>
                <Td>
                  {el.gender}{" "}
                  <CopyIcon style={{cursor:'copy'}} onClick={() => copyClipboardFunc(el.gender)} />
                </Td>
                <Td>
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteRowFunc(el)}
                  />
                </Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </TableContainer>
      <br />
      <div>
        <h3>
          Page {page} of <label style={{ color: "grey" }}>{totalPages}</label>
        </h3>
        <br />
        <button
          style={page == 1 ? paginationButtonDisable : paginationButtonEnable}
          disabled={page == 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <ChevronLeftIcon />
        </button>
        <vr />
        <button
          style={
            page == totalPages
              ? paginationButtonDisable
              : paginationButtonEnable
          }
          disabled={page == totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};
