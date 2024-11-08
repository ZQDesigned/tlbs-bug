import React, {useRef, useState} from 'react';
import {Button, Drawer, Layout, Menu, Tabs} from 'antd';
import styled from '@emotion/styled';
import {MapComponent} from "./components/map-component";
import Map from 'tmap-gl-types/types/packages/jsapi/types/map/map';
import {ControlPanel} from "./components/control-panel";

const {Header, Content} = Layout;
const {TabPane} = Tabs;

export const MainScreen = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [center, setCenter] = useState({lat: 40.0404, lng: 116.2735});
    const [showControl, setShowControl] = useState(true);

    const mapRef = useRef<null | Map>(null);


    // 控制抽屉的显示和隐藏
    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    return (
        <>
            <Layout style={{height: '100vh'}}>
                <StyledHeader>
                    {/* Header 左侧 Logo 和菜单 */}
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Logo>Logo</Logo>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{backgroundColor: 'transparent', marginLeft: 20}}
                        >
                            <Menu.Item key="1">首页</Menu.Item>
                            <Menu.Item key="2">功能</Menu.Item>
                            <Menu.Item key="3">帮助</Menu.Item>
                        </Menu>
                    </div>
                    {/* Header 右侧用户信息 */}
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Button type={"dashed"} onClick={toggleDrawer} style={{marginRight: 20}}>菜单</Button>
                        {/* 一个按钮，负责控制 map 暂时不可操作 */}

                        <div style={{color: 'white'}}>用户名</div>
                    </div>
                </StyledHeader>

                <Layout>
                    {/* 带有关闭按钮的抽屉 */}
                    <StyledSider>
                        <Drawer
                            title="功能菜单"
                            placement="left"
                            closable={false}
                            onClose={toggleDrawer}
                            visible={drawerVisible}
                            getContainer={false}
                            style={{position: 'absolute'}}
                            width="20vw"
                        >
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="页面 1" key="1">内容 1</TabPane>
                                <TabPane tab="页面 2" key="2">内容 2</TabPane>
                                <TabPane tab="页面 3" key="3">内容 3</TabPane>
                            </Tabs>
                        </Drawer>
                    </StyledSider>

                    <StyledContent>
                        {/* 固定控制面板在地图左侧 */}
                        <ControlPanel
                            center={center}
                            setCenter={setCenter}
                            showControl={showControl}
                            setShowControl={setShowControl}
                        />
                        {/* 地图容器始终占据整个内容区域 */}
                        <MapComponent mapRef={mapRef} center={center} showControl={showControl} active={true} />
                    </StyledContent>
                </Layout>
            </Layout>
        </>
    );
};

// Header 样式
const StyledHeader = styled(Header)`
    background-color: rgb(55, 144, 244);
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

// Logo 样式
const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: white;
`;

// StyledSider 增加 props 用于控制宽度
const StyledSider = styled.div`
    width: 20vw;
    transition: width 0.3s;
`;

// StyledContent 增加 props 用于控制左边距
const StyledContent = styled(Content)`
    flex: 1;
    padding: 20px; // 增加内边距，确保内容与窗口边缘有一定距离
    margin-left: 0;
    gap: 16px; // 控制面板与地图间的距离
    transition: margin-left 0.3s;
    height: calc(100vh - 8vh); // 减去 Header 高度，撑满剩余部分
    display: flex; // 使其内的元素能够自动填充
    position: relative;
`;