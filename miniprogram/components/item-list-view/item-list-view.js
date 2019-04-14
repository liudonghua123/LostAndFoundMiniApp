Component({
  data: {},
  properties: {
    records: {
      type: Object,
      value: []
    }
  },
  methods: {
    itemTap(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `/pages/item-viewer/item-viewer?record=${JSON.stringify(
          this.data.records[id]
        )}`
      });
    }
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    }
  }
});
