"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { userAPI } from "@/lib/api";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ProfileData {
  name: string;
  email: string;
  country: string;
  subscription: string;
  phone_number: string;
  bio: string;
  image: string | null;
  joinDate: Date | null;
  provider: string;
}

export default function Profile() {
  const { data: sessionData } = useSession();
  const session = sessionData;
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showImageUploadPopup, setShowImageUploadPopup] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    country: "",
    bio: "",
    image: "",
    joinDate: null,
    provider: "",
    phone_number: "",
    subscription: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await userAPI.getProfile();
        console.log(response.data);
        setProfileData({
          name: response.data.name,
          email: response.data.email,
          country: response.data.country,
          bio: response.data.bio,
          image: response.data.image,
          joinDate: new Date(response.data.created_at),
          provider: response.data.provider,
          phone_number: response.data.phone_number,
          subscription: response.data.subscription,
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [session, router]);

  const handleSave = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const updateData = {
        name: profileData.name,
        email: profileData.email,
        phone_number: profileData.phone_number,
        country: parsePhoneNumber(profileData.phone_number)?.country,
        // bio: profileData.bio,
        image: profileData.image,
      };

      console.log(updateData);

      await userAPI.updateProfile(updateData);

      // setShowImageUploadPopup(true);
      // setTimeout(() => {
      //   setShowImageUploadPopup(false);
      // }, 3000);

      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your password change logic here
    setShowPasswordForm(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setProfileData({
            ...profileData,
            image: result,
          });

          // Show popup
          setShowImageUploadPopup(true);

          // Hide popup after 3 seconds
          setTimeout(() => {
            setShowImageUploadPopup(false);
          }, 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePhoneChange = (value: string | undefined) => {
    setProfileData({ ...profileData, phone_number: value || '' }); // Handle undefined case by defaulting to empty string
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bg-black text-white p-4 lg:p-8">
      <Header />
      {showImageUploadPopup && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all">
          Profile image uploaded successfully!
        </div>
      )}
      {/* Main Content */}
      <div className="w-full flex items-center justify-center">
        <div className="w-full sm:w-[70%] md:w-[60%] flex flex-col items-center gap-8 p-6">
          {/* Profile Header */}
          <div className="relative w-full flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-[#393A40] overflow-hidden">
                {profileData.image ? (
                  <Image
                    src={profileData.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    {profileData.name[0]}
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
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
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            <div className="flex flex-col items-center gap-3">
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="bg-black/0 border-2 border-[#2E3036] rounded-lg px-4 py-2 text-xl font-semibold"
                />
              ) : (
                <h1 className="text-2xl font-semibold">{profileData.name}</h1>
              )}
              <div className="text-sm text-[#787A7E]">
                Member since {profileData.joinDate?.toLocaleDateString()}
              </div>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="p-2 rounded-lg bg-[#393A40] hover:bg-white/50 transition-colors"
              >
                {isEditing ? (
                  <div className="flex gap-2 items-center">
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
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                    <span>Save</span>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    <span>Edit Profile</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Current Plan */}
          <section className="w-full border-2 border-[#2E3036] rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Current Plan</h2>
              <Link
                href="/upgrade"
                className="px-4 py-2 bg-[#D3830A]/15 text-white rounded-lg hover:bg-[#D3830A]/20 transition-colors"
              >
                Upgrade Plan
              </Link>
            </div>
            <div className="bg-[#1E1F23] rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Pro Plan</h3>
                  <p className="text-[#787A7E]">$15/month</p>
                </div>
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                  Active
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-[#2E3036]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#787A7E]">Next billing date:</span>
                  <span>December 19, 2024</span>
                </div>
              </div>
            </div>
          </section>

          {/* Profile Sections */}
          <div className="w-full space-y-6">
            {/* Account Info */}
            <section className="w-full border-2 border-[#2E3036] rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">
                Account Information
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[#787A7E]">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="w-full bg-black/0 border-2 border-[#2E3036] rounded-lg px-4 py-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[#787A7E]">Country & Phone Number</label>
                  <div className="flex gap-2 w-full">
                    <PhoneInput
                      international
                      disabled={!isEditing}
                      // defaultCountry="US"                      
                      placeholder="Enter phone number"
                      value={profileData.phone_number}
                      onChange={handlePhoneChange} // This now correctly updates the state with the phone number string
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[#787A7E]">Bio</label>
                  <textarea
                    value={profileData.bio}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    className="w-full bg-black/0 border-2 border-[#2E3036] rounded-lg px-4 py-2 min-h-[100px]"
                  />
                </div>
                <div className="pt-4 border-t border-[#2E3036]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Authentication Method</h3>
                      <p className="text-sm text-[#787A7E] mt-1 flex gap-2 items-center pt-1">
                        {profileData.provider === "google" ? (
                          <svg
                            width="25"
                            viewBox="0 0 32 33"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_11_61)">
                              <path
                                d="M11.1475 1.5525C7.95019 2.66167 5.19285 4.76692 3.28046 7.55901C1.36808 10.3511 0.401465 13.6829 0.522592 17.0649C0.643719 20.447 1.84621 23.701 3.95343 26.3492C6.06065 28.9973 8.96153 30.8999 12.23 31.7775C14.8798 32.4612 17.656 32.4913 20.32 31.865C22.7333 31.3229 24.9644 30.1634 26.795 28.5C28.7002 26.7159 30.0831 24.4462 30.795 21.935C31.5688 19.2042 31.7065 16.3323 31.1975 13.54H16.3175V19.7125H24.935C24.7628 20.697 24.3937 21.6366 23.8499 22.4751C23.306 23.3136 22.5986 24.0338 21.77 24.5925C20.7177 25.2886 19.5315 25.7569 18.2875 25.9675C17.0398 26.1995 15.7601 26.1995 14.5125 25.9675C13.248 25.7061 12.0517 25.1841 11 24.435C9.31036 23.239 8.04168 21.5398 7.37499 19.58C6.69702 17.5835 6.69702 15.419 7.37499 13.4225C7.84955 12.023 8.63407 10.7488 9.66999 9.695C10.8555 8.46687 12.3563 7.58899 14.0079 7.15769C15.6594 6.72639 17.3979 6.75833 19.0325 7.25C20.3094 7.64198 21.4771 8.32685 22.4425 9.25C23.4142 8.28334 24.3842 7.31417 25.3525 6.3425C25.8525 5.82 26.3975 5.3225 26.89 4.7875C25.4164 3.41619 23.6867 2.34915 21.8 1.6475C18.3642 0.399978 14.6049 0.366451 11.1475 1.5525Z"
                                fill="white"
                              />
                              <path
                                d="M11.1474 1.5525C14.6046 0.36564 18.3639 0.398283 21.7999 1.645C23.687 2.35141 25.4159 3.42359 26.8874 4.8C26.3874 5.335 25.8599 5.835 25.3499 6.355C24.3799 7.32333 23.4108 8.28833 22.4424 9.25C21.4771 8.32684 20.3094 7.64198 19.0324 7.25C17.3984 6.7566 15.66 6.72282 14.008 7.15235C12.356 7.58189 10.8542 8.45815 9.66744 9.685C8.63153 10.7388 7.84701 12.013 7.37244 13.4125L2.18994 9.4C4.04496 5.7214 7.25681 2.90756 11.1474 1.5525Z"
                                fill="#E33629"
                              />
                              <path
                                d="M0.81512 13.375C1.09367 11.9945 1.55613 10.6576 2.19012 9.4L7.37262 13.4225C6.69466 15.419 6.69466 17.5835 7.37262 19.58C5.64595 20.9133 3.91845 22.2533 2.19012 23.6C0.602996 20.4408 0.118951 16.8413 0.81512 13.375Z"
                                fill="#F8BD00"
                              />
                              <path
                                d="M16.3175 13.5375H31.1975C31.7065 16.3298 31.5688 19.2017 30.795 21.9325C30.0831 24.4437 28.7002 26.7134 26.795 28.4975C25.1225 27.1925 23.4425 25.8975 21.77 24.5925C22.5992 24.0332 23.3069 23.3122 23.8508 22.4728C24.3946 21.6334 24.7634 20.6929 24.935 19.7075H16.3175C16.315 17.6525 16.3175 15.595 16.3175 13.5375Z"
                                fill="#587DBD"
                              />
                              <path
                                d="M2.1875 23.6C3.91583 22.2667 5.64333 20.9267 7.37 19.58C8.03802 21.5405 9.30851 23.2397 11 24.435C12.055 25.1807 13.2538 25.6983 14.52 25.955C15.7676 26.187 17.0474 26.187 18.295 25.955C19.539 25.7444 20.7252 25.2761 21.7775 24.58C23.45 25.885 25.13 27.18 26.8025 28.485C24.9722 30.1493 22.741 31.3097 20.3275 31.8525C17.6635 32.4788 14.8873 32.4487 12.2375 31.765C10.1418 31.2054 8.18419 30.219 6.4875 28.8675C4.69165 27.4417 3.22489 25.6449 2.1875 23.6Z"
                                fill="#319F43"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_11_61">
                                <rect
                                  width="32"
                                  height="32"
                                  fill="white"
                                  transform="translate(0 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="40"
                            viewBox="0 0 30 30"
                          >
                            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                          </svg>
                        )}
                        {profileData.provider === "email"
                          ? "Email and Password"
                          : `Signed in with ${profileData.provider}`}
                      </p>
                    </div>
                    {profileData.provider === "email" && (
                      <button
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        className="px-4 py-2 bg-[#393A40] rounded-lg hover:bg-[#4A4B52] transition-colors"
                      >
                        Change Password
                      </button>
                    )}
                  </div>

                  {showPasswordForm && profileData.provider === "email" && (
                    <form
                      onSubmit={handlePasswordChange}
                      className="mt-4 space-y-4"
                    >
                      <div className="space-y-2">
                        <label className="text-sm text-[#787A7E]">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full bg-black/0 border-2 border-[#2E3036] rounded-lg px-4 py-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-[#787A7E]">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full bg-black/0 border-2 border-[#2E3036] rounded-lg px-4 py-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-[#787A7E]">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full bg-black/0 border-2 border-[#2E3036] rounded-lg px-4 py-2"
                        />
                      </div>
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setShowPasswordForm(false)}
                          className="px-4 py-2 bg-[#393A40] rounded-lg hover:bg-[#4A4B52] transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
