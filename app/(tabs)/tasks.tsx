import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckSquare, ListFilter, Plus } from "lucide-react-native";
import { THEME } from "../../constants/theme";

export default function TasksTabScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Tasks</Text>
          <Text style={styles.subtitle}>Scheduled for Phase 2</Text>
        </View>
        <View style={styles.headerAction}>
          <ListFilter size={18} color={THEME.colors.textSecondary} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <CheckSquare size={24} color={THEME.colors.accentDark} />
          </View>
          <Text style={styles.cardTitle}>Task Management</Text>
          <Text style={styles.cardDesc}>
            Full CRUD operations, priority tiers (Low, Medium, High, Critical), status tracking, categories, and due dates will be activated in Phase 2.
          </Text>
          <View style={styles.statusChip}>
            <Text style={styles.statusChipText}>Phase 1 Foundation Complete</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
  headerAction: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
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
  statusChip: {
    backgroundColor: THEME.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusChipText: {
    fontSize: 11,
    fontWeight: "600",
    color: THEME.colors.textSecondary,
  },
});
