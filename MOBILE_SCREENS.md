# Lumina Live - Mobile Screen Assembly

This document provides the assembled screen code for both Flutter and React Native, using our defined Component Library and Design Tokens.

---

## 1. User App Screens (React Native)

### 1.1 Home Screen
**File:** `src/features/shop/screens/HomeScreen.tsx`

```typescript
import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { GradientButton, ProductCard, LiveBadge } from '../../../components';
import { theme } from '../../../core/theme';

export const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Discover</Text>
        <Text style={styles.title}>Lumina Live</Text>
      </View>

      {/* Hero Banner */}
      <View style={styles.banner}>
        <Image 
          source={{ uri: 'https://picsum.photos/seed/hero/600/400' }} 
          style={styles.bannerImage} 
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>New Summer Arrivals</Text>
          <GradientButton 
            text="Shop Now" 
            onPress={() => navigation.navigate('Categories')} 
          />
        </View>
      </View>

      {/* Live Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Now</Text>
          <LiveBadge pulsing />
        </View>
        <FlatList
          horizontal
          data={MOCK_STREAMS}
          renderItem={({ item }) => (
            <StreamPreviewCard stream={item} onPress={() => navigation.navigate('LiveViewer', { id: item.id })} />
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Product Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Products</Text>
        <View style={styles.productGrid}>
          {MOCK_PRODUCTS.map(product => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard 
                {...product} 
                onPress={() => navigation.navigate('ProductDetail', { id: product.id })} 
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.bg },
  header: { padding: 24, paddingTop: 60 },
  greeting: { fontSize: 16, color: theme.colors.text.secondary },
  title: { fontSize: 32, fontWeight: '800', color: theme.colors.text.primary },
  banner: { margin: 24, height: 200, borderRadius: 24, overflow: 'hidden' },
  bannerImage: { width: '100%', height: '100%' },
  bannerOverlay: { position: 'absolute', bottom: 20, left: 20 },
  bannerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  section: { paddingHorizontal: 24, marginBottom: 32 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: theme.colors.text.primary },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '48%' },
});
```

---

## 2. Creator Panel Screens (Flutter)

### 2.1 Creator Dashboard
**File:** `lib/features/creator/screens/dashboard_screen.dart`

```dart
import 'package:flutter/material.dart';
import '../../../components/stat_card.dart';
import '../../../components/gradient_button.dart';

class CreatorDashboard extends StatelessWidget {
  const CreatorDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 120,
            floating: true,
            flexibleSpace: FlexibleSpaceBar(
              title: Text('Creator Studio', style: TextStyle(color: Colors.black)),
              background: Container(color: Colors.white),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.all(24),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                // Quick Actions
                Row(
                  children: [
                    Expanded(
                      child: GradientButton(
                        text: 'Go Live',
                        onPressed: () => Navigator.pushNamed(context, '/start_live'),
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: OutlinedButton(
                        onPressed: () {},
                        child: const Text('Analytics'),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 32),
                
                // Stat Grid
                const Text('Quick Stats', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                const SizedBox(height: 16),
                GridView.count(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisCount: 2,
                  mainAxisSpacing: 16,
                  crossAxisSpacing: 16,
                  children: const [
                    StatCard(title: 'Revenue', value: '\$1,240', icon: Icons.attach_money),
                    StatCard(title: 'Viewers', value: '45.2k', icon: Icons.visibility),
                    StatCard(title: 'Orders', value: '124', icon: Icons.shopping_bag),
                    StatCard(title: 'Growth', value: '+12%', icon: Icons.trending_up),
                  ],
                ),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}
```

---

## 3. Implementation Notes

1.  **Navigation Wiring**: 
    *   In React Native, use `navigation.navigate('ScreenName', params)` inside `onPress` hooks.
    *   In Flutter, use `GoRouter.of(context).push('/path')` for deep-link compatibility.
2.  **API Integration**:
    *   Replace `MOCK_DATA` with results from a `useEffect` fetch or a state management hook (e.g., `useQuery` or `Provider`).
    *   Loading states should trigger the `Skeleton` loader components.
3.  **Theming**:
    *   The code assumes a global `theme` object (RN) or `ThemeData` (Flutter) has been configured as per the `DESIGN_SYSTEM.md` specs.
