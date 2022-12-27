import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
let active = {
  backgroundColor: "#98bbed",
};
let inactive = {
  backgroundColor: "white",
};
export const Tablee = () => {
  const toast = useToast();
  const [tableData, setTableData] = useState();
  const [sortEmail, setSortEmail] = useState("");
  const [sortGender, setSortGender] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selected, setSelected] = useState([]);
  const [searchparams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      sortEmail,
      sortGender,
      page,
      limit: 10,
    });
    axios
      .get(
        `https://rhombuzdata.onrender.com/user?sortByEmail=${sortEmail}&sortByGender=${sortGender}&page=${page}&limit=10`
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
    axios
      .delete(`https://rhombuzdata.onrender.com/user/${el._id}`)
      .then((res) => {
        axios
          .get(
            `https://rhombuzdata.onrender.com/user?sortByEmail=${sortEmail}&sortByGender=${sortGender}&page=${page}&limit=10`
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
    if (!selected.includes(el._id)) {
      setSelected([...selected, el._id]);
    } else {
      const index = selected.indexOf(el);
      selected.splice(index, 1);
      setSelected([...selected]);
    }
  }
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
              <Tr style={selected.includes(el._id) ? active : inactive}>
                <Td>
                  <Checkbox
                    colorScheme="red"
                    onChange={() => selectRowsFunc(el)}
                  ></Checkbox>
                </Td>
                <Td>
                  {el.first_name}{" "}
                  <CopyIcon
                    style={{ cursor: "copy" }}
                    onClick={() => copyClipboardFunc(el.first_name)}
                  />
                </Td>
                <Td>
                  {el.last_name}{" "}
                  <CopyIcon
                    style={{ cursor: "copy" }}
                    onClick={() => copyClipboardFunc(el.last_name)}
                  />
                </Td>
                <Td>
                  {el.email}{" "}
                  <CopyIcon
                    style={{ cursor: "copy" }}
                    onClick={() => copyClipboardFunc(el.email)}
                  />
                </Td>
                <Td>
                  {el.gender}{" "}
                  <CopyIcon
                    style={{ cursor: "copy" }}
                    onClick={() => copyClipboardFunc(el.gender)}
                  />
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
