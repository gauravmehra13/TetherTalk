import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquareText, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100/90 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group hover:opacity-90 transition-all"
          >
            <div className="size-9 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-sm">
              <MessageSquareText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              TetherTalk
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-3">
            <Link
              to="/settings"
              className="btn btn-ghost btn-sm gap-2 hover:bg-base-200/50 rounded-full transition-all hover:-translate-y-0.5"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <div className="flex items-center gap-3 ml-2 border-l border-base-300 pl-3">
                <Link
                  to="/profile"
                  className="btn btn-ghost btn-sm gap-2 hover:bg-base-200/50 rounded-full transition-all hover:-translate-y-0.5"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button 
                  onClick={logout}
                  className="btn btn-ghost btn-sm gap-2 text-red-500 hover:bg-red-50 rounded-full transition-all hover:-translate-y-0.5"
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
