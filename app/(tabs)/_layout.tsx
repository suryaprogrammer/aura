import React from "react";
import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Home, CheckSquare, TrendingUp, Wallet, MoreHorizontal } from "lucide-react-native";
import { THEME } from "../../constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: THEME.colors.textPrimary,
        tabBarInactiveTintColor: THEME.colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HOME",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <Home size={20} color={color} strokeWidth={focused ? 2.2 : 1.8} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "TASKS",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <CheckSquare size={20} color={color} strokeWidth={focused ? 2.2 : 1.8} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "PROGRESS",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <TrendingUp size={20} color={color} strokeWidth={focused ? 2.2 : 1.8} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="money"
        options={{
          title: "MONEY",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <Wallet size={20} color={color} strokeWidth={focused ? 2.2 : 1.8} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "MORE",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <MoreHorizontal size={20} color={color} strokeWidth={focused ? 2.2 : 1.8} />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    height: Platform.OS === "ios" ? 84 : 64,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 24 : 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  tabBarItem: {
    paddingVertical: 2,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.8,
    marginTop: 2,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 24,
  },
  activeDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: THEME.colors.accentDark,
    marginTop: 2,
  },
});
