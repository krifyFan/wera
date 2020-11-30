<template>
    <div class="videoManageAll-wrap">
        <!-- <SelectTemp :selectOption="selectVideo"></SelectTemp> -->
        <div class="content-wrap">
            <div class="video-wrap scrollbar">
                <div 
                    class="video-item-wrap"
                    v-for="(item, index) in videos"
                    :key="index"
                >
                    <div class="video-item">
                        <!-- {{item.name}} -->
                        <video width="100%" height="100%" controls>
                            <source :src="item.name">
                            <source src="movie.ogg" type="video/ogg">
                            您的浏览器不支持 video 标签。
                        </video>
                    </div>
                </div>
            </div>
            <div class="control-wrap">
                <div class="ptz-control-wrap">
                    <div class="title">
                        <Icon type="ios-cloud" :size="20"/>
                        <span>云台控制</span>
                    </div>
                    <div class="ptz-control-components-wrap">
                        <PTZControl />
                    </div>
                </div>
                <div class="camera-info-warp">
                    <div class="title">
                        <Icon type="ios-videocam" :size="20"/>
                        <span>摄像头信息</span>
                    </div>
                    <div class="camera-info">
                        <div class="camera-name">
                            <div class="w2">名称：</div>
                            <div class="info" :title="cameraName">{{cameraName}}</div>
                        </div>
                        <div class="camera-loc">
                            <div class="w2">位置：</div>
                            <div class="info" :title="cameraLoc">{{cameraLoc}}</div>
                        </div>
                        <div class="camera-preset-position">
                            <div>预置位：</div>
                            <div class="camera-preset-position-wrap">
                                <p 
                                    v-for="(item, index) in cameraPresetPos" 
                                    :key="index"
                                >
                                    <span>{{item.presetPosName}}{{index}}</span>
                                    <span class="btn-wrap">
                                        <div class="primary-btn">设置</div>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./videoManageAll.ts"></script>

<style lang="less">
    @import './videoManageAll.less';
</style>

