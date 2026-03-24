import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearAuth } from "@/redux/features/authSlice";
import { fetchWithAuth } from "@/libs/fetchWithAuth";
import SectionLabel from "./SectionLabel";

type Props = {
  token: string;
};

export default function DeleteAccountCard({ token }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
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
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="card card--danger">
        <SectionLabel text="Danger Zone" />
        <div className="danger-row">
          <div>
            <p className="danger-title">Delete Account</p>
            <p className="danger-desc">This action is permanent and cannot be undone.</p>
          </div>
          <button className="button button--danger" onClick={() => setShowConfirm(true)}>
            Delete Account
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete your account?</h3>
            <p>
              All your data including bookings will be permanently removed.
              This cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="button button--secondary"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="button button--danger-fill"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}