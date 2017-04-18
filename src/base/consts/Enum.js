const Enum = {
    loadingMsg: "加载中,请稍后......",
    errorMsg: "未知的异常",
    routerPrefix: "/R",
    msgDuration: 3,

    // B-"1" 
    // 企业过滤：所有企业，启用企业，停用企业
    company: [
        {
            "catCode": "0",
            "catName": "所有企业"
        },
        {
            "catCode": "1",
            "catName": "启用企业"
        },
        {
            "catCode": "2",
            "catName": "停用企业"
        }, 
        
    ],
    // 企业状态：启用，停用
    status: [
        {
            "catCode": "-1",
            "catName": "-"
        },
        {
            "catCode": "0",
            "catName": "保存"
        },
        {
            "catCode": "1",
            "catName": "启用"
        },
        {
            "catCode": "2",
            "catName": "停用"
        }, 

    ],
    // 是否
    bool: [
        {
            "catCode": "-1",
            "catName": "-"
        },
        {
            "catCode": "0",
            "catName": "否"
        },
        {
            "catCode": "1",
            "catName": "是"
        }, 

    ],
    // D-"1"
    // 层级:部门、分公司、办事处
    level: [
        {
            "catCode": "0",
            "catName": "部门"
        },
        {
            "catCode": "1",
            "catName": "分公司"
        },
        {
            "catCode": "2",
            "catName": "办事处"
        }, 

    ],
    // 地址类型：经营地址、收货地址，仓储地址,办公地址
    address: [
        {
            "catCode": "0",
            "catName": "经营地址"
        },
        {
            "catCode": "1",
            "catName": "收货地址"
        },
        {
            "catCode": "2",
            "catName": "仓储地址"
        },
        {
            "catCode": "3",
            "catName": "办公地址"
        },
    ],
    // 籍贯
    native: [
        {
            "catCode": "0",
            "catName": "上海"
        },

    ],
    // F-"2"
    // "0"级数据状态包括“启用、保存、停用”
    dataStatus: [
        {
            "catCode": "0",
            "catName": "保存"
        },
        {
            "catCode": "1",
            "catName": "启用"
        },
        {
            "catCode": "2",
            "catName": "停用"
        }, 

    ],
    // 类别分为“用户自建、系统预设”
    dataClass: [
        {
            "catCode": "0",
            "catName": "系统预设"
        },
        {
            "catCode": "1",
            "catName": "用户自建"
        }, 

    ],
}

export { Enum };