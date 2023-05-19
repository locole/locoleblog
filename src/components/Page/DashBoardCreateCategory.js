import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { categoryStatus } from '../../Contants';
import { useAuth } from '../../context/auth-context';
import { db } from '../../FireBase/FireBase-config';
import { Button } from '../Button';
import { Field } from '../Field';
import Input from '../Input/Input';
import Label from '../Label/Label';
import DashboardHeading from '../module/DashBoard/DashboardHeading';
import Radio from '../Radio/Radio';

const DashBoardCreateCategory = () => {
    const {control, handleSubmit, watch, reset,setValue, formState: {
        isValid, isSubmitting
    }} = useForm({
        mode: "onChange",
        defaultValues: {
            name: "", 
            slug: "", 
            status: 1, 
            createAt: new Date(),
            authorUID: ""
        }
    });
    const userInfo = useAuth();
    
    const navigate = useNavigate();
    const watchStatus = watch("status");
    const handleCreateCategory = async (value) => {
        const currentValues = {...value};
      const colRef = collection(db, "categories");
      await addDoc(colRef, {
         name: currentValues.name,
         slug: currentValues.slug,
         status: currentValues.status,
         authorUID: userInfo.uid
      }).then(() => {
        console.log("Create category successfully");
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        reset({
            name: "",
            slug: "",
            status: 1,
            createdAt: new Date(),
          });
          console.log("reset form sucessfully");
      })
    }
    return (
        <div>
            <DashboardHeading title="New category" desc='Add new category'></DashboardHeading>
           <form action="" onSubmit={handleSubmit(handleCreateCategory)} >
           <div className='grid grid-cols-2 gap-20'>
                <Field>
                    <Label htmlFor='name'>Name</Label>
                    <Input  control={control}
                name="name"
                type="text"
                placeholder="Enter your category name"></Input>
                </Field>
                <Field>
                    <Label htmlFor='slug'>Slug</Label>
                    <Input  control={control}
                name="slug"
                type="text"
                placeholder="Enter your slug"></Input>
                </Field>
                <Field>
                    <Label>Status</Label>
                    <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
                </Field>
            </div>
            <div className='flex items-center justify-center w-full my-5 '><Button type="submit" onclick={() => {
              navigate("/category")
            }}>Add new category</Button></div>
           </form>
        </div>
    );
};

export default DashBoardCreateCategory;