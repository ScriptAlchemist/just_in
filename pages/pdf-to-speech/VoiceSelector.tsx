/**
 * VoiceSelector Component
 *
 * Demonstrates integration of the Apple Voice Database with the PDF to Speech tool.
 * This component provides an enhanced voice selection interface with quality indicators,
 * platform compatibility information, and accessibility features.
 */

import React, { useState, useEffect } from "react";
import {
  APPLE_VOICES,
  getWebCompatibleVoices,
  getAccessibilityRecommendedVoices,
  matchBrowserVoice,
  getVoiceDisplayName,
  getVoicesGroupedByLanguage,
  VoiceData,
} from "../../lib/voices-database";

interface VoiceSelectorProps {
  selectedVoice: SpeechSynthesisVoice | null;
  onVoiceChange: (voice: SpeechSynthesisVoice) => void;
  filterLanguage?: string; // e.g., "en-US" or "en-" for all English
}

interface EnrichedVoice {
  browserVoice: SpeechSynthesisVoice;
  dbVoice: VoiceData | undefined;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedVoice,
  onVoiceChange,
  filterLanguage = "en-",
}) => {
  const [enrichedVoices, setEnrichedVoices] = useState<EnrichedVoice[]>(
    [],
  );
  const [showAllQualities, setShowAllQualities] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [groupByLanguage, setGroupByLanguage] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const browserVoices = window.speechSynthesis.getVoices();

      // Match browser voices with our database
      const matched: EnrichedVoice[] = browserVoices
        .map((bv) => ({
          browserVoice: bv,
          dbVoice: matchBrowserVoice(bv),
        }))
        .filter((v) => {
          // Filter by language if specified
          if (filterLanguage) {
            return v.browserVoice.lang.startsWith(filterLanguage);
          }
          return true;
        })
        .filter((v) => {
          // Only show web-compatible voices
          return !v.dbVoice || v.dbVoice.supportsWeb;
        });

      // Sort by quality (Premium → Enhanced → Default) and then by name
      matched.sort((a, b) => {
        const qualityOrder = { Premium: 0, Enhanced: 1, Default: 2 };
        const aQuality = a.dbVoice?.quality || "Default";
        const bQuality = b.dbVoice?.quality || "Default";

        if (aQuality !== bQuality) {
          return qualityOrder[aQuality] - qualityOrder[bQuality];
        }

        return a.browserVoice.name.localeCompare(b.browserVoice.name);
      });

      setEnrichedVoices(matched);

      // Auto-select best voice if none selected
      if (!selectedVoice && matched.length > 0) {
        const recommended = matched.find(
          (v) =>
            v.dbVoice?.quality === "Premium" ||
            v.dbVoice?.quality === "Enhanced",
        );
        onVoiceChange((recommended || matched[0]).browserVoice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [filterLanguage, selectedVoice, onVoiceChange]);

  const getQualityBadge = (quality?: string) => {
    switch (quality) {
      case "Premium":
        return (
          <span className="ml-2 inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
            ⭐ Premium
          </span>
        );
      case "Enhanced":
        return (
          <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
            ✨ Enhanced
          </span>
        );
      case "Default":
        return (
          <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
            🔵 Default
          </span>
        );
      default:
        return null;
    }
  };

  const getDownloadIndicator = (voice: EnrichedVoice) => {
    if (!voice.dbVoice) return null;

    if (
      voice.dbVoice.quality === "Premium" ||
      voice.dbVoice.quality === "Enhanced"
    ) {
      return (
        <span
          className="ml-2 text-xs text-gray-500"
          title="This voice may need to be downloaded in System Settings"
        >
          📥
        </span>
      );
    }
    return null;
  };

  const filteredVoices = showAllQualities
    ? enrichedVoices
    : enrichedVoices.filter(
        (v) => !v.dbVoice || v.dbVoice.quality !== "Default",
      );

  const groupedVoices = groupByLanguage
    ? enrichedVoices.reduce(
        (acc, voice) => {
          const lang =
            voice.dbVoice?.language || voice.browserVoice.lang;
          if (!acc[lang]) acc[lang] = [];
          acc[lang].push(voice);
          return acc;
        },
        {} as Record<string, EnrichedVoice[]>,
      )
    : null;

  return (
    <div className="space-y-4">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Voice Selection
        </label>
        <div className="flex items-center space-x-4 text-sm">
          <button
            onClick={() => setShowAllQualities(!showAllQualities)}
            className="text-blue-600 hover:text-blue-800"
          >
            {showAllQualities ? "Hide" : "Show"} Default Quality
          </button>
          <button
            onClick={() => setGroupByLanguage(!groupByLanguage)}
            className="text-blue-600 hover:text-blue-800"
          >
            {groupByLanguage ? "Ungroup" : "Group by Language"}
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 hover:text-blue-800"
          >
            {showDetails ? "Hide" : "Show"} Details
          </button>
        </div>
      </div>

      {/* Voice selector */}
      {groupedVoices ? (
        // Grouped view
        <div className="space-y-4">
          {Object.entries(groupedVoices).map(([language, voices]) => (
            <div key={language}>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {language}
              </h3>
              <div className="space-y-1">
                {voices.map((voice) => (
                  <VoiceOption
                    key={voice.browserVoice.voiceURI}
                    voice={voice}
                    isSelected={
                      selectedVoice?.voiceURI ===
                      voice.browserVoice.voiceURI
                    }
                    onSelect={onVoiceChange}
                    showDetails={showDetails}
                    getQualityBadge={getQualityBadge}
                    getDownloadIndicator={getDownloadIndicator}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Regular dropdown view
        <select
          value={selectedVoice?.voiceURI || ""}
          onChange={(e) => {
            const voice = enrichedVoices.find(
              (v) => v.browserVoice.voiceURI === e.target.value,
            );
            if (voice) {
              onVoiceChange(voice.browserVoice);
            }
          }}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {filteredVoices.map((voice) => (
            <option
              key={voice.browserVoice.voiceURI}
              value={voice.browserVoice.voiceURI}
            >
              {voice.dbVoice
                ? getVoiceDisplayName(voice.dbVoice)
                : `${voice.browserVoice.name} (${voice.browserVoice.lang})`}
            </option>
          ))}
        </select>
      )}

      {/* Selected voice info */}
      {showDetails && selectedVoice && (
        <VoiceDetails
          voice={enrichedVoices.find(
            (v) => v.browserVoice.voiceURI === selectedVoice.voiceURI,
          )}
        />
      )}

      {/* Quality legend */}
      <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-600">
        <p className="font-semibold mb-2">Voice Quality Levels:</p>
        <ul className="space-y-1">
          <li className="flex items-center">
            <span className="mr-2">⭐</span>
            <strong>Premium:</strong> Highest quality, most natural
            (200-400 MB)
          </li>
          <li className="flex items-center">
            <span className="mr-2">✨</span>
            <strong>Enhanced:</strong> High quality, clear speech
            (100-200 MB)
          </li>
          <li className="flex items-center">
            <span className="mr-2">🔵</span>
            <strong>Default:</strong> Good quality, pre-installed (20-50
            MB)
          </li>
        </ul>
        <p className="mt-2 text-gray-500">
          📥 = May require download in System Settings → Accessibility →
          Spoken Content
        </p>
      </div>
    </div>
  );
};

// Sub-component for individual voice option
interface VoiceOptionProps {
  voice: EnrichedVoice;
  isSelected: boolean;
  onSelect: (voice: SpeechSynthesisVoice) => void;
  showDetails: boolean;
  getQualityBadge: (quality?: string) => React.ReactNode;
  getDownloadIndicator: (voice: EnrichedVoice) => React.ReactNode;
}

const VoiceOption: React.FC<VoiceOptionProps> = ({
  voice,
  isSelected,
  onSelect,
  showDetails,
  getQualityBadge,
  getDownloadIndicator,
}) => {
  return (
    <button
      onClick={() => onSelect(voice.browserVoice)}
      className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-medium text-gray-900">
            {voice.browserVoice.name}
          </span>
          {getQualityBadge(voice.dbVoice?.quality)}
          {getDownloadIndicator(voice)}
        </div>
        {voice.dbVoice?.gender && (
          <span className="text-xs text-gray-500">
            {voice.dbVoice.gender}
          </span>
        )}
      </div>
      {showDetails && voice.dbVoice && (
        <div className="mt-2 text-xs text-gray-600 space-y-1">
          <p>Language: {voice.dbVoice.language}</p>
          {voice.dbVoice.description && (
            <p>Type: {voice.dbVoice.description}</p>
          )}
          <p className="font-mono text-xs truncate">
            ID: {voice.dbVoice.identifier}
          </p>
        </div>
      )}
    </button>
  );
};

// Voice details component
interface VoiceDetailsProps {
  voice?: EnrichedVoice;
}

const VoiceDetails: React.FC<VoiceDetailsProps> = ({ voice }) => {
  if (!voice) return null;

  return (
    <div className="rounded-md border border-gray-200 bg-white p-4 space-y-3">
      <h4 className="font-semibold text-gray-900">
        Selected Voice Details
      </h4>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-500">Name:</span>
          <p className="font-medium">{voice.browserVoice.name}</p>
        </div>

        <div>
          <span className="text-gray-500">Language:</span>
          <p className="font-medium">{voice.browserVoice.lang}</p>
        </div>

        {voice.dbVoice && (
          <>
            <div>
              <span className="text-gray-500">Quality:</span>
              <p className="font-medium">{voice.dbVoice.quality}</p>
            </div>

            {voice.dbVoice.gender && (
              <div>
                <span className="text-gray-500">Gender:</span>
                <p className="font-medium">{voice.dbVoice.gender}</p>
              </div>
            )}

            <div className="col-span-2">
              <span className="text-gray-500">Platform Support:</span>
              <div className="flex space-x-2 mt-1">
                {voice.dbVoice.supportsIOS && (
                  <span className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-xs">
                    📱 iOS
                  </span>
                )}
                {voice.dbVoice.supportsMacOS && (
                  <span className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-xs">
                    💻 macOS
                  </span>
                )}
                {voice.dbVoice.supportsWeb && (
                  <span className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-xs">
                    🌐 Web
                  </span>
                )}
              </div>
            </div>

            {voice.dbVoice.description && (
              <div className="col-span-2">
                <span className="text-gray-500">Description:</span>
                <p className="font-medium">
                  {voice.dbVoice.description}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {voice.dbVoice &&
        (voice.dbVoice.quality === "Premium" ||
          voice.dbVoice.quality === "Enhanced") && (
          <div className="mt-3 rounded bg-blue-50 p-3 text-xs text-blue-800">
            <p className="font-semibold mb-1">📥 Download Required</p>
            <p>
              This voice may need to be downloaded on your device:
              <br />
              <strong>iOS:</strong> Settings → Accessibility → Spoken
              Content → Voices
              <br />
              <strong>macOS:</strong> System Settings → Accessibility →
              Spoken Content
            </p>
          </div>
        )}
    </div>
  );
};

export default VoiceSelector;
