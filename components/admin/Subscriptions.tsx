"use client";
import React, { useState } from "react";

const PLANS = {
  FREE: "Free Plan",
  PLUS: "Plus Plan",
  BUSINESS: "Business Plan",
};

const MOCK_USERS = [
  { id: 1, name: "John Doe", plan: PLANS.FREE, avatar: "JD" },
  { id: 2, name: "Alice Smith", plan: PLANS.PLUS, avatar: "AS" },
  { id: 3, name: "Bob Johnson", plan: PLANS.BUSINESS, avatar: "BJ" },
  { id: 4, name: "Emma Wilson", plan: PLANS.FREE, avatar: "EW" },
  { id: 5, name: "Mike Brown", plan: PLANS.PLUS, avatar: "MB" },
  { id: 6, name: "Sarah Davis", plan: PLANS.BUSINESS, avatar: "SD" },
];

export default function Subscriptions() {
  const [selectedPlan, setSelectedPlan] = useState(PLANS.FREE);
  const [users, setUsers] = useState(MOCK_USERS);

  const filteredUsers = users.filter((user) => user.plan === selectedPlan);

  const handleDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="bg-[#2E3036] p-6 rounded-lg w-full">
      {/* Plan Selection Tabs */}
      <div className="flex gap-2 mb-6">
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

      {/* Users List */}
      <div className="bg-[#1E1F23] rounded-lg">
        {filteredUsers.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            No users found for {selectedPlan}
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border-b border-gray-700 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {user.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-medium">{user.name}</span>
                  <span className="text-sm text-gray-400">{user.plan}</span>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap w-[30%] md:w-fit">
                <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
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
          ))
        )}
      </div>
    </div>
  );
}
