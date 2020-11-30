<template>
    <div class="cmmainPage-wrap">
        <Layout>
            <div class="layout-logo"></div>
            <Header class="layout-header-bar">
                <h1 style="color: #eeeeee;margin-left: 32px;width: 310px;cursor: pointer;" @click="backToMain">{{data.title}}</h1>
            </Header>
            <!-- </Layout> -->
            <Layout class="coment">
                <section class="menu-container-wrap">
                    <div v-for="(item, index) in leftTree" :key="item.id">
                        <div class="menu-title" @click="handleOpen(index)">
                            <Icon :type="item.typeName" size="18" style="margin-right: 5px"/>
                            {{item.name}}
                            <Icon type="ios-arrow-down" class="trigger" v-show="index === currentIndex ? isOpen : !isOpen"/>
                            <Icon type="ios-arrow-up" class="trigger" v-show="index === currentIndex ? !isOpen : isOpen"/>
                        </div>
                        <ul v-show="index === currentIndex && isOpen">
                            <li v-for="(ele, idx) in item.childNode" :key="ele.name" @click="goToMoudle(ele.url, idx)" :class="{'active':currentChild === idx}">{{ele.name}}</li>
                        </ul>
                    </div>
                </section>
                <Content>
                    <router-view />
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script lang="ts" src="./cmmainPage.ts"></script>

<style lang="less">
    @import './cmmainPage.less';
</style>

