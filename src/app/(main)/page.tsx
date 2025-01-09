"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const { push } = useRouter();

  useEffect(() => {
    push("/dashboard/blog");
  }, []);
};

export default Home;
