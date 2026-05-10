import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ClassSelector } from "@/components/ClassSelector";
import { RecommendationPanel } from "@/components/RecommendationPanel";
import { useColors } from "@/hooks/useColors";
import {
  CLASS_DESCRIPTIONS,
  CLASS_LABELS,
  SeatClass,
  getAircraftById,
} from "@/data/aircraft";

const MANUFACTURER_COLORS: Record<string, string> = {
  Boeing: "#1A3A5C",
  Airbus: "#003087",
  Embraer: "#006B3C",
  Bombardier: "#8B0000",
};

export default function AircraftDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const aircraft = getAircraftById(id ?? "");

  const [selectedClass, setSelectedClass] = useState<SeatClass>(
    aircraft?.availableClasses[0] ?? "economy"
  );

  if (!aircraft) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Feather name="alert-circle" size={40} color={colors.mutedForeground} />
        <Text style={[styles.errorText, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
          Aircraft not found
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.primary, fontFamily: "Inter_500Medium" }]}>
            Go back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const recommendation = aircraft.recommendations[selectedClass];
  const accentColor = MANUFACTURER_COLORS[aircraft.manufacturer] ?? colors.secondary;
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const classColorMap: Record<SeatClass, string> = {
    first: colors.first,
    business: colors.business,
    economy_plus: colors.economy_plus,
    economy: colors.economy,
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.heroHeader, { backgroundColor: accentColor, paddingTop: topPad + 12 }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: "rgba(255,255,255,0.15)" }]}
          onPress={handleBack}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather name="arrow-left" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <Text style={[styles.manufacturerLabel, { fontFamily: "Inter_500Medium" }]}>
            {aircraft.manufacturer}
          </Text>
          <Text style={[styles.aircraftName, { fontFamily: "Inter_700Bold" }]}>
            {aircraft.name}
          </Text>
          <Text style={[styles.aircraftDesc, { fontFamily: "Inter_400Regular" }]} numberOfLines={2}>
            {aircraft.description}
          </Text>

          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Feather name="map-pin" size={13} color="rgba(255,255,255,0.7)" />
              <Text style={[styles.heroStatText, { fontFamily: "Inter_400Regular" }]}>
                {aircraft.range}
              </Text>
            </View>
            <View style={[styles.heroStatDivider, { backgroundColor: "rgba(255,255,255,0.25)" }]} />
            <View style={styles.heroStat}>
              <Feather name="users" size={13} color="rgba(255,255,255,0.7)" />
              <Text style={[styles.heroStatText, { fontFamily: "Inter_400Regular" }]}>
                {aircraft.totalSeats} seats
              </Text>
            </View>
            <View style={[styles.heroStatDivider, { backgroundColor: "rgba(255,255,255,0.25)" }]} />
            <View style={styles.heroStat}>
              <Feather name="layers" size={13} color="rgba(255,255,255,0.7)" />
              <Text style={[styles.heroStatText, { fontFamily: "Inter_400Regular" }]}>
                {aircraft.type}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.popularRoutes, { backgroundColor: colors.surface ?? colors.card, borderBottomColor: colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.routesContent}>
          <Text style={[styles.routesLabel, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
            Popular:
          </Text>
          {aircraft.popularRoutes.map((route, i) => (
            <View key={i} style={[styles.routeChip, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
              <Feather name="navigation" size={10} color={colors.mutedForeground} />
              <Text style={[styles.routeText, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}>
                {route}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.classSelectorContainer, { borderBottomColor: colors.border }]}>
        <Text style={[styles.sectionHeading, { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" }]}>
          Select Your Class
        </Text>
        <ClassSelector
          available={aircraft.availableClasses}
          selected={selectedClass}
          onSelect={setSelectedClass}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {recommendation ? (
          <>
            <View style={styles.recommendationHeader}>
              <View style={[styles.classIndicator, { backgroundColor: classColorMap[selectedClass] + "22", borderColor: classColorMap[selectedClass] + "55" }]}>
                <Text style={[styles.classIndicatorText, { color: classColorMap[selectedClass], fontFamily: "Inter_700Bold" }]}>
                  {CLASS_LABELS[selectedClass]}
                </Text>
              </View>
              <Text style={[styles.recommendationSubtitle, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                {CLASS_DESCRIPTIONS[selectedClass]}
              </Text>
            </View>
            <RecommendationPanel cls={selectedClass} recommendation={recommendation} />
          </>
        ) : (
          <View style={styles.noDataState}>
            <Feather name="info" size={32} color={colors.mutedForeground} />
            <Text style={[styles.noDataText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              No recommendation data available for this class on this aircraft.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  errorText: {
    fontSize: 18,
  },
  backLink: {
    fontSize: 15,
    marginTop: 4,
  },
  heroHeader: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 14,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  heroContent: {
    gap: 8,
  },
  manufacturerLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  aircraftName: {
    fontSize: 26,
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  aircraftDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 19,
  },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  heroStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  heroStatText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  heroStatDivider: {
    width: 1,
    height: 12,
  },
  popularRoutes: {
    borderBottomWidth: 1,
  },
  routesContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    alignItems: "center",
  },
  routesLabel: {
    fontSize: 12,
    marginRight: 2,
  },
  routeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  routeText: {
    fontSize: 12,
  },
  classSelectorContainer: {
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 10,
  },
  sectionHeading: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingHorizontal: 16,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  recommendationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  classIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  classIndicatorText: {
    fontSize: 13,
  },
  recommendationSubtitle: {
    fontSize: 13,
    flex: 1,
  },
  noDataState: {
    alignItems: "center",
    gap: 12,
    paddingTop: 60,
  },
  noDataText: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 32,
    lineHeight: 21,
  },
});
