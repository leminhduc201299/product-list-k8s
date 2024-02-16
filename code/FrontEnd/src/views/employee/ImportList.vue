<template lang="">
  <div>
    <!-- Content -->
        <div class="search-bar">
            <div class="search-left">
                <input v-model="textSearch" class="m-input m-input-icon icon-search" style="width: 300px;" type="text" placeholder="Nhập Mã vật tư hoặc Tên vật tư để tìm kiếm">
            </div>
    
            <div class="search-right">
                <button @click="showImportDetail(myEnum.formMode.add, null)" class="m-btn m-btn-default">
                    Thêm
                </button>
            </div>
        </div> 

        <div class="gird">
            <table  class="m-table" cellspacing="0">
                <thead>
                    <tr>
                        <th class="align-center">
                            Số phiếu
                        </th>
                        <th class="align-center">
                            Ngày lập phiếu
                        </th>
                        <th class="align-center">
                            Mã vật tư
                        </th>
                        <th class="align-center">
                            Tên vật tư
                        </th>
                        <th class="align-center">
                            Đơn vị tính
                        </th>
                        <th class="align-center">
                            Số lượng nhập
                        </th> 
                        <th class="align-center">
                            Số lượng xuất 
                        </th>
                        <th style="border-right: none;" class="align-center">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                      v-for="(importDetail, index) in importDetails" :key="index"
                    >
                        <td class="align-left">
                            <div :title="importDetail.so_phieu" style="min-width: 100px; width: 109px;" class="text-cell">
                              {{ importDetail.so_phieu }}
                            </div>
                        </td>
                        <td class="align-center">
                          <div 
                            :title="importDetail.ngay_lap_phieu | formatDate" 
                            style="min-width: 140px; width: 149px;" 
                            class="text-cell m-cursor-pointer"
                          >
                            {{ importDetail.ngay_lap_phieu | formatDate }}
                          </div>
                        </td>
                        <td class="align-left">
                          <div :title="importDetail.ma_vt" style="min-width: 90px; width: 99px;" class="text-cell">
                            {{ importDetail.ma_vt }}
                          </div>
                        </td>
                        <td class="align-left">
                          <div :title="importDetail.ten_vt" style="min-width: 120px; width: 129px;" class="text-cell">
                            {{ importDetail.ten_vt }}
                          </div>
                        </td>
                        <td class="align-left">
                          <div :title="importDetail.dvt" style="min-width: 120px; width: 129px;" class="text-cell">
                            {{ importDetail.dvt }}
                          </div>
                        </td>
                        <td class="align-right">
                          <div :title="importDetail.sl_nhap | formatNumber" style="min-width: 100px; width: 100px;" class="text-cell">
                            {{ importDetail.sl_nhap | formatNumber }}
                          </div>
                        </td>
                        <td class="align-right">
                          <div :title="importDetail.sl_xuat | formatNumber" style="min-width: 100px; width: 100px;" class="text-cell">
                            {{ importDetail.sl_xuat | formatNumber }}
                          </div>
                        </td>
                        <td style="min-width: 40px; " class="align-center m-table-action">
                            <div @click="btnDeleteOnClick(importDetail.so_phieu, importDetail.ma_vt)" class="m-table-action-icon icon-remove"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="m-nodata" v-if="!(importDetails && importDetails.length)">Không có dữ liệu</div>
        </div>

    <!-- Dialog Employee Info -->
    <ImportDetail 
        v-show="isShowImportDetail" 
        :formMode="formMode"
        @closeImportDetail="closeImportDetail"
        @addImportDetail="addImportDetail"
    />
    
  </div>
</template>
<script>
import myEnum from "../../utils/enum.js";
import request from "../../utils/request";
import ImportDetail from "./ImportDetail.vue";
// import BaseComboBox from "../../components/base/BaseComboBox";
import Toastify from "../../utils/toastify";
import Resource from "../../utils/resource";
import CommonJS from "../../utils/common";
import Format from '../../utils/format'

