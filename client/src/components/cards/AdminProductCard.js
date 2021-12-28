import React from "react";
import { Link } from "react-router-dom";

import { Card, Col, Popconfirm, Typography, Image, Space, Button, Divider, Row } from "antd";

import { BsCheckLg, BsXLg, BsSearch } from "react-icons/bs";
import { BiEdit, BiTrash } from "react-icons/bi";

function AdminProductCard({ product, handleRemove }) {
  // const [visible, setVisible] = React.useState(false);
  const { _id, name, desc, images, slug } = product;

  const renderThumbnail = () => (
    <>
      <Image
        alt={slug}
        height={150}
        style={{ borderRadius: 4 }}
        src={images && images.length ? images[0].url : "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"}
        preview={{
        visible: false,
        mask: (
          <Space size={16}>
            <Button type="primary" shape="circle" size="large" icon={<BsSearch />}></Button>
          </Space>
        ),
      }}
      />
      {/* <div style={{ display: "none" }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
          {images.map((e) => (
            <Image src={e.url} />
          ))}
        </Image.PreviewGroup>
      </div> */}
    </>
  );

  const renderContent = () => (
    <Space direction="vertical">
      <Typography.Title level={4} style={{ marginBottom: 0 }} ellipsis>
        {name}
      </Typography.Title>
      <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ maxWidth: 240, marginBottom: 0 }}>
        {desc}
      </Typography.Paragraph>
      {/* <Statistic value={price} suffix={<Typography.Text underline>đ</Typography.Text>}/> */}
      <Row justify="space-between">
        <Link to={`/admin/product/${slug}`}>
          <Button icon={<BiEdit />} style={{ width: 80 }} type="primary"></Button>
        </Link>
        <Popconfirm
          title={
            <p>
              Sure to delete <b>{name}</b> ?
            </p>
          }
          placement="topRight"
          okText={<BsCheckLg />}
          cancelText={<BsXLg />}
          onConfirm={() => handleRemove(slug)}
        >
          <Button icon={<BiTrash />} type="text" style={{ width: 80 }}></Button>
        </Popconfirm>
      </Row>
    </Space>
  );

  return (
    <Col sm={12} lg={8} xl={6} xxl={6}>
      <Card bordered={false} size="small" key={_id} cover={renderThumbnail()}>
        {renderContent()}
      </Card>
    </Col>
  );
}

export default AdminProductCard;