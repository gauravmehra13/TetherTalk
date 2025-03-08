import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300/50 bg-base-100/50 backdrop-blur-sm flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300/50 w-full p-6">
        <div className="flex items-center gap-3">
          <Users className="size-6 text-primary" />
          <span className="font-semibold text-lg hidden lg:block text-primary">Contacts</span>
        </div>
        
        {/* Online Filter */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2 hover:bg-base-200/50 p-2 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="toggle toggle-sm toggle-primary"
            />
            <span className="text-sm text-base-content/80">Show online only</span>
          </label>
          <div className="text-xs text-base-content/50 px-2 py-1 bg-base-200/50 rounded-full">
            {onlineUsers.length - 1} online
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full p-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-2 flex items-center gap-3 rounded-lg
              hover:bg-base-200/50 transition-all duration-200
              ${
                selectedUser?._id === user._id
                  ? "bg-primary/10 ring-1 ring-primary/20"
                  : ""
              }
            `}
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full border-2 border-base-200"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-base-100"
                />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate text-base-content">
                {user.fullName}
              </div>
              <div className="text-sm text-base-content/60">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-green-500">Online</span>
                ) : (
                  <span className="text-base-content/40">Offline</span>
                )}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/50 p-4">
            No users available
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
