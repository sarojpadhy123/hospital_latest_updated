import React, { useEffect, useState, useContext } from "react";
import {
  DeleteButton,
  EditButton,
  Button,
  Input,
  SearchInput,
  AdminSidebar,
  OptionsTd,
  OptionsTh,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  FormLayout,
  Tabs,
  TotalNo,
} from "../../../components";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import ReactPagination from "../../../components/ReactPagination";
import { loginContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import ButtonPreloader from "../../../components/ButtonPreloader";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Departments() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(loginContext);
  const admin = user?.role === "admin";
  const navigate = useNavigate();

  function getDepartment() {
    axios
      .get("/department")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }

  // READ
  useEffect(() => {
    getDepartment();
  }, []);

  // CREATE
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/department", {
        name,
        description,
      })
      .then((res) => {
        setLoading(false);
        getDepartment();
        toast.success(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  // SEARCH
  const searchDepartment = (data) => {
    axios.get(`department?q=${data}`).then((response) => {
      setDepartments(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = departments.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(departments.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
    <AdminSidebar>
      <Tabs
        label1="Departments"
        content1={
          <div>
            <div className="mb-4 lg:mb-6 flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-4 lg:mb-0 w-full lg:w-1/3">
                <SearchInput onSearch={searchDepartment} />
              </div>
  
              <div className="flex flex-col lg:flex-row items-center">
                <TotalNo totalnumber={departments?.length} />
                <ReactPagination
                  pageCount={pageCount}
                  handlePageClick={handlePageClick}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Th>#</Th>
                  <Th>Departments</Th>
                  <Th>Description</Th>
                  <OptionsTh>Options</OptionsTh>
                </Thead>
                {currentPosts.map((department, i) => (
                  <Tbody key={i}>
                    <Td data-label="#">
                      {i + 1 + (currentPage - 1) * postsPerPage}
                    </Td>
                    <Td data-label="Departments">{department?.name}</Td>
                    <Td data-label="Description">{department?.description}</Td>
                    <OptionsTd data-label="Options">
                      <EditButton
                        editFunction={`/admin/edit_department?edit=${department?._id}`}
                      >
                        Edit
                      </EditButton>
                      <DeleteButton
                        path={"department"}
                        id={department?._id}
                        record={getDepartment}
                      >
                        Delete
                      </DeleteButton>
                    </OptionsTd>
                  </Tbody>
                ))}
              </Table>
            </div>
          </div>
        }
        label2="Add Department"
        content2={
          <FormLayout formName="ADD DEPARTMENT">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  label={"Department"}
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <Input
                  label={"Description"}
                  type="text"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <Button>
                {loading ? <ButtonPreloader /> : "Add Department"}
              </Button>
            </form>
          </FormLayout>
        }
      />
    </AdminSidebar>
  </>
  
  
  
  );
}

export default Departments;
