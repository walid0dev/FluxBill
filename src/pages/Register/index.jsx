import { useActionState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { register } from "../../api/";

export default function RegisterPage() {
  const navigate = useNavigate();
  const handleSubmit = async (prevState, formData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const password_confirmation = formData.get("password_confirmation");

    if (
      !name ||
      !email ||
      !password ||
      !password_confirmation ||
      password.length < 8 ||
      password_confirmation.length < 8
    ) {
      return { error: { message: "Invalid input" }, success: false };
    }

    const { success, error } = await register({
      name,
      email,
      password,
      password_confirmation,
    });

    return { success, error };
  };

  const [state, formAction, pending] = useActionState(handleSubmit, {
    error: null,
    success: false,
  });
  const { success, error } = state;

  useEffect(() => {
    if (success) navigate("/auth/login");
  }, [success, navigate]);

  return (
    <section className="mx-auto w-full max-w-md p-6 flex flex-col justify-center">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form action={formAction} className="mt-6 space-y-4">
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            minLength={2}
            maxLength={100}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>

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
            id="password"
            name="password"
            type="password"
            minLength={8}
            maxLength={64}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password_confirmation"
            className="text-sm font-medium"
          >
            Password Confirmation
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            minLength={8}
            maxLength={64}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>
        {error && (
          <div className="space-y-1 ">
            <span className="text-red-400">
              {(() => {
                switch (error.status) {
                  case 409:
                    return "Email already exists";
                  case 422:
                    return "Invalid registration data";
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
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
