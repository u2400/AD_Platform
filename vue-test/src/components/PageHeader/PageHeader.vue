<template>
    <div class="pageHeader">
        <div v-html="content"></div>
    </div>
</template>

<script>
import "./PageHeader.css";

export default {
    props: ['content'],
    name: "PageHeader",
}

</script>

