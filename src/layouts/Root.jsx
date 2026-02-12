import { useEffect, useRef } from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingIndicator from "../utils/LoadingIndicator";

// ============================================
// 🏠 ROOT COMPONENT - FINAL FIXED VERSION
// ============================================

/**
 * Root Component
 *
 * Enhanced with clean AuthContext integration.
 *
 * Features:
 * ✅ Simplified logic (no local state)
 * ✅ Single sync from loader
 * ✅ Clean separation of concerns
 * ✅ isVerifying managed in context
 *
 * Flow:
 * 1. Component mounts
 * 2. Sync loader data to AuthContext (once)
 * 3. Show loading if verifying or navigating
 * 4. Render app content when ready
 *
 * Benefits:
 * ✅ No duplicate state management
 * ✅ Single source of truth (AuthContext)
 * ✅ Automatic updates from Interceptor
 * ✅ Clean and maintainable
 */
function Root() {
  // ============================================
  // 📊 STATE & HOOKS
  // ============================================

  const loaderData = useLoaderData();
  const { isVerifying, syncLoaderData } = useAuth();
  const navigation = useNavigation();

  // Track if we've synced loader data (prevent re-syncing)
  // Prefixed with _ to indicate intentionally unused in render
  const _hasSynced = useRef(false);

  // ============================================
  // 🔄 SYNC LOADER DATA (Once on Mount)
  // ============================================

  useEffect(() => {
    /**
     * Sync loader data to AuthContext
     *
     * This happens ONCE on mount to initialize auth state.
     * All subsequent updates come from:
     * - Interceptor (via triggerAuthUpdate)
     * - Proactive verification (in AuthContext)
     * - Login/Logout actions (via setUser/clearUser)
     */
    if (!_hasSynced.current) {
      syncLoaderData(loaderData);
      _hasSynced.current = true;

      if (import.meta.env.MODE === "development") {
        console.log("🔄 Root: Synced loader data to AuthContext");
      }
    }
  }, [loaderData, syncLoaderData]);

  // ============================================
  // 🎨 RENDER LOGIC
  // ============================================

  /**
   * Show loading indicator when:
   * - isVerifying: Waiting for lazy auth verification
   * - navigation.state === "loading": React Router navigation in progress
   */
  if (isVerifying || navigation.state === "loading") {
    return <LoadingIndicator />;
  }

  /**
   * Render app content
   *
   * At this point:
   * - Auth state is initialized
   * - User is either authenticated or not
   * - No verification in progress
   */
  return <Outlet />;
}

export default Root;
