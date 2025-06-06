// export {auth as middleware} from '@/auth'

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/auth";

export default auth(async (request: NextRequest) => {
  const session = await auth(); // dùng request.auth thay vì gọi auth() lần nữa

  if (session?.user.role === "admin") {
    if (!request.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  else if (session?.user.role === "author") {
    if (request.nextUrl.pathname !== "/author") {
      return NextResponse.redirect(new URL("/author", request.url));
    }
  }

  if (
    isProtectedRoute(request.nextUrl.pathname) &&
    (!session || (session.user.role !== "admin" && session.user.role !== "author"))
  ) {
    return NextResponse.redirect(new URL("/401", request.url));
  }

  return NextResponse.next();

});

const isProtectedRoute = (path: string) => {
  return /^\/admin\/(catelog|activities|categories|requests|users)(\/|$)/.test(path);
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|profile|auth/signin|401|search|programs).*)",
  ],
};