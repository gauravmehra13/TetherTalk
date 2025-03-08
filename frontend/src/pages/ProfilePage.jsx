import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <div className="max-w-3xl mx-auto p-4 py-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Profile</h1>
              <div className="divider">Your personal information</div>
            </div>

            {/* avatar upload section */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative avatar">
                <div className="w-40 h-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="object-cover"
                  />
                </div>
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-2 right-2 
                    btn btn-circle btn-sm btn-primary
                    ${isUpdatingProfile ? "loading" : ""}
                  `}
                >
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm opacity-70">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  value={authUser?.fullName}
                  readOnly
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  value={authUser?.email}
                  readOnly
                  className="input input-bordered"
                />
              </div>
            </div>

            <div className="divider">Account Information</div>

            <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
              <div className="stat">
                <div className="stat-title">Member Since</div>
                <div className="stat-value text-lg">
                  {authUser.createdAt?.split("T")[0]}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Account Status</div>
                <div className="stat-value text-lg">
                  <span className="badge badge-success gap-2">
                    <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
