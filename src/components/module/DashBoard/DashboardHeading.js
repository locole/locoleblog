import React from 'react';

const DashboardHeading = ({title="", desc=""}) => {
    return (
        <div className='mb-10 '>
            <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-5 text-sm font-normal text-gray-600">{desc}</p>
        </div>
    );
};

export default DashboardHeading;