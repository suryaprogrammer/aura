import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { THEME } from "../../constants/theme";

export default function SignupScreen() {
  const router = useRouter();
  const { signup, error, clearError, isLoading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    setLocalError(null);
    clearError();

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setLocalError("Please enter a username.");
      return;
    }
    if (trimmedUsername.length < 3) {
      setLocalError("Username must be at least 3 characters long.");
      return;
    }
    if (!password) {
      setLocalError("Please enter a password.");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    try {
      await signup({
        username: trimmedUsername,
        password,
        confirm_password: confirmPassword,
      });
      router.replace("/(tabs)");
    } catch {
      // Error handled by AuthContext
    }
  };

  const displayedError = localError || error;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Branding */}
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <View style={styles.logoDot} />
          </View>
          <Text style={styles.appName}>AURA</Text>
          <Text style={styles.tagline}>Create your Personal Operating System</Text>
        </View>

        {/* Signup Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create your account</Text>
          <Text style={styles.cardSubtitle}>Start organizing your personal operating system</Text>

          {displayedError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{displayedError}</Text>
            </View>
          ) : null}

          {/* Username Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.textInput}
              value={username}
              onChangeText={(val) => {
                setUsername(val);
                if (displayedError) {
                  setLocalError(null);
                  clearError();
                }
              }}
              placeholder="Pick a username (min 3 chars)"
              placeholderTextColor={THEME.colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <View style={styles.passwordLabelRow}>
              <Text style={styles.inputLabel}>Password</Text>
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.togglePasswordText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={(val) => {
                setPassword(val);
                if (displayedError) {
                  setLocalError(null);
                  clearError();
                }
              }}
              placeholder="Create password (min 6 chars)"
              placeholderTextColor={THEME.colors.textMuted}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={styles.textInput}
              value={confirmPassword}
              onChangeText={(val) => {
                setConfirmPassword(val);
                if (displayedError) {
                  setLocalError(null);
                  clearError();
                }
              }}
              placeholder="Re-enter your password"
              placeholderTextColor={THEME.colors.textMuted}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          {/* Submit Button */}
          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
              isLoading && styles.submitButtonDisabled,
            ]}
            onPress={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={THEME.colors.textInverse} size="small" />
            ) : (
              <Text style={styles.submitButtonText}>Create Account</Text>
            )}
          </Pressable>
        </View>

        {/* Footer Navigation */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable
            onPress={() => {
              clearError();
              router.push("/(auth)/login");
            }}
            disabled={isLoading}
          >
            <Text style={styles.linkText}>Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.colors.accent,
  },
  appName: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 2.5,
    color: THEME.colors.textPrimary,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    letterSpacing: 0.2,
  },
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: THEME.colors.textPrimary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    marginBottom: 20,
  },
  errorContainer: {
    backgroundColor: THEME.colors.dangerLight,
    borderWidth: 1,
    borderColor: THEME.colors.dangerBorder,
    borderRadius: THEME.borderRadius.sm,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    color: THEME.colors.danger,
    lineHeight: 18,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: THEME.colors.textPrimary,
    marginBottom: 6,
  },
  passwordLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  togglePasswordText: {
    fontSize: 12,
    color: THEME.colors.accentDark,
    fontWeight: "500",
  },
  textInput: {
    height: 46,
    backgroundColor: THEME.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.sm,
    paddingHorizontal: 14,
    fontSize: 15,
    color: THEME.colors.textPrimary,
  },
  submitButton: {
    height: 46,
    backgroundColor: THEME.colors.accentDark,
    borderRadius: THEME.borderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonPressed: {
    opacity: 0.9,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: THEME.colors.textInverse,
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 24,
  },
  footerText: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
  },
  linkText: {
    fontSize: 13,
    fontWeight: "600",
    color: THEME.colors.accentDark,
  },
});
