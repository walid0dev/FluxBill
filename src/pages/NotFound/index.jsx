import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link className="mt-2 inline-flex text-primary underline" to="/">
        Back to dashboard
      </Link>
    </section>
  );
}
