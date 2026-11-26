import { FILTERS, type StatusFilter } from "@/lib/tasks";
import { cn } from "@/lib/utils";

interface StatusFiltersProps {
  value: StatusFilter;
  counts: Record<StatusFilter, number>;
  onChange: (value: StatusFilter) => void;
}

export function StatusFilters({ value, counts, onChange }: StatusFiltersProps) {
  return (
    <div role="group" aria-label="Filtrar tarefas por status" className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => {
        const active = filter.value === value;
        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(filter.value)}
            className={cn(
              "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-card text-foreground hover:bg-accent",
            )}
          >
            {filter.label}
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs",
                active ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground",
              )}
            >
              <span className="sr-only">(</span>
              {counts[filter.value]}
              <span className="sr-only"> tarefas)</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
