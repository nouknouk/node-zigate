module.exports = {
  "0": {
    "id": 0,
    "name": "genBasic",
    "specific": null,
    "attributes": {
      "0": { "cluster": 0, "id": 0, "name": "zclVersion", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 0, "id": 1, "name": "appVersion", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 0, "id": 2, "name": "stackVersion", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 0, "id": 3, "name": "hwVersion", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 0, "id": 4, "name": "manufacturerName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 0, "id": 5, "name": "modelId", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 0, "id": 6, "name": "dateCode", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "7": { "cluster": 0, "id": 7, "name": "powerSource", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "8": { "cluster": 0, "id": 8, "name": "appProfileVersion", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 0, "id": 16, "name": "locationDesc", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 0, "id": 17, "name": "physicalEnv", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 0, "id": 18, "name": "deviceEnabled", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 0, "id": 19, "name": "alarmMask", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "20": { "cluster": 0, "id": 20, "name": "disableLocalConfig", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16384": { "cluster": 0, "id": 16384, "name": "swBuildId", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "resetFactDefault" }
    },
    "responses": {}
  },
  "1": {
    "id": 1,
    "name": "genPowerCfg",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1, "id": 0, "name": "mainsVoltage", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 1, "id": 1, "name": "mainsFrequency", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 1, "id": 16, "name": "mainsAlarmMask", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1, "id": 17, "name": "mainsVoltMinThres", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 1, "id": 18, "name": "mainsVoltMaxThres", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 1, "id": 19, "name": "mainsVoltageDwellTripPoint", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "32": { "cluster": 1, "id": 32, "name": "batteryVoltage", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "33": { "cluster": 1, "id": 33, "name": "batteryPercentageRemaining", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "48": { "cluster": 1, "id": 48, "name": "batteryManufacturer", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "49": { "cluster": 1, "id": 49, "name": "batterySize", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "50": { "cluster": 1, "id": 50, "name": "batteryAHrRating", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "51": { "cluster": 1, "id": 51, "name": "batteryQuantity", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "52": { "cluster": 1, "id": 52, "name": "batteryRatedVoltage", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "53": { "cluster": 1, "id": 53, "name": "batteryAlarmMask", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "54": { "cluster": 1, "id": 54, "name": "batteryVoltMinThres", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "55": { "cluster": 1, "id": 55, "name": "batteryVoltThres1", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "56": { "cluster": 1, "id": 56, "name": "batteryVoltThres2", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "57": { "cluster": 1, "id": 57, "name": "batteryVoltThres3", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "58": { "cluster": 1, "id": 58, "name": "batteryPercentMinThres", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "59": { "cluster": 1, "id": 59, "name": "batteryPercentThres1", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "60": { "cluster": 1, "id": 60, "name": "batteryPercentThres2", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "61": { "cluster": 1, "id": 61, "name": "batteryPercentThres3", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "62": { "cluster": 1, "id": 62, "name": "batteryAlarmState", "type": "bitmap32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "2": {
    "id": 2,
    "name": "genDeviceTempCfg",
    "specific": null,
    "attributes": {
      "0": { "cluster": 2, "id": 0, "name": "currentTemperature", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 2, "id": 1, "name": "minTempExperienced", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 2, "id": 2, "name": "maxTempExperienced", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 2, "id": 3, "name": "overTempTotalDwell", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 2, "id": 16, "name": "devTempAlarmMask", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 2, "id": 17, "name": "lowTempThres", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 2, "id": 18, "name": "highTempThres", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 2, "id": 19, "name": "lowTempDwellTripPoint", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "20": { "cluster": 2, "id": 20, "name": "highTempDwellTripPoint", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "3": {
    "id": 3,
    "name": "genIdentify",
    "specific": null,
    "attributes": {
      "0": { "cluster": 3, "id": 0, "name": "identifyTime", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 3, "id": 1, "name": "identifyCommissionState", "type": "unknown", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "identify" },
      "1": { "id": 1, "name": "identifyQuery" },
      "2": { "id": 2, "name": "ezmodeInvoke" },
      "3": { "id": 3, "name": "updateCommissionState" },
      "64": { "id": 64, "name": "triggerEffect" }
    },
    "responses": {
      "0": { "id": 0, "name": "identifyQueryRsp" }
    }
  },
  "4": {
    "id": 4,
    "name": "genGroups",
    "specific": null,
    "attributes": {
      "0": { "cluster": 4, "id": 0, "name": "nameSupport", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "add" },
      "1": { "id": 1, "name": "view" },
      "2": { "id": 2, "name": "getMembership" },
      "3": { "id": 3, "name": "remove" },
      "4": { "id": 4, "name": "removeAll" },
      "5": { "id": 5, "name": "addIfIdentifying" }
    },
    "responses": {
      "0": { "id": 0, "name": "addRsp" },
      "1": { "id": 1, "name": "viewRsp" },
      "2": { "id": 2, "name": "getMembershipRsp" },
      "3": { "id": 3, "name": "removeRsp" }
    }
  },
  "5": {
    "id": 5,
    "name": "genScenes",
    "specific": null,
    "attributes": {
      "0": { "cluster": 5, "id": 0, "name": "count", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 5, "id": 1, "name": "currentScene", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 5, "id": 2, "name": "currentGroup", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 5, "id": 3, "name": "sceneValid", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 5, "id": 4, "name": "nameSupport", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 5, "id": 5, "name": "lastCfgBy", "type": "ieeeAddr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "add" },
      "1": { "id": 1, "name": "view" },
      "2": { "id": 2, "name": "remove" },
      "3": { "id": 3, "name": "removeAll" },
      "4": { "id": 4, "name": "store" },
      "5": { "id": 5, "name": "recall" },
      "6": { "id": 6, "name": "getSceneMembership" },
      "64": { "id": 64, "name": "enhancedAdd" },
      "65": { "id": 65, "name": "enhancedView" },
      "66": { "id": 66, "name": "copy" }
    },
    "responses": {
      "0": { "id": 0, "name": "addRsp" },
      "1": { "id": 1, "name": "viewRsp" },
      "2": { "id": 2, "name": "removeRsp" },
      "3": { "id": 3, "name": "removeAllRsp" },
      "4": { "id": 4, "name": "storeRsp" },
      "6": { "id": 6, "name": "getSceneMembershipRsp" },
      "64": { "id": 64, "name": "enhancedAddRsp" },
      "65": { "id": 65, "name": "enhancedViewRsp" },
      "66": { "id": 66, "name": "copyRsp" }
    }
  },
  "6": {
    "id": 6,
    "name": "genOnOff",
    "specific": null,
    "attributes": {
      "0": { "cluster": 6, "id": 0, "name": "onOff", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16384": { "cluster": 6, "id": 16384, "name": "globalSceneCtrl", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16385": { "cluster": 6, "id": 16385, "name": "onTime", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16386": { "cluster": 6, "id": 16386, "name": "offWaitTime", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "off" },
      "1": { "id": 1, "name": "on" },
      "2": { "id": 2, "name": "toggle" },
      "64": { "id": 64, "name": "offWithEffect" },
      "65": { "id": 65, "name": "onWithRecallGlobalScene" },
      "66": { "id": 66, "name": "onWithTimedOff" }
    },
    "responses": {}
  },
  "7": {
    "id": 7,
    "name": "genOnOffSwitchCfg",
    "specific": null,
    "attributes": {
      "0": { "cluster": 7, "id": 0, "name": "switchType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 7, "id": 2, "name": "switchMultiFunction", "type": "unknown", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 7, "id": 16, "name": "switchActions", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "8": {
    "id": 8,
    "name": "genLevelCtrl",
    "specific": null,
    "attributes": {
      "0": { "cluster": 8, "id": 0, "name": "currentLevel", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 8, "id": 1, "name": "remainingTime", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 8, "id": 16, "name": "onOffTransitionTime", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 8, "id": 17, "name": "onLevel", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 8, "id": 18, "name": "onTransitionTime", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 8, "id": 19, "name": "offTransitionTime", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "20": { "cluster": 8, "id": 20, "name": "defaultMoveRate", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "moveToLevel" },
      "1": { "id": 1, "name": "move" },
      "2": { "id": 2, "name": "step" },
      "3": { "id": 3, "name": "stop" },
      "4": { "id": 4, "name": "moveToLevelWithOnOff" },
      "5": { "id": 5, "name": "moveWithOnOff" },
      "6": { "id": 6, "name": "stepWithOnOff" },
      "7": { "id": 7, "name": "stopWithOnOff" }
    },
    "responses": {}
  },
  "9": {
    "id": 9,
    "name": "genAlarms",
    "specific": null,
    "attributes": {
      "0": { "cluster": 9, "id": 0, "name": "alarmCount", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "reset" },
      "1": { "id": 1, "name": "resetAll" },
      "2": { "id": 2, "name": "getAlarm" },
      "3": { "id": 3, "name": "resetLog" },
      "4": { "id": 4, "name": "publishEventLog" }
    },
    "responses": {
      "0": { "id": 0, "name": "alarm" },
      "1": { "id": 1, "name": "getRsp" },
      "2": { "id": 2, "name": "getEventLog" }
    }
  },
  "10": {
    "id": 10,
    "name": "genTime",
    "specific": null,
    "attributes": {
      "0": { "cluster": 10, "id": 0, "name": "time", "type": "utc", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 10, "id": 1, "name": "timeStatus", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 10, "id": 2, "name": "timeZone", "type": "int32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 10, "id": 3, "name": "dstStart", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 10, "id": 4, "name": "dstEnd", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 10, "id": 5, "name": "dstShift", "type": "int32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 10, "id": 6, "name": "standardTime", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "7": { "cluster": 10, "id": 7, "name": "localTime", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "8": { "cluster": 10, "id": 8, "name": "lastSetTime", "type": "utc", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "9": { "cluster": 10, "id": 9, "name": "validUntilTime", "type": "utc", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "11": {
    "id": 11,
    "name": "genRssiLocation",
    "specific": null,
    "attributes": {
      "0": { "cluster": 11, "id": 0, "name": "type", "type": "data8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 11, "id": 1, "name": "method", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 11, "id": 2, "name": "age", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 11, "id": 3, "name": "qualityMeasure", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 11, "id": 4, "name": "numOfDevices", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 11, "id": 16, "name": "coordinate1", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 11, "id": 17, "name": "coordinate2", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 11, "id": 18, "name": "coordinate3", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 11, "id": 19, "name": "power", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "20": { "cluster": 11, "id": 20, "name": "pathLossExponent", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "21": { "cluster": 11, "id": 21, "name": "reportingPeriod", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "22": { "cluster": 11, "id": 22, "name": "calcPeriod", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "23": { "cluster": 11, "id": 23, "name": "numRSSIMeasurements", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "setAbsolute" },
      "1": { "id": 1, "name": "setDevCfg" },
      "2": { "id": 2, "name": "getDevCfg" },
      "3": { "id": 3, "name": "getData" }
    },
    "responses": {
      "0": { "id": 0, "name": "devCfgRsp" },
      "1": { "id": 1, "name": "dataRsp" },
      "2": { "id": 2, "name": "dataNotif" },
      "3": { "id": 3, "name": "compactDataNotif" },
      "4": { "id": 4, "name": "rssiPing" }
    }
  },
  "12": {
    "id": 12,
    "name": "genAnalogInput",
    "specific": null,
    "attributes": {
      "28": { "cluster": 12, "id": 28, "name": "description", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "65": { "cluster": 12, "id": 65, "name": "maxPresentValue", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "69": { "cluster": 12, "id": 69, "name": "minPresentValue", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "81": { "cluster": 12, "id": 81, "name": "outOfService", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "85": { "cluster": 12, "id": 85, "name": "presentValue", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "103": { "cluster": 12, "id": 103, "name": "reliability", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "106": { "cluster": 12, "id": 106, "name": "resolution", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "111": { "cluster": 12, "id": 111, "name": "statusFlags", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "117": { "cluster": 12, "id": 117, "name": "engineeringUnits", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "256": { "cluster": 12, "id": 256, "name": "applicationType", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "13": {
    "id": 13,
    "name": "genAnalogOutput",
    "specific": null,
    "attributes": {
      "28": { "cluster": 13, "id": 28, "name": "description", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "65": { "cluster": 13, "id": 65, "name": "maxPresentValue", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "69": { "cluster": 13, "id": 69, "name": "minPresentValue", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "81": { "cluster": 13, "id": 81, "name": "outOfService", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "85": { "cluster": 13, "id": 85, "name": "presentValue", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "87": { "cluster": 13, "id": 87, "name": "priorityArray", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "103": { "cluster": 13, "id": 103, "name": "reliability", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "104": { "cluster": 13, "id": 104, "name": "relinquishDefault", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "106": { "cluster": 13, "id": 106, "name": "resolution", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "111": { "cluster": 13, "id": 111, "name": "statusFlags", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "117": { "cluster": 13, "id": 117, "name": "engineeringUnits", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "256": { "cluster": 13, "id": 256, "name": "applicationType", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "14": {
    "id": 14,
    "name": "genAnalogValue",
    "specific": null,
    "attributes": {
      "28": { "cluster": 14, "id": 28, "name": "description", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "81": { "cluster": 14, "id": 81, "name": "outOfService", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "85": { "cluster": 14, "id": 85, "name": "presentValue", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "87": { "cluster": 14, "id": 87, "name": "priorityArray", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "103": { "cluster": 14, "id": 103, "name": "reliability", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "104": { "cluster": 14, "id": 104, "name": "relinquishDefault", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "111": { "cluster": 14, "id": 111, "name": "statusFlags", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "117": { "cluster": 14, "id": 117, "name": "engineeringUnits", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "256": { "cluster": 14, "id": 256, "name": "applicationType", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "15": {
    "id": 15,
    "name": "genBinaryInput",
    "specific": null,
    "attributes": {
      "4": { "cluster": 15, "id": 4, "name": "activeText", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "28": { "cluster": 15, "id": 28, "name": "description", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "46": { "cluster": 15, "id": 46, "name": "inactiveText", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "81": { "cluster": 15, "id": 81, "name": "outOfService", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "84": { "cluster": 15, "id": 84, "name": "polarity", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "85": { "cluster": 15, "id": 85, "name": "presentValue", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "103": { "cluster": 15, "id": 103, "name": "reliability", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "111": { "cluster": 15, "id": 111, "name": "statusFlags", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "256": { "cluster": 15, "id": 256, "name": "applicationType", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "16": {
    "id": 16,
    "name": "genBinaryOutput",
    "specific": null,
    "attributes": {
      "4": { "cluster": 16, "id": 4, "name": "activeText", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "28": { "cluster": 16, "id": 28, "name": "description", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "46": { "cluster": 16, "id": 46, "name": "inactiveText", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "66": { "cluster": 16, "id": 66, "name": "minimumOffTime", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "67": { "cluster": 16, "id": 67, "name": "minimumOnTime", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "81": { "cluster": 16, "id": 81, "name": "outOfService", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "84": { "cluster": 16, "id": 84, "name": "polarity", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "85": { "cluster": 16, "id": 85, "name": "presentValue", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "87": { "cluster": 16, "id": 87, "name": "priorityArray", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "103": { "cluster": 16, "id": 103, "name": "reliability", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "104": { "cluster": 16, "id": 104, "name": "relinquishDefault", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "111": { "cluster": 16, "id": 111, "name": "statusFlags", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "256": { "cluster": 16, "id": 256, "name": "applicationType", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "17": {
    "id": 17,
    "name": "genBinaryValue",
    "specific": null,
    "attributes": {
      "4": { "cluster": 17, "id": 4, "name": "activeText", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "28": { "cluster": 17, "id": 28, "name": "description", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "46": { "cluster": 17, "id": 46, "name": "inactiveText", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "66": { "cluster": 17, "id": 66, "name": "minimumOffTime", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "67": { "cluster": 17, "id": 67, "name": "minimumOnTime", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "81": { "cluster": 17, "id": 81, "name": "outOfService", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "85": { "cluster": 17, "id": 85, "name": "presentValue", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "87": { "cluster": 17, "id": 87, "name": "priorityArray", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "103": { "cluster": 17, "id": 103, "name": "reliability", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "104": { "cluster": 17, "id": 104, "name": "relinquishDefault", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "111": { "cluster": 17, "id": 111, "name": "statusFlags", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "256": { "cluster": 17, "id": 256, "name": "applicationType", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "18": {
    "id": 18,
    "name": "genMultistateInput",
    "specific": null,
    "attributes": {
      "14": { "cluster": 18, "id": 14, "name": "stateText", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "28": { "cluster": 18, "id": 28, "name": "description", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "74": { "cluster": 18, "id": 74, "name": "numberOfStates", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "81": { "cluster": 18, "id": 81, "name": "outOfService", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "85": { "cluster": 18, "id": 85, "name": "presentValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "103": { "cluster": 18, "id": 103, "name": "reliability", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "111": { "cluster": 18, "id": 111, "name": "statusFlags", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "256": { "cluster": 18, "id": 256, "name": "applicationType", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "19": {
    "id": 19,
    "name": "genMultistateOutput",
    "specific": null,
    "attributes": {
      "14": { "cluster": 19, "id": 14, "name": "stateText", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "28": { "cluster": 19, "id": 28, "name": "description", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "74": { "cluster": 19, "id": 74, "name": "numberOfStates", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "81": { "cluster": 19, "id": 81, "name": "outOfService", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "85": { "cluster": 19, "id": 85, "name": "presentValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "87": { "cluster": 19, "id": 87, "name": "priorityArray", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "103": { "cluster": 19, "id": 103, "name": "reliability", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "104": { "cluster": 19, "id": 104, "name": "relinquishDefault", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "111": { "cluster": 19, "id": 111, "name": "statusFlags", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "256": { "cluster": 19, "id": 256, "name": "applicationType", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "20": {
    "id": 20,
    "name": "genMultistateValue",
    "specific": null,
    "attributes": {
      "14": { "cluster": 20, "id": 14, "name": "stateText", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "28": { "cluster": 20, "id": 28, "name": "description", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "74": { "cluster": 20, "id": 74, "name": "numberOfStates", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "81": { "cluster": 20, "id": 81, "name": "outOfService", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "85": { "cluster": 20, "id": 85, "name": "presentValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "87": { "cluster": 20, "id": 87, "name": "priorityArray", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "103": { "cluster": 20, "id": 103, "name": "reliability", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "104": { "cluster": 20, "id": 104, "name": "relinquishDefault", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "111": { "cluster": 20, "id": 111, "name": "statusFlags", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "256": { "cluster": 20, "id": 256, "name": "applicationType", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "21": {
    "id": 21,
    "name": "genCommissioning",
    "specific": null,
    "attributes": {
      "0": { "cluster": 21, "id": 0, "name": "shortress", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 21, "id": 1, "name": "extendedPANId", "type": "ieeeAddr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 21, "id": 2, "name": "panId", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 21, "id": 3, "name": "channelmask", "type": "bitmap32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 21, "id": 4, "name": "protocolVersion", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 21, "id": 5, "name": "stackProfile", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 21, "id": 6, "name": "startupControl", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 21, "id": 16, "name": "trustCenterress", "type": "ieeeAddr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 21, "id": 17, "name": "trustCenterMasterKey", "type": "secKey", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 21, "id": 18, "name": "networkKey", "type": "secKey", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 21, "id": 19, "name": "useInsecureJoin", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "20": { "cluster": 21, "id": 20, "name": "preconfiguredLinkKey", "type": "secKey", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "21": { "cluster": 21, "id": 21, "name": "networkKeySeqNum", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "22": { "cluster": 21, "id": 22, "name": "networkKeyType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "23": { "cluster": 21, "id": 23, "name": "networkManagerress", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "32": { "cluster": 21, "id": 32, "name": "scanAttempts", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "33": { "cluster": 21, "id": 33, "name": "timeBetweenScans", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "34": { "cluster": 21, "id": 34, "name": "rejoinInterval", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "35": { "cluster": 21, "id": 35, "name": "maxRejoinInterval", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "48": { "cluster": 21, "id": 48, "name": "indirectPollRate", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "49": { "cluster": 21, "id": 49, "name": "parentRetryThreshold", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "64": { "cluster": 21, "id": 64, "name": "concentratorFlag", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "65": { "cluster": 21, "id": 65, "name": "concentratorRus", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "66": { "cluster": 21, "id": 66, "name": "concentratorDiscoveryTime", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "restartDevice" },
      "1": { "id": 1, "name": "saveStartupParams" },
      "2": { "id": 2, "name": "restoreStartupParams" },
      "3": { "id": 3, "name": "resetStartupParams" }
    },
    "responses": {
      "0": { "id": 0, "name": "restartDeviceRsp" },
      "1": { "id": 1, "name": "saveStartupParamsRsp" },
      "2": { "id": 2, "name": "restoreStartupParamsRsp" },
      "3": { "id": 3, "name": "resetStartupParamsRsp" }
    }
  },
  "22": {
    "id": 22,
    "name": "genPartition",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "25": {
    "id": 25,
    "name": "genOta",
    "specific": null,
    "attributes": {
      "0": { "cluster": 25, "id": 0, "name": "upgradeServerId", "type": "ieeeAddr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 25, "id": 1, "name": "fileOffset", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 25, "id": 2, "name": "currentFileVersion", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 25, "id": 3, "name": "currentZigbeeStackVersion", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 25, "id": 4, "name": "downloadedFileVersion", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 25, "id": 5, "name": "downloadedZigbeeStackVersion", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 25, "id": 6, "name": "imageUpgradeStatus", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "7": { "cluster": 25, "id": 7, "name": "manufacturerId", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "8": { "cluster": 25, "id": 8, "name": "imageTypeId", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "9": { "cluster": 25, "id": 9, "name": "minimumBlockReqDelay", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "10": { "cluster": 25, "id": 10, "name": "imageStamp", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "1": { "id": 1, "name": "queryNextImageReq" },
      "3": { "id": 3, "name": "imageBlockReq" },
      "4": { "id": 4, "name": "imagePageReq" },
      "6": { "id": 6, "name": "upgradeEndReq" },
      "8": { "id": 8, "name": "querySpecificFileReq" }
    },
    "responses": {
      "0": { "id": 0, "name": "imageNotify" },
      "2": { "id": 2, "name": "queryNextImageRsp" },
      "5": { "id": 5, "name": "imageBlockRsp" },
      "7": { "id": 7, "name": "upgradeEndRsp" },
      "9": { "id": 9, "name": "querySpecificFileRsp" }
    }
  },
  "26": {
    "id": 26,
    "name": "genPowerProfile",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "27": {
    "id": 27,
    "name": "genApplianceCtrl",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "32": {
    "id": 32,
    "name": "genPollCtrl",
    "specific": null,
    "attributes": {
      "0": { "cluster": 32, "id": 0, "name": "physicalClosedLimit", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 32, "id": 1, "name": "longPollInterval", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 32, "id": 2, "name": "shortPollInterval", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 32, "id": 3, "name": "fastPollTimeout", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 32, "id": 4, "name": "checkinIntervalMin", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 32, "id": 5, "name": "longPollIntervalMin", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 32, "id": 6, "name": "fastPollTimeoutMax", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "checkinRsp" },
      "1": { "id": 1, "name": "fastPollStop" },
      "2": { "id": 2, "name": "setLongPollInterval" },
      "3": { "id": 3, "name": "setShortPollInterval" }
    },
    "responses": {
      "0": { "id": 0, "name": "checkin" }
    }
  },
  "33": {
    "id": 33,
    "name": "genGreenPowerProxy",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "256": {
    "id": 256,
    "name": "closuresShadeCfg",
    "specific": null,
    "attributes": {
      "0": { "cluster": 256, "id": 0, "name": "physicalClosedLimit", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 256, "id": 1, "name": "motorStepSize", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 256, "id": 2, "name": "status", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 256, "id": 16, "name": "losedLimit", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 256, "id": 18, "name": "mode", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "257": {
    "id": 257,
    "name": "closuresDoorLock",
    "specific": null,
    "attributes": {
      "0": { "cluster": 257, "id": 0, "name": "lockState", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 257, "id": 2, "name": "actuatorEnabled", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 257, "id": 3, "name": "doorState", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 257, "id": 4, "name": "doorOpenEvents", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 257, "id": 5, "name": "doorClosedEvents", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 257, "id": 6, "name": "openPeriod", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 257, "id": 16, "name": "numOfLockRecordsSupported", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 257, "id": 17, "name": "numOfTotalUsersSupported", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 257, "id": 18, "name": "numOfPinUsersSupported", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 257, "id": 19, "name": "numOfRfidUsersSupported", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "20": { "cluster": 257, "id": 20, "name": "numOfWeekDaySchedulesSupportedPerUser", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "21": { "cluster": 257, "id": 21, "name": "numOfYearDaySchedulesSupportedPerUser", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "22": { "cluster": 257, "id": 22, "name": "numOfHolidayScheduledsSupported", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "23": { "cluster": 257, "id": 23, "name": "maxPinLen", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "24": { "cluster": 257, "id": 24, "name": "minPinLen", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "25": { "cluster": 257, "id": 25, "name": "maxRfidLen", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "26": { "cluster": 257, "id": 26, "name": "minRfidLen", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "32": { "cluster": 257, "id": 32, "name": "enable_Logging", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "33": { "cluster": 257, "id": 33, "name": "language", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "34": { "cluster": 257, "id": 34, "name": "ledSettings", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "35": { "cluster": 257, "id": 35, "name": "autoRelockTime", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "36": { "cluster": 257, "id": 36, "name": "soundVolume", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "37": { "cluster": 257, "id": 37, "name": "operatingMode", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "38": { "cluster": 257, "id": 38, "name": "lockType", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "39": { "cluster": 257, "id": 39, "name": "defaultConfigurationRegister", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "40": { "cluster": 257, "id": 40, "name": "enableLocalProgramming", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "41": { "cluster": 257, "id": 41, "name": "enableOneTouchLocking", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "42": { "cluster": 257, "id": 42, "name": "enableInsideStatusLed", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "43": { "cluster": 257, "id": 43, "name": "enablePrivacyModeButton", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "48": { "cluster": 257, "id": 48, "name": "wrongCodeEntryLimit", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "49": { "cluster": 257, "id": 49, "name": "userCodeTemporaryDisableTime", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "50": { "cluster": 257, "id": 50, "name": "sendPinOta", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "51": { "cluster": 257, "id": 51, "name": "requirePinForRfOperation", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "52": { "cluster": 257, "id": 52, "name": "zigbeeSecurityLevel", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "64": { "cluster": 257, "id": 64, "name": "alarmMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "65": { "cluster": 257, "id": 65, "name": "keypadOperationEventMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "66": { "cluster": 257, "id": 66, "name": "rfOperationEventMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "67": { "cluster": 257, "id": 67, "name": "manualOperationEventMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "68": { "cluster": 257, "id": 68, "name": "rfidOperationEventMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "69": { "cluster": 257, "id": 69, "name": "keypadProgrammingEventMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "70": { "cluster": 257, "id": 70, "name": "rfProgrammingEventMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "71": { "cluster": 257, "id": 71, "name": "rfidProgrammingEventMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "lockDoor" },
      "1": { "id": 1, "name": "unlockDoor" },
      "2": { "id": 2, "name": "toggleDoor" },
      "3": { "id": 3, "name": "unlockWithTimeout" },
      "4": { "id": 4, "name": "getLogRecord" },
      "5": { "id": 5, "name": "setPinCode" },
      "6": { "id": 6, "name": "getPinCode" },
      "7": { "id": 7, "name": "clearPinCode" },
      "8": { "id": 8, "name": "clearAllPinCodes" },
      "9": { "id": 9, "name": "setUserStatus" },
      "10": { "id": 10, "name": "getUserStatus" },
      "11": { "id": 11, "name": "setWeekDaySchedule" },
      "12": { "id": 12, "name": "getWeekDaySchedule" },
      "13": { "id": 13, "name": "clearWeekDaySchedule" },
      "14": { "id": 14, "name": "setYearDaySchedule" },
      "15": { "id": 15, "name": "getYearDaySchedule" },
      "16": { "id": 16, "name": "clearYearDaySchedule" },
      "17": { "id": 17, "name": "setHolidaySchedule" },
      "18": { "id": 18, "name": "getHolidaySchedule" },
      "19": { "id": 19, "name": "clearHolidaySchedule" },
      "20": { "id": 20, "name": "setUserType" },
      "21": { "id": 21, "name": "getUserType" },
      "22": { "id": 22, "name": "setRfidCode" },
      "23": { "id": 23, "name": "getRfidCode" },
      "24": { "id": 24, "name": "clearRfidCode" },
      "25": { "id": 25, "name": "clearAllRfidCodes" }
    },
    "responses": {
      "0": { "id": 0, "name": "lockDoorRsp" },
      "1": { "id": 1, "name": "unlockDoorRsp" },
      "2": { "id": 2, "name": "toggleDoorRsp" },
      "3": { "id": 3, "name": "unlockWithTimeoutRsp" },
      "4": { "id": 4, "name": "getLogRecordRsp" },
      "5": { "id": 5, "name": "setPinCodeRsp" },
      "6": { "id": 6, "name": "getPinCodeRsp" },
      "7": { "id": 7, "name": "clearPinCodeRsp" },
      "8": { "id": 8, "name": "clearAllPinCodesRsp" },
      "9": { "id": 9, "name": "setUserStatusRsp" },
      "10": { "id": 10, "name": "getUserStatusRsp" },
      "11": { "id": 11, "name": "setWeekDayScheduleRsp" },
      "12": { "id": 12, "name": "getWeekDayScheduleRsp" },
      "13": { "id": 13, "name": "clearWeekDayScheduleRsp" },
      "14": { "id": 14, "name": "setYearDayScheduleRsp" },
      "15": { "id": 15, "name": "getYearDayScheduleRsp" },
      "16": { "id": 16, "name": "clearYearDayScheduleRsp" },
      "17": { "id": 17, "name": "setHolidayScheduleRsp" },
      "18": { "id": 18, "name": "getHolidayScheduleRsp" },
      "19": { "id": 19, "name": "clearHolidayScheduleRsp" },
      "20": { "id": 20, "name": "setUserTypeRsp" },
      "21": { "id": 21, "name": "getUserTypeRsp" },
      "22": { "id": 22, "name": "setRfidCodeRsp" },
      "23": { "id": 23, "name": "getRfidCodeRsp" },
      "24": { "id": 24, "name": "clearRfidCodeRsp" },
      "25": { "id": 25, "name": "clearAllRfidCodesRsp" },
      "32": { "id": 32, "name": "operationEventNotification" },
      "33": { "id": 33, "name": "programmingEventNotification" }
    }
  },
  "258": {
    "id": 258,
    "name": "closuresWindowCovering",
    "specific": null,
    "attributes": {
      "0": { "cluster": 258, "id": 0, "name": "windowCoveringType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 258, "id": 1, "name": "physicalCloseLimitLiftCm", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 258, "id": 2, "name": "physicalCloseLimitTiltDdegree", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 258, "id": 3, "name": "currentPositionLiftCm", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 258, "id": 4, "name": "currentPositionTiltDdegree", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 258, "id": 5, "name": "numOfActuationLift", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "7": { "cluster": 258, "id": 7, "name": "configStatus", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "8": { "cluster": 258, "id": 8, "name": "currentPositionLiftPercentage", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "9": { "cluster": 258, "id": 9, "name": "currentPositionTiltPercentage", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 258, "id": 16, "name": "installedClosedLimitTiltDdegree", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 258, "id": 17, "name": "installedClosedLimitLiftCm", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 258, "id": 18, "name": "velocityLift", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "21": { "cluster": 258, "id": 21, "name": "accelerationTimeLift", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "22": { "cluster": 258, "id": 22, "name": "numOfActuationTilt", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "23": { "cluster": 258, "id": 23, "name": "windowCoveringMode", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "24": { "cluster": 258, "id": 24, "name": "intermediateSetpointsLift", "type": "octetStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "25": { "cluster": 258, "id": 25, "name": "intermediateSetpointsTilt", "type": "octetStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "upOpen" },
      "1": { "id": 1, "name": "downClose" },
      "2": { "id": 2, "name": "stop" },
      "4": { "id": 4, "name": "goToLiftValue" },
      "5": { "id": 5, "name": "goToLiftPercentage" },
      "7": { "id": 7, "name": "goToTiltValue" },
      "8": { "id": 8, "name": "goToTiltPercentage" }
    },
    "responses": {}
  },
  "512": {
    "id": 512,
    "name": "hvacPumpCfgCtrl",
    "specific": null,
    "attributes": {
      "0": { "cluster": 512, "id": 0, "name": "maxPressure", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 512, "id": 1, "name": "maxSpeed", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 512, "id": 2, "name": "maxFlow", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 512, "id": 3, "name": "minConstPressure", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 512, "id": 4, "name": "maxConstPressure", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 512, "id": 5, "name": "minCompPressure", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 512, "id": 6, "name": "maxCompPressure", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "7": { "cluster": 512, "id": 7, "name": "minConstSpeed", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "8": { "cluster": 512, "id": 8, "name": "maxConstSpeed", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "9": { "cluster": 512, "id": 9, "name": "minConstFlow", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "10": { "cluster": 512, "id": 10, "name": "maxConstFlow", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "11": { "cluster": 512, "id": 11, "name": "minConstTemp", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "12": { "cluster": 512, "id": 12, "name": "maxConstTemp", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 512, "id": 16, "name": "pumpStatus", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 512, "id": 17, "name": "effectiveOperationMode", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 512, "id": 18, "name": "effectiveControlMode", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 512, "id": 19, "name": "capacity", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "20": { "cluster": 512, "id": 20, "name": "speed", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "21": { "cluster": 512, "id": 21, "name": "lifetimeRunningHours", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "22": { "cluster": 512, "id": 22, "name": "power", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "23": { "cluster": 512, "id": 23, "name": "lifetimeEnergyConsumed", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "32": { "cluster": 512, "id": 32, "name": "operationMode", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "33": { "cluster": 512, "id": 33, "name": "controlMode", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "34": { "cluster": 512, "id": 34, "name": "alarmMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "513": {
    "id": 513,
    "name": "hvacThermostat",
    "specific": null,
    "attributes": {
      "0": { "cluster": 513, "id": 0, "name": "localTemp", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 513, "id": 1, "name": "outdoorTemp", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 513, "id": 2, "name": "ocupancy", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 513, "id": 3, "name": "absMinHeatSetpointLimit", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 513, "id": 4, "name": "absMaxHeatSetpointLimit", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 513, "id": 5, "name": "absMinCoolSetpointLimit", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 513, "id": 6, "name": "absMaxCoolSetpointLimit", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "7": { "cluster": 513, "id": 7, "name": "pICoolingDemand", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "8": { "cluster": 513, "id": 8, "name": "pIHeatingDemand", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "9": { "cluster": 513, "id": 9, "name": "systemTypeConfig", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 513, "id": 16, "name": "localTemperatureCalibration", "type": "int8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 513, "id": 17, "name": "occupiedCoolingSetpoint", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 513, "id": 18, "name": "occupiedHeatingSetpoint", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 513, "id": 19, "name": "unoccupiedCoolingSetpoint", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "20": { "cluster": 513, "id": 20, "name": "unoccupiedHeatingSetpoint", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "21": { "cluster": 513, "id": 21, "name": "minHeatSetpointLimit", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "22": { "cluster": 513, "id": 22, "name": "maxHeatSetpointLimit", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "23": { "cluster": 513, "id": 23, "name": "minCoolSetpointLimit", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "24": { "cluster": 513, "id": 24, "name": "maxCoolSetpointLimit", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "25": { "cluster": 513, "id": 25, "name": "minSetpointDeadBand", "type": "int8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "26": { "cluster": 513, "id": 26, "name": "remoteSensing", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "27": { "cluster": 513, "id": 27, "name": "ctrlSeqeOfOper", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "28": { "cluster": 513, "id": 28, "name": "systemMode", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "29": { "cluster": 513, "id": 29, "name": "alarmMask", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "30": { "cluster": 513, "id": 30, "name": "runningMode", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "32": { "cluster": 513, "id": 32, "name": "startOfWeek", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "33": { "cluster": 513, "id": 33, "name": "numberOfWeeklyTrans", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "34": { "cluster": 513, "id": 34, "name": "numberOfDailyTrans", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "35": { "cluster": 513, "id": 35, "name": "tempSetpointHold", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "36": { "cluster": 513, "id": 36, "name": "tempSetpointHoldDuration", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "37": { "cluster": 513, "id": 37, "name": "programingOperMode", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "41": { "cluster": 513, "id": 41, "name": "runningState", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "48": { "cluster": 513, "id": 48, "name": "setpointChangeSource", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "49": { "cluster": 513, "id": 49, "name": "setpointChangeAmount", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "50": { "cluster": 513, "id": 50, "name": "setpointChangeSourceTimeStamp", "type": "utc", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "64": { "cluster": 513, "id": 64, "name": "acType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "65": { "cluster": 513, "id": 65, "name": "acCapacity", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "66": { "cluster": 513, "id": 66, "name": "acRefrigerantType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "67": { "cluster": 513, "id": 67, "name": "acConpressorType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "68": { "cluster": 513, "id": 68, "name": "acErrorCode", "type": "bitmap32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "69": { "cluster": 513, "id": 69, "name": "acLouverPosition", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "70": { "cluster": 513, "id": 70, "name": "acCollTemp", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "71": { "cluster": 513, "id": 71, "name": "acCapacityFormat", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "setpointRaiseLower" },
      "1": { "id": 1, "name": "setWeeklySchedule" },
      "2": { "id": 2, "name": "getWeeklySchedule" },
      "3": { "id": 3, "name": "clearWeeklySchedule" },
      "4": { "id": 4, "name": "getRelayStatusLog" }
    },
    "responses": {
      "0": { "id": 0, "name": "getWeeklyScheduleRsp" },
      "1": { "id": 1, "name": "getRelayStatusLogRsp" }
    }
  },
  "514": {
    "id": 514,
    "name": "hvacFanCtrl",
    "specific": null,
    "attributes": {
      "0": { "cluster": 514, "id": 0, "name": "fanMode", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 514, "id": 1, "name": "fanModeSequence", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "515": {
    "id": 515,
    "name": "hvacDehumidificationCtrl",
    "specific": null,
    "attributes": {
      "0": { "cluster": 515, "id": 0, "name": "relativeHumidity", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 515, "id": 1, "name": "dehumidCooling", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 515, "id": 16, "name": "rhDehumidSetpoint", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 515, "id": 17, "name": "relativeHumidityMode", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 515, "id": 18, "name": "dehumidLockout", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 515, "id": 19, "name": "dehumidHysteresis", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "20": { "cluster": 515, "id": 20, "name": "dehumidMaxCool", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "21": { "cluster": 515, "id": 21, "name": "relativeHumidDisplay", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "516": {
    "id": 516,
    "name": "hvacUserInterfaceCfg",
    "specific": null,
    "attributes": {
      "0": { "cluster": 516, "id": 0, "name": "tempDisplayMode", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 516, "id": 1, "name": "keypadLockout", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 516, "id": 2, "name": "programmingVisibility", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "768": {
    "id": 768,
    "name": "lightingColorCtrl",
    "specific": null,
    "attributes": {
      "0": { "cluster": 768, "id": 0, "name": "currentHue", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 768, "id": 1, "name": "currentSaturation", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 768, "id": 2, "name": "remainingTime", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 768, "id": 3, "name": "currentX", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 768, "id": 4, "name": "currentY", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 768, "id": 5, "name": "driftCompensation", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 768, "id": 6, "name": "compensationText", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "7": { "cluster": 768, "id": 7, "name": "colorTemperature", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "8": { "cluster": 768, "id": 8, "name": "colorMode", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 768, "id": 16, "name": "numPrimaries", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 768, "id": 17, "name": "primary1X", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 768, "id": 18, "name": "primary1Y", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 768, "id": 19, "name": "primary1Intensity", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "21": { "cluster": 768, "id": 21, "name": "primary2X", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "22": { "cluster": 768, "id": 22, "name": "primary2Y", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "23": { "cluster": 768, "id": 23, "name": "primary2Intensity", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "25": { "cluster": 768, "id": 25, "name": "primary3X", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "26": { "cluster": 768, "id": 26, "name": "primary3Y", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "27": { "cluster": 768, "id": 27, "name": "primary3Intensity", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "32": { "cluster": 768, "id": 32, "name": "primary4X", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "33": { "cluster": 768, "id": 33, "name": "primary4Y", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "34": { "cluster": 768, "id": 34, "name": "primary4Intensity", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "36": { "cluster": 768, "id": 36, "name": "primary5X", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "37": { "cluster": 768, "id": 37, "name": "primary5Y", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "38": { "cluster": 768, "id": 38, "name": "primary5Intensity", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "40": { "cluster": 768, "id": 40, "name": "primary6X", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "41": { "cluster": 768, "id": 41, "name": "primary6Y", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "42": { "cluster": 768, "id": 42, "name": "primary6Intensity", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "48": { "cluster": 768, "id": 48, "name": "whitePointX", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "49": { "cluster": 768, "id": 49, "name": "whitePointY", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "50": { "cluster": 768, "id": 50, "name": "colorPointRX", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "51": { "cluster": 768, "id": 51, "name": "colorPointRY", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "52": { "cluster": 768, "id": 52, "name": "colorPointRIntensity", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "54": { "cluster": 768, "id": 54, "name": "colorPointGX", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "55": { "cluster": 768, "id": 55, "name": "colorPointGY", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "56": { "cluster": 768, "id": 56, "name": "colorPointGIntensity", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "58": { "cluster": 768, "id": 58, "name": "colorPointBX", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "59": { "cluster": 768, "id": 59, "name": "colorPointBY", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "60": { "cluster": 768, "id": 60, "name": "colorPointBIntensity", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16384": { "cluster": 768, "id": 16384, "name": "enhancedCurrentHue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16385": { "cluster": 768, "id": 16385, "name": "enhancedColorMode", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16386": { "cluster": 768, "id": 16386, "name": "colorLoopActive", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16387": { "cluster": 768, "id": 16387, "name": "colorLoopDirection", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16388": { "cluster": 768, "id": 16388, "name": "colorLoopTime", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16389": { "cluster": 768, "id": 16389, "name": "colorLoopStartEnhancedHue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16390": { "cluster": 768, "id": 16390, "name": "colorLoopStoredEnhancedHue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16394": { "cluster": 768, "id": 16394, "name": "colorCapabilities", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16395": { "cluster": 768, "id": 16395, "name": "colorTempPhysicalMin", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16396": { "cluster": 768, "id": 16396, "name": "colorTempPhysicalMax", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "moveToHue" },
      "1": { "id": 1, "name": "moveHue" },
      "2": { "id": 2, "name": "stepHue" },
      "3": { "id": 3, "name": "moveToSaturation" },
      "4": { "id": 4, "name": "moveSaturation" },
      "5": { "id": 5, "name": "stepSaturation" },
      "6": { "id": 6, "name": "moveToHueAndSaturation" },
      "7": { "id": 7, "name": "moveToColor" },
      "8": { "id": 8, "name": "moveColor" },
      "9": { "id": 9, "name": "stepColor" },
      "10": { "id": 10, "name": "moveToColorTemp" },
      "64": { "id": 64, "name": "enhancedMoveToHue" },
      "65": { "id": 65, "name": "enhancedMoveHue" },
      "66": { "id": 66, "name": "enhancedStepHue" },
      "67": { "id": 67, "name": "enhancedMoveToHueAndSaturation" },
      "68": { "id": 68, "name": "colorLoopSet" },
      "71": { "id": 71, "name": "stopMoveStep" }
    },
    "responses": {}
  },
  "769": {
    "id": 769,
    "name": "lightingBallastCfg",
    "specific": null,
    "attributes": {
      "0": { "cluster": 769, "id": 0, "name": "physicalMinLevel", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 769, "id": 1, "name": "physicalMaxLevel", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 769, "id": 2, "name": "ballastStatus", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 769, "id": 16, "name": "minLevel", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 769, "id": 17, "name": "maxLevel", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 769, "id": 18, "name": "powerOnLevel", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 769, "id": 19, "name": "powerOnFadeTime", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "20": { "cluster": 769, "id": 20, "name": "intrinsicBallastFactor", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "21": { "cluster": 769, "id": 21, "name": "ballastFactorAdjustment", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "32": { "cluster": 769, "id": 32, "name": "lampQuantity", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "48": { "cluster": 769, "id": 48, "name": "lampType", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "49": { "cluster": 769, "id": 49, "name": "lampManufacturer", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "50": { "cluster": 769, "id": 50, "name": "lampRatedHours", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "51": { "cluster": 769, "id": 51, "name": "lampBurnHours", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "52": { "cluster": 769, "id": 52, "name": "lampAlarmMode", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "53": { "cluster": 769, "id": 53, "name": "lampBurnHoursTripPoint", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1024": {
    "id": 1024,
    "name": "msIlluminanceMeasurement",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1024, "id": 0, "name": "measuredValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 1024, "id": 1, "name": "minMeasuredValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 1024, "id": 2, "name": "maxMeasuredValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 1024, "id": 3, "name": "tolerance", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 1024, "id": 4, "name": "lightSensorType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1025": {
    "id": 1025,
    "name": "msIlluminanceLevelSensing",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1025, "id": 0, "name": "levelStatus", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 1025, "id": 1, "name": "lightSensorType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 1025, "id": 16, "name": "illuminanceTargetLevel", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1026": {
    "id": 1026,
    "name": "msTemperatureMeasurement",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1026, "id": 0, "name": "measuredValue", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 1026, "id": 1, "name": "minMeasuredValue", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 1026, "id": 2, "name": "maxMeasuredValue", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 1026, "id": 3, "name": "tolerance", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 1026, "id": 16, "name": "minPercentChange", "type": "unknown", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1026, "id": 17, "name": "minAbsoluteChange", "type": "unknown", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1027": {
    "id": 1027,
    "name": "msPressureMeasurement",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1027, "id": 0, "name": "measuredValue", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 1027, "id": 1, "name": "minMeasuredValue", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 1027, "id": 2, "name": "maxMeasuredValue", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 1027, "id": 3, "name": "tolerance", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1028": {
    "id": 1028,
    "name": "msFlowMeasurement",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1028, "id": 0, "name": "measuredValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 1028, "id": 1, "name": "minMeasuredValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 1028, "id": 2, "name": "maxMeasuredValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 1028, "id": 3, "name": "tolerance", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1029": {
    "id": 1029,
    "name": "msRelativeHumidity",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1029, "id": 0, "name": "measuredValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 1029, "id": 1, "name": "minMeasuredValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 1029, "id": 2, "name": "maxMeasuredValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 1029, "id": 3, "name": "tolerance", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1030": {
    "id": 1030,
    "name": "msOccupancySensing",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1030, "id": 0, "name": "occupancy", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 1030, "id": 1, "name": "occupancySensorType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 1030, "id": 16, "name": "pirOToUDelay", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1030, "id": 17, "name": "pirUToODelay", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 1030, "id": 18, "name": "pirUToOThreshold", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "32": { "cluster": 1030, "id": 32, "name": "ultrasonicOToUDelay", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "33": { "cluster": 1030, "id": 33, "name": "ultrasonicUToODelay", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "34": { "cluster": 1030, "id": 34, "name": "ultrasonicUToOThreshold", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1280": {
    "id": 1280,
    "name": "ssIasZone",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1280, "id": 0, "name": "zoneState", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 1280, "id": 1, "name": "zoneType", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 1280, "id": 2, "name": "zoneStatus", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 1280, "id": 16, "name": "iasCieAddr", "type": "ieeeAddr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1280, "id": 17, "name": "zoneId", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 1280, "id": 18, "name": "numZoneSensitivityLevelsSupported", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 1280, "id": 19, "name": "currentZoneSensitivityLevel", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "enrollRsp" },
      "1": { "id": 1, "name": "initNormalOpMode" },
      "2": { "id": 2, "name": "initTestMode" }
    },
    "responses": {
      "0": { "id": 0, "name": "statusChangeNotification" },
      "1": { "id": 1, "name": "enrollReq" }
    }
  },
  "1281": {
    "id": 1281,
    "name": "ssIasAce",
    "specific": null,
    "attributes": {},
    "commands": {
      "0": { "id": 0, "name": "arm" },
      "1": { "id": 1, "name": "bypass" },
      "2": { "id": 2, "name": "emergency" },
      "3": { "id": 3, "name": "fire" },
      "4": { "id": 4, "name": "panic" },
      "5": { "id": 5, "name": "getZoneIDMap" },
      "6": { "id": 6, "name": "getZoneInfo" },
      "7": { "id": 7, "name": "getPanelStatus" },
      "8": { "id": 8, "name": "getBypassedZoneList" },
      "9": { "id": 9, "name": "getZoneStatus" }
    },
    "responses": {
      "0": { "id": 0, "name": "armRsp" },
      "1": { "id": 1, "name": "getZoneIDMapRsp" },
      "2": { "id": 2, "name": "getZoneInfoRsp" },
      "3": { "id": 3, "name": "zoneStatusChanged" },
      "4": { "id": 4, "name": "panelStatusChanged" },
      "5": { "id": 5, "name": "getPanelStatusRsp" },
      "6": { "id": 6, "name": "setBypassedZoneList" },
      "7": { "id": 7, "name": "bypassRsp" },
      "8": { "id": 8, "name": "getZoneStatusRsp" }
    }
  },
  "1282": {
    "id": 1282,
    "name": "ssIasWd",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1282, "id": 0, "name": "maxDuration", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "startWarning" },
      "1": { "id": 1, "name": "squawk" }
    },
    "responses": {}
  },
  "1536": {
    "id": 1536,
    "name": "piGenericTunnel",
    "specific": null,
    "attributes": {
      "1": { "cluster": 1536, "id": 1, "name": "maxIncomeTransSize", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 1536, "id": 2, "name": "maxOutgoTransSize", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 1536, "id": 3, "name": "protocolAddr", "type": "octetStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "matchProtocolAddr" }
    },
    "responses": {
      "0": { "id": 0, "name": "matchProtocolAddrRsp" },
      "1": { "id": 1, "name": "advertiseProtocolAddr" }
    }
  },
  "1537": {
    "id": 1537,
    "name": "piBacnetProtocolTunnel",
    "specific": null,
    "attributes": {},
    "commands": {
      "0": { "id": 0, "name": "transferNpdu" }
    },
    "responses": {}
  },
  "1538": {
    "id": 1538,
    "name": "piAnalogInputReg",
    "specific": null,
    "attributes": {
      "22": { "cluster": 1538, "id": 22, "name": "covIncrement", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "31": { "cluster": 1538, "id": 31, "name": "deviceType", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "75": { "cluster": 1538, "id": 75, "name": "objectId", "type": "bacOid", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "77": { "cluster": 1538, "id": 77, "name": "objectName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "79": { "cluster": 1538, "id": 79, "name": "objectType", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "118": { "cluster": 1538, "id": 118, "name": "updateInterval", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "168": { "cluster": 1538, "id": 168, "name": "profileName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1539": {
    "id": 1539,
    "name": "piAnalogInputExt",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1539, "id": 0, "name": "ackedTransitions", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1539, "id": 17, "name": "notificationClass", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "25": { "cluster": 1539, "id": 25, "name": "deadband", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "35": { "cluster": 1539, "id": 35, "name": "eventEnable", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "36": { "cluster": 1539, "id": 36, "name": "eventState", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "45": { "cluster": 1539, "id": 45, "name": "highLimit", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "52": { "cluster": 1539, "id": 52, "name": "limitEnable", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "59": { "cluster": 1539, "id": 59, "name": "lowLimit", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "72": { "cluster": 1539, "id": 72, "name": "notifyType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "113": { "cluster": 1539, "id": 113, "name": "timeDelay", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "130": { "cluster": 1539, "id": 130, "name": "eventTimeStamps", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "transferApdu" },
      "1": { "id": 1, "name": "connectReq" },
      "2": { "id": 2, "name": "disconnectReq" },
      "3": { "id": 3, "name": "connectStatusNoti" }
    },
    "responses": {}
  },
  "1540": {
    "id": 1540,
    "name": "piAnalogOutputReg",
    "specific": null,
    "attributes": {
      "22": { "cluster": 1540, "id": 22, "name": "covIncrement", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "31": { "cluster": 1540, "id": 31, "name": "deviceType", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "75": { "cluster": 1540, "id": 75, "name": "objectId", "type": "bacOid", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "77": { "cluster": 1540, "id": 77, "name": "objectName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "79": { "cluster": 1540, "id": 79, "name": "objectType", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "118": { "cluster": 1540, "id": 118, "name": "updateInterval", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "168": { "cluster": 1540, "id": 168, "name": "profileName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1541": {
    "id": 1541,
    "name": "piAnalogOutputExt",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1541, "id": 0, "name": "ackedTransitions", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1541, "id": 17, "name": "notificationClass", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "25": { "cluster": 1541, "id": 25, "name": "deadband", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "35": { "cluster": 1541, "id": 35, "name": "eventEnable", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "36": { "cluster": 1541, "id": 36, "name": "eventState", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "45": { "cluster": 1541, "id": 45, "name": "highLimit", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "52": { "cluster": 1541, "id": 52, "name": "limitEnable", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "59": { "cluster": 1541, "id": 59, "name": "lowLimit", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "72": { "cluster": 1541, "id": 72, "name": "notifyType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "113": { "cluster": 1541, "id": 113, "name": "timeDelay", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "130": { "cluster": 1541, "id": 130, "name": "eventTimeStamps", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1542": {
    "id": 1542,
    "name": "piAnalogValueReg",
    "specific": null,
    "attributes": {
      "22": { "cluster": 1542, "id": 22, "name": "covIncrement", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "75": { "cluster": 1542, "id": 75, "name": "objectId", "type": "bacOid", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "77": { "cluster": 1542, "id": 77, "name": "objectName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "79": { "cluster": 1542, "id": 79, "name": "objectType", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "168": { "cluster": 1542, "id": 168, "name": "profileName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1543": {
    "id": 1543,
    "name": "piAnalogValueExt",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1543, "id": 0, "name": "ackedTransitions", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1543, "id": 17, "name": "notificationClass", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "25": { "cluster": 1543, "id": 25, "name": "deadband", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "35": { "cluster": 1543, "id": 35, "name": "eventEnable", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "36": { "cluster": 1543, "id": 36, "name": "eventState", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "45": { "cluster": 1543, "id": 45, "name": "highLimit", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "52": { "cluster": 1543, "id": 52, "name": "limitEnable", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "59": { "cluster": 1543, "id": 59, "name": "lowLimit", "type": "singlePrec", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "72": { "cluster": 1543, "id": 72, "name": "notifyType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "113": { "cluster": 1543, "id": 113, "name": "timeDelay", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "130": { "cluster": 1543, "id": 130, "name": "eventTimeStamps", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1544": {
    "id": 1544,
    "name": "piBinaryInputReg",
    "specific": null,
    "attributes": {
      "15": { "cluster": 1544, "id": 15, "name": "changeOfStateCount", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 1544, "id": 16, "name": "changeOfStateTime", "type": "struct", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "31": { "cluster": 1544, "id": 31, "name": "deviceType", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "33": { "cluster": 1544, "id": 33, "name": "elapsedActiveTime", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "75": { "cluster": 1544, "id": 75, "name": "objectIdentifier", "type": "bacOid", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "77": { "cluster": 1544, "id": 77, "name": "objectName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "79": { "cluster": 1544, "id": 79, "name": "objectType", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "114": { "cluster": 1544, "id": 114, "name": "timeOfATReset", "type": "struct", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "115": { "cluster": 1544, "id": 115, "name": "timeOfSCReset", "type": "struct", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "168": { "cluster": 1544, "id": 168, "name": "profileName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1545": {
    "id": 1545,
    "name": "piBinaryInputExt",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1545, "id": 0, "name": "ackedTransitions", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 1545, "id": 6, "name": "alarmValue", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1545, "id": 17, "name": "notificationClass", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "35": { "cluster": 1545, "id": 35, "name": "eventEnable", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "36": { "cluster": 1545, "id": 36, "name": "eventState", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "72": { "cluster": 1545, "id": 72, "name": "notifyType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "113": { "cluster": 1545, "id": 113, "name": "timeDelay", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "130": { "cluster": 1545, "id": 130, "name": "eventTimeStamps", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1546": {
    "id": 1546,
    "name": "piBinaryOutputReg",
    "specific": null,
    "attributes": {
      "15": { "cluster": 1546, "id": 15, "name": "changeOfStateCount", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 1546, "id": 16, "name": "changeOfStateTime", "type": "struct", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "31": { "cluster": 1546, "id": 31, "name": "deviceType", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "33": { "cluster": 1546, "id": 33, "name": "elapsedActiveTime", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "40": { "cluster": 1546, "id": 40, "name": "feedBackValue", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "75": { "cluster": 1546, "id": 75, "name": "objectIdentifier", "type": "bacOid", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "77": { "cluster": 1546, "id": 77, "name": "objectName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "79": { "cluster": 1546, "id": 79, "name": "objectType", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "114": { "cluster": 1546, "id": 114, "name": "timeOfATReset", "type": "struct", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "115": { "cluster": 1546, "id": 115, "name": "timeOfSCReset", "type": "struct", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "168": { "cluster": 1546, "id": 168, "name": "profileName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1547": {
    "id": 1547,
    "name": "piBinaryOutputExt",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1547, "id": 0, "name": "ackedTransitions", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1547, "id": 17, "name": "notificationClass", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "35": { "cluster": 1547, "id": 35, "name": "eventEnable", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "36": { "cluster": 1547, "id": 36, "name": "eventState", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "72": { "cluster": 1547, "id": 72, "name": "notifyType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "113": { "cluster": 1547, "id": 113, "name": "timeDelay", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "130": { "cluster": 1547, "id": 130, "name": "eventTimeStamps", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1548": {
    "id": 1548,
    "name": "piBinaryValueReg",
    "specific": null,
    "attributes": {
      "15": { "cluster": 1548, "id": 15, "name": "changeOfStateCount", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 1548, "id": 16, "name": "changeOfStateTime", "type": "struct", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "33": { "cluster": 1548, "id": 33, "name": "elapsedActiveTime", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "75": { "cluster": 1548, "id": 75, "name": "objectIdentifier", "type": "bacOid", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "77": { "cluster": 1548, "id": 77, "name": "objectName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "79": { "cluster": 1548, "id": 79, "name": "objectType", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "114": { "cluster": 1548, "id": 114, "name": "timeOfATReset", "type": "struct", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "115": { "cluster": 1548, "id": 115, "name": "timeOfSCReset", "type": "struct", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "168": { "cluster": 1548, "id": 168, "name": "profileName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1549": {
    "id": 1549,
    "name": "piBinaryValueExt",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1549, "id": 0, "name": "ackedTransitions", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 1549, "id": 6, "name": "alarmValue", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1549, "id": 17, "name": "notificationClass", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "35": { "cluster": 1549, "id": 35, "name": "eventEnable", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "36": { "cluster": 1549, "id": 36, "name": "eventState", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "72": { "cluster": 1549, "id": 72, "name": "notifyType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "113": { "cluster": 1549, "id": 113, "name": "timeDelay", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "130": { "cluster": 1549, "id": 130, "name": "eventTimeStamps", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1550": {
    "id": 1550,
    "name": "piMultistateInputReg",
    "specific": null,
    "attributes": {
      "31": { "cluster": 1550, "id": 31, "name": "deviceType", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "75": { "cluster": 1550, "id": 75, "name": "objectId", "type": "bacOid", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "77": { "cluster": 1550, "id": 77, "name": "objectName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "79": { "cluster": 1550, "id": 79, "name": "objectType", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "168": { "cluster": 1550, "id": 168, "name": "profileName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1551": {
    "id": 1551,
    "name": "piMultistateInputExt",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1551, "id": 0, "name": "ackedTransitions", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 1551, "id": 6, "name": "alarmValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1551, "id": 17, "name": "notificationClass", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "35": { "cluster": 1551, "id": 35, "name": "eventEnable", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "36": { "cluster": 1551, "id": 36, "name": "eventState", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "37": { "cluster": 1551, "id": 37, "name": "faultValues", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "72": { "cluster": 1551, "id": 72, "name": "notifyType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "113": { "cluster": 1551, "id": 113, "name": "timeDelay", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "130": { "cluster": 1551, "id": 130, "name": "eventTimeStamps", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1552": {
    "id": 1552,
    "name": "piMultistateOutputReg",
    "specific": null,
    "attributes": {
      "31": { "cluster": 1552, "id": 31, "name": "deviceType", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "40": { "cluster": 1552, "id": 40, "name": "feedBackValue", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "75": { "cluster": 1552, "id": 75, "name": "objectId", "type": "bacOid", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "77": { "cluster": 1552, "id": 77, "name": "objectName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "79": { "cluster": 1552, "id": 79, "name": "objectType", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "168": { "cluster": 1552, "id": 168, "name": "profileName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1553": {
    "id": 1553,
    "name": "piMultistateOutputExt",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1553, "id": 0, "name": "ackedTransitions", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1553, "id": 17, "name": "notificationClass", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "35": { "cluster": 1553, "id": 35, "name": "eventEnable", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "36": { "cluster": 1553, "id": 36, "name": "eventState", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "72": { "cluster": 1553, "id": 72, "name": "notifyType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "113": { "cluster": 1553, "id": 113, "name": "timeDelay", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "130": { "cluster": 1553, "id": 130, "name": "eventTimeStamps", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1554": {
    "id": 1554,
    "name": "piMultistateValueReg",
    "specific": null,
    "attributes": {
      "75": { "cluster": 1554, "id": 75, "name": "objectId", "type": "bacOid", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "77": { "cluster": 1554, "id": 77, "name": "objectName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "79": { "cluster": 1554, "id": 79, "name": "objectType", "type": "enum16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "168": { "cluster": 1554, "id": 168, "name": "profileName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1555": {
    "id": 1555,
    "name": "piMultistateValueExt",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1555, "id": 0, "name": "ackedTransitions", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 1555, "id": 6, "name": "alarmValue", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1555, "id": 17, "name": "notificationClass", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "35": { "cluster": 1555, "id": 35, "name": "eventEnable", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "36": { "cluster": 1555, "id": 36, "name": "eventState", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "37": { "cluster": 1555, "id": 37, "name": "faultValues", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "72": { "cluster": 1555, "id": 72, "name": "notifyType", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "113": { "cluster": 1555, "id": 113, "name": "timeDelay", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "130": { "cluster": 1555, "id": 130, "name": "eventTimeStamps", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "1556": {
    "id": 1556,
    "name": "pi11073ProtocolTunnel",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1556, "id": 0, "name": "deviceidList", "type": "array", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 1556, "id": 1, "name": "managerTarget", "type": "ieeeAddr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 1556, "id": 2, "name": "managerEndpoint", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 1556, "id": 3, "name": "connected", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 1556, "id": 4, "name": "preemptible", "type": "boolean", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 1556, "id": 5, "name": "idleTimeout", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "transferApdu" },
      "1": { "id": 1, "name": "connectReq" },
      "2": { "id": 2, "name": "disconnectReq" },
      "3": { "id": 3, "name": "connectStatusNoti" }
    },
    "responses": {}
  },
  "1792": {
    "id": 1792,
    "name": "sePrice",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "1793": {
    "id": 1793,
    "name": "seDrlc",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "1794": {
    "id": 1794,
    "name": "seMetering",
    "specific": null,
    "attributes": {
      "0": { "cluster": 1794, "id": 0, "name": "notification_Control_Flags", "type": "bitmap32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 1794, "id": 1, "name": "notification_Flags", "type": "bitmap32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2": { "cluster": 1794, "id": 2, "name": "price_Notification_Flags", "type": "bitmap32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "3": { "cluster": 1794, "id": 3, "name": "calendar_Notification_Flags", "type": "bitmap32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 1794, "id": 4, "name": "pre_Pay_Notification_Flags", "type": "bitmap32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 1794, "id": 5, "name": "device_Management_Flags", "type": "bitmap32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 1794, "id": 6, "name": "powerFactor", "type": "int8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "7": { "cluster": 1794, "id": 7, "name": "readingSnapshotTime", "type": "utc", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "8": { "cluster": 1794, "id": 8, "name": "currentMaxDemandDeliverdTime", "type": "utc", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "9": { "cluster": 1794, "id": 9, "name": "currentMaxDemandReceivedTime", "type": "utc", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "10": { "cluster": 1794, "id": 10, "name": "defaultUpdatePeriod", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "11": { "cluster": 1794, "id": 11, "name": "fastPollUpdatePeriod", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "12": { "cluster": 1794, "id": 12, "name": "currentBlockPeriodConsumpDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "13": { "cluster": 1794, "id": 13, "name": "dailyConsumpTarget", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "14": { "cluster": 1794, "id": 14, "name": "currentBlock", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "15": { "cluster": 1794, "id": 15, "name": "profileIntervalPeriod", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 1794, "id": 16, "name": "intervalReadReportingPeriod", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 1794, "id": 17, "name": "presetReadingTime", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 1794, "id": 18, "name": "volumePerReport", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 1794, "id": 19, "name": "flowRestriction", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "20": { "cluster": 1794, "id": 20, "name": "supplyStatus", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "21": { "cluster": 1794, "id": 21, "name": "currentInEnergyCarrierSumm", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "22": { "cluster": 1794, "id": 22, "name": "currentOutEnergyCarrierSumm", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "23": { "cluster": 1794, "id": 23, "name": "inletTempreature", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "24": { "cluster": 1794, "id": 24, "name": "outletTempreature", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "25": { "cluster": 1794, "id": 25, "name": "controlTempreature", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "26": { "cluster": 1794, "id": 26, "name": "currentInEnergyCarrierDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "27": { "cluster": 1794, "id": 27, "name": "currentOutEnergyCarrierDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "29": { "cluster": 1794, "id": 29, "name": "currentBlockPeriodConsumpReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "30": { "cluster": 1794, "id": 30, "name": "currentBlockReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "256": { "cluster": 1794, "id": 256, "name": "changeReportingProfile", "type": "unknown", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "257": { "cluster": 1794, "id": 257, "name": "currentTier1SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "258": { "cluster": 1794, "id": 258, "name": "currentTier2SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "259": { "cluster": 1794, "id": 259, "name": "currentTier2SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "260": { "cluster": 1794, "id": 260, "name": "currentTier3SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "261": { "cluster": 1794, "id": 261, "name": "currentTier3SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "262": { "cluster": 1794, "id": 262, "name": "currentTier4SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "263": { "cluster": 1794, "id": 263, "name": "currentTier4SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "264": { "cluster": 1794, "id": 264, "name": "currentTier5SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "265": { "cluster": 1794, "id": 265, "name": "currentTier5SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "266": { "cluster": 1794, "id": 266, "name": "currentTier6SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "267": { "cluster": 1794, "id": 267, "name": "currentTier6SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "268": { "cluster": 1794, "id": 268, "name": "currentTier7SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "269": { "cluster": 1794, "id": 269, "name": "currentTier7SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "270": { "cluster": 1794, "id": 270, "name": "currentTier8SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "271": { "cluster": 1794, "id": 271, "name": "currentTier8SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "272": { "cluster": 1794, "id": 272, "name": "currentTier9SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "273": { "cluster": 1794, "id": 273, "name": "currentTier9SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "274": { "cluster": 1794, "id": 274, "name": "currentTier10SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "275": { "cluster": 1794, "id": 275, "name": "currentTier10SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "276": { "cluster": 1794, "id": 276, "name": "currentTier11SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "277": { "cluster": 1794, "id": 277, "name": "currentTier11SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "278": { "cluster": 1794, "id": 278, "name": "currentTier12SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "279": { "cluster": 1794, "id": 279, "name": "currentTier12SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "280": { "cluster": 1794, "id": 280, "name": "currentTier13SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "281": { "cluster": 1794, "id": 281, "name": "currentTier13SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "282": { "cluster": 1794, "id": 282, "name": "currentTier14SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "283": { "cluster": 1794, "id": 283, "name": "currentTier14SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "284": { "cluster": 1794, "id": 284, "name": "currentTier15SummDelivered", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "285": { "cluster": 1794, "id": 285, "name": "currentTier15SummReceived", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "512": { "cluster": 1794, "id": 512, "name": "status", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "513": { "cluster": 1794, "id": 513, "name": "remainingBattLife", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "514": { "cluster": 1794, "id": 514, "name": "hoursInOperation", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "515": { "cluster": 1794, "id": 515, "name": "hoursInFault", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "516": { "cluster": 1794, "id": 516, "name": "extendedStatus", "type": "bitmap64", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "768": { "cluster": 1794, "id": 768, "name": "unitOfMeasure", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "769": { "cluster": 1794, "id": 769, "name": "multiplier", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "770": { "cluster": 1794, "id": 770, "name": "divisor", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "771": { "cluster": 1794, "id": 771, "name": "summaFormatting", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "772": { "cluster": 1794, "id": 772, "name": "demandFormatting", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "773": { "cluster": 1794, "id": 773, "name": "historicalConsumpFormatting", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "774": { "cluster": 1794, "id": 774, "name": "meteringDeviceType", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "775": { "cluster": 1794, "id": 775, "name": "siteId", "type": "octetStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "776": { "cluster": 1794, "id": 776, "name": "meterSerialNumber", "type": "octetStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "777": { "cluster": 1794, "id": 777, "name": "energyCarrierUnitOfMeas", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "778": { "cluster": 1794, "id": 778, "name": "energyCarrierSummFormatting", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "779": { "cluster": 1794, "id": 779, "name": "energyCarrierDemandFormatting", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "780": { "cluster": 1794, "id": 780, "name": "temperatureUnitOfMeas", "type": "enum8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "781": { "cluster": 1794, "id": 781, "name": "temperatureFormatting", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "782": { "cluster": 1794, "id": 782, "name": "moduleSerialNumber", "type": "octetStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "783": { "cluster": 1794, "id": 783, "name": "operatingTariffLevel", "type": "octetStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1024": { "cluster": 1794, "id": 1024, "name": "instantaneousDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1025": { "cluster": 1794, "id": 1025, "name": "currentdayConsumpDelivered", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1026": { "cluster": 1794, "id": 1026, "name": "currentdayConsumpReceived", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1027": { "cluster": 1794, "id": 1027, "name": "previousdayConsumpDelivered", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1028": { "cluster": 1794, "id": 1028, "name": "previousdayConsumpReceived", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1029": { "cluster": 1794, "id": 1029, "name": "curPartProfileIntStartTimeDelivered", "type": "utc", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1030": { "cluster": 1794, "id": 1030, "name": "curPartProfileIntStartTime_Received", "type": "utc", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1031": { "cluster": 1794, "id": 1031, "name": "curPartProfileIntValueDelivered", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1032": { "cluster": 1794, "id": 1032, "name": "curPartProfileIntValueReceived", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1033": { "cluster": 1794, "id": 1033, "name": "currentDayMaxPressure", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1034": { "cluster": 1794, "id": 1034, "name": "currentDayMinPressure", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1035": { "cluster": 1794, "id": 1035, "name": "previousDayMaxPressure", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1036": { "cluster": 1794, "id": 1036, "name": "previousDayMinPressure", "type": "uint48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1037": { "cluster": 1794, "id": 1037, "name": "currentDayMaxDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1038": { "cluster": 1794, "id": 1038, "name": "previousDayMaxDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1039": { "cluster": 1794, "id": 1039, "name": "currentMonthMaxDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1040": { "cluster": 1794, "id": 1040, "name": "currentYearMaxDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1041": { "cluster": 1794, "id": 1041, "name": "currentdayMaxEnergyCarrDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1042": { "cluster": 1794, "id": 1042, "name": "previousdayMaxEnergyCarrDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1043": { "cluster": 1794, "id": 1043, "name": "curMonthMaxEnergyCarrDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1044": { "cluster": 1794, "id": 1044, "name": "curMonthMinEnergyCarrDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1045": { "cluster": 1794, "id": 1045, "name": "curYearMaxEnergyCarrDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1046": { "cluster": 1794, "id": 1046, "name": "curYearMinEnergyCarrDemand", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1280": { "cluster": 1794, "id": 1280, "name": "maxNumberOfPeriodsDelivered", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1536": { "cluster": 1794, "id": 1536, "name": "current_Demand_Delivered", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1537": { "cluster": 1794, "id": 1537, "name": "demandLimit", "type": "uint24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1538": { "cluster": 1794, "id": 1538, "name": "demandIntegrationPeriod", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1539": { "cluster": 1794, "id": 1539, "name": "numberOfDemandSubintervals", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1540": { "cluster": 1794, "id": 1540, "name": "demandLimitArmDuration", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2048": { "cluster": 1794, "id": 2048, "name": "genericAlarmMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2049": { "cluster": 1794, "id": 2049, "name": "electricityAlarmMask", "type": "bitmap32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2050": { "cluster": 1794, "id": 2050, "name": "genFlowPressureAlarmMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2051": { "cluster": 1794, "id": 2051, "name": "waterSpecificAlarmMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2052": { "cluster": 1794, "id": 2052, "name": "heatCoolSpecificAlarmMASK", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2053": { "cluster": 1794, "id": 2053, "name": "gasSpecificAlarmMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2054": { "cluster": 1794, "id": 2054, "name": "extendedGenericAlarmMask", "type": "bitmap48", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2055": { "cluster": 1794, "id": 2055, "name": "manufactureAlarmMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2560": { "cluster": 1794, "id": 2560, "name": "billToDate", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2561": { "cluster": 1794, "id": 2561, "name": "billToDateTimeStamp", "type": "utc", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2562": { "cluster": 1794, "id": 2562, "name": "projectedBill", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2563": { "cluster": 1794, "id": 2563, "name": "projectedBillTimeStamp", "type": "utc", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "getProfile" },
      "1": { "id": 1, "name": "reqMirror" },
      "2": { "id": 2, "name": "mirrorRem" },
      "3": { "id": 3, "name": "reqFastPollMode" },
      "4": { "id": 4, "name": "getSnapshot" },
      "5": { "id": 5, "name": "takeSnapshot" },
      "6": { "id": 6, "name": "mirrorReportAttrRsp" }
    },
    "responses": {
      "0": { "id": 0, "name": "getProfileRsp" },
      "1": { "id": 1, "name": "reqMirrorRsp" },
      "2": { "id": 2, "name": "mirrorRemRsp" },
      "3": { "id": 3, "name": "reqFastPollModeRsp" },
      "4": { "id": 4, "name": "getSnapshotRsp" }
    }
  },
  "1795": {
    "id": 1795,
    "name": "seMessaging",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "1796": {
    "id": 1796,
    "name": "seTunneling",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "1797": {
    "id": 1797,
    "name": "sePrepayment",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "1798": {
    "id": 1798,
    "name": "seEnergyMgmt",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "1799": {
    "id": 1799,
    "name": "seCalendar",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "1800": {
    "id": 1800,
    "name": "seDeviceMgmt",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "1801": {
    "id": 1801,
    "name": "seEvents",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "1802": {
    "id": 1802,
    "name": "seMduPairing",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "2048": {
    "id": 2048,
    "name": "seKeyEstablishment",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "2816": {
    "id": 2816,
    "name": "haApplianceIdentification",
    "specific": null,
    "attributes": {
      "0": { "cluster": 2816, "id": 0, "name": "basicIdentification", "type": "uint56", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "16": { "cluster": 2816, "id": 16, "name": "companyName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "17": { "cluster": 2816, "id": 17, "name": "companyId", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "18": { "cluster": 2816, "id": 18, "name": "brandName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "19": { "cluster": 2816, "id": 19, "name": "brandId", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "20": { "cluster": 2816, "id": 20, "name": "model", "type": "octetStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "21": { "cluster": 2816, "id": 21, "name": "partNumber", "type": "octetStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "22": { "cluster": 2816, "id": 22, "name": "productRevision", "type": "octetStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "23": { "cluster": 2816, "id": 23, "name": "softwareRevision", "type": "octetStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "24": { "cluster": 2816, "id": 24, "name": "productTypeName", "type": "octetStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "25": { "cluster": 2816, "id": 25, "name": "productTypeId", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "26": { "cluster": 2816, "id": 26, "name": "cecedSpecificationVersion", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "2817": {
    "id": 2817,
    "name": "haMeterIdentification",
    "specific": null,
    "attributes": {
      "0": { "cluster": 2817, "id": 0, "name": "companyName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 2817, "id": 1, "name": "meterTypeId", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "4": { "cluster": 2817, "id": 4, "name": "dataQualityId", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "5": { "cluster": 2817, "id": 5, "name": "customerName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "6": { "cluster": 2817, "id": 6, "name": "model", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "7": { "cluster": 2817, "id": 7, "name": "partNumber", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "8": { "cluster": 2817, "id": 8, "name": "productRevision", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "10": { "cluster": 2817, "id": 10, "name": "softwareRevision", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "11": { "cluster": 2817, "id": 11, "name": "utilityName", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "12": { "cluster": 2817, "id": 12, "name": "pod", "type": "charStr", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "13": { "cluster": 2817, "id": 13, "name": "availablePower", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "14": { "cluster": 2817, "id": 14, "name": "powerThreshold", "type": "int24", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "2818": {
    "id": 2818,
    "name": "haApplianceEventsAlerts",
    "specific": null,
    "attributes": {},
    "commands": {
      "0": { "id": 0, "name": "getAlerts" }
    },
    "responses": {
      "0": { "id": 0, "name": "getAlertsRsp" },
      "1": { "id": 1, "name": "alertsNotification" },
      "2": { "id": 2, "name": "eventNotification" }
    }
  },
  "2819": {
    "id": 2819,
    "name": "haApplianceStatistics",
    "specific": null,
    "attributes": {
      "0": { "cluster": 2819, "id": 0, "name": "logMaxSize", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 2819, "id": 1, "name": "logQueueMaxSize", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "log" },
      "1": { "id": 1, "name": "logQueue" }
    },
    "responses": {
      "0": { "id": 0, "name": "logNotification" },
      "1": { "id": 1, "name": "logRsp" },
      "2": { "id": 2, "name": "logQueueRsp" },
      "3": { "id": 3, "name": "statisticsAvailable" }
    }
  },
  "2820": {
    "id": 2820,
    "name": "haElectricalMeasurement",
    "specific": null,
    "attributes": {
      "0": { "cluster": 2820, "id": 0, "name": "measurementType", "type": "bitmap32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "256": { "cluster": 2820, "id": 256, "name": "dcVoltage", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "257": { "cluster": 2820, "id": 257, "name": "dcVoltageMin", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "258": { "cluster": 2820, "id": 258, "name": "dcvoltagemax", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "259": { "cluster": 2820, "id": 259, "name": "dcCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "260": { "cluster": 2820, "id": 260, "name": "dcCurrentMin", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "261": { "cluster": 2820, "id": 261, "name": "dcCurrentMax", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "262": { "cluster": 2820, "id": 262, "name": "dcPower", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "263": { "cluster": 2820, "id": 263, "name": "dcPowerMin", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "264": { "cluster": 2820, "id": 264, "name": "dcPowerMax", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "512": { "cluster": 2820, "id": 512, "name": "dcVoltageMultiplier", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "513": { "cluster": 2820, "id": 513, "name": "dcVoltageDivisor", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "514": { "cluster": 2820, "id": 514, "name": "dcCurrentMultiplier", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "515": { "cluster": 2820, "id": 515, "name": "dcCurrentDivisor", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "516": { "cluster": 2820, "id": 516, "name": "dcPowerMultiplier", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "517": { "cluster": 2820, "id": 517, "name": "dcPowerDivisor", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "768": { "cluster": 2820, "id": 768, "name": "acFrequency", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "769": { "cluster": 2820, "id": 769, "name": "acFrequencyMin", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "770": { "cluster": 2820, "id": 770, "name": "acFrequencyMax", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "771": { "cluster": 2820, "id": 771, "name": "neutralCurrent", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "772": { "cluster": 2820, "id": 772, "name": "totalActivePower", "type": "int32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "773": { "cluster": 2820, "id": 773, "name": "totalReactivePower", "type": "int32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "774": { "cluster": 2820, "id": 774, "name": "totalApparentPower", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "775": { "cluster": 2820, "id": 775, "name": "meas1stHarmonicCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "776": { "cluster": 2820, "id": 776, "name": "meas3rdHarmonicCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "777": { "cluster": 2820, "id": 777, "name": "meas5thHarmonicCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "778": { "cluster": 2820, "id": 778, "name": "meas7thHarmonicCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "779": { "cluster": 2820, "id": 779, "name": "meas9thHarmonicCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "780": { "cluster": 2820, "id": 780, "name": "meas11thHarmonicCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "781": { "cluster": 2820, "id": 781, "name": "measPhase1stHarmonicCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "782": { "cluster": 2820, "id": 782, "name": "measPhase3rdHarmonicCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "783": { "cluster": 2820, "id": 783, "name": "measPhase5thHarmonicCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "784": { "cluster": 2820, "id": 784, "name": "measPhase7thHarmonicCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "785": { "cluster": 2820, "id": 785, "name": "measPhase9thHarmonicCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "786": { "cluster": 2820, "id": 786, "name": "measPhase11thHarmonicCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1024": { "cluster": 2820, "id": 1024, "name": "acFrequencyMultiplier", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1025": { "cluster": 2820, "id": 1025, "name": "acFrequencyDivisor", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1026": { "cluster": 2820, "id": 1026, "name": "powerMultiplier", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1027": { "cluster": 2820, "id": 1027, "name": "powerDivisor", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1028": { "cluster": 2820, "id": 1028, "name": "harmonicCurrentMultiplier", "type": "int8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1029": { "cluster": 2820, "id": 1029, "name": "phaseHarmonicCurrentMultiplier", "type": "int8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1280": { "cluster": 2820, "id": 1280, "name": "instantaneousVoltage", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1281": { "cluster": 2820, "id": 1281, "name": "instantaneousLineCurrent", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1282": { "cluster": 2820, "id": 1282, "name": "instantaneousActiveCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1283": { "cluster": 2820, "id": 1283, "name": "instantaneousReactiveCurrent", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1284": { "cluster": 2820, "id": 1284, "name": "instantaneousPower", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1285": { "cluster": 2820, "id": 1285, "name": "rmsVoltage", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1286": { "cluster": 2820, "id": 1286, "name": "rmsVoltageMin", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1287": { "cluster": 2820, "id": 1287, "name": "rmsVoltageMax", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1288": { "cluster": 2820, "id": 1288, "name": "rmsCurrent", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1289": { "cluster": 2820, "id": 1289, "name": "rmsCurrentMin", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1290": { "cluster": 2820, "id": 1290, "name": "rmsCurrentMax", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1291": { "cluster": 2820, "id": 1291, "name": "activePower", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1292": { "cluster": 2820, "id": 1292, "name": "activePowerMin", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1293": { "cluster": 2820, "id": 1293, "name": "activePowerMax", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1294": { "cluster": 2820, "id": 1294, "name": "reactivePower", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1295": { "cluster": 2820, "id": 1295, "name": "apparentPower", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1296": { "cluster": 2820, "id": 1296, "name": "powerFactor", "type": "int8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1297": { "cluster": 2820, "id": 1297, "name": "averageRmsVoltageMeasPeriod", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1298": { "cluster": 2820, "id": 1298, "name": "averageRmsOverVoltageCounter", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1299": { "cluster": 2820, "id": 1299, "name": "averageRmsUnderVoltageCounter", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1300": { "cluster": 2820, "id": 1300, "name": "rmsExtremeOverVoltagePeriod", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1301": { "cluster": 2820, "id": 1301, "name": "rmsExtremeUnderVoltagePeriod", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1302": { "cluster": 2820, "id": 1302, "name": "rmsVoltageSagPeriod", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1303": { "cluster": 2820, "id": 1303, "name": "rmsVoltageSwellPeriod", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1536": { "cluster": 2820, "id": 1536, "name": "acVoltageMultiplier", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1537": { "cluster": 2820, "id": 1537, "name": "acVoltageDivisor", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1538": { "cluster": 2820, "id": 1538, "name": "acCurrentMultiplier", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1539": { "cluster": 2820, "id": 1539, "name": "acCurrentDivisor", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1540": { "cluster": 2820, "id": 1540, "name": "acPowerMultiplier", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1541": { "cluster": 2820, "id": 1541, "name": "acPowerDivisor", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1792": { "cluster": 2820, "id": 1792, "name": "dcOverloadAlarmsMask", "type": "bitmap8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1793": { "cluster": 2820, "id": 1793, "name": "dcVoltageOverload", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1794": { "cluster": 2820, "id": 1794, "name": "dcCurrentOverload", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2048": { "cluster": 2820, "id": 2048, "name": "acAlarmsMask", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2049": { "cluster": 2820, "id": 2049, "name": "acVoltageOverload", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2050": { "cluster": 2820, "id": 2050, "name": "acCurrentOverload", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2051": { "cluster": 2820, "id": 2051, "name": "acActivePowerOverload", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2052": { "cluster": 2820, "id": 2052, "name": "acReactivePowerOverload", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2053": { "cluster": 2820, "id": 2053, "name": "averageRmsOverVoltage", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2054": { "cluster": 2820, "id": 2054, "name": "averageRmsUnderVoltage", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2055": { "cluster": 2820, "id": 2055, "name": "rmsExtremeOverVoltage", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2056": { "cluster": 2820, "id": 2056, "name": "rmsExtremeUnderVoltage", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2057": { "cluster": 2820, "id": 2057, "name": "rmsVoltageSag", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2058": { "cluster": 2820, "id": 2058, "name": "rmsVoltageSwell", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2305": { "cluster": 2820, "id": 2305, "name": "lineCurrentPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2306": { "cluster": 2820, "id": 2306, "name": "activeCurrentPhB", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2307": { "cluster": 2820, "id": 2307, "name": "reactiveCurrentPhB", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2309": { "cluster": 2820, "id": 2309, "name": "rmsVoltagePhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2310": { "cluster": 2820, "id": 2310, "name": "rmsVoltageMinPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2311": { "cluster": 2820, "id": 2311, "name": "rmsVoltageMaxPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2312": { "cluster": 2820, "id": 2312, "name": "rmsCurrentPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2313": { "cluster": 2820, "id": 2313, "name": "rmsCurrentMinPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2314": { "cluster": 2820, "id": 2314, "name": "rmsCurrentMaxPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2315": { "cluster": 2820, "id": 2315, "name": "activePowerPhB", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2316": { "cluster": 2820, "id": 2316, "name": "activePowerMinPhB", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2317": { "cluster": 2820, "id": 2317, "name": "activePowerMaxPhB", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2318": { "cluster": 2820, "id": 2318, "name": "reactivePowerPhB", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2319": { "cluster": 2820, "id": 2319, "name": "apparentPowerPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2320": { "cluster": 2820, "id": 2320, "name": "powerFactorPhB", "type": "int8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2321": { "cluster": 2820, "id": 2321, "name": "averageRmsVoltageMeasurePeriodPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2322": { "cluster": 2820, "id": 2322, "name": "averageRmsOverVoltageCounterPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2323": { "cluster": 2820, "id": 2323, "name": "averageUnderVoltageCounterPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2324": { "cluster": 2820, "id": 2324, "name": "rmsExtremeOverVoltagePeriodPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2325": { "cluster": 2820, "id": 2325, "name": "rmsExtremeUnderVoltagePeriodPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2326": { "cluster": 2820, "id": 2326, "name": "rmsVoltageSagPeriodPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2327": { "cluster": 2820, "id": 2327, "name": "rmsVoltageSwellPeriodPhB", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2561": { "cluster": 2820, "id": 2561, "name": "lineCurrentPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2562": { "cluster": 2820, "id": 2562, "name": "activeCurrentPhC", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2563": { "cluster": 2820, "id": 2563, "name": "reactiveCurrentPhC", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2565": { "cluster": 2820, "id": 2565, "name": "rmsVoltagePhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2566": { "cluster": 2820, "id": 2566, "name": "rmsVoltageMinPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2567": { "cluster": 2820, "id": 2567, "name": "rmsVoltageMaxPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2568": { "cluster": 2820, "id": 2568, "name": "rmsCurrentPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2569": { "cluster": 2820, "id": 2569, "name": "rmsCurrentMinPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2570": { "cluster": 2820, "id": 2570, "name": "rmsCurrentMaxPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2571": { "cluster": 2820, "id": 2571, "name": "activePowerPhC", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2572": { "cluster": 2820, "id": 2572, "name": "activePowerMinPhC", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2573": { "cluster": 2820, "id": 2573, "name": "activePowerMaxPhC", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2574": { "cluster": 2820, "id": 2574, "name": "reactivePowerPhC", "type": "int16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2575": { "cluster": 2820, "id": 2575, "name": "apparentPowerPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2576": { "cluster": 2820, "id": 2576, "name": "powerFactorPhC", "type": "int8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2577": { "cluster": 2820, "id": 2577, "name": "averageRmsVoltageMeasPeriodPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2578": { "cluster": 2820, "id": 2578, "name": "averageRmsOverVoltageCounterPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2579": { "cluster": 2820, "id": 2579, "name": "averageUnderVoltageCounterPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2580": { "cluster": 2820, "id": 2580, "name": "rmsExtremeOverVoltagePeriodPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2581": { "cluster": 2820, "id": 2581, "name": "rmsExtremeUnderVoltagePeriodPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2582": { "cluster": 2820, "id": 2582, "name": "rmsVoltageSagPeriodPhC", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "2583": { "cluster": 2820, "id": 2583, "name": "rmsVoltageSwellPeriodPh_C", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {
      "0": { "id": 0, "name": "getProfileInfo" },
      "1": { "id": 1, "name": "getMeasurementProfile" }
    },
    "responses": {
      "0": { "id": 0, "name": "getProfileInfoRsp" },
      "1": { "id": 1, "name": "getMeasurementProfileRsp" }
    }
  },
  "2821": {
    "id": 2821,
    "name": "haDiagnostic",
    "specific": null,
    "attributes": {
      "0": { "cluster": 2821, "id": 0, "name": "numberOfResets", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "1": { "cluster": 2821, "id": 1, "name": "persistentMemoryWrites", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "256": { "cluster": 2821, "id": 256, "name": "macRxBcast", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "257": { "cluster": 2821, "id": 257, "name": "macTxBcast", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "258": { "cluster": 2821, "id": 258, "name": "macRxUcast", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "259": { "cluster": 2821, "id": 259, "name": "macTxUcast", "type": "uint32", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "260": { "cluster": 2821, "id": 260, "name": "macTxUcastRetry", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "261": { "cluster": 2821, "id": 261, "name": "macTxUcastFail", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "262": { "cluster": 2821, "id": 262, "name": "aPSRxBcast", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "263": { "cluster": 2821, "id": 263, "name": "aPSTxBcast", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "264": { "cluster": 2821, "id": 264, "name": "aPSRxUcast", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "265": { "cluster": 2821, "id": 265, "name": "aPSTxUcastSuccess", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "266": { "cluster": 2821, "id": 266, "name": "aPSTxUcastRetry", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "267": { "cluster": 2821, "id": 267, "name": "aPSTxUcastFail", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "268": { "cluster": 2821, "id": 268, "name": "routeDiscInitiated", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "269": { "cluster": 2821, "id": 269, "name": "neighborAdded", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "270": { "cluster": 2821, "id": 270, "name": "neighborRemoved", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "271": { "cluster": 2821, "id": 271, "name": "neighborStale", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "272": { "cluster": 2821, "id": 272, "name": "joinIndication", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "273": { "cluster": 2821, "id": 273, "name": "childMoved", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "274": { "cluster": 2821, "id": 274, "name": "nwkFcFailure", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "275": { "cluster": 2821, "id": 275, "name": "apsFcFailure", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "276": { "cluster": 2821, "id": 276, "name": "apsUnauthorizedKey", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "277": { "cluster": 2821, "id": 277, "name": "nwkDecryptFailures", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "278": { "cluster": 2821, "id": 278, "name": "apsDecryptFailures", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "279": { "cluster": 2821, "id": 279, "name": "packetBufferAllocateFailures", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "280": { "cluster": 2821, "id": 280, "name": "relayedUcast", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "281": { "cluster": 2821, "id": 281, "name": "phyToMacQueueLimitReached", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "282": { "cluster": 2821, "id": 282, "name": "packetValidateDropCount", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "283": { "cluster": 2821, "id": 283, "name": "averageMacRetryPerApsMessageSent", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "284": { "cluster": 2821, "id": 284, "name": "lastMessageLqi", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
      "285": { "cluster": 2821, "id": 285, "name": "lastMessageRssi", "type": "int8", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
    },
    "commands": {},
    "responses": {}
  },
  "4096": {
    "id": 4096,
    "name": "lightLink",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  },
  "65535": {
    "id": 65535,
    "name": "manuSpecificCluster",
    "specific": null,
    "attributes": {},
    "commands": {},
    "responses": {}
  }
}