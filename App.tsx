
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
        <div
          style={{
            minHeight: "100vh",
            background: "white",
            color: "black",
            fontSize: "24px",
            padding: "40px"
          }}
        >
          APP IS RENDERING
        </div>
      );
      
}; 

export default App;
