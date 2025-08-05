import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import { MessageSquare } from "lucide-react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageOptionsMenu from "./MessageOptionsMenu";
import ImageViewerModal from "./ImageViewerModal";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    deleteMessage,
    handleSocketEvents,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();
    handleSocketEvents();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    handleSocketEvents,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-base-content/70">
            <MessageSquare size={48} className="mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No messages yet</h3>
            <p className="text-center max-w-sm">
              Start a conversation with {selectedUser.fullName} by sending your
              first message below!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => {
              const showDateSeparator =
                index === 0 ||
                new Date(message.createdAt).toDateString() !==
                  new Date(messages[index - 1].createdAt).toDateString();

              return (
                <div key={message._id}>
                  {showDateSeparator && (
                    <div className="flex items-center justify-center my-8">
                      <div className="bg-base-200 text-base-content/70 text-sm px-4 py-1 rounded-full">
                        {(() => {
                          const messageDate = new Date(message.createdAt);
                          const today = new Date();
                          const yesterday = new Date(today);
                          yesterday.setDate(yesterday.getDate() - 1);

                          // Today
                          if (
                            messageDate.toDateString() === today.toDateString()
                          ) {
                            return "Today";
                          }

                          // Yesterday
                          if (
                            messageDate.toDateString() ===
                            yesterday.toDateString()
                          ) {
                            return "Yesterday";
                          }

                          // Within last 7 days
                          const diffInDays = Math.floor(
                            (today - messageDate) / (1000 * 60 * 60 * 24)
                          );
                          if (diffInDays < 7) {
                            return messageDate.toLocaleDateString("en-US", {
                              weekday: "long",
                            });
                          }

                          // This year
                          if (
                            messageDate.getFullYear() === today.getFullYear()
                          ) {
                            return messageDate.toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                            });
                          }

                          // Different year
                          return messageDate.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          });
                        })()}
                      </div>
                    </div>
                  )}
                  <div
                    key={message._id}
                    className={`chat ${
                      message.senderId === authUser._id
                        ? "chat-end"
                        : "chat-start"
                    } group/message animate-slide-in`}
                    ref={messageEndRef}
                  >
                    <div className="chat-image avatar">
                      <div className="size-10 rounded-full border">
                        <img
                          src={
                            message.senderId === authUser._id
                              ? authUser.profilePic || "/avatar.png"
                              : selectedUser.profilePic || "/avatar.png"
                          }
                          alt="profile pic"
                        />
                      </div>
                    </div>
                    <div className="chat-header mb-1 flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <time className="text-xs opacity-50">
                          {formatMessageTime(message.createdAt)}
                        </time>
                        {message.senderId === authUser._id && (
                          <div className="opacity-0 group-hover/message:opacity-100 transition-opacity duration-200">
                            <MessageOptionsMenu
                              onDelete={() => deleteMessage(message._id)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="chat-bubble flex flex-col">
                      {message.image && (
                        <button
                          onClick={() => setSelectedImage(message.image)}
                          className="mb-2 hover:opacity-90 transition-opacity"
                        >
                          <img
                            src={message.image}
                            alt="Attachment"
                            className="sm:max-w-[200px] rounded-md"
                          />
                        </button>
                      )}
                      {message.text && <p>{message.text}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <MessageInput />

      <ImageViewerModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage}
      />
    </div>
  );
};
export default ChatContainer;
