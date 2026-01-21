# Lumina Live - Motion Design & Animation System

**Philosophy:** Fluid, Premium, Spring-based feedback.
**Target Performance:** 60fps (120fps on ProMotion displays).

---

## 1. Animation Tokens

| Token | Duration | Easing / Curve |
| :--- | :--- | :--- |
| `Fast` | 200ms | `Curves.easeOutCubic` / `Easing.out(Easing.cubic)` |
| `Standard` | 350ms | `Curves.easeInOutCubic` / `Easing.inOut(Easing.cubic)` |
| `Slow` | 500ms | `Curves.elasticOut` / `Easing.elastic(1)` |
| `Spring.Bouncy` | - | `Mass: 1, Damping: 10, Stiffness: 100` |
| `Spring.Snappy` | - | `Mass: 0.8, Damping: 15, Stiffness: 200` |

---

## 2. Flutter Implementation (Spring Interactions)

### 2.1 Bounce Tap Interaction
Apply this to buttons and cards for that "physical" mobile feel.

```dart
class BounceInteraction extends StatefulWidget {
  final Widget child;
  final VoidCallback onTap;

  const BounceInteraction({super.key, required this.child, required this.onTap});

  @override
  State<BounceInteraction> createState() => _BounceInteractionState();
}

class _BounceInteractionState extends State<BounceInteraction> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
      lowerBound: 0.0,
      upperBound: 0.1,
    );
    _scale = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) {
        _controller.reverse();
        widget.onTap();
      },
      onTapCancel: () => _controller.reverse(),
      child: ScaleTransition(scale: _scale, child: widget.child),
    );
  }
}
```

---

## 3. React Native Implementation (Reanimated 3)

### 3.1 Live Badge Shimmer/Pulse
Uses hardware-accelerated transforms for 60fps glow.

```typescript
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';

export const AnimatedLiveBadge = () => {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0.6, { duration: 1000 }), withTiming(1, { duration: 1000 })),
      -1
    );
    scale.value = withRepeat(
      withSequence(withTiming(1.1, { duration: 1500 }), withTiming(1, { duration: 1500 })),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.badge, animatedStyle]}>
       {/* Badge UI */}
    </Animated.View>
  );
};
```

### 3.2 Floating Hearts (Physics)
Efficiently handles dozens of animated objects.

```typescript
const Heart = ({ onComplete }) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(-400, { duration: 2000 }, () => {
      runOnJS(onComplete)();
    });
    translateX.value = withSpring(Math.random() * 50 - 25);
    opacity.value = withSequence(withTiming(1, { duration: 500 }), withTiming(0, { duration: 1500 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.heart, style]}><Icon name="heart" /></Animated.View>;
}
```

---

## 4. Key Motion Principles

1.  **Staggered Entrances**: Never animate more than 4 items at once. Use a `50ms` delay between list items.
2.  **Parallax Header**: On the Product Detail screen, map the `scrollY` to the image height with a `0.5` multiplier.
3.  **Haptics**: Always trigger `selectionAsync()` on tab changes and `impactLight()` on button presses.
