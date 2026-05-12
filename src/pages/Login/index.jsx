import { useActionState } from "react";
import { login } from "../../api/";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
export default function LoginPage() {
  const naviagte = useNavigate();
  const handleSubmit = async (prevState, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password || password.length < 8)
      return { error: { message: "Invalid input" } };

    const { data, error } = await login({ email, password });
    if (error) return { error };

    const token = data;
    console.log(token);
    localStorage.setItem("token", token);
    return { success: true, error: null };
  };
  const [state, formAction, pending] = useActionState(handleSubmit, {
    error: null,
    success: false,
  });
  const { success, error } = state;
  useEffect(() => {
    if (success) naviagte("/");
  }, [success, naviagte]);
  return (
    <section className="mx-auto w-full max-w-md p-6 flex flex-col justify-center">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form action={formAction} className="mt-6 space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            minLength={8}
            maxLength={64}
            id="password"
            name="password"
            type="password"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>
        {error && (
          <div className="space-y-1 ">
            <span className="text-red-400">
              {(() => {
                switch (error.status) {
                  case 404:
                    return "Account not found";
                  case 422:
                    return "Invalide credentials";
                  default:
                    return error.message;
                }
              })()}
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {!pending ? "Submit" : "..."}
        </button>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/auth/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
}
