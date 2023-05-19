import React from "react";
import { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => {
    document.title="Dashborad Page";
  })
  return (
    <div>
      <h1>Dashboard page</h1>
    </div>
  );
};

export default DashboardPage;