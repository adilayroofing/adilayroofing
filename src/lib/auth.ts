import { createServerSupabaseClient } from "./supabase-server";

export type UserRole = "admin" | "editor" | "viewer";

export interface CmsUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

/** Get the currently authenticated CMS user with their role */
export async function getCurrentUser(): Promise<CmsUser | null> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const { data: cmsUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (!cmsUser) return null;

  return {
    id: cmsUser.id,
    email: cmsUser.email,
    name: cmsUser.name,
    role: cmsUser.role as UserRole,
  };
}

/** Check if the current user has admin role */
export async function requireAdmin(): Promise<CmsUser> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized: admin access required");
  }
  return user;
}

/** Check if the current user is authenticated (any role) */
export async function requireAuth(): Promise<CmsUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: authentication required");
  }
  return user;
}
