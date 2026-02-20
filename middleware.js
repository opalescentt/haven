import { withAuth } from 'next-auth/middleware';

export const middleware = withAuth({
    pages: {
        signIn: '/api/auth/signin',
    },
});

export const config = {
    matcher: ["/child-profile"],
};