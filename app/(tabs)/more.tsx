import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Shirt, FileText, Settings, User as UserIcon, LogOut, Shield, Info, Sun } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";
import { THEME } from "../../constants/theme";

export default function MoreTabScreen() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<"settings" | "fashion" | "notes">("settings");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>More</Text>
        <Text style={styles.subtitle}>Wardrobe • Notes • Settings</Text>

        <View style={styles.segmentContainer}>
          <Pressable
            style={[styles.segmentButton, activeSection === "settings" && styles.segmentActive]}
            onPress={() => setActiveSection("settings")}
          >
            <Text style={[styles.segmentText, activeSection === "settings" && styles.segmentTextActive]}>
              Settings
            </Text>
          </Pressable>
          <Pressable
            style={[styles.segmentButton, activeSection === "fashion" && styles.segmentActive]}
            onPress={() => setActiveSection("fashion")}
          >
            <Text style={[styles.segmentText, activeSection === "fashion" && styles.segmentTextActive]}>
              Wardrobe
            </Text>
          </Pressable>
          <Pressable
            style={[styles.segmentButton, activeSection === "notes" && styles.segmentActive]}
            onPress={() => setActiveSection("notes")}
          >
            <Text style={[styles.segmentText, activeSection === "notes" && styles.segmentTextActive]}>
              Notes
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeSection === "settings" && (
          <View style={styles.settingsWrapper}>
            {/* User Profile Card */}
            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <UserIcon size={24} color={THEME.colors.textPrimary} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileUsername}>{user?.username || "Guest User"}</Text>
                <Text style={styles.profileMeta}>Account ID #{user?.id || 1} • Active</Text>
              </View>
            </View>

            {/* System Info */}
            <View style={styles.menuSection}>
              <Text style={styles.menuSectionTitle}>SYSTEM INFORMATION</Text>
              
              <View style={styles.menuItem}>
                <View style={styles.menuIconWrapper}>
                  <Info size={16} color={THEME.colors.textSecondary} />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>AURA Version</Text>
                  <Text style={styles.menuItemValue}>v1.0.0 (Phase 1 Foundation)</Text>
                </View>
              </View>

              <View style={styles.menuItem}>
                <View style={styles.menuIconWrapper}>
                  <Sun size={16} color={THEME.colors.textSecondary} />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>Theme Preference</Text>
                  <Text style={styles.menuItemValue}>Light (Default System)</Text>
                </View>
              </View>

              <View style={styles.menuItem}>
                <View style={styles.menuIconWrapper}>
                  <Shield size={16} color={THEME.colors.accentDark} />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>Authentication Status</Text>
                  <Text style={[styles.menuItemValue, { color: THEME.colors.accentDark }]}>JWT Verified (SQLite/FastAPI)</Text>
                </View>
              </View>
            </View>

            {/* Logout Action */}
            <Pressable style={styles.logoutButton} onPress={logout}>
              <LogOut size={16} color={THEME.colors.danger} />
              <Text style={styles.logoutButtonText}>Sign Out of AURA</Text>
            </Pressable>
          </View>
        )}

        {activeSection === "fashion" && (
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Shirt size={24} color={THEME.colors.accentDark} />
            </View>
            <Text style={styles.cardTitle}>Fashion & Wardrobe</Text>
            <Text style={styles.cardDesc}>
              Catalog shirts, pants, footwear, create outfit combinations, and curate wishlist priorities scheduled for Phase 8.
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Activation: Phase 8</Text>
            </View>
          </View>
        )}

        {activeSection === "notes" && (
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <FileText size={24} color={THEME.colors.accentDark} />
            </View>
            <Text style={styles.cardTitle}>Personal Notes</Text>
            <Text style={styles.cardDesc}>
              Capture AI ideas, hackathon concepts, project architecture notes, pin important memos, and filter by tags scheduled for Phase 9.
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Activation: Phase 9</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: THEME.colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
    marginBottom: 16,
  },
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: THEME.colors.surfaceAlt,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: 3,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  segmentActive: {
    backgroundColor: THEME.colors.surface,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentText: {
    fontSize: 12,
    fontWeight: "500",
    color: THEME.colors.textSecondary,
  },
  segmentTextActive: {
    fontWeight: "600",
    color: THEME.colors.textPrimary,
  },
  content: {
    padding: 20,
  },
  settingsWrapper: {
    gap: 20,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.md,
    padding: 16,
    gap: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: THEME.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
  },
  profileUsername: {
    fontSize: 16,
    fontWeight: "600",
    color: THEME.colors.textPrimary,
  },
  profileMeta: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  menuSection: {
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.md,
    padding: 16,
    gap: 14,
  },
  menuSectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: THEME.colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: THEME.colors.surfaceAlt,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItemTitle: {
    fontSize: 13,
    color: THEME.colors.textPrimary,
    fontWeight: "500",
  },
  menuItemValue: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: THEME.colors.dangerLight,
    borderWidth: 1,
    borderColor: THEME.colors.dangerBorder,
    borderRadius: THEME.borderRadius.sm,
    paddingVertical: 12,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME.colors.danger,
  },
  card: {
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.lg,
    padding: 24,
    alignItems: "center",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: THEME.colors.accentLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: THEME.colors.textPrimary,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: THEME.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: THEME.colors.textSecondary,
  },
});
