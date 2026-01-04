import type { LucideIcon } from "lucide-react";
import {
  Triangle,
  Cloud,
  Server,
  Home,
  CloudUpload
} from "lucide-react";

export type Environment = {
  name: string;
  logo: LucideIcon;
  description: string;
  url: string;
};

export const environments: Environment[] = [
  {
    name: "Vercel",
    logo: Triangle,
    description: "Production on Vercel",
    url: "https://nextjs-feature-test.vercel.app",
  },
  {
    name: "Sevella",
    logo: Cloud,
    description: "Production on Sevella",
    url: "https://nextjs-feature-test-hw36p.sevalla.app",
  },
  {
    name: "Coolify Hetzner",
    logo: Server,
    description: "Production on Coolify (Hetzner)",
    url: "http://wswco0gkgc4g8g80cswsogkc.91.98.234.230.sslip.io",
  },
  {
    name: "AWS Amplify",
    logo: CloudUpload,
    description: "Production on AWS Amplify",
    url: "https://main.dlqw6j23tenw3.amplifyapp.com/",
  },
  {
    name: "Localhost",
    logo: Home,
    description: "Local development",
    url: "http://localhost:3000",
  },
];

/**
 * Detects the current environment based on the URL origin
 * @returns The detected environment or the first environment as fallback
 */
export function detectEnvironment(): Environment {
  if (typeof window === "undefined") {
    // Server-side: return first environment as default
    return environments[0];
  }

  const origin = window.location.origin.toLowerCase();
  const hostname = window.location.hostname.toLowerCase();

  // Check for localhost first
  if (hostname === "localhost" || hostname.startsWith("127.0.0.1") || hostname.startsWith("192.168.") || hostname.startsWith("10.")) {
    return environments.find((e) => e.name === "Localhost") || environments[0];
  }

  // Check by hostname patterns
  if (hostname.includes("vercel.app") || hostname.includes("vercel")) {
    return environments.find((e) => e.name === "Vercel") || environments[0];
  }
  
  if (hostname.includes("sevella")) {
    return environments.find((e) => e.name === "Sevella") || environments[0];
  }
  
  if (hostname.includes("coolify") || hostname.includes("hetzner")) {
    return environments.find((e) => e.name === "Coolify Hetzner") || environments[0];
  }

  // Check if origin matches any environment URL pattern
  for (const env of environments) {
    if (env.name === "Localhost") continue; // Already checked
    
    try {
      const envHostname = new URL(env.url).hostname.toLowerCase();
      if (hostname.includes(envHostname) || hostname === envHostname) {
        return env;
      }
    } catch {
      // Skip invalid URLs
      continue;
    }
  }

  // Default fallback
  return environments[0];
}

