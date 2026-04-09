import { withAuth } from 'next-auth/middleware';

export const middleware = withAuth({
    pages: {
        signIn: '/api/auth/signin',
    },
});

export const config = {
    matcher: ["/somethingplaceholder"],
    // matcher: ["/child-profile", "/resources-map", "/staff-directory", "/support-groups"], // protect access to the features, must be logging to access
};