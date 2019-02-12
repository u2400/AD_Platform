<template>
    <div class="exception">
        <div class="imgBlock">
            <div class="imgEle" v-bind:style="{'background-image': `url(${content.imgurl})`}"></div>
        </div>
        <div class="content">
            <h1>{{ content.statusCode }}</h1>
            <div class="desc">{{ content.statusMessage }}</div>
            <div class="actions">
            <a href="/">
                <button type="button" class="ant-btn ant-btn-primary">
                <span>返回首页</span></button>
            </a>
            </div>
        </div>
    </div>
</template>

<script>
import "./exception.css";

export default {
    props: ["content"],
}
</script>

<style>


</style>
