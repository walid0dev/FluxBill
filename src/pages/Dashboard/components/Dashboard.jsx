import { use } from "react";
import {
  FiAlertCircle,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiTruck,
} from "react-icons/fi";

const CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const STATUS_META = {
  unpaid: { label: "Unpaid", color: "bg-chart-2/80", icon: FiClock },
  partially_paid: {
    label: "Partial",
    color: "bg-chart-3/80",
    icon: FiBarChart2,
  },
  paid: { label: "Paid", color: "bg-secondary/80", icon: FiCheckCircle },
  overdue: {
    label: "Overdue",
    color: "bg-destructive/80",
    icon: FiAlertCircle,
  },
};

const toCurrency = (value) => CURRENCY.format(Number(value ?? 0));

const toPercent = (value, total) => {
  if (!total) return 0;
  return Math.max(0, Math.min(100, Math.round((value / total) * 100)));
};

const Dashboard = ({ getDashboardDataPromise }) => {
  const response = use(getDashboardDataPromise);
  console.log(response);
  const metrics = response?.data ?? {};
  const topSuppliers = metrics.topSuppliers ?? [];
  const invoicesByStatus = metrics.invoicesByStatus ?? {};

  const totalInvoices = Number(metrics.totalInvoices ?? 0);
  const totalSuppliers = Number(metrics.totalSuppliers ?? 0);
  const totalAmount = Number(metrics.totalAmount ?? 0);
  const totalPaid = Number(metrics.totalPaid ?? 0);
  const totalRemaining = Number(metrics.totalRemaining ?? 0);
  const overdueCount = Number(metrics.overdueCount ?? 0);
  const overdueAmount = Number(metrics.overdueAmount ?? 0);

  const summaryCards = [
    {
      title: "Total invoices",
      value: totalInvoices.toString(),
      subtitle: `${totalSuppliers} active suppliers`,
      icon: FiFileText,
    },
    {
      title: "Invoice value",
      value: toCurrency(totalAmount),
      subtitle: "All submitted invoices",
      icon: FiDollarSign,
    },
    {
      title: "Paid amount",
      value: toCurrency(totalPaid),
      subtitle: `${toPercent(totalPaid, totalAmount)}% of invoiced amount`,
      icon: FiCheckCircle,
    },
    {
      title: "Remaining balance",
      value: toCurrency(totalRemaining),
      subtitle:
        totalRemaining < 0
          ? "Overpaid position"
          : `${toPercent(totalRemaining, totalAmount)}% still open`,
      icon: FiClock,
    },
    {
      title: "Overdue",
      value: overdueCount.toString(),
      subtitle: `${toCurrency(overdueAmount)} at risk`,
      icon: FiAlertCircle,
    },
  ];

  return (
    <section className="relative overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_0%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_70%),radial-gradient(40%_36%_at_100%_8%,color-mix(in_oklab,var(--secondary)_20%,transparent),transparent_72%)]" />
      <div className="relative">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4 rounded-2xl p-2 backdrop-blur-sm">
          <div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Invoice Dashboard
            </h1>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {summaryCards.map(({ title, value, subtitle, icon: Icon }) => (
            <article
              key={title}
              className="group rounded-2xl border border-border/80 bg-card/90 p-4 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {title}
                </p>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="text-sm" />
                </span>
              </div>
              <p className="text-2xl font-semibold tracking-tight">{value}</p>
              <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          <article className="rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground">
                Payment progress
              </h2>
              <span className="rounded-md bg-secondary/15 px-2 py-1 text-xs font-medium text-secondary">
                {toCurrency(totalPaid)} paid
              </span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-700"
                style={{ width: `${toPercent(totalPaid, totalAmount)}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{toCurrency(totalAmount)} invoiced</span>
              <span>{toCurrency(totalRemaining)} remaining</span>
            </div>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm">
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground">
              Invoice status mix
            </h2>
            <div className="mt-4 space-y-3">
              {Object.entries(STATUS_META).map(([status, meta]) => {
                const count = Number(invoicesByStatus[status] ?? 0);
                const percent = toPercent(count, totalInvoices);
                const StatusIcon = meta.icon;

                return (
                  <div key={status}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-2 text-foreground">
                        <StatusIcon className="text-sm text-muted-foreground" />
                        {meta.label}
                      </span>
                      <span className="font-mono text-muted-foreground">
                        {count} ({percent}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${meta.color} transition-[width] duration-700`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </div>

        <article className="mt-6 rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground">
              Top suppliers by amount
            </h2>
            <span className="text-xs text-muted-foreground">
              Ranked by total invoice value
            </span>
          </div>
          <div className="space-y-3">
            {topSuppliers.length === 0 && (
              <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                No supplier data available yet.
              </p>
            )}
            {topSuppliers.map((supplier, index) => (
              <div
                key={supplier.id ?? supplier.name ?? index}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/65 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {supplier.name ?? "Unnamed"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {supplier.totalInvoices ?? 0} invoices
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                    <FiTruck className="text-sm" />
                  </span>
                  <p className="font-mono text-sm font-semibold">
                    {toCurrency(supplier.totalAmount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
