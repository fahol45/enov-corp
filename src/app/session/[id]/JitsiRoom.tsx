"use client";

import { useEffect, useRef } from "react";

type Props = {
  roomName: string;
  password?: string;
  displayName: string;
  userEmail: string;
};

export default function JitsiRoom({ roomName, password, displayName, userEmail }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const domain = "meet.jit.si";
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
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        BRAND_WATERMARK_LINK: "",
        DEFAULT_BACKGROUND: "#0f172a",
        TOOLBAR_ALWAYS_VISIBLE: true,
      },
      userInfo: {
        displayName,
        email: userEmail,
      },
    };

    // @ts-expect-error JitsiMeetExternalAPI is loaded via script tag
    const api = new window.JitsiMeetExternalAPI(domain, options);

    if (password) {
      api.addEventListener("videoConferenceJoined", () => {
        api.executeCommand("password", password);
      });
    }

    return () => api.dispose();
  }, [roomName, password, displayName, userEmail]);

  return (
    <>
      <script src="https://meet.jit.si/external_api.js" async />
      <div ref={containerRef} className="w-full h-full" />
    </>
  );
}
