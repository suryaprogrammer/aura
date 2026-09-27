import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Wallet, PiggyBank } from "lucide-react-native";
import { THEME } from "../../constants/theme";

export default function MoneyTabScreen() {
  const [activeSegment, setActiveSegment] = useState<"finance" | "savings">("finance");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Money</Text>
        <Text style={styles.subtitle}>Finance & Savings Management</Text>

        <View style={styles.segmentContainer}>
          <Pressable
            style={[styles.segmentButton, activeSegment === "finance" && styles.segmentActive]}
            onPress={() => setActiveSegment("finance")}
          >
            <Text style={[styles.segmentText, activeSegment === "finance" && styles.segmentTextActive]}>
              Finance
            </Text>
          </Pressable>
          <Pressable
            style={[styles.segmentButton, activeSegment === "savings" && styles.segmentActive]}
            onPress={() => setActiveSegment("savings")}
          >
            <Text style={[styles.segmentText, activeSegment === "savings" && styles.segmentTextActive]}>
              Savings Goals
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeSegment === "finance" ? (
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Wallet size={24} color={THEME.colors.accentDark} />
            </View>
            <Text style={styles.cardTitle}>Personal Finance</Text>
            <Text style={styles.cardDesc}>
              Income and expense transactions, category distributions, monthly balances, and deterministic backend analytics without AI hallucination.
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Activation: Phase 5</Text>
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <PiggyBank size={24} color={THEME.colors.accentDark} />
            </View>
            <Text style={styles.cardTitle}>Savings Goals</Text>
            <Text style={styles.cardDesc}>
              Target savings goals (e.g. Laptop ₹80,000), target dates, deposit history, remaining balance, and automated progress percentage calculations.
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Activation: Phase 6</Text>
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
