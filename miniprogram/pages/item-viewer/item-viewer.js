Page({
  data: {
    record: {}
  },
  onLoad(query) {
    console.info(`query.record: ${JSON.stringify(query.record)}`);
    this.setData({
      record: JSON.parse(query.record)
    });
  }
});
