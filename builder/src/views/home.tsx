import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';

export default defineComponent({
    name: 'Home',
    setup() {
        return () => (
            <div>
                <div class="text-center">
                    <ElButton type={'primary'}>AA</ElButton>
                </div>
            </div>
        );
    },
});
