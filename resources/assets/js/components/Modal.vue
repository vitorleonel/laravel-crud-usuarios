<template>
	<div class="w-screen h-screen fixed pin flex justify-center items-center">
		<div class="w-screen h-screen fixed pin bg-black opacity-50"></div>

		<div class="w-2/5 bg-white absolute p-4 rounded fixed">
			<slot></slot>
		</div>
	</div>
</template>

