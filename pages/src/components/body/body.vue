<template>
    <div id="Container" v-bind:style="{ padding: '24px', background: '#fff', minHeight: `${Number(window.screen.availHeight) - 230}px`}">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: "Body",
    data() {
        return {
            window: window,
        }
    },
}
</script>

