import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Only allow access to /image-uploader if user is logged in
      if (req.nextUrl.pathname.startsWith('/image-uploader')) {
        return token?.role === 'admin';
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/image-uploader'],
};
