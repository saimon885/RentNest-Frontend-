import Navbar from "@/components/shared/navbar/Navbar";

const PublicLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const user = await GetMyProfile();
  // console.log(user);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default PublicLayout;
