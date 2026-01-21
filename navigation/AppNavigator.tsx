
import React, { useState, useEffect } from 'react';
import { AppRoute, Product, Stream, CartItem, User, Category, LoginMode } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';

import { SplashScreen } from '../screens/Splash';
import { LoginScreen } from '../screens/Auth';
import { HomeScreen } from '../screens/Home';
import { CategoriesScreen } from '../screens/Categories';
import { LiveListScreen } from '../screens/LiveList';
import { LiveScreen } from '../screens/Live';
import { CreatorDashboard } from '../screens/Dashboard';
import { ProductDetailScreen } from '../screens/Product';
import { CartScreen } from '../screens/Cart';
import { ProfileScreen } from '../screens/Profile';
import { AddProductScreen, StartLiveScreen } from '../screens/Creator';
import { AdminLoginScreen, AdminDashboard } from '../screens/Admin';
import { BottomNav, MobileWrapper } from '../components/Layout';
import { AuthRequiredModal, LogoutModal } from '../components/AuthModals';

export const AppNavigator: React.FC = () => {
    const { user, isAuthenticated, initialize, logout } = useAuthStore();
    const { items: cart, addItem, removeItem, updateQty } = useCartStore();
    
    const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.SPLASH);
    const [activeStream, setActiveStream] = useState<Stream | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
    const [authContext, setAuthContext] = useState<'SHOP' | 'LIVE'>('SHOP');
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

    useEffect(() => {
        initialize();
    }, []);

    /**
     * ADMIN ROUTE GUARD CODE
     */
    const navigate = (route: AppRoute) => {
        // Strict Admin Protection
        if (route === AppRoute.ADMIN_DASHBOARD && (!isAuthenticated || user?.role !== 'ADMIN')) {
          setCurrentRoute(AppRoute.ADMIN_LOGIN);
          return;
        }

        const protectedRoutes = [
          AppRoute.CART,
          AppRoute.PROFILE,
          AppRoute.CREATOR_DASHBOARD,
          AppRoute.START_LIVE
        ];

        if (protectedRoutes.includes(route) && !isAuthenticated) {
          setAuthContext('SHOP');
          setShowAuthModal(true);
          return;
        }

        if (route !== AppRoute.CATEGORIES) {
          setSelectedCategoryId(null);
        }

        setCurrentRoute(route);
        window.scrollTo(0, 0);
    };

    const handleLoginSuccess = (mode: LoginMode) => {
      if (mode === LoginMode.ADMIN) {
        navigate(AppRoute.ADMIN_DASHBOARD);
      } else if (mode === LoginMode.CREATOR) {
        navigate(AppRoute.CREATOR_DASHBOARD);
      } else {
        navigate(AppRoute.HOME);
      }
    };

    const handleOpenStream = (s: Stream) => {
      if (!isAuthenticated) {
        setAuthContext('LIVE');
        setShowAuthModal(true);
        return;
      }
      setActiveStream(s);
    };

    const handleAddToCart = (p: Product) => {
      if (!isAuthenticated) {
        setAuthContext('SHOP');
        setShowAuthModal(true);
        return;
      }
      addItem(p);
    };

    const handleCategoryClick = (category: Category) => {
      setSelectedCategoryId(category.id);
      setCurrentRoute(AppRoute.CATEGORIES);
      window.scrollTo(0, 0);
    };

    const renderScreen = () => {
        if (currentRoute === AppRoute.SPLASH) {
          return <SplashScreen onComplete={() => navigate(AppRoute.HOME)} />;
        }

        if (currentRoute === AppRoute.ADMIN_LOGIN) {
            return <AdminLoginScreen onLoginSuccess={() => handleLoginSuccess(LoginMode.ADMIN)} />;
        }

        if (currentRoute === AppRoute.ADMIN_DASHBOARD) {
            return <AdminDashboard />;
        }

        if (currentRoute === AppRoute.LOGIN || currentRoute === AppRoute.SIGNUP) {
            return <LoginScreen onNavigate={navigate} onLoginSuccess={handleLoginSuccess} />;
        }

        switch (currentRoute) {
            case AppRoute.HOME:
                return <HomeScreen 
                            onNavigate={navigate} 
                            onOpenStream={handleOpenStream} 
                            onProductClick={(p) => { setSelectedProduct(p); navigate(AppRoute.PRODUCT); }} 
                            onCategoryClick={handleCategoryClick}
                        />;
            case AppRoute.CATEGORIES:
                return <CategoriesScreen 
                            initialCategoryId={selectedCategoryId} 
                            onProductClick={(p) => { setSelectedProduct(p); navigate(AppRoute.PRODUCT); }} 
                        />;
            case AppRoute.LIVE_LIST:
                return <LiveListScreen onOpenStream={handleOpenStream} />;
            case AppRoute.PRODUCT:
                return selectedProduct 
                    ? <ProductDetailScreen product={selectedProduct} onBack={() => navigate(AppRoute.HOME)} onAddToCart={handleAddToCart} />
                    : <HomeScreen onNavigate={navigate} onOpenStream={handleOpenStream} onProductClick={setSelectedProduct} onCategoryClick={handleCategoryClick} />;
            case AppRoute.CART:
                return <CartScreen items={cart} onBack={() => navigate(AppRoute.HOME)} onRemove={removeItem} onUpdateQty={updateQty} />;
            case AppRoute.PROFILE:
                return <ProfileScreen user={user!} onNavigate={navigate} onLogout={() => setShowLogoutModal(true)} />;
            case AppRoute.CREATOR_DASHBOARD:
                return <CreatorDashboard user={user!} />;
            case AppRoute.ADD_PRODUCT:
                return <AddProductScreen onNavigate={navigate} onBack={() => navigate(AppRoute.PROFILE)} />;
            case AppRoute.START_LIVE:
                return <StartLiveScreen onNavigate={navigate} onBack={() => navigate(AppRoute.PROFILE)} />;
            default:
                return <HomeScreen onNavigate={navigate} onOpenStream={handleOpenStream} onProductClick={setSelectedProduct} onCategoryClick={handleCategoryClick} />;
        }
    };

    const hideNavRoutes = [AppRoute.SPLASH, AppRoute.LOGIN, AppRoute.SIGNUP, AppRoute.PRODUCT, AppRoute.START_LIVE, AppRoute.ADD_PRODUCT, AppRoute.ADMIN_LOGIN, AppRoute.ADMIN_DASHBOARD];
    const showBottomNav = !activeStream && !hideNavRoutes.includes(currentRoute);

    return (
        <MobileWrapper>
            {renderScreen()}
            
            {activeStream && (
                <LiveScreen 
                  stream={activeStream} 
                  currentUser={user!} 
                  onClose={() => setActiveStream(null)} 
                  onAddToCart={handleAddToCart} 
                />
            )}

            {showBottomNav && (
                <BottomNav 
                  currentRoute={currentRoute} 
                  onNavigate={navigate} 
                  cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
                />
            )}

            {showAuthModal && (
              <AuthRequiredModal 
                context={authContext}
                onLogin={() => { setShowAuthModal(false); setCurrentRoute(AppRoute.LOGIN); }}
                onClose={() => setShowAuthModal(false)}
              />
            )}

            {showLogoutModal && (
              <LogoutModal 
                onConfirm={() => { setShowLogoutModal(false); logout(); navigate(AppRoute.HOME); }}
                onCancel={() => setShowLogoutModal(false)}
              />
            )}
        </MobileWrapper>
    );
};
