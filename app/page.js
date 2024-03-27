"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";

export default function Home() {
  const params = useSearchParams();
  const [constEnded, setConstEnded] = useState(false);
  const startCon = async (element) => {
    const { ZegoUIKitPrebuilt } = await import(
      "@zegocloud/zego-uikit-prebuilt"
    );
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID),
      process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET,
      params.get("roomID") || new Date().getTime().toString(),
      Date.now().toString(),
      new Date().getTime() + 3600 * 1000
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
              params.get("roomID") || new Date().getTime().toString(),
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
    <Suspense>
      <div className="flex h-screen items-center justify-center">
        <div className="h-full w-full" ref={startCon} />
        {constEnded && <div className="fixed inset-0 bg-white z-50"></div>}
      </div>
    </Suspense>
  );
}
