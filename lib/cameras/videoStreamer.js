//-----------------------------------------------------------------------------
//
//	videoStreamer.js
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
// Code for this file was inspired by project http://drejkim.com/projects/edi-cam/ 
//-----------------------------------------------------------------------------
'use strict';

// modules
let childProcess = require('child_process');
let EventEmitter = require('events').EventEmitter;
let util = require('util');
let path = require('path');
let url = require('url');

let bitdogClient = require('bitdog-client');
let constants = require('../constants.js');
let websocketsProcessPath = path.resolve(__dirname , './websocketsProcess.js');


function VideoStreamer(videoHubUrl, sourcePath) {
    let _websocketProcess = null;
    let _stopping = false;

    
    this.__defineGetter__('stopping', function () { return _stopping; });
    this.__defineSetter__('stopping', function (value) { _stopping = value; });

    this.__defineGetter__('source', function () { return sourcePath; });
    
    this.__defineGetter__('url', function () { return videoHubUrl; });

    this.__defineGetter__('websocketProcess', function () { return _websocketProcess; });
    this.__defineSetter__('websocketProcess', function (value) { _websocketProcess = value; });

}

util.inherits(VideoStreamer, EventEmitter);

VideoStreamer.prototype.start = function () {
    let self = this;

    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'Starting websocket streamer to Bitdog Cloud for ' + this.source);
    
    this.websocketProcess = childProcess.fork(websocketsProcessPath, [], { execArgv: [], cwd: process.cwd(), silent: true });
    
    this.websocketProcess.stdout.on("data", function (data) {
        bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, data);
    });
    
    this.websocketProcess.stderr.on("data", function (data) {
        bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, data);
    });
    
    this.websocketProcess.on('error', function (error) {
        bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'Websocket streamer error', error);
    });
    
    this.websocketProcess.on('message', function (message) {
        
        if (typeof message != typeof undefined && typeof message.name != typeof undefined && message.name != null) {
           
            
            switch (message.name) {
                case 'http-server-ready': {
                    let url = 'http://' + message.host + ':' + message.port;
                    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'Local HTTP server ready for video', url);
                }
                break;
                case 'http-server-stopped': {
                    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'Local HTTP server stopped for video');
                }
                break;
                case 'http-connection-lost':
                    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'Local HTTP connection lost for video');
                    break;
                case 'http-connection-connected':
                    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'Local HTTP connected for video', message);
                    break;
                case 'ws-connection-lost':
                    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'websocket process connection lost for video');
                    break;
                case 'ws-connection-ready':
                    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'websocket process connection ready for video');
                    break;
                case 'ws-connection-retry':
                    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'websocket process connection reconecting for video');
                    break;
                case 'ws-connection-error':
                    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'websocket process connection error', message.data);
                    break;
                case 'ws-connection-data':
                    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'websocket process connection data message', message.data);
                    break;
                case 'ws-connection-sending-video':
                    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'websocket process sending video', message.data);
                    break;
                default:
                    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'websocket process unknown message', message);
                    break;

            }
        }
    
    });
    
    this.websocketProcess.on('disconnected', function () { 
        bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'websocket process disconnected');
    });
    
    this.websocketProcess.send({
        name: 'start',
        source: this.source,
        url: this.url + '/source/' + encodeURI(this.source),
        nodeId: bitdogClient.configuration.nodeId,
        authKey: bitdogClient.configuration.authKey,
        videoStreamerPort: bitdogClient.configuration.get(constants.VIDEO_STREAMER_PORT)
    });
    
}

VideoStreamer.prototype.stop = function () {
    
    bitdogClient.logger.logProcessEvent(constants.LOG_PROCESS_VIDEO_STREAMER, 'Stopping websocket streamer to Bitdog Cloud for ' + this.source);

    if (this.stopping !== true) {
        this.stopping = true;

        this.websocketProcess.send({
            name: 'stop'
        });
    }
};

module.exports = VideoStreamer;