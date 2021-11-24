import React from "react";
import { Table } from "antd";
import moment from "moment";
import "./ModalShowTimesStyle.scss";
export default function ModalShowTimesComponent(props) {
  const { showTimeList } = props;
  //   console.log(showTimeList);
  const columns = [
    {
      title: "ID",
      dataIndex: "maLichChieu",
      sorter: (a, b) => a.maLichChieu - b.maLichChieu,
      defaultSortOrder: "descend",
      sortDirections: ["descend"],
    },
    {
      title: "ID Cinema",
      dataIndex: "maRap",
    },
    {
      title: "Name Cinema",
      dataIndex: "tenRap",
    },
    {
      title: "Time",
      dataIndex: "ngayChieuGioChieu",
    },
  ];

  const renderShowTimesData = () => {
    const data = showTimeList.map((time, index) => ({
      key: index,
      maLichChieu: time.maLichChieu,
      maRap: time.maRap,
      tenRap: time.tenRap,
      ngayChieuGioChieu: moment(time.ngayChieuGioChieu).format(
        "dddd - DD/MM/YYYY - hh:mm A"
      ),
    }));
    return data;
  };

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <div className="showTimeAm">
      <div className="showTimeAm__content">
        <Table
          columns={columns}
          dataSource={renderShowTimesData()}
          onChange={onChange}
          pagination={false}
        />
      </div>
    </div>
  );
}
