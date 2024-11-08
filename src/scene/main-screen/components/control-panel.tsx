import React, {useState} from "react";
import styled from "@emotion/styled";
import {Button, Input} from "antd";

interface ControlPanelProps {
    center: { lat: number, lng: number };
    setCenter: (center: { lat: number, lng: number }) => void;
    showControl: boolean;
    setShowControl: (showControl: boolean) => void;
}

export const ControlPanel = (props: ControlPanelProps) => {

    const [latInput, setLatInput] = useState<string>(props.center.lat.toString());
    const [lngInput, setLngInput] = useState<string>(props.center.lng.toString());

    const updateCenter = () => {
        const newLat = parseFloat(latInput);
        const newLng = parseFloat(lngInput);
        if (!isNaN(newLat) && !isNaN(newLng)) {
            props.setCenter({ lat: newLat, lng: newLng });
        }
    };

    // 切换地图中心位置的函数
    const resetCenter = () => props.setCenter({lat: 39.9042, lng: 116.4074}); // 示例：切换至北京中心

    return (
        <StyledPanel>
            <Button type="primary" style={{marginBottom: 8}} onClick={() => props.setShowControl(!props.showControl)}>
                {props.showControl ? '隐藏' : '显示'}控件
            </Button>
            <Button type="primary" onClick={resetCenter}>
                重置中心点
            </Button>
            {/* 输入框和按钮 */}
            <Input
                placeholder="纬度"
                value={latInput}
                onChange={(e) => setLatInput(e.target.value)}
            />
            <Input
                placeholder="经度"
                value={lngInput}
                onChange={(e) => setLngInput(e.target.value)}
            />
            <Button type="default" onClick={updateCenter}>
                设置中心点
            </Button>
        </StyledPanel>
    );

}

const StyledPanel = styled.div`
  flex: 1;
  top: 20px;
  left: 20px;
  width: 250px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 12px; // 控制面板内组件的间距
`;