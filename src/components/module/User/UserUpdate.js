import { useSearchParams } from "react-router-dom";
import {useForm} from "react-hook-form";
import { useAuth } from "../../../context/auth-context";
import { userRole, userStatus } from "../../../Contants";
import Swal from "sweetalert2";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../FireBase/FireBase-config";
import { toast } from "react-toastify";
import { useEffect } from "react";
import DashboardHeading from "../DashBoard/DashboardHeading";
import { ImageUpload } from "../../Image";
import { Field, FieldCheckboxes } from "../../Field";
import Input from "../../Input/Input";
import Label from "../../Label/Label";
import Radio from "../../Radio/Radio";
import { Button } from "../../Button";
import { Textarea } from "../../TextArea";
import { useState } from "react";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const UserUpdate = () => {
    const storage = getStorage(); // create a root storage
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange"
  });
  const [params] = useSearchParams();
  const userId = params.get("id");
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const imageUrl = getValues("avatar");

const [image, setImage] = useState("");
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
          setValue("avatar",url);
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
    // const image_name = getValues("picture").name;
    const image_name = "MacBookPro-14-Silver-B.jpeg";
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


  const handleUpdateUser = async (values) => {
    console.log(values)
    if (!isValid) return;
    
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success("Update user information successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Update user failed!");
    }
  };

  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
    }
    fetchData();
  }, [userId, reset]);

  if (!userId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc="Update user information"
      ></DashboardHeading>
      
      <form onSubmit={handleSubmit(handleUpdateUser)}>
{/*         
        <ImageUpload
                onchange={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
                image={image}
                name="picture"
              ></ImageUpload>
       */}
       <Field>
              <Label>Avatar</Label>
              <ImageUpload
                onchange={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
                image={image}
                name="picture"
              ></ImageUpload>
            </Field>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Description</Label>
            <Textarea name="description" control={control}></Textarea>
          </Field>
        </div>
        <Button
          className="mx-auto w-[200px]"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;