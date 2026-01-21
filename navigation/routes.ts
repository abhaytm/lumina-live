
import { AppRoute } from '../types';

export const AuthRoutes = [
  AppRoute.LOGIN,
  AppRoute.SIGNUP,
];

export const BottomTabRoutes = [
  AppRoute.HOME,
  AppRoute.CATEGORIES,
  AppRoute.LIVE_LIST,
  AppRoute.CART,
  AppRoute.PROFILE,
];

export const FullScreenRoutes = [
  // Fix: Removed AppRoute.SPLASH and AppRoute.LIVE_VIEWER as they are not defined in the AppRoute enum
  AppRoute.ADD_PRODUCT,
  AppRoute.START_LIVE,
];

export const StackRoutes = [
  AppRoute.PRODUCT,
  AppRoute.CREATOR_DASHBOARD,
];

// Helper to check route types
export const isAuthRoute = (route: AppRoute) => AuthRoutes.includes(route);
export const isTabRoute = (route: AppRoute) => BottomTabRoutes.includes(route);
export const isFullScreen = (route: AppRoute) => FullScreenRoutes.includes(route);
