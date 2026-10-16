import AppDataProvider from './context/AppDataProvider';
import ChatFlowProvider from './context/ChatFlowProvider';
import ToastProvider from './context/ToastProvider';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ToastProvider>
      <AppDataProvider>
        <ChatFlowProvider>
          <AppRoutes />
        </ChatFlowProvider>
      </AppDataProvider>
    </ToastProvider>
  );
}

export default App;
