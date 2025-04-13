import { Toaster } from "sonner";

import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";

const App = () => {
  return (
    <div className="flex gap-8">
      <Toaster
        toastOptions={{
          style: {
            color: "#35383E",
          },
        }}
      />
      <Sidebar />
      <Tasks />
    </div>
  );
};

export default App;
