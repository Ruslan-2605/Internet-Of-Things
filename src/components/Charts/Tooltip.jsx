import { useTooltip, useTooltipInPortal, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { Chart } from './Сhart';

export const Tooltip = () => {
    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip();

    // If you don't want to use a Portal, simply replace `TooltipInPortal` below with
    // `Tooltip` or `TooltipWithBounds` and remove `containerRef`
    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        // use TooltipWithBounds
        detectBounds: true,
        // when tooltip containers are scrolled, this will correctly update the Tooltip position
        scroll: true,
    })

    const handleMouseOver = (event, datum) => {
        debugger
        const coords = localPoint(event.target.ownerSVGElement, event);
        showTooltip({
            tooltipLeft: coords.x,
            tooltipTop: coords.y,
            tooltipData: datum
        });
    };

    return (
        // Set `ref={containerRef}` on the element corresponding to the coordinate system that
        // `left/top` (passed to `TooltipInPortal`) are relative to.
        <>
            <Chart
                onMouseOver={handleMouseOver}
                onMouseOut={hideTooltip}
                containerRef={containerRef}
            />

            {tooltipOpen && (
                <TooltipInPortal
                    // set this to random so it correctly updates with parent bounds
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                >
                    Data value <strong>{tooltipData}</strong>
                </TooltipInPortal>
            )}
        </>
    )
};
