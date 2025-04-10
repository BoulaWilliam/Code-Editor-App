import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function NotFound404() {
    const digit1 = useRef(null);
    const digit2 = useRef(null);
    const digit3 = useRef(null);
    const messageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });

        tl.fromTo(digit1.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1 })
            .fromTo(digit2.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, "+=0.1")
            .fromTo(digit3.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, "+=0.1")
            .fromTo(
                messageRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1 },
                "+=0.2"
            );
    }, []);

    return (
        <div className="flex flex-col items-center justify-center  bg-transparent backdrop-blur-xl text-white relative overflow-hidden">
            <div className="flex gap-6 text-[8rem] md:text-[12rem] font-black">
                <span
                    ref={digit1}
                    className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-red-400 drop-shadow-md"
                >
                    4
                </span>
                <span
                    ref={digit2}
                    className="text-transparent bg-clip-text bg-gradient-to-tr from-yellow-400 to-yellow-300 drop-shadow-md"
                >
                    0
                </span>
                <span
                    ref={digit3}
                    className="text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-blue-500 drop-shadow-md"
                >
                    4
                </span>
            </div>

            <p
                ref={messageRef}
                className="mt-6 text-center text-lg md:text-xl text-white/80 max-w-lg px-4"
            >
                The page you're looking for isn’t here. Maybe it got lost in the matrix.
            </p>

            <a
                href="/"
                className="mt-10 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-xl hover:scale-105 transition-all duration-300"
            >
                Return Home
            </a>
        </div>
    );
}
