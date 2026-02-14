import React, { useState } from "react";
import { ProfileBanner, ProfileTabs, OrderHistory, AddressBook } from "../../features/user/profile";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen  mt-4 md:mt-6 pb-10 px-2 md:px-4">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-white rounded-[1.5rem] shadow-2xl shadow-black/5 overflow-hidden border border-gray-100">
          
          {/* Section 1: Banner with User Info & Sign Out */}
          <ProfileBanner />
          
          {/* Section 2: Tab Navigation */}
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Section 3: Dynamic Content (Orders or Addresses) */}
          <div className="p-4 md:p-14">
            {activeTab === "orders" ? <OrderHistory /> : <AddressBook />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;