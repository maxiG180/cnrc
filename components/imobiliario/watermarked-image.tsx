import Image, { ImageProps } from "next/image";

type WatermarkedImageProps = ImageProps & {
  showWatermark?: boolean;
};

export function WatermarkedImage({ showWatermark = true, ...props }: WatermarkedImageProps) {
  return (
    <div className="relative w-full h-full">
      <Image {...props} />
      {showWatermark && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <Image
            src="/Logos/CNRC/Logos_CNRC_Transparent.png"
            alt="CNRC"
            width={100}
            height={40}
            className="opacity-40"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
}
