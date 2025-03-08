import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Palette } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Did you check out the new themes on TetherTalk ?", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-100 py-8 pt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-base-content">Settings</h1>
          <p className="text-base-content/60">Customize your chat experience</p>
        </div>

        {/* Theme Selection Section */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Theme Selection</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    flex flex-col items-center gap-2 p-3 rounded-xl transition-all
                    ${theme === t 
                      ? "bg-base-100 shadow-md ring-2 ring-primary" 
                      : "hover:bg-base-100 hover:shadow-md"
                    }
                  `}
                  onClick={() => setTheme(t)}
                >
                  <div className="relative h-12 w-full rounded-lg overflow-hidden" data-theme={t}>
                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1.5">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium capitalize">{t}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="card bg-base-200 shadow-lg mt-8">
          <div className="card-body">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              Preview
              <span className="badge badge-primary badge-sm">Live</span>
            </h3>
            
            <div className="bg-base-100 rounded-box shadow-sm overflow-hidden">
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-base-300">
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-content">
                      <span className="text-sm font-medium">J</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Tony Stark</h3>
                    <p className="text-xs text-base-content/70">Online</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 min-h-[240px] max-h-[240px] overflow-y-auto">
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                        max-w-[80%] rounded-xl p-3
                        ${message.isSent 
                          ? "bg-primary text-primary-content" 
                          : "bg-base-200"
                        }
                      `}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-[10px] mt-1.5 ${
                        message.isSent ? "text-primary-content/70" : "text-base-content/70"
                      }`}>
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-base-300">
                <div className="join w-full">
                  <input
                    type="text"
                    className="input input-bordered join-item w-full"
                    placeholder="Type a message..."
                    value="This is a preview"
                    readOnly
                  />
                  <button className="btn btn-primary join-item">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
