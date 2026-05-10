import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";
import { Aircraft, CLASS_LABELS, SeatClass } from "@/data/aircraft";

interface Props {
  aircraft: Aircraft;
}

const MANUFACTURER_COLORS: Record<string, string> = {
  Boeing: "#1A3A5C",
  Airbus: "#003087",
  Embraer: "#006B3C",
  Bombardier: "#8B0000",
};

const TYPE_ICON: Record<string, string> = {
  Narrowbody: "minimize-2",
  Widebody: "maximize-2",
  Jumbo: "layers",
};

export function AircraftCard({ aircraft }: Props) {
  const colors = useColors();

  const classColorMap: Record<SeatClass, string> = {
    first: colors.first,
    business: colors.business,
    economy_plus: colors.economy_plus,
    economy: colors.economy,
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/aircraft/${aircraft.id}`);
  };

  const accentColor = MANUFACTURER_COLORS[aircraft.manufacturer] ?? colors.secondary;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={[styles.header, { backgroundColor: accentColor }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.manufacturer, { color: "rgba(255,255,255,0.75)", fontFamily: "Inter_500Medium" }]}>
            {aircraft.manufacturer}
          </Text>
          <Text style={[styles.name, { color: "#FFFFFF", fontFamily: "Inter_700Bold" }]} numberOfLines={1}>
            {aircraft.name}
          </Text>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: "rgba(255,255,255,0.15)" }]}>
          <Feather
            name={TYPE_ICON[aircraft.type] as "minimize-2" | "maximize-2" | "layers"}
            size={12}
            color="rgba(255,255,255,0.9)"
          />
          <Text style={[styles.typeText, { fontFamily: "Inter_500Medium" }]}>{aircraft.type}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.specsRow}>
          <View style={styles.spec}>
            <Feather name="map-pin" size={12} color={colors.mutedForeground} />
            <Text style={[styles.specLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Range
            </Text>
            <Text style={[styles.specValue, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              {aircraft.range}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.spec}>
            <Feather name="users" size={12} color={colors.mutedForeground} />
            <Text style={[styles.specLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Seats
            </Text>
            <Text style={[styles.specValue, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              {aircraft.totalSeats}
            </Text>
          </View>
        </View>

        <View style={styles.classRow}>
          {aircraft.availableClasses.map((cls) => (
            <View
              key={cls}
              style={[styles.classBadge, { backgroundColor: classColorMap[cls] + "22", borderColor: classColorMap[cls] + "55" }]}
            >
              <Text style={[styles.classText, { color: classColorMap[cls], fontFamily: "Inter_600SemiBold" }]}>
                {CLASS_LABELS[cls]}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Text style={[styles.viewText, { color: colors.primary, fontFamily: "Inter_500Medium" }]}>
          View seat recommendations
        </Text>
        <Feather name="arrow-right" size={14} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  headerContent: {
    flex: 1,
    gap: 2,
  },
  manufacturer: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  name: {
    fontSize: 18,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  typeText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.9)",
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  specsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  spec: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  specLabel: {
    fontSize: 12,
  },
  specValue: {
    fontSize: 13,
  },
  divider: {
    width: 1,
    height: 20,
  },
  classRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  classBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  classText: {
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  viewText: {
    fontSize: 13,
  },
});
