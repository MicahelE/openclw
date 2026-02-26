"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  serviceType: string | null;
  createdAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "authenticated" | "error" | "not-configured"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/admin/contacts", {
        headers: { Authorization: password },
      });

      if (res.status === 503) {
        setStatus("not-configured");
        return;
      }

      if (res.status === 401) {
        setStatus("error");
        setErrorMsg("Invalid password");
        return;
      }

      if (!res.ok) {
        setStatus("error");
        setErrorMsg("Something went wrong");
        return;
      }

      const data = await res.json();
      setContacts(data);
      setStatus("authenticated");
    } catch {
      setStatus("error");
      setErrorMsg("Failed to connect");
    }
  }

  if (status === "not-configured") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin</h1>
        <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center dark:border-yellow-800 dark:bg-yellow-950">
          <p className="text-yellow-800 dark:text-yellow-200">
            Admin is not configured. Set the <code className="rounded bg-yellow-100 px-1.5 py-0.5 font-mono text-sm dark:bg-yellow-900">ADMIN_PASSWORD</code> environment variable to enable this page.
          </p>
        </div>
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="mx-auto max-w-md px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin</h1>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          {status === "error" && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}
          <Button type="submit" variant="primary" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Contact Submissions
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {contacts.length} submission{contacts.length !== 1 && "s"}
      </p>

      {contacts.length === 0 ? (
        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">
            No contact submissions yet.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  className="bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {c.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                    {c.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                    {c.serviceType || "—"}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-gray-600 dark:text-gray-400">
                    {c.message}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-500 dark:text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
