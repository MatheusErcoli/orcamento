"use client";

import Link from "next/link";
import FormOrcamento from "@/components/FormOrcamento";

export default function Novo() {
  return (
    <div className="space-y-4">
      <Link
        href="/"
        className="text-blue-600 hover:underline"
      >
        ← Voltar
      </Link>

      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">
          Novo Orçamento
        </h1>

        <FormOrcamento />
      </div>
    </div>
  );
}