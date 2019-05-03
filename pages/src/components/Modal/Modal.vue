<template>
    <ary>
        <a href="javascript:;" @click="showModal">添加日志内容</a>
        <a-modal
        v-model="visible"
        @ok="handleOk"
        >
            <div style="margin-top: 20px;">
                <a-upload-dragger name="file" :multiple="true" :action=" '/api/uploadlog/'+ workspace_name " @change="handleChange">
                    <p class="ant-upload-drag-icon">
                        <a-icon type="inbox" />
                    </p>
                    <p class="ant-upload-text">将文件拖拽至此处或者点击上传</p>
                    <p class="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </a-upload-dragger>
            </div>
        </a-modal>
    </ary>
</template>

<script>
export default {
    data(){
        return{
            visible: false,
        }
    },
    props: ['workspace_name'],
    methods: {
        showModal(text) {
            this.visible = true;
        },
        handleOk(e) {
            console.log(e);
            this.visible = false;
        },
        handleChange(info) {
            const status = info.file.status;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                this.$message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                this.$message.error(`${info.file.name} ${info.file.response.error}`);
            }
        },
    }
}
</script>

