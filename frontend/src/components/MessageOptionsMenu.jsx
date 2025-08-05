import { MoreVertical, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const MessageOptionsMenu = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    setIsOpen(false);
    onDelete();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-base-200 rounded-full"
        title="Message options"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 py-2 bg-base-100 rounded-lg shadow-lg border border-base-300 z-10">
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-sm text-error hover:bg-base-200 flex items-center gap-2"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageOptionsMenu;
