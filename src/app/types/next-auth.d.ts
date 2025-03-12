import "next-auth";

declare module "next-auth" {

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      token?: string;
    };
    expires: string;
  }

  interface JWT {
    id: string;
    accessToken: string;
    expiresAt: number;
  }

  interface User {
    id: string;
  }
  interface User {
    id: string;
    token: string;
    expiresAt: number;
  }

  interface Session {
    user: {
      id: string;
      accessToken: string;
    };
    expires: string;
  }

  interface JWT {
    id: string;
    accessToken: string;
    expiresAt: number;
  }

}
