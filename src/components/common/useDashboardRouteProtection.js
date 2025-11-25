"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getMenus } from "@/utils/helper";

export const useDashboardRouteProtection = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkDashboardPermission = () => {
      // Only protect dashboard routes
      console.log({ pathname });
      if (!pathname.startsWith("/dashboard")) {
        return; // Skip protection for non-dashboard routes
      }

      // Get user's allowed dashboard menus
      const userMenus = getMenus();

      // Extract all allowed dashboard paths
      const allowedPaths = userMenus.map((menu) => menu.menuPath);

      // Add essential dashboard routes that should always be accessible
      const essentialDashboardPaths = ["/dashboard"]; // Main dashboard page

      // Combine all allowed paths
      const allAllowedPaths = [...allowedPaths, ...essentialDashboardPaths];

      // Check if current dashboard path is allowed
      const isPathAllowed = allAllowedPaths.some(
        (allowedPath) => pathname === allowedPath
      );
      console.log({ isPathAllowed });
      // If dashboard path is not allowed, redirect to main dashboard
      if (!isPathAllowed) {
        console.warn(`Unauthorized dashboard access: ${pathname}`);
        router.replace("/");
      }
    };

    checkDashboardPermission();
  }, [pathname, router]);
};
