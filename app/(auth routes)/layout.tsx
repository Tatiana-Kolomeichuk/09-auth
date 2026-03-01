"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const refreshPage = async () => {
      router.refresh();
      setLoading(false);
    };
    refreshPage();
  }, [router]);

  return <>{loading ? <p>Loading...</p> : children}</>;
}
