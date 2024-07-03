import React from "react";
import UserMenu from "../../components/layout/UserMenu";

const GroomingPackages = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div>Grooming packages</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GroomingPackages;
