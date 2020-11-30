<template>
    <div class="login-wrap" :style="{backgroundImage: 'url('+ bg +')', backgroundSize: 'cover'}">
        <h1>智慧消防综合监控平台</h1>
        <div class="login-form-wrap" :style="{ backgroundImage: 'url('+ containerBG +')', backgroundSize: '100% 100%' }">
            <div class="title">登录</div>
            <div class="from-wrap">
                <Form ref="loginForm" :model="loginForm" :rules="ruleValidate">
                    <FormItem prop="account">
                        <div class="username-wrap">
                            <Input 
                                prefix="ios-contact" 
                                placeholder="用户名" 
                                style="width: 100%"
                                v-model="loginForm.account"
                                @on-focus="cancelTip()"
                            />
                        </div>
                    </FormItem>
                    <FormItem prop="password">
                        <div class="pass-wrap">
                            <Input 
                                prefix="md-lock" 
                                type="password"
                                placeholder="密码" 
                                style="width: 100%" 
                                v-model="loginForm.password"
                                @on-focus="cancelTip()"
                            />
                            <div class="ivu-form-item-error-tip">{{errTip}}</div>
                        </div>
                    </FormItem>
                </Form>
                <div class="login-btn">
                    <Button long class="login-btn-active" @click="submitLogin('loginForm')">
                        <span v-if="!loading">登  录</span>
                        <span v-else>loading</span>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./login.ts"></script>

<style lang="less">
    @import './login.less';
</style>

