"use client";
import Link from "next/link";
import { useState } from "react";
import { ListNews, listNews } from "@/app/utils";
import { DrawerNews } from "./components/DrawerNews";
import { Tweet } from "react-tweet";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [news, setNews] = useState<ListNews | null>(null);
  return (
    <main className="flex w-full flex-col justify-between bg-grid-gray-50 h-[100vh] pt-10">
      <nav className="flex flex-row w-full justify-between items-center relative h-20 px-4 max-w-screen-lg mx-auto">
        <p className="font-bold text-sky-500 text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r text-center from-sky-500 to-sky-600">
          Berita Indo API
        </p>
        <Link
          href="https://github.com/satyawikananda/berita-indo-api"
          target="_blank"
        >
          <button className="bg-slate-800 p-3 rounded-lg text-white hover:bg-slate-900 transition-colors flex flex-row items-center gap-2">
            <span className="text-sm">Star on GitHub</span>
            <svg
              data-v-56bd7dfc=""
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
        </Link>
      </nav>
      <section className="flex w-full flex-col justify-center items-center pt-10">
        <h1 className="w-3/4 text-6xl font-bold bg-gradient-to-r from-sky-500 via-sky-600 to-sky-500 bg-clip-text text-transparent text-center">
          Discover <span className="text-slate-800">News API</span> In Indonesia
        </h1>
        <p className="text-slate-600 text-xl mt-6 max-w-2xl text-center">
          Berita Indo API is an Public API to get the latest news from the
          popular news portal in Indonesia
        </p>
        <div className="flex flex-wrap flex-row justify-center items-center mx-auto space-x-3 mt-8 max-w-3xl">
          {listNews.map((list, idx) => (
            <div
              key={idx}
              className="badge bg-gray-300 text-zinc-700 p-4 m-1 hover:bg-gray-400 hover:text-zinc-800"
              role="button"
              onClick={() => {
                setDrawerOpen(true);
                setNews(list);
              }}
            >
              {list.news}
            </div>
          ))}
        </div>
        <div className="p-6">
          <Tweet id="1685260678226173952" />
        </div>
      </section>
      <footer className="footer footer-center p-4">
        <div>
          <p>
            © 2023
            <Link
              href="https://twitter.com/satya_wikananda"
              target="_blank"
              className="hover:text-slate-600"
            >
              {" "}
              Satya Wikananda -
            </Link>{" "}
            <Link
              href="https://trakteer.id/satya-wikananda"
              target="_blank"
              className="hover:text-slate-600"
            >
              <span className="border-b-sky-500 border-b-2">
                Support me here :D
              </span>
            </Link>
          </p>
        </div>
      </footer>
      <DrawerNews open={drawerOpen} onOpenChange={setDrawerOpen} data={news} />
    </main>
  );
}
