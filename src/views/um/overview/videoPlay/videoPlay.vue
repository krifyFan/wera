<template>
    <div class="videoPlay-wrap">
        <div class="over-title">视频展示</div>
        <div class="video-play-wrap">
            <video width="100%" height="100%" controls>
                <source :src="videoSrc">
                <source src="movie.ogg" type="video/ogg">
                您的浏览器不支持 video 标签。
            </video>
        </div>
    </div>
</template>

<script lang="ts" src="./videoPlay.ts"></script>

<style lang="less">
    @import './videoPlay.less';
</style>

