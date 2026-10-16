import { useContext } from 'react';

import {
  ChatFlowContext,
  type ChatFlowContextValue,
} from '../context/ChatFlowContext';

export function useChatFlow(): ChatFlowContextValue {
  const context = useContext(ChatFlowContext);

  if (!context) {
    throw new Error('useChatFlow must be used inside <ChatFlowProvider>.');
  }

  return context;
}
