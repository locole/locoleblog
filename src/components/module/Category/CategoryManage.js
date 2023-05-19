import { async } from '@firebase/util';
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { categoryStatus } from '../../../Contants';
import { db } from '../../../FireBase/FireBase-config';
import { Button } from '../../Button';
import LabelStatus from '../../Label/LabelStatus';
import { Table } from '../../table';
import { ActionDelete, ActionEdit, ActionView } from '../Action';
import DashboardHeading from '../DashBoard/DashboardHeading';

const CategoryManage = () => {
  const navigate = useNavigate();
  const [categoryList , setCategoryList] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 
 useEffect(()=> {
  const getCategories = () => {
    const colRef =collection(db, "categories");
    onSnapshot(colRef, (onsnapshot) => {
      let results = [];
      onsnapshot.forEach((item) => {
        results.push({
          id: item.id,
          ...item.data()
        })
      });
      console.log(results);
      setCategoryList(results);
      
    })
  }
  getCategories();
  
  
 }, []);

  const handleDeleteCategory = async (id) => {
    const categoryRef = doc(db,"categories",id);
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
        await deleteDoc(categoryRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    
  
  }
    return (
        <div>
        <div className='flex justify-between'>
        <DashboardHeading title='Categories' desc="Manage your category">
        </DashboardHeading>
        <Button type="button" onclick={() => {
          navigate("/add-category");
        }}>Create new category</Button>
        </div>
           <Table>
           <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {
          categoryList.length > 0 && categoryList.map((item) => (
            <tr key={item.id}>
            <td>
              {item.id}
            </td>
            <td>{item.name}</td>
            <td>
              <em className="text-gray-400">{item.slug}</em>
            </td>
            <td>
            {Number(item.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {Number(item.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
            </td>
            <td>
              <div className="flex gap-5 text-gray-400">
                <ActionView></ActionView>
                <ActionEdit onClick={() =>
                        navigate(`/update-category?id=${item.id}`)
                      }></ActionEdit>
                <ActionDelete onClick={() => handleDeleteCategory(item.id)}></ActionDelete>
              </div>
            </td>
          </tr>
          ))
         }
        </tbody>
           </Table> 
        </div>
    );
};

export default CategoryManage;