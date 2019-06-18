import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const AppLayout = function({ children, history }) {
  const [collapsed, setCollapsed] = useState(false);

  const onClick = ({ item }) => {
    history.push(item.props.href);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={onClick}
        >
          <Menu.Item key="1" href="/">
            <Icon type="user" />
            <span>Home</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>Teacher</span>
              </span>
            }
          >
            <Menu.Item key="3" href="/teachers">
              All Teachers
            </Menu.Item>
            <Menu.Item key="4">Add Teacher</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="user" />
                <span>Students</span>
              </span>
            }
          >
            <Menu.Item key="5" href="/students">
              All Students
            </Menu.Item>
            <Menu.Item key="6">Add Student</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={e => {
              setCollapsed(!collapsed);
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(AppLayout);
