import { Trash2 } from "lucide-react";

const DeleteConversationDialog = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 bg-error/10 rounded-full">
            <Trash2 className="text-error size-6" />
          </div>
          
          <h3 className="text-lg font-semibold text-center">Delete Conversation</h3>
          
          <p className="text-center text-base-content/70">
            Are you sure you want to delete your conversation with {userName}? This action cannot be undone and all messages will be permanently deleted.
          </p>

          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={onClose}
              className="btn btn-ghost flex-1"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="btn btn-error flex-1"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConversationDialog;