import React, { useState } from "react";
import { ProfileBanner, ProfileTabs, OrderHistory, AddressBook ,ProfileOverview} from "../../features/user/profile";

const Profile = () => {
  // Set "profile" as default
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen mt-4 md:mt-6 pb-10 px-2 md:px-4">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-white rounded-[1.5rem] shadow-2xl shadow-black/5 overflow-hidden border border-gray-100">
          
          <ProfileBanner />
          
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="p-4 md:p-14">
            {/* Dynamic Content Switching */}
            {activeTab === "profile" && <ProfileOverview />}
            {activeTab === "orders" && <OrderHistory />}
            {activeTab === "address" && <AddressBook />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;