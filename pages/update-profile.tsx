"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  pincode?: string;
}

const UpdateProfile: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // Original details fetched from the server.
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  // Local state for holding updated values.
  const [updatedUser, setUpdatedUser] = useState<UserDetails | null>(null);
  
  // Field for current password (always required if there are any changes)
  const [currentPassword, setCurrentPassword] = useState("");
  // Fields for new password update (optional)
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Track which basic fields are in editing mode.
  const [editing, setEditing] = useState<{ [key: string]: boolean }>({
    name: false,
    email: false,
    phone: false,
    address: false,
    pincode: false,
  });
  // Toggle for showing/hiding the "Change Password" panel.
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  // Flag to indicate if any changes were made.
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch user details on mount.
  useEffect(() => {
    if (session?.user?._id) {
      fetch(`/api/users/${session.user._id}`)
        .then((res) => res.json())
        .then((data) => {
          setUserDetails(data);
          setUpdatedUser(data);
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, [session?.user?._id]);

  // Compare updated values with original values to detect changes.
  useEffect(() => {
    if (userDetails && updatedUser) {
      const fields: (keyof UserDetails)[] = ["name", "email", "phone", "address", "pincode"];
      const basicChange = fields.some(
        (field) => (userDetails[field] || "") !== (updatedUser[field] || "")
      );
      // Also consider a change if the password drop down is active and new password fields are non-empty.
      const passwordChange = showPasswordFields && (newPassword.length > 0 || confirmNewPassword.length > 0);
      setHasChanges(basicChange || passwordChange);
    }
  }, [updatedUser, userDetails, newPassword, confirmNewPassword, showPasswordFields]);

  const handleFieldChange = (field: keyof UserDetails, value: string) => {
    if (updatedUser) {
      setUpdatedUser({ ...updatedUser, [field]: value });
    }
  };

  const toggleEditing = (field: keyof UserDetails) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Toggle the password panel (only new password fields)
  const handleTogglePasswordFields = () => {
    setShowPasswordFields((prev) => !prev);
    if (showPasswordFields) {
      // If closing the panel, clear new password fields.
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  const handleSaveChanges = async () => {
    if (!session?.user?._id || !updatedUser) return;

    // Always require current password for any update.
    if (!currentPassword) {
      alert("Please enter your current password to update your profile.");
      return;
    }

    // If user has toggled the password panel, validate the new passwords.
    if (showPasswordFields) {
      if (newPassword !== confirmNewPassword) {
        alert("New password and confirm password do not match.");
        return;
      }
    }

    setSaving(true);
    try {
      // Prepare the update payload.
      const payload = {
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        pincode: updatedUser.pincode,
        currentPassword,
        newPassword: showPasswordFields && newPassword.trim().length > 0 ? newPassword : undefined,
      };

      // Note: The PUT request URL is /api/users/<id>.
      const res = await axios.put(`/api/users/${session.user._id}`, payload);
      if (res.status === 200) {
        setUserDetails(updatedUser);
        setEditing({
          name: false,
          email: false,
          phone: false,
          address: false,
          pincode: false,
        });
        setHasChanges(false);
        // Clear password fields.
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setShowPasswordFields(false);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Error updating profile. Please check your current password and try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!userDetails || !updatedUser) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
      <div className="max-w-2xl mx-auto space-y-4">
        {(["name", "email", "phone", "address", "pincode"] as (keyof UserDetails)[]).map((field) => (
          <div key={field} className="flex items-center">
            <label className="w-32 capitalize">{field}:</label>
            {editing[field] ? (
              <input
                type="text"
                value={updatedUser[field] || ""}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                className="bg-[#1a1a1a] border border-gray-600 p-2 flex-1"
              />
            ) : (
              <span className="flex-1">{updatedUser[field] || "Not set"}</span>
            )}
            <button onClick={() => toggleEditing(field)} className="ml-2 focus:outline-none">
              {/* Pencil Icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536M9 11l3.536-3.536m0 0L20.5 3.5a2.121 2.121 0 113 3L15 11m-6 2v6h6l6-6"
                />
              </svg>
            </button>
          </div>
        ))}

        {/* Show current password field if there are changes */}
        {hasChanges && (
          <div className="mt-4 flex items-center">
            <label className="w-40">Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="bg-[#1a1a1a] border border-gray-600 p-2 flex-1"
            />
          </div>
        )}

        {/* Toggle Change Password Panel */}
        <div className="mt-6">
          <button
            onClick={handleTogglePasswordFields}
            className="px-4 py-2 bg-[#800000] text-white rounded-md hover:bg-[#8B0000] transition"
          >
            {showPasswordFields ? "Cancel Password Change" : "Change Password"}
          </button>
        </div>

        {/* Change Password Panel: Only new password and confirm new password */}
        {showPasswordFields && (
          <div className="mt-4 space-y-4 border-t border-gray-600 pt-4">
            <div className="flex items-center">
              <label className="w-40">New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="bg-[#1a1a1a] border border-gray-600 p-2 flex-1"
              />
            </div>
            <div className="flex items-center">
              <label className="w-40">Confirm New:</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="bg-[#1a1a1a] border border-gray-600 p-2 flex-1"
              />
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleSaveChanges}
            disabled={!hasChanges || saving}
            className={`px-4 py-2 rounded ${
              hasChanges && !saving
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
