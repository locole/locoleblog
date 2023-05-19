import { async } from "@firebase/util";
import { collection, deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postStatus } from "../../../Contants";
import { db } from "../../../FireBase/FireBase-config";
import LabelStatus from "../../Label/LabelStatus";
import { Table } from "../../table";
import { ActionDelete, ActionEdit, ActionView } from "../Action";
import DashboardHeading from "../DashBoard/DashboardHeading";

const PostManage = () => {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();
  const renderPostStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case postStatus.REJECTED:
        return <LabelStatus type="danger">Rejected</LabelStatus>;

      default:
        break;
    }
  };
  const handleSearchPost = () => {
    
  }
const handleDeletePost =async (id) => {
    const postRef = doc(db,"posts",id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(postRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
}
  
  useEffect(() => {
    const getPostData = () => {
      const colRef = collection(db, "posts");
      onSnapshot(colRef, (onsnapshot) => {
        let results = [];
        onsnapshot.forEach((item) => {
          results.push({
            id: item.id,
            ...item.data(),
          });
        });

        setPostList(results);
      });
    };
    getPostData();
  }, []);
  console.log(postList);
  return (
    <div>
      <DashboardHeading
        title="All posts"
        desc="Manage all posts"
      ></DashboardHeading>
      <div className="flex justify-end gap-5 mb-10">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
            onChange={handleSearchPost}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td className="">
                  <div className="w-[500px] items-center  flex gap-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1682754089073-59443f56234f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
                      alt=""
                      className="w-[55px] h-[55px] rounded object-cover"
                    />
                    <div className="flex-col">
                      <h3 className="text-sm font-semibold">{post.title}</h3>
                      <time className="text-sm text-gray-500">12/12/23</time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{post.categoriesId}</span>
                </td>
                <td>
                  <span className="text-gray-500">{post.author}</span>
                </td>
                <td>{renderPostStatus(2)}</td>
                <td>
                  <div className="flex items-center text-gray-500 gap-x-3">
                    <ActionView onClick={() => {
                        navigate(`/${post.slug}`)
                    }}></ActionView>
                    <ActionEdit onClick={() =>
                          navigate(`/update-post?id=${post.id}`)
                        }></ActionEdit>
                    <ActionDelete onClick={() => handleDeletePost(post.id)}></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostManage;
