<template>
    <div class="select-temp-wrap">
        <div class="label-wrap">
            {{selectOption.labelText}}
        </div>
        <div class="select-wrap">
            <Select v-model="currentValue" @on-change="choosedId">
                <Option 
                    v-for="(item, index) in selectOption.options" 
                    :key="index"
                    :value="item.id"
                >
                    {{item.name}}
                </Option>
            </Select>
        </div>
        <div class="icon-down">
            <Icon type="md-arrow-dropdown" :size="32"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator"
@Component({})
export default class About extends Vue {
    @Prop({
        required: true,
        default: {}
    })selectOption!: {
        labelText: '',
        options: [],
        defaultValue: null
    }

    currentValue: any = null

    choosedItem: any 

    @Emit('on-change')
    send(choosedValue: number) {}

    mounted() {
        this.currentValue = this.selectOption.defaultValue
    }

    choosedId(id: number): void {
        this.choosedValue = id
        this.send(this.choosedValue)
    }


}
</script>
<style lang="less">
.select-temp-wrap {
    width: auto;
    .label-wrap, .select-wrap, .icon-down {
        display: inline-block;
        font-size: 18px;
        color: @page-title-color;
        background: @main-color;
        border: 1px solid @main-color;
        padding: 13px 16px;
        margin-right: 12px;
        vertical-align: middle;
    }

    .label-wrap {
        border-radius: 6px 0px 0px 6px;
    }
    .select-wrap {
        padding: 7px 16px 8px 16px;
        .ivu-select {
            font-size: 18px;
            color: @page-title-color;
            line-height: unset;
            .ivu-select-selection {
                background-color: @main-color;
                color: @page-title-color;
                border: 1px solid @main-color;

                .ivu-select-placeholder, 
                .ivu-select-selected-value {
                    font-size: 18px;
                    color: @page-title-color;
                }
                // .ivu-select-selected-value {
                //     font-size: 18px;
                //     color: @page-title-color;
                // }
            }
            .ivu-select-dropdown {
                top: 65px !important;
                left: 123px !important;
                .ivu-select-dropdown-list {
                    .ivu-select-item {
                        font-size: 18px !important;
                    }
                }
            }
            .ivu-select-arrow, .ivu-input-suffix i {
                font-size: 18px;
                color: @page-title-color;
            }
        }
    }
    .icon-down {
        height: 49px;
        border-radius: 0px 6px 6px 0px;
        .ivu-icon {
            line-height: unset;
        }
    }
}
</style>