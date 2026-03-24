import Badge from "./Badge";
import InfoRow from "./InfoRow";
import SectionLabel from "./SectionLabel";

type Props = {
  user: {
    name: string;
    role: string;
    email: string;
    telephoneNumber: string;
  };
};

export default function AccountInfoCard({ user }: Props) {
  return (
    <div className="card">
      <SectionLabel text="Account Information" />
      <div className="profile-identity">
        <div className="avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="profile-name">{user.name}</p>
          <Badge role={user.role} />
        </div>
      </div>
      <InfoRow label="Email" value={user.email} />
      <InfoRow label="Phone" value={user.telephoneNumber} />
    </div>
  );
}