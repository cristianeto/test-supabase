import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user: ", user)
  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.user_metadata.first_name}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Cerrar sesión
        </button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Link
        href="/login"
        className="h-8 flex items-center justify-center rounded-md no-underline text-sm font-medium px-4"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="h-8 flex items-center justify-center rounded-md no-underline bg-black text-white text-sm font-medium px-4"
      >
        Sign up
      </Link>
    </div>
  );
}
