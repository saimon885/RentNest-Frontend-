import { cookies } from "next/headers";
import { RentalRequestType, RequestCard } from "../../_components/landlord/RequestCard";

const AllRequests = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return (
      <div className="p-6 text-center text-sm text-destructive">
        User not logged in
      </div>
    );
  }

  const res = await fetch(
    `${process.env.SERVER_API_URL}/api/landlord/requests`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const result = await res.json();
  const data: RentalRequestType[] = result?.data || [];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Rental Requests</h1>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
          Total: {data.length}
        </span>
      </div>

      {data.length === 0 ? (
        <div className="p-12 text-center border border-dashed rounded-xl text-muted-foreground">
          No rental requests found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRequests;
