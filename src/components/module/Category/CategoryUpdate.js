import React from 'react';
import { Field } from '../../Field';
import Input from '../../Input/Input';
import Label from '../../Label/Label';
import DashboardHeading from '../DashBoard/DashboardHeading';
import { useForm } from 'react-hook-form';
import Radio from '../../Radio/Radio';
import { categoryStatus } from '../../../Contants';
import { Button } from '../../Button';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../FireBase/FireBase-config';
import { updateCurrentUser } from 'firebase/auth';
import { toast } from 'react-toastify';

const CategoryUpdate = () => {
    const {control, handleSubmit, watch, reset, formState: {
        isValid, isSubmitting
    }} = useForm({
        mode: "onChange",
        defaultValues: {
            name: "", 
            slug: "", 
            status: 1, 
            createAt: new Date()
        }
    });
    const watchStatus = watch("status");
    const [params] = useSearchParams();
    const categoryId = params.get("id");
    const navigate = useNavigate();
    useEffect(()=> {
        async function fetchData() {
            const colRef = doc(db, "categories", categoryId);
            const singleDoc = await getDoc(colRef);
            reset(singleDoc.data());
          }
          fetchData();
    }, [categoryId, reset]);
    const handleUpdateCategory = async (values) => {
        const colRef = doc(db, "categories",categoryId);
        await updateDoc(colRef , {
            name : values.name,
            slug : values.slug ,
            status : Number(values.status)
        });
        toast.success("Update category successfully !!!");
        navigate("/manage");
    }
    return (
        <div>
             <DashboardHeading title="Categories" desc='Update category'></DashboardHeading>
           <form action="" onSubmit={handleSubmit(handleUpdateCategory)} >
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
            <div className='flex items-center justify-center w-full my-5 '><Button type="submit">update category</Button></div>
           </form>
        </div>
    );
};

export default CategoryUpdate;