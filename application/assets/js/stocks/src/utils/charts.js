import React from "react";
//
import {useWindowSize} from "@react-hook/window-size";

const options = {
    elementType: ["line", "area", "bar", "bubble"],
    primaryAxisType: ["linear", "time", "log", "ordinal"],
    secondaryAxisType: ["linear", "time", "log", "ordinal"],
    primaryAxisPosition: ["top", "left", "right", "bottom"],
    secondaryAxisPosition: ["top", "left", "right", "bottom"],
    secondaryAxisStack: [true, false],
    primaryAxisShow: [true, false],
    secondaryAxisShow: [true, false],
    grouping: ["single", "series", "primary", "secondary"],
    tooltipAnchor: [
        "closest",
        "top",
        "bottom",
        "left",
        "right",
        "center",
        "gridTop",
        "gridBottom",
        "gridLeft",
        "gridRight",
        "gridCenter",
        "pointer"
    ],
    tooltipAlign: [
        "auto",
        "top",
        "bottom",
        "left",
        "right",
        "topLeft",
        "topRight",
        "bottomLeft",
        "bottomRight",
        "center"
    ],
    snapCursor: [true, false]
};

const optionKeys = Object.keys(options);

export function useChartConfig({
                                           series,
                                           useR,
                                           show = [],
                                           count = 1,
                                           resizable = true,
                                           canRandomize = true,
                                           dataType = "time",
                                           elementType = "line",
                                           primaryAxisType = "time",
                                           secondaryAxisType = "linear",
                                           primaryAxisPosition = "bottom",
                                           secondaryAxisPosition = "left",
                                           primaryAxisStack = false,
                                           secondaryAxisStack = true,
                                           primaryAxisShow = true,
                                           secondaryAxisShow = true,
                                           tooltipAnchor = "closest",
                                           tooltipAlign = "auto",
                                           grouping = "primary",
                                           snapCursor = true,
                                           datums = 10
                                       }) {
    const [state, setState] = React.useState({
        count,
        resizable,
        canRandomize,
        dataType,
        elementType,
        primaryAxisType,
        secondaryAxisType,
        primaryAxisPosition,
        secondaryAxisPosition,
        primaryAxisStack,
        secondaryAxisStack,
        primaryAxisShow,
        secondaryAxisShow,
        tooltipAnchor,
        tooltipAlign,
        grouping,
        snapCursor,
        datums,
        data: makeDataFrom(dataType, series, useR, datums)
    });

    React.useEffect(() => {
        setState(old => ({
            ...old,
            data: makeDataFrom(dataType, series, useR, datums)
        }));
    }, [count, dataType, datums, series, useR]);

    const randomizeData = () =>
        setState(old => ({
            ...old,
            data: makeDataFrom(dataType, series, useR, datums)
        }));

    const Options = optionKeys
        .filter(option => show.indexOf(option) > -1)
        .map(option => (
            <div key={option}>
                {option}: &nbsp;
                <select
                    value={state[option]}
                    onChange={({target: {value}}) =>
                        setState(old => ({
                            ...old,
                            [option]:
                                typeof options[option][0] === "boolean"
                                    ? value === "true"
                                    : value
                        }))
                    }
                >
                    {options[option].map(d => (
                        <option value={d} key={d.toString()}>
                            {d.toString()}
                        </option>
                    ))}
                </select>
                <br/>
            </div>
        ));

    return {
        ...state,
        randomizeData,
        Options
    };
}

function makeDataFrom(dataType, series, useR, datums) {
    return [
        ...new Array(series || Math.max(Math.round(Math.random() * 5), 1))
    ].map((d, i) => makeSeries(i, dataType, useR, datums));
}

function makeSeries(i, dataType, useR, datums) {
    const start = 0;
    const startDate = new Date();
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    // const length = 5 + Math.round(Math.random() * 15)
    const length = datums;
    const min = 0;
    const max = 100;
    const rMin = 2;
    const rMax = 20;
    const nullChance = 0;
    return {
        label: `Series ${i + 1}`,
        data: [...new Array(length)].map((_, i) => {
            let x = start + i;
            if (dataType === "ordinal") {
                x = `Ordinal Group ${x}`;
            }
            if (dataType === "time") {
                x = new Date(startDate.getTime() + 60 * 1000 * 30 * i);
            }
            if (dataType === "linear") {
                x =
                    Math.random() < nullChance
                        ? null
                        : min + Math.round(Math.random() * (max - min));
            }
            const distribution = 1.1;
            const y =
                Math.random() < nullChance
                    ? null
                    : min + Math.round(Math.random() * (max - min));
            const r = !useR
                ? undefined
                : rMax -
                Math.floor(
                    Math.log(Math.random() * (distribution ** rMax - rMin) + rMin) /
                    Math.log(distribution)
                );
            return {
                primary: x,
                secondary: y,
                radius: r
            };
        })
    };
}

