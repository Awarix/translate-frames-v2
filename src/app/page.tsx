import { Metadata } from "next";
import App from "./app";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/google-translate.png`,
  button: {
    title: "Dare to play?",
    action: {
      type: "launch_frame",
      name: "Translate Game",
      url: appUrl,
      splashImageUrl: 'https://frames-v2.vercel.app/splash.png',
      splashBackgroundColor: "#eeccff",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Translate Game",
    openGraph: {
      title: "Dare to play?",
      description: "A fun game to test your language skills",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (<App />);
}