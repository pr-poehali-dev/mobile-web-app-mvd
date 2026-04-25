import { STATUS_COLORS, STATUS_LABELS } from "@/types";
import type { WantedPerson } from "@/types";

export default function StatusBadge({ status }: { status: WantedPerson["status"] }) {
  return (
    <span className={`status-badge ${STATUS_COLORS[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
