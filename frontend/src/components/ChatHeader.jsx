import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import DeleteConversationDialog from "./DeleteConversationDialog";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, deleteConversation, messages } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteConversation = () => {
    deleteConversation();
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar">
              <div className="size-10 rounded-full relative">
                <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
              </div>
            </div>

            {/* User info */}
            <div>
              <h3 className="font-medium">{selectedUser.fullName}</h3>
              <p className="text-sm text-base-content/70">
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Delete conversation button - only show if there are messages */}
            {messages.length > 0 && (
              <button 
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-error hover:text-error/80 transition-colors p-2 hover:bg-base-200 rounded-full"
                title="Delete conversation"
              >
                <Trash2 size={20} />
              </button>
            )}

            {/* Close button */}
            <button 
              onClick={() => setSelectedUser(null)}
              className="p-2 hover:bg-base-200 rounded-full"
            >
              <X />
            </button>
          </div>
        </div>
      </div>

      <DeleteConversationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConversation}
        userName={selectedUser.fullName}
      />
    </>
  );
};
export default ChatHeader;
