import { MusicCollection } from "@/types/index";

export const musicCollections: MusicCollection[] = [
    // Fitness Category
  {
       //Collection 1
    id: "High-Intensity Workout",
    title: "High Intensity Workout",
    description: "Energetic beats to fuel your intense workout sessions",
    youtubePlaylistId: "PLevZf2LIlmDdIL6OOS3CpZqCv95eMebnH",
    category: "Fitness",
    coverImage: "/images/high-intensity.webp",
    trackCount: 15,
    duration: "1h 10m",
  },
  {
      //Collection 2
    id: "Cardio Boost",
    title: "Cardio Boost",
    description: "Upbeat tracks to keep you moving during cardio",
    youtubePlaylistId: "PLevZf2LIlmDc7iipen-yfxiIKDs9zeMOR",
    category: "Fitness",
    coverImage: "/images/cardio-boost.webp",
    trackCount: 1,
    duration: "2m 15s",
    featured: true
  },
  {
      //Collection 3
    id: "Strength Training",
    title: "Strength Training",
    description: "Powerful rhythms for your strength and resistance workouts",
    youtubePlaylistId: "PLevZf2LIlmDez7rvzJHQRMpC7a4BXFqFJ",
    category: "Fitness",
    coverImage: "/images/strength-training.jpg",
    trackCount: 20,
    duration: "1h 30m",
  },

    // Wellness Category
  {
      //Collection 1
    id: "Meditation Bliss",
    title: "Meditation Bliss",
    description: "Serene sounds for deep meditation and relaxation",
    youtubePlaylistId: "PLevZf2LIlmDeWDzjuesyf3fsTLcvBgTwH",
    category: "Wellness",
    coverImage: "/images/meditation-bliss.webp",
    trackCount: 20,
    duration: "1h 30m"
  },
  {
      //Collection 2
    id: "Yoga Flow",
    title: "Yoga Flow",
    description: "Calming melodies to accompany your yoga practice",
    youtubePlaylistId: "PLevZf2LIlmDeowBceiByOK6wCGPzJ4Br6",
    category: "Wellness",
    coverImage: "/images/yoga-flow.jpg",
    trackCount: 20,
    duration: "1h 30m",
    featured: true
  },
    // Productivity Category
  {
      //Collection 1
    id: "Focus Zone",
    title: "Focus Zone",
    description: "Concentration-enhancing tracks for deep work sessions",
    youtubePlaylistId: "PLevZf2LIlmDdLgd_8v86mcG6ecARBQEAn",
    category: "Productivity",
    coverImage: "/images/focus-zone.webp",
    trackCount: 20,
    duration: "1h 30m"
  },
    // Sleep and Relaxation Category
  {
      //Collection 1
    id: "Sleep Sounds",
    title: "Sleep Sounds",
    description: "Soothing melodies to help you fall asleep",
    youtubePlaylistId: "PLevZf2LIlmDcJ1EHXTMFVbtgwB3q6TvCo",
    category: "Sleep and Relaxation",
    coverImage: "/images/sleep-sounds.jpg",
    trackCount: 20,
    duration: "1h 30m"
  },
    // Ambient and Background Category
  {
      //Collection 1
    id: "Ambient Work",
    title: "Ambient Work",
    description: "Subtle background sounds for a productive work environment",
    youtubePlaylistId: "PLevZf2LIlmDeMphiWxCnjotPTXrEElmrl",
    category: "Ambient and Background",
    coverImage: "/images/ambient-work.webp",
    trackCount: 2,
    duration: "4m 30s",
    featured: true
  },
  {
    id: "Peaceful Sounds",
    title: "Peaceful Sounds",
    description: "A collection of calming sounds for meditation and relaxation",
    youtubePlaylistId: "PLevZf2LIlmDdNLGoNmtIJn2a0xiH_0kSL",
    category: "Ambient and Background",
    coverImage: "/images/peaceful-sounds.avif",
    trackCount: 20,
    duration: "1h 30m",
  },
];