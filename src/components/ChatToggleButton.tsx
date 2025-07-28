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
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
        isOpen 
          ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700" 
          : "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
      }`}
    >
      {isOpen ? (
        <X className="w-6 h-6 text-primary-foreground" />
      ) : (
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      )}
    </Button>
  );
}; 