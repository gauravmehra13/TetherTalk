import { MessageSquareText } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 bg-base-100/50">
      <div className="max-w-md text-center space-y-8">
        {/* Icon Display */}
        <div className="flex justify-center">
          <div className="relative group">
            <div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 
              flex items-center justify-center transform transition-all duration-300 
              group-hover:scale-105 group-hover:shadow-lg"
            >
              <MessageSquareText className="w-10 h-10 text-primary/90 transform transition-all 
              duration-300 group-hover:rotate-6" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary 
          bg-clip-text text-transparent">
            Let's Start Chatting!
          </h2>
          <p className="text-base-content/70 text-lg leading-relaxed">
            Choose a conversation or start a new one to begin your messaging experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
