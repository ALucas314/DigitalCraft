// Utilitários para controle global do chat
let openChatCallback: (() => void) | null = null;

export const setOpenChatCallback = (callback: () => void) => {
  openChatCallback = callback;
};

export const openChat = () => {
  if (openChatCallback) {
    openChatCallback();
  }
}; 