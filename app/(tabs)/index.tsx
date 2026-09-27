import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { THEME } from "../../constants/theme";
import {
  CheckCircle2,
  TrendingUp,
  Wallet,
  PiggyBank,
  BookOpen,
  Sparkles,
  ShieldCheck,
  LogOut,
} from "lucide-react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout, refreshUser } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshUser();
    setRefreshing(false);
  }, [refreshUser]);

  // Formatted date string
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <View style={styles.brandBadge}>
            <View style={styles.brandDot} />
          </View>
          <View>
            <Text style={styles.brandTitle}>AURA</Text>
            <Text style={styles.brandSubtitle}>Personal OS</Text>
          </View>
        </View>

        <Pressable
          style={styles.logoutButton}
          onPress={logout}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <LogOut size={16} color={THEME.colors.textSecondary} />
          <Text style={styles.logoutText}>Exit</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={THEME.colors.accent}
          />
        }
      >
        {/* Personalized Greeting Header */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingSub}>{dateString}</Text>
          <Text style={styles.greetingMain}>
            {getGreeting()}, <Text style={styles.usernameHighlight}>{user?.username || "User"}</Text>
          </Text>
        </View>

        {/* System Status Pill */}
        <View style={styles.statusPill}>
          <ShieldCheck size={14} color={THEME.colors.accentDark} />
          <Text style={styles.statusPillText}>Phase 1 Foundation • Authentication Active</Text>
        </View>

        {/* TODAY'S FOCUS */}
        <View style={styles.focusCard}>
          <View style={styles.focusHeader}>
            <Sparkles size={14} color={THEME.colors.accentDark} />
            <Text style={styles.focusLabel}>TODAY'S FOCUS</Text>
          </View>
          <Text style={styles.focusContent}>Complete Python DSA practice & test auth APIs</Text>
        </View>

        {/* TODAY TASK SUMMARY */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderTitleRow}>
              <CheckCircle2 size={16} color={THEME.colors.textPrimary} />
              <Text style={styles.cardSectionTitle}>TODAY'S TASKS</Text>
            </View>
            <Pressable onPress={() => router.push("/(tabs)/tasks")}>
              <Text style={styles.viewAllText}>View (Phase 2)</Text>
            </Pressable>
          </View>
          
          <View style={styles.progressRow}>
            <View>
              <Text style={styles.metricBig}>0 / 0</Text>
              <Text style={styles.metricSub}>Tasks completed today</Text>
            </View>
            <View style={styles.badgeShell}>
              <Text style={styles.badgeText}>Ready for Phase 2</Text>
            </View>
          </View>
        </View>

        {/* PROGRESS METRICS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderTitleRow}>
              <TrendingUp size={16} color={THEME.colors.textPrimary} />
              <Text style={styles.cardSectionTitle}>PROGRESS</Text>
            </View>
            <Pressable onPress={() => router.push("/(tabs)/progress")}>
              <Text style={styles.viewAllText}>Open</Text>
            </Pressable>
          </View>

          <View style={styles.metricGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Fitness</Text>
              <Text style={styles.metricValue}>0%</Text>
              <Text style={styles.metricMeta}>Phase 4</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>AI Roadmap</Text>
              <Text style={styles.metricValue}>0%</Text>
              <Text style={styles.metricMeta}>Phase 3</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Hackathon</Text>
              <Text style={styles.metricValue}>0%</Text>
              <Text style={styles.metricMeta}>Phase 7</Text>
            </View>
          </View>
        </View>

        {/* MONEY SUMMARY */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderTitleRow}>
              <Wallet size={16} color={THEME.colors.textPrimary} />
              <Text style={styles.cardSectionTitle}>MONEY</Text>
            </View>
            <Pressable onPress={() => router.push("/(tabs)/money")}>
              <Text style={styles.viewAllText}>Finance</Text>
            </Pressable>
          </View>

          <View style={styles.financeRow}>
            <View style={styles.financeItem}>
              <Text style={styles.financeLabel}>Income</Text>
              <Text style={styles.financeAmount}>₹0</Text>
            </View>
            <View style={styles.financeItem}>
              <Text style={styles.financeLabel}>Expenses</Text>
              <Text style={styles.financeAmount}>₹0</Text>
            </View>
            <View style={styles.financeItem}>
              <Text style={styles.financeLabel}>Balance</Text>
              <Text style={[styles.financeAmount, { color: THEME.colors.accentDark }]}>₹0</Text>
            </View>
          </View>
        </View>

        {/* SAVINGS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderTitleRow}>
              <PiggyBank size={16} color={THEME.colors.textPrimary} />
              <Text style={styles.cardSectionTitle}>SAVINGS</Text>
            </View>
            <Text style={styles.goalTag}>Phase 6</Text>
          </View>

          <Text style={styles.emptyNoteText}>
            No active savings goals yet. Once created in Phase 6, target progress will appear here.
          </Text>
        </View>

        {/* RECENT NOTES */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderTitleRow}>
              <BookOpen size={16} color={THEME.colors.textPrimary} />
              <Text style={styles.cardSectionTitle}>RECENT NOTES</Text>
            </View>
            <Pressable onPress={() => router.push("/(tabs)/more")}>
              <Text style={styles.viewAllText}>Notes</Text>
            </Pressable>
          </View>

          <Text style={styles.emptyNoteText}>
            Personal thoughts and ideas will be organized here in Phase 9.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.surfaceAlt,
    justifyContent: "center",
    alignItems: "center",
  },
  brandDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.accent,
  },
  brandTitle: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: THEME.colors.textPrimary,
  },
  brandSubtitle: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  logoutText: {
    fontSize: 12,
    fontWeight: "500",
    color: THEME.colors.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  greetingSection: {
    marginBottom: 4,
  },
  greetingSub: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    fontWeight: "500",
    marginBottom: 4,
  },
  greetingMain: {
    fontSize: 22,
    fontWeight: "700",
    color: THEME.colors.textPrimary,
    letterSpacing: -0.3,
  },
  usernameHighlight: {
    color: THEME.colors.accentDark,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: THEME.colors.accentLight,
    borderWidth: 1,
    borderColor: THEME.colors.accentSubtle,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: "600",
    color: THEME.colors.accentDark,
  },
  focusCard: {
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.md,
    padding: 16,
  },
  focusHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  focusLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: THEME.colors.accentDark,
    letterSpacing: 1,
  },
  focusContent: {
    fontSize: 15,
    fontWeight: "600",
    color: THEME.colors.textPrimary,
    lineHeight: 20,
  },
  sectionCard: {
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.md,
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  cardHeaderTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardSectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: THEME.colors.textPrimary,
    letterSpacing: 0.8,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: "500",
    color: THEME.colors.accentDark,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricBig: {
    fontSize: 24,
    fontWeight: "700",
    color: THEME.colors.textPrimary,
  },
  metricSub: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  badgeShell: {
    backgroundColor: THEME.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: "500",
  },
  metricGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricItem: {
    flex: 1,
    alignItems: "center",
  },
  metricDivider: {
    width: 1,
    height: 32,
    backgroundColor: THEME.colors.border,
  },
  metricLabel: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "700",
    color: THEME.colors.textPrimary,
  },
  metricMeta: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  financeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  financeItem: {
    flex: 1,
  },
  financeLabel: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    marginBottom: 4,
  },
  financeAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: THEME.colors.textPrimary,
  },
  goalTag: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    fontWeight: "500",
  },
  emptyNoteText: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    lineHeight: 18,
  },
});
