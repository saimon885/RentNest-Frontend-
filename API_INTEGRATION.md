# RentNest - API Integration Documentation

## Authentication & User Management
- **Login Component** (`app/(authgroup)/login/page.tsx`)
  - Endpoint: `POST /api/auth/login`
  - Description: Authenticates user and returns JWT token.

- **Register Component** (`app/(authgroup)/register/page.tsx`)
  - Endpoint: `POST /api/auth/register`
  - Description: Registers new Tenant or Landlord.

## Property Management
- **Property Listing Page** (`app/(publicGroup)/properties/page.tsx`)
  - Endpoint: `GET /api/properties`
  - Description: Fetches all rental properties with filter query params.

- **Property Details Page** (`app/(publicGroup)/properties/[id]/page.tsx`)
  - Endpoint: `GET /api/properties/:id`
  - Description: Fetches specific property details.

- **Create Property Form** (`app/(dashboardGroup)/dashboard/landlord/properties/page.tsx`)
  - Endpoint: `POST /api/landlord/properties`
  - Description: Allows landlord to create a new property listing.

## Rental Requests & Payments
- **Tenant Rental Request** (`app/properties/[id]/RentalReqButton.tsx`)
  - Endpoint: `POST /api/rentals`
  - Description: Submits a rental request for a property.

- **Payment Initiation** (`app/(dashboardGroup)/dashboard/tenant/page.tsx`)
  - Endpoint: `POST /api/payments/create`
  - Description: Initiates Stripe Checkout session.

## Admin Actions
- **User Management Table** (`app/(dashboardGroup)/dashboard/admin/users/page.tsx`)
  - Endpoint: `GET /api/admin/users` & `PATCH /api/admin/users/:id`
  - Description: Fetches users and handles ban/unban status updates.