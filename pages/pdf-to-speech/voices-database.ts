/**
 * Comprehensive Apple Text-to-Speech Voice Database
 *
 * This database contains all available Apple TTS voices organized by quality level:
 * - Default (Compact): Lower quality, smaller file size, pre-installed
 * - Enhanced: Higher quality, requires download
 * - Premium: Highest quality, requires download, most natural sounding
 *
 * Sources:
 * - Apple AVSpeechSynthesis Documentation
 * - iOS/macOS System Voices
 * - Web Speech API compatibility
 */

export interface VoiceData {
  language: string;
  languageCode: string;
  name: string;
  quality: "Default" | "Enhanced" | "Premium";
  identifier: string;
  voiceClass: string;
  gender?: "Male" | "Female";
  description?: string;
  supportsIOS: boolean;
  supportsMacOS: boolean;
  supportsWeb: boolean;
}

export const APPLE_VOICES: VoiceData[] = [
  // ===== ARABIC =====
  {
    language: "Arabic (Saudi Arabia)",
    languageCode: "ar-SA",
    name: "Maged",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Maged-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Arabic (Saudi Arabia)",
    languageCode: "ar-SA",
    name: "Maged",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Maged-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== CZECH =====
  {
    language: "Czech (Czech Republic)",
    languageCode: "cs-CZ",
    name: "Zuzana",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Zuzana-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Czech (Czech Republic)",
    languageCode: "cs-CZ",
    name: "Zuzana",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Zuzana-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== DANISH =====
  {
    language: "Danish (Denmark)",
    languageCode: "da-DK",
    name: "Sara",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Sara-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Danish (Denmark)",
    languageCode: "da-DK",
    name: "Sara",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Sara-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== GERMAN =====
  {
    language: "German (Germany)",
    languageCode: "de-DE",
    name: "Anna",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Anna-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "German (Germany)",
    languageCode: "de-DE",
    name: "Anna",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Anna-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "German (Germany)",
    languageCode: "de-DE",
    name: "Helena",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_female_de-DE_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "German (Germany)",
    languageCode: "de-DE",
    name: "Helena",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_female_de-DE_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "German (Germany)",
    languageCode: "de-DE",
    name: "Martin",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_male_de-DE_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "German (Germany)",
    languageCode: "de-DE",
    name: "Martin",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_male_de-DE_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== GREEK =====
  {
    language: "Greek (Greece)",
    languageCode: "el-GR",
    name: "Melina",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Melina-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Greek (Greece)",
    languageCode: "el-GR",
    name: "Melina",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Melina-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== ENGLISH (AUSTRALIA) =====
  {
    language: "English (Australia)",
    languageCode: "en-AU",
    name: "Catherine",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_female_en-AU_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (Australia)",
    languageCode: "en-AU",
    name: "Catherine",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_female_en-AU_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "English (Australia)",
    languageCode: "en-AU",
    name: "Gordon",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_male_en-AU_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (Australia)",
    languageCode: "en-AU",
    name: "Gordon",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_male_en-AU_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "English (Australia)",
    languageCode: "en-AU",
    name: "Karen",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Karen-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (Australia)",
    languageCode: "en-AU",
    name: "Karen",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Karen-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== ENGLISH (UK) =====
  {
    language: "English (United Kingdom)",
    languageCode: "en-GB",
    name: "Arthur",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_male_en-GB_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (United Kingdom)",
    languageCode: "en-GB",
    name: "Arthur",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_male_en-GB_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "English (United Kingdom)",
    languageCode: "en-GB",
    name: "Daniel",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Daniel-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (United Kingdom)",
    languageCode: "en-GB",
    name: "Daniel",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Daniel-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "English (United Kingdom)",
    languageCode: "en-GB",
    name: "Martha",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_female_en-GB_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (United Kingdom)",
    languageCode: "en-GB",
    name: "Martha",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_female_en-GB_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== ENGLISH (IRELAND) =====
  {
    language: "English (Ireland)",
    languageCode: "en-IE",
    name: "Moira",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Moira-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (Ireland)",
    languageCode: "en-IE",
    name: "Moira",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Moira-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== ENGLISH (INDIA) =====
  {
    language: "English (India)",
    languageCode: "en-IN",
    name: "Rishi",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Rishi-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (India)",
    languageCode: "en-IN",
    name: "Rishi",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Rishi-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== ENGLISH (USA) =====
  {
    language: "English (United States)",
    languageCode: "en-US",
    name: "Aaron",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_male_en-US_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (United States)",
    languageCode: "en-US",
    name: "Aaron",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_male_en-US_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "English (United States)",
    languageCode: "en-US",
    name: "Fred",
    quality: "Default",
    identifier: "com.apple.speech.synthesis.voice.Fred",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Classic macOS Voice",
    supportsIOS: false,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (United States)",
    languageCode: "en-US",
    name: "Nicky",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_female_en-US_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (United States)",
    languageCode: "en-US",
    name: "Nicky",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_female_en-US_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "English (United States)",
    languageCode: "en-US",
    name: "Samantha",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Samantha-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (United States)",
    languageCode: "en-US",
    name: "Samantha",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Samantha-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== ENGLISH (SOUTH AFRICA) =====
  {
    language: "English (South Africa)",
    languageCode: "en-ZA",
    name: "Tessa",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Tessa-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "English (South Africa)",
    languageCode: "en-ZA",
    name: "Tessa",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Tessa-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== SPANISH (SPAIN) =====
  {
    language: "Spanish (Spain)",
    languageCode: "es-ES",
    name: "Mónica",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Monica-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Spanish (Spain)",
    languageCode: "es-ES",
    name: "Mónica",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Monica-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== SPANISH (MEXICO) =====
  {
    language: "Spanish (Mexico)",
    languageCode: "es-MX",
    name: "Paulina",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Paulina-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Spanish (Mexico)",
    languageCode: "es-MX",
    name: "Paulina",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Paulina-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== FINNISH =====
  {
    language: "Finnish (Finland)",
    languageCode: "fi-FI",
    name: "Satu",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Satu-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Finnish (Finland)",
    languageCode: "fi-FI",
    name: "Satu",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Satu-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== FRENCH (CANADA) =====
  {
    language: "French (Canada)",
    languageCode: "fr-CA",
    name: "Amélie",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Amelie-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "French (Canada)",
    languageCode: "fr-CA",
    name: "Amélie",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Amelie-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== FRENCH (FRANCE) =====
  {
    language: "French (France)",
    languageCode: "fr-FR",
    name: "Daniel",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_male_fr-FR_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "French (France)",
    languageCode: "fr-FR",
    name: "Daniel",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_male_fr-FR_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "French (France)",
    languageCode: "fr-FR",
    name: "Marie",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_female_fr-FR_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "French (France)",
    languageCode: "fr-FR",
    name: "Marie",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_female_fr-FR_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "French (France)",
    languageCode: "fr-FR",
    name: "Thomas",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Thomas-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "French (France)",
    languageCode: "fr-FR",
    name: "Thomas",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Thomas-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== HEBREW =====
  {
    language: "Hebrew (Israel)",
    languageCode: "he-IL",
    name: "Carmit",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Carmit-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Hebrew (Israel)",
    languageCode: "he-IL",
    name: "Carmit",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Carmit-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== HINDI =====
  {
    language: "Hindi (India)",
    languageCode: "hi-IN",
    name: "Lekha",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Lekha-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Hindi (India)",
    languageCode: "hi-IN",
    name: "Lekha",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Lekha-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== HUNGARIAN =====
  {
    language: "Hungarian (Hungary)",
    languageCode: "hu-HU",
    name: "Mariska",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Mariska-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Hungarian (Hungary)",
    languageCode: "hu-HU",
    name: "Mariska",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Mariska-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== INDONESIAN =====
  {
    language: "Indonesian (Indonesia)",
    languageCode: "id-ID",
    name: "Damayanti",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Damayanti-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Indonesian (Indonesia)",
    languageCode: "id-ID",
    name: "Damayanti",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Damayanti-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== ITALIAN =====
  {
    language: "Italian (Italy)",
    languageCode: "it-IT",
    name: "Alice",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Alice-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Italian (Italy)",
    languageCode: "it-IT",
    name: "Alice",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Alice-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== JAPANESE =====
  {
    language: "Japanese (Japan)",
    languageCode: "ja-JP",
    name: "Hattori",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_male_ja-JP_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Japanese (Japan)",
    languageCode: "ja-JP",
    name: "Hattori",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_male_ja-JP_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "Japanese (Japan)",
    languageCode: "ja-JP",
    name: "Kyoko",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Kyoko-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Japanese (Japan)",
    languageCode: "ja-JP",
    name: "Kyoko",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Kyoko-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "Japanese (Japan)",
    languageCode: "ja-JP",
    name: "O-ren",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_female_ja-JP_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Japanese (Japan)",
    languageCode: "ja-JP",
    name: "O-ren",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_female_ja-JP_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== KOREAN =====
  {
    language: "Korean (South Korea)",
    languageCode: "ko-KR",
    name: "Yuna",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Yuna-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Korean (South Korea)",
    languageCode: "ko-KR",
    name: "Yuna",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Yuna-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== DUTCH (BELGIUM) =====
  {
    language: "Dutch (Belgium)",
    languageCode: "nl-BE",
    name: "Ellen",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Ellen-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Dutch (Belgium)",
    languageCode: "nl-BE",
    name: "Ellen",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Ellen-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== DUTCH (NETHERLANDS) =====
  {
    language: "Dutch (Netherlands)",
    languageCode: "nl-NL",
    name: "Xander",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Xander-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Dutch (Netherlands)",
    languageCode: "nl-NL",
    name: "Xander",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Xander-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== NORWEGIAN =====
  {
    language: "Norwegian (Norway)",
    languageCode: "no-NO",
    name: "Nora",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Nora-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Norwegian (Norway)",
    languageCode: "no-NO",
    name: "Nora",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Nora-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== POLISH =====
  {
    language: "Polish (Poland)",
    languageCode: "pl-PL",
    name: "Zosia",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Zosia-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Polish (Poland)",
    languageCode: "pl-PL",
    name: "Zosia",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Zosia-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== PORTUGUESE (BRAZIL) =====
  {
    language: "Portuguese (Brazil)",
    languageCode: "pt-BR",
    name: "Luciana",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Luciana-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Portuguese (Brazil)",
    languageCode: "pt-BR",
    name: "Luciana",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Luciana-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== PORTUGUESE (PORTUGAL) =====
  {
    language: "Portuguese (Portugal)",
    languageCode: "pt-PT",
    name: "Joana",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Joana-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Portuguese (Portugal)",
    languageCode: "pt-PT",
    name: "Joana",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Joana-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== ROMANIAN =====
  {
    language: "Romanian (Romania)",
    languageCode: "ro-RO",
    name: "Ioana",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Ioana-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Romanian (Romania)",
    languageCode: "ro-RO",
    name: "Ioana",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Ioana-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== RUSSIAN =====
  {
    language: "Russian (Russia)",
    languageCode: "ru-RU",
    name: "Milena",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Milena-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Russian (Russia)",
    languageCode: "ru-RU",
    name: "Milena",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Milena-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== SLOVAK =====
  {
    language: "Slovak (Slovakia)",
    languageCode: "sk-SK",
    name: "Laura",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Laura-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Slovak (Slovakia)",
    languageCode: "sk-SK",
    name: "Laura",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Laura-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== SWEDISH =====
  {
    language: "Swedish (Sweden)",
    languageCode: "sv-SE",
    name: "Alva",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Alva-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Swedish (Sweden)",
    languageCode: "sv-SE",
    name: "Alva",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Alva-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== THAI =====
  {
    language: "Thai (Thailand)",
    languageCode: "th-TH",
    name: "Kanya",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Kanya-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Thai (Thailand)",
    languageCode: "th-TH",
    name: "Kanya",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Kanya-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== TURKISH =====
  {
    language: "Turkish (Turkey)",
    languageCode: "tr-TR",
    name: "Yelda",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Yelda-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Turkish (Turkey)",
    languageCode: "tr-TR",
    name: "Yelda",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Yelda-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== CHINESE (CHINA) =====
  {
    language: "Chinese (China)",
    languageCode: "zh-CN",
    name: "Li-mu",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_male_zh-CN_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Chinese (China)",
    languageCode: "zh-CN",
    name: "Li-mu",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_male_zh-CN_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Male",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "Chinese (China)",
    languageCode: "zh-CN",
    name: "Tian-Tian",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Ting-Ting-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Chinese (China)",
    languageCode: "zh-CN",
    name: "Tian-Tian",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Ting-Ting-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },
  {
    language: "Chinese (China)",
    languageCode: "zh-CN",
    name: "Yu-shu",
    quality: "Default",
    identifier: "com.apple.ttsbundle.siri_female_zh-CN_compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Chinese (China)",
    languageCode: "zh-CN",
    name: "Yu-shu",
    quality: "Premium",
    identifier: "com.apple.ttsbundle.siri_female_zh-CN_premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    description: "Siri Voice - Premium Quality",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== CHINESE (HONG KONG) =====
  {
    language: "Chinese (Hong Kong)",
    languageCode: "zh-HK",
    name: "Sin-Ji",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Sin-Ji-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Chinese (Hong Kong)",
    languageCode: "zh-HK",
    name: "Sin-Ji",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Sin-Ji-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== CHINESE (TAIWAN) =====
  {
    language: "Chinese (Taiwan)",
    languageCode: "zh-TW",
    name: "Mei-Jia",
    quality: "Default",
    identifier: "com.apple.ttsbundle.Mei-Jia-compact",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: true,
  },
  {
    language: "Chinese (Taiwan)",
    languageCode: "zh-TW",
    name: "Mei-Jia",
    quality: "Enhanced",
    identifier: "com.apple.ttsbundle.Mei-Jia-premium",
    voiceClass: "AVSpeechSynthesisVoice",
    gender: "Female",
    supportsIOS: true,
    supportsMacOS: true,
    supportsWeb: false,
  },

  // ===== SPECIAL VOICES =====
  {
    language: "English (United States)",
    languageCode: "en-US",
    name: "Alex",
    quality: "Enhanced",
    identifier: "com.apple.speech.voice.Alex",
    voiceClass: "AVAlexSpeechSynthesisVoice",
    gender: "Male",
    description: "Classic Enhanced macOS Voice",
    supportsIOS: false,
    supportsMacOS: true,
    supportsWeb: true,
  },
];

// ===== UTILITY FUNCTIONS =====

/**
 * Get all voices for a specific language code
 */
export const getVoicesByLanguage = (
  languageCode: string,
): VoiceData[] => {
  return APPLE_VOICES.filter(
    (voice) => voice.languageCode === languageCode,
  );
};

/**
 * Get all voices of a specific quality level
 */
export const getVoicesByQuality = (
  quality: "Default" | "Enhanced" | "Premium",
): VoiceData[] => {
  return APPLE_VOICES.filter((voice) => voice.quality === quality);
};

/**
 * Get all English voices (any variant)
 */
export const getEnglishVoices = (): VoiceData[] => {
  return APPLE_VOICES.filter((voice) =>
    voice.languageCode.startsWith("en-"),
  );
};

/**
 * Get all US English voices
 */
export const getUSEnglishVoices = (): VoiceData[] => {
  return APPLE_VOICES.filter((voice) => voice.languageCode === "en-US");
};

/**
 * Get all Siri voices
 */
export const getSiriVoices = (): VoiceData[] => {
  return APPLE_VOICES.filter((voice) =>
    voice.description?.includes("Siri"),
  );
};

/**
 * Get all Premium quality voices
 */
export const getPremiumVoices = (): VoiceData[] => {
  return APPLE_VOICES.filter((voice) => voice.quality === "Premium");
};

/**
 * Get all Enhanced quality voices
 */
export const getEnhancedVoices = (): VoiceData[] => {
  return APPLE_VOICES.filter((voice) => voice.quality === "Enhanced");
};

/**
 * Get voices that work on iOS
 */
export const getIOSCompatibleVoices = (): VoiceData[] => {
  return APPLE_VOICES.filter((voice) => voice.supportsIOS);
};

/**
 * Get voices that work on macOS
 */
export const getMacOSCompatibleVoices = (): VoiceData[] => {
  return APPLE_VOICES.filter((voice) => voice.supportsMacOS);
};

/**
 * Get voices that work with Web Speech API
 */
export const getWebCompatibleVoices = (): VoiceData[] => {
  return APPLE_VOICES.filter((voice) => voice.supportsWeb);
};

/**
 * Find a voice by name
 */
export const getVoiceByName = (name: string): VoiceData | undefined => {
  return APPLE_VOICES.find((voice) => voice.name === name);
};

/**
 * Find a voice by identifier
 */
export const getVoiceByIdentifier = (
  identifier: string,
): VoiceData | undefined => {
  return APPLE_VOICES.find((voice) => voice.identifier === identifier);
};

/**
 * Get all available language codes
 */
export const getAvailableLanguages = (): string[] => {
  const languages = new Set(
    APPLE_VOICES.map((voice) => voice.languageCode),
  );
  return Array.from(languages).sort();
};

/**
 * Get all available voice names
 */
export const getAvailableVoiceNames = (): string[] => {
  const names = new Set(APPLE_VOICES.map((voice) => voice.name));
  return Array.from(names).sort();
};

/**
 * Match browser voice with our database
 * This helps identify which quality level a browser-provided voice has
 */
export const matchBrowserVoice = (
  browserVoice: SpeechSynthesisVoice,
): VoiceData | undefined => {
  // Try to match by voice URI/identifier first
  let match = APPLE_VOICES.find(
    (voice) =>
      browserVoice.voiceURI?.includes(voice.identifier) ||
      voice.identifier.includes(browserVoice.voiceURI),
  );

  if (match) return match;

  // Try to match by name and language
  match = APPLE_VOICES.find(
    (voice) =>
      voice.name === browserVoice.name &&
      voice.languageCode === browserVoice.lang,
  );

  if (match) return match;

  // Try fuzzy match by name only
  return APPLE_VOICES.find((voice) => voice.name === browserVoice.name);
};

/**
 * Get recommended voices for accessibility (high quality, clear speech)
 */
export const getAccessibilityRecommendedVoices = (): VoiceData[] => {
  // Prefer Siri voices and Enhanced/Premium quality
  return APPLE_VOICES.filter(
    (voice) =>
      (voice.quality === "Enhanced" || voice.quality === "Premium") &&
      voice.supportsWeb,
  );
};

/**
 * Group voices by language for easier selection
 */
export const getVoicesGroupedByLanguage = (): Record<
  string,
  VoiceData[]
> => {
  const grouped: Record<string, VoiceData[]> = {};

  APPLE_VOICES.forEach((voice) => {
    if (!grouped[voice.language]) {
      grouped[voice.language] = [];
    }
    grouped[voice.language].push(voice);
  });

  return grouped;
};

/**
 * Get voice display name with quality indicator
 */
export const getVoiceDisplayName = (voice: VoiceData): string => {
  const qualityBadge =
    voice.quality === "Premium"
      ? " ⭐"
      : voice.quality === "Enhanced"
        ? " ✨"
        : "";
  const genderInfo = voice.gender ? ` (${voice.gender})` : "";
  return `${voice.name}${qualityBadge}${genderInfo} - ${voice.language}`;
};
