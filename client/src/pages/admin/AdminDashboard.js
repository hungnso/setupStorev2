import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

import { toast } from "react-toastify";
import { Layout, Typography, Row, Col, Card } from "antd";

import { getOrders, changeStatus } from "../../functions/admin";
// import { formatDate } from "../../common/utils";
import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";
import OrderTable from "../../components/table/OrderTable";
import DonutPieChart from "../../components/charts/DonutPieChart";
import BarChart from "../../components/charts/BarChart";

function AdminDashboard() {
  const [loading, setLoading] = React.useState(false);

  const [orders, setOrders] = React.useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    getOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res);
      setLoading(false);
    });
  };

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  const getTotalAmountInStatus = (status) => {
    return orders.reduce((currentValue, nextValue) => {
      return (
        currentValue +
        (nextValue.orderStatus === status && nextValue.paymentIntent.amount)
      );
    }, 0);
  };

  const getTotalOrdersInStatus = (status) => {
    return orders.reduce((currentValue, nextValue) => {
      return currentValue + (nextValue.orderStatus === status && 1);
    }, 0);
  };

  const dataDonutChart = () => {
    return orders.map((item) => ({
      type:
        item.paymentIntent.payment_method_types[0] !== "card"
          ? item.paymentIntent.status
          : item.orderStatus,
      value: getTotalOrdersInStatus(item.orderStatus) ?? 0,
    }));
  };

  const dataBarChart = () => {
    return orders.map((item) => ({
      type:
        item.paymentIntent.payment_method_types[0] !== "card"
          ? item.paymentIntent.status
          : item.orderStatus,
      amount: getTotalAmountInStatus(item.orderStatus) / 100 ?? 0,
    }));
  };

  return (
    <Layout.Content>
      <Row gutter={[24, 24]} wrap={false}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card>
            <Typography.Title level={3}>AdminDashboard</Typography.Title>
            <Row wrap={false} style={{ marginBottom: 24 }}>
              <Col span={15}>
                <BarChart data={_.uniqBy(dataBarChart(), "type")} />
              </Col>
              <Col span={9}>
                <DonutPieChart data={_.uniqBy(dataDonutChart(), "type")} />
              </Col>
            </Row>
            <OrderTable
              loading={loading}
              data={orders}
              handleStatusChange={handleStatusChange}
            />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default AdminDashboard;
