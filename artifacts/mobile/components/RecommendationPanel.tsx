import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import { SeatClass, SeatRecommendation } from "@/data/aircraft";

interface Props {
  cls: SeatClass;
  recommendation: SeatRecommendation;
}

const CLASS_COLOR_KEYS: Record<SeatClass, "first" | "business" | "economy_plus" | "economy"> = {
  first: "first",
  business: "business",
  economy_plus: "economy_plus",
  economy: "economy",
};

function RatingBar({ value, max = 5, color }: { value: number; max?: number; color: string }) {
  return (
    <View style={styles.ratingBarContainer}>
      {Array.from({ length: max }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.ratingBarSegment,
            {
              backgroundColor: i < value ? color : color + "22",
            },
          ]}
        />
      ))}
    </View>
  );
}

export function RecommendationPanel({ cls, recommendation }: Props) {
  const colors = useColors();
  const colorKey = CLASS_COLOR_KEYS[cls];
  const accent = colors[colorKey];

  return (
    <View style={styles.wrapper}>
      <View style={[styles.ratingsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" }]}>
          Ratings
        </Text>
        <View style={styles.ratingsGrid}>
          <View style={styles.ratingRow}>
            <Text style={[styles.ratingLabel, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>
              Overall
            </Text>
            <RatingBar value={recommendation.overallRating} color={accent} />
          </View>
          <View style={styles.ratingRow}>
            <Text style={[styles.ratingLabel, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>
              Comfort
            </Text>
            <RatingBar value={recommendation.comfortRating} color={accent} />
          </View>
          <View style={styles.ratingRow}>
            <Text style={[styles.ratingLabel, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>
              Value
            </Text>
            <RatingBar value={recommendation.valueRating} color={accent} />
          </View>
        </View>
        <Text style={[styles.notes, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          {recommendation.notes}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: accent + "44" }]}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconBadge, { backgroundColor: accent + "22" }]}>
            <Feather name="check-circle" size={16} color={accent} />
          </View>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            Best Seats
          </Text>
        </View>
        <View style={styles.seatList}>
          {recommendation.bestSeats.map((seat, i) => (
            <View key={i} style={[styles.seatChip, { backgroundColor: accent + "18", borderColor: accent + "40" }]}>
              <Text style={[styles.seatChipText, { color: accent, fontFamily: "Inter_600SemiBold" }]}>
                {seat}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.destructive + "33" }]}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconBadge, { backgroundColor: colors.destructive + "18" }]}>
            <Feather name="x-circle" size={16} color={colors.destructive} />
          </View>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            Seats to Avoid
          </Text>
        </View>
        <View style={styles.seatList}>
          {recommendation.avoidSeats.map((seat, i) => (
            <View key={i} style={[styles.seatChip, { backgroundColor: colors.destructive + "12", borderColor: colors.destructive + "30" }]}>
              <Text style={[styles.seatChipText, { color: colors.destructive, fontFamily: "Inter_500Medium" }]}>
                {seat}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconBadge, { backgroundColor: colors.primary + "22" }]}>
            <Feather name="star" size={16} color={colors.primary} />
          </View>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            Pro Tips
          </Text>
        </View>
        <View style={styles.tipsList}>
          {recommendation.tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={[styles.tipDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.tipText, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}>
                {tip}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
    paddingBottom: 32,
  },
  ratingsCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  ratingsGrid: {
    gap: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingLabel: {
    fontSize: 14,
    width: 70,
  },
  ratingBarContainer: {
    flexDirection: "row",
    gap: 5,
  },
  ratingBarSegment: {
    width: 36,
    height: 6,
    borderRadius: 3,
  },
  notes: {
    fontSize: 13,
    lineHeight: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
  },
  seatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  seatChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  seatChipText: {
    fontSize: 13,
  },
  tipsList: {
    gap: 12,
  },
  tipRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    flexShrink: 0,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
  },
});
