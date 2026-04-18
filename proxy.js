import { withAuth } from 'next-auth/middleware';

const proxy = withAuth({
    pages: {
        signIn: '/auth/signin',
    },
});

export default proxy;

export const config = {
    matcher: ["/child-profile/:path*", "/resources-map/:path*", "/staff-directory/:path*", "/support-groups/:path*"],
};