import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div>
      <Head>
        <title>데브캠프 프로젝트</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}
