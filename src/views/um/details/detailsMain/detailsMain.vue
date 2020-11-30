<template>
    <div class="detailsMain-wrap">
        <div class="left-menu-wrap">
            <ul>
                <!-- 一级菜单 -->
                <li 
                    v-for="(item, index) in leftMenu" 
                    :key="index" 
                    class="first-menu-wrap"
                    :class="{activeFirstMenu: currenIndex === index}"
                    @click="choosedFirstMenu(item, index)"
                >
                    <img class="menu-icon" :src="item.icon"/>
                    {{item.firstMenu}}
                    <div 
                        v-if="item.children" 
                        class="arrow"
                        :class="item.isChildMenu === true ? 'to-top' : 'to-bottom'"
                    >
                    </div>
                    <!-- 二级菜单 -->
                    <div 
                        v-if="item.children" 
                        v-show="item.isChildMenu" 
                        class="menu-children-wrap"
                    >
                        <div 
                            class="second-menu-wrap" 
                            v-for="(ele, idx) in item.children" 
                            :key="idx"
                            :class="{activeSecondMenu: currentSecond === item.children[idx]}"
                            @click.stop="choosedSeondMenu(ele)"
                        >
                            <div>{{ele.secondMenu}}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="details-wrap">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts" src="./detailsMain.ts"></script>

<style lang="less">
    @import './detailsMain.less';
</style>

