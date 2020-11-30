<template>
	<div>		
		<keep-alive>
			<transition name="enter">
				<router-view v-if="$route.meta.keepAlive"/>
			</transition>
		</keep-alive>
		<transition name="enter">
			<router-view v-if="!$route.meta.keepAlive"/>
		</transition>
	</div>
</template>
<style lang="less">
@font-face {
	font-family: UnidreamLED;
	src: url("./assets/font/UnidreamLED.ttf");
}
</style>