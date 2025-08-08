import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatToggleButton = ({ isOpen, onToggle }: ChatToggleButtonProps) => {
  return (
    <Button
      onClick={onToggle}
      variant="ghost"
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 !bg-gradient-to-r ${
        isOpen 
          ? "!from-gray-600 !to-gray-700 hover:!from-gray-700 hover:!to-gray-800" 
          : "!from-primary !to-accent hover:!from-primary/90 hover:!to-accent/90"
      }`}
    >
      {isOpen ? (
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      ) : (
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      )}
    </Button>
  );
}; 