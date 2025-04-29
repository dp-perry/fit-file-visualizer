export interface FileIdMesg {
  serialNumber: number;
  timeCreated: string;
  manufacturer: string;
  product: number;
  type: string;
  garminProduct: string;
}

export interface FileCreatorMesg {
  softwareVersion: number;
}

export interface ActivityMesg {
  timestamp: string;
  totalTimerTime: number;
  localTimestamp: number;
  numSessions: number;
  type: string;
  event: string;
  eventType: string;
}

// Seems to show up if the Stryd device is connected to the watch
export interface FieldDescriptionMesgs {
  fieldName: string;
  units: string;
  nativeMesgNum: number;
  developerDataIndex: number;
  fieldDefinitionNumber: number;
  fitBaseTypeId: number;
  key: number; // Index in the array
}

// Contains information about the session, such as start time, distance, etc.
export interface SessionMesg {
  timestamp: string;
  startTime: string;
  startPositionLat: number;
  startPositionLong: number;
  totalElapsedTime: number;
  totalTimerTime: number;
  totalDistance: number;
  necLat: number;
  necLong: number;
  swcLat: number;
  swcLong: number;
  endPositionLat: number;
  endPositionLong: number;
  totalWork: number;
  sportProfileName: string;
  enhancedAvgSpeed: number;
  enhancedMaxSpeed: number;
  trainingLoadPeak: number;
  totalGrit: number;
  avgFlow: number;
  messageIndex: number;
  totalCalories: number;
  avgPower: number;
  maxPower: number;
  totalAscent: number;
  totalDescent: number;
  firstLapIndex: number;
  numLaps: number;
  normalizedPower: number;
  event: string;
  eventType: string;
  sport: string;
  subSport: string;
  avgHeartRate: number;
  maxHeartRate: number;
  totalTrainingEffect: number;
  trigger: string;
  totalAnaerobicTrainingEffect: number;
  totalFractionalAscent: number;
  totalFractionalDescent: number;
}

export interface TimeInZoneMesg {
  timestamp: string;
  timeInHrZone: number[];
  timeInPowerZone: number[];
  powerZoneHighBoundary: number[];
  referenceMesg: string;
  referenceIndex: number;
  functionalThresholdPower: number;
  hrZoneHighBoundary: number[];
  hrCalcType: string;
}

export interface LapMesg {
  timestamp: string;
  startTime: string;
  startPositionLat: number;
  startPositionLong: number;
  endPositionLat: number;
  endPositionLong: number;
  totalElapsedTime: number;
  totalTimerTime: number;
  totalDistance: number;
  totalCycles: number
  totalWork: number;
  enhancedAvgSpeed: number;
  enhancedMaxSpeed: number;
  enhancedMinAltitude: number;
  enhancedMaxAltitude: number;
  totalGrit: number | null;
  avgFlow: number | null;
  messageIndex: number;
  totalCalories: number;
  avgPower: number;
  maxPower: number;
  totalAscent: number;
  totalDescent: number;
  event: string;
  eventType: string;
  avgHeartRate: number;
  maxHeartRate: number;
  avgCadence: number;
  maxCadence: number;
  intensity: string;
  lapTrigger: string;
  sport: string;
  subSport: string;
  avgFractionalCadence: number
  maxFractionalCadence: number
  totalFractionalAscent: number
  totalFractionalDescent: number
  totalStrides: number
  avgRunningCadence: number
  maxRunningCadence: number
}

export interface SplitMesg {
  totalElapsedTime: number;
  totalTimerTime: number;
  totalDistance: number;
  avgSpeed: number;
  startTime: string;
  startPositionLat: number;
  startPositionLong: number;
  endPositionLat: number;
  endPositionLong: number
  maxSpeed: number;
  avgVertSpeed: number;
  endTime: string;
  totalCalories: number;
  startElevation: number;
  messageIndex: number;
  totalAscent: number;
  totalDescent: number;
  splitType: string;
}

