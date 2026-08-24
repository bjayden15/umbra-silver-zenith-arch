import { useRef, useState } from "react";
import type { PhotoAsset } from "@/lib/game/types";
import { cn } from "@/lib/utils";
import { GhostBtn, PrimaryBtn } from "./bits";

export function PhotoCrop({
  dark,
  onSave,
}: {
  dark?: boolean;
  onSave: (photo: PhotoAsset) => void;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onFile = (file: File | undefined) => {
    if (!file) return;
    const ok = ["image/png", "image/jpeg", "image/jpg"].includes(file.type) || /\.(png|jpe?g)$/i.test(file.name);
    if (!ok) return;
    if (file.size > 6_000_000) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  };

  const crop = () => {
    if (!src) return;
    const img = imgRef.current;
    if (!img || !img.naturalWidth) return;
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const side = Math.min(img.naturalWidth, img.naturalHeight);
    const dw = side / zoom;
    const cx = img.naturalWidth / 2 + (pan.x / 100) * img.naturalWidth;
    const cy = img.naturalHeight / 2 + (pan.y / 100) * img.naturalHeight;
    const sx = clamp(cx - dw / 2, 0, img.naturalWidth - dw);
    const sy = clamp(cy - dw / 2, 0, img.naturalHeight - dw);
    ctx.drawImage(img, sx, sy, dw, dw, 0, 0, size, size);
    const out = canvas.toDataURL("image/jpeg", 0.82);
    onSave({ src: out, zoom, panX: pan.x, panY: pan.y });
  };

  return (
    <div className="grid gap-3">
      <label className={cn("text-xs", dark ? "text-white/50" : "text-muted")}>
        Upload PNG or JPG
        <input
          type="file"
          accept="image/png,image/jpeg,.png,.jpg,.jpeg"
          className="mt-1 block w-full text-sm"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </label>
      {src ? (
        <>
          <div
            className="relative mx-auto size-44 overflow-hidden rounded-full border border-border bg-elevated"
            onPointerDown={(e) => {
              drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
              (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (!drag.current) return;
              const dx = (e.clientX - drag.current.x) / 1.6;
              const dy = (e.clientY - drag.current.y) / 1.6;
              setPan({
                x: clamp(drag.current.px + dx, -40, 40),
                y: clamp(drag.current.py + dy, -40, 40),
              });
            }}
            onPointerUp={() => {
              drag.current = null;
            }}
          >
            <img
              ref={imgRef}
              src={src}
              alt=""
              crossOrigin="anonymous"
              className="pointer-events-none absolute inset-0 size-full object-cover"
              style={{ transform: `scale(${zoom}) translate(${pan.x}%, ${pan.y}%)` }}
            />
          </div>
          <label className={cn("grid gap-1 text-xs", dark ? "text-white/50" : "text-muted")}>
            Zoom
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <PrimaryBtn onClick={crop}>Crop & save</PrimaryBtn>
            <GhostBtn
              onClick={() => {
                setSrc(null);
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
            >
              Clear
            </GhostBtn>
          </div>
          <p className={cn("text-xs", dark ? "text-white/40" : "text-muted")}>
            Drag to pan. Crops square and scales across wiki, magazine covers, and every app header.
          </p>
        </>
      ) : null}
    </div>
  );
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}
