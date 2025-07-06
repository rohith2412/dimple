"use client";

import Background from "../../../components/Background";
import Gear from "../../../components/Gear";
import MainProfileView from "../../../components/MainProfileView";
import Navbar from "../../../components/Navbar";
import { Report } from "../../../components/Report";

const Page = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div>
      <Background />
      <Navbar />
      <div className="">
        <MainProfileView />
      </div>
      <Report />
      <Gear />
    </div>
  );
};

export default Page;
