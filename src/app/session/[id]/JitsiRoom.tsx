"use client";

import { useEffect, useRef } from "react";

type Props = {
  roomName: string;
  password?: string;
  displayName: string;
  userEmail: string;
};

const JITSI_SCRIPT_URL = "https://meet.jit.si/external_api.js";

function loadJitsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Already loaded
    // @ts-expect-error global
    if (window.JitsiMeetExternalAPI) { resolve(); return; }
    // Script already in DOM (loading)
    const existing = document.querySelector(`script[src="${JITSI_SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = JITSI_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export default function JitsiRoom({ roomName, password, displayName, userEmail }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let api: { dispose: () => void; addEventListener: (e: string, cb: () => void) => void; executeCommand: (cmd: string, arg: string) => void } | null = null;
    let cancelled = false;

    loadJitsiScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;

        const options = {
          roomName,
          parentNode: containerRef.current,
          width: "100%",
          height: "100%",
          configOverwrite: {
            startWithAudioMuted: true,
            disableDeepLinking: true,
            enableWelcomePage: false,
            prejoinPageEnabled: false,
            toolbarButtons: [
              "microphone", "camera", "chat", "raisehand",
              "tileview", "fullscreen", "hangup",
            ],
          },
          userInfo: { displayName, email: userEmail },
        };

        // @ts-expect-error global loaded via script
        api = new window.JitsiMeetExternalAPI("meet.jit.si", options);

        if (password && api) {
          api.addEventListener("videoConferenceJoined", () => {
            api!.executeCommand("password", password);
          });
        }
      })
      .catch(() => {
        console.error("Impossible de charger Jitsi Meet.");
      });

    return () => {
      cancelled = true;
      try { api?.dispose(); } catch { /* ignore */ }
    };
  }, [roomName, password, displayName, userEmail]);

  return <div ref={containerRef} className="w-full h-full" />;
}
