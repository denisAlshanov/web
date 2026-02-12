import "next-auth";
import "next-auth/jwt";

interface BackendUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  status: string;
  isRoot: boolean;
  avatarUrl: string;
}

declare module "next-auth" {
  interface Session {
    backendAccessToken?: string;
    backendUser?: BackendUser;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendAccessToken?: string;
    backendRefreshToken?: string;
    backendExpiresAt?: number;
    backendUser?: BackendUser;
    googleAccessToken?: string;
    googleRefreshToken?: string;
    error?: string;
  }
}
