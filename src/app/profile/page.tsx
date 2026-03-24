"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AccountInfoCard from "@/components/profile/AccountInfoCard";
import ChangePasswordCard from "@/components/profile/ChangePasswordCard";
import DeleteAccountCard from "@/components/profile/DeleteAccountCard";
import "@/components/profile/profile.css";

export default function ProfilePage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user || !token) return null;

  return (
    <main className="site-shell">
      <div className="profile-layout">

        {/* Header */}
        <div className="profile-header">
          <div className="eyebrow">Account</div>
          <h1>Profile Settings</h1>
        </div>

        <AccountInfoCard user={user} />
        <ChangePasswordCard token={token} />
        <DeleteAccountCard token={token} />

      </div>
    </main>
  );
}