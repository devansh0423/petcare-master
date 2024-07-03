import React from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/layout/UserMenu";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div>{auth?.user?.name}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
