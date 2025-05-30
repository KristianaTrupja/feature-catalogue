import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { ArrowIcon } from "@/app/lib/icons";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-center max-lg:items-center max-lg:text-center">
          {/* Left Column */}
          <div className="left-column">
            <Button asChild variant={"ghost"} className="font-bold h-auto pt-0 px-0">
              <Link className="text-4xl font-bold lg:mb-6 relative inline-block pb-5" href={"https://canvasreply.de/"} target="_blank" rel="noopener noreferrer">
                Get in touch
                <span className="absolute bottom-0 left-0 w-full title-underscore h-5"></span>
              </Link>
            </Button>

            <div className="flex space-x-4 mt-8 max-lg:justify-center">
              <Button asChild className="" size={"icon"} variant={"social"}>
                <Link
                  href="https://www.linkedin.com/company/canvas-reply-gmbh/"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Go to social media profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fff"
                      d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z"
                    ></path>
                  </svg>
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            <div className="lg:mt-4 flex items-start gap-6 text-center leading-7 sm:gap-12 lg:text-left md:col-start-auto">
              <ul className="w-full last:font-normal font-semibold">
                <li className="py-1">
                  <Link href="https://canvasreply.de/en/pages/Services" target="_blank" rel="noopener noreferrer">
                    <span className="text whitespace-nowrap text-white">
                      Services
                    </span>
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="https://canvasreply.de/en/pages/experience-editor-in-ai" target="_blank" rel="noopener noreferrer">
                    <span className="text whitespace-nowrap text-white">
                      AI Accelerators
                    </span>
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="https://canvasreply.de/en/pages/our-partners" target="_blank" rel="noopener noreferrer">
                    <span className="text whitespace-nowrap text-white">
                      Partnerships
                    </span>
                  </Link>
                </li>
              </ul>
              <ul className="w-full font-semibold">
                <li className="py-1">
                  <Link href="https://canvasreply.de/en/pages/career" target="_blank" rel="noopener noreferrer">
                    <span className="text whitespace-nowrap text-white">
                      Career &amp; Jobs
                    </span>
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="https://www.reply.com" target="_blank" rel="noopener noreferrer">
                    <span className="text whitespace-nowrap text-white">
                      Part of Reply Group
                    </span>
                  </Link>
                </li>
                <li className="py-1">
                  <Link href="https://canvasreply.de/en/pages/imprint" target="_blank" rel="noopener noreferrer">
                    <span className="text whitespace-nowrap text-white">
                      Imprint
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <Button asChild className="mt-4 py-6 px-14">
              <Link className="flex items-center gap-1" href="https://canvasreply.de/en/pages/career" target="_blank" rel="noopener noreferrer">
                <span>Your success is our goal</span>
                <ArrowIcon />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}


