"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchWithAuth } from "@/libs/fetchWithAuth";
import { useDispatch } from "react-redux";
import { clearAuth } from "@/redux/features/authSlice";

function SectionLabel({ text }: { text: string }) {
  return (
    <p
      style={{
        fontSize: "0.65rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#c9a96e",
        fontWeight: 600,
        marginBottom: "0.75rem",
      }}
    >
      {text}
    </p>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.85rem 0",
        borderBottom: "1px solid #e8e4df",
      }}
    >
      <span style={{ color: "#888", fontSize: "0.875rem" }}>{label}</span>
      <span style={{ color: "#1a2332", fontWeight: 500, fontSize: "0.9rem" }}>
        {value}
      </span>
    </div>
  );
}

function Badge({ role }: { role: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.2rem 0.75rem",
        borderRadius: "999px",
        fontSize: "0.7rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontWeight: 700,
        background: role === "admin" ? "#1a2332" : "#f0ebe4",
        color: role === "admin" ? "#c9a96e" : "#1a2332",
      }}
    >
      {role}
    </span>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) return null;

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMessage(null);

    if (newPassword !== confirmPassword) {
      setPwMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setPwMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }
    if (!token) {
      setPwMessage({
        type: "error",
        text: "Session expired. Please log in again.",
      });
      return;
    }

    setPwLoading(true);
    try {
      await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`,
        token,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPassword, newPassword }),
        },
      );
      setPwMessage({ type: "success", text: "Password changed successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwMessage({
        type: "error",
        text: err.message || "Failed to change password.",
      });
    } finally {
      setPwLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
  if (!token) return;
  setDeleteLoading(true);
  try {
    await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
      token,
      { method: "DELETE" }
    );
    dispatch(clearAuth());
    router.push("/");
  } catch (err: any) {
    alert(err.message || "Failed to delete account.");
  } finally {
    setDeleteLoading(false);
    setShowDeleteConfirm(false);
  }
};

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.7rem 1rem",
    border: "1.5px solid #ddd8d0",
    borderRadius: "8px",
    background: "#faf8f5",
    fontSize: "0.875rem",
    color: "#1a2332",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
    marginBottom: "1.25rem",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0ece6",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c9a96e",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Account
          </p>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#1a2332",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Profile Settings
          </h1>
        </div>

        {/* Account Info Card */}
        <div style={cardStyle}>
          <SectionLabel text="Account Information" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "#1a2332",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#c9a96e",
                fontSize: "1.25rem",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontWeight: 700,
                  color: "#1a2332",
                  fontSize: "1.1rem",
                }}
              >
                {user.name}
              </p>
              <Badge role={user.role} />
            </div>
          </div>
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Phone" value={user.telephoneNumber} />
        </div>

        {/* Change Password Card */}
        <div style={cardStyle}>
          <SectionLabel text="Security" />
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#1a2332",
              margin: "0 0 1.25rem",
            }}
          >
            Change Password
          </h2>
          <form
            onSubmit={handleChangePassword}
            style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  color: "#666",
                  marginBottom: "0.35rem",
                }}
              >
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Enter current password"
                style={inputStyle}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  color: "#666",
                  marginBottom: "0.35rem",
                }}
              >
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                style={inputStyle}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  color: "#666",
                  marginBottom: "0.35rem",
                }}
              >
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
                style={inputStyle}
              />
            </div>

            {pwMessage && (
              <div
                style={{
                  padding: "0.7rem 1rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  background:
                    pwMessage.type === "success" ? "#f0faf4" : "#fff5f5",
                  color: pwMessage.type === "success" ? "#2d7a4f" : "#c0392b",
                  border: `1px solid ${pwMessage.type === "success" ? "#b7e4c7" : "#f5c6c6"}`,
                }}
              >
                {pwMessage.text}
              </div>
            )}

            <button
              type="submit"
              disabled={pwLoading}
              style={{
                marginTop: "0.25rem",
                padding: "0.75rem 1.5rem",
                background: pwLoading ? "#8a9bb0" : "#1a2332",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: pwLoading ? "not-allowed" : "pointer",
                letterSpacing: "0.03em",
                transition: "background 0.2s",
                alignSelf: "flex-start",
              }}
            >
              {pwLoading ? "Saving…" : "Update Password"}
            </button>
          </form>
        </div>

        {/* Danger Zone Card */}
        <div style={{ ...cardStyle, border: "1.5px solid #fddede" }}>
          <SectionLabel text="Danger Zone" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 0.25rem",
                  fontWeight: 600,
                  color: "#1a2332",
                  fontSize: "0.95rem",
                }}
              >
                Delete Account
              </p>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "#999" }}>
                This action is permanent and cannot be undone.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              style={{
                padding: "0.6rem 1.25rem",
                background: "transparent",
                color: "#c0392b",
                border: "1.5px solid #c0392b",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "2rem",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <h3
              style={{
                margin: "0 0 0.75rem",
                color: "#1a2332",
                fontSize: "1.15rem",
                fontWeight: 700,
              }}
            >
              Delete your account?
            </h3>
            <p
              style={{
                margin: "0 0 1.5rem",
                color: "#666",
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              All your data including bookings will be permanently removed. This
              cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  flex: 1,
                  padding: "0.7rem",
                  background: "#f0ece6",
                  color: "#1a2332",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                style={{
                  flex: 1,
                  padding: "0.7rem",
                  background: "#c0392b",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: deleteLoading ? "not-allowed" : "pointer",
                  opacity: deleteLoading ? 0.7 : 1,
                }}
              >
                {deleteLoading ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
