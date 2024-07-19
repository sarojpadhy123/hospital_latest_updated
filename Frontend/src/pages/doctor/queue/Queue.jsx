import React, { useEffect, useState } from "react";
import ReactPagination from "../../../components/ReactPagination";
import DoctorSidebar from "../../../components/sidebars/DoctorSidebar";
import axios from "../../../services/axios";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import {
  DeleteButton,
  EditButton,
  ViewButton,
  Button,
  Input,
  SearchInput,
  Select,
  OptionsTd,
  OptionsTh,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  FormLayout,
  Tabs,
  Textarea,
  IndexNo,
  TotalNo,
} from "../../../components";

function Queue() {
  const [queue, setQueue] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function getQueue() {
    axios
      .get("/queue")
      .then((response) => {
        setQueue(response.data);
      })
      .catch((response) => {
        toast.error(response.data);
      });
  }

  useEffect(() => {
    getQueue();
  }, []);

  // SEARCH
  const search = (data) => {
    axios.get(`/queue?q=${data}`).then((response) => {
      setQueue(response.data);
      setCurrentPage(1);
    });
  };

  // PAGINATION
  // Get Current Posts
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = queue.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(queue.length / postsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  return (
    <DoctorSidebar>
      {" "}
      <div className="p-4 bg-gray-100">
        <div className="mb-4 lg:mb-6 flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-4 lg:mb-0 w-full lg:w-1/3">
              <SearchInput onSearch={search} />
            </div>
          <div className="items-center flex flex-col lg:flex-row">
            <TotalNo totalnumber={queue?.length} />
            <ReactPagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
   <div className="overflow-x-auto">
   <Table>
          <Thead>
            <IndexNo>#</IndexNo>
            <Th>Patient Name</Th>
            <OptionsTh>Options</OptionsTh>
          </Thead>
          {currentPosts.map((queue, i) => {
            return (
              <Tbody key={i}>
                <Td>{i + 1 * (currentPage * postsPerPage - 9)}</Td>
                <Td>{queue?.name}</Td>
                <OptionsTd>
                  <DeleteButton
                    path={"queue"}
                    id={queue?._id}
                    record={getQueue}
                  >
                    Delete
                    <MdDeleteForever />
                  </DeleteButton>
                </OptionsTd>
              </Tbody>
            );
          })}
        </Table>
   </div>
      </div>
    </DoctorSidebar>
  );
}

export default Queue;
