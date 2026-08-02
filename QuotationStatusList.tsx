import React, { useState } from 'react';
import dayjs from 'dayjs';
import ListPageComp from './common/ListPageComp';
import type { FormConfig } from './common/ListPageComp';

const allData: any[] = [{"receivedDate":"2024-01-15","warningDate":"2024-01-15","fundCode":"510300","fundName":"沪深300ETF","marketMakingAccount":"A123456789","tradingParticipantCode":"TP001","tradingParticipantName":"示例证券有限公司","fundManagerCode":"FM001","fundManagerName":"示例基金管理有限公司","dailyTimeWeightedQuoteSpreadRate":"0.12%","dailyContinuousAuctionParticipationRate":"98.50%","openingCallAuctionParticipation":"yes","closingCallAuctionParticipation":"yes","dailyDeclarationCount":120,"declarationTotalAmount":3560.25,"tradingVolume":180.5,"netSubscriptionVolume":25.3,"netSubscriptionAmount":512.8,"fundAssetScale":128.6,"etfHandlingFee":2680.5,"etfHandlingFeeExcludingSpecialSecuritiesAccountTransactions":2150.3,"marketMakingAccountStockHandlingFee":980.2},{"receivedDate":"2024-01-16","warningDate":"2024-01-16","fundCode":"159915","fundName":"创业板ETF","marketMakingAccount":"B987654321","tradingParticipantCode":"TP002","tradingParticipantName":"样例证券有限公司","fundManagerCode":"FM002","fundManagerName":"样例基金管理有限公司","dailyTimeWeightedQuoteSpreadRate":"0.18%","dailyContinuousAuctionParticipationRate":"96.20%","openingCallAuctionParticipation":"no","closingCallAuctionParticipation":"yes","dailyDeclarationCount":95,"declarationTotalAmount":2140.8,"tradingVolume":132.7,"netSubscriptionVolume":-12.5,"netSubscriptionAmount":-238.6,"fundAssetScale":86.3,"etfHandlingFee":1760.4,"etfHandlingFeeExcludingSpecialSecuritiesAccountTransactions":1498.9,"marketMakingAccountStockHandlingFee":720.6}];

const QuotationStatusList: React.FC = () => {
  const [data, setData] = useState<any[]>(allData);

  // 查询函数
  const handleSearch = (values: Record<string, any>) => {
    console.log('search values:', values);
    let result = allData;

    const keys = Object.keys(values);
    keys.map((key: any) => {
      result = result.filter((d) => d[key].includes(values[key]));
    });

    setData(result);
  };

  return (
    <div>
      <ListPageComp
        formConfig={formConfigs}
        columns={columns}
        dataSource={data}
        onSearch={handleSearch}
    />
    </div>
  );
}

export default QuotationStatusList;


/** 表单配置 */
const formConfigs: FormConfig = {
    fields: [
    {
      type: "RangePicker",
      label: "接收日期",
      name: "receivedDate",
      placeholder: '请输入接收日期',
    },
    {
      type: "RangePicker",
      label: "预警日期",
      name: "warningDate",
      placeholder: '请输入预警日期',
    },
    {
      type: "Input",
      label: "基金代码",
      name: "fundCode",
      placeholder: '请输入基金代码',
    },
    {
      type: "Input",
      label: "基金名称",
      name: "fundName",
      placeholder: '请输入基金名称',
    },
    {
      type: "Input",
      label: "做市账户",
      name: "marketMakingAccount",
      placeholder: '请输入做市账户',
    },
    {
      type: "Input",
      label: "交易参与人代码",
      name: "tradingParticipantCode",
      placeholder: '请输入交易参与人代码',
    },
    {
      type: "Input",
      label: "交易参与人名称",
      name: "tradingParticipantName",
      placeholder: '请输入交易参与人名称',
    },
    {
      type: "Input",
      label: "基金管理人代码",
      name: "fundManagerCode",
      placeholder: '请输入基金管理人代码',
    },
    {
      type: "Input",
      label: "基金管理人名称",
      name: "fundManagerName",
      placeholder: '请输入基金管理人名称',
    },
],};


/** 表格列配置 */
const columns = [
    {
      title: "接收日期",
      dataIndex: "receivedDate",
      key: "receivedDate",

    },
    {
      title: "预警日期",
      dataIndex: "warningDate",
      key: "warningDate",

    },
    {
      title: "基金代码",
      dataIndex: "fundCode",
      key: "fundCode",

    },
    {
      title: "基金名称",
      dataIndex: "fundName",
      key: "fundName",

    },
    {
      title: "做市账户",
      dataIndex: "marketMakingAccount",
      key: "marketMakingAccount",

    },
    {
      title: "交易参与人代码",
      dataIndex: "tradingParticipantCode",
      key: "tradingParticipantCode",

    },
    {
      title: "交易参与人名称",
      dataIndex: "tradingParticipantName",
      key: "tradingParticipantName",

    },
    {
      title: "基金管理人代码",
      dataIndex: "fundManagerCode",
      key: "fundManagerCode",

    },
    {
      title: "基金管理人名称",
      dataIndex: "fundManagerName",
      key: "fundManagerName",

    },
    {
      title: "每日时间加权报价差率",
      dataIndex: "dailyTimeWeightedQuoteSpreadRate",
      key: "dailyTimeWeightedQuoteSpreadRate",

    },
    {
      title: "每日连续竞价参与率",
      dataIndex: "dailyContinuousAuctionParticipationRate",
      key: "dailyContinuousAuctionParticipationRate",

    },
    {
      title: "开盘集合竞价参与",
      dataIndex: "openingCallAuctionParticipation",
      key: "openingCallAuctionParticipation",

    },
    {
      title: "收盘集合竞价参与",
      dataIndex: "closingCallAuctionParticipation",
      key: "closingCallAuctionParticipation",

    },
    {
      title: "当日申报笔数",
      dataIndex: "dailyDeclarationCount",
      key: "dailyDeclarationCount",

    },
    {
      title: "申报总额（万元）",
      dataIndex: "declarationTotalAmount",
      key: "declarationTotalAmount",

    },
    {
      title: "成交量（万份）",
      dataIndex: "tradingVolume",
      key: "tradingVolume",

    },
    {
      title: "净申购量（万份）",
      dataIndex: "netSubscriptionVolume",
      key: "netSubscriptionVolume",

    },
    {
      title: "净申购金额（万元）",
      dataIndex: "netSubscriptionAmount",
      key: "netSubscriptionAmount",

    },
    {
      title: "基金资产规模（亿元）",
      dataIndex: "fundAssetScale",
      key: "fundAssetScale",

    },
    {
      title: "ETF经手费（元）",
      dataIndex: "etfHandlingFee",
      key: "etfHandlingFee",

    },
    {
      title: "除专用证券账户之间成交的ETF经手费（元）",
      dataIndex: "etfHandlingFeeExcludingSpecialSecuritiesAccountTransactions",
      key: "etfHandlingFeeExcludingSpecialSecuritiesAccountTransactions",

    },
    {
      title: "做市账户股票经手费（元）",
      dataIndex: "marketMakingAccountStockHandlingFee",
      key: "marketMakingAccountStockHandlingFee",

    },
];

