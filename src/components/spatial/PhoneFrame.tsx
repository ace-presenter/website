import type { ReactNode } from "react";

/**
 * A clean iPhone-shaped frame for the 1.2 remote screens. The raw captures
 * have their status bar cropped off (it showed low battery and the mic dot),
 * so the frame draws a neutral one. Aspect matches the 1284×2778 captures.
 * Sizes inside use container units, so the frame scales from any width.
 */
export default function PhoneFrame({
  children,
  className = "",
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[13%/6%] border border-white/12 bg-[#0B0B0D] p-[3.2%] ${className}`}
      style={{
        aspectRatio: "1284 / 2778",
        boxShadow: glow
          ? "0 40px 90px -30px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(255,255,255,0.03), 0 0 80px -20px rgba(200,16,46,0.35)"
          : "0 30px 60px -30px rgba(0,0,0,0.9)",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[11%/5.2%] bg-[#0A0A0C] [container-type:inline-size]">
        <div
          className="absolute inset-x-0 top-0 z-10 flex h-[5.05%] items-center justify-between px-[8%] font-semibold text-white/90"
          style={{ fontSize: "4.4cqw" }}
          aria-hidden
        >
          <span className="w-[24%]">9:41</span>
          <span className="h-[64%] w-[30%] rounded-full bg-black ring-1 ring-white/5" />
          <span className="flex w-[24%] justify-end">
            <span className="block h-[1.6cqw] w-[6.5cqw] rounded-[0.6cqw] bg-white/85" />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 top-[5.05%]">{children}</div>
      </div>
    </div>
  );
}
