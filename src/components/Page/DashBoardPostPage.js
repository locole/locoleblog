import React, { useMemo } from "react";
import styled from "styled-components";
import { Field } from "../Field";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import Label from "../Label/Label";
import { ImageUpload } from "../Image";
import { useEffect } from "react";
import { Button } from "../Button";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useState } from "react";
import { getValue } from "@testing-library/user-event/dist/utils";
import Radio from "../Radio/Radio";
import { postStatus } from "../../Contants";
import Toogle from "../Toogle/Toogle";
import Option from "../Dropdown/Option";
import { Dropdown } from "../Dropdown";
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../FireBase/FireBase-config";
import { async } from "@firebase/util";
import PostItem from "../module/Post/PostItem";
import ReactQuill,{Quill} from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import ImageUploader from "quill-image-uploader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
Quill.register("modules/imageUploader", ImageUploader);
const DashBoardPostPageStyles = styled.div`
  /* background-color: #eee; */
`;
const DashBoardPostPage = () => {
  const storage = getStorage(); // create a root storage
  const [categories, setCategories] = useState([]);
  const [content , setContent ] = useState("");
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        // imgbbAPI
        upload: async (file) => {
          console.log("upload: ~ file", file);
          const bodyFormData = new FormData();
          console.log("upload: ~ bodyFormData", bodyFormData);
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=b4bb2b45e52ad1154f2aeba1484116db",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );

  // const [progress , setProgress ] = useState();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [toogle, setToogle] = useState(false);
  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    mode: "onchange",
    defaultValues: {
      title: "",
      slug: "",
      picture: "",
      author: "",
      status: "",
      hot: false,
      categoriesId:"", 
      categoriesName:"",
      content: "",
      userId:""
    },
  });
  // console.log(categories);
  const watchStatus = watch("status");
  const {userInfo } = useAuth();
  console.log(userInfo)
  useEffect(() => {
    document.title = "MUVN Blog DashBoard";
    const getData = async () => {
     await getDocs(collection(db, "categories")).then((value) => {
      let result = [];
      value.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data()
        })
      });
      setCategories(result);
     
     })
    }
    getData();
  }, []);
  const handleChangeContent = (value) => {
   setContent(value);
   setValue("content", value);
  }
  
 
  const handleUploadImage = (file) => {
    const storageRef = ref(storage, "images/" + file.name);
    // create a reference to 'images' + file.name
    const uploadTask = uploadBytesResumable(storageRef, file); // tien hanh upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImage(url);
          setValue("picture",url);
        });
      }
    );
  };
  const handleSelectImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    handleUploadImage(file);
  };
  const handleDeleteImage = () => {
    const image_name = getValues("picture").name;
    const imageRef = ref(storage, "images/" + image_name);
    deleteObject(imageRef)
      .then(() => {
        console.log("Delete successfully");
        setImage("");
      })
      .catch((error) => {
        console.log("Delete failed " + error);
      });
  };
  const handleSetHot = () => {
    setValue("hot", !toogle);
    setToogle(!toogle);
    console.log(toogle);
  };
  const handleCreatePost = async (values) => {
   const colRef = collection(db, "posts");
   
   await addDoc(colRef, {...values,
  authorUID: userInfo.uid,
  createdAt: serverTimestamp()}).then(() => {
    toast.success("Create post successfully!!!");
    navigate(`/${values.slug}`);
   })
   .catch((error) => {
    console.log(error);
    toast.error("Create post failed!!!")
   })
  };
  return (
    <DashBoardPostPageStyles>
      <h2 className="text-2xl font-semibold text-[#2EBAC1] m-6">
        Add new post
      </h2>
      <form
        action=""
        onSubmit={handleSubmit(handleCreatePost)}
        className="post"
      >
        <div className="grid gap-7">
          <div className="grid grid-cols-2 gap-12 post-title">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                control={control}
                name="title"
                type="text"
                placeholder="Title"
              ></Input>
            </Field>
            <Field>
              <Label htmlFor="slug">Slug</Label>
              <Input
                control={control}
                name="slug"
                type="text"
                placeholder="Slug"
              ></Input>
            </Field>{" "}
            <Field>
              <Label htmlFor="author">Author</Label>
              <Input
                control={control}
                name="author"
                type="text"
                placeholder="Author"
              ></Input>
            </Field>
            <Field>
              <Label>Status</Label>
              <div className="flex items-center justify-around w-full h-full">
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === postStatus.APPROVED}
                  value={postStatus.APPROVED}
                  onChange={(e) => {
                    setValue("status", e.target.value);
                  }}
                >
                  Approved
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === postStatus.PENDING}
                  value={postStatus.PENDING}
                  onChange={(e) => {
                    setValue("status", e.target.value);
                  }}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === postStatus.REJECTED}
                  value={postStatus.REJECTED}
                  onChange={(e) => {
                    setValue("status", e.target.value);
                  }}
                >
                  Reject
                </Radio>
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <Field>
              <Label>Image</Label>
              <ImageUpload
                onchange={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
                image={image}
                name="picture"
              ></ImageUpload>
            </Field>
            <Field>
              <Label>Categories</Label>
              <Dropdown>
              <Dropdown.Select ></Dropdown.Select>
              <Dropdown.List>
              {
                categories.length > 0 && categories.map((el) => (
                  <Dropdown.Option key={el.id} onClick={() => {
                    setValue("categoriesId", el.id);
                    setValue("categoriesName", el.name);
                  }} >{el.name}</Dropdown.Option>
                ))
              }
             
              </Dropdown.List>
              
            </Dropdown>
            </Field>
          </div>
         <Field>
          <Label>Feature post</Label>
          <Toogle onchange={handleSetHot} toogle={toogle}>
            Feature
          </Toogle>
         </Field>
        </div>
       <div className="z-0 flex flex-col gap-8 mt-10">
        <Label>Content</Label>
        <ReactQuill className="w-full h-[400px] mb-16"
                modules={modules}
                theme="snow"
                value={content}
                onChange={handleChangeContent}
              />
       </div>
        <Button>Submit</Button>
      </form>
    </DashBoardPostPageStyles>
  );
};

export default DashBoardPostPage;
