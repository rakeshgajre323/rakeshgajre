import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/8bit-button";

interface NotFound1Props {
  className?: string;
  cta?: string;
  description?: string;
  href?: string;
  imageSrc?: string;
  title?: string;
}

export default function NotFound1({
  title = "You made the Ogre angry!",
  description = "This room doesn't exist. Turn back before it's too late.",
  cta = "Return to Home Page",
  href = "/",
  imageSrc = "https://www.8bitcn.com/_next/image?url=%2Fimages%2F8bit-ogre.png&w=256&q=75&dpl=dpl_B9Q5u7DD6qZpoCz3VRwuR19npVHK",
  className,
}: NotFound1Props) {
  return (
    <section
      className={cn(
        "flex min-h-screen w-full items-center justify-center bg-black text-white px-4 py-20",
        className
      )}
    >
      <div className="flex flex-col items-center text-center max-w-2xl">
        <h1 className="font-pixel text-[clamp(3rem,10vw,8rem)] leading-none mb-6">
          404
        </h1>

        {imageSrc && (
          <img
            src={imageSrc}
            alt="Angry Ogre"
            className="w-48 h-auto mb-6 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        )}

        <h2 className="font-pixel text-base md:text-xl mb-4 leading-relaxed">
          {title}
        </h2>

        <p className="font-pixel text-xs md:text-sm text-white/70 mb-10 max-w-md leading-relaxed">
          {description}
        </p>

        <Button href={href}>{cta}</Button>
      </div>
    </section>
  );
}
