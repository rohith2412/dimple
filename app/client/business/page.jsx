"use client";

import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/client/auth");
    }
  }, [status, router]);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center pt-40">
        <div className="text-white grid justify-start gap-5 max-w-2xl px-4">
          <h1 className="text-3xl font-semibold">
            Remote Marketing Specialist – Dimple{" "}
            <span className="text-sm text-gray-400">(₹5,000/month)</span>
          </h1>

          <p className="text-gray-300">
            <strong>Dimple</strong> is a growing digital platform aimed at delivering value-driven experiences to young Indian audiences. We’re currently seeking a talented and driven <strong>Remote Marketing Specialist</strong> to help scale our user base organically.
          </p>

          <h2 className="text-xl font-semibold mt-4">Position Overview</h2>
          <p>
            As a Marketing Specialist, you will be responsible for developing and executing strategies that attract a minimum of 100 organic users within India, particularly within the 18–30 age group. You will have the freedom to choose your own strategies—as long as they are legal, ethical, and effective.
          </p>

          <h2 className="text-xl font-semibold mt-4">Key Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Develop and implement organic growth strategies tailored to the Indian market</li>
            <li>Drive user acquisition through social media, content marketing, community outreach, or influencer collaborations</li>
            <li>Monitor engagement metrics and report performance</li>
            <li>Adapt approaches based on feedback and performance analytics</li>
          </ul>

          <h2 className="text-xl font-semibold mt-4">Ideal Candidate</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Strong understanding of digital marketing and growth strategies</li>
            <li>Creative thinker with hands-on execution skills</li>
            <li>Knowledge of Indian youth trends and online behavior (ages 18–30)</li>
            <li>Self-motivated, reliable, and able to work independently</li>
          </ul>

          <h2 className="text-xl font-semibold mt-4">Compensation</h2>
          <p>
            A fixed monthly stipend of <strong>₹5,000</strong> will be offered. Based on performance and long-term fit, there may be opportunities for increased compensation or full-time roles in the future.
          </p>

          <h2 className="text-xl font-semibold mt-4">Location</h2>
          <p>
            This is a 100% remote position. We welcome applicants from anywhere in India.
          </p>

          <h2 className="text-xl font-semibold mt-4">How to Apply</h2>
          <p>
            If you’re passionate about growth marketing and want to be part of an early-stage journey, we’d love to hear from you.
          </p>
          <p className="mt-2">
            Please send a brief email outlining your interest and any relevant experience to:{" "}
            <a
              href="mailto:rohithra75@gmail.com"
              className="underline text-blue-400"
            >
              rohithra75@gmail.com
            </a>
          </p>

          <p className="mt-6 text-sm text-gray-400">
            *We are committed to equal opportunity and welcome applicants from all backgrounds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
