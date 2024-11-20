"use client";
import React, { useState } from "react";

const PLANS = {
  FREE: "Free Plan",
  PLUS: "Plus Plan",
  BUSINESS: "Business Plan",
};

// const REGISTRATION_METHODS = ["Google", "Email", "GitHub", "Apple"];

const MOCK_USERS = [
  {
    id: 1,
    name: "Emma Thompson",
    registrationMethod: "Google",
    dateJoined: "Nov 12,2024",
    plan: PLANS.BUSINESS,
    prompt: "456",
    avatar: "ET",
  },
  {
    id: 2,
    name: "Michael Chen",
    registrationMethod: "Google",
    dateJoined: "Nov 12,2024",
    plan: PLANS.BUSINESS,
    prompt: "442",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    registrationMethod: "GitHub",
    dateJoined: "Nov 12,2024",
    plan: PLANS.BUSINESS,
    prompt: "389",
    avatar: "SJ",
  },
  {
    id: 4,
    name: "James Wilson",
    registrationMethod: "Apple",
    dateJoined: "Nov 12,2024",
    plan: PLANS.BUSINESS,
    prompt: "367",
    avatar: "JW",
  },
  {
    id: 5,
    name: "Sofia Rodriguez",
    registrationMethod: "Email",
    dateJoined: "Nov 11,2024",
    plan: PLANS.PLUS,
    prompt: "234",
    avatar: "SR",
  },
  {
    id: 6,
    name: "Alex Kim",
    registrationMethod: "GitHub",
    dateJoined: "Nov 11,2024",
    plan: PLANS.PLUS,
    prompt: "198",
    avatar: "AK",
  },
  {
    id: 7,
    name: "Lisa Patel",
    registrationMethod: "Google",
    dateJoined: "Nov 11,2024",
    plan: PLANS.PLUS,
    prompt: "187",
    avatar: "LP",
  },
  {
    id: 8,
    name: "David Miller",
    registrationMethod: "Email",
    dateJoined: "Nov 10,2024",
    plan: PLANS.FREE,
    prompt: "123",
    avatar: "DM",
  },
  {
    id: 9,
    name: "Maria Garcia",
    registrationMethod: "Apple",
    dateJoined: "Nov 10,2024",
    plan: PLANS.FREE,
    prompt: "98",
    avatar: "MG",
  },
  {
    id: 10,
    name: "Thomas Anderson",
    registrationMethod: "GitHub",
    dateJoined: "Nov 10,2024",
    plan: PLANS.FREE,
    prompt: "87",
    avatar: "TA",
  },
  {
    id: 11,
    name: "Olivia Brown",
    registrationMethod: "Google",
    dateJoined: "Nov 09,2024",
    plan: PLANS.BUSINESS,
    prompt: "432",
    avatar: "OB",
  },
  {
    id: 12,
    name: "William Lee",
    registrationMethod: "Email",
    dateJoined: "Nov 09,2024",
    plan: PLANS.PLUS,
    prompt: "276",
    avatar: "WL",
  },
  {
    id: 13,
    name: "Isabella Martinez",
    registrationMethod: "Apple",
    dateJoined: "Nov 09,2024",
    plan: PLANS.FREE,
    prompt: "156",
    avatar: "IM",
  },
  {
    id: 14,
    name: "Daniel Taylor",
    registrationMethod: "GitHub",
    dateJoined: "Nov 08,2024",
    plan: PLANS.BUSINESS,
    prompt: "445",
    avatar: "DT",
  },
  {
    id: 15,
    name: "Sophie Wilson",
    registrationMethod: "Google",
    dateJoined: "Nov 08,2024",
    plan: PLANS.PLUS,
    prompt: "289",
    avatar: "SW",
  },
];

export default function DetailedSubscription() {
  const [selectedPlan, setSelectedPlan] = useState(PLANS.FREE);
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("Last 24 Hrs");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesPlan = user.plan === selectedPlan;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.registrationMethod.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPlan && matchesSearch;
  });

  const handleDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
    setActiveDropdownId(null);
  };

  const toggleDropdown = (userId: number) => {
    setActiveDropdownId(activeDropdownId === userId ? null : userId);
  };

  return (
    <div className="p-3 sm:p-6 rounded-lg w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Subscription
          </h1>
          <button
            className="sm:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            ) : (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>

        <div
          className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto
          ${mobileMenuOpen ? "block" : "hidden sm:flex"}`}
        >
          {/* Search Bar */}
          <div className=" flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search User"
              className="bg-black/0 border-2 border-[#2E3036] text-white px-4 py-2 rounded-lg w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Time Filter Dropdown */}
          <select
            className="bg-black/0 border-2 border-[#2E3036] text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option>Last 24 Hrs</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      <div className="bg-[#2E3036] rounded-[10px] p-5">
        {/* Plan Selection Tabs - Scrollable on mobile */}
        <div className="overflow-x-auto mb-6">
          <div className="flex gap-2 min-w-max">
            {Object.values(PLANS).map((plan) => (
              <button
                key={plan}
                onClick={() => setSelectedPlan(plan)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedPlan === plan
                    ? "bg-white text-gray-900"
                    : "text-gray-400 hover:bg-gray-700"
                }`}
              >
                {plan}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table/Cards */}
        <div className="bg-[#1E1F23] rounded-lg">
          {/* Table Header - Hidden on mobile */}
          <div className="hidden sm:grid grid-cols-6 gap-4 p-4 border-b border-gray-700 text-gray-400">
            <div className="col-span-1">Name</div>
            <div className="col-span-1">Registration Method</div>
            <div className="col-span-1">Date Joined</div>
            <div className="col-span-1">Plan</div>
            <div className="col-span-1">Prompt</div>
            <div className="col-span-1">Action</div>
          </div>

          {/* Table Body/Cards */}
          {filteredUsers.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No users found for {selectedPlan}
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="border-b border-gray-700 last:border-0"
              >
                {/* Desktop View */}
                <div className="hidden sm:grid grid-cols-6 gap-4 p-4 items-center">
                  <div className="col-span-1 flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                      {user.avatar}
                    </div>
                    <span className="text-white">{user.name}</span>
                  </div>
                  <div className="col-span-1 text-gray-400">
                    {user.registrationMethod}
                  </div>
                  <div className="col-span-1 text-gray-400">
                    {user.dateJoined}
                  </div>
                  <div className="col-span-1">
                    <span className="px-3 py-1 bg-teal-500/20 text-teal-500 rounded-full text-sm">
                      {user.plan.split(" ")[0]}
                    </span>
                  </div>
                  <div className="col-span-1 text-gray-400">{user.prompt}</div>
                  <div className="col-span-1 flex gap-2 flex-wrap">
                    <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-white">
                      Block
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-4 py-2 text-red-500 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="sm:hidden p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {user.avatar}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{user.name}</h3>
                        <span className="text-gray-400 text-sm">
                          {user.registrationMethod}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleDropdown(user.id)}
                      className="text-gray-400 p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date Joined</span>
                      <span className="text-white">{user.dateJoined}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Plan</span>
                      <span className="px-3 py-1 bg-teal-500/20 text-teal-500 rounded-full text-sm">
                        {user.plan.split(" ")[0]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prompt</span>
                      <span className="text-white">{user.prompt}</span>
                    </div>
                  </div>

                  {/* Mobile Action Dropdown */}
                  {activeDropdownId === user.id && (
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-white">
                        Block
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="flex-1 px-4 py-2 text-red-500 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