export function useLagRadar() {
    const [width, height] = useWindowSize();

    React.useEffect(() => {
        return lagRadar({
            frames: 60, // number of frames to draw, more = worse performance
            speed: 0.0017, // how fast the sweep moves (rads per ms)
            size: Math.min(width, height) / 3, // outer frame px
            inset: 3, // circle inset px
            parent: document.body, // DOM node to attach to
        });
    }, [width, height]);
}

/**
 * lagRadar
 * Licence: ISC copyright: @mobz 2018
 */

function lagRadar(config = {}) {
    const {
        frames = 50, // number of frames to draw, more = worse performance
        speed = 0.0017, // how fast the sweep moves (rads per ms)
        size = 300, // outer frame px
        inset = 3, // circle inset px
        parent = document.body, // DOM node to attach to
    } = config;

    const svgns = "http://www.w3.org/2000/svg";

    const styles = document.createTextNode(`
    .lagRadar {
  pointer-events: none;
}
.lagRadar-sweep > * {
      shape-rendering: crispEdges;
    }
    .lagRadar-face {
      fill: transparent;
    }
    .lagRadar-hand {
      stroke-width: 4px;
      stroke-linecap: round;
    }
  `);

    function $svg(tag, props = {}, children = []) {
        const el = document.createElementNS(svgns, tag);
        Object.keys(props).forEach((prop) => el.setAttribute(prop, props[prop]));
        children.forEach((child) => el.appendChild(child));
        return el;
    }

    const PI2 = Math.PI * 2;
    const middle = size / 2;
    const radius = middle - inset;

    const $hand = $svg("path", {class: "lagRadar-hand"});
    const $arcs = new Array(frames).fill("path").map((t) => $svg(t));
    const $root = $svg("svg", {class: "lagRadar", height: size, width: size}, [
        $svg("style", {type: "text/css"}, [styles]),
        $svg("g", {class: "lagRadar-sweep"}, $arcs),
        $hand,
        $svg("circle", {
            class: "lagRadar-face",
            cx: middle,
            cy: middle,
            r: radius,
        }),
    ]);

    parent.appendChild($root);

    let frame;
    let framePtr = 0;
    let last = {
        rotation: 0,
        now: Date.now(),
        tx: middle + radius,
        ty: middle,
    };

    const calcHue = (() => {
        const max_hue = 120;
        const max_ms = 1000;
        const log_f = 10;
        const mult = max_hue / Math.log(max_ms / log_f);
        return function (ms_delta) {
            return (
                max_hue -
                Math.max(0, Math.min(mult * Math.log(ms_delta / log_f), max_hue))
            );
        };
    })();

    function animate() {
        const now = Date.now();
        const rdelta = Math.min(PI2 - speed, speed * (now - last.now));
        const rotation = (last.rotation + rdelta) % PI2;
        const tx = middle + radius * Math.cos(rotation);
        const ty = middle + radius * Math.sin(rotation);
        const bigArc = rdelta < Math.PI ? "0" : "1";
        const path = `M${tx} ${ty}A${radius} ${radius} 0 ${bigArc} 0 ${last.tx} ${last.ty}L${middle} ${middle}`;
        const hue = calcHue(rdelta / speed);

        $arcs[framePtr % frames].setAttribute("d", path);
        $arcs[framePtr % frames].setAttribute("fill", `hsl(${hue}, 80%, 40%)`);
        $hand.setAttribute("d", `M${middle} ${middle}L${tx} ${ty}`);
        $hand.setAttribute("stroke", `hsl(${hue}, 80%, 60%)`);

        for (let i = 0; i < frames; i++) {
            $arcs[(frames + framePtr - i) % frames].style.fillOpacity =
                1 - i / frames;
        }

        framePtr++;
        last = {
            now,
            rotation,
            tx,
            ty,
        };

        frame = window.requestAnimationFrame(animate);
    }

    animate();

    return function destroy() {
        if (frame) {
            window.cancelAnimationFrame(frame);
        }
        $root.remove();
    };
}
