import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { THEME } from "../constants/theme";

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)/login");
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <View style={styles.container}>
      <View style={styles.brandContainer}>
        {/* Minimalist AURA Emblem */}
        <View style={styles.emblemWrapper}>
          <View style={styles.emblemOuter}>
            <View style={styles.emblemInner} />
            <View style={styles.accentDot} />
          </View>
        </View>

        <Text style={styles.title}>AURA</Text>
        <Text style={styles.tagline}>Your Personal Operating System</Text>
      </View>

      <View style={styles.footer}>
        <ActivityIndicator size="small" color={THEME.colors.accent} />
        <Text style={styles.footerText}>Initializing System</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  brandContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emblemWrapper: {
    marginBottom: 20,
  },
  emblemOuter: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  emblemInner: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: THEME.colors.textPrimary,
  },
  accentDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.accent,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 4,
    color: THEME.colors.textPrimary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    fontWeight: "400",
    color: THEME.colors.textSecondary,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  footerText: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    fontWeight: "500",
  },
});
