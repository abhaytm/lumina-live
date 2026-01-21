
import React, { useEffect } from 'react';
import { AppNavigator } from './navigation/AppNavigator';
import { useAuthStore } from './store/useAuthStore';
import { useCartStore } from './store/useCartStore';

const App: React.FC = () => {
    const initializeAuth = useAuthStore(state => state.initialize);
    const fetchCart = useCartStore(state => state.fetchCart);
    const user = useAuthStore(state => state.user);

    useEffect(() => {
        initializeAuth();
    }, []);

    useEffect(() => {
        if (user) fetchCart();
    }, [user]);

    return (
        <AppNavigator />
    );
};

export default App;
