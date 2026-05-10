export type SeatClass = "first" | "business" | "economy_plus" | "economy";

export interface SeatRecommendation {
  bestSeats: string[];
  avoidSeats: string[];
  tips: string[];
  overallRating: number;
  comfortRating: number;
  valueRating: number;
  notes: string;
}

export interface Aircraft {
  id: string;
  name: string;
  manufacturer: "Boeing" | "Airbus" | "Embraer" | "Bombardier";
  type: "Narrowbody" | "Widebody" | "Jumbo";
  range: string;
  totalSeats: number;
  description: string;
  popularRoutes: string[];
  availableClasses: SeatClass[];
  recommendations: Partial<Record<SeatClass, SeatRecommendation>>;
}

export const AIRCRAFT_DATA: Aircraft[] = [
  {
    id: "b777-300er",
    name: "Boeing 777-300ER",
    manufacturer: "Boeing",
    type: "Widebody",
    range: "13,650 km",
    totalSeats: 396,
    description:
      "The industry workhorse for long-haul routes. Known for spacious cabins and exceptional range, the 777-300ER is the backbone of many premium international fleets.",
    popularRoutes: ["NYC–Dubai", "London–Singapore", "LA–Tokyo"],
    availableClasses: ["first", "business", "economy_plus", "economy"],
    recommendations: {
      first: {
        overallRating: 5,
        comfortRating: 5,
        valueRating: 4,
        bestSeats: ["1A", "1K", "2A", "2K", "3A", "3K"],
        avoidSeats: ["1D", "1G (galley noise)", "Last row of first class"],
        tips: [
          "Window suites 1A/1K offer maximum privacy with direct aisle access.",
          "Row 2 and 3 are quieter — row 1 sits directly behind the forward galley.",
          "Left-side A seats face backward on some airlines — check your carrier's config.",
          "Request forward-facing orientation when booking if available.",
        ],
        notes:
          "First class on the 777-300ER is one of the most spacious cabins in the sky. Most airlines configure 8–14 seats in a 1-2-1 or 2-2 layout.",
      },
      business: {
        overallRating: 5,
        comfortRating: 5,
        valueRating: 4,
        bestSeats: ["11A", "11K", "12A", "12K", "13A", "13K"],
        avoidSeats: [
          "Last row (no recline)",
          "Seats near mid-cabin lavs",
          "21D/G (middle of cabin — less privacy)",
        ],
        tips: [
          "Window seats (A/K columns) offer privacy with direct aisle access in 1-2-1 layouts.",
          "Middle rows (12–16) hit the cabin sweet spot — away from galleys and lavatories.",
          "Avoid the very last row of business — recline may be blocked and you'll smell economy meals first.",
          "If traveling with a partner, center seats (D/G) let you sit side-by-side.",
        ],
        notes:
          "Business class is the premium sweet spot on the 777-300ER. Most airlines offer fully flat beds in a 1-2-1 configuration.",
      },
      economy_plus: {
        overallRating: 4,
        comfortRating: 4,
        valueRating: 5,
        bestSeats: [
          "Exit row window seats",
          "Bulkhead row A/K",
          "Row 30A/30K",
          "Row 31A/31K",
        ],
        avoidSeats: [
          "Seats directly behind bulkhead (no recline ahead, but those seats can't recline either)",
          "Middle seats in any exit row",
          "Row adjacent to galley",
        ],
        tips: [
          "Exit row seats offer 8–12 inches of extra legroom — best value upgrade in economy.",
          "Bulkhead rows have extra footroom but no under-seat storage — keep essentials in the overhead.",
          "Window seats in exit rows give you legroom AND a place to lean for sleep.",
          "Avoid the bulkhead middle seat — it has an immovable tray table in the armrest.",
        ],
        notes:
          "Economy Plus on the 777-300ER can be excellent if you select wisely. The exit rows are the standout choice.",
      },
      economy: {
        overallRating: 3,
        comfortRating: 3,
        valueRating: 5,
        bestSeats: ["30A", "30K", "35A", "35K", "Rows 20–30 A/K"],
        avoidSeats: [
          "Last 5 rows (no recline, near lavatories)",
          "Middle seats (D/E/F columns)",
          "Row immediately in front of exit rows (no recline)",
          "Galley-adjacent rows",
        ],
        tips: [
          "Window seats in rows 20–30 offer the best sleep position on long hauls.",
          "Aisle seats give easy bathroom access without climbing over neighbors.",
          "Avoid rows 37-40 on most configs — directly by rear lavatories.",
          "Sit forward of the wing for the smoothest ride in turbulence.",
          "Request a seat over the wing for a stable flight experience.",
        ],
        notes:
          "Economy on the 777-300ER is a 3-3-3 layout (9 across). Prioritize window or aisle and stay away from the rear third.",
      },
    },
  },
  {
    id: "b787-9",
    name: "Boeing 787-9 Dreamliner",
    manufacturer: "Boeing",
    type: "Widebody",
    range: "14,140 km",
    totalSeats: 296,
    description:
      "The 787-9 is famous for its large windows, higher cabin humidity, and lower cabin altitude, reducing jet lag on long-haul flights. A passenger favourite for comfort.",
    popularRoutes: ["London–Tokyo", "Sydney–Dallas", "Auckland–Houston"],
    availableClasses: ["business", "economy_plus", "economy"],
    recommendations: {
      business: {
        overallRating: 5,
        comfortRating: 5,
        valueRating: 4,
        bestSeats: ["1A", "1K", "3A", "3K", "5A", "5K"],
        avoidSeats: [
          "Last row of business (wall behind — may feel cramped)",
          "Seats 2D/2G center console",
          "Row 1 on some airlines (facing galley)",
        ],
        tips: [
          "The 787 business cabin is often configured 1-2-1 — all window seats have direct aisle access.",
          "Odd-numbered rows on some airlines have the seat closer to the window for extra privacy.",
          "The larger windows (electrochromic dimming) are a real highlight — choose a window seat.",
          "Forward rows board first and are served first — worth prioritising.",
        ],
        notes:
          "Business class on the 787-9 is among the best in the sky. The aircraft's reduced cabin altitude means you'll arrive fresher.",
      },
      economy_plus: {
        overallRating: 4,
        comfortRating: 4,
        valueRating: 5,
        bestSeats: ["Exit row 27A/27K", "Exit row 28A/28K", "Bulkhead row A/K"],
        avoidSeats: [
          "Centre exit row middle seats",
          "Seats with obstructed windows",
          "Rows adjacent to mid-cabin galleys",
        ],
        tips: [
          "Exit row window seats are the prime economy plus pick — legroom plus the famous giant Dreamliner windows.",
          "The 787's windows are 65% larger than comparable aircraft — a window seat is always worth it.",
          "Bulkhead rows offer the extra stretch but forgo the under-seat storage advantage.",
        ],
        notes:
          "Economy Plus is a strong pick on the 787 — combine it with an exit row window seat for the best long-haul experience.",
      },
      economy: {
        overallRating: 4,
        comfortRating: 4,
        valueRating: 5,
        bestSeats: ["20A", "20K", "25A", "25K", "Rows 15-25 window"],
        avoidSeats: [
          "Last 4 rows (near rear galley and lavatories)",
          "Row in front of exit rows (no recline)",
          "Centre middle seat E",
        ],
        tips: [
          "The 787's unique feature is lower cabin altitude (6,000 ft vs 8,000 ft) — you'll feel less fatigued regardless of seat.",
          "Windows are significantly larger — choose window seats to appreciate the view.",
          "Higher humidity means less dehydration. Still drink water regularly.",
          "Economy is 2-4-2 on some airlines — if so, the pairs on the sides are great for couples.",
        ],
        notes:
          "Economy on the 787 genuinely feels better than other aircraft thanks to the engineering. Even middle seats are more comfortable.",
      },
    },
  },
  {
    id: "a380-800",
    name: "Airbus A380-800",
    manufacturer: "Airbus",
    type: "Jumbo",
    range: "15,200 km",
    totalSeats: 555,
    description:
      "The world's largest passenger aircraft. The A380's double-deck layout is quieter than most aircraft, with some of the most iconic first class suites in aviation.",
    popularRoutes: ["Dubai–London", "Singapore–Sydney", "Frankfurt–JFK"],
    availableClasses: ["first", "business", "economy_plus", "economy"],
    recommendations: {
      first: {
        overallRating: 5,
        comfortRating: 5,
        valueRating: 3,
        bestSeats: ["1A", "1K (Emirates/Etihad suites)", "2A", "2K"],
        avoidSeats: [
          "Centre suites (less privacy on some configs)",
          "Row nearest stairs (foot traffic noise)",
        ],
        tips: [
          "A380 First Class is often the pinnacle of commercial aviation — Emirates offers shower spas and private suites.",
          "Upper deck first class is quieter with fewer passengers.",
          "Window suites (A/K) have the most privacy from the aisle.",
          "Book early — first class cabins are tiny (6-14 seats) and sell out fast.",
        ],
        notes:
          "First Class on the A380 varies dramatically by airline. Emirates' Shower Spa and private suites are among the best products in the world.",
      },
      business: {
        overallRating: 5,
        comfortRating: 5,
        valueRating: 4,
        bestSeats: [
          "Upper deck rows 11-14 A/K",
          "Lower deck forward business A/K",
        ],
        avoidSeats: [
          "Lower deck last row of business",
          "Seats at the base of the stairs",
          "Seats near mid-deck galley",
        ],
        tips: [
          "Upper deck business is a gem — fewer passengers, quieter, and a unique experience.",
          "The upper deck has a gentle curve to the cabin that feels intimate.",
          "Lower deck forward business still has excellent products on most A380 operators.",
          "Avoid seats near the staircase — there's constant foot traffic during the flight.",
        ],
        notes:
          "Business class on the A380 upper deck is a sought-after experience. The aircraft's four-engine design makes it one of the quietest in the sky.",
      },
      economy_plus: {
        overallRating: 4,
        comfortRating: 4,
        valueRating: 5,
        bestSeats: [
          "Upper deck exit row A/K",
          "Lower deck exit row A/K (rows 43-44)",
        ],
        avoidSeats: [
          "Lower deck rear section (crowded lavatories)",
          "Centre block middle seats",
          "Seats near galley on lower deck",
        ],
        tips: [
          "The A380 upper deck economy is notably quieter than the lower deck.",
          "Upper deck exit rows combine quietness with extra legroom.",
          "Lower deck has 10-across seating — upper deck is 9-across and feels less packed.",
        ],
        notes:
          "Economy Plus on the A380 is best enjoyed on the upper deck for a calmer, quieter flight environment.",
      },
      economy: {
        overallRating: 3,
        comfortRating: 3,
        valueRating: 5,
        bestSeats: [
          "Upper deck rows 60-65 window",
          "Lower deck rows 20-30 window",
        ],
        avoidSeats: [
          "Lower deck rear middle seats",
          "Seats in front of exit rows (no recline)",
          "Last 5 rows lower deck",
          "Seats near lower deck rear galley",
        ],
        tips: [
          "The A380 is one of the quietest jets — economy is genuinely more comfortable than many aircraft.",
          "Upper deck economy (if available to book) is significantly quieter and has fewer passengers.",
          "The lower deck has a 10-across 3-4-3 layout — side pairs are best.",
          "Choose the outer blocks (A-C or H-K) to avoid the 4-seat centre block.",
        ],
        notes:
          "The A380's size works in your favour in economy — it's one of the quietest and smoothest large jets flying today.",
      },
    },
  },
  {
    id: "a350-900",
    name: "Airbus A350-900",
    manufacturer: "Airbus",
    type: "Widebody",
    range: "15,000 km",
    totalSeats: 315,
    description:
      "Airbus's answer to the 787, the A350-900 features advanced composite construction, large windows, and a noticeably quiet cabin. It's increasingly the aircraft of choice for premium routes.",
    popularRoutes: ["Paris–Tokyo", "London–Singapore", "Dallas–Seoul"],
    availableClasses: ["business", "economy_plus", "economy"],
    recommendations: {
      business: {
        overallRating: 5,
        comfortRating: 5,
        valueRating: 4,
        bestSeats: ["1A", "1K", "3A", "3K", "5A", "5K"],
        avoidSeats: [
          "Last row of business (galley smell, noise)",
          "Seats adjacent to lavatories",
          "Row 2 D/G (centre — less window access)",
        ],
        tips: [
          "1-2-1 business layout means every seat has direct aisle access.",
          "Window seats (A/K) are particularly impressive — the A350 has larger windows than the 777.",
          "Forward rows benefit from priority service and are closest to the forward galley (faster meal service).",
          "The A350 cabin noise level is extremely low — you'll notice the difference even compared to the 787.",
        ],
        notes:
          "Business class on the A350-900 is excellent. Qatar Airways' QSuites are considered the world's best business class product on this aircraft.",
      },
      economy_plus: {
        overallRating: 4,
        comfortRating: 4,
        valueRating: 5,
        bestSeats: ["Exit row 30A/30K", "Bulkhead row A/K"],
        avoidSeats: [
          "Middle seats in any exit row",
          "Seats adjacent to mid-cabin lavatories",
          "Row in front of exit row (no recline)",
        ],
        tips: [
          "Exit rows on the A350 are a priority pick for the extra legroom.",
          "Window seats showcase the A350's larger windows with reduced-glare tinting.",
          "Economy Plus pitch is typically 34-38 inches — a meaningful upgrade for long hauls.",
        ],
        notes:
          "The A350's low cabin altitude (similar to the 787) means you'll arrive more refreshed regardless of class.",
      },
      economy: {
        overallRating: 4,
        comfortRating: 4,
        valueRating: 5,
        bestSeats: ["25A", "25K", "Rows 20-30 A/K", "30A", "30K"],
        avoidSeats: [
          "Last 4 rows",
          "Seats in front of exit rows (no recline)",
          "Centre middle seats",
          "Galley-adjacent rows",
        ],
        tips: [
          "3-3-3 layout — always choose a window or aisle and avoid the centre block.",
          "The A350 genuinely has better air quality than older jets — less dehydration.",
          "Rows 25-30 sit over the wing — smoothest ride in turbulence.",
          "The wider fuselage makes even the middle seat a bit more tolerable than the 777.",
        ],
        notes:
          "Economy on the A350-900 punches above its class. The cabin atmosphere and low noise make it one of the best economy experiences today.",
      },
    },
  },
  {
    id: "b737-max8",
    name: "Boeing 737 MAX 8",
    manufacturer: "Boeing",
    type: "Narrowbody",
    range: "6,570 km",
    totalSeats: 178,
    description:
      "The modernised 737 with improved fuel efficiency. Popular for short-to-medium haul routes, the MAX 8 features updated cabin styling and larger overhead bins.",
    popularRoutes: ["NYC–Miami", "Chicago–Denver", "Seattle–San Francisco"],
    availableClasses: ["business", "economy_plus", "economy"],
    recommendations: {
      business: {
        overallRating: 3,
        comfortRating: 3,
        valueRating: 3,
        bestSeats: ["1A", "1F", "2A", "2F"],
        avoidSeats: [
          "Row 1 D/E (blocked window view)",
          "Last row of first class (no full recline on some configs)",
        ],
        tips: [
          "First/Business on domestic 737s is a 2-2 layout — all seats have aisle access.",
          "Row 1 has excellent legroom but you may get galley noise.",
          "Window seats (A/F) are the best pick for short flights.",
          "The exit row directly behind first class can make your last row feel crowded.",
        ],
        notes:
          "Domestic first class on the 737 MAX is comfortable rather than luxurious. Extra legroom and wider seats are the main benefit.",
      },
      economy_plus: {
        overallRating: 4,
        comfortRating: 4,
        valueRating: 5,
        bestSeats: ["Exit row 16A/16F", "Exit row 17A/17F", "Row 12A/12F"],
        avoidSeats: [
          "Exit row middle seats (15D/15E — no armrest recline, can't get up easily)",
          "Row in front of exit rows (seats don't recline)",
          "Any middle seat",
        ],
        tips: [
          "The over-wing exit rows (16/17) are the top pick — legroom is dramatically better.",
          "Exit row window seats let you lean against the wall for sleep on longer segments.",
          "Avoid the middle seats in the exit row — the armrests are immovable for safety.",
          "Row 12-15 offer extra legroom as Comfort+ or Plus seats on many airlines.",
        ],
        notes:
          "Economy Plus on the 737 MAX concentrates around rows 12-17. The exit rows are a significant upgrade on medium hauls.",
      },
      economy: {
        overallRating: 3,
        comfortRating: 2,
        valueRating: 5,
        bestSeats: ["20A", "20F", "25A", "25F", "Rows 18-25 A/F"],
        avoidSeats: [
          "Last 3 rows (near rear lavatories, no recline)",
          "Middle seats throughout",
          "Seats in front of exit rows (no recline)",
          "Row 33-37 (very rear, high turbulence)",
        ],
        tips: [
          "Standard economy is 3-3 — always pick window or aisle.",
          "Rows 18-25 are sweet spot — past the wing exits but before the rear crowd.",
          "Avoid row 30 onwards — turbulence is noticeably stronger at the back.",
          "Window seat on the right side (F) often gets slightly less engine noise.",
        ],
        notes:
          "Economy on the 737 MAX is functional but not spacious. For short flights, any seat works. For 3+ hour segments, avoid the rear.",
      },
    },
  },
  {
    id: "a320neo",
    name: "Airbus A320neo",
    manufacturer: "Airbus",
    type: "Narrowbody",
    range: "6,300 km",
    totalSeats: 165,
    description:
      "The most popular narrowbody in the world. The A320neo's new engine option delivers 20% better fuel efficiency and a notably quieter cabin than its predecessor.",
    popularRoutes: ["London–Barcelona", "Paris–Rome", "Dubai–Mumbai"],
    availableClasses: ["business", "economy"],
    recommendations: {
      business: {
        overallRating: 3,
        comfortRating: 4,
        valueRating: 3,
        bestSeats: ["1A", "1C", "1D", "1F", "2A", "2F"],
        avoidSeats: [
          "Last row of business (blocked by economy bulkhead on some configs)",
          "Seats directly next to lavatory on some short-haul configs",
        ],
        tips: [
          "A320neo business is 2-2 with a blocked middle — more space than economy but not dramatically different on short hauls.",
          "Row 1 has the most legroom on most configurations.",
          "Some airlines (easyJet, etc.) have no true business — they just leave the middle empty.",
          "Choose a window on short European hops — you won't be seated long enough to miss the aisle.",
        ],
        notes:
          "Business on the A320neo varies hugely by airline — from full flat beds (Singapore Airlines A320 short haul) to just a blocked middle seat (budget carriers).",
      },
      economy: {
        overallRating: 3,
        comfortRating: 3,
        valueRating: 5,
        bestSeats: ["14A", "14F", "Exit row A/F (row 14-15)", "Rows 10-16 A/F"],
        avoidSeats: [
          "Last 3 rows",
          "Middle seats (B/E throughout)",
          "Row in front of exit row (no recline)",
          "Row 1 economy (galley noise, no underseat storage)",
        ],
        tips: [
          "Standard economy is 3-3 — always pick window or aisle.",
          "The over-wing exit row is the legroom jackpot on the A320.",
          "Rows 10-16 are mid-cabin — less turbulence than the rear.",
          "Avoid the last row — seats may not recline and you're right by the rear lav.",
          "The A320neo is noticeably quieter than the A320ceo — engine roar is reduced.",
        ],
        notes:
          "Economy on the A320neo is the standard short-haul experience. Smart seat selection (window/aisle, mid-cabin) makes all the difference.",
      },
    },
  },
  {
    id: "a321xlr",
    name: "Airbus A321XLR",
    manufacturer: "Airbus",
    type: "Narrowbody",
    range: "8,700 km",
    totalSeats: 180,
    description:
      "The game-changer for long-haul narrowbody travel. The A321XLR opens trans-Atlantic routes with a single-aisle aircraft, bridging the gap between short and long haul.",
    popularRoutes: [
      "Boston–Dublin",
      "Madrid–Washington",
      "London–New York (some airlines)",
    ],
    availableClasses: ["business", "economy_plus", "economy"],
    recommendations: {
      business: {
        overallRating: 4,
        comfortRating: 4,
        valueRating: 4,
        bestSeats: ["Row 1A", "Row 1F", "Row 2A", "Row 2F"],
        avoidSeats: [
          "Last row of business (directly adjacent to economy)",
          "Centre seats if not flat-bed config",
        ],
        tips: [
          "Business on the XLR varies — some airlines offer lie-flat, others recliner seats.",
          "For trans-Atlantic segments, always verify whether seats go fully flat before booking.",
          "Forward rows have priority deboarding — useful for tight connections.",
          "The 2-2 layout means window seats are one step from the aisle.",
        ],
        notes:
          "The A321XLR is new — business class products vary significantly between airlines. Research your specific carrier's seat type before booking.",
      },
      economy_plus: {
        overallRating: 3,
        comfortRating: 3,
        valueRating: 4,
        bestSeats: ["Exit row A/F", "Bulkhead row A/F"],
        avoidSeats: [
          "Middle seats in exit row",
          "Seats with restricted recline",
          "Row adjacent to galley",
        ],
        tips: [
          "On a narrowbody trans-Atlantic flight, the exit row is essential for comfort.",
          "The A321XLR's cabin length means exit rows vary — check the seatmap carefully.",
          "Bring noise-cancelling headphones — narrowbody engine noise is more noticeable than widebodies.",
        ],
        notes:
          "Economy Plus on the XLR is critical for long hauls — the standard seat pitch can be tight for 7-8 hour flights.",
      },
      economy: {
        overallRating: 2,
        comfortRating: 2,
        valueRating: 4,
        bestSeats: ["15A", "15F", "Rows 14-18 window"],
        avoidSeats: [
          "Middle seats (B/E) on any long segment",
          "Last 3 rows",
          "Seats adjacent to rear galley",
          "Row in front of exit row",
        ],
        tips: [
          "On long narrowbody flights, the aisle seat is arguably better than the window — you can get up without disturbing anyone.",
          "Bring a neck pillow — the 3-3 layout means window seats have a wall to lean on.",
          "Consider premium economy if the price difference is modest — the pitch upgrade matters on 7+ hour flights.",
          "Stay hydrated — narrowbody cabins can have lower humidity than widebodies.",
        ],
        notes:
          "Economy on the XLR for trans-Atlantic segments is demanding. Budget for an upgrade or choose seats strategically — it's a long time in a narrowbody.",
      },
    },
  },
  {
    id: "b747-8",
    name: "Boeing 747-8",
    manufacturer: "Boeing",
    type: "Jumbo",
    range: "14,815 km",
    totalSeats: 410,
    description:
      "The latest evolution of the iconic 747. The 747-8 features a stretched upper deck and is particularly sought-after for its business class upper deck experience.",
    popularRoutes: ["Frankfurt–San Francisco", "Seoul–Chicago", "Seoul–Los Angeles"],
    availableClasses: ["first", "business", "economy_plus", "economy"],
    recommendations: {
      first: {
        overallRating: 5,
        comfortRating: 5,
        valueRating: 3,
        bestSeats: ["1A", "1K", "2A", "2K"],
        avoidSeats: [
          "First class seats adjacent to the staircase",
          "Last row of first if near galley",
        ],
        tips: [
          "First class sits on the main deck nose — one of the most iconic positions in aviation.",
          "Lufthansa's 747-8 First has standalone private suites accessible only by invitation to HON Circle members — it's extremely exclusive.",
          "Korean Air's 747-8 first class is among the most lavish available.",
          "The forward nose position means a smooth ride — insulated from the engines further back.",
        ],
        notes:
          "First class on the 747-8 is a rare and coveted experience. Only a handful of airlines operate it.",
      },
      business: {
        overallRating: 5,
        comfortRating: 5,
        valueRating: 4,
        bestSeats: [
          "Upper deck rows 21-26 window",
          "Upper deck A/K seats",
          "Upper deck D/G for couples",
        ],
        avoidSeats: [
          "Lower deck last row of business",
          "Seats at base of stairs (heavy foot traffic)",
          "Lower deck galley-adjacent rows",
        ],
        tips: [
          "The 747-8 upper deck business class is the crown jewel — intimate, quiet, and exclusive.",
          "Upper deck has approximately 48 seats and feels like a private cabin.",
          "The hump section of the upper deck curves gently — window views are slightly obstructed but the atmosphere is unmatched.",
          "Choose upper deck (rows 21-26 typically) for the definitive 747 business experience.",
        ],
        notes:
          "The 747-8 upper deck business class is arguably the most atmospheric cabin experience in aviation. Fewer passengers, less noise, and a unique sense of exclusivity.",
      },
      economy_plus: {
        overallRating: 3,
        comfortRating: 3,
        valueRating: 4,
        bestSeats: ["Exit row window seats", "Bulkhead A/K"],
        avoidSeats: [
          "Centre block middle seats",
          "Rear-facing exit row seats (if applicable)",
          "Seats adjacent to rear lavatories",
        ],
        tips: [
          "The 747's 3-4-3 economy layout is tight — exit rows become especially important.",
          "Exit row window seats give legroom and a place to rest your head.",
          "Bulkhead rows have extra foot space but the tray table folds out of the armrest.",
        ],
        notes:
          "Economy Plus on the 747-8 is about mitigating the 10-across layout. Exit rows and bulkheads are your best tools.",
      },
      economy: {
        overallRating: 2,
        comfortRating: 2,
        valueRating: 5,
        bestSeats: ["30A", "30K", "Rows 25-35 window (A/K sides)"],
        avoidSeats: [
          "Centre block seats (D/E/F/G) on any long flight",
          "Last 5 rows",
          "Row in front of exit row",
          "Seats adjacent to rear lavatory cluster",
        ],
        tips: [
          "3-4-3 layout means the centre block has 4 seats across — avoid it at all costs.",
          "The outer blocks (A-B-C and H-J-K) are 3-across — window or aisle here is very liveable.",
          "Rows 30-38 are forward of the rear galley — a good balance of location.",
          "The 747's wing roots are over the middle of the aircraft — sit there for the smoothest ride.",
        ],
        notes:
          "Economy on the 747-8 is one of the denser cabins flying. Picking the outer blocks and avoiding the rear is essential for comfort.",
      },
    },
  },
  {
    id: "e195-e2",
    name: "Embraer E195-E2",
    manufacturer: "Embraer",
    type: "Narrowbody",
    range: "4,800 km",
    totalSeats: 130,
    description:
      "A favourite of regional airlines, the E195-E2 features a 2-2 seating layout with no middle seat across the cabin — a significant comfort advantage for regional flights.",
    popularRoutes: ["Stockholm–London", "Amsterdam–Warsaw", "Zurich–Athens"],
    availableClasses: ["business", "economy"],
    recommendations: {
      business: {
        overallRating: 4,
        comfortRating: 4,
        valueRating: 4,
        bestSeats: ["1A", "1C", "2A", "2C"],
        avoidSeats: [
          "Last row of business (next to economy divider)",
          "Row 1 on some configs (galley noise)",
        ],
        tips: [
          "Business on the E195-E2 is typically a blocked 2-2 — seats 1A/1C or 2A/2C.",
          "All seats are either window or aisle — there is no middle seat on this aircraft.",
          "Row 1 has the most legroom but is closest to the galley.",
          "Short-haul business is about priority boarding and extra space, not flat beds.",
        ],
        notes:
          "Business on the E195-E2 is ideal for short European segments — the no-middle-seat design makes it genuinely comfortable.",
      },
      economy: {
        overallRating: 4,
        comfortRating: 4,
        valueRating: 5,
        bestSeats: ["10A", "10C", "15A", "15C"],
        avoidSeats: [
          "Last 2 rows",
          "Row adjacent to rear lavatories",
          "Row in front of exit row (no recline on some configs)",
        ],
        tips: [
          "The E195-E2's 2-2 layout means every seat is either a window or an aisle — this is a huge advantage.",
          "No middle seat exists anywhere on this aircraft — choose freely.",
          "Mid-cabin rows (10-20) are the quietest distance from engines and lavatories.",
          "Window seats on the right side (C column) often face a cleaner view.",
        ],
        notes:
          "The E195-E2 is one of the most comfortable regional jets available. The 2-2 layout eliminates the middle seat problem entirely.",
      },
    },
  },
  {
    id: "a350-1000",
    name: "Airbus A350-1000",
    manufacturer: "Airbus",
    type: "Widebody",
    range: "16,100 km",
    totalSeats: 369,
    description:
      "The stretched A350-1000 is one of the longest-range aircraft in service. Operated by airlines including Virgin Atlantic, Qatar Airways, and British Airways on ultra-long-haul routes.",
    popularRoutes: [
      "London–Singapore",
      "Doha–Auckland",
      "London–Johannesburg",
    ],
    availableClasses: ["first", "business", "economy_plus", "economy"],
    recommendations: {
      first: {
        overallRating: 5,
        comfortRating: 5,
        valueRating: 4,
        bestSeats: ["1A", "1K", "2A", "2K"],
        avoidSeats: [
          "Seats adjacent to galley",
          "Centre suites on configs with lower privacy screens",
        ],
        tips: [
          "Virgin Atlantic's 'The Retreat' suite on the A350-1000 is one of the world's best premium products.",
          "British Airways First on the A350-1000 features Club Suites-derived cabin design.",
          "Window suites offer the highest privacy with direct aisle access in 1-2-1 layouts.",
          "The A350-1000 is whisper-quiet — even first class can feel peaceful on long flights.",
        ],
        notes:
          "First class on the A350-1000 is exceptional, especially on Virgin Atlantic and Qatar Airways. Book as early as possible.",
      },
      business: {
        overallRating: 5,
        comfortRating: 5,
        valueRating: 4,
        bestSeats: ["11A", "11K", "13A", "13K", "Rows 11-18 window"],
        avoidSeats: [
          "Last row of business",
          "Row adjacent to mid-cabin lavatories",
          "Centre seats if prioritising privacy",
        ],
        tips: [
          "Qatar Airways QSuites on the A350-1000 are the current gold standard for business class.",
          "QSuites can be joined to form a double bed for couples — centre pairs (D/G) work for this.",
          "1-2-1 direct aisle access means every seat is good, but window seats are most private.",
          "Rows 11-14 are quietest and furthest from galley traffic.",
        ],
        notes:
          "Business class on the A350-1000 is where this aircraft truly shines. Qatar Airways QSuites are the benchmark product.",
      },
      economy_plus: {
        overallRating: 4,
        comfortRating: 4,
        valueRating: 5,
        bestSeats: ["Exit row 38A/38K", "Bulkhead 35A/35K"],
        avoidSeats: [
          "Centre block middle seats",
          "Rows adjacent to lavatories",
          "Row before exit row",
        ],
        tips: [
          "Economy Plus pitch on the A350-1000 is typically 35-38 inches — genuinely comfortable.",
          "The stretched cabin means more exit rows — check the seatmap for your specific flight.",
          "Window seats are worth it for the A350's large, dimming windows.",
        ],
        notes:
          "Economy Plus on the A350-1000 is a worthwhile investment for ultra-long-haul segments exceeding 10 hours.",
      },
      economy: {
        overallRating: 3,
        comfortRating: 4,
        valueRating: 5,
        bestSeats: ["30A", "30K", "Rows 28-38 A/K"],
        avoidSeats: [
          "Last 5 rows",
          "Centre middle seats (D/E)",
          "Seats adjacent to rear galley complex",
          "Row before exit rows",
        ],
        tips: [
          "3-3-3 layout — the window/aisle dichotomy applies as on any widebody.",
          "Mid-cabin rows are the best balance of access and noise reduction.",
          "The A350's cabin pressure and humidity are among the best in class — you'll arrive healthier.",
          "Choose window for sleep on overnight segments (something to lean against).",
        ],
        notes:
          "Economy on the A350-1000 is genuinely comfortable by aircraft standards. The cabin technology makes the class difference less harsh than on older jets.",
      },
    },
  },
];

export const getAircraftById = (id: string): Aircraft | undefined =>
  AIRCRAFT_DATA.find((a) => a.id === id);

export const searchAircraft = (query: string): Aircraft[] => {
  const q = query.toLowerCase().trim();
  if (!q) return AIRCRAFT_DATA;
  return AIRCRAFT_DATA.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.manufacturer.toLowerCase().includes(q) ||
      a.type.toLowerCase().includes(q) ||
      a.popularRoutes.some((r) => r.toLowerCase().includes(q))
  );
};

export const CLASS_LABELS: Record<SeatClass, string> = {
  first: "First",
  business: "Business",
  economy_plus: "Economy+",
  economy: "Economy",
};

export const CLASS_DESCRIPTIONS: Record<SeatClass, string> = {
  first: "Private suites, unmatched service",
  business: "Lie-flat beds, premium dining",
  economy_plus: "Extra legroom, more comfort",
  economy: "Standard travel",
};
