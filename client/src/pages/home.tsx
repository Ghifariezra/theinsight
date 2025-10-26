import HeroImage from "@/assets/home/hero.png";

export default function Home() {
    return (
        <section className="min-h-screen flex flex-col-reverse sm:flex-row items-center justify-between px-6 sm:px-12 py-10 bg-white text-gray-900">
            {/* Left: Text Section */}
            <div className="flex flex-col gap-6 max-w-2xl w-fit">
                <h1 className="libertinus-sans-bold text-4xl sm:text-6xl md:text-8xl/22 font-extrabold leading-tight tracking-tight">
                    Connect Through Stories.
                </h1>

                {/* Description */}
                <blockquote className="text-gray-600 text-base md:text-lg border-l-4 border-blue-700 pl-4 italic">
                    “The Insight connects people through personal stories, experiences, and lessons that shape who we are.”
                </blockquote>
            </div>

            {/* Right: Hero Image */}
            <div className="aspect-auto w-full overflow-hidden">
                <img
                    src={HeroImage}
                    alt="Hero illustration"
                    className="w-full h-full object-cover drop-shadow-md"
                />
            </div>
        </section>
    );
}
