const WIDTHRANGEARRAY = [768, 500, 320, 0];
export enum WindowWidthRange { LARGE, SMALL, HANDHELD, OBSOLETE }

const ASPECTRATIORANGEARRAY = [5 / 4, 0];
export enum AspectRatioRange { WIDE, NARROW }

export interface MediaService {
    getWidthRange: () => WindowWidthRange;
    getAspectRatioRange: () => AspectRatioRange;
}

/* @ngInject */
export function mediaService($window: angular.IWindowService) {
    return {
        getWidthRange: (): WindowWidthRange => {
            let width = $window.innerWidth;
            for (let k = 0; k < WIDTHRANGEARRAY.length; k++) {
                if (width > WIDTHRANGEARRAY[k]) { return WindowWidthRange[WindowWidthRange[k]]; }
            }
        },
        getAspectRatioRange: (): AspectRatioRange => {
            let aspectRatio = $window.innerWidth / $window.innerHeight;
            for (let k = 0; k < ASPECTRATIORANGEARRAY.length; k++) {
                if (aspectRatio > ASPECTRATIORANGEARRAY[k]) {
                    return AspectRatioRange[AspectRatioRange[k]];
                }
            }
        }
    };
}
