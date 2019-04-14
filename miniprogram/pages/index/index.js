//index.js
const app = getApp();

Page({
  data: {
    records: [
      {
        title: '失物招领1',
        description: '失物招领描述信息',
        pictures: [
          'https://6465-dev-1643b4-1259004401.tcb.qcloud.la/001-cheese.png?sign=569ee094085fb80663de8a2c2df72758&t=1555202964',
          'https://6465-dev-1643b4-1259004401.tcb.qcloud.la/002-sunflower.png?sign=2610d615b18410e63ed4a73931c03014&t=1555202980'
        ]
      },
      {
        title: '失物招领2',
        description: '失物招领描述信息',
        pictures: [
          'https://6465-dev-1643b4-1259004401.tcb.qcloud.la/003-fields.png?sign=b3b4d043859445cb8211772b61603a54&t=1555202992',
          'https://6465-dev-1643b4-1259004401.tcb.qcloud.la/004-watering-can.png?sign=0e6669dba0e188de25ff6f0ca595b292&t=1555203008'
        ]
      },
      {
        title: '失物招领3',
        description: '失物招领描述信息',
        pictures: [
          'https://6465-dev-1643b4-1259004401.tcb.qcloud.la/005-barrel-1.png?sign=63af0d48033880b45bde5b84d9b7e371&t=1555203021',
          'https://6465-dev-1643b4-1259004401.tcb.qcloud.la/006-eggs.png?sign=b323aa3c8a23d0009688f810333b5b61&t=1555203035'
        ]
      }
    ]
  },

  onLoad: function() {
    let getTempFileURLByFileId = (fileList, fileId) => {
      for (let item of fileList) {
        if (item.fileID == fileId) {
          return item.tempFileURL;
        }
      }
      return '';
    };
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('data')
      .where({})
      .get({
        success: res => {
          console.log(
            `database query successful: ${JSON.stringify(res.data, null, 2)}`
          );
          // 组合所有图片id
          let records = res.data;
          let imageFileIds = [];
          for (let item of records) {
            for (let picture of item.pictures) {
              imageFileIds.push(picture);
            }
          }
          // 图片地址查询
          wx.cloud.getTempFileURL({
            fileList: imageFileIds,
            success: fileListRes => {
              let fileList = fileListRes.fileList;
              console.log(`fileList: ${JSON.stringify(fileList)}`);
              console.log(
                `before processed records: ${JSON.stringify(records)}}`
              );
              // 替换fileId为临时链接
              for (let item of records) {
                let newPictures = [];
                for (let picture of item.pictures) {
                  newPictures.push(getTempFileURLByFileId(fileList, picture));
                }
                item.pictures = newPictures;
              }
              console.log(
                `after processed records: ${JSON.stringify(records)}`
              );
              this.setData({
                records: records
              });
              console.log(`this.data: ${JSON.stringify(this.data)}`);
            },
            fail: console.error
          });
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          });
          console.error(
            `database query error: ${JSON.stringify(err, null, 2)}`
          );
        }
      });
  }
});
