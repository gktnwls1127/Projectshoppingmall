import React from 'react'
import { Layout, Menu } from 'antd';
import { DollarOutlined, UserOutlined, ShopOutlined, SolutionOutlined } from '@ant-design/icons';
import SellerProducts from './Sections/SellerProducts';
import UserPage from './Sections/UserPage'
import SNSList from './Sections/SNSList';

const { Header, Content, Footer, Sider } = Layout;

function adminPage() {
    return (
        <div>
             <Layout style={{ minHeight: '100vh' }}>
                <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoi nt={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                    사용자
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ShopOutlined />}>
                    상품
                    </Menu.Item>
                    <Menu.Item key="3" icon={<SolutionOutlined />}>
                    SNS 게시물
                    </Menu.Item>
                    <Menu.Item key="4" icon={<DollarOutlined />}>
                    매출
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <UserPage />
                    </div>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <SellerProducts />
                    </div>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {/* <SNSList /> */}
                    </div>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    
                    </div>
                </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default adminPage
