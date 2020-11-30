import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class About extends Vue {

    bg: string = require('@/assets/images/login.png')

    containerBG: string = require('@/assets/images/login-container-wrap.png')

    loginForm: any = {
        account: null,
        password: ''
    }

    ruleValidate: any = {
        account: [
            { required: true, message: '用户名不能为空', triggle: 'blur' }
        ],
        password: [
            { required: true, message: '密码不能为空', triggle: 'blur' },
        ]
    }

    errTip: string| null = null
    loading: boolean = false

    submitLogin(name: any) {
        this.loading = true
        let ref = this.$refs[name] as any
        ref.validate((valid: any) => {
            if (valid) {
                const sha256: any = require("js-sha256").sha256;
                const loginParams: any = {
                    account: this.loginForm.account,
                    password: sha256(this.loginForm.password)
                };
                localStorage.setItem('account', this.loginForm.account)
                this.$store.dispatch('login', loginParams).then(res => {
                    this.loading = false
                    this.$router.push({
                        path: "/um/overview/info"
                    })
                }).catch(error => {
                    this.errTip = this.$store.getters.msg
                    this.loading = false
                })
            }
        })
    }

    cancelTip() {
        this.errTip = null
    }
    
}