export default {
  name: "teacher-list",

  components: {
    ImportDetail,
  },

  data() {
    return {
      importDetails: [],
      isShowImportDetail: false,
      formMode: myEnum.formMode.view,
      isShowMultiDelete: false,

      teacherForEdit: null,
      teacherIdsForDelete: [],
      myEnum: myEnum,

      searchTimeout: null,
      textSearch: '',

      pageSizeOptions: [
        { text: `10 ${Resource[CommonJS.languageCode].pageSize}`, value: 10 },
        { text: `20 ${Resource[CommonJS.languageCode].pageSize}`, value: 20 },
        { text: `30 ${Resource[CommonJS.languageCode].pageSize}`, value: 30 },
        { text: `50 ${Resource[CommonJS.languageCode].pageSize}`, value: 50 },
        { text: `70 ${Resource[CommonJS.languageCode].pageSize}`, value: 70 },
        { text: `100 ${Resource[CommonJS.languageCode].pageSize}`, value: 100 },
      ],
    };
  },

  methods: {
    /**
     * Method để load chi tiết xuất nhập khẩu trong CSDL
     */
    loadData() {
      let me = this;

      request(
        {
          url: `/Import?textSearch=${me.textSearch?.trim()}`,
          method: "GET",
        }, false
      )
        .then((res) => {
          me.importDetails = res.Data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Method mở dialog chi tiết xuất nhập khẩu theo form mode
     */
    showImportDetail(formMode, teacher) {
      this.formMode = formMode;
      this.teacherForEdit = teacher;

      this.isShowImportDetail = true;
    },

    /**
     * Method mở dialog chi tiết xuất nhập khẩu theo form mode
     */
    closeImportDetail() {
      this.formMode = 0;

      this.isShowImportDetail = false;
    },

    /**
     * Thêm giáo viên vào CSDL
     */
    addImportDetail(importDetail) {
      let me = this;

      request(
        {
          method: "post",
          url: "/Import",
          data: importDetail,
        }, false, false
      )
        .then((res) => {
          console.log(res)
          if (res.Success){
            // Show toast
            Toastify.showToastMsg({
                msg: 'Lưu dữ liệu thành công',
                type: myEnum.toastType.success
            });
          }
          else {
            // Show toast
            Toastify.showToastMsg({
                msg: res?.UserMsg ? res?.UserMsg : 'Lưu dữ liệu thất bại',
                type: myEnum.toastType.error
            });
            return;
          }

          // Load lại dữ liệu
          // Kiểm tra xem người dùng có ở trang đầu không
          if (me.textSearch) {
            me.textSearch = "";
          } else {
            me.loadData();
          }

          // Đóng dialog
          me.closeImportDetail();
        })
        .catch((error) => {
          console.log(error);
        });
    },


    /**
     * Xóa chi tiết nhập khẩu trong CSDL
     */
    btnDeleteOnClick(vote, materialCode) {
      if (vote && materialCode) {
        // Hiển thị cảnh báo cho ngươi dùng biết
        Toastify.showPopupMsg({
          yesCallback: () => this.deleteImportDetail(vote, materialCode),
          title: "",
          iShowBtnNo: true,
          msg: Resource[CommonJS.languageCode].deleteEmployee.deleteConfirm,
        });
      } else {
        console.log();
      }
    },

    /**
     * Thực hiện Xóa chi tiết nhập khẩu
     */
    deleteImportDetail(vote, materialCode) {
      request(
        {
          method: "delete",
          url: `/Import?vote=${vote}&materialCode=${materialCode}`,
        }, true
      )
        .then((res) => {
          console.log(res);

          // Load lại dữ liệu
          this.loadData();
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },

  created() {
    this.loadData();
  },

  filters: {
    // Xử lý dữ liệu dạng số
    formatNumber: function (value) {
      if (!value) {
        return 0;
      }

      return value;
    },

    // Xử lý dữ liệu dạng ngày tháng
    formatDate: function (value) {
      return Format.formatDate(value, 'dd/mm/yyyy');
    },
  },

  watch: {
    // Khi key search thay đổi thì load lại data
    textSearch: {
      handler() {
        let me = this;

        clearTimeout(me.searchTimeout);

        me.searchTimeout = setTimeout(() => {
          this.loadData();
        }, 500);
      },
      deep: true,
    },
  },
};
</script>
<style scope>
</style>