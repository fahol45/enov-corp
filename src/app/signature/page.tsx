"use client";

import Image from "next/image";
import { useState } from "react";

const SIGNATURE_HTML = `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 13px; color: #1a1a1a;">
  <tr>
    <td style="padding-right: 16px; vertical-align: middle; border-right: 2px solid #e5e7eb;">
      <img src="https://enovcorp.com/logo-enov.png" alt="Enov Corp" width="80" style="display:block;" />
    </td>
    <td style="padding-left: 16px; vertical-align: middle;">
      <p style="margin: 0 0 2px 0; font-weight: 700; font-size: 14px; color: #111827;">Enov Corp</p>
      <p style="margin: 0 0 6px 0; font-size: 12px; color: #6b7280;">Innovation &amp; Technologie</p>
      <p style="margin: 0 0 2px 0;">
        <a href="mailto:contact@enovcorp.com" style="color: #2563eb; text-decoration: none;">contact@enovcorp.com</a>
      </p>
      <p style="margin: 0 0 8px 0;">
        <a href="https://enovcorp.com" style="color: #2563eb; text-decoration: none;">enovcorp.com</a>
      </p>
      <p style="margin: 0;">
        <a href="https://www.linkedin.com/company/enovcorp/" style="color: #6b7280; text-decoration: none; margin-right: 8px; font-size: 12px;">LinkedIn</a>
        <a href="https://www.instagram.com/enovcorp/" style="color: #6b7280; text-decoration: none; margin-right: 8px; font-size: 12px;">Instagram</a>
        <a href="https://web.facebook.com/profile.php?id=61590093913760" style="color: #6b7280; text-decoration: none; font-size: 12px;">Facebook</a>
      </p>
    </td>
  </tr>
</table>`;

export default function SignaturePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const blob = new Blob([SIGNATURE_HTML], { type: "text/html" });
    const item = new ClipboardItem({ "text/html": blob });
    await navigator.clipboard.write([item]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Signature Email</h1>
        <p className="text-gray-500 text-sm mb-8">
          Copie la signature et colle-la dans Gmail → Paramètres → Signature.
        </p>

        {/* Aperçu */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-semibold">Aperçu</p>
          <table cellPadding={0} cellSpacing={0} style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#1a1a1a" }}>
            <tbody>
              <tr>
                <td style={{ paddingRight: 16, verticalAlign: "middle", borderRight: "2px solid #e5e7eb" }}>
                  <Image src="/logo-enov.png" alt="Enov Corp" width={80} height={40} style={{ display: "block" }} />
                </td>
                <td style={{ paddingLeft: 16, verticalAlign: "middle" }}>
                  <p style={{ margin: "0 0 2px 0", fontWeight: 700, fontSize: 14, color: "#111827" }}>Enov Corp</p>
                  <p style={{ margin: "0 0 6px 0", fontSize: 12, color: "#6b7280" }}>Innovation &amp; Technologie</p>
                  <p style={{ margin: "0 0 2px 0" }}>
                    <a href="mailto:contact@enovcorp.com" style={{ color: "#2563eb", textDecoration: "none" }}>contact@enovcorp.com</a>
                  </p>
                  <p style={{ margin: "0 0 8px 0" }}>
                    <a href="https://enovcorp.com" style={{ color: "#2563eb", textDecoration: "none" }}>enovcorp.com</a>
                  </p>
                  <p style={{ margin: 0 }}>
                    <a href="https://www.linkedin.com/company/enovcorp/" style={{ color: "#6b7280", textDecoration: "none", marginRight: 8, fontSize: 12 }}>LinkedIn</a>
                    <a href="https://www.instagram.com/enovcorp/" style={{ color: "#6b7280", textDecoration: "none", marginRight: 8, fontSize: 12 }}>Instagram</a>
                    <a href="https://web.facebook.com/profile.php?id=61590093913760" style={{ color: "#6b7280", textDecoration: "none", fontSize: 12 }}>Facebook</a>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bouton copier */}
        <button
          onClick={handleCopy}
          className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-colors"
          style={{ backgroundColor: copied ? "#16a34a" : "#2563eb" }}
        >
          {copied ? "Copié !" : "Copier la signature HTML"}
        </button>

        {/* Instructions */}
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-semibold">Comment l&apos;utiliser dans Gmail</p>
          <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
            <li>Clique sur <strong>&quot;Copier la signature HTML&quot;</strong> ci-dessus</li>
            <li>Ouvre <strong>Gmail</strong> → Paramètres (⚙️) → <strong>Voir tous les paramètres</strong></li>
            <li>Onglet <strong>&quot;Général&quot;</strong> → descends jusqu&apos;à <strong>&quot;Signature&quot;</strong></li>
            <li>Clique sur <strong>&quot;Créer une signature&quot;</strong></li>
            <li>Dans la zone de texte, fais <strong>Ctrl+Shift+V</strong> (coller sans mise en forme) ou colle directement</li>
            <li>Enregistre les modifications</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
