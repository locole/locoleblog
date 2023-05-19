import React from 'react';
import { Button } from '../../Button';
import DashboardHeading from '../DashBoard/DashboardHeading';
import UserTable from './UserTable';

const UserManage = () => {
    return (
        <div>
            <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button >
          Add new user
        </Button>
      </div>
      <UserTable></UserTable>
        </div>
    );
};

export default UserManage;