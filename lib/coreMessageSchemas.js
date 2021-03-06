﻿//-----------------------------------------------------------------------------
//
//	coreMessageSchema.js
//
//	Copyright (c) 2015-2017 Bitdog LLC.
//
//	SOFTWARE NOTICE AND LICENSE
//
//	This file is part of bitdog-hub.
//
//	bitdog-hub is free software: you can redistribute it and/or modify
//	it under the terms of the GNU General Public License as published
//	by the Free Software Foundation, either version 3 of the License,
//	or (at your option) any later version.
//
//	bitdog-hub is distributed in the hope that it will be useful,
//	but WITHOUT ANY WARRANTY; without even the implied warranty of
//	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//	GNU General Public License for more details.
//
//	You should have received a copy of the GNU General Public License
//	along with bitdog-hub.  If not, see <http://www.gnu.org/licenses/>.
//
//-----------------------------------------------------------------------------

'use strict';

var constants = require('./constants.js');
var bitdogClient = require('bitdog-client');
var alarmMode = require('./alarm/alarmMode.js');


function CoreMessageSchemas() {
    var _zwaveRenameMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_RENAME)
        .addStringProperty('homeId', '')
        .addNumberProperty('nodeId', 0)
        .addStringProperty('name', '');

    var _zwaveAddNodeMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_ADD_NODE)
        .addStringProperty('homeId', '')
        .addBooleanProperty('withSecurity', true);

    var _zwaveNodeMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_NODE)
        .addStringProperty('homeId', '')
        .addObjectProperty('nodeInfo', null);

    var _zwaveControllerCommandMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_CONTROLLER_COMMAND)
        .addStringProperty('homeId', '');

    var _zwaveHealNetworkNodeMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_HEAL_NETWORK_NODE)
        .addStringProperty('homeId', '')
        .addNumberProperty('nodeId', 0)
        .addBooleanProperty('doReturnRoutes', true);

    var _zwaveNodeStatusMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_NODE_STATUS)
        .addStringProperty('homeId', '')
        .addNumberProperty('nodeId', 0)
        .addStringProperty('status', '');

    var _zwaveValueMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_VALUE)
        .addStringProperty('homeId', '')
        .addStringProperty('valueId', '')
        .addObjectProperty('value', null)
        .addStringProperty('nodeId', null)
        .addStringProperty('classId', null)
        .addStringProperty('instanceId', null)
        .addStringProperty('status', null)
        .addStringProperty('indexId', null)
        .addBooleanProperty('new',true)
        .addStringProperty('units', null);

    var _zwaveEnablePollingMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_ENABLE_POLLING)
        .addStringProperty('homeId', '')
        .addStringProperty('valueId', '')
        .addNumberProperty('intensity', 0);
    
    var _zwaveDisablePollingMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_DISABLE_POLLING)
        .addStringProperty('homeId', '')
        .addStringProperty('valueId', '');

    var _zwaveGetPollingIntensityMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_GET_POLLING_INTENSITY)
        .addStringProperty('homeId', '')
        .addStringProperty('valueId', '');

    var _zwaveGetPollingEnabledMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_GET_POLLING_ENABLED)
        .addStringProperty('homeId', '')
        .addStringProperty('valueId', '');

    var _zwaveActivateMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_ACTIVATE)
        .addStringProperty('homeId', '')
        .addNumberProperty('nodeId', 0)
        .addNumberProperty('classId', 0)
        .addNumberProperty('instanceId', 0)
        .addNumberProperty('index', 0);

    var _zwaveConfigurationUpdateMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_CONFIGURATION)
        .addStringProperty('homeId', '')
        .addNumberProperty('transactionId', 0);

    var _zwaveSetNodeMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_SET_NODE)
        .addStringProperty('homeId', '')
        .addNumberProperty('nodeId', 0);

    var _zwaveControllerModeMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_CONTROLLER_MODE)
        .addStringProperty('homeId', '')
        .addNumberProperty('nodeId', 0)
        .addStringProperty('mode', 0);

    var _zwaveSetNodeLevelMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_SET_NODE_LEVEL)
        .addStringProperty('homeId', '')
        .addNumberProperty('nodeId', 0)
        .addNumberProperty('value', 100);

    var _zwaveSetPercentageMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_SET_PERCENTAGE)
        .addStringProperty('homeId', '')
        .addStringProperty('valueId', '')
        .addNumberProperty('percentage', 100);

    var _zwaveSetTempertureMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_SET_TEMPERTURE)
        .addStringProperty('homeId', '')
        .addStringProperty('nodeId', '')
        .addNumberProperty('celsius', 21.1);

    var _zwaveIncrementDecrementTempertureMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_INCREMENT_DECREMENT_TEMPERTURE)
        .addStringProperty('homeId', '')
        .addStringProperty('nodeId', '')
        .addNumberProperty('celsius', 1);

    var _alarmArmAwayMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ALARM_ARM_AWAY)
        .addStringProperty('user', '');

    var _alarmArmStayMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ALARM_ARM_STAY)
        .addStringProperty('user', '');

    var _alarmDisarmMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ALARM_DISARM)
        .addStringProperty('user', '');

    var _alarmStatusMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ALARM_STATUS_CHANGED)
        .addStringProperty('alarmMode', alarmMode.disarmed, { values: alarmMode.modes });

    var _alarmEventMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ALARM_EVENT)
        .addStringProperty('status', alarmMode.alarmClear, { values: alarmMode.status })
        .addObjectProperty('zones', [])
        .addObjectProperty('event', null)
        .addStringProperty('device', null)
        .addStringProperty('value', null);

    var _zwaveCreateSceneMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_CREATE_SCENE)
        .addStringProperty('homeId', '')
        .addStringProperty('label', '')
        .addObjectProperty('values', []);

    var _zwaveRemoveSceneMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_REMOVE_SCENE)
        .addStringProperty('homeId', '')
        .addNumberProperty('sceneId', 0);

    var _zwaveAddSceneValueMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_ADD_SCENE_VALUE)
        .addStringProperty('homeId', '')
        .addNumberProperty('sceneId', 0)
        .addStringProperty('valueId', '')
        .addObjectProperty('value', null);

    var _zwaveRemoveSceneValueMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_REMOVE_SCENE_VALUE)
        .addStringProperty('homeId', '')
        .addNumberProperty('sceneId', 0)
        .addStringProperty('valudId', '');

    var _zwaveGetSceneValuesMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_GET_SCENE_VALUES)
        .addStringProperty('homeId', '')
        .addNumberProperty('sceneId', 0);

    var _zwaveGetScenesMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_GET_SCENES)
        .addStringProperty('homeId', '');

    var _zwaveSceneEventMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_ZWAVE_SCENE_EVENT)
        .addStringProperty('homeId', '')
        .addStringProperty('nodeId', '')
        .addNumberProperty('value', '');

    var _saveAutomationsMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_SAVE_AUTOMATIONS)
        .addObjectProperty('a', null);

    var _automationExecutedMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_AUTOMATION_EXECUTED)
        .addStringProperty('automationId', null);

    var _automationScheduledMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_AUTOMATION_SCHEDULED)
        .addObjectProperty('schedule', null);

    var _saveZonesMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_SAVE_ZONES)
        .addObjectProperty('z', null);

    var _getZonesMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_GET_ZONES);
       
    var _gpsLocationMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_GPS_LOCATION)
        .addNumberProperty('lat', -1)
        .addNumberProperty('long', -1);

    var _weatherRequestMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_WEATHER_REQUEST)
        .addNumberProperty('lat', -1)
        .addNumberProperty('long', -1);
    
    var _weatherForecastMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_WEATHER_FORECAST)
        .addNumberProperty('temperatureF', 0, {}, '', 'Temperature F','F')
        .addNumberProperty('temperatureC', 0, {}, '', 'Temperature C', 'C')
        .addNumberProperty('pressureIn', 0, {}, '', 'Pressure Inches', '#Hg')
        .addNumberProperty('pressureMb', 0, {}, '', 'Pressure Millibars', 'mb')
        .addStringProperty('windDirection', '', {}, '', 'Wind Direction', '')
        .addNumberProperty('windDegree', 0, {}, '', 'Wind Degree', '')
        .addNumberProperty('windKph', 0, {}, '', 'Wind Kph', 'KPH')
        .addNumberProperty('windMph', 0, {}, '', 'Wind Mph', 'MPH')
        .addNumberProperty('dayMinTemperatureF', 0, {}, '', 'Day Minimum Temperature F','F')
        .addNumberProperty('dayMinTemperatureC', 0, {}, '', 'Day Minimum Temperature C','C')
        .addNumberProperty('dayMaxTemperatureF', 0, {}, '', 'Day Maximum Temperature F','F')
        .addNumberProperty('dayMaxTemperatureC', 0, {}, '', 'Day Maximum Temperature C','C')
        .addNumberProperty('dayAvgTemperatureF', 0, {}, '', 'Day Average Temperature F','F')
        .addNumberProperty('dayAvgTemperatureC', 0, {}, '', 'Day Average Temperature C','C')
        .addNumberProperty('dayTotalPrecipitationIn', 0, {}, '', 'Day Total Precipitation Inches')
        .addNumberProperty('dayTotalPrecipitationMm', 0, {}, '', 'Day Total Precipitation Millimeters');
    
    var _videoSourceSettingsMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_VIDEO_SOURCE_SETTINGS)
        .addStringProperty('videoSource', '', {}, '', 'Video Source Path', '')
        .addStringProperty('name', '', {}, '', 'Video Source Name', '')
        .addNumberProperty('brightness', 0, {}, '', 'Brightness', '')
        .addNumberProperty('contrast', 0, {}, '', 'Contrast', '')
        .addNumberProperty('saturation', 0, {}, '', 'Saturation', '')
        .addNumberProperty('red_balance', 0, {}, '', 'Red Balance', '')
        .addNumberProperty('blue_balance', 0, {}, '', 'Blue Balance', '')
        .addNumberProperty('horizontal_mirror', 0, {}, '', 'Horizontal Mirror', '')
        .addNumberProperty('vertical_mirror', 0, {}, '', 'Veritcal Mirror', '')
        .addNumberProperty('sharpness', 0, {}, '', 'Sharpness', '')
        .addNumberProperty('rotate', 0, {}, '', 'Rotate', '')
        .addNumberProperty('shutter_speed', 0, {}, '', 'Shutter Speed', '')
        .addNumberProperty('zoom_factor', 0, {}, '', 'Zoom Factor', '')
        .addNumberProperty('iso_sensitivity', 0, {}, '', 'ISO Sensitivity', '')
        .addNumberProperty('awb_mode', 0, {}, '', 'AWB Mode', '')
        .addNumberProperty('exposure_mode', 0, {}, '', 'Exposure Mobde', '')
        .addNumberProperty('exposure_metering', 0, {}, '', 'Exposure Metering', '');
    
    var _videoSourceStartStreamMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_START_VIDEO_STREAM)
        .addStringProperty('videoSource', '', {}, '', 'Video Source Path', '');

    
    var _videoSourceStopStreamMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_STOP_VIDEO_STREAM)
        .addStringProperty('videoSource', '', {}, '', 'Video Source Path', '');

    var _videoMotionEventStartMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_MOTION_EVENT_START)
        .addStringProperty('videoSource', '', {}, '', 'Video Source Path', '');

    var _videoMotionEventEndMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_MOTION_EVENT_END)
        .addStringProperty('videoSource', '', {}, '', 'Video Source Path', '');
    
    var _videoMotionImageCapturedMessageSchema = bitdogClient.createMessageSchema(constants.MESSAGE_SCHEMA_MOTION_IMAGE_CAPTURED)
        .addStringProperty('imageFileName', '', {}, '', 'Image File Name', '');
    
    
    this.__defineGetter__('zwaveEnablePollingMessageSchema', function () {
        return _zwaveEnablePollingMessageSchema;
    });
    
    this.__defineGetter__('zwaveDisablePollingMessageSchema', function () {
        return _zwaveDisablePollingMessageSchema;
    });

    this.__defineGetter__('zwaveGetPollingIntensityMessageSchema', function () {
        return _zwaveGetPollingIntensityMessageSchema;
    });

    this.__defineGetter__('zwaveGetPollingEnabledMessageSchema', function () {
        return _zwaveGetPollingEnabledMessageSchema;
    });

    this.__defineGetter__('videoMotionEventStartMessageSchema', function () {
        return _videoMotionEventStartMessageSchema;
    });

    this.__defineGetter__('videoMotionEventEndMessageSchema', function () {
        return _videoMotionEventEndMessageSchema;
    });

    this.__defineGetter__('videoMotionImageCapturedMessageSchema', function () {
        return _videoMotionImageCapturedMessageSchema;
    });

    this.__defineGetter__('videoSourceStartStreamMessageSchema', function () {
        return _videoSourceStartStreamMessageSchema;
    });
    
    this.__defineGetter__('videoSourceStopStreamMessageSchema', function () {
        return _videoSourceStopStreamMessageSchema;
    });

    this.__defineGetter__('videoSourceSettingsMessageSchema', function () {
        return _videoSourceSettingsMessageSchema;
    });

    this.__defineGetter__('weatherForecastMessageSchema', function () {
        return _weatherForecastMessageSchema;
    });
    
    this.__defineGetter__('weatherRequestMessageSchema', function () {
        return _weatherRequestMessageSchema;
    });

    this.__defineGetter__('getZonesMessageSchema', function () {
        return _getZonesMessageSchema;
    });

    this.__defineGetter__('zwaveSceneEventMessageSchema', function () {
        return _zwaveSceneEventMessageSchema;
    });

    this.__defineGetter__('gpsLocationMessageSchema', function () {
        return _gpsLocationMessageSchema;
    });

    this.__defineGetter__('saveAutomationsMessageSchema', function () {
        return _saveAutomationsMessageSchema;
    });

    this.__defineGetter__('automationExecutedMessageSchema', function () {
        return _automationExecutedMessageSchema;
    });

    this.__defineGetter__('automationScheduledMessageSchema', function () {
        return _automationScheduledMessageSchema;
    });

    this.__defineGetter__('saveZonesMessageSchema', function () {
        return _saveZonesMessageSchema;
    });

    this.__defineGetter__('zwaveRenameMessageSchema', function () {
        return _zwaveRenameMessageSchema;
    });

    this.__defineGetter__('zwaveAddNodeMessageSchema', function () {
        return _zwaveAddNodeMessageSchema;
    });

    this.__defineGetter__('zwaveNodeMessageSchema', function () {
        return _zwaveNodeMessageSchema;
    });

    this.__defineGetter__('zwaveControllerCommandMessageSchema', function () {
        return _zwaveControllerCommandMessageSchema;
    });

    this.__defineGetter__('zwaveNodeStatusMessageSchema', function () {
        return _zwaveNodeStatusMessageSchema;
    });

    this.__defineGetter__('zwaveValueMessageSchema', function () {
        return _zwaveValueMessageSchema;
    });

    this.__defineGetter__('zwaveSetPercentageMessageSchema', function () {
        return _zwaveSetPercentageMessageSchema;
    });

    this.__defineGetter__('zwaveSetTempertureMessageSchema', function () {
        return _zwaveSetTempertureMessageSchema;
    });

    this.__defineGetter__('zwaveIncrementDecrementTempertureMessageSchema', function () {
        return _zwaveIncrementDecrementTempertureMessageSchema;
    });

    this.__defineGetter__('zwaveActivateMessageSchema', function () {
        return _zwaveActivateMessageSchema;
    });

    this.__defineGetter__('zwaveConfigurationUpdateMessageSchema', function () {
        return _zwaveConfigurationUpdateMessageSchema;
    });

    this.__defineGetter__('zwaveSetNodeMessageSchema', function () {
        return _zwaveSetNodeMessageSchema;
    });

    this.__defineGetter__('zwaveSetNodeLevelMessageSchema', function () {
        return _zwaveSetNodeLevelMessageSchema;
    });

    this.__defineGetter__('zwaveHealNetworkNodeMessageSchema', function () {
        return _zwaveHealNetworkNodeMessageSchema;
    });
  
    this.__defineGetter__('zwaveControllerModeMessageSchema', function () {
        return _zwaveControllerModeMessageSchema;
    });

    this.__defineGetter__('alarmArmAwayMessageSchema', function () {
        return _alarmArmAwayMessageSchema;
    });

    this.__defineGetter__('alarmArmStayMessageSchema', function () {
        return _alarmArmStayMessageSchema;
    });

    this.__defineGetter__('alarmDisarmMessageSchema', function () {
        return _alarmDisarmMessageSchema;
    });

    this.__defineGetter__('alarmStatusMessageSchema', function () {
        return _alarmStatusMessageSchema;
    });

    this.__defineGetter__('alarmEventMessageSchema', function () {
        return _alarmEventMessageSchema;
    });

     this.__defineGetter__('zwaveCreateSceneMessageSchema', function () {
        return _zwaveCreateSceneMessageSchema;
     });

     this.__defineGetter__('zwaveRemoveSceneMessageSchema', function () {
         return _zwaveRemoveSceneMessageSchema;
    });

     this.__defineGetter__('zwaveAddSceneValueMessageSchema', function () {
         return _zwaveAddSceneValueMessageSchema;
    });

     this.__defineGetter__('zwaveRemoveSceneValueMessageSchema', function () {
         return _zwaveRemoveSceneValueMessageSchema;
    });

     this.__defineGetter__('zwaveGetSceneValuesMessageSchema', function () {
         return _zwaveGetSceneValuesMessageSchema;
    });

     this.__defineGetter__('zwaveGetScenesMessageSchema', function () {
         return _zwaveGetScenesMessageSchema;
    });



}

module.exports = new CoreMessageSchemas();