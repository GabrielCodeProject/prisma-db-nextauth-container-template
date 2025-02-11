declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    emailVerified: DateTime;
    image: string;
    accounts: Account[];
    sessions: Session[];
    createdAt: DateTime;
    updatedAt: DateTime;
  }
}
