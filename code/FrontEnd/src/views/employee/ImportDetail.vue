<template>
    <!-- Dialog -->
    <div class="m-dialog">
        <div class="m-dialog-modal"></div>

        <div class="m-dialog-box">
            <!-- Header -->
            <div class="m-dialog-header">
                <div tabindex="13" v-on:keyup.space="btnCloseOnClick" @click="btnCloseOnClick" class="m-dialog-header-icon m-dialog-header-icon-close icon-close m-cursor-pointer"></div>
            </div>

            <!-- Content -->
            <div class="m-dialog-content">
                <div class="m-dialog-content-right">

                    <div class="m-dialog-content-info">
                        <div class="m-infor-title">Thêm chi tiết xuất nhập khẩu</div>
                        <div class="form-info">
                            <div class="m-row">
                                <div class="m-form-group flex tooltip">
                                    <label class="m-input-label w-100" for="txtEmployeeCode">Số phiếu <span class="m-span-require">*</span></label>
                                    <input 
                                        ref="so_phieu" 
                                        v-model="importDetail.so_phieu" 
                                        :class="{ 'm-input-invalid': validateError.so_phieu }"
                                        tabindex="1"
                                        class="m-input" style="width: 208px;"
                                        type="text"
                                    >
                                    <span v-if="validateError.so_phieu" class="tooltiptext tooltip-right">{{ validateError.so_phieu }}</span>
                                </div>
                                
                                <div class="m-form-group flex-5 pl-25 tooltip" formatType="ddmmyy">
                                    <label class="m-input-label w-110" for="txtIdentityDate">Ngày lập phiếu <span class="m-span-require">*</span></label>
                                    <date-picker 
                                        v-model="importDetail.ngay_lap_phieu" 
                                        format="DD/MM/YYYY"
                                        valueType="YYYY-MM-DD"
                                        :input-attr="{ 'tabindex': 10}"
                                        ref="ngay_lap_phieu"
                                        placeholder="dd/mm/yyyy"
                                        :input-class="{ 'mx-input': true, 'm-input-invalid': validateError.ngay_lap_phieu }"
                                    />
                                    <span v-if="validateError.ngay_lap_phieu" class="tooltiptext tooltip-left">{{ validateError.ngay_lap_phieu }}</span>
                                </div>
                            </div>
        
                            <div class="m-row">
                                <div class="m-form-group flex tooltip">
                                    <label class="m-input-label w-100" for="txtEmployeeCode">Mã vật tư <span class="m-span-require">*</span></label>
                                    <input 
                                        ref="ma_vt" 
                                        v-model="importDetail.ma_vt" 
                                        :class="{ 'm-input-invalid': validateError.ma_vt }"
                                        tabindex="1"
                                        class="m-input" style="width: 208px;"
                                        type="text"
                                    >
                                    <span v-if="validateError.ma_vt" class="tooltiptext tooltip-right">{{ validateError.ma_vt }}</span>
                                </div>
        
                                <div class="m-form-group flex pl-25 tooltip">
                                    <label class="m-input-label w-110" for="txtEmployeeCode">Tên vật tư <span class="m-span-require">*</span></label>
                                    <input 
                                        ref="ten_vt" 
                                        v-model="importDetail.ten_vt" 
                                        :class="{ 'm-input-invalid': validateError.ten_vt }"
                                        tabindex="1"
                                        class="m-input" style="width: 208px;"
                                        type="text"
                                    >
                                    <span v-if="validateError.ten_vt" class="tooltiptext tooltip-right">{{ validateError.ten_vt }}</span>
                                </div>
                            </div>
        
                            <div class="m-row">
                                <div class="m-form-group flex tooltip">
                                    <label class="m-input-label w-100" for="txtEmployeeCode">Đơn vị tinh <span class="m-span-require">*</span></label>
                                    <input 
                                        ref="dvt" 
                                        v-model="importDetail.dvt" 
                                        :class="{ 'm-input-invalid': validateError.dvt }"
                                        tabindex="1"
                                        class="m-input" style="width: 208px;"
                                        type="text"
                                    >
                                    <span v-if="validateError.dvt" class="tooltiptext tooltip-right">{{ validateError.dvt }}</span>
                                </div>
        
                                <div class="m-form-group flex pl-25 tooltip">
                                    <label class="m-input-label w-110" for="txtEmployeeCode">Số lượng nhập</label>
                                    <input 
                                        ref="sl_nhap" 
                                        v-model="importDetail.sl_nhap" 
                                        tabindex="1"
                                        class="m-input" style="width: 208px;"
                                        type="number"
                                    >
                                </div>
                            </div>
        
                            <div class="m-row">
                                <div class="m-form-group flex tooltip">
                                    <label class="m-input-label w-100" for="txtEmployeeCode">Số lượng xuất</label>
                                    <input 
                                        ref="sl_xuat" 
                                        v-model="importDetail.sl_xuat" 
                                        tabindex="1"
                                        class="m-input" style="width: 208px;"
                                        type="number"
                                    >
                                </div>
                            </div>
                        </div>
                        
                    </div>
                                        
                </div>
            </div>

            <!-- Footer -->
            <div class="m-dialog-footer">
                <div class="m-dialog-footer-button">
                    <button tabindex="12" @click="btnCloseOnClick" class="m-btn m-second-btn">
                        Đóng
                    </button>
                    <button tabindex="11" @click="btnSaveOnClick" class="m-btn m-btn-default">
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import myEnum from '../../utils/enum.js'
// import request from "../../utils/request";
import Resource from '../../utils/resource';
import CommonJS from '../../utils/common';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    name: 'teacher-detail',

    components: {
        DatePicker 
    },

    data() {
        return {
            importDetail: {
                so_phieu: "",
                ngay_lap_phieu: null,
                ma_vt: "",
                ten_vt: "",
                dvt: "",
                sl_nhap: 0,
                sl_xuat: 0,
            },
            
            validateError: {
                so_phieu: "",
                ngay_lap_phieu: "",
                ma_vt: "",
                ten_vt: "",
                dvt: "",
            },
        };
    },

    props: {
        formMode: {
            type: Number,
            default: myEnum.formMode.view,
        },
    },

    methods: {
        /**
         * Sự kiện khi click vào button close
         */
        btnCloseOnClick() {
            this.$emit('closeImportDetail')
        },

        
        /**
         * Sự kiện khi click vào button save
         */
        btnSaveOnClick() {
            try {
                // Validate dữ liệu
                if (!this.validateInput()) {
                    return;
                }

                let importDetail = this.importDetail;
                if (this.formMode === myEnum.formMode.add) {
                    this.$emit('addImportDetail', importDetail);
                }
            } catch (error) {
                console.log(error)
            }
        },

        /**
         * Method để validate dữ liệu đầu vào
         */
        validateInput() {
            let refElements = this.$refs;

            if (!this.validateSoPhieu()) {
                refElements.so_phieu.focus();
                return false;
            }

            if (!this.validateNgayLapPhieu()) {
                refElements.ngay_lap_phieu.focus();
                return false;
            }

            if (!this.validateMaVt()) {
                refElements.ma_vt.focus();
                return false;
            }

            if (!this.validateTenVt()) {
                refElements.ten_vt.focus();
                return false;
            }

            if (!this.validateDvt()) {
                refElements.dvt.focus();
                return false;
            }

            return true;
        },

        /**
         * Method để validate So phieu
         */
        validateSoPhieu() {
            if (!this.importDetail.so_phieu) {
                this.validateError.so_phieu = Resource[CommonJS.languageCode].validate('Số phiếu');
                return false;
            }

            this.validateError.so_phieu = "";
            return true;
        },

        /**
         * Method để validate Ngay lap phiẻu
         */
        validateNgayLapPhieu() {
            if (!this.importDetail.ngay_lap_phieu) {
                this.validateError.ngay_lap_phieu = Resource[CommonJS.languageCode].validate('Ngày lập phiếu');
                return false;
            }

            this.validateError.ngay_lap_phieu = "";
            return true;
        },

        /**
         * Method để validate Ma vt
         */
        validateMaVt() {
            if (!this.importDetail.ma_vt) {
                this.validateError.ma_vt = Resource[CommonJS.languageCode].validate('Mã vật tư');
                return false;
            }

            this.validateError.ma_vt = "";
            return true;
        },

        /**
         * Method để validate Ten vt
         */
        validateTenVt() {
            if (!this.importDetail.ten_vt) {
                this.validateError.ten_vt = Resource[CommonJS.languageCode].validate('Tên vật tư');
                return false;
            }

            this.validateError.ten_vt = "";
            return true;
        },

        /**
         * Method để validate Ten vt
         */
        validateDvt() {
            if (!this.importDetail.dvt) {
                this.validateError.dvt = Resource[CommonJS.languageCode].validate('Đơn vị tính');
                return false;
            }

            this.validateError.dvt = "";
            return true;
        },
    },

    created() {
    },

    watch: {
        formMode: function (formModeValue) {
            let me = this;

            if (formModeValue === myEnum.formMode.add) {
                // Clean form khi mở form để add
                me.importDetail = {
                    so_phieu: "",
                    ngay_lap_phieu: null,
                    ma_vt: "",
                    ten_vt: "",
                    dvt: "",
                    sl_nhap: 0,
                    sl_xuat: 0,
                }
            } 


            me.$nextTick(() => {
                // Clean error message
                me.validateError = {
                    so_phieu: "",
                    ngay_lap_phieu: "",
                    ma_vt: "",
                    ten_vt: "",
                    dvt: "",
                };
            })
        },

        'importDetail.so_phieu': function() {
            this.validateSoPhieu();
        },
        'importDetail.ngay_lap_phieu': function() {
            this.validateNgayLapPhieu();
        },
        'importDetail.ma_vt': function() {
            this.validateMaVt();
        },
        'importDetail.ten_vt': function() {
            this.validateTenVt();
        },
        'importDetail.dvt': function() {
            this.validateDvt();
        },
    }
}
</script>

<style scope>
    @import url("../../styles/component/dialog.css");

    /* Style cho date picker riêng trang này */
    .m-form-group .mx-datepicker {
        width: 208px;
        height: 32px;
    }
</style>