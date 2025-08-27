"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "@/store";


const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <HeroUIProvider>{children}</HeroUIProvider>
      </Provider>
    </QueryClientProvider>
  );
}
