import { withAuth } from 'next-auth/middleware';

const proxy = withAuth({
    pages: {
        signIn: '/api/auth/signin',
    },
});

export default proxy;

export const config = {
    matcher: ["/child-profile", "/resources-map", "/staff-directory", "/support-groups"],
};