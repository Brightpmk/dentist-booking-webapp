export default function Badge({ role }: { role: string }) {
  return (
    <span className={`badge ${role === "admin" ? "badge--admin" : "badge--user"}`}>
      {role}
    </span>
  );
}