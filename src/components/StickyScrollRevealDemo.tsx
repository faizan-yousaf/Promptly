"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const content = [
  {
    title: "Smart Prompt Generation",
    description:
      "AI-powered prompt creation that understands context and generates optimized prompts for any use case. Our advanced algorithms analyze your requirements and craft professional-quality prompts that deliver exceptional results with any AI model.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--blue-500))] text-white">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🎯</div>
          <div className="text-xl font-bold">Smart Generation</div>
        </div>
      </div>
    ),
  },
  {
    title: "Agentic AI Mode",
    description:
      "Advanced reasoning capabilities with multi-step thinking and autonomous problem-solving. Toggle between simple responses and sophisticated AI reasoning that breaks down complex tasks into manageable steps for superior outcomes.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--purple-500),var(--pink-500))] text-white">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🤖</div>
          <div className="text-xl font-bold">Advanced AI Reasoning</div>
        </div>
      </div>
    ),
  },
  {
    title: "Multilingual Support",
    description:
      "Generate prompts in English, Spanish, French, German, Italian, and Portuguese with native-level fluency and cultural context. Our AI understands linguistic nuances and adapts prompts for global audiences with precision.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--green-500),var(--emerald-500))] text-white">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🌍</div>
          <div className="text-xl font-bold">Global Reach</div>
        </div>
      </div>
    ),
  },
  {
    title: "Lightning Fast Performance",
    description:
      "Get professional-quality prompts in seconds with our optimized AI models and infrastructure. Experience blazing-fast generation speeds without compromising on quality, powered by cutting-edge technology and efficient processing.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚡</div>
          <div className="text-xl font-bold">Instant Results</div>
        </div>
      </div>
    ),
  },
  {
    title: "Customizable Tones",
    description:
      "Choose from professional, friendly, creative, or technical tones to match your brand voice perfectly. Our AI adapts writing style, vocabulary, and approach to ensure your prompts align with your specific communication needs and audience expectations.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--indigo-500),var(--purple-500))] text-white">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🎨</div>
          <div className="text-xl font-bold">Perfect Tone</div>
        </div>
      </div>
    ),
  },
  {
    title: "History & Analytics",
    description:
      "Track your prompt performance and access your complete generation history with detailed analytics. Monitor success rates, analyze patterns, and optimize your prompting strategy with comprehensive insights and data-driven recommendations.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--teal-500),var(--cyan-500))] text-white">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📊</div>
          <div className="text-xl font-bold">Smart Analytics</div>
        </div>
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-20">
      <StickyScroll content={content} />
    </div>
  );
}