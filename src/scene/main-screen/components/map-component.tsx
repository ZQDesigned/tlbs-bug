import React from "react";
import {TMap} from "tlbs-map-react";
import Map from "tmap-gl-types/types/packages/jsapi/types/map/map";
import styled from "@emotion/styled";

interface MapComponentProps {
    mapRef: React.MutableRefObject<null | Map>;
    center: { lat: number, lng: number };
    showControl: boolean;
    active: boolean;
}

export const MapComponent = (props: MapComponentProps) => {
    return (
        <MapContainer active={props.active}>
            <TMap
                apiKey={"LGIBZ-MQ3E7-WETX3-HRYBF-U3QMZ-3DBJH"}
                ref={props.mapRef}
                control={{
                    zoom: {
                        position: 'topRight',
                        className: 'tmap-zoom-control-box',
                        numVisible: true,
                    },
                }}
                options={{
                    center: props.center,
                    zoom: 17,
                    showControl: props.showControl,
                }}
            />
        </MapContainer>
    );
}

const MapContainer = styled.div<{
    active: boolean;
}>`
    height: 100%;
    width: calc(100% - 250px); // 宽度自适应内容区，减去控制面板宽度
    pointer-events: ${props => props.active ? 'auto' : 'none'};
`;