export interface SplitSummaryMesg {
  totalTimerTime: number;
  totalDistance: number;
  avgSpeed: number;
  maxSpeed: number;
  avgVertSpeed: number;
  totalCalories: number;
  messageIndex: number;
  numSplits: number;
  totalAscent: number;
  totalDescent: number;
  splitType: string
  avgHeartRate: number;
  maxHeartRate: number;
}

export interface EventMesg {
  timestamp: string;
  data: number[];
  event: string;
  eventType: string;
  eventGroup: number;
  timerTrigger: string;
}

// Returns the modules on the device, such as GPS, Battery, etc.
export interface DeviceInfoMesg {
  timestamp: string;
  serialNumber: number;
  manufacturer: string;
  product: number;
  softwareVersion: number;
  deviceIndex: string;
  sourceType: string;
  garminProduct: string;
}

export interface DeviceSettingsMesg {
  utcOffset: number;
  timeOffset: number;
  autoActivityDetect: number;
  autosyncMinSteps: number;
  autosyncMinTime: number;
  activeTimeZone: number;
  timeMode: number;
  timeZoneOffset: number;
  backlightMode: string;
  activityTrackerEnabled: number;
  moveAlertEnabled: number;
  dateMode: string;
  mountingSide: string;
  lactateThresholdAutodetectEnabled: number;
}

export interface UserProfileMesg {
  wakeTime: number;
  sleepTime: number;
  weight: number;
  gender: string;
  height: number;
  language: string;
  elevSetting: string;
  weightSetting: string;
  restingHeartRate: number;
  hrSetting: string;
  speedSetting: string;
  distSetting: string;
  activityClass: number;
  positionSetting: string;
  temperatureSetting: string;
  heightSetting: string;
  depthSetting: string;
}

export interface SportMesg {
  sport: string;
  subSport: string;
  name: string;
}

export interface TrainingSettingsMesg {
  targetDistance: number;
  targetSpeed: number;
}

export interface ZonesTargetMesg {
  functionalThresholdPower: number;
  thresholdHeartRate: number;
  hrCalcType: string;
  pwrCalcType: string;
}

// Contains most of the interesting data from the FIT file
export interface RecordMesg {
  timestamp: string;
  positionLat: number;
  positionLong: number;
  distance: number;
  enhancedSpeed: number;
  enhancedAltitude: number;
  power: number;
  cycleLength16: number
  cadence: number;
  activityType: string;
  fractionalCadence: number;
}

export interface GpsMetadataMesg {
  enhancedAltitude: number;
  enhancedSpeed: number;
}

// This would be the full set of message from the FIT file
// Only using a few in this app for simplicity
export interface FullFitMessages {
  fileIdMesgs: FileIdMesg[];
  fileCreatorMesgs: FileCreatorMesg[];
  activityMesgs: ActivityMesg[]
  FieldDescriptionMesgs?: FieldDescriptionMesgs[];
  sessionMesgs: SessionMesg[];
  timeInZoneMesgs: TimeInZoneMesg[];
  lapMesgs: LapMesg[];
  splitMesgs: SplitMesg[];
  splitSummaryMesgs: SplitSummaryMesg[];
  eventMesgs: EventMesg[];
  deviceInfoMesgs: DeviceInfoMesg[];
  deviceSettingsMesgs: DeviceSettingsMesg[];
  userProfileMesgs: UserProfileMesg[];
  sportMesgs: SportMesg[];
  trainingSettingsMesgs: TrainingSettingsMesg[];
  zonesTargetMesgs: ZonesTargetMesg[];
  recordMesgs: RecordMesg[]
  gpsMetadataMesgs: GpsMetadataMesg[]
}

export interface FitMessages {
  FieldDescriptionMesgs?: FieldDescriptionMesgs[];
  sessionMesgs: SessionMesg[];
  timeInZoneMesgs: TimeInZoneMesg[];
  splitMesgs: SplitMesg[];
  splitSummaryMesgs: SplitSummaryMesg[];
  userProfileMesgs: UserProfileMesg[];
  sportMesgs: SportMesg[];
  recordMesgs: RecordMesg[]
  gpsMetadataMesgs: GpsMetadataMesg[]
}

export interface FitParseResult {
  messages: FitMessages;
  errors: string[];
}