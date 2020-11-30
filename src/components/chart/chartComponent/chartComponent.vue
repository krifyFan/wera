<template>
    <div class="chartComponent-wrap">
        <BarChartNormal v-bind="bindData" v-if="bindData.type === 100"></BarChartNormal>
        <BarChartNormalHorizontal v-bind="bindData" v-else-if="bindData.type === 101"></BarChartNormalHorizontal>
        <BarChartMultiple v-bind="bindData" v-else-if="bindData.type === 110"></BarChartMultiple>
        <BarChartStack v-bind="bindData" v-else-if="bindData.type === 120"></BarChartStack>
        <LineChartMultiple v-bind="bindData" v-else-if="bindData.type === 210"></LineChartMultiple>
        <MixedChartBarAndLine v-bind="bindData" v-else-if="bindData.type === 300"></MixedChartBarAndLine>
        <PieChartNormal v-bind="bindData" v-else-if="bindData.type === 400"></PieChartNormal>
        <PieChartHollow v-bind="bindData" v-else-if="bindData.type === 410"></PieChartHollow>
        <PieChartCustomized v-bind="bindData" v-else-if="bindData.type === 430" />
        <GaugeChartNormal v-bind="bindData" v-else-if="bindData.type === 500"></GaugeChartNormal>
        <RadarChartNormal v-bind="bindData" v-else-if="bindData.type === 600" />
        <ProgressChartSemi v-bind="bindData" v-else-if="bindData.type === 700" />
        <div v-else>
            敬请期待！！！
        </div>
    </div>
</template>

<script lang="ts">
    import BarChartMultiple from '@/components/chart/barChart_multiple/barChart_multiple.vue'
    import BarChartNormal from '@/components/chart/barChart_normal/barChart_normal.vue'
    import BarChartNormalHorizontal from '@/components/chart/barChart_normal_horizontal/barChart_normal_horizontal.vue'
    import BarChartStack from '@/components/chart/barChart_stack/barChart_stack.vue'
    import GaugeChartNormal from '@/components/chart/gaugeChart_normal/gaugeChart_normal.vue'
    import LineChartMultiple from '@/components/chart/lineChart_multiple/lineChart_multiple.vue'
    import MixedChartBarAndLine from '@/components/chart/mixedChart_barAndLine/mixedChart_barAndLine.vue'
    import PieChartNormal from '@/components/chart/pieChart_normal/pieChart_normal.vue'
    import PieChartHollow from '@/components/chart/pieChart_hollow/pieChart_hollow.vue'
    import PieChartCustomized from '@/components/chart/pieChart_customized/pieChart_customized.vue'
    import RadarChartNormal from '@/components/chart/radarChart_normal/radarChart_normal.vue'
    import ProgressChartSemi from '@/components/chart/progressChart_semi/progressChart_semi.vue'

    import {
        ChartBindData,
        ChartType
    } from "@/types/components/chart.interface"

    import {
        Component,
        Vue,
        Prop
    } from "vue-property-decorator"

    @Component({
        components: {
            BarChartMultiple,
            BarChartNormal,
            BarChartNormalHorizontal,
            BarChartStack,
            GaugeChartNormal,
            LineChartMultiple,
            MixedChartBarAndLine,
            PieChartNormal,
            PieChartHollow,
            PieChartCustomized,
            RadarChartNormal,
            ProgressChartSemi
        }
    })
    export default class About extends Vue {

        @Prop({
            required: true
        }) bindData!: any

    }
</script>

<style lang="less">
    .chartComponent-wrap {
        height: 100%;
        width: 100%;

        canvas {
            background: transparent;
        }
    }
</style>