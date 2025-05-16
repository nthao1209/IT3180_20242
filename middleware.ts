// import { NextRequest, NextResponse } from "next/server";

// import { auth } from "@/auth";

// export default auth(async (request: NextRequest) => {
//   const session = await auth();
//   if (
//     session?.user.role === "staff" &&
//     session.user.profile_status === "pending"
//   ) {
//     return NextResponse.redirect(new URL("/profile", request.url));
//   }
//   if (isProtectedRoute(request.nextUrl.pathname)) {
//     if (!session || session.user.role !== "staff") {
//       return NextResponse.redirect(new URL("/401", request.url));
//     }
//   }
//   return NextResponse.next();
// });

// const isProtectedRoute = (path: string) => {
//   return /^\admin\/(user|catelog|categories|activities|fines)(\/|$)/.test(path);
// };

// export const config = {
//   match: [
//     "/((?!api|_next/static|_next/image|favicon.ico|profile|auth/sigin|40search|programs).*)",
//   ],
// };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Logic middleware của bạn
  return NextResponse.next();
}
