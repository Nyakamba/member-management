import React, { useState, useContext, createContext } from "react";
import Toast from "@/components/Toast";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api/apiClient";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

interface AppContext {
  showToast: (message: ToastMessage) => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

  const { data, isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: apiClient.validateToken,
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: setToastMessage,
        isLoggedIn: !isError,
        isAdmin: data?.role === "admin",
      }}
    >
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
