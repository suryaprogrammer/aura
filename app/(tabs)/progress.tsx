import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Activity, Compass, Trophy } from "lucide-react-native";
import { THEME } from "../../constants/theme";

export default function ProgressTabScreen() {
  const [activeSegment, setActiveSegment] = useState<"fitness" | "roadmap" | "hackathons">("roadmap");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>Fitness • AI Roadmap • Hackathons</Text>

        {/* Mobile Segmented Control */}
        <View style={styles.segmentContainer}>
          <Pressable
            style={[styles.segmentButton, activeSegment === "fitness" && styles.segmentActive]}
            onPress={() => setActiveSegment("fitness")}
          >
            <Text style={[styles.segmentText, activeSegment === "fitness" && styles.segmentTextActive]}>
              Fitness
            </Text>
          </Pressable>
          <Pressable
            style={[styles.segmentButton, activeSegment === "roadmap" && styles.segmentActive]}
            onPress={() => setActiveSegment("roadmap")}
          >
            <Text style={[styles.segmentText, activeSegment === "roadmap" && styles.segmentTextActive]}>
              AI Roadmap
            </Text>
          </Pressable>
          <Pressable
            style={[styles.segmentButton, activeSegment === "hackathons" && styles.segmentActive]}
            onPress={() => setActiveSegment("hackathons")}
          >
            <Text style={[styles.segmentText, activeSegment === "hackathons" && styles.segmentTextActive]}>
              Hackathons
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeSegment === "roadmap" && (
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Compass size={24} color={THEME.colors.accentDark} />
            </View>
            <Text style={styles.cardTitle}>AI Engineer Roadmap</Text>
            <Text style={styles.cardDesc}>
              Structured learning tracks: Foundation, Web Development, Backend, AI Fundamentals, Generative AI (Gemini API, RAG, Agents), Advanced AI, and Portfolio Projects (Kural AI, Chuvi AI).
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Activation: Phase 3</Text>
            </View>
          </View>
        )}

        {activeSegment === "fitness" && (
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Activity size={24} color={THEME.colors.accentDark} />
            </View>
            <Text style={styles.cardTitle}>Fitness Tracker</Text>
            <Text style={styles.cardDesc}>
              Deterministic logging for body measurements, workouts, exercises, sets, reps, weight, steps, water intake, and deterministic goal tracking.
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Activation: Phase 4</Text>
            </View>
          </View>
        )}

        {activeSegment === "hackathons" && (
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Trophy size={24} color={THEME.colors.accentDark} />
            </View>
            <Text style={styles.cardTitle}>Hackathon Tracker</Text>
            <Text style={styles.cardDesc}>
              23-point preparation checklist, deadlines, MVP architecture, demo readiness, pitch deck rehearsals, and post-hackathon lessons learned.
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Activation: Phase 7</Text>
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
