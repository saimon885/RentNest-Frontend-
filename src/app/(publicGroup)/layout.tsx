import Navbar from "@/components/shared/navbar/Navbar";
import { GetMyProfile } from "@/services/GetMyProfie";

const PublicLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const profile = await GetMyProfile();
  // console.log(profile);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar profile={profile} />

      <main className="flex-1 pt-16">{children}</main>
    </div>
  );
};

export default PublicLayout;
