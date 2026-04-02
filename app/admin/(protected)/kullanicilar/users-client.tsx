"use client";

import { useActionState, useTransition } from "react";
import { createUserAction, toggleUserActiveAction, deleteUserAction } from "./user-actions";

type User = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: Date;
};

export default function UsersClient({ users }: { users: User[] }) {
  const [state, formAction, isPending] = useActionState(createUserAction, null);
  const [isToggling, startToggle] = useTransition();
  const [isDeleting, startDelete] = useTransition();

  return (
    <div className="space-y-10">
      {/* Kullanıcı Listesi */}
      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-stone-600">Ad</th>
              <th className="px-4 py-3 font-semibold text-stone-600">E-posta</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Kayıt Tarihi</th>
              <th className="px-4 py-3 font-semibold text-stone-600">Durum</th>
              <th className="px-4 py-3 font-semibold text-stone-600"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 font-medium text-stone-800">{user.name}</td>
                <td className="px-4 py-3 text-stone-600">{user.email}</td>
                <td className="px-4 py-3 whitespace-nowrap text-stone-500">
                  {user.createdAt.toLocaleDateString("tr-TR")}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    user.active ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-500"
                  }`}>
                    {user.active ? "Aktif" : "Pasif"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={isToggling || isDeleting}
                      onClick={() =>
                        startToggle(() => toggleUserActiveAction(user.id, !user.active))
                      }
                      className={`rounded-md border px-3 py-1 text-xs font-medium transition disabled:opacity-50 ${
                        user.active
                          ? "border-stone-200 text-stone-600 hover:border-red-200 hover:text-red-600"
                          : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      {user.active ? "Devre Dışı Bırak" : "Etkinleştir"}
                    </button>
                    <button
                      disabled={isDeleting || isToggling}
                      onClick={() => {
                        if (confirm(`"${user.name}" adlı kullanıcıyı silmek istediğinize emin misiniz?`)) {
                          startDelete(() => deleteUserAction(user.id));
                        }
                      }}
                      className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Yeni Kullanıcı Formu */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-stone-800">Yeni Kullanıcı Ekle</h2>
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">Ad Soyad</label>
              <input
                name="name"
                required
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                placeholder="Admin Ad"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">E-posta</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                placeholder="email@kurum.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">Şifre</label>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                placeholder="Min. 8 karakter"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-stone-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {isPending ? "Ekleniyor…" : "Kullanıcı Ekle"}
          </button>
        </form>
      </div>
    </div>
  );
}
