import { withAuth } from 'next-auth/middleware';

const middleware = withAuth({
    pages: {
        signIn: '/api/auth/signin',
    },
});

export default middleware;

export const config = {
    matcher: ["/child-profile/:path*", "/resources-map/:path*", "/staff-directory/:path*", "/support-groups/:path*"], // protect access to the features, must be logging to access
};