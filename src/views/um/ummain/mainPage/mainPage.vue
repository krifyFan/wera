<template>
    <div class="mainPage-wrap">
        <div class="nav-bar-wrap">
            <NavBar @curCrumb="getBreadCrumb"/>
        </div>
        <Breadcrumb>
            <BreadcrumbItem v-for="item in breadCrumbs" :key="item">
            <Icon type="ios-analytics" />
            {{item}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="container-wrap">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts" src="./mainPage.ts"></script>

<style lang="less">
    @import './mainPage.less';
</style>

