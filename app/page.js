"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [constEnded, setConstEnded] = useState(false);
  const startCon = async (element) => {
    const { ZegoUIKitPrebuilt } = await import(
      "@zegocloud/zego-uikit-prebuilt"
    );
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID),
      process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET,
      router.query.roomID,
      Date.now().toString(),
      "Priyangsu"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            "713-macc34",
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      onLeaveRoom: () => {
        setConstEnded(true);
        window.location.reload();
      },
    });
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-full w-full" ref={startCon} />
      {constEnded && <div className="fixed inset-0 bg-white z-50"></div>}
    </div>
  );
}